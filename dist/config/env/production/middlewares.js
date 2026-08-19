"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Production middleware config — extends base config with full CKEditor CDN permissions.
// CKEditor 5 loads JS, CSS, and fonts from https://cdn.ckeditor.com.
// Both script-src AND style-src must explicitly allow it, or the editor silently fails to mount.
const config = [
    'strapi::logger',
    'strapi::errors',
    {
        name: 'strapi::security',
        config: {
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    'connect-src': ["'self'", 'https:', 'https://proxy-event.ckeditor.com'],
                    'script-src': ["'self'", "'unsafe-inline'", 'https://cdn.ckeditor.com'],
                    'style-src': ["'self'", "'unsafe-inline'", 'https://cdn.ckeditor.com'],
                    'img-src': [
                        "'self'",
                        'data:',
                        'blob:',
                        'market-assets.strapi.io',
                        'res.cloudinary.com',
                        'https://cdn.ckeditor.com',
                    ],
                    'media-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', 'res.cloudinary.com'],
                    'font-src': ["'self'", 'https://cdn.ckeditor.com'],
                    upgradeInsecureRequests: null,
                },
            },
        },
    },
    {
        name: 'strapi::cors',
        config: {
            enabled: true,
            headers: '*',
            origin: [
                process.env.FRONTEND_URL || 'http://localhost:3000',
                process.env.PUBLIC_URL || 'http://localhost:1337',
            ],
        },
    },
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
];
exports.default = config;
