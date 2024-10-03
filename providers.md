# Providers

Prism's flexibility shines through its ability to work with various AI providers. While it comes with built-in support for popular services like OpenAI and Anthropic, you might want to add your own provider or integrate with a different AI service. This guide will walk you through the process of creating a custom provider for Prism.

## Creating a Custom Provider

To create a new provider, you'll need to implement the `EchoLabs\Prism\Contracts\Driver` interface. This interface ensures that your provider works seamlessly with the rest of the Prism ecosystem.

### Step 1: Create the Provider Class

Start by creating a new PHP class for your provider. Let's say we're creating a provider for a fictional AI service called "SuperAI":

```php
<?php

namespace App\Providers\Prism;

use EchoLabs\Prism\Contracts\Driver;
use EchoLabs\Prism\Drivers\ProviderResponse;
use EchoLabs\Prism\Requests\GenerateTextRequest;
use EchoLabs\Prism\Enums\FinishReason;
use EchoLabs\Prism\ValueObjects\ToolCall;
use Illuminate\Support\Facades\Http;

class SuperAIProvider implements Driver
{
    protected string $apiKey;
    protected string $model;

    public function __construct(string $apiKey)
    {
        $this->apiKey = $apiKey;
    }

    public function usingModel(string $model): Driver
    {
        $this->model = $model;
        return $this;
    }

    public function generateText(GenerateTextRequest $request): ProviderResponse
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
        ])->post('https://api.superai.com/v1/generate', [
            'model' => $this->model,
            'prompt' => $this->formatMessages($request->messages),
            'max_tokens' => $request->maxTokens,
            'temperature' => $request->temperature,
        ]);

        $data = $response->json();

        return new ProviderResponse(
            text: $data['generated_text'],
            toolCalls: $this->parseToolCalls($data),
            usage: [
                'prompt_tokens' => $data['usage']['prompt_tokens'],
                'completion_tokens' => $data['usage']['completion_tokens'],
            ],
            finishReason: $this->mapFinishReason($data['finish_reason']),
            response: [
                'id' => $data['id'],
                'model' => $data['model'],
            ]
        );
    }

    protected function formatMessages(array $messages): string
    {
        // Implement message formatting logic here
    }

    protected function parseToolCalls(array $data): array
    {
        // Implement tool call parsing logic here
    }

    protected function mapFinishReason(string $reason): FinishReason
    {
        // Map SuperAI's finish reasons to Prism's FinishReason enum
    }
}
```

### Step 2: Implement Required Methods

The `Driver` interface requires two main methods:

1. `usingModel(string $model): Driver`
   This method sets the model to be used for text generation. It should return the Driver instance for method chaining.

2. `generateText(GenerateTextRequest $request): ProviderResponse`
   This is where the magic happens. You'll make the API call to your provider and transform the response into a `ProviderResponse` object.

### Step 3: Handle Provider-Specific Logic

Each AI provider has its own way of formatting requests and returning responses. You'll need to implement provider-specific logic for:

- Formatting messages
- Parsing tool calls (if supported)
- Mapping finish reasons to Prism's `FinishReason` enum

### Step 4: Error Handling

Don't forget to implement proper error handling. You might want to catch provider-specific exceptions and throw Prism-specific exceptions for consistency across different providers.

```php
public function generateText(GenerateTextRequest $request): ProviderResponse
{
    try {
        // API call logic here
    } catch (\Exception $e) {
        throw new \EchoLabs\Prism\Exceptions\ProviderException("SuperAI error: " . $e->getMessage());
    }
}
```

## Registering Your Custom Provider

Once you've created your custom provider, you need to register it with Prism. You can do this in your `AppServiceProvider` or a dedicated service provider:

```php
use EchoLabs\Prism\Prism;
use App\Providers\Prism\SuperAIProvider;

public function boot()
{
    Prism::extend('superai', function ($app, $config) {
        return new SuperAIProvider($config['api_key']);
    });
}
```

## Configuring Your Provider

Add your new provider to the `config/prism.php` configuration file:

```php
'providers' => [
    // ... other providers ...
    'superai' => [
        'driver' => 'superai',
        'api_key' => env('SUPERAI_API_KEY'),
    ],
],
```

## Using Your Custom Provider

Now you can use your custom provider just like any built-in provider:

```php
use EchoLabs\Prism\Facades\Prism;

$response = Prism::using('superai', 'super-model-v1')
    ->generateText()
    ->withPrompt('Tell me a joke about programming.')();
```
