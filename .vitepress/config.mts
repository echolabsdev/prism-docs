import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Prism",
  head: [
    [
      "script",
      {
        defer: "",
        src: "https://analytics.echolabs.dev/script.js",
        "data-website-id": "38989bda-90b5-47af-81ab-57a823480b9e",
      },
    ],
  ],
  description:
    "Prism is a powerful Laravel package for integrating Large Language Models (LLMs) into your applications.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "/introduction" },
      { text: "Sponsor", link: "https://github.com/sponsors/sixlive" },
      { text: "Github", link: "https://github.com/echolabsdev/prism" },
    ],

    sidebar: [
      {
        items: [
          {
            text: "Getting Started",
            items: [
              { text: "Introduction", link: "/introduction" },
              { text: "Installation", link: "/installation" },
              { text: "Configuration", link: "/configuration" },
            ],
          },
          { text: "Generating Text", link: "/generating-text" },
          { text: "Tool Calling", link: "/tool-calling" },
          { text: "Agents", link: "/agents" },
          { text: "Prism Server", link: "/prism-server" },
          { text: "Custom Drivers", link: "/custom-drivers" },
          { text: "Roadmap", link: "/roadmap" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/echolabsdev/prism" },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present TJ Miller",
    },
  },
});
