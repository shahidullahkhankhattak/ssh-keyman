const fs = require("fs-extra");
const path = require("path");
const os = require("os");
const { delDirSync, delAndCopySync } = require("../extendFs");

describe("extendFs", () => {
  let testDir;

  beforeEach(() => {
    testDir = path.join(os.tmpdir(), `ssh-keyman-test-${Date.now()}`);
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  describe("delDirSync", () => {
    it("should delete an empty directory", () => {
      const emptyDir = path.join(testDir, "empty");
      fs.mkdirSync(emptyDir);

      delDirSync(emptyDir);

      expect(fs.existsSync(emptyDir)).toBe(false);
    });

    it("should delete a directory with files", () => {
      const dirWithFiles = path.join(testDir, "withFiles");
      fs.mkdirSync(dirWithFiles);
      fs.writeFileSync(path.join(dirWithFiles, "file1.txt"), "content1");
      fs.writeFileSync(path.join(dirWithFiles, "file2.txt"), "content2");

      delDirSync(dirWithFiles);

      expect(fs.existsSync(dirWithFiles)).toBe(false);
    });

    it("should delete a directory with nested directories", () => {
      const dirWithNested = path.join(testDir, "withNested");
      const nestedDir = path.join(dirWithNested, "nested");
      fs.mkdirSync(nestedDir, { recursive: true });
      fs.writeFileSync(path.join(nestedDir, "file.txt"), "content");

      delDirSync(dirWithNested);

      expect(fs.existsSync(dirWithNested)).toBe(false);
    });
  });

  describe("delAndCopySync", () => {
    it("should delete target directory and copy from source", () => {
      const sourceDir = path.join(testDir, "source");
      const targetDir = path.join(testDir, "target");

      // Create source directory with files
      fs.mkdirSync(sourceDir);
      fs.writeFileSync(path.join(sourceDir, "file1.txt"), "source content 1");
      fs.writeFileSync(path.join(sourceDir, "file2.txt"), "source content 2");

      // Create target directory with different files
      fs.mkdirSync(targetDir);
      fs.writeFileSync(path.join(targetDir, "oldfile.txt"), "old content");

      delAndCopySync(sourceDir, targetDir);

      // Check that target exists
      expect(fs.existsSync(targetDir)).toBe(true);
      
      // Check that source files were copied
      expect(fs.existsSync(path.join(targetDir, "file1.txt"))).toBe(true);
      expect(fs.existsSync(path.join(targetDir, "file2.txt"))).toBe(true);
      expect(fs.readFileSync(path.join(targetDir, "file1.txt"), "utf8")).toBe(
        "source content 1"
      );
      
      // Check that old target file is gone
      expect(fs.existsSync(path.join(targetDir, "oldfile.txt"))).toBe(false);
    });

    it("should handle nested directories in copy", () => {
      const sourceDir = path.join(testDir, "source");
      const targetDir = path.join(testDir, "target");
      const nestedSource = path.join(sourceDir, "nested");

      // Create source with nested structure
      fs.mkdirSync(nestedSource, { recursive: true });
      fs.writeFileSync(path.join(nestedSource, "nested.txt"), "nested content");

      // Create empty target
      fs.mkdirSync(targetDir);

      delAndCopySync(sourceDir, targetDir);

      // Check nested structure was copied
      expect(fs.existsSync(path.join(targetDir, "nested", "nested.txt"))).toBe(true);
      expect(
        fs.readFileSync(path.join(targetDir, "nested", "nested.txt"), "utf8")
      ).toBe("nested content");
    });
  });
});

