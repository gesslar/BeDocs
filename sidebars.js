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
    {
      type: "category",
      label: "Getting Started",
      link: { type: "generated-index" },
      collapsed: false,
      items: [
        "start/index",
        "start/installation",
        "start/configuration",
        "start/discovery",
        "start/test",
      ]
    },
    {
      type: "category",
      label: "Building Actions",
      link: { type: "generated-index" },
      collapsed: false,
      items: [
        "actions/index",
        "actions/parsers",
        "actions/printers",
        "actions/contracts/index",
        "actions/hooks",
      ]
    },
    {
      type: "category",
      label: "Objects",
      link: { type: "generated-index" },
      collapsed: true,
      items: [
        "objects/index",
        "objects/logger",
        "objects/file_and_dir",
      ]
    },
  ],

  examples: [
    {
      type: "autogenerated",
      dirName: "examples",
    },
  ],
};

export default sidebars;
