---
layout: post
icon: fas fa-bolt-lightning
order: 4
---

Actions are the core of BeDoc's functionality. They define the primary tasks
that the tool can perform, such as parsing source code, generating
documentation, and running custom scripts.

To learn more about creating an action, please see [Creating an Action](creating_an_action).

## Parse

The `parse` action reads source code files, extracts documentation information,
and generates a structured output that can be consumed by printers. Parsers are
responsible for analyzing the source code and producing a structured output.

Read the [Parser Guide](parsers) to learn how to create custom parsers for
BeDoc.

## Print

The `print` action transforms parsed documentation into specific output formats
like Markdown, HTML, or any other format you need. Printers are responsible for
formatting the documentation content.

Read the [Printer Guide](printers) to learn how to create custom printers for
BeDoc.

## Hooks

While not strictly an action, hooks provide a way to modify and enhance the
documentation process by injecting custom logic at specific points. With full
async/await support, hooks can integrate with external services, APIs, and
tools.

Read the [Hooks Guide](/hooks) to learn how to create custom hooks for BeDoc.

## Action File

Actions are contained in a JavaScript file, which exports two arrays.

1. An [array of objects](#actions) providing the each action's meta information
   and implementation.
2. An [array of strings](#contracts) defining the contract for each action.

The arrays must be of the same size and in the same order, with each object in
the first array corresponding to the object in the second array.

In this way, one may have one or more action implementations, each with its own
contract, such that one might be able to provide any number of actions (parsers
and printers) within the same file. Making this incredibly portable.

### Actions

The first array, is an array of objects that define the actions.

|     **Field**      | **Parameters**                    |          **Description**          | **Required** |
| :----------------: | :-------------------------------- | :-------------------------------: |
|       `meta`       | n/a                               |  Meta information for the action  | Yes          |
|       `init`       | `object: config`                  | Function to initialize the action | No           |
| `parse` or `print` | `string: file`, `object: content` |  Function to execute the action   | Yes          |

#### Example

```javascript
export const actions = [
  {
    meta: Object.freeze({
      action: "parse",
      language: "lpc",
    }),

    async init(config) {
      // Initialize the parser/printer
    }

    parse(file, content) {
      // Execute the action

      const result = this.doTheThing(content)

      return {
        status: "success",
        result: {
          file,
          raw: content,
          result
        }
      }
    }

    doTheThing(content) {
      // Do the thing

      return "result"
    }
  },

  {
    meta: Object.freeze({
      action: "print",
      format: "markdown",
    }),

    async init(config) {
      // Initialize the parser/printer
    }

    print(module, content) {
      // Execute the action

      const result = this.doTheThing(content)

      return {
        status: "success",
        destFile: `${module}.md`,
        content: result
      }
    }
  }
]
```

### Contracts

The second array is an array of strings that define the contract for each
action, in the same order as the first array. Contracts are expressed as YAML
strings, and define the expected input and output from the corresponding
action.

Each node in the contract is a key-value pair, where the key is the name of the
field, and the criteria are the value.

The top of a YAML structure for parsers is `provides` and the top of a YAML
structure for printers is `accepts`.

The following fields compose a node in the contract:

|   **Field**    | **Description**                | **Required** |          **Example**          |
| :------------: | :----------------------------- | :----------: | :---------------------------: |
|    **name**    | The section/field name         |     Yes      |   `root`, `param`, `return`   |
| **`dataType`** | The data type. May be a union. |     Yes      | `string`, `number[]`, `string | string[]` |
| **`required`** | Whether the field is required  |      No      |            `true`             |
| **`contains`** | The next level of the contract |      No      |                               |

#### Example

```javascript
export const contracts = [
`
---
accepts:
  root:
    dataType: object
    required: true
    contains:
      functions:
        dataType: object[]
        required: true
        contains:
          name:
            dataType: string
            required: true  # Used in sorting and section headers
          description:
            dataType: string[]  # Optional, handled gracefully if missing
          param:
            dataType: object[]
            contains:
              type:
                dataType: string|string[]
                required: true  # Used in param formatting
              name:
                dataType: string
                required: true  # Used in param formatting
              content:
                dataType: string[]
                required: true  # Used for param descriptions
          return:
            dataType: object
            contains:
              type:
                dataType: string|string[]
                required: true  # Used in return type display
              content:
                dataType: string[]  # Optional, handled if missing
          example:
            dataType: string[]  # Optional, handled gracefully if missing
`,
]
```
