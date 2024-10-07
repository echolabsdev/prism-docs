# Custom Drivers

In Prism, drivers play a crucial role in connecting your application to various AI providers. They act as a bridge, translating Prism's standardized interface into provider-specific API calls. This flexibility allows you to seamlessly switch between different AI services or even create your own integrations.

## Drivers vs. Providers: Understanding the Difference

Before we dive into creating custom drivers, let's clarify the distinction between drivers and providers:

- **Drivers** are the software components in Prism that handle the communication protocol with a specific type of AI service. They define how to send requests and interpret responses.
- **Providers** are the actual AI services or endpoints that you're connecting to, such as OpenAI, Anthropic, Ollama, or your own custom AI service.

For example, the OpenAI driver in Prism can be used not just with OpenAI's services, but with any provider that implements an OpenAI-compatible API (like Ollama). Similarly, the Anthropic driver is specifically designed to work with Anthropic's API.

## Creating a Custom Driver

To create a custom driver, you'll need to implement the `EchoLabs\Prism\Contracts\Driver` interface. Here's a step-by-step guide:

1. Create a new class for your driver, e.g., `MyCustomDriver`.
2. Implement the required methods from the `Driver` interface:

```php
<?php

namespace App\Prism\Drivers;

use EchoLabs\Prism\Contracts\Driver;
use EchoLabs\Prism\Drivers\DriverResponse;
use EchoLabs\Prism\Requests\TextRequest;

class MyCustomDriver implements Driver
{
    protected $model;

    public function usingModel(string $model): Driver
    {
        $this->model = $model;
        return $this;
    }

    public function text(TextRequest $request): DriverResponse
    {
        // Implement the logic to send requests to your custom AI provider
        // and return a DriverResponse object
    }
}
```

3. In the `text` method, you'll need to:
   - Convert the `TextRequest` into a format your provider understands
   - Send the request to your provider
   - Parse the response
   - Return a `DriverResponse` object with the results

## Registering Your Custom Driver

Once you've created your custom driver, you need to register it with Prism. The best place to do this is in a service provider, such as `AppServiceProvider`:

```php
<?php

namespace App\Providers;

use App\Prism\Drivers\MyCustomDriver;
use EchoLabs\Prism\PrismManager;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->app['prism-manager']->extend('my-custom-driver', function ($app, $config) {
            return new MyCustomDriver($config);
        });
    }
}
```

## Using Your Custom Driver with a Provider

To use your custom driver with a provider, you'll need to add it to your `config/prism.php` file:

```php
<?php

'providers' => [
    // ... other providers ...
    'my-custom-provider' => [
        'driver' => 'my-custom-driver',
        // Add any configuration options your driver needs
    ],
],
```

Now you can use your custom driver in your Prism calls:

```php
<?php

$prism = Prism::text()
    ->using('my-custom-provider', 'model-name')
    ->withPrompt('Hello, custom AI!');

$prism();
```

## Best Practices for Custom Drivers

1. **Error Handling**: Implement robust error handling in your driver to gracefully manage API issues or unexpected responses.
2. **Configuration**: Make your driver flexible by allowing key parameters (like API endpoints or authentication) to be set via configuration.
3. **Logging**: Consider adding logging to your driver for easier debugging and monitoring.
4. **Testing**: Write unit tests for your driver to ensure it correctly handles various scenarios.

By creating custom drivers, you can extend Prism's capabilities to work with any AI provider you need, while maintaining a consistent interface throughout your application.
