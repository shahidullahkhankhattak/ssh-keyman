const fs = require("fs-extra");
const path = require("path");
const os = require("os");
const { mockConsole, mockInquirer } = require("./helpers");

// Mock modules before importing commands
jest.mock("inquirer");
jest.mock("inquirer-autocomplete-prompt", () => jest.fn());

describe("commands", () => {
  let testHomeDir;
  let originalHomedir;
  let consoleMock;
  let SSH_PATH;
  let KEYMAN_DIR_PATH;
  let KEYMAN_PATH;

  beforeAll(() => {
    // Mock os.homedir to return test directory
    originalHomedir = os.homedir;
    testHomeDir = path.join(os.tmpdir(), `ssh-keyman-test-home-${Date.now()}`);
    os.homedir = jest.fn(() => testHomeDir);
  });

  afterAll(() => {
    os.homedir = originalHomedir;
  });

  beforeEach(() => {
    // Clean up test directory
    if (fs.existsSync(testHomeDir)) {
      fs.rmSync(testHomeDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testHomeDir, { recursive: true });

    SSH_PATH = path.join(testHomeDir, ".ssh");
    KEYMAN_DIR_PATH = path.join(testHomeDir, ".sshkeyman");
    KEYMAN_PATH = path.join(KEYMAN_DIR_PATH, ".sshkeyman");

    // Create mock SSH directory
    fs.mkdirSync(SSH_PATH, { recursive: true });
    fs.writeFileSync(path.join(SSH_PATH, "id_rsa"), "mock private key");
    fs.writeFileSync(path.join(SSH_PATH, "id_rsa.pub"), "mock public key");

    consoleMock = mockConsole();

    // Clear module cache to get fresh imports with mocked homedir
    jest.resetModules();
  });

  afterEach(() => {
    consoleMock.restore();
    if (fs.existsSync(testHomeDir)) {
      fs.rmSync(testHomeDir, { recursive: true, force: true });
    }
  });

  describe("init", () => {
    it("should initialize ssh-keyman directory structure", () => {
      const commands = require("../commands");
      
      commands.init();

      expect(fs.existsSync(KEYMAN_DIR_PATH)).toBe(true);
      expect(fs.existsSync(KEYMAN_PATH)).toBe(true);
      expect(fs.existsSync(path.join(KEYMAN_DIR_PATH, "default"))).toBe(true);

      const keymanContent = JSON.parse(fs.readFileSync(KEYMAN_PATH, "utf8"));
      expect(keymanContent).toEqual({
        active: "default",
        available: ["default"],
      });
    });

    it("should not reinitialize if already initialized", () => {
      const commands = require("../commands");
      
      commands.init();
      const logs1 = [...consoleMock.getLogs()];
      consoleMock.clear();
      
      commands.init();
      const logs2 = consoleMock.getLogs();
      
      expect(logs2.some(log => log.includes("already initialized"))).toBe(true);
    });
  });

  describe("help", () => {
    it("should display help information", () => {
      const commands = require("../commands");
      
      commands.help();

      const logs = consoleMock.getLogs().join("\n");
      expect(logs).toContain("SSH KeyMan");
      expect(logs).toContain("Usage:");
      expect(logs).toContain("Commands:");
    });
  });

  describe("version", () => {
    it("should display version information", () => {
      const commands = require("../commands");
      
      commands.version();

      const logs = consoleMock.getLogs().join("\n");
      expect(logs).toContain("ssh-keyman");
      expect(logs).toContain("version");
    });
  });

  describe("list", () => {
    it("should show error when not initialized", () => {
      const commands = require("../commands");
      
      commands.list();

      const logs = consoleMock.getLogs().join("\n");
      expect(logs).toContain("not initialized");
    });

    it("should list available environments when initialized", () => {
      const commands = require("../commands");
      
      commands.init();
      
      // Reload module to pick up new keyman content
      jest.resetModules();
      const commandsReloaded = require("../commands");
      consoleMock.clear();
      
      commandsReloaded.list();

      const logs = consoleMock.getLogs().join("\n");
      expect(logs).toContain("Available environments");
      expect(logs).toContain("default");
      expect(logs).toContain("active");
    });
  });

  describe("create", () => {
    it("should show error when not initialized", async () => {
      const commands = require("../commands");
      
      await commands.create("test-env");

      const logs = consoleMock.getLogs().join("\n");
      expect(logs).toContain("not initialized");
    });

    it("should create new environment with name provided", async () => {
      let inquirer = require("inquirer");
      inquirer.prompt = jest.fn(() => 
        Promise.resolve({ switchNow: false })
      );

      const commands = require("../commands");
      commands.init();
      
      // Reload to pick up initialized state
      jest.resetModules();
      inquirer = require("inquirer");
      inquirer.prompt = jest.fn(() => 
        Promise.resolve({ switchNow: false })
      );
      const commandsReloaded = require("../commands");
      consoleMock.clear();

      await commandsReloaded.create("production");

      expect(fs.existsSync(path.join(KEYMAN_DIR_PATH, "production"))).toBe(true);
      
      const keymanContent = JSON.parse(fs.readFileSync(KEYMAN_PATH, "utf8"));
      expect(keymanContent.available).toContain("production");
    });

    it("should prompt for name when not provided", async () => {
      let inquirer = require("inquirer");
      let callCount = 0;
      inquirer.prompt = jest.fn((questions) => {
        callCount++;
        const firstQuestion = questions[0];
        if (firstQuestion.name === "envName") {
          return Promise.resolve({ envName: "prompted-env" });
        }
        return Promise.resolve({ switchNow: false });
      });

      const commands = require("../commands");
      commands.init();
      
      // Reload to pick up initialized state
      jest.resetModules();
      inquirer = require("inquirer");
      callCount = 0;
      inquirer.prompt = jest.fn((questions) => {
        callCount++;
        const firstQuestion = questions[0];
        if (firstQuestion.name === "envName") {
          return Promise.resolve({ envName: "prompted-env" });
        }
        return Promise.resolve({ switchNow: false });
      });
      const commandsReloaded = require("../commands");
      consoleMock.clear();

      await commandsReloaded.create();

      expect(callCount).toBeGreaterThan(0);
      expect(fs.existsSync(path.join(KEYMAN_DIR_PATH, "prompted-env"))).toBe(true);
    });
  });

  describe("switch", () => {
    it("should show error when not initialized", async () => {
      const commands = require("../commands");
      
      await commands.switch("production");

      const logs = consoleMock.getLogs().join("\n");
      expect(logs).toContain("not initialized");
    });

    it("should switch to existing environment", async () => {
      let inquirer = require("inquirer");
      inquirer.prompt = jest.fn(() => 
        Promise.resolve({ switchNow: false })
      );

      const commands = require("../commands");
      commands.init();
      
      // Reload to get initialized state
      jest.resetModules();
      inquirer = require("inquirer");
      inquirer.prompt = jest.fn(() => 
        Promise.resolve({ switchNow: false })
      );
      let commandsReloaded = require("../commands");
      await commandsReloaded.create("production");
      
      // Reload again to get updated environment list
      jest.resetModules();
      inquirer = require("inquirer");
      inquirer.prompt = jest.fn(() => 
        Promise.resolve({ switchNow: false })
      );
      commandsReloaded = require("../commands");
      consoleMock.clear();
      
      await commandsReloaded.switch("production");

      const keymanContent = JSON.parse(fs.readFileSync(KEYMAN_PATH, "utf8"));
      expect(keymanContent.active).toBe("production");
    });

    it("should show warning when already on selected environment", async () => {
      const commands = require("../commands");
      commands.init();
      
      // Reload to pick up initialized state
      jest.resetModules();
      const commandsReloaded = require("../commands");
      consoleMock.clear();

      await commandsReloaded.switch("default");

      const logs = consoleMock.getLogs().join("\n");
      expect(logs).toContain("already");
    });
  });

  describe("delete", () => {
    it("should show error when not initialized", async () => {
      const commands = require("../commands");
      
      await commands.delete("test-env");

      const logs = consoleMock.getLogs().join("\n");
      expect(logs).toContain("not initialized");
    });

    it("should not delete default environment", async () => {
      const commands = require("../commands");
      commands.init();
      
      // Reload to get initialized state
      jest.resetModules();
      const commandsReloaded = require("../commands");
      consoleMock.clear();

      await commandsReloaded.delete("default");

      const logs = consoleMock.getLogs().join("\n");
      expect(logs).toContain("Default environment cannot be deleted");
    });

    it("should not delete active environment", async () => {
      let inquirer = require("inquirer");
      inquirer.prompt = jest.fn(() => 
        Promise.resolve({ switchNow: true })
      );

      const commands = require("../commands");
      commands.init();
      
      // Reload and create new env
      jest.resetModules();
      inquirer = require("inquirer");
      inquirer.prompt = jest.fn(() => 
        Promise.resolve({ switchNow: true })
      );
      let commandsReloaded = require("../commands");
      await commandsReloaded.create("production");
      
      // Reload to get updated content
      jest.resetModules();
      inquirer = require("inquirer");
      inquirer.prompt = jest.fn(() => 
        Promise.resolve({ switchNow: true })
      );
      commandsReloaded = require("../commands");
      consoleMock.clear();

      await commandsReloaded.delete("production");

      const logs = consoleMock.getLogs().join("\n");
      expect(logs).toContain("currently active");
    });

    it("should delete non-active environment", async () => {
      let inquirer = require("inquirer");
      inquirer.prompt = jest.fn(() => 
        Promise.resolve({ switchNow: false })
      );

      const commands = require("../commands");
      commands.init();
      
      // Reload and create new env
      jest.resetModules();
      inquirer = require("inquirer");
      inquirer.prompt = jest.fn(() => 
        Promise.resolve({ switchNow: false })
      );
      let commandsReloaded = require("../commands");
      await commandsReloaded.create("production");
      
      // Reload to get updated content
      jest.resetModules();
      inquirer = require("inquirer");
      inquirer.prompt = jest.fn(() => 
        Promise.resolve({ switchNow: false })
      );
      commandsReloaded = require("../commands");
      consoleMock.clear();

      await commandsReloaded.delete("production");

      expect(fs.existsSync(path.join(KEYMAN_DIR_PATH, "production"))).toBe(false);
      
      const keymanContent = JSON.parse(fs.readFileSync(KEYMAN_PATH, "utf8"));
      expect(keymanContent.available).not.toContain("production");
    });
  });
});

