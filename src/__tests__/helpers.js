const fs = require("fs-extra");
const path = require("path");
const os = require("os");

/**
 * Create a mock file system structure for testing
 */
function createMockFileSystem(baseDir) {
  const sshPath = path.join(baseDir, ".ssh");
  const keymanPath = path.join(baseDir, ".sshkeyman");
  const keymanFile = path.join(keymanPath, ".sshkeyman");
  const defaultEnvPath = path.join(keymanPath, "default");

  return {
    sshPath,
    keymanPath,
    keymanFile,
    defaultEnvPath,
    setup: () => {
      if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir, { recursive: true });
      }
      if (!fs.existsSync(sshPath)) {
        fs.mkdirSync(sshPath, { recursive: true });
        fs.writeFileSync(path.join(sshPath, "id_rsa"), "mock private key");
        fs.writeFileSync(path.join(sshPath, "id_rsa.pub"), "mock public key");
      }
    },
    cleanup: () => {
      if (fs.existsSync(baseDir)) {
        fs.rmSync(baseDir, { recursive: true, force: true });
      }
    },
    initializeKeyman: () => {
      if (!fs.existsSync(keymanPath)) {
        fs.mkdirSync(keymanPath, { recursive: true });
      }
      if (!fs.existsSync(defaultEnvPath)) {
        fs.mkdirSync(defaultEnvPath, { recursive: true });
        fs.copySync(sshPath, defaultEnvPath);
      }
      fs.writeFileSync(
        keymanFile,
        JSON.stringify({ active: "default", available: ["default"] })
      );
    },
  };
}

/**
 * Mock console methods
 */
function mockConsole() {
  const originalLog = console.log;
  const originalError = console.error;
  const logs = [];
  const errors = [];

  console.log = (...args) => {
    logs.push(args.join(" "));
  };
  console.error = (...args) => {
    errors.push(args.join(" "));
  };

  return {
    logs,
    errors,
    restore: () => {
      console.log = originalLog;
      console.error = originalError;
    },
    getLogs: () => logs,
    getErrors: () => errors,
    clear: () => {
      logs.length = 0;
      errors.length = 0;
    },
  };
}

/**
 * Mock inquirer prompts
 */
function mockInquirer(answers = {}) {
  const inquirer = require("inquirer");
  const originalPrompt = inquirer.prompt;

  inquirer.prompt = jest.fn((questions) => {
    const responses = {};
    questions.forEach((q) => {
      if (answers[q.name] !== undefined) {
        responses[q.name] = answers[q.name];
      } else if (q.default !== undefined) {
        responses[q.name] = q.default;
      }
    });
    return Promise.resolve(responses);
  });

  return {
    restore: () => {
      inquirer.prompt = originalPrompt;
    },
  };
}

module.exports = {
  createMockFileSystem,
  mockConsole,
  mockInquirer,
};

