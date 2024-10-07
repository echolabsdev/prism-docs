# Agents

AI agents in Prism allow language models to execute a series of steps in a non-deterministic way. The model can make tool-calling decisions based on the conversation context, user input, and previous tool calls and results.

## Implementing Agents

One effective approach to implementing agents in Prism is to allow the LLM to choose the next step in a loop. By combining tools with the `withMaxSteps()` method, you can create agents that reason at each step and make decisions based on the context.

## Example: Math Problem Solver Agent

Let's create an agent that solves math problems using Prism. This agent will have a calculator tool (using the `bcmath` PHP extension) that it can call to evaluate mathematical expressions.

```php
<?php

use EchoLabs\Prism\Facades\Prism;
use EchoLabs\Prism\Facades\Tool;

$tools = [
    Tool::as('weather')
        ->for('useful when you need to search for current weather conditions')
        ->withParameter('city', 'The city that you want the weather for')
        // Simulate an API call
        ->using(fn (string $city): string => 'The weather will be 75° and sunny'),
    Tool::as('search')
        ->for('useful for searching curret events or data')
        ->withParameter('query', 'The detailed search query')
        // Simulate an API call
        ->using(fn (string $query): string => 'The tigers game is at 3pm in detroit'),
];

// Create the agent
$prism = Prism::text()
    ->using('anthropic', 'claude-3-sonnet')
    ->withPrompt("What time is the Tigers game today in Detroit and should I wear a coat?")
    ->withMaxSteps(10)
    ->withTools($tools);

$response = $prism();

echo "ANSWER: " . $response->text;
```

In this example:

1. We define a `weather` and a `search` tool using the `Tool` facade. These tool simulate API requests to third party services.

2. We create an agent using Prism's `text()` method, setting up the system message, prompt, and including our calculator tool.

3. We use `withMaxSteps(10)` to allow the agent to make up to 10 steps in its reasoning process.

4. The agent will use the tools as needed to answer the question.

## How It Works

1. The agent receives the question in the prompt.
2. It analyzes the problem and decides on the next step (search tool, weather tool, or reasoning).
3. If a tool is needed, it uses the tools.
4. The agent continues this process, potentially making multiple tool calls and analyzing the tool results, until it reaches a conclusion or the maximum number of steps.
5. Finally, it provides the answer.

This approach allows for flexible problem-solving, where the agent can adapt its strategy based on the specific problem and intermediate results.

Remember to handle potential errors and edge cases in your tool implementations for robust agent behavior.
