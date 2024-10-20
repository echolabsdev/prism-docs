# Configuration

Prism's flexible configuration allows you to easily set up and switch between different AI providers. Let's dive into how you can configure Prism to work with various services, including the out-of-the-box support for [Ollama](https://ollama.com).

## Using Different Providers

To use a specific provider in your application, you can do:

```php
<?php

Prism::text()
  ->using(Provider::OpenAI, 'gpt-4o') // [!code focus]
  ->withPrompt('Hello, AI!');
```

Just change `'openai'` to `'anthropic'` or `'ollama'` to switch providers.

## Configuration File

After installation, you'll find the Prism configuration file at `config/prism.php`. Let's break down its key sections:

```php
<?php

return [
    'prism_server' => [
        'enabled' => env('PRISM_SERVER_ENABLED', true),
    ],
    'providers' => [
        'openai' => [
            'url' => env('OPENAI_URL', 'https://api.openai.com/v1'),
            'api_key' => env('OPENAI_API_KEY', ''),
            'organization' => env('OPENAI_ORGANIZATION', null),
        ],
        'anthropic' => [
            'api_key' => env('ANTHROPIC_API_KEY', ''),
            'version' => env('ANTHROPIC_API_VERSION', '2023-06-01'),
        ],
        'ollama' => [
            'url' => env('OLLAMA_URL', 'http://localhost:11434/v1'),
        ],
        'mistral' => [
            'api_key' => env('MISTRAL_API_KEY', ''),
            'url' => env('MISTRAL_URL', 'https://api.mistral.ai/v1'),
        ],
    ],
];
```

### Prism Server

The `prism_server` section allows you to enable or disable the Prism Server feature, which we cover in more detail in [prism server](prism-server) section.

### Providers

The `providers` section is where you configure your AI service providers. Let's look at each one:

#### OpenAI

```php
'openai' => [
    'url' => env('OPENAI_URL', 'https://api.openai.com/v1'),
    'api_key' => env('OPENAI_API_KEY'),
    'organization' => env('OPENAI_ORGANIZATION', null),
],
```

This configuration uses the OpenAI provider. Set your API key in the `.env` file:

```shell
OPENAI_API_KEY=your_openai_api_key_here
```

#### Anthropic

```php
'anthropic' => [
    'api_key' => env('ANTHROPIC_API_KEY'),
    'version' => env('ANTHROPIC_API_VERSION', '2023-06-01'),
],
```

For Anthropic, set your API key and optionally the API version in the `.env` file:

```shell
ANTHROPIC_API_KEY=your_anthropic_api_key_here
ANTHROPIC_API_VERSION=2023-06-01
```

#### Mistral

```php
'mistral' => [
    'api_key' => env('MISTRAL_API_KEY', ''),
    'url' => env('MISTRAL_URL', 'https://api.mistral.ai/v1'),
],
```

For Mistral, set your API key in the `.env` file:

```shell
MISTRAL_API_KEY=your_mistral_api_key_here
```

#### Ollama

```php
'ollama' => [
    'url' => env('OLLAMA_URL', 'http://localhost:11434/v1'),
],
```

To use Ollama, just set the URL in your `.env` file:
```shell
OLLAMA_URL=http://localhost:11434/v1
```

If you're running Ollama locally with default settings, you won't even need to change this.

## Provider Configuration
### Client Configuration

If you need to pass additional HTTP client configurations to the provider you can use the `->withClientOptions()` method. This method accepts [Guzzle's request options](https://docs.guzzlephp.org/en/stable/request-options.html).

```php
<?php

Prism::text()
  ->using(Provider::Ollama, 'qwen2.5')
  ->withClientOptions(['timeout' => '20'])
  ->withPrompt('Who are you?')
  ->generate();
```

That's it for the basic configuration! With Prism's flexible setup, you're now ready to start generating text using various AI providers, including Ollama, right out of the box.
