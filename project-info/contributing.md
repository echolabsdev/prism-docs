# Contributing to Prism

Thank you for considering contributing to Prism! This guide will help you understand our development process and standards.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies:
```bash
composer install
```
4. Create a new branch:
```bash
git checkout -b feature/my-new-feature
```

## Development Workflow

### Running Tests

We maintain a comprehensive test suite. Before submitting your PR, make sure all tests pass:

```bash
composer test
```

For checking code style:
```bash
composer lint
```

For static analysis:
```bash
composer analyze
```

### Coding Standards

- Follow PSR-12 coding standards
- Use strict typing (`declare(strict_types=1)`)
- Add type hints and return types
- Document public methods with PHPDoc blocks
- Keep classes focused and maintainable
- Use meaningful variable and method names

Example:
```php
declare(strict_types=1);

namespace EchoLabs\Prism\YourFeature;

final class YourClass
{
    public function __construct(
        private readonly DependencyInterface $dependency,
    ) {}

    /**
     * Brief description of what this method does.
     *
     * @param string $input Description of the input
     * @return array<string, mixed> Description of the return value
     *
     * @throws \YourException When something goes wrong
     */
    public function doSomething(string $input): array
    {
        // Implementation
    }
}
```

### Adding New Features

1. Start with tests (TDD approach preferred)
2. Implement the feature
3. Add documentation
4. Update the CHANGELOG.md file

### Documentation

- Add PHPDoc blocks for all public methods
- Update the documentation in `/docs` for significant changes
- Include examples in documentation
- Keep README.md updated

## Pull Request Process

1. Update the CHANGELOG.md under "Unreleased"
2. Ensure all tests pass
3. Update documentation if needed
4. Submit PR against the `main` branch
5. Fill out the PR template completely

### PR Template

```markdown
## Description
Brief description of your changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Coding standards followed
- [ ] Static analysis passes
```

## Creating Issues

### Bug Reports

When filing a bug report, please include:

- Prism version
- PHP version
- Laravel version
- Clear steps to reproduce
- Expected vs actual behavior
- Any relevant error messages

### Feature Requests

For feature requests:

- Clearly describe the feature
- Explain the use case
- Provide examples of how it would work
- Note any potential challenges

## Release Process

1. Update CHANGELOG.md
2. Update version in relevant files
3. Create GitHub release
4. Tag release following semver

## Resources

- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)
- [License](LICENSE.md)

## Questions?

Join our [Discord community](https://discord.gg/example) for quick help, or open a GitHub Discussion for longer conversations.

> [!NOTE]
> By contributing, you agree that your contributions will be licensed under the project's MIT License.

Thank you for helping make Prism better! ✍️
