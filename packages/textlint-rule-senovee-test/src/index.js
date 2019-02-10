"use strict";
module.exports = function(context, options = {}) {
    const {Syntax, RuleError, report, getSource} = context;
    return {
        [Syntax.Str](node){ // "Str" node
            const text = getSource(node); // Get text
            const matches = /テスト/g.exec(text);
            if (!matches) {
                return;
            }
            const indexOfBugs = matches.index;
            const ruleError = new RuleError("テストしてる場合じゃねえ", {
                index: indexOfBugs // padding of index
            });
            report(node, ruleError);
        }
    }
};
