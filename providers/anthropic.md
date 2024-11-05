# Anthropic
## Configuration

```php
'anthropic' => [
    'api_key' => env('ANTHROPIC_API_KEY', ''),
    'version' => env('ANTHROPIC_API_VERSION', '2023-06-01'),
]
```

### Provider-specific Settings
## Special features
## Model-specific options
## Limitations

- Does not support `SystemMessage` when using [message chains and coversations](/core-concepts/text-generation.html#message-chains-and-conversations).
