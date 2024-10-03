# Configuration

Prism's flexible configuration allows you to easily set up and switch between different AI providers. Let's dive into how you can configure Prism to work with various services, including the out-of-the-box support for Ollama.

## The Driver Pattern

Prism uses a driver pattern to support multiple AI providers. This design makes it easy to add new providers and switch between them without changing your application code. Currently, Prism supports the following drivers:

- OpenAI
- Anthropic
- Ollama (using the OpenAI driver)

## Configuration File

After installation, you'll find the Prism configuration file at `config/prism.php`. Let's break down its key sections:

```php
return [
    'prism_server' => [
        'enabled' => env('PRISM_SERVER_ENABLED', true),
    ],
    'providers' => [
        'openai' => [
            'driver' => 'openai',
            'url' => env('OPENAI_URL', 'https://api.openai.com/v1'),
            'api_key' => env('OPENAI_API_KEY'),
        ],
        'anthropic' => [
            'driver' => 'anthropic',
            'api_key' => env('ANTHROPIC_API_KEY'),
            'version' => env('ANTHROPIC_API_VERSION', '2023-06-01'),
        ],
        'ollama' => [
            'driver' => 'openai',
            'url' => env('OLLAMA_URL', 'http://localhost:11434/v1'),
        ],
    ],
];
```

### Prism Server

The `prism_server` section allows you to enable or disable the Prism Server feature, which we cover in more detail in [prism server](prism-server) section.

### Drivers

The `providers` section is where you configure your AI service providers. Let's look at each one:

#### OpenAI

```php
'openai' => [
    'driver' => 'openai',
    'url' => env('OPENAI_URL', 'https://api.openai.com/v1'),
    'api_key' => env('OPENAI_API_KEY'),
],
```

This configuration uses the OpenAI driver. Set your API key in the `.env` file:

```
OPENAI_API_KEY=your_openai_api_key_here
```

#### Anthropic

```php
'anthropic' => [
    'driver' => 'anthropic',
    'api_key' => env('ANTHROPIC_API_KEY'),
    'version' => env('ANTHROPIC_API_VERSION', '2023-06-01'),
],
```

For Anthropic, set your API key and optionally the API version in the `.env` file:

```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
ANTHROPIC_API_VERSION=2023-06-01
```

#### Ollama

Here's where Prism's driver pattern really shines:

```php
'ollama' => [
    'driver' => 'openai',
    'url' => env('OLLAMA_URL', 'http://localhost:11434/v1'),
],
```

Notice that Ollama uses the `openai` driver. This is because Ollama implements an OpenAI-compatible API, allowing Prism to communicate with it using the existing OpenAI driver. No additional code or separate driver is needed!

To use Ollama, just set the URL in your `.env` file:

```
OLLAMA_URL=http://localhost:11434/v1
```

If you're running Ollama locally with default settings, you won't even need to change this.

## Using Different Providers

To use a specific provider in your application, you can do:

```php
Prism::text()
  ->using('openai', 'gpt-4o') // [!code focus]
  ->withPrompt('Hello, AI!');
```

Just change `'openai'` to `'anthropic'` or `'ollama'` to switch providers.

That's it for the basic configuration! With Prism's flexible setup, you're now ready to start generating text using various AI providers, including Ollama, right out of the box.
