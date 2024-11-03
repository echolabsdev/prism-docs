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
      { text: "Docs", link: "/getting-started/introduction" },
      { text: "Sponsor", link: "https://github.com/sponsors/sixlive" },
    ],

    sidebar: [
      {
        items: [
          {
            text: "Getting Started",
            items: [
              {
                text: "Introduction",
                link: "/getting-started/introduction",
              },
              {
                text: "Installation",
                link: "/getting-started/installation",
              },
              {
                text: "Configuration",
                link: "/getting-started/configuration",
              },
            ],
          },
          {
            text: "Core Concepts",
            items: [
              {
                text: "Text Generation",
                link: "/core-concepts/text-generation",
              },
              {
                text: "Tool & Function Calling",
                link: "/core-concepts/tools-function-calling",
              },
              {
                text: "Prism Server",
                link: "/core-concepts/prism-server",
              },
            ],
          },
          {
            text: "Providers",
            items: [
              {
                text: "Anthropic",
                link: "/providers/anthropic",
              },
              {
                text: "Groq",
                link: "/providers/groq",
              },
              {
                text: "Mistral",
                link: "/providers/mistral",
              },
              {
                text: "Ollama",
                link: "/providers/ollama",
              },
              {
                text: "OpenAI",
                link: "/providers/openai",
              },
            ],
          },
          {
            text: "Advanced",
            items: [
              {
                text: "Custom Providers",
                link: "/advanced/custom-providers",
              },
            ],
          },
          {
            text: "Project Info",
            items: [
              {
                text: "Roadmap",
                link: "/project-info/roadmap",
              },
              {
                text: "Contributing",
                link: "/project-info/contributing",
              },
            ],
          },
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
