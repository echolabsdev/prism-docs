
# Generating Text
Prism provides a powerful and flexible interface for generating text using Large Language Models (LLMs). This guide will walk you through the basics of text generation, configuration options, and how to access the generated data.

## Basic Usage

To generate text with Prism, you'll use the `Prism` facade along with the `text()` method. Here's a simple example:

```php
<?php

$response = Prism::text()
  ->using('anthropic', 'claude-3-sonnet')
  ->withPrompt('Tell me a short story about a brave knight.')();

echo $response->text;
```

### Different Providers and Models

Prism supports multiple AI providers and models. You can specify these in the `using()` method:

```php
<?php

// Using OpenAI
$response = Prism::text()
    ->using('openai', 'gpt-4')
    ->withPrompt('Explain quantum computing in simple terms.')();

// Using Anthropic
$response = Prism::text()
    ->using('anthropic', 'claude-3-opus')
    ->withPrompt('Describe the process of photosynthesis.')();
```

### withPrompt vs withMessages

Prism offers two main methods for providing input: `withPrompt()` and `withMessages()`. It's important to note that you can only use one of these methods per request.

#### Using withPrompt()

Use `withPrompt()` for simple, single-turn interactions:

```php
$response = Prism::text()
    ->using('anthropic', 'claude-3-sonnet')
    ->withPrompt('What is the capital of France?')();
```

#### Using withMessages()

For multi-turn conversations or chat-like interactions, use `withMessages()`:

```php
use EchoLabs\Prism\ValueObjects\Messages\UserMessage;
use EchoLabs\Prism\ValueObjects\Messages\AssistantMessage;

$response = Prism::text()
    ->using('anthropic', 'claude-3-sonnet')
    ->withMessages([
        new UserMessage('Hello, who are you?'),
        new AssistantMessage('I am an AI assistant created by Anthropic. How can I help you today?'),
        new UserMessage('Can you tell me about the weather in Paris?'),
    ])();
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

### Using Strings or Views

Both `withPrompt()` and `withSystemMessage()` can accept either a string or a Laravel View:

```php
<?php

// Using a string
$response = Prism::text()
    ->using('anthropic', 'claude-3-sonnet')
    ->withPrompt('Tell me a joke about programming.')();

// Using a View
$response = Prism::text()
    ->using('anthropic', 'claude-3-sonnet')
    ->withPrompt(view('prompts.tell-joke', ['topic' => 'programming']))();

// System message with a string
$response = Prism::text()
    ->using('anthropic', 'claude-3-sonnet')
    ->withSystemMessage('You are a helpful assistant.')
    ->withPrompt('What\'s the weather like today?')();

// System message with a View
$response = Prism::text()
    ->using('anthropic', 'claude-3-sonnet')
    ->withSystemMessage(view('prompts.system-message'))
    ->withPrompt('What's the weather like today?')();
```

Using Views can be particularly helpful for managing complex or reusable prompts.

## Configuration Options

Prism allows you to fine-tune your text generation with various configuration options:

```php
<?php

$response = Prism::text()
    ->using('anthropic', 'claude-3-sonnet')
    ->withMaxTokens(500)
    ->usingTemperature(0.7)
    ->usingTopP(1)
    ->withPrompt('Write a haiku about springtime.')();
```

- `withMaxTokens()`: Sets the maximum number of tokens to generate.
- `usingTemperature()`: Controls the randomness of the output. Higher values (e.g., 0.8) make the output more random, while lower values (e.g., 0.2) make it more focused and deterministic.
- `usingTopP()`: An alternative to temperature, using nucleus sampling. It sets the cumulative probability cutoff for token selection.

## Accessing Generated Data

The `GenerateTextResponse` object provides access to various aspects of the AI's response:

```php
<?php

$response = Prism::text()
    ->using('anthropic', 'claude-3-sonnet')
    ->withPrompt('Tell me a joke about programming.')();

// Access the generated text (proxy to the last `step`)
echo $response->text;

// Get the number of tokens used
echo "Prompt tokens: " . $response->usage['prompt_tokens'];
echo "Completion tokens: " . $response->usage['completion_tokens'];

// Access individual steps (for multi-step calls)
foreach ($response->steps as $step) {
    echo "Step text: " . $step->text;
    echo "Finish reason: " . $step->finishReason->name;
}

// Access response messages
foreach ($response->responseMessages as $message) {
    if ($message instanceof AssistantMessage) {
        echo "Assistant's response: " . $message->content;
    }
}
```

The `GenerateTextResponse` object allows you to examine the details of the AI's response, including token usage, individual steps in multi-step interactions, and the content of response messages.

By leveraging these features, you can create sophisticated AI-powered applications that generate text, engage in conversations, and provide valuable insights based on user input.
