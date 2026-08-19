"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = [
    'strapi::logger',
    'strapi::errors',
    {
        name: 'strapi::security',
        config: {
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    'connect-src': ["'self'", 'https:'],
                    'img-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', 'res.cloudinary.com', 'cdn.ckeditor.com'],
                    'media-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', 'res.cloudinary.com'],
                    'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'cdn.ckeditor.com'],
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
                'http://localhost:3000',
                'http://localhost:1337',
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
