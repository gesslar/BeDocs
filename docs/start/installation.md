---
title: Installation
layout: default
sidebar_position: 1
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

Installation of BeDoc is straightforward and can be done via npm or yarn. The
tool was built and tested on Node.js v23.5.0.

## Installation

BeDoc may be run as a standalone tool or as part of a project.

### Standalone

Installing BeDoc globally enables you to run it from the command line as well
as use it in your projects.

<Tabs
  defaultValue="npm"
  values={[
    {label: "NPM", value: "npm"},
    {label: "yarn", value: "yarn"},
  ]}>
  <TabItem value="npm">
  ```bash
  npm i -g @gesslar/bedoc
  ```
  </TabItem>
  <TabItem value="yarn">
  ```bash
  yarn global add @gesslar/bedoc
  ```
  </TabItem>
</Tabs>

### Project

If you prefer to keep BeDoc local to your project, you can install it as a
development dependency.

<Tabs
  defaultValue="npm"
  values={[
    {label: "NPM", value: "npm"},
    {label: "yarn", value: "yarn"},
  ]}>
  <TabItem value="npm">
  ```bash
 npm i -D @gesslar/bedoc
  ```
  </TabItem>
  <TabItem value="yarn">
  ```bash
 yarn add --dev @gesslar/bedoc
  ```
  </TabItem>
</Tabs>

## Next Steps

After installation, you can start generating documentation with BeDoc. Check
out the [Configuration Guide](configuration) to learn how to configure the
tool via CLI options, environment variables, JSON files, and more, as well
as how to incorporate BeDoc into your project workflow.
