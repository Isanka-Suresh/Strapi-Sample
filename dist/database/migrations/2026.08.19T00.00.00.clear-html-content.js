"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    async up(knex) {
        // Check if the posts table exists
        const hasTable = await knex.schema.hasTable('posts');
        if (hasTable) {
            // Check if the html_content column exists
            const hasColumn = await knex.schema.hasColumn('posts', 'html_content');
            if (hasColumn) {
                // Clear the data to allow Strapi's auto-migration to alter the column type from text to jsonb
                // This is necessary because the existing raw HTML string cannot be cast to jsonb natively.
                // As agreed, this will discard the existing data in this column.
                await knex('posts').update({ html_content: null });
            }
        }
    },
    async down(knex) {
        // This migration is destructive (clears data), so a rollback is a no-op
    },
};
