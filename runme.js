const { LegacyESLint, FlatESLint } = require("eslint/use-at-your-own-risk");
const assert = require("assert");

(async () => {
    const text = "/* eslint-disable foo */";

    const legacyESLint = new LegacyESLint({ useEslintrc: false });
    const legacyResults = await legacyESLint.lintText(text);
    assert.strictEqual(legacyResults[0].messages.length, 1);
    assert.strictEqual(legacyResults[0].messages[0].ruleId, "foo");
    legacyESLint.getRulesMetaForResults(legacyResults); // does not throw

    const flatESLint = new FlatESLint({ overrideConfigFile: true });
    const flatResults = await flatESLint.lintText(text);
    assert.strictEqual(flatResults[0].messages.length, 1);
    assert.strictEqual(flatResults[0].messages[0].ruleId, "foo");
    try {
        flatESLint.getRulesMetaForResults(flatResults);
    } catch(e) {
        console.log("Throws!");
        console.log(e);
    }
})();
