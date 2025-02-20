import fs from "node:fs"
import path from "node:path"
const visit = require('unist-util-visit');

export default function mdSnippet(context, options) {
  return {
    name: "md-snippet",
    async loadContent(context, options) {
      return JSON.stringify(options)
    },
    async contentLoaded({ content, actions }) {
      return JSON.stringify(content)
    }
  };
};
