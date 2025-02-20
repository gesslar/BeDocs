---
layout: default
slug: /
---

BeDoc is designed to bridge the gap for languages and formats that lack strong support for documentation generation. Whether you’re working with a niche language like LPC or Lua or targeting unconventional outputs like Wikitext, BeDoc empowers you to transform your code into polished documentation. With unparalleled flexibility and extensibility, BeDoc adapts to your needs—even if existing tools don’t.

---

## Why Choose BeDoc?

- **Support for Niche Use Cases**: Generate documentation for lesser-supported languages and formats, from LPC to Markdown or JavaScript to Wikitext.
- **Customizable Output**: Tailor documentation to fit any format, including those not commonly addressed by traditional tools.
- **Seamless Integration**: Use BeDoc via the command line, Visual Studio Code, or GitHub Actions.
- **Powerful Hook System**: Extend every part of the pipeline with async hooks, enabling network requests, API integrations, or any custom logic.
- **Priority-Based Configuration**: Layered, cascading configuration supports JSON files, environment variables, CLI options, and package.json entries.

---

## Quick Start

### 1. Install BeDoc
```bash
# Install globally
npm i -g bedoc

# Or add to your project
npm i --save-dev bedoc
```

### 2. Generate Documentation
```bash
# Example: Generate Markdown docs for JavaScript files
bedoc -l javascript -f markdown -i src/**/*.js -o docs
```

### 3. Use a Config File
Simplify your workflow with a configuration file:
```json
{
  "language": "javascript",
  "format": "markdown",
  "input": ["src/**/*.js"],
  "output": "docs"
}
```
Run with:
```bash
bedoc -c bedoc.config.json
```

---

## Key Use Cases

### Documenting APIs
Generate clear and structured API documentation for languages and frameworks that lack built-in tools.

### Supporting Niche Formats
Convert code comments to Markdown, Wikitext, or other less common formats seamlessly.

### Automating Workflows
Integrate BeDoc into CI/CD pipelines with GitHub Actions or similar tools to keep documentation up-to-date.

---

## Feature Highlights

### Parsers: Adapt to Any Language
BeDoc’s parsers analyze your code and extract meaningful documentation, even for niche languages. Create custom parsers to support any syntax or annotations. [Learn More About Parsers](actions/parsers)

### Printers: Flexible Outputs
Printers transform parsed data into your desired format, from Markdown to less common formats like Wikitext. Async support enables powerful integrations like fetching additional data during formatting. [Learn More About Printers](actions/printers)

### Hooks: Customize Every Step
Hooks allow you to extend and modify the documentation process at any point. Use them to add metadata, validate content, or integrate with APIs—all with async capabilities. [Learn More About Hooks](actions/hooks)

### Priority-Based Configuration
BeDoc’s configuration system is layered and cascading, supporting priorities across JSON files, environment variables, CLI options, and package.json entries.

---

## Example Configurations

### Markdown for LPC

```json
{
  "language": "lpc",
  "format": "markdown",
  "input": ["src/**/*.c"],
  "output": "docs/simul_efun"
}
```

### Wikitext for Lua

```json
{
  "language": "lua",
  "format": "wikitext",
  "input": ["src/**/*.lua"],
  "output": "docs/wiki"
}
```

---

## Explore More

- **[Parsers](/actions/parsers)**: Create custom parsers for your language or framework.
- **[Printers](/actions/printers)**: Build printers for your preferred output format.
- **[Hooks](/actions/hooks)**: Modify and enhance the documentation pipeline.

---

Ready to elevate your documentation game? Install BeDoc and start building
documentation that works for you!
