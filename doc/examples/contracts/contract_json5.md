---
layout: default
title: JSON5
parent: Contract Examples
---

## Parser

```json
{
  "$schema": "https://bedoc.gesslar.dev/schemas/v1/bedoc.action.json",
  "provides": {
    "type": "object",
    "properties": {
      "functions": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "description": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "param": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string"
                  },
                  "name": {
                    "type": "string"
                  },
                  "content": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                }
              }
            },
            "return": {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string"
                },
                "content": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              }
            },
            "example": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          }
        }
      }
    }
  }
}
```

## Printer

```json
{
  "$schema": "https://bedoc.gesslar.dev/schemas/v1/bedoc.action.json",
  "accepts": {
    "type": "object",
    "required": [
      "functions"
    ],
    "properties": {
      "functions": {
        "type": "array",
        "items": {
          "type": "object",
          "required": [
            "name"
          ],
          "properties": {
            "name": {
              "type": "string"
            },
            "description": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "param": {
              "type": "array",
              "items": {
                "type": "object",
                "required": [
                  "name",
                  "type"
                ],
                "properties": {
                  "type": {
                    "oneOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      }
                    ]
                  },
                  "name": {
                    "type": "string"
                  },
                  "content": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                }
              }
            },
            "return": {
              "type": "object",
              "required": [
                "type"
              ],
              "properties": {
                "type": {
                  "oneOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    }
                  ]
                },
                "content": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              }
            },
            "example": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          }
        }
      }
    }
  }
}
```
