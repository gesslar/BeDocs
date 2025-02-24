// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */

const sidebars = {
  docs: [
    "index",
    {
      type: "category",
      label: "Getting Started",
      collapsible: true,
      collapsed: false,
      items: [
        "start/getting_started",
        "start/installation",
        "start/configuration",
        "start/discovery",
      ]
    },
    {
      "Building Actions": [
        "actions/actions",
        "actions/parsers",
        "actions/printers",
        "actions/contracts",
        "actions/hooks",
      ]
    },
    {
      "Objects": [
        "objects/logger",
        "objects/file_and_dir",
      ]
    },
  ],

  examples: [
    {
      "BeDoc Examples": ["examples/contracts",]
    }
  ],
};

export default sidebars;
