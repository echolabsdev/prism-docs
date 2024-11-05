# Ollama
## Configuration

```php
'ollama' => [
    'url' => env('OLLAMA_URL', 'http://localhost:11434/v1'),
],
```
## Considerations
### Timeouts

Depending on your configuration, responses tend to time out. You may need to extend the client's timeout using `->withClientOptions(['timeout' => $seconds])`.

```php
Prism::text()
  ->using(Provider::Anthropic, 'claude-3-sonnet-latest')
  ->withPrompt('Who are you?')
  ->withClientOptions(['timeout' => 60])
```
