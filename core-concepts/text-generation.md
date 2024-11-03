# Text Generation

Prism provides a powerful interface for generating text using Large Language Models (LLMs). This guide covers everything from basic usage to advanced features like multi-modal interactions and response handling.

## Basic Text Generation

At its simplest, you can generate text with just a few lines of code:

```php
use EchoLabs\Prism\Facades\Prism;
use EchoLabs\Prism\Enums\Provider;

$response = Prism::text()
    ->using(Provider::Anthropic, 'claude-3-sonnet')
    ->withPrompt('Tell me a short story about a brave knight.')
    ->generate();

echo $response->text;
```

## System Prompts and Context

System prompts help set the behavior and context for the AI. They're particularly useful for maintaining consistent responses:

```php
$response = Prism::text()
    ->using(Provider::Anthropic, 'claude-3-sonnet')
    ->withSystemPrompt('You are an expert mathematician who explains concepts simply.')
    ->withPrompt('Explain the Pythagorean theorem.')
    ->generate();
```

You can also use Laravel views for complex system prompts:

```php
$response = Prism::text()
    ->using(Provider::Anthropic, 'claude-3-sonnet')
    ->withSystemPrompt(view('prompts.math-tutor'))
    ->withPrompt('What is calculus?')
    ->generate();
```

## Message Chains and Conversations

For interactive conversations, use message chains to maintain context:

```php
use EchoLabs\Prism\ValueObjects\Messages\UserMessage;
use EchoLabs\Prism\ValueObjects\Messages\AssistantMessage;

$response = Prism::text()
    ->using(Provider::Anthropic, 'claude-3-sonnet')
    ->withMessages([
        new UserMessage('What is JSON?'),
        new AssistantMessage('JSON is a lightweight data format...'),
        new UserMessage('Can you show me an example?')
    ])
    ->generate();
```

## Multi-modal Capabilities (Images)

Prism supports including images in your messages for visual analysis:

```php
use EchoLabs\Prism\ValueObjects\Messages\Support\Image;

// From a local file
$message = new UserMessage(
    "What's in this image?",
    [Image::fromPath('/path/to/image.jpg')]
);

// From a URL
$message = new UserMessage(
    'Analyze this diagram:',
    [Image::fromUrl('https://example.com/diagram.png')]
);

$response = Prism::text()
    ->using(Provider::Anthropic, 'claude-3-sonnet')
    ->withMessages([$message])
    ->generate();
```

## Generation Parameters

Fine-tune your generations with various parameters:

```php
$response = Prism::text()
    ->using(Provider::Anthropic, 'claude-3-sonnet')
    ->withMaxTokens(500)        // Limit response length
    ->usingTemperature(0.7)     // Control randomness (0.0-1.0)
    ->usingTopP(0.9)            // Control diversity
    ->withPrompt('Write a story about space exploration.')
    ->generate();
```

## Response Handling

The response object provides rich access to the generation results:

```php
$response = Prism::text()
    ->using(Provider::Anthropic, 'claude-3-sonnet')
    ->withPrompt('Explain quantum computing.')
    ->generate();

// Access the generated text
echo $response->text;

// Check why the generation stopped
echo $response->finishReason->name;

// Get token usage statistics
echo "Prompt tokens: {$response->usage->promptTokens}";
echo "Completion tokens: {$response->usage->completionTokens}";

// For multi-step generations, examine each step
foreach ($response->steps as $step) {
    echo "Step text: {$step->text}";
    echo "Step tokens: {$step->usage->completionTokens}";
}

// Access message history
foreach ($response->responseMessages as $message) {
    if ($message instanceof AssistantMessage) {
        echo $message->content;
    }
}
```

Remember to handle potential errors in your generations:

```php
use EchoLabs\Prism\Exceptions\PrismException;

try {
    $response = Prism::text()
        ->using(Provider::Anthropic, 'claude-3-sonnet')
        ->withPrompt('Generate text...')
        ->generate();
} catch (PrismException $e) {
    Log::error('Text generation failed:', ['error' => $e->getMessage()]);
}
```
