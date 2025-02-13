---
title: Discovery
layout: default
nav_order: 5
---

BeDoc offers a flexible, priority-based configuration system that adapts to
different use cases. It allows developers to configure the tool via CLI
options, environment variables, JSON files, `package.json` entries, and
defaults, ensuring seamless integration with diverse workflows.

---

## Supported Configuration Fields

The following configuration fields are supported by BeDoc:

|    **Field**    | **Description**                        | **Required** |         **Example**         |
| :-------------: | :------------------------------------- | :----------: | :-------------------------: |
|   `language`    | Specifies the language parser to use   |     Yes      |       `"javascript"`        |
|    `format`     | Defines the output format              |     Yes      |        `"markdown"`         |
|     `input`     | Files or directories to include        |     Yes      |       `"src/**/*.js"`       |
|    `exclude`    | Files or directories to exclude        |      No      |   `["src/**/*.test.js"]`    |
|    `output`     | Output directory for generated docs    |      No      |        `"docs/api"`         |
|    `parser`     | Path to a custom parser module         |      No      | `"./engines/my-parser.js"`  |
|    `printer`    | Path to a custom printer module        |      No      | `"./engines/my-printer.js"` |
|    `config`     | Path to a JSON configuration file      |      No      |   `"./bedoc.config.json"`   |
|     `mock`      | Enables mock mode for testing modules  |      No      |     `./test/bedoc-mock`     |
|     `hooks`     | Path to a custom hooks module          |      No      |       `"./hooks.js"`        |
|     `debug`     | Enables debug mode                     |      No      |                             |
|  `debugLevel`   | Sets the verbosity of debug logs (0-4) |      No      |             `2`             |
|  `hookTimeout`  | Maximum time (ms) for hooks to execute |      No      |           `5000`            |
| `maxConcurrent` | Maximum concurrent files to process    |      No      |            `500`            |

### **Defaults**

   If no explicit configuration is provided for these fields, BeDoc will use
   the following defaults:

   | **Field**     | **Default** |
   | ------------- | ----------- |
   | `debug`       | `false`     |
   | `debugLevel`  | `0`         |
   | `hookTimeout` | `5000`      |


## Configuration Hierarchy

BeDoc resolves configurations based on the following priority (highest to
lowest):

### 1. Explicit CLI Options

   ```bash
   bedoc -l javascript -f markdown -i "src/**/*.js" -o docs
   ```

   | **Option**        | **Alias** | **Description**                     | **Default** |
   | ----------------- | --------- | ----------------------------------- | ----------- |
   | `--language`      | `-l`      | Language to be parsed               |             |
   | `--format`        | `-f`      | Output format                       |             |
   | `--input`         | `-i`      | Files or directories to include     |             |
   | `--exclude`       | `-x`      | Files or directories to exclude     |             |
   | `--output`        | `-o`      | Output directory                    |             |
   | `--hooks`         | `-k`      | Path to custom hooks module         |             |
   | `--parser`        | `-p`      | Path to custom parser module        |             |
   | `--printer`       | `-P`      | Path to custom printer module       |             |
   | `--config`        | `-c`      | Path to JSON config file            |             |
   | `--mock`          | `-m`      | Path to mock parsers and printers   | `false`     |
   | `--debug`         | `-d`      | Enable debug mode                   | Absent      |
   | `--debugLevel`    | `-D`      | Set debug verbosity (0-4)           | `0`         |
   | `--hookTimeout`   | `-T`      | Maximum time (ms) for hooks         | `5000`      |
   | `--maxConcurrent` | `-C`      | Maximum concurrent files to process | `10`        |

### 2. Environment Variables

Configuration fields can also be set via environment variables. Use the
`BEDOC_` prefix followed by the field name in uppercase.

   For **Bash**:
   ```bash
   export BEDOC_LANGUAGE=javascript
   export BEDOC_FORMAT=markdown
   export BEDOC_INPUT="src/**/*.js"
   export BEDOC_OUTPUT="docs"
   export BEDOC_HOOKTIMEOUT=5000
   ```

   For **Windows**:
   ```powershell
   set BEDOC_LANGUAGE=javascript
   set BEDOC_FORMAT=markdown
   set BEDOC_INPUT="src/**/*.js"
   set BEDOC_OUTPUT=docs
   set BEDOC_HOOKTIMEOUT=5000
   ```

### 3. JSON Config File

   Example `bedoc.config.json`:
   ```json
   {
     "language": "javascript",
     "format": "markdown",
     "input": ["src/**/*.js"],
     "output": "docs/api",
     "exclude": ["src/**/*.test.js"],
     "debug": true,
     "hookTimeout": 5000
   }
   ```

### 4. `package.json` Entries

   Example `package.json`:
   ```json
   {
     "name": "my-project",
     "version": "1.0.0",
     "bedoc": {
       "language": "python",
       "format": "html",
       "input": ["src/**/*.py"],
       "output": "docs/html",
       "hookTimeout": 5000
     }
   }
   ```

---

### File matching

The `input` and `exclude` fields accept one or more values per configuration
item.

**CLI**, **Environment Variables**: Multiple values are expressed as
comma-separated strings.

```bash
--input src/**/*.js,src/**/*.ts --exclude src/**/*.test.js
```

```bash
BEDOC_INPUT="src/**/*.js,src/**/*.ts"
BEDOC_EXCLUDE="src/**/*.test.js"
```

**JSON**: These values are represented as arrays of strings. Such as in
a custom configuration file, or `package.json`.

```json
"input": ["src/**/*.js", "src/**/*.ts"]
"exclude": ["src/**/*.test.js"]
```

### Exclusivity

Some options are mutually exclusive. Specifying a configuration field that
conflicts with another will result in an error.

| **Field**  | **Exclusive of** |
| ---------- | ---------------- |
| `language` | `parser`         |
| `format`   | `printer`        |

`language` and `parser` serve the same goal, with the difference being that
specifying a language will find a matching parser, whereas, specifying a
parser will use that parser directly. The same is true of `format` and
`printer`.

---

## Advanced Use Cases

### Mixing Configurations
You can combine multiple configuration methods. For instance:

- Use `package.json` for default settings.
- Override specific fields with environment variables for CI/CD.
- Fine-tune the behavior for a one-off run using CLI options.

### Dynamic Configurations
Configuration fields like `input` and `output` support glob patterns, enabling
dynamic inclusion or exclusion of files.

### Debugging Configurations
Enable debug mode to inspect how configurations are resolved and applied:
```bash
bedoc -d -D 4
```
This outputs detailed logs, including configuration sources and values.

---

By leveraging BeDoc's cascading configuration system, you can fine-tune your
documentation workflows to suit any project or environment.
