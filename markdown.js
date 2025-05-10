/**
 * Copyright (c) 2025
 * @Version: 1.0.0
 * @Author: https://salarizadi.ir
 * @Repsitory: https://github.com/salarizadi/markdown.js
 * @Description: A powerful Markdown parser with RTL support and smart typography
 * @License: MIT
 */
(function (root, factory) {
    /** Universal Module Definition (UMD) pattern */
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof exports === 'object' && typeof module === 'object') {
        // Node.js/CommonJS
        module.exports = factory();
        Object.defineProperty(module.exports, '__esModule', { value: true });
        module.exports.default = factory();
    } else if (typeof exports === 'object') {
        // CommonJS-like
        exports.Markdown = factory();
    } else {
        // Browser globals
        root.Markdown = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    /**
     * @typedef {Object} MarkdownOptions
     * @property {boolean} [codeHighlight=true] - Enable/disable code syntax highlighting
     * @property {boolean} [rtlSupport=true] - Enable/disable RTL text support
     * @property {boolean} [smartTypography=true] - Enable/disable smart typography features
     */

    /**
     * Markdown parser class with RTL support and smart typography
     * @class
     * @description A feature-rich Markdown parser that supports:
     * - Code blocks with syntax highlighting
     * - RTL text direction
     * - Smart typography
     * - Tables
     * - Lists (ordered and unordered)
     * - Links and images
     * - Blockquotes
     * - Inline formatting (bold, italic, strikethrough)
     */
    class Markdown {

        /**
         * Creates a new Markdown parser instance
         * @constructor
         */
        constructor () {
            /**
             * Parser configuration options
             * @type {MarkdownOptions}
             */
            this.options = {
                codeHighlight: true,
                rtlSupport: true,
                smartTypography: true
            };
            this.codeBlocks = [];
            this.codeBlocksPlaceholder = '___CODE_BLOCK_PLACEHOLDER___';
        }

        /**
         * Normalize text spacing while maintaining readability
         * @param {string} text - Input text to normalize
         * @returns {string} Normalized text with balanced spacing
         */
        normalizeSpacing (text) {
            return text
                // Remove whitespace from start and end of the entire text
                .trim()
                // Reduce more than 3 consecutive empty lines to 2 empty lines
                .replace(/\n{4,}/g, '\n\n\n')
                // Remove trailing whitespace from each line
                .replace(/[ \t]+$/gm, '')
                // Ensure proper spacing around horizontal rules (---) with two empty lines
                .replace(/\n{3,}(?:-{3,}|_{3,}|\*{3,})\n{3,}/g, '\n\n---\n\n')
                // Ensure proper spacing between list items while keeping groups separated
                .replace(/(\n- .*)\n{3,}(?=- )/g, '$1\n\n')
                // Ensure proper spacing between numbered list items while keeping groups separated
                .replace(/(\n\d+\. .*)\n{3,}(?=\d+\. )/g, '$1\n\n');
        }

        /**
         * Parse hex color codes and add color preview boxes
         * @param {string} text - Input text containing hex color codes
         * @returns {string} Text with color preview boxes added
         */
        parseColorCodes (text) {
            return text.replace(/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\b/g, (match) => {
                return `${match}<span class="color-preview" data-hex="${match}" style="background-color:${match};"></span>`;
            });
        }

        /**
         * Main parse method to convert Markdown to HTML
         * @param {string} markdown - Input Markdown text
         * @returns {string} Converted HTML
         */
        parse (markdown) {
            // Initial spacing normalization
            let html = this.normalizeSpacing(markdown);
          
            html = this.preserveCodeBlocks(html);
            html = this.parseHeadings(html);
            html = this.parseLists(html);
            html = this.parseLinks(html);
            html = this.parseImages(html);
            html = this.parseColorCodes(html);
            html = this.parseInlineFormats(html);
            html = this.parseBlockquotes(html);
            html = this.parseHorizontalRules(html);
            html = this.parseTables(html);
            html = this.parseParagraphs(html);

            html = this.restoreCodeBlocks(html);

            // Final HTML cleanup - keeping reasonable spacing
            return html
                // Remove empty paragraph tags
                .replace(/<p[^>]*>\s*<\/p>/g, '')
                // Reduce more than 3 empty lines between tags to 2
                .replace(/>\n{3,}</g, '>\n\n<')
                // Remove extra spaces inside tags while keeping one space where needed
                .replace(/>\s{2,}/g, '> ')
                .replace(/\s{2,}</g, ' <');
        }

        /**
         * Temporarily store code blocks to prevent parsing their content
         * @param {string} text - Input text containing code blocks
         * @returns {string} Text with code blocks replaced by placeholders
         */
        preserveCodeBlocks (text) {
            return text.replace(/```(\w*)\n([\s\S]*?)```/g, (match, language, code) => {
                this.codeBlocks.push({
                    language,
                    code: code.trim()
                });
                return this.codeBlocksPlaceholder;
            });
        }

        /**
         * Restore code blocks with proper HTML formatting
         * @param {string} text - Text with code block placeholders
         * @returns {string} Text with properly formatted code blocks
         */
        restoreCodeBlocks (text) {
            let result = text;
            this.codeBlocks.forEach((block, index) => {
                const languageClass = block.language ? `language-${block.language}` : '';
                const html = `<pre dir="ltr"><code class="${languageClass}" data-language="${block.language}">${this.escapeHtml(block.code)}</code></pre>`;
                result = result.replace(this.codeBlocksPlaceholder, html);
            });
            // Clear temporary storage
            this.codeBlocks = [];
            return result;
        }

        /**
         * Parses code blocks with language support
         * @param {string} text - The text containing code blocks
         * @returns {string} HTML with formatted code blocks
         */
        parseCodeBlocks (text) {
            return text.replace(/```(\w*)\n([\s\S]*?)```/g, (match, language, code) => {
                code = code.trim();
                const languageClass = language ? `language-${language}` : '';
                return `<pre dir="ltr"><code class="${languageClass}" data-language="${language}">${this.escapeHtml(code)}</code></pre>`;
            });
        }

        /**
         * Parses Markdown headings (h1-h6)
         * @param {string} text - The text containing headings
         * @returns {string} HTML with formatted headings
         */
        parseHeadings (text) {
            return text.replace(/^(#{1,6})\s(.+)$/gm, (match, hashes, content) => {
                const level = hashes.length;
                return `<h${level}>${content.trim()}</h${level}>`;
            });
        }

        /**
         * Parses ordered and unordered lists
         * @param {string} text - The text containing lists
         * @returns {string} HTML with formatted lists
         */
        parseLists (text) {
            text = text.replace(/^[\*\-]\s(.+)$/gm, '<li>$1</li>');
            text = text.replace(/(<li>.*<\/li>)/s, '<ul dir="auto">$1</ul>');

            text = text.replace(/^\d+\.\s(.+)$/gm, '<li>$1</li>');
            text = text.replace(/(<li>.*<\/li>)/s, '<ol dir="auto">$1</ol>');

            return text;
        }

        /**
         * Parses Markdown links
         * @param {string} text - The text containing links
         * @returns {string} HTML with formatted links
         */
        parseLinks (text) {
            return text.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');
        }

        /**
         * Parses Markdown images
         * @param {string} text - The text containing images
         * @returns {string} HTML with formatted images
         */
        parseImages (text) {
            return text.replace(/!\[([^\]]*)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1">');
        }

        /**
         * Parses inline formatting (bold, italic, strikethrough, code)
         * @param {string} text - The text containing inline formats
         * @returns {string} HTML with formatted inline elements
         */
        parseInlineFormats (text) {
            text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
            text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
            text = text.replace(/~~([^~]+)~~/g, '<del>$1</del>');
            text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
            return text;
        }

        /**
         * Parses blockquotes
         * @param {string} text - The text containing blockquotes
         * @returns {string} HTML with formatted blockquotes
         */
        parseBlockquotes (text) {
            return text.replace(/^>\s(.+)$/gm, '<blockquote dir="auto">$1</blockquote>');
        }

        /**
         * Parses horizontal rules
         * @param {string} text - The text containing horizontal rules
         * @returns {string} HTML with formatted horizontal rules
         */
        parseHorizontalRules (text) {
            return text.replace(/^(?:[\*\-_]\s*){3,}$/gm, '<hr>');
        }

        /**
         * Parses Markdown tables
         * @param {string} text - The text containing tables
         * @returns {string} HTML with formatted tables
         */
        parseTables (text) {
            const tableRegex = /\|(.+)\|\n\|(?:[-:]+\|)+\n((?:\|.+\|\n?)*)/g;
            return text.replace(tableRegex, (match, header, rows) => {
                const headers = header.split('|').map(h => h.trim()).filter(Boolean);
                const tableRows = rows.trim().split('\n').map(row => {
                    const cells = row.split('|').map(cell => cell.trim()).filter(Boolean);
                    return `<tr>${cells.map(cell => `<td>${cell}</td>`).join('')}</tr>`;
                });
                return `
                <table dir="auto">
                    <thead>
                        <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
                    </thead>
                    <tbody>
                        ${tableRows.join('\n')}
                    </tbody>
                </table>
            `;
            });
        }

        /**
         * Parses paragraphs
         * @param {string} text - The text containing paragraphs
         * @returns {string} HTML with formatted paragraphs
         */
        parseParagraphs (text) {
            return text
                .split('\n\n')
                .map(para => para.trim())
                .filter(para => para.length > 0)
                .map(para => {
                    if (!/^<[^>]+>/.test(para)) {
                        return `<p dir="auto">${para}</p>`;
                    }
                    return para;
                })
                .join('\n\n');
        }

        /**
         * Escapes HTML special characters
         * @param {string} text - The text to escape
         * @returns {string} Escaped HTML text
         */
        escapeHtml (text) {
            const escapeMap = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            return text.replace(/[&<>"']/g, m => escapeMap[m]);
        }

    }

    // Add string prototype method
    String.prototype.markdown = function () {
        return new Markdown().parse(this);
    };

    return Markdown;
}));
