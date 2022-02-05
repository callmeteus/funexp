const { readFileSync } = require("fs");
const glob = require("glob");
const funexp = require("../out");
const assert = require("assert");

const tests = glob.sync("**/*.fun");

console.info("test started");
console.info("");

tests.forEach((file) => {
    // Retrieve the comment containing the result
    const contents = readFileSync(file, "utf8").replace(/\r\n/, "\n");
    const expectedResult = contents.split("\n").shift().replace(/\/\/ */, "");

    assert.equal(funexp.parseAsString(contents), expectedResult, "❌ " + file);

    console.log("✅", file);
});