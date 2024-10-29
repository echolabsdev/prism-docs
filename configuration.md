# Configuration

Prism's flexible configuration allows you to easily set up and switch between different AI providers. Let's dive into how you can configure Prism to work with various services, including the out-of-the-box support for [Ollama](https://ollama.com).

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
        'groq' => [
            'api_key' => env('GROQ_API_KEY', ''),
            'url' => env('GROQ_URL', 'https://api.groq.com/openai/v1'),
        ],
    ],
];
```

### Prism Server

The `prism_server` section allows you to enable or disable the Prism Server feature, which we cover in more detail in [prism server](prism-server) section.

### Providers

This is where you configure the providers.
