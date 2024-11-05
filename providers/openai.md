# OpenAI
## Configuration

```php
'openai' => [
    'url' => env('OPENAI_URL', 'https://api.openai.com/v1'),
    'api_key' => env('OPENAI_API_KEY', ''),
    'organization' => env('OPENAI_ORGANIZATION', null),
]
```

## Special features
### Strict Tool Schemas

```php
Tool::as('search')
    ->for('Searching the web')
    ->withStringParameter('query', 'the detailed search query')
    ->using(fn (): string => '[Search results]')
    ->withProviderMeta(Provider::OpenAI, [ // [!code ++]
      'strict' => true, // [!code ++]
    ]); // [!code ++]
```

## Limitations

- Does not support `ToolChoice::Any` when using `withToolChoice()`
