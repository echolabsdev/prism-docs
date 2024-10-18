# Installation

Getting started with Prism is a breeze. Follow these simple steps to add Prism to your Laravel project and unlock the power of AI-driven text generation.

## Requirements

Before we dive in, make sure your project meets these requirements:

- PHP 8.3 or higher
- Laravel 11.0 or higher

## Step 1: Composer Installation

::: tip
Prism is actively evolving. To prevent unexpected issues from breaking changes, we strongly recommend pinning your installation to a specific version. Example: "echolabsdev/prism": "^0.3.0".
:::

First, let's add Prism to your project using Composer. Open your terminal, navigate to your project directory, and run:

```bash
composer require echolabsdev/prism
```

This command will download Prism and its dependencies into your project.

## Step 2: Publish the Configuration

Prism comes with a configuration file that you'll want to customize. Publish it to your config directory by running:

```bash
php artisan vendor:publish --tag=prism-config
```

This will create a new file at `config/prism.php`. We'll explore how to configure Prism in the next section.

## Step 3: Set Up Your Environment

Prism supports multiple AI providers. Depending on which one you're using, you'll need to add the appropriate API keys to your `.env` file. Here are examples for OpenAI and Anthropic:

```shell
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

## That's it!

You've successfully installed Prism in your Laravel project. You're now ready to start generating text, using tools, and creating AI-powered applications with ease.
