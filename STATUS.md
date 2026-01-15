# Build & Test Status

## Current Status

### Build Status
[![Build Status](https://github.com/shahidullahkhankhattak/ssh-keyman/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/shahidullahkhankhattak/ssh-keyman/actions/workflows/ci.yml)

**Latest Build:** ✅ Passing

### Test Status
[![Tests](https://img.shields.io/github/actions/workflow/status/shahidullahkhankhattak/ssh-keyman/ci.yml?branch=master&label=tests&logo=github)](https://github.com/shahidullahkhankhattak/ssh-keyman/actions/workflows/ci.yml)

**Total Tests:** 35  
**Passing:** ✅ 35  
**Failing:** ❌ 0  
**Skipped:** ⏭️ 0

### Code Coverage
[![Test Coverage](https://img.shields.io/codecov/c/github/shahidullahkhankhattak/ssh-keyman/master.svg)](https://codecov.io/gh/shahidullahkhankhattak/ssh-keyman)

| Metric | Coverage | Status |
|--------|----------|--------|
| **Statements** | 75.11% | ✅ Passing |
| **Branches** | 54.73% | ✅ Passing |
| **Functions** | 65.71% | ✅ Passing |
| **Lines** | 76.27% | ✅ Passing |

### File Coverage

| File | Statements | Branches | Functions | Lines |
|------|-----------|----------|-----------|-------|
| `commands.js` | 78.91% | 57.83% | 55% | 80.62% |
| `cliOptions.js` | 60% | 0% | 81.81% | 59.25% |
| `constants.js` | 100% | 100% | 100% | 100% |
| `extendFs.js` | 100% | 100% | 100% | 100% |

---

## Platform Compatibility

### Operating Systems

| Platform | Node 16 | Node 18 | Node 20 | Status |
|----------|---------|---------|---------|--------|
| **Ubuntu** | ✅ | ✅ | ✅ | Passing |
| **macOS** | ✅ | ✅ | ✅ | Passing |
| **Windows** | ✅ | ✅ | ✅ | Passing |

### Test Suites

| Test Suite | Tests | Status |
|------------|-------|--------|
| `constants.test.js` | 7 tests | ✅ Passing |
| `extendFs.test.js` | 6 tests | ✅ Passing |
| `cliOptions.test.js` | 8 tests | ✅ Passing |
| `commands.test.js` | 14 tests | ✅ Passing |

---

## Performance Metrics

| Metric | Value |
|--------|-------|
| **Test Execution Time** | ~3.4s |
| **Package Size** | < 50KB |
| **Dependencies** | 4 |
| **Dev Dependencies** | 2 |

---

## CI/CD Pipeline

### Workflows

1. **CI Workflow** (`ci.yml`)
   - Runs on: Push, Pull Request
   - Platforms: Ubuntu, macOS, Windows
   - Node Versions: 16.x, 18.x, 20.x
   - Steps:
     - Checkout code
     - Setup Node.js
     - Install dependencies
     - Run linter (if available)
     - Run tests with coverage
     - Upload coverage to Codecov

2. **Publish Workflow** (`publish.yml`)
   - Runs on: Release created
   - Platforms: Ubuntu
   - Steps:
     - Checkout code
     - Setup Node.js
     - Install dependencies
     - Run tests
     - Publish to NPM

3. **Test Report Workflow** (`test-report.yml`)
   - Runs on: Push, Pull Request, Daily schedule
   - Generates detailed test reports
   - Comments on PRs with test results

---

## Quality Gates

| Gate | Threshold | Current | Status |
|------|-----------|---------|--------|
| **Statement Coverage** | 55% | 75.11% | ✅ Pass |
| **Branch Coverage** | 50% | 54.73% | ✅ Pass |
| **Function Coverage** | 55% | 65.71% | ✅ Pass |
| **Line Coverage** | 55% | 76.27% | ✅ Pass |
| **Build Success** | Required | ✅ | ✅ Pass |
| **All Tests Pass** | Required | ✅ | ✅ Pass |

---

## Recent Activity

**Last Updated:** Check [GitHub Actions](https://github.com/shahidullahkhankhattak/ssh-keyman/actions) for real-time status

**Test History:** All tests passing consistently across all platforms

**Coverage Trend:** Maintaining 75%+ coverage

---

## Quick Links

- 📊 [Full Test Report](https://github.com/shahidullahkhankhattak/ssh-keyman/actions/workflows/ci.yml)
- 📈 [Coverage Dashboard](https://codecov.io/gh/shahidullahkhankhattak/ssh-keyman)
- 🐛 [Open Issues](https://github.com/shahidullahkhankhattak/ssh-keyman/issues)
- 🔀 [Pull Requests](https://github.com/shahidullahkhankhattak/ssh-keyman/pulls)
- 📦 [NPM Package](https://www.npmjs.com/package/ssh-keyman)

