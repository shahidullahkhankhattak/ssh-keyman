const { cliOptions, options } = require("../constants");

describe("constants", () => {
  describe("cliOptions", () => {
    it("should be an array of CLI option definitions", () => {
      expect(Array.isArray(cliOptions)).toBe(true);
      expect(cliOptions.length).toBeGreaterThan(0);
    });

    it("should have correct structure for each option", () => {
      cliOptions.forEach((option) => {
        expect(Array.isArray(option)).toBe(true);
        expect(option.length).toBe(3);
        expect(typeof option[0]).toBe("string"); // short option
        expect(typeof option[1]).toBe("string"); // long option name
        expect(typeof option[2]).toBe("string"); // help text
      });
    });

    it("should include all required commands", () => {
      const commands = cliOptions.map((opt) => opt[0]);
      expect(commands).toContain("i"); // init
      expect(commands).toContain("c"); // create
      expect(commands).toContain("s"); // switch
      expect(commands).toContain("d"); // delete
      expect(commands).toContain("ls"); // list
      expect(commands).toContain("h"); // help
      expect(commands).toContain("v"); // version
    });

    it("should have unique option names", () => {
      const shortNames = cliOptions.map((opt) => opt[0]);
      const uniqueNames = new Set(shortNames);
      expect(uniqueNames.size).toBe(shortNames.length);
    });
  });

  describe("options", () => {
    it("should be an array", () => {
      expect(Array.isArray(options)).toBe(true);
    });
  });
});

