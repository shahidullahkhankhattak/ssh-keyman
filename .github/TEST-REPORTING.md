# Test Reporting Configuration

## Overview

This document explains how test reporting works in the ssh-keyman project.

## Test Report Formats

### 1. **Console Output** (Default)
```bash
npm test
```
Shows test results in terminal with coverage table.

### 2. **JUnit XML Report** (CI/CD)
```bash
npm run test:ci
```
Generates `coverage/junit.xml` for GitHub Actions integration.

### 3. **HTML Coverage Report**
```bash
npm test
open coverage/lcov-report/index.html
```
Visual coverage report in browser.

---

## GitHub Actions Integration

### Workflows Using Test Reports

#### 1. **CI Workflow** (`ci.yml`)
- Runs tests on every push/PR
- Uploads coverage to Codecov
- Validates across multiple platforms

#### 2. **Test Report Workflow** (`test-report.yml`)
- Generates detailed test reports
- Creates check runs with test results
- Comments on PRs with coverage details
- Uploads test artifacts

---

## JUnit Report Configuration

### Package: `jest-junit`
Installed as dev dependency to generate JUnit XML format.

### Jest Configuration
```json
{
  "reporters": [
    "default",
    [
      "jest-junit",
      {
        "outputDirectory": "coverage",
        "outputName": "junit.xml",
        "classNameTemplate": "{classname}",
        "titleTemplate": "{title}",
        "ancestorSeparator": " › ",
        "usePathForSuiteName": "true"
      }
    ]
  ]
}
```

### Generated File
- **Location**: `coverage/junit.xml`
- **Size**: ~5KB
- **Format**: Standard JUnit XML
- **Contents**: Test results, timings, failures

---

## Test Report Workflow Breakdown

### Triggers
- Push to `main`, `master`, or `develop`
- Pull requests to above branches

### Steps

#### 1. **Run Tests**
```yaml
- name: Run tests with coverage
  run: npm run test:ci
  continue-on-error: true
```
Runs tests and generates JUnit report.

#### 2. **Upload Artifacts**
```yaml
- name: Upload test results
  uses: actions/upload-artifact@v4
  with:
    name: test-results
    path: coverage/junit.xml
    retention-days: 30
```
Stores test results for 30 days.

#### 3. **Generate Report**
```yaml
- name: Test Report
  uses: dorny/test-reporter@v1
  with:
    name: Jest Tests
    path: coverage/junit.xml
    reporter: jest-junit
```
Creates GitHub check runs with test details.

#### 4. **PR Comments**
```yaml
- name: Comment PR with Coverage
  if: github.event_name == 'pull_request'
  uses: ArtiomTr/jest-coverage-report-action@v2
```
Adds coverage comment to pull requests.

---

## Viewing Test Reports

### In GitHub Actions

1. **Go to Actions tab**
2. **Select workflow run**
3. **View "Test Report" job**
4. **Check "Artifacts" section** for downloadable reports

### Check Runs

GitHub automatically creates check runs showing:
- ✅ Tests passed/failed
- 📊 Test count by suite
- ⏱️ Execution time
- 📋 Individual test results

### PR Comments

On pull requests, you'll see:
- Coverage percentage change
- Lines added/removed
- Coverage by file
- Detailed coverage report link

---

## Report Contents

### JUnit XML Structure

```xml
<testsuites name="jest tests" tests="35" failures="0">
  <testsuite name="src/__tests__/cliOptions.test.js">
    <testcase classname="cliOptions › prepareArgs" 
              name="should extract arguments" 
              time="0.007">
    </testcase>
    <!-- More test cases -->
  </testsuite>
</testsuites>
```

### Report Includes

- ✅ Test suite names
- ✅ Individual test names
- ✅ Execution time per test
- ✅ Failure details (if any)
- ✅ Error messages
- ✅ Stack traces (on failure)

---

## Artifacts

### Test Results Artifact
- **Name**: `test-results`
- **Contents**: `junit.xml`
- **Retention**: 30 days
- **Use**: Download to view detailed test data

### Coverage Results Artifact
- **Name**: `coverage-results`
- **Contents**: Full coverage directory
- **Includes**: 
  - `coverage-final.json`
  - `lcov.info`
  - `junit.xml`
  - HTML reports
- **Retention**: 30 days

---

## Troubleshooting

### "No test report files were found"

**Cause**: JUnit XML not generated  
**Solution**: 
- Ensure `jest-junit` is installed
- Check Jest reporter configuration
- Verify tests ran successfully

### "Reporter not found"

**Cause**: Incorrect reporter name  
**Solution**: Use `jest-junit` (not `jest`)

### "Permission denied"

**Cause**: Missing workflow permissions  
**Solution**: Add to workflow:
```yaml
permissions:
  contents: read
  checks: write
  pull-requests: write
```

### Tests Pass but Report Fails

**Cause**: Report generation error  
**Solution**: 
- Check artifact upload logs
- Verify file path is correct
- Ensure XML is valid

---

## Best Practices

### ✅ Do
- Run tests before pushing
- Check test reports on PRs
- Review coverage changes
- Keep artifacts for debugging
- Use `continue-on-error` for report steps

### ❌ Don't
- Commit `junit.xml` to git
- Ignore test report failures
- Skip coverage checks
- Delete artifacts prematurely

---

## Local Testing

### Generate Report Locally
```bash
# Run tests with JUnit output
npm run test:ci

# View JUnit XML
cat coverage/junit.xml

# View HTML coverage
open coverage/lcov-report/index.html
```

### Validate XML
```bash
# Check if XML is well-formed
xmllint --noout coverage/junit.xml

# Pretty print
xmllint --format coverage/junit.xml
```

---

## CI/CD Flow Diagram

```
Push/PR → CI Workflow
           ├─ Install Dependencies
           ├─ Run Tests
           ├─ Generate Coverage
           └─ Upload to Codecov

        → Test Report Workflow
           ├─ Run Tests
           ├─ Generate JUnit XML
           ├─ Upload Artifacts
           ├─ Create Check Run
           └─ Comment on PR (if PR)
```

---

## Coverage Report Features

### In PR Comments

**Coverage Summary:**
```
Coverage: 75.59% (+1.2%)
Files: 5
Lines: 163/215 (+5)
```

**By File:**
```
commands.js    78.91% (+2.1%)
cliOptions.js  60.00% (no change)
```

**Annotations:**
- Uncovered lines highlighted
- Coverage decrease warnings
- New uncovered code markers

---

## References

- [jest-junit Documentation](https://github.com/jest-community/jest-junit)
- [dorny/test-reporter](https://github.com/dorny/test-reporter)
- [ArtiomTr/jest-coverage-report-action](https://github.com/ArtiomTr/jest-coverage-report-action)
- [JUnit XML Format](https://llg.cubic.org/docs/junit/)

---

**Status**: ✅ Fully Configured  
**Last Updated**: 2026-01-15  
**Maintained By**: ssh-keyman team

