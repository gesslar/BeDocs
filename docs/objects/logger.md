---
title: Logger
hide_title: true
---

## **Logging in BeDoc**

BeDoc provides a built-in logging utility that ensures **consistent, structured, and aesthetically pleasing logs** across the system. Instead of using `console.log`, actions such as parsers, printers, and hooks receive a **Logger instance** for unified logging.

### **Logging Levels**

The logger offers **four levels of logging**, each serving a distinct purpose:

| Level | Method                | Purpose                                               |
| ----- | --------------------- | ----------------------------------------------------- |
| Debug | `this.log.debug(...)` | Development & troubleshooting (only in debug mode)    |
| Info  | `this.log.info(...)`  | General runtime messages                              |
| Warn  | `this.log.warn(...)`  | Indicates potential issues without stopping execution |
| Error | `this.log.error(...)` | Critical errors that require attention                |


Each log message is **tagged** and formatted consistently, making it easy to trace the source of logs.

### **Examples of Logging Levels**

BeDoc's logging framework ensures that messages are both informative and, when appropriate, entertaining.

- `this.log.debug(string[, ...arg])`: Debug messages
  ```javascript
  async parse(file, content) {
    this.log.debug("This will only show in debug mode");
  }

  // [BeDoc] Debug: This will only show in debug mode
  ```
- `this.log.info(string[, ...arg])`: Informational messages
  ```javascript
  async parse(file, content) {
    this.log.info("A wild Happy Fun Ball has appeared.");
  }

  // [BeDoc] Info: A wild Happy Fun Ball has appeared.
  ```
- `this.log.warn(string[, ...arg])`: Warning messages
  ```javascript
  async parse(file, content) {
    this.log.warn("Do not taunt Happy Fun Ball.");
  }

  // [BeDoc] Warn: Do not taunt Happy Fun Ball.
  ```
- `this.log.error(string[, ...arg])`: Error messages
  ```javascript
  async parse(file, content) {
    this.log.error("You have been eaten by Happy Fun Ball. 🙀");
  }

  // [BeDoc] Error: You have been eaten by Happy Fun Ball. 🙀
  ```

By standardizing logging across BeDoc, it ensures **clear, useful logs** for debugging and tracing execution.

### **Debug Logging Granularity**

Debug logging in BeDoc is controlled by two primary settings:

- **Debug Mode (`--debug`)** → Enables debug logging, allowing `this.log.debug(...)` messages to appear.
- **Debug Level (`--debugLevel <level>`)** → Controls the verbosity of debug logs.

#### **How Debug Mode Works**
When `--debug` is enabled, any log messages at the **debug level** will be output alongside standard logs. If `--debug` is **not** set, debug messages are **completely suppressed**.

**Example usage:**
```sh
bedoc --debug --debugLevel 2
```
This command enables debug mode and sets the verbosity level to `2`, providing additional insight into execution flow.

#### **Debug Level (`--debugLevel <level>`)**

The debug level allows for **fine-grained control** over logging verbosity. The higher the level, the more details are logged.

| Debug Level | Description                                                   |
| ----------- | ------------------------------------------------------------- |
| 0           | Minimal output, only critical information                     |
| 1           | Basic debug details, startup/shutdown info                    |
| 2           | Intermediate details, action discovery, setup                 |
| 3           | Detailed processing logs, execution tracking                  |
| 4           | Very verbose logging, low-level internal details (nerd mode!) |

#### **Filtering by Debug Level**
Debug messages are only displayed if the specified `debugLevel` meets or exceeds the message’s level.

For example:
```javascript
this.log.debug("This is level 2 debug", 2);
```
- If `--debugLevel 1` is set, this message **will not appear**.
- If `--debugLevel 2` or higher is set, the message **will be displayed**.
