const { prepareArgs, getName, init } = require("../cliOptions");
const { options } = require("../constants");

describe("cliOptions", () => {
  beforeEach(() => {
    // Clear options array before each test
    options.length = 0;
  });

  describe("prepareArgs", () => {
    it("should extract command line arguments starting with dash", () => {
      const argv = ["node", "index.js", "-i", "-c"];
      const args = prepareArgs(argv);
      expect(args).toEqual(["i", "c"]);
    });

    it("should remove dashes from arguments", () => {
      const argv = ["node", "index.js", "--init", "-c"];
      const args = prepareArgs(argv);
      expect(args).toEqual(["init", "c"]);
    });

    it("should filter out non-dash arguments", () => {
      const argv = ["node", "index.js", "-s", "production", "-c"];
      const args = prepareArgs(argv);
      expect(args).toEqual(["s", "c"]);
    });

    it("should return empty array when no dash arguments", () => {
      const argv = ["node", "index.js", "somename"];
      const args = prepareArgs(argv);
      expect(args).toEqual([]);
    });
  });

  describe("getName", () => {
    it("should extract the first non-dash argument", () => {
      const argv = ["node", "index.js", "-s", "production"];
      const name = getName(argv);
      expect(name).toBe("production");
    });

    it("should return undefined when no non-dash arguments", () => {
      const argv = ["node", "index.js", "-i", "-c"];
      const name = getName(argv);
      expect(name).toBeUndefined();
    });

    it("should return first non-dash argument when multiple exist", () => {
      const argv = ["node", "index.js", "first", "second", "-s"];
      const name = getName(argv);
      expect(name).toBe("first");
    });
  });

  describe("init", () => {
    it("should populate options array", () => {
      expect(options.length).toBe(0);
      init();
      expect(options.length).toBeGreaterThan(0);
    });

    it("should create options with correct structure", () => {
      init();
      options.forEach((option) => {
        expect(option).toHaveProperty("option");
        expect(option).toHaveProperty("name");
        expect(option).toHaveProperty("method");
        expect(option).toHaveProperty("help");
        expect(typeof option.option).toBe("string");
        expect(typeof option.name).toBe("string");
        expect(typeof option.method).toBe("string");
        expect(typeof option.help).toBe("string");
      });
    });
  });
});

