// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';
// import { remarkSnippet } from "./src/plugins/remark-snippet.js"

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'BeDoc',
  tagline: 'Bespoke Documentation',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://bedoc.gesslar.dev/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'gesslar', // Usually your GitHub org/user name.
  projectName: 'BeDocs', // Usually your repo name.
  deploymentBranch: "gh-pages",

  onBrokenLinks: 'throw',
  onBrokenAnchors: "throw",
  onBrokenMarkdownLinks: 'throw',
  onDuplicateRoutes: "throw",

  trailingSlash: false,

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],


  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    "./src/plugins/md-snippet"
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: './sidebars.js',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/project-management.png',
      scrollToTop: true,
      scrollToTopOptions: {
        zIndex: 100,
      },

      docs: {
        sidebar: {
          hideable: true
        },
      },

      navbar: {
        title: 'BeDoc',
        logo: {
          alt: 'BeDoc logo',
          src: 'img/project-management.png',
        },
        items: [
          { to: "/start", label: "Getting Started", position: "left" },
          { to: "/category/examples", label: "Examples", position: "left" },
          // {
          //   href: 'https://github.com/gesslar/BeDoc',
          //   // label: 'GitHub',
          //   className: "header-github-link", "aria-label": "GitHub repository",
          //   position: 'right',
          //   type: "icon"
          // },
          {
            href: 'https://github.com/gesslar/BeDoc',
            position: "right",
            className: "header--github-link",
            "aria-label": "GitHub repository",
          },
        ],
      },

      footer: {
        style: 'dark',
        links: [],
        copyright: `🙅🏻<del>Copyright ©${new Date().getFullYear()}</del>🙅🏻<br /><a href="https://unlicense.org"/>Unlicensed</a> BeDoc. Built with Docusaurus.`,
      },

      prism: {
        theme: prismThemes.vsDark,
        darkTheme: prismThemes.vsDark,
      },

      scripts: [
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/js/all.min.js"
      ],

      titleDelimiter: "😱"
    }),
};

export default config;
