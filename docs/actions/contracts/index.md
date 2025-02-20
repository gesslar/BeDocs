---
title: Contracts
layout: default
sidebar_position: 3
---

Contracts are the glue that binds parsers and printers together by agreeing
on the terms and conditions and the fine print and all of that in order
to successfully cooperate in traversing the BeDoc pipeline from source
text to produced text.

A contract is either a JSON5 or YAML string that contains terms according to
a [schema](schema) of what it will provide or accept.

## Discovery

During the [discovery](/start/discovery) phase, BeDoc attempts to match parsers
with printers according to their contracts. If tehre are a number of parsers
and printers that share the same format or language, the first pair that
agrees on a contract will be the ones selected for the job.

:::tip[Best Practice]

To reduce errors or mismatches, it is advised to either
[specify](/configuration) a parser or printer pairing, or limit
the number of potential matches of installed actions.

:::

## Processing

Contracts are also employed during the processing in order to ensure that
there is accountability by each action.

### Parsing

Once parsing has completed, the produced object is compared with the contract
that the parser has agreed to provide. If it fails to live up to its promise,
BeDoc will ~~rain down all sorts of fire and bri~~ throw an error and halt the
production of that particular document.

### Printer

Before passing the structured, parsed object to the printer, BeDoc will
compare the produced document to ensure that it lives up to the contract
the printer had agreed upon. Thus ensuring that the shape of the data does,
in fact, match the data the printer had promised, no-fingers-crossed, that
it would admit.

## Schema

Contracts must follow a specific, though fairly liberal schema. Very few
stipulations exist, but, those that do, must be followed in order for
a contract to be valid.

BeDoc will evaluate a contract for structured correctness before it will
allow it to be used. Inadmissable contracts will be deemed invalid and
will prevent the action to which it belongs from being used.

### Getting meta with it

Essentially, what is happening when you create a contract, is that you are
defining a schema that describes the shape of the data the action
is willing to work with. And this schema is governed by the BeDoc schema
(which is governed by the JSON schema schema... anyway).

:::note

Read the [Schema Guide](schema) to learn even more dry content
about schemas.

:::

Your contract must be expressed as a string in either YAML or JSON5 format (or JSON, or JSONC *if you insist*, you... old-timey person.)

See the [Contract Examples](/examples/contracts) for both YAML and JSON5.
