# Prism Server

Prism Server lets you expose your custom AI models through a standardized OpenAI-compatible API interface. This means you can use any OpenAI-compatible client or tool while leveraging your own Prism-powered models.

## Server Concept Overview

Think of Prism Server as a bridge between OpenAI-compatible clients and your custom Prism implementations. It translates incoming OpenAI-style requests into Prism operations, allowing you to:

- Use existing ChatGPT tools and UIs with your models
- Maintain OpenAI compatibility while using different providers
- Create standardized API endpoints for your AI features
- Serve multiple custom models through a single interface

## Setup and Configuration

1. First, enable Prism Server in your `config/prism.php`:

```php
return [
    'prism_server' => [
        'enabled' => env('PRISM_SERVER_ENABLED', true),
    ],
    // ... rest of config
];
```

2. Register your Prism models in a service provider (like `AppServiceProvider`):

```php
use EchoLabs\Prism\Facades\Prism;
use EchoLabs\Prism\Facades\PrismServer;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        PrismServer::register(
            'my-custom-model',
            fn () => Prism::text()
                ->using('anthropic', 'claude-3-sonnet')
                ->withSystemPrompt('You are a helpful assistant.')
        );
    }
}
```

## API Endpoints

Prism Server exposes two main OpenAI-compatible endpoints:

### List Models
```
GET /prism/openai/v1/models
```

Returns available models in OpenAI format:
```json
{
    "object": "list",
    "data": [
        {
            "id": "my-custom-model",
            "object": "model"
        }
    ]
}
```

### Chat Completions
```
POST /prism/openai/v1/chat/completions
```

Request body:
```json
{
    "model": "my-custom-model",
    "messages": [
        {"role": "user", "content": "Hello, who are you?"}
    ]
}
```

Response format:
```json
{
    "id": "resp-123xyz",
    "object": "chat.completion",
    "created": 1709668964,
    "model": "my-custom-model",
    "choices": [
        {
            "message": {
                "role": "assistant",
                "content": "Hello! I'm your AI assistant..."
            }
        }
    ]
}
```

## Client Integration Examples

### Using cURL
```bash
curl -X POST "http://your-app.com/prism/openai/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "my-custom-model",
    "messages": [
      {"role": "user", "content": "What is Laravel?"}
    ]
  }'
```

### Using OpenAI Client Libraries
```php
// PHP OpenAI Client
$client = OpenAI::client('fake-key', [
    'base_url' => 'http://your-app.com/prism/openai/v1'
]);

$response = $client->chat()->create([
    'model' => 'my-custom-model',
    'messages' => [
        ['role' => 'user', 'content' => 'Hello!']
    ]
]);
```

```javascript
// JavaScript/Node.js
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: 'fake-key',
    baseURL: 'http://your-app.com/prism/openai/v1'
});

const response = await openai.chat.completions.create({
    model: 'my-custom-model',
    messages: [
        { role: 'user', content: 'Hello!' }
    ]
});
```

### Using ChatGPT Web UIs
Many ChatGPT-compatible UIs can be configured to use your Prism Server:

1. Set the API Base URL to: `http://your-app.com/prism/openai/v1`
2. Use any API key (it won't be validated)
3. Select your custom model name from the model list
