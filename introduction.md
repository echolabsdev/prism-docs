# Introduction

Large Language Models (LLMs) have revolutionized how we interact with artificial intelligence, enabling applications to understand, generate, and manipulate human language with unprecedented sophistication. These powerful models open up exciting possibilities for developers, from creating chatbots and content generators to building complex AI-driven applications.

Prism **simplifies the process of integrating LLMs into your Laravel projects**, providing a unified interface to work with various AI providers. This allows you to focus on crafting innovative AI features for your users, rather than getting bogged down in the intricacies of different APIs and implementation details.

Here's a quick example of how you can generate text using Prism:

::: code-group
```php [Anthropic]
<?php

$response = Prism::text()
    ->using(Provider::Anthropic, 'claude-3-5-sonnet-20240620')
    ->withSystemPrompt(view('prompts.nyx'))
    ->withPrompt('Explain quantum computing to a 5-year-old.')
    ->generate();

echo $response->text;
```

```php [OpenAI]
<?php

$response = Prism::text()
    ->using(Provider::OpenAI, 'gpt-4')
    ->withSystemPrompt(view('prompts.nyx'))
    ->withPrompt('Explain quantum computing to a 5-year-old.')
    ->generate();

echo $response->text;
```

```php [Ollama]
<?php

$response = Prism::text()
    ->using(Provider::Ollama, 'qwen2.5:14b')
    ->withSystemPrompt(view('prompts.nyx'))
    ->withPrompt('Explain quantum computing to a 5-year-old.')
    ->generate();

echo $response->text;
```
:::

Prism draws significant inspiration from the [Vercel AI SDK](https://sdk.vercel.ai/docs/ai-sdk-core), adapting its powerful concepts and developer-friendly approach to the Laravel ecosystem.

Key features of Prism include:

- Unified interface for multiple AI providers
- Seamless integration with Laravel's ecosystem
- Built-in support for AI-powered tools and function calling
- Flexible configuration options to fine-tune your AI interactions

Ready to supercharge your Laravel app with AI? Let's dive in and explore how Prism can transform your development process!
