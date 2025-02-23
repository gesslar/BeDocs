---
title: FileMap and DirMap
layout: default
sidebar_position: 5
---

## **Understanding FileMap and DirMap**

BeDoc uses **FileMap** and **DirMap** as structured representations of files and directories. These objects provide a consistent interface for handling paths, metadata, and relationships between files and directories.

### **DirMap** (Directory Representation)

A **DirMap** represents a directory and contains essential metadata about it, including separator information for cross-platform compatibility.

A **DirMap** represents a directory and contains essential metadata about it.

#### **Properties**

| Property       | Type   | Description                                      |
| -------------- | ------ | ------------------------------------------------ |
| `path`         | string | The relative path to the directory               |
| `uri`          | string | The URI representation of the directory          |
| `absolutePath` | string | The absolute path to the directory               |
| `absoluteUri`  | string | The absolute URI representation of the directory |
| `name`         | string | The name of the directory                        |
| `separator`    | string | The directory separator (`/` or `\`)             |
| `absoluteUri`  | string | The absolute URI representation of the directory |
| `isFile`       | false  | Always `false` since this is a directory         |
| `isDirectory`  | true   | Always `true` since this is a directory          |

### **FileMap** (File Representation)

A **FileMap** represents a file, extending the information provided by a **DirMap** by including file-specific metadata, such as the absolute URI and separator.

A **FileMap** represents a file, extending the information provided by a **DirMap** by including file-specific metadata.

#### **Properties**

| Property       | Type   | Description                                 |
| -------------- | ------ | ------------------------------------------- |
| `path`         | string | The relative path to the file               |
| `uri`          | string | The URI representation of the file          |
| `absolutePath` | string | The absolute path to the file               |
| `absoluteUri`  | string | The absolute URI representation of the file |
| `name`         | string | The name of the file (with extension)       |
| `module`       | string | The file name without its extension         |
| `extension`    | string | The file extension (e.g., `.js`, `.txt`)    |
| `isFile`       | true   | Always `true` since this is a file          |
| `isDirectory`  | false  | Always `false` since this is a file         |
| `directory`    | DirMap | The directory containing this file          |
| `absoluteUri`  | string | The absolute URI representation of the file |
| `separator`    | string | The directory separator (`/` or `\`)        |

### **Relationship Between FileMap and DirMap**

Every **FileMap** contains a **DirMap**, ensuring that every file is associated with a directory, allowing BeDoc to efficiently track **which directory a file belongs to**. This ensures structured file handling within BeDoc workflows.

For example:
```javascript
const myFile = {
  path: "examples/node_modules_test/bedoc-markdown-printer/bedoc-markdown-printer.js",
  uri: "file:///d:/git/BeDoc/examples/node_modules_test/bedoc-markdown-printer/bedoc-markdown-printer.js",
  absolutePath: "d:/git/BeDoc/examples/node_modules_test/bedoc-markdown-printer/bedoc-markdown-printer.js",
  absoluteUri: "file:///d:/git/BeDoc/examples/node_modules_test/bedoc-markdown-printer/bedoc-markdown-printer.js",
  name: "bedoc-markdown-printer.js",
  module: "bedoc-markdown-printer",
  extension: ".js",
  isFile: true,
  isDirectory: false,
  separator: "\",
  directory: {
    path: "examples/node_modules_test/bedoc-markdown-printer",
    uri: "file:///d:/git/BeDoc/examples/node_modules_test/bedoc-markdown-printer",
    absolutePath: "d:/git/BeDoc/examples/node_modules_test/bedoc-markdown-printer",
    absoluteUri: "file:///d:/git/BeDoc/examples/node_modules_test/bedoc-markdown-printer",
    name: "bedoc-markdown-printer",
    separator: "\",
    isFile: false,
    isDirectory: true
  }
};
```
This structure allows for easy **traversal and management** of files and directories in BeDoc.
