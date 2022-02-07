/**
 * @type {import("webpack").Configuration}
 */
module.exports = {
    entry: __dirname + "/index.js",
    output: {
        path: __dirname + "/out/"
    },
    module: {
        rules: [
            {
                test: /\.fun$/,
                use: "../"
            }
        ]
    }
};