# Markdown.js

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

A powerful and feature-rich Markdown parser for JavaScript with RTL support and smart typography. This library provides an elegant way to convert Markdown to HTML while supporting various advanced features including code syntax highlighting, RTL text direction, and smart typography.

## Features

- 🚀 **Full Markdown Support** - Supports all standard Markdown syntax
- 🌐 **RTL Support** - Built-in Right-to-Left text direction support
- ✨ **Smart Typography** - Intelligent typography improvements
- 🎨 **Code Syntax Highlighting** - Support for code blocks with language detection
- 📊 **Table Support** - Clean and semantic table rendering
- 🔧 **Customizable** - Configurable options for different use cases
- 🎯 **Zero Dependencies** - No external dependencies required
- 📱 **Universal Module** - Works in Node.js, browsers, and AMD environments

## Installation

### NPM
```bash
npm install @salarizadi/markdown.js
```

### CDN
```bash
<script src="https://cdn.jsdelivr.net/gh/salarizadi/markdown.js/markdown.min.js"></script>
```

### Direct Include
```html
<script src="markdown.min.js"></script>
```

## Usage

### Basic Usage

```javascript
// ES6 Import
import Markdown from '@salarizadi/markdown.js';

// Create instance
const md = new Markdown();

// Parse markdown to HTML
const html = md.parse('# Hello World');

// Or use the string prototype method
const html = '# Hello World'.markdown();
```

### Configuration Options

```javascript
const md = new Markdown();

// Default options
md.options = {
    codeHighlight: true,   // Enable code syntax highlighting
    rtlSupport: true,      // Enable RTL text support
    smartTypography: true  // Enable smart typography features
};
```

## Supported Syntax

### Headers
```markdown
# H1
## H2
### H3
#### H4
##### H5
###### H6
```

### Lists
```markdown
- Unordered list item
- Another item
  - Nested item

1. Ordered list item
2. Another item
   1. Nested item
```

### Code Blocks
```markdown
```javascript
const hello = "world";
console.log(hello);
```
```

### Tables
```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

### Blockquotes
```markdown
> This is a blockquote
> Multiple lines
```

### Links and Images
```markdown
[Link Text](https://example.com)
![Alt Text](image.jpg)
```

### Inline Formatting
```markdown
**Bold Text**
*Italic Text*
~~Strikethrough~~
`Inline Code`
```

## RTL Support

The library automatically detects and handles Right-to-Left text:

```markdown
<div dir="rtl">
# عنوان به زبان پارسی است
این متن به زبان پارسی است
</div>
```

## Color Preview Support

The library automatically adds color preview boxes for hex color codes:

 - Color: #FF5733 ![box-color-blue](./assets/box-color-red.png)
 - Background: #2196F3 ![box-color-blue](./assets/box-color-blue.png)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)
- IE11+ (with appropriate polyfills)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

- **Author:** [salarizadi.ir](https://salarizadi.ir)
- **GitHub:** [salarizadi/markdown.js](https://github.com/salarizadi/markdown.js)

## Support

If you find this project useful, please consider giving it a ⭐️ on GitHub!

---

Made with ❤️ by [salarizadi](https://salarizadi.ir)
