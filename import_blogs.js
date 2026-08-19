require('dotenv').config();
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const csv = require('csv-parser');
const FormData = require('form-data');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN || ''; 

const headers = {
    'Content-Type': 'application/json',
    ...(API_TOKEN ? { 'Authorization': `Bearer ${API_TOKEN}` } : {})
};

// ─────────────────────────────────────────────────────────────
// HTML → Strapi Blocks JSON converter
// Converts raw HTML into the structured JSON array expected by
// Strapi's native blocks editor (type: "blocks" field).
// ─────────────────────────────────────────────────────────────
function htmlToBlocks(html) {
    if (!html || typeof html !== 'string') return [];

    const blocks = [];

    // Strip outer <html>/<head>/<body> wrappers if present
    let content = html
        .replace(/<html[^>]*>/gi, '')
        .replace(/<\/html>/gi, '')
        .replace(/<head[\s\S]*?<\/head>/gi, '')
        .replace(/<body[^>]*>/gi, '')
        .replace(/<\/body>/gi, '')
        .trim();

    // Helper: strip all HTML tags from a string
    const stripTags = (str) => str.replace(/<[^>]+>/g, '').trim();

    // Helper: decode common HTML entities
    const decodeEntities = (str) => str
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ')
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"');

    // Helper: build inline children array from inner HTML
    // Handles <strong>, <em>, <u>, <s>, <code>, <a>
    function parseInlineChildren(innerHtml) {
        if (!innerHtml) return [{ type: 'text', text: '' }];

        const children = [];
        const tokenRegex = /<(strong|b|em|i|u|s|del|code|a)(\s[^>]*)?>([^<]*)<\/\1>|([^<]+)/gi;
        let match;

        while ((match = tokenRegex.exec(innerHtml)) !== null) {
            if (match[4] !== undefined) {
                const text = decodeEntities(match[4]);
                if (text) children.push({ type: 'text', text });
            } else {
                const tag = match[1].toLowerCase();
                const attrs = match[2] || '';
                const innerText = decodeEntities(stripTags(match[3]));
                if (!innerText) continue;

                if (tag === 'a') {
                    const hrefMatch = attrs.match(/href=["']([^"']*)["']/);
                    const href = hrefMatch ? hrefMatch[1] : '#';
                    children.push({
                        type: 'link',
                        url: href,
                        children: [{ type: 'text', text: innerText }]
                    });
                } else {
                    const node = { type: 'text', text: innerText };
                    if (tag === 'strong' || tag === 'b') node.bold = true;
                    if (tag === 'em' || tag === 'i') node.italic = true;
                    if (tag === 'u') node.underline = true;
                    if (tag === 's' || tag === 'del') node.strikethrough = true;
                    if (tag === 'code') node.code = true;
                    children.push(node);
                }
            }
        }

        return children.length > 0 ? children : [{ type: 'text', text: decodeEntities(stripTags(innerHtml)) }];
    }

    // Remove HTML comments before processing
    content = content.replace(/<!--[\s\S]*?-->/g, '');

    // Process top-level block elements
    const topLevelRegex = /<(h[1-6]|p|ul|ol|blockquote|pre)([ \t][^>]*)?>([^]*?)<\/\1>|<(hr|img)([ \t][^>]*)?>/gi;
    let blockMatch;

    while ((blockMatch = topLevelRegex.exec(content)) !== null) {
        const tag = (blockMatch[1] || blockMatch[4] || '').toLowerCase();
        const attrs = blockMatch[2] || blockMatch[5] || '';
        const inner = blockMatch[3] || '';

        if (/^h[1-6]$/.test(tag)) {
            const level = parseInt(tag[1], 10);
            const text = decodeEntities(stripTags(inner));
            if (text) blocks.push({ type: 'heading', level, children: [{ type: 'text', text }] });

        } else if (tag === 'p') {
            const children = parseInlineChildren(inner);
            const text = children.map(c => c.text || '').join('');
            if (text.trim()) blocks.push({ type: 'paragraph', children });

        } else if (tag === 'ul' || tag === 'ol') {
            const listType = tag === 'ul' ? 'unordered' : 'ordered';
            const items = [];
            const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
            let liMatch;
            while ((liMatch = liRegex.exec(inner)) !== null) {
                const liText = decodeEntities(stripTags(liMatch[1]));
                if (liText) items.push({ type: 'list-item', children: [{ type: 'text', text: liText }] });
            }
            if (items.length > 0) blocks.push({ type: 'list', format: listType, children: items });

        } else if (tag === 'blockquote') {
            const text = decodeEntities(stripTags(inner));
            if (text) blocks.push({ type: 'quote', children: [{ type: 'text', text }] });

        } else if (tag === 'pre') {
            const text = decodeEntities(stripTags(inner));
            if (text) blocks.push({ type: 'code', children: [{ type: 'text', text }] });

        } else if (tag === 'img') {
            const srcMatch = attrs.match(/src=["']([^"']*)["']/);
            const altMatch = attrs.match(/alt=["']([^"']*)["']/);
            if (srcMatch) {
                blocks.push({
                    type: 'image',
                    image: { url: srcMatch[1], alternativeText: altMatch ? altMatch[1] : '' },
                    children: [{ type: 'text', text: '' }]
                });
            }
        }
        // hr has no direct Blocks equivalent — intentionally skipped
    }

    // Fallback: if nothing was parsed (plain text or unrecognised markup),
    // wrap the entire stripped content as a single paragraph block
    if (blocks.length === 0) {
        const text = decodeEntities(stripTags(content)).trim();
        if (text) blocks.push({ type: 'paragraph', children: [{ type: 'text', text }] });
    }

    return blocks;
}

// Helper: Upload image from URL or Local Path
async function uploadImage(imagePath) {
    if (!imagePath) return null;

    try {
        const formData = new FormData();
        
        if (imagePath.startsWith('http')) {
            console.log(`Downloading image from URL: ${imagePath}`);
            const response = await axios.get(imagePath, { responseType: 'stream' });
            formData.append('files', response.data, 'image.jpg');
        } else {
            console.log(`Uploading local image: ${imagePath}`);
            if (!fs.existsSync(imagePath)) {
                console.warn(`Local image not found: ${imagePath}`);
                return null;
            }
            formData.append('files', fs.createReadStream(imagePath));
        }

        const uploadRes = await axios.post(`${STRAPI_URL}/api/upload`, formData, {
            headers: {
                ...formData.getHeaders(),
                ...(API_TOKEN ? { 'Authorization': `Bearer ${API_TOKEN}` } : {})
            }
        });
        
        return uploadRes.data[0].id;
    } catch (err) {
        console.error(`Failed to upload image ${imagePath}:`, err.response?.data?.error?.message || err.message);
        return null;
    }
}

// Helper: Find or Create Author
async function getOrCreateAuthor(authorName) {
    if (!authorName) return null;
    try {
        const res = await axios.get(`${STRAPI_URL}/api/authors?filters[name][$eq]=${encodeURIComponent(authorName)}`, { headers });
        if (res.data.data.length > 0) {
            return res.data.data[0].id;
        }
        
        // Create author
        const createRes = await axios.post(`${STRAPI_URL}/api/authors`, {
            data: { name: authorName, slug: authorName.toLowerCase().replace(/[^a-z0-9]+/g, '-') }
        }, { headers });
        return createRes.data.data.id;
    } catch (err) {
        console.error(`Failed to get/create author ${authorName}:`, err.response?.data?.error?.message || err.message);
        return null;
    }
}

// Helper: Find or Create Category
async function getOrCreateCategory(categoryName) {
    if (!categoryName) return null;
    try {
        const res = await axios.get(`${STRAPI_URL}/api/categories?filters[name][$eq]=${encodeURIComponent(categoryName)}`, { headers });
        if (res.data.data.length > 0) {
            return res.data.data[0].id;
        }
        
        // Create category
        const createRes = await axios.post(`${STRAPI_URL}/api/categories`, {
            data: { name: categoryName, slug: categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-') }
        }, { headers });
        return createRes.data.data.id;
    } catch (err) {
        console.error(`Failed to get/create category ${categoryName}:`, err.response?.data?.error?.message || err.message);
        return null;
    }
}

// Main Import Function
async function importPosts(posts) {
    let successCount = 0;
    
    for (const post of posts) {
        console.log(`\nImporting: ${post.title}`);
        
        try {
            // Process Image
            let imageId = null;
            if (post.img || post.coverImage) {
                imageId = await uploadImage(post.img || post.coverImage);
            }
            
            // Process Relations
            let authorId = await getOrCreateAuthor(post.author || post.by);
            let categoryId = await getOrCreateCategory(post.category);
            
            // Parse keywords if string
            let keywords = post.keywords || [];
            if (typeof keywords === 'string') {
                keywords = keywords.split(',').map(k => k.trim());
            }
            
            // Ensure SEO fields adhere to Strapi schema length constraints
            let seoTitle = post.seoTitle || post.title;
            if (seoTitle && seoTitle.length > 70) {
                seoTitle = seoTitle.substring(0, 67) + '...';
            }

            let seoDescription = post.seoDescription || post.excerpt;
            if (seoDescription && seoDescription.length > 160) {
                seoDescription = seoDescription.substring(0, 157) + '...';
            }
            
            // Prepare payload
            const payload = {
                data: {
                    title: post.title,
                    slug: post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    // htmlContent must be Strapi Blocks JSON (array); convert if it arrives as raw HTML/text
                    htmlContent: Array.isArray(post.htmlContent)
                        ? post.htmlContent
                        : htmlToBlocks(post.htmlContent || post.content || ''),
                    excerpt: post.excerpt || null,
                    keywords: keywords,
                    date: post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
                    seoTitle: seoTitle,
                    seoDescription: seoDescription,
                }
            };
            
            if (imageId) payload.data.coverImage = imageId;
            if (authorId) payload.data.author = authorId;
            if (categoryId) payload.data.category = categoryId;
            
            // Send POST request
            const res = await axios.post(`${STRAPI_URL}/api/posts`, payload, { headers });
            console.log(`✅ Success: ${res.data.data.id} - ${post.title}`);
            successCount++;
        } catch (err) {
            console.error(`❌ Failed: ${post.title}`, err.response?.data?.error || err.message);
        }
    }
    
    console.log(`\nImport complete! Successfully imported ${successCount} out of ${posts.length} posts.`);
}

// Format Parsers
function parseJSON(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

function parseCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', reject);
    });
}

function parseSingleFile(filePath) {
    const filename = path.basename(filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    const isHtml = filePath.endsWith('.html');
    const isMd = filePath.endsWith('.md');
    
    let metadata = {};
    let htmlContent = content;

    if (content.startsWith('---')) {
        const parts = content.split('---');
        if (parts.length >= 3) {
            const fm = parts[1].trim().split('\n');
            fm.forEach(line => {
                const colonIdx = line.indexOf(':');
                if (colonIdx > -1) {
                    const key = line.slice(0, colonIdx).trim();
                    const val = line.slice(colonIdx + 1).trim();
                    metadata[key] = val.replace(/^["']|["']$/g, '');
                }
            });
            htmlContent = parts.slice(2).join('---').trim();
        }
    } else if (isHtml) {
        const getMetaContent = (nameOrProp) => {
            const regex = new RegExp(`<meta\\s+(?:name|property)=["']${nameOrProp}["']\\s+content=["'](.*?)["']`, 'i');
            const match = content.match(regex);
            if (match) return match[1];
            const regex2 = new RegExp(`<meta\\s+content=["'](.*?)["']\\s+(?:name|property)=["']${nameOrProp}["']`, 'i');
            const match2 = content.match(regex2);
            return match2 ? match2[1] : null;
        };

        const getTitle = () => {
            const match = content.match(/<title[^>]*>(.*?)<\/title>/i);
            return match ? match[1] : null;
        };

        const getCanonicalSlug = () => {
            const match = content.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
            if (match) {
                const parts = match[1].split('/');
                return parts[parts.length - 1] || null;
            }
            return null;
        };

        metadata.title = getMetaContent('og:title') || getTitle();
        metadata.excerpt = getMetaContent('description') || getMetaContent('og:description');
        metadata.author = getMetaContent('author');
        metadata.category = getMetaContent('category');
        metadata.keywords = getMetaContent('keywords');
        metadata.img = getMetaContent('og:image');
        metadata.date = getMetaContent('article:published_time');
        metadata.slug = getCanonicalSlug();
    }

    const fallbackSlug = filename.replace(/\.(md|html)$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');

    return {
        title: metadata.title || filename.replace(/\.(md|html)$/, ''),
        slug: metadata.slug || fallbackSlug,
        category: metadata.category || 'General',
        author: metadata.author || 'Admin',
        date: metadata.date,
        img: metadata.img || metadata.coverImage,
        excerpt: metadata.excerpt,
        keywords: metadata.keywords,
        // Always write rich content to htmlContent as Strapi Blocks JSON
        htmlContent: htmlToBlocks(htmlContent)
    };
}

function parseMD(dirPath) {
    const results = [];
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        if (!file.endsWith('.md') && !file.endsWith('.html')) continue;
        const fullPath = path.join(dirPath, file);
        results.push(parseSingleFile(fullPath));
    }
    return results;
}

// Entry Point
async function run() {
    const target = process.argv[2];
    if (!target) {
        console.error('Usage: node import_blogs.js <file-or-dir-path>');
        process.exit(1);
    }
    
    if (!fs.existsSync(target)) {
        console.error(`File or directory not found: ${target}`);
        process.exit(1);
    }
    
    const stats = fs.statSync(target);
    let posts = [];
    
    if (stats.isDirectory()) {
        console.log(`Parsing directory as Markdown/HTML files...`);
        posts = parseMD(target);
    } else if (target.endsWith('.json')) {
        console.log(`Parsing JSON file...`);
        posts = parseJSON(target);
    } else if (target.endsWith('.csv')) {
        console.log(`Parsing CSV file...`);
        posts = await parseCSV(target);
    } else if (target.endsWith('.html') || target.endsWith('.md')) {
        console.log(`Parsing single ${target.endsWith('.html') ? 'HTML' : 'Markdown'} file...`);
        posts = [parseSingleFile(target)];
    } else {
        console.error('Unsupported file format. Please provide a .json, .csv, .html, .md file, or a directory of .md/.html files.');
        process.exit(1);
    }
    
    console.log(`Found ${posts.length} posts to import.`);
    if (posts.length > 0) {
        await importPosts(posts);
    }
}

run();
