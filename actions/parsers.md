---
layout: post
icon: fas fa-code
category: ["Actions", "Parsers"]
toc: true
order: 4
---

This guide explains how to create custom parsers for BeDoc. Parsers are
responsible for analyzing source code and extracting documentation information,
producing a structured output that can be consumed and transformed by printers.

A BeDoc parser consists of four parts:

1. **Meta Information**: Defines the language and file extension. (_required_)
2. **Contract**: Specifies the parser interface. (_required_)
3. **Parser Object**: Implements the parsing logic. (_required_)
4. **Hooks**: Supports [hook points](hooks) for custom logic. (_optional_, _external_)

A parser action is contained in a [JavaScript action
file](/actions#action-file).

## Parser Structure

Here's the minimal structure for a BeDoc parser:

### Parser
```javascript
{
  // Define meta information
  meta = {
    language: "mylang",      // Language identifier
    languageExtension: ".ml" // File extension
  },

  // Implement the parser
  async parse(file, content) {
    // Parse the content and return a response

    try {
      const result = content.toUpperCase()

      return {
        status: "success",
        result
      }
    } catch (error) {
      status: "error",
      error
    }
  }
}
```

### Contract
```javascript
`
provides:
  root:
    dataType: string
    required: true
`
```

## Logging

The parser has access to BeDoc's core logging utilities through `this.log`.
There are four logging functions available:

- `this.log.debug(string[, ...arg])`: Debug messages
  ```javascript
  async parse(file, content) {
    this.log.debug("This will only show in debug mode")
  }

  // [BeDoc] Debug: This will only show in debug mode
  ```
- `this.log.info(string[, ...arg])`: Informational messages
  ```javascript
  async parse(file, content) {
    this.log.info("A wild Happy Fun Ball has appeared.")
  }

  // [BeDoc] Info: A wild Happy Fun Ball has appeared.
  ```
- `this.log.warn(string[, ...arg])`: Warning messages
  ```javascript
  async parse(file, content) {
    this.log.warn("Do not taunt Happy Fun Ball.")
  }

  // [BeDoc] Warn: Do not taunt Happy Fun Ball.
  ```
- `this.log.error(string[, ...arg])`: Error messages
  ```javascript
  async parse(file, content) {
    this.log.error("You have been eaten by Happy Fun Ball. 🙀")
  }

  // [BeDoc] Error: You have been eaten by Happy Fun Ball. 🙀
  ```

## Hook Support

Parsers automatically support [hooks](hooks), allowing users to modify the
content during parsing process. The following hooks are available:

- `module_start`: Before parsing begins
- `section_start`: At the beginning of a new section over which the parser is
  iterating.
- `enter` and `exit`: When entering and exiting specific parts of a section
  that are being parsed (ex. description, parameters, returns, function
  signature).
- `section_end`: At the end of a section.
- `module_end`: After parsing completes

## Example Implementation

Here's a simplified example of a documentation parser and its contract:

### Parser
```javascript
{
  meta = {
    language: "example",
    languageExtension: ".ex"
  },

  patterns = {
    docStart: /^\s*\/\*\*(.*)$/,    // /** Start of doc block
    docEnd: /^\s*\*\/\s*$/,         // */ End of doc block
    docLine: /^\s*\*\s?(.*)$/,      // * Documentation line
    funcDef: /^function\s+(\w+)/    // Function definition
  }

  async parse(file, content) {
    try {
      const hook = this.hook
      const {
        MODULE_START, SECTION_LOAD, ENTER, EXIT, SECTION_END, MODULE_EN
      } = this.HOOKS

      const result = {
        file,
        raw: content,
        funcs: []
      }

      const patterns = this.patterns
      const lines = content.split(/\r?\n/)
      const funcs = []
      let currentFunc = null
      let inDoc = false

      for(let i = 0; i < lines.length; i++) {
        const line = lines[i]

        if(patterns.docStart.test(line)) {
          inDoc = true
          currentFunc = { description: [] }
          continue
        }

        if(inDoc && patterns.docEnd.test(line)) {
          inDoc = false
          continue
        }

        if(inDoc && patterns.docLine.test(line)) {
          const [, content] = patterns.docLine.exec(line)
          currentFunc.description.push(content)
          continue
        }

        if(!inDoc && currentFunc) {
          const funcMatch = patterns.funcDef.exec(line)
          if(funcMatch) {
            currentFunc.name = funcMatch[1]
            funcs.push(currentFunc)
            currentFunc = null
          }
        }
      }

      return {
        status: "success",
        result
      }
    } catch (error) {
      return {
        status: "error",
        error,
      }
    }
  }
}
```

### Contract
```javascript
`
provides:
  root:
    dataType: object
    funcs:
      dataType: object[]
      contains:
        name:
          dataType: string
        description:
          dataType: string[]
`
```

## Best Practices

1. **Error Handling**: Be sure to catch and properly report errors from async
   operations.
2. **Async Support**: Make your parser async to handle large files efficiently
   and support async hooks.
3. **Validation**: Validate input parameters and document structure before
   processing.
4. **Logging**: Use the provided log functions for debugging and error
   tracking:
   ```javascript
   this.log.debug("Processing file...")
   this.log.error("Failed to parse line %s", line)
   ```
5. **State Management**: Keep track of parser state (e.g., inside comment
   block, current function) clearly and reset it appropriately.

## Testing Your Parser

BeDoc provides multiple ways to test your parsers:

1. **Mock Mode**: Test using a local mock environment:
   ```bash
   bedoc --mock ./my-parser -l mylang -f markdown -i test/*.ml -o test/docs
   ```

2. **Direct File Usage**: Test your parser file directly without installation:
   ```bash
   bedoc --parser ./my-parser.js --format markdown -i test/*.ml -o test/docs

   # Or use the short form
   bedoc -p ./my-parser.js -f markdown -i test/*.ml -o test/docs
   ```

These options allow you to rapidly iterate on your parser implementation
without needing to package and install it first. The direct file usage is
particularly helpful during initial development and debugging.

## Publishing Your Parser

When ready to publish, package your parser following BeDoc's naming and
structure conventions:

```jsonc
{
  "name": "bedoc-mylang-parser",  // bedoc-<language>-parser-<anything_else>
  "version": "1.0.0",
  "type": "module",
  "description": "MyLang parser for BeDoc",
  "bedoc": {
    "actions": [
      "./bedoc-mylang-parser.js"
    ]
  }
}
```

This structure allows BeDoc to automatically discover and load your parser when
installed.
