# @funexp/webpack-loader
The Webpack loader used to integrate funexp with your projects.

### Usage

You can use it to load `.fun` files that contains all the instructions to be compiled:

webpack.config.js
```javascript
module.exports = {
    entry: "./index.js",
    module: {
        rules: [
            {
                test: /\.fun$/,
                use: "@funexp/webpack-loader"
            }
        ]
    }
};
```

regex.fun
```pug
group(name="letter")
    any
space
literal|is for fun!
```

index.js
```javascript
const regex = require("./regex.fun");
console.log("F is for fun!".match(regex));
```

---

You can also use it to load files that contains Javascript template literals having the tag `fun`, that will be compiled into RegExp:

webpack.config.js
```javascript
module.exports = {
    entry: "./index.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "@funexp/webpack-loader"
            }
        ]
    }
};
```

index.js
```javascript
const regex = fun`
group(name="letter")
    any
space
literal|is for fun!
`;

console.log("F is for fun!".match(regex));
```