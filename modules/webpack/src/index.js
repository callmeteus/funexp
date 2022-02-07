var funexp = require("@funexp/interpreter");

/**
 * @typedef {{
 *  templateLiteral: boolean
 * }} FunExpOptions
 */

/**
 * 
 * @param {string} source The source file contents
 * @param {FunExpOptions} options 
 * @returns 
 */
function FunExpWebpackLoader(source, options = {}) {
    var contents = source;
    var regex = /fun *`(?<code>.+?)`/;

    var matches = source.match(regex);

    if (matches.length) {
        for(var i = 0; i < matches.length; i++) {
            var match = matches[i];

            var compiled = funexp.parseAsString(match.groups.code, options);
            source = source.replace(match, compiled);
        }
    } else {
        contents = funexp.parseAsString(source, options);
    }
    
    return "module.exports = " + contents;
}

module.exports = FunExpWebpackLoader;
module.exports.loader = FunExpWebpackLoader;