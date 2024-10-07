# Tool Calling

Ever wished your AI assistant could check the weather or look up real-time data? With Prism's tool calling feature, now it can! This powerful functionality allows your AI to interact with external services and data sources, making it more versatile and helpful than ever.

## What are Tools?

In Prism, tools are special objects that the AI can use to perform specific tasks. Think of them as the AI's Swiss Army knife – each tool has a particular function, like checking the weather or searching a database.

Here's what makes up a tool in Prism:

- **Name**: A unique identifier for the tool.
- **Description**: A brief explanation of what the tool does.
- **Parameters**: The information the tool needs to do its job.
- **Function**: The actual code that executes when the tool is called.

## Creating a Tool

Let's create a simple weather tool to see how this works in practice:

```php
<?php

$weatherTool = Tool::as('weather')
    ->for('Get current weather conditions')
    ->withParameter('city', 'The city to get weather for')
    ->using(function (string $city) {
        // In a real scenario, you'd call a weather API here
        return "The weather in {$city} is sunny and 72°F.";
    });
```

## Using Tools in Your Prism Requests

Now that we have our weather tool, let's use it in a Prism request:

```php
<?php

$prism = Prism::text()
    ->using('anthropic', 'claude-3-sonnet')
    ->withPrompt("What's the weather like in Paris today? Should I bring a coat?")
    ->withTools([$weatherTool])
    ->withMaxSteps(3); // Allow up to 3 iterations for tool usage and response generation

$response = $prism();
```

In this example, the AI might decide to use the weather tool to get information about Paris before answering the question.

## Multi-Step Calls

Sometimes, the AI needs to use multiple tools or use a tool and then process its result. That's where multi-step calls come in handy. By setting `withMaxSteps(3)`, we're allowing the AI to make up to three separate calls, which might include:

1. Calling the weather tool for Paris
2. Processing the weather information
3. Generating a final response about whether to bring a coat

## Handling the Response

After making a tool-enabled request, you can inspect the results:

```php
echo $response->text; // The AI's final answer

foreach ($response->steps as $step) {
    if (!empty($step->toolCalls)) {
        foreach ($step->toolCalls as $toolCall) {
            echo "Tool used: " . $toolCall->name . "\n";
            echo "Arguments: " . json_encode($toolCall->arguments()) . "\n";
        }
    }
    echo "Step result: " . $step->text . "\n\n";
}
```

This allows you to see not just the final answer, but also how the AI arrived at its conclusion, including which tools it used and why. You still have access to all of the [text result](/generating-text.html#accessing-generated-data) outputs.

## Defining Complex Tools

Sometimes tools are more complex and it doesn't make sense to use a Closure. You can also define tools as callable classes. 

Here is an example of a simplistic search tool using the [SerpAPI](https://serpapi.com/).

```php
<?php

declare(strict_types=1);

namespace App\Tools;

use EchoLabs\Prism\Tool;
use Illuminate\Support\Facades\Http;

class SearchTool extends Tool
{
    public function __construct()
    {
        $this
            ->as('search')
            ->for('useful when you need to search for current events')
            ->withParameter('query', 'Detailed search query. Best to search one topic at a time.', 'string')
            ->using($this);
    }

    public function __invoke(string $query): string
    {
        $response = Http::get('https://serpapi.com/search', [
            'engine' => 'google',
            'q' => $query,
            'google_domain' => 'google.com',
            'gl' => 'us',
            'hl' => 'en',
            'api_key' => env('SERPAPI_API_KEY'),
        ]);

        $results = collect($response->json('organic_results'));

        $results->map(function ($result) {
            return [
                'title' => $result['title'],
                'link' => $result['link'],
                'snippet' => $result['snippet'],
            ];
        })->take(4);

        return view('prompts.search-tool-results', [
            'results' => $results,
        ])->render();
    }
}
```

```blade
<links>
    @foreach ($results as $result)
        <link>
        <title>{{ $result['title'] }}</title>
        <url>{{ $result['link'] }}</url>
        <snippet>{{ $result['snippet'] }}</snippet>
        </link>
    @endforeach
</links>

ALWAYS CITE SOURCES AT THE END OF YOUR RESPONSE

<example-sources>
    Sources:
    - [title](url)
    - [title](url)
</example-sources>
```

Then we just need to register to tool with a Prism.

```php
<?php

$prism = Prism::text()
    ->using('anthropic', 'claude-3-sonnet')
    ->withPrompt("What's the weather like in Paris today?")
    ->withTools([new SearchTool])
    ->withMaxSteps(3);

echo $prism()->text;
```

## Best Practices for Tool Use

1. **Keep it simple**: Start with a small number of well-defined tools.
2. **Be descriptive**: Provide clear descriptions for your tools and their parameters.
3. **Handle errors gracefully**: Make sure your tool functions can handle unexpected inputs.
4. **Monitor usage**: Keep an eye on how often and why your tools are being called.

By leveraging tool calling in Prism, you're giving your AI the power to access real-world data and perform actions, making it a truly powerful assistant in your Laravel applications!
