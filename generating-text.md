# Generating Text

Prism provides a powerful interface for generating text using Large Language Models (LLMs). This guide covers everything from basic usage to advanced features like multi-modal interactions and tool integration.

## Quick Start

```php
<?php

use EchoLabs\Prism\Facades\Prism;
use EchoLabs\Prism\Enums\Provider;

$response = Prism::text()
    ->using(Provider::Anthropic, 'claude-3-sonnet')
    ->withPrompt('Tell me a short story about a brave knight.')
    ->generate();

echo $response->text;
```

## Setting Up Your Provider

```php
// Using OpenAI
$response = Prism::text()
    ->using(Provider::OpenAI, 'gpt-4')
    ->withPrompt('Explain quantum computing.');

// Using Anthropic
$response = Prism::text()
    ->using(Provider::Anthropic, 'claude-3-opus')
    ->withPrompt('Describe photosynthesis.');

// Using Mistral
$response = Prism::text()
    ->using(Provider::Mistral, 'mistral-large')
    ->withPrompt('Explain machine learning.');
```

## Input Methods

Prism offers two primary methods for providing input. Choose the one that best fits your use case:

### 1. Single Prompts (`withPrompt()`)

Best for one-off questions or simple text generation:

```php
$response = Prism::text()
    ->using(Provider::Anthropic, 'claude-3-sonnet')
    ->withPrompt('What is the capital of France?')
    ->generate();
```

You can use Laravel Views for complex prompts:

```php
$response = Prism::text()
    ->using(Provider::Anthropic, 'claude-3-sonnet')
    ->withPrompt(view('prompts.analysis', ['data' => $data]))
    ->generate();
```

### 2. Message Chains (`withMessages()`)

Best for conversations and context-aware interactions:

```php
use EchoLabs\Prism\ValueObjects\Messages\UserMessage;
use EchoLabs\Prism\ValueObjects\Messages\AssistantMessage;
use EchoLabs\Prism\ValueObjects\Messages\SystemMessage;

$response = Prism::text()
    ->using(Provider::Anthropic, 'claude-3-sonnet')
    ->withSystemPrompt('You are a helpful coding assistant.')
    ->withMessages([
        new UserMessage('How do I use arrays in PHP?'),
        new AssistantMessage('Arrays in PHP can be created using...'),
        new UserMessage('Can you show me an example?'),
    ])
    ->generate();
```

### Working with Images

Prism supports multi-modal interactions by allowing you to include images in your messages:

```php
use EchoLabs\Prism\ValueObjects\Messages\Support\Image;

// From a file path
$message = new UserMessage(
    "What's in this image?",
    [Image::fromPath('/path/to/image.jpg')]
);

// From a URL
$message = new UserMessage(
    'Analyze this diagram:',
    [Image::fromUrl('https://example.com/diagram.png')]
);

// Multiple images
$message = new UserMessage(
    'Compare these images:',
    [
        Image::fromPath('/path/to/first.jpg'),
        Image::fromUrl('https://example.com/second.jpg')
    ]
);
```

## Fine-tuning Generation

### Basic Parameters

```php
$response = Prism::text()
    ->using(Provider::Anthropic, 'claude-3-sonnet')
    ->withMaxTokens(500)        // Limit response length
    ->usingTemperature(0.7)     // Control randomness (0.0-1.0)
    ->usingTopP(0.9)            // Control diversity
    ->withPrompt('Write a story.')
    ->generate();
```

### System Prompts

Set the AI's behavior and context:

```php
$response = Prism::text()
    ->using(Provider::Anthropic, 'claude-3-sonnet')
    ->withSystemPrompt('You are an expert mathematician.')
    ->withPrompt('Solve this equation: 2x + 5 = 13')
    ->generate();
```

## Handling Responses

The `TextResponse` object provides rich access to the AI's response:

```php
$response = Prism::text()
    ->using(Provider::Anthropic, 'claude-3-sonnet')
    ->withPrompt('Tell me a joke.')
    ->generate();

// Basic access
echo $response->text;                    // Generated text
echo $response->finishReason->name;      // Why generation stopped

// Usage statistics
echo "Prompt tokens: {$response->usage->promptTokens}";
echo "Completion tokens: {$response->usage->completionTokens}";

// Multi-step generation
foreach ($response->steps as $step) {
    echo "Step text: {$step->text}";
    echo "Step tokens: {$step->usage->completionTokens}";
}

// Message history
foreach ($response->responseMessages as $message) {
    if ($message instanceof AssistantMessage) {
        echo $message->content;
    }
}
```

## Best Practices

1. **Choose the Right Input Method**
   - Use `withPrompt()` for simple, one-off generations
   - Use `withMessages()` for conversations or when context matters
   - Use images when visual analysis is needed

2. **Optimize Token Usage**
   - Set appropriate `maxTokens` for your use case
   - Keep system prompts concise
   - Consider response length in multi-turn conversations

3. **Handle Responses Properly**
   - Always check the `finishReason`
   - Monitor token usage
   - Store relevant message history for context

4. **Error Handling**
```php
try {
    $response = Prism::text()
        ->using(Provider::Anthropic, 'claude-3-sonnet')
        ->withPrompt('Generate text...')
        ->generate();
} catch (PrismException $e) {
    // Handle provider errors, token limits, etc.
    Log::error('Text generation failed:', ['error' => $e->getMessage()]);
}
```

## Advanced Features

### Client Options

Configure provider-specific options:

```php
$response = Prism::text()
    ->using(Provider::Anthropic, 'claude-3-sonnet')
    ->withClientOptions([
        'timeout' => 30,
        'retry_on_error' => true
    ])
    ->withPrompt('Complex analysis...')
    ->generate();
```

### Multi-step Generation

Control complex interactions:

```php
$response = Prism::text()
    ->using(Provider::Anthropic, 'claude-3-sonnet')
    ->withMaxSteps(3)          // Limit interaction steps
    ->withMessages([...])
    ->generate();
```
