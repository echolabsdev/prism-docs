# Tools & Function Calling

Need your AI assistant to check the weather, search a database, or call your API? Tools are here to help! They let you extend your AI's capabilities by giving it access to specific functions it can call.

## Tool Concept Overview

Think of tools as special functions that your AI assistant can use when it needs to perform specific tasks. Just like how Laravel's facades provide a clean interface to complex functionality, Prism tools give your AI a clean way to interact with external services and data sources.

```php
$weatherTool = Tool::as('weather')
    ->for('Get current weather conditions')
    ->withParameter('city', 'The city to get weather for')
    ->using(function (string $city) {
        // Your weather API logic here
        return "The weather in {$city} is sunny and 72°F.";
    });
```

## Creating Basic Tools

Creating tools in Prism is straightforward and fluent. Here's how you can create a simple tool:

```php
use EchoLabs\Prism\Facades\Tool;

$searchTool = Tool::as('search')
    ->for('Search for current information')
    ->withParameter('query', 'The search query')
    ->using(function (string $query) {
        // Your search implementation
        return "Search results for: {$query}";
    });
```

## Parameter Definition

Prism offers multiple ways to define tool parameters, from simple strings to complex objects. Here's how you can define different parameter types:

```php
<?php

$tool = Tool::as('user_manager')
    ->for('Manage user data')
    ->withStringParameter('name', 'User name')
    ->withNumberParameter('age', 'User age')
    ->withBooleanParameter('active', 'Account status')
    ->withArrayParameter('hobbies', 'User hobbies', new StringSchema('hobby', 'A hobby'))
    ->using(function (string $name, int $age, bool $active, array $hobbies) {
        // Implementation
    });
```

For more complex scenarios, you can use schema objects:

```php
<?php

use EchoLabs\Prism\Schema\ArraySchema;
use EchoLabs\Prism\Schema\ObjectSchema;
use EchoLabs\Prism\Schema\StringSchema;

$userSchema = new ObjectSchema(
    name: 'user',
    description: 'the user object',
    properties: [
        new StringSchema('name', 'the users name'),
        new ArraySchema(
            name: 'hobbies',
            description: 'the users hobbies',
            items: new ObjectSchema(
                name: 'hobby',
                description: 'the hobby object',
                properties: [
                    new StringSchema('name', 'the hobby name'),
                    new StringSchema('description', 'the hobby description'),
                ],
                requiredFields: ['name', 'description']
            )
        ),
    ],
    requiredFields: ['name', 'hobbies']
);
```

## Complex Tool Implementation

For more sophisticated tools, you can create dedicated classes:

```php
class SearchTool extends Tool
{
    public function __construct()
    {
        $this
            ->as('search')
            ->for('Search for current information')
            ->withParameter('query', 'Detailed search query')
            ->using($this);
    }

    public function __invoke(string $query): string
    {
        // Your complex search implementation
        return $this->performSearch($query);
    }
}
```

## Tool Choice Options

You can control how the AI uses tools with the `toolChoice` method:

```php
$prism = Prism::text()
    ->using('anthropic', 'claude-3-sonnet')
    ->withPrompt('How is the weather in Paris?')
    ->withTools([$weatherTool])
    // Let the AI decide whether to use tools
    ->toolChoice(ToolChoice::Auto)
    // Force the AI to use a tool
    ->toolChoice(ToolChoice::Any)
    // Force the AI to use a specific tool
    ->toolChoice('weather');
```

> [!WARNING]
> Tool choice support varies by provider. Check your provider's documentation for specific capabilities.

## Response Handling with Tools

When your AI uses tools, you can inspect the results and see how it arrived at its answer:

```php
$response = Prism::text()
    ->using('anthropic', 'claude-3-sonnet')
    ->withPrompt('What is the weather like in Paris?')
    ->withTools([$weatherTool])
    ->generate();

// Get the final answer
echo $response->text;

// Inspect tool usage
foreach ($response->steps as $step) {
    if ($step->toolCalls) {
        foreach ($step->toolCalls as $toolCall) {
            echo "Tool: " . $toolCall->name . "\n";
            echo "Arguments: " . json_encode($toolCall->arguments()) . "\n";
        }
    }
```
}
