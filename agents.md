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

// Define the calculator tool
$calculatorTool = Tool::as('calculate')
    ->for('A tool for evaluating mathematical expressions.')
    ->withParameter('expression', 'The mathematical expression to evaluate')
    ->using(function (string $expression) {
        // Using bcmath for precise calculations
        bcscale(2); // Set decimal precision to 2
        return (string) eval('return ' . $expression . ';');
    });

// Create the agent
$prism = Prism::text()
    ->using('anthropic', 'claude-3-sonnet')
    ->withSystemPrompt(
        'You are solving math problems. ' .
        'Reason step by step. ' .
        'Use the calculator when necessary. ' .
        'When you give the final answer, ' .
        'provide an explanation for how you arrived at it.'
    )
    ->withPrompt(
        'A taxi driver earns $94.61 per 1-hour of work. ' .
        'If he works 12 hours a day and in 1 hour ' .
        'he uses 12 liters of petrol with a price of $1.34 for 1 liter. ' .
        'How much money does he earn in one day?'
    )
    ->withMaxSteps(10)
    ->withTools([$calculatorTool]);

$response = $prism();

echo "ANSWER: " . $response->text;
```

In this example:

1. We define a `calculate` tool using the `Tool` facade. This tool uses PHP's `bcmath` extension for precise mathematical calculations.

2. We create an agent using Prism's `text()` method, setting up the system message, prompt, and including our calculator tool.

3. We use `withMaxSteps(10)` to allow the agent to make up to 10 steps in its reasoning process.

4. The agent will use the calculator tool as needed to solve the problem, providing a step-by-step explanation and the final answer.

## How It Works

1. The agent receives the math problem in the prompt.
2. It analyzes the problem and decides on the next step (calculation or reasoning).
3. If a calculation is needed, it uses the `calculate` tool.
4. The agent continues this process, potentially making multiple tool calls, until it reaches a conclusion or the maximum number of steps.
5. Finally, it provides the answer with an explanation of the solution process.

This approach allows for flexible problem-solving, where the agent can adapt its strategy based on the specific problem and intermediate results.

Remember to handle potential errors and edge cases in your tool implementations for robust agent behavior.
