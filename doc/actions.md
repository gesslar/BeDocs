---
title: Actions
layout: default
nav_order: 4
---

Actions are the core of BeDoc's functionality. They define the primary tasks
that the tool can perform, such as parsing source code, generating
documentation, and running custom scripts.

## Parse

The `parse` action reads source code files, extracts documentation information,
and generates a structured output that can be consumed by printers. Parsers are
responsible for analyzing the source code and producing a structured output.

Read the [Parser Guide](actions/parsers) to learn how to create parsers for
BeDoc.

## Print

The `print` action transforms parsed documentation into specific output formats
like Markdown, HTML, or any other format you need. Printers are responsible for
formatting the documentation content.

Read the [Printer Guide](actions/printers) to learn how to create printers for
BeDoc.

## Hooks

While not strictly an action, hooks provide a way to modify and enhance the
documentation process by injecting custom logic at specific points. With full
async/await support, hooks can integrate with external services, APIs, and
tools.

Read the [Hooks Guide](hooks) to learn how to create custom hooks for BeDoc.

## Module

A module is any JavaScript file that contains one or more, or a combination
of printers and parsers and exports two arrays.

1. An [array of objects](#actions) providing the each action's meta information
   and implementation.
2. An [array of strings](#contracts) defining the contract for each action, or
   references to external files that contain such contracts.

Each array must be of the same size and in the same order, with each action in
the first array corresponding to the contract in the second.

In this way, one may have one or more action implementations, each with its own
contract, such that one might be able to provide any number of actions (parsers
and printers) within the same file. Making this incredibly portable.

### Actions

The first array, is an array of objects that define the actions. Each object
has properties and methods that BeDoc calls, if present.

#### Mandatory

##### Properties

- **`meta`** - The meta object within an action describes information about
  the object. It has two required properties.

  - *`action`* - Must be one of
    - `parse` for parsers
    - `print` for printers

  - *`language`* - For parsers, this identifies the language handled by this
    action
  - *`format`* - For printers, this identifies the output format for this
    action

##### Methods

- **`run({file,moduleContent})`** - The `run()` method is the interface to
  the action that is called by BeDoc to initiate it. When called, BeDoc will
  pass an object containing a [FileMap](/doc/objects/filemap) of the current
  file being processed and the content to be processed.

  ```javascript
  {
    async run({file, moduleContent}) {}
  }
  ```

  In the case of a parser, the `moduleContent` will be the plain text from
  the file that was read.

  In the case of a printer, it will be a structured object that has been
  produced by the parser.

#### Optional

Optionally, there are additional methods that may be specified in your action
that BeDoc will call if present.

##### Methods

- `setup({log})` - This method will be called before the `run()`, providing
  an opportunity to perform some setup functions, such as caching the passed
  instance of the [Logger](/doc/tools/logger) class in your action.

  ```javascript
  {
    async setup({log}) {
      this.log = log
      this.log.info(`Ready to ${this.meta} some ${this.language || this.format}!`)
    }
  }
  ```

- `cleanup()` - This method will be called as BeDoc is shutting down, providing
  an opportunity to do some finalisation or cleanup, if such a need exists.

  ```javascript
  {
    async cleanup() {
      this.log.info(`Bye bye. 😿`)
    }
  }
  ```

{: .note }
> Each `setup()` and `cleanup()` for each action will occur once per
> BeDoc lifecycle. Unlike `run()`, which gets called for every module
> it processes, these methods only occur at the beginning and the end
> of the entire run.

### Contracts

The second array is an array of strings that define the contract for each
action, in the same order as the first array. Contracts are expressed as YAML
strings, and define the expected input or output from the corresponding
action.

Each contract provides terms for what it will either output, in the case of
parsers, or what it will accept, in the case of printers.

Read the [Contracts Guide](actions/contracts) to learn how to create contracts
for BeDoc.
