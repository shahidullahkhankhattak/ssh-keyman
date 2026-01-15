# Contributing to SSH KeyMan

First off, thank you for considering contributing to SSH KeyMan! It's people like you that make SSH KeyMan such a great tool.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:
- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include your environment details** (OS, Node.js version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any alternative solutions you've considered**

### Pull Requests

1. Fork the repo and create your branch from `master` or `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code follows the existing style
6. Issue the pull request!

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/ssh-keyman.git

# Navigate to the directory
cd ssh-keyman

# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode (useful during development)
npm run test:watch
```

## Project Structure

```
ssh-keyman/
├── src/
│   ├── __tests__/          # Test files
│   │   ├── helpers.js      # Test utilities
│   │   ├── *.test.js       # Test files
│   ├── cli.js              # CLI entry point
│   ├── cliOptions.js       # CLI argument parsing
│   ├── commands.js         # Command implementations
│   ├── constants.js        # Constants and configuration
│   └── extendFs.js         # File system utilities
├── .github/
│   └── workflows/          # GitHub Actions CI/CD
├── index.js                # Main entry point
└── package.json
```

## Testing Guidelines

- Write tests for any new functionality
- Ensure all tests pass before submitting PR
- Aim for high code coverage (currently targeting 55%+)
- Use descriptive test names that explain what is being tested

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:ci

# Run tests in watch mode
npm run test:watch
```

## Coding Style

- Use 2 spaces for indentation
- Use semicolons
- Use clear and descriptive variable names
- Add comments for complex logic
- Follow existing code patterns

## Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

Example:
```
Add autocomplete for environment switching

- Implemented fuzzy search for environment names
- Added arrow key navigation
- Closes #123
```

## Questions?

Feel free to open an issue with your question or reach out to the maintainers directly.

Thank you for contributing! ❤️

