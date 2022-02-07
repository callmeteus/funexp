# funexp
A fun and functional way to write regular expressions (RegExp).

FunExp is a useful tool focused in maintainability for larger projects that depends on RegExp to do heavy work. It can speed up the learning process of a new person that is envolved with the project, or just make RegExp easily readable.
It has a fast learning curve (faster than RegExp itself) and can be integrated with any language that supports regular expressions.

## Documentation
This section will be moved to a dedicated page in the future.

- **mod**
    - Represents a modifier. It depends on the RegExp target language.
        - Parameters:
            - *g*
                - Don't return after first match.
            - *m*
                - `start` and `end` match start/end of line.
            - *i*
                - Case insensitive match.
            - ... and many more depending on the target language.

- **start** or **end**
    - Represents the start or ending of the capture.
    If the modifier `m` is present, will represent the start or ending of line.

- **literal** or **string**
    - Represents a literal text.
        Any RegExp character will be automatically escaped.
    - Parameters:
        - *optional* - If it's an optional capture.
            - Default: `false`
    - *Example:*
        ```pug
        literal|funexp is fun?! yes!
        ```
        
        will be converted into
        
        ```javascript
        /funexp is fun\?! yes!/`
        ```

- **space**
    - Represents a literal space character ( ). It's used for legibility purposes.
    - *Example:*
        ```pug
        space
        ```

        will be converted into 
        
        ```javascript
        / /
        ```

- **group**
    - Represents a group (capturing or non-capturing).
    - Parameters:
        - *optional* - If the entire group is an optional capture.
            - Default: `false`
        - *name* - The group name
        - *capture* - If it is a non-capturing group, used just for matching.
            - Default: `true`
    - *Example:*
        ```pug
        literal|This next text is
        space

        group(capture=false, optional=true)
            literal|surely
            space
        
        literal|optional
        ```

        will be converted into

        ```javascript
        /This next text is (?:surely )?optional/
        ```

- **alternative**
    - Represents an alternative choice.
    - *Example:*
        ```pug
        literal|I believe in
        space
        alternative
            literal|pugs
            literal|fun
        ```

        will be converted into

        ```javascript
        /I believe in pugs|fun/
        ```

- **any**
    - Represents the meta (dot) operator, matches any character.

- **quantifier**
    - Represents a quantifier, used to repeat a match.
    One of the given parameters needs to be present.
    
    - Parameters:
        - **\*** - Matches zero or more times.
        - **+** - Matches one or more times.

## API
You can use funexp directly from your code:

```javascript
const funexp = require("funexp");

const regex = funexp.parse(/*fun*/`
literal|I love to use
space
group(name="choice")
    alternative
        literal|funexp
        literal|regexp
`);

"I love to use funexp".match(regex);
```

## Examples
You can view examples inside the [*test* folder](test/).

## Credits
- [pug.js](https://github.com/pugjs/pug)
    - funexp uses `pug-lexer` and `pug-parser` as the bases for lexing and parsing the pseudo-code.

## License
AGPL-3.0