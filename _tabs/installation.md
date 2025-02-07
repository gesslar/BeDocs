---
layout: post
icon: fas fa-floppy-disk
order: 2
---

Installation of BeDoc is straightforward and can be done via npm or yarn. The
tool was built and tested on Node.js v23.5.0.

## Installation

BeDoc may be run as a standalone tool or as part of a project.

### Standalone

Installing BeDoc globally enables you to run it from the command line as well
as use it in your projects.

#### npm

```bash
npm install -g @gesslar/bedoc
```

#### yarn

```bash
yarn global add @gesslar/bedoc
```

### Project

If you prefer to keep BeDoc local to your project, you can install it as a
development dependency.

#### npm

```bash
npm i -D @gesslar/bedoc
```

#### yarn

```bash
yarn add --dev @gesslar/bedoc
```

## Next Steps

After installation, you can start generating documentation with BeDoc. Check
out the [Configuration Guide](/configuration) to learn how to configure the
tool via CLI options, environment variables, JSON files, and more, as well
as how to incorporate BeDoc into your project workflow.
