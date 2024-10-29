# Generating Text
Prism provides a powerful and flexible interface for generating text using Large Language Models (LLMs). This guide will walk you through the basics of text generation, configuration options, and how to access the generated data.

## Basic Usage

To generate text with Prism, you'll use the `Prism` facade along with the `text()` method. Here's a simple example:

```php
<?php

$response = Prism::text()
  ->using(Provider::Anthropic, 'claude-3-sonnet')
  ->withPrompt('Tell me a short story about a brave knight.')
  ->generate();

echo $response->text;
```

### Different Providers and Models

Prism supports multiple AI providers and models. You can specify these in the `using()` method:

```php
<?php

// Using OpenAI
$prism = Prism::text()
    ->using(Provider::OpenAI, 'gpt-4')
    ->withPrompt('Explain quantum computing in simple terms.')
    ->generate();

// Using Anthropic
$prism = Prism::text()
    ->using(Provider::Anthropic, 'claude-3-opus')
    ->withPrompt('Describe the process of photosynthesis.')
    ->generate();
```

### withPrompt vs withMessages

Prism offers two main methods for providing input: `withPrompt()` and `withMessages()`. It's important to note that you can only use one of these methods per request.

#### Using withPrompt()

Use `withPrompt()` for simple, single-turn interactions:

```php
<?php

$prism = Prism::text()
    ->using(Provider::Anthropic, 'claude-3-sonnet')
    ->withPrompt('What is the capital of France?')
    ->generate();
```

#### Using withMessages()

For multi-turn conversations or chat-like interactions, use `withMessages()`:

```php
<?php

use EchoLabs\Prism\ValueObjects\Messages\UserMessage;
use EchoLabs\Prism\ValueObjects\Messages\AssistantMessage;
use EchoLabs\Prism\ValueObjects\Messages\Support\Image;

$prism = Prism::text()
    ->using(Provider::Anthropic, 'claude-3-sonnet')
    ->withMessages([
        new UserMessage('Hello, who are you?'),
        new AssistantMessage('I am an AI assistant created by Anthropic. How can I help you today?'),
        new UserMessage('Can you tell me about the weather in Paris?'),
    ])
    ->generate();
```

### Working with Images

Prism supports sending images alongside text in your messages. You can include images when using `withMessages()` by utilizing the `Image` class. There are several ways to include images:

#### From a File Path

```php
<?php

use EchoLabs\Prism\ValueObjects\Messages\Support\Image;
use EchoLabs\Prism\ValueObjects\Messages\UserMessage;

$message = new UserMessage(
    'What can you tell me about this image?',
    [Image::fromPath('/path/to/your/image.jpg')]
);
```

#### From a URL

```php
<?php

$message = new UserMessage(
    'Describe this image:',
    [Image::fromUrl('https://example.com/image.jpg')]
);
```

#### From Base64 Encoded Data

```php
<?php

$message = new UserMessage(
    'Analyze this image:',
    [Image::fromBase64('base64_encoded_image_data', 'image/jpeg')]
);
```

#### Multiple Images in One Message

You can include multiple images in a single message:

```php
<?php

$message = new UserMessage(
    'Compare these images:',
    [
        Image::fromPath('/path/to/first-image.jpg'),
        Image::fromPath('/path/to/second-image.jpg')
    ]
);

$prism = Prism::text()
    ->using(Provider::Anthropic, 'claude-3-sonnet')
    ->withMessages([$message])
    ->generate();
```

### When to Use withPrompt vs withMessages

- Use `withPrompt()` when:
  - You have a single, standalone question or task
  - You don't need to provide context from previous interactions
  - You're doing simple text generation or completion

- Use `withMessages()` when:
  - You're building a conversational AI or chatbot
  - You need to provide context from previous messages
  - You want to simulate a back-and-forth dialogue
  - You need to include images in your messages

### Using Strings or Views

Both `withPrompt()` and `withSystemPrompt()` can accept either a string or a Laravel View:

```php
<?php

// Using a string
Prism::text()
  ->using(Provider::Anthropic, 'claude-3-sonnet')
  ->withSystemPrompt('You are a helpful assistant.')
  ->withPrompt('Tell me a joke about programming.');

// Using a View
Prism::text()
  ->using(Provider::Anthropic, 'claude-3-sonnet')
  ->withSystemPrompt(view('prompts.assistant'))
  ->withPrompt(view('prompts.tell-joke', ['topic' => 'programming']));
```

Using Views can be particularly helpful for managing complex or reusable prompts.

## Configuration Options

Prism allows you to fine-tune your text generation with various configuration options:

```php
<?php

$prism = Prism::text()
    ->using(Provider::Anthropic, 'claude-3-sonnet')
    ->withMaxTokens(500)
    ->usingTemperature(0.7)
    ->usingTopP(1)
    ->withPrompt('Write a haiku about springtime.')
    ->generate();
```

- `withMaxTokens()`: Sets the maximum number of tokens to generate.
- `usingTemperature()`: Controls the randomness of the output. Higher values (e.g., 0.8) make the output more random, while lower values (e.g., 0.2) make it more focused and deterministic.
- `usingTopP()`: An alternative to temperature, using nucleus sampling. It sets the cumulative probability cutoff for token selection.

## Accessing Generated Data

The `TextResponse` object provides access to various aspects of the AI's response:

```php
<?php

$response = Prism::text()
    ->using(Provider::Anthropic, 'claude-3-sonnet')
    ->withPrompt('Tell me a joke about programming.')
    ->generate();

// Access the generated text
// If using multi-step generation, this is the text from the final step
echo $response->text;

// Finish reason enum
echo $response->finishReason->name;

// Array of ToolCalls
// If using multi-step generation this is from the final step of generation
$response->toolCalls;

// Array of ToolResults
// If using multi-step generation this is from the final step of generation
$response->toolResults;

// Get the total number of tokens used
echo "Prompt tokens: " . $response->usage->promptTokens;
echo "Completion tokens: " . $response->usage->completionTokens;

// Access individual steps (for multi-step calls)
foreach ($response->steps as $step) {
    echo "Step text: " . $step->text;
    echo "Finish reason: " . $step->finishReason->name;
    echo "Prompt tokens: " . $step->usage->promptTokens;
    echo "Completion tokens: " . $step->usage->completionTokens;

    // Array of ToolCalls
    $step->$toolCalls;
    // Array of ToolResults
    $step->toolResults;
    // Array of Messages
    $step->messages;
}

// Access response messages
foreach ($response->responseMessages as $message) {
    if ($message instanceof AssistantMessage) {
        echo "Assistant's response: " . $message->content;
    }
}
```

The `TextResponse` object allows you to examine the details of the AI's response, including token usage, individual steps in multi-step interactions, and the content of response messages.

By leveraging these features, you can create sophisticated AI-powered applications that generate text, engage in conversations, and provide valuable insights based on user input and images.
