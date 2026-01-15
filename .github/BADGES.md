# Badge Reference Guide

This document explains all the badges used in the README and what they indicate.

## Build & Test Status Badges

### Build Status
```markdown
[![Build Status](https://github.com/shahidullahkhankhattak/ssh-keyman/actions/workflows/ci.yml/badge.svg?branch=master)](...)
```
**Shows:** Whether the latest build on the master branch passed or failed  
**Green = Passing** | **Red = Failing**

### Tests Status
```markdown
[![Tests](https://img.shields.io/github/actions/workflow/status/shahidullahkhankhattak/ssh-keyman/ci.yml?branch=master&label=tests&logo=github)](...)
```
**Shows:** Current test execution status  
**Updates:** On every push and pull request

### Test Coverage (Codecov)
```markdown
[![Test Coverage](https://codecov.io/gh/shahidullahkhankhattak/ssh-keyman/branch/master/graph/badge.svg)](...)
```
**Shows:** Percentage of code covered by tests  
**Target:** 55%+ coverage  
**Current:** ~75%

### Coverage Status (Shields.io)
```markdown
[![Coverage Status](https://img.shields.io/codecov/c/github/shahidullahkhankhattak/ssh-keyman/master.svg?logo=codecov)](...)
```
**Shows:** Alternative coverage badge with percentage  
**Color Coding:**
- 🟢 Green: 75%+
- 🟡 Yellow: 50-75%
- 🔴 Red: <50%

---

## Package Information Badges

### NPM Version
```markdown
[![npm version](https://img.shields.io/npm/v/ssh-keyman.svg?logo=npm&color=cb3837)](...)
```
**Shows:** Current version published on NPM  
**Updates:** On each NPM publish

### NPM Downloads
```markdown
[![npm downloads](https://img.shields.io/npm/dm/ssh-keyman.svg?logo=npm)](...)
```
**Shows:** Monthly download count from NPM  
**Updates:** Daily

### Bundle Size
```markdown
[![npm bundle size](https://img.shields.io/bundlephobia/min/ssh-keyman?logo=npm)](...)
```
**Shows:** Minified package size  
**Target:** Keep under 100KB

---

## Platform & Standards Badges

### Node.js Version
```markdown
[![Node.js Version](https://img.shields.io/node/v/ssh-keyman.svg?logo=node.js)](...)
```
**Shows:** Minimum required Node.js version  
**Currently:** Supports Node.js 16+

### License
```markdown
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](...)
```
**Shows:** Project license type  
**License:** ISC (permissive open-source)

### Maintained Status
```markdown
[![Maintained](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](...)
```
**Shows:** Whether project is actively maintained  
**Status:** Yes ✅

### PRs Welcome
```markdown
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](...)
```
**Shows:** Project accepts pull requests  
**Links to:** CONTRIBUTING.md

---

## Repository Statistics Badges

### Last Commit
```markdown
[![Last Commit](https://img.shields.io/github/last-commit/shahidullahkhankhattak/ssh-keyman?logo=github)](...)
```
**Shows:** Date of most recent commit  
**Indicates:** Project activity level

### Open Issues
```markdown
[![Issues](https://img.shields.io/github/issues/shahidullahkhankhattak/ssh-keyman?logo=github)](...)
```
**Shows:** Number of open issues  
**Links to:** GitHub issues page

### Pull Requests
```markdown
[![Pull Requests](https://img.shields.io/github/issues-pr/shahidullahkhankhattak/ssh-keyman?logo=github)](...)
```
**Shows:** Number of open pull requests  
**Links to:** GitHub PRs page

### GitHub Stars
```markdown
[![Stars](https://img.shields.io/github/stars/shahidullahkhankhattak/ssh-keyman?style=social)](...)
```
**Shows:** Number of GitHub stars  
**Style:** Social (includes star count)

---

## How Badges Update

### Automatic Updates
Most badges update automatically when:
- Code is pushed to GitHub
- Tests run in CI/CD
- Package is published to NPM
- Issues/PRs are created or closed

### Manual Refresh
If a badge appears outdated:
1. Click the badge to visit the source
2. Use Ctrl+F5 (or Cmd+Shift+R) to hard refresh
3. Wait a few minutes for CDN cache to clear

---

## Adding More Badges

### Shields.io
Visit [shields.io](https://shields.io) to create custom badges:
- Dynamic badges from APIs
- Static badges with custom text
- Styles: flat, flat-square, plastic, for-the-badge

### Simple Icons
Use [simpleicons.org](https://simpleicons.org) for logo names in badges:
```markdown
![Badge](https://img.shields.io/badge/text-value-color?logo=github)
```

---

## Badge Best Practices

1. **Order by Importance**
   - Build/Test status first
   - Package info second
   - Stats last

2. **Group Related Badges**
   - Use HTML comments to section badges
   - Keep similar badges together

3. **Limit Badge Count**
   - Too many badges = cluttered README
   - Focus on most relevant information

4. **Keep Links Updated**
   - Badges should link to relevant pages
   - Test links periodically

5. **Use Alt Text**
   - Always include descriptive alt text
   - Helps with accessibility

---

## Troubleshooting

### Badge Not Updating
- Check if service is online
- Verify URL parameters are correct
- Clear browser cache
- Wait for CDN propagation (5-10 mins)

### Badge Shows Error
- Verify repository/package name is correct
- Check if badge service supports your platform
- Ensure repository is public (for most badges)

### Badge Wrong Color
- Coverage thresholds may need adjustment
- Check if tests are actually passing
- Verify badge service status

---

## Resources

- [Shields.io Documentation](https://shields.io)
- [GitHub Actions Badges](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/adding-a-workflow-status-badge)
- [Codecov Badges](https://docs.codecov.com/docs/status-badges)
- [NPM Badges](https://shields.io/category/version)

