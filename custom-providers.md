# Custom Providers
## Creating a Custom Provider

To create a custom provider, you'll need to implement the `EchoLabs\Prism\Contracts\Provider` interface. Here's a step-by-step guide:

1. Create a new class for your provider, e.g., `MyCustomProvider`.
2. Implement the required methods from the `Provider` interface:

```php
<?php

namespace App\Prism\Providers;

use EchoLabs\Prism\Contracts\Provider;
use EchoLabs\Prism\Providers\ProviderResponse;
use EchoLabs\Prism\Requests\TextRequest;

class MyCustomProvider implements Provider
{
    protected $model;

    public function usingModel(string $model): Provider
    {
        $this->model = $model;

        return $this;
    }

    public function text(TextRequest $request): ProviderResponse
    {
        // Implement the logic to send requests to your custom AI provider
        // and return a ProviderResponse object
    }
}
```

3. In the `text` method, you'll need to:
   - Convert the `TextRequest` into a format your provider understands
   - Send the request to your provider
   - Parse the response
   - Return a `ProviderResponse` object with the results

## Registering Your Custom Provider

Once you've created your custom provider, you need to register it with Prism. The best place to do this is in a service provider, such as `AppServiceProvider`:

```php
<?php

namespace App\Providers;

use App\Prism\Providers\MyCustomProvider;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->app['prism-manager']->extend('my-custom-provider', function ($app, $config) {
            return new MyCustomProvider(
              apiKey: data_get($config, 'api_key'),
            );
        });
    }
}
```

## Using Your Provider

To use your custom provider, you'll need to add it to your `config/prism.php` file:

```php
<?php

'providers' => [
    // ... other providers ...
    'my-custom-provider' => [
        'api_key' => env('MY_CUSTOM_API_KEY')
    ],
],
```

Now you can use your custom provider in your Prism calls:

```php
<?php

$response = Prism::text()
    ->using('my-custom-provider', 'model-name')
    ->withPrompt('Hello, custom AI!')
    ->generate();
```

## Best Practices for Custom Providers

1. **Error Handling**: Implement robust error handling in your provider to gracefully manage API issues or unexpected responses.
2. **Configuration**: Make your provider flexible by allowing key parameters (like API endpoints or authentication) to be set via configuration.
4. **Testing**: Write unit tests for your provider to ensure it correctly handles various scenarios.
