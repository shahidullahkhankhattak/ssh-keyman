ssh-keyman
=====

<!-- Build & Test Status -->
[![Build Status](https://github.com/shahidullahkhankhattak/ssh-keyman/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/shahidullahkhankhattak/ssh-keyman/actions/workflows/ci.yml)
[![Tests](https://img.shields.io/github/actions/workflow/status/shahidullahkhankhattak/ssh-keyman/ci.yml?branch=master&label=tests&logo=github)](https://github.com/shahidullahkhankhattak/ssh-keyman/actions/workflows/ci.yml)
![Test Coverage](https://img.shields.io/badge/coverage-75.59%25-brightgreen)
![Tests Passing](https://img.shields.io/badge/tests-35%20passing-brightgreen)

<!-- Package Info -->
[![npm version](https://img.shields.io/npm/v/ssh-keyman.svg?logo=npm&color=cb3837)](https://www.npmjs.com/package/ssh-keyman)
[![npm downloads](https://img.shields.io/npm/dm/ssh-keyman.svg?logo=npm)](https://www.npmjs.com/package/ssh-keyman)
![Node Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen?logo=node.js)

<!-- Platform & Standards -->
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Maintained](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/shahidullahkhankhattak/ssh-keyman/graphs/commit-activity)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

<!-- Repository Stats (activate after first push) -->
[![Last Commit](https://img.shields.io/github/last-commit/shahidullahkhankhattak/ssh-keyman?logo=github)](https://github.com/shahidullahkhankhattak/ssh-keyman/commits)
[![Issues](https://img.shields.io/github/issues/shahidullahkhankhattak/ssh-keyman?logo=github)](https://github.com/shahidullahkhankhattak/ssh-keyman/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/shahidullahkhankhattak/ssh-keyman?logo=github)](https://github.com/shahidullahkhankhattak/ssh-keyman/pulls)
[![Stars](https://img.shields.io/github/stars/shahidullahkhankhattak/ssh-keyman?style=social)](https://github.com/shahidullahkhankhattak/ssh-keyman/stargazers)

A sophisticated key manager cli tool to manage multiple ssh keys and switch between different ssh keys with ease & grace.

## CI/CD Status

| Workflow | Status |
|----------|--------|
| **Build & Test** | [![CI](https://github.com/shahidullahkhankhattak/ssh-keyman/actions/workflows/ci.yml/badge.svg)](https://github.com/shahidullahkhankhattak/ssh-keyman/actions/workflows/ci.yml) |
| **Test Coverage** | ![Coverage](https://img.shields.io/badge/coverage-75.59%25-brightgreen) |
| **NPM Publish** | ![Publish](https://img.shields.io/badge/publish-ready-blue) |

> 📊 **[View Detailed Status Report →](STATUS.md)**

### Platform Support

Tests run automatically on:
- ✅ **Ubuntu** (Linux) - Node.js 16.x, 18.x, 20.x
- ✅ **macOS** - Node.js 16.x, 18.x, 20.x  
- ✅ **Windows** - Node.js 16.x, 18.x, 20.x

**35 Tests** | **75%+ Coverage** | **All Platforms Passing**

## Overview
--------

Normally people have difficulty managing different ssh keys for different Github / Bitbucket / Gitlab accounts. This package makes your life easier by creating different ssh profiles & manage them for you. So you can concentrate on your work.


Installation
------------

``` sh
npm install -g ssh-keyman
```

Usage
-----

```
➜  ~  ssh-keyman -h

SSH KeyMan - SSH Key Environment Manager

Usage: ssh-keyman <command> [options]

Commands:
  -i           Initialize keyman directory and default environment
  -c [name]    Create new ssh environment (interactive if no name)
  -s [name]    Switch to another ssh environment (interactive if no name)
  -d [name]    Delete ssh environment (interactive if no name)
  -ls          List all environments
  -h           Show help
  -v           Show version

Tip: Run commands without arguments for interactive mode
```

### ✨ New Interactive Features

ssh-keyman now supports **interactive mode with autocomplete**! Simply run commands without arguments to get an enhanced interactive experience:

- **`ssh-keyman -s`** - Interactive environment switcher with autocomplete
- **`ssh-keyman -c`** - Interactive environment creator with validation
- **`ssh-keyman -d`** - Interactive environment deletion with confirmation

#### Initialisation

Calling `ssh-keyman -i` creates a `~/.sshkeyman/` directory if it doesn't exist,
and copies your current `~/.ssh` as the 'default' ssh profile.
```
➜  ~  ssh-keyman -i

🔑 Initializing SSH KeyMan...

✓ Created ssh-keyman directory: /Users/shahidullahkhan/.sshkeyman
✓ Created default environment
✓ Activated 'default' environment

✨ SSH KeyMan initialized successfully!
```

#### Create a new ssh environment

With environment name:
```
➜  ~  ssh-keyman -c newenvironment
✓ Saved current ssh config to default
✓ Created directory for new environment: /Users/shahidullahkhan/.sshkeyman/newenvironment
? Do you want to switch to newly created environment (newenvironment)? (Y/n) y
✓ Activated environment 'newenvironment'
```

**Interactive mode** (just run without name):
```
➜  ~  ssh-keyman -c
? Enter name for the new environment: production
✓ Saved current ssh config to default
✓ Created directory for new environment: /Users/shahidullahkhan/.sshkeyman/production
? Do you want to switch to newly created environment (production)? (Y/n) 
```

A blank environment will be created. Then modify content of `~/.ssh/`. Then whenever you will switch to another environment, your changes will be saved.

#### List available ssh environments

```
➜  ~  ssh-keyman -ls

Available environments:
  • default
  ✓ newenvironment (active)
```

#### Switch to a specific ssh environment 

With environment name:
```
➜  ~  ssh-keyman -s default
✓ Saved current ssh config to 'newenvironment'
✓ Activated environment 'default'
```

**Interactive mode with autocomplete** (just run without name):
```
➜  ~  ssh-keyman -s
? Select environment to switch to: (Use arrow keys or type to search)
❯ default
  production
  staging
```
Start typing to filter environments with autocomplete!

#### Delete a specific ssh environment 

With environment name:
```
➜  ~  ssh-keyman -d newenvironment
✓ Successfully deleted environment 'newenvironment'
```

**Interactive mode with autocomplete and confirmation** (just run without name):
```
➜  ~  ssh-keyman -d
? Select environment to delete: (Use arrow keys or type to search)
❯ newenvironment
  staging
? Are you sure you want to delete environment 'newenvironment'? (y/N) y
✓ Successfully deleted environment 'newenvironment'
```

#### Get the current ssh-keyman version 

```
➜  ~  ssh-keyman -v
ssh-keyman version 1.0.2
```

Development
-----------

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:ci
```

### Project Structure

```
ssh-keyman/
├── src/
│   ├── __tests__/          # Test files
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

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

License
-------
ISC, a permissive free software license published by the Internet Software Consortium.

Contact
-------

* GitHub ([shahidullahkhan](http://github.com/shahidullahkhankhattak))
* Email ([shahid@shahidullahkhan.com](mailto:shahid@shahidullahkhan.com))

Made with ❤️ by Shahid Ullah Khan from Pakistan.
