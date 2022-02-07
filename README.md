# funexp
A fun and functional way to write regular expressions (RegExp).

FunExp is a useful tool focused in maintainability for larger projects that depends on RegExp to do heavy work. It can speed up the learning process of a new person that is envolved with the project, or just make RegExp easily readable.
It has a fast learning curve (faster than RegExp itself) and can be integrated with any language that supports regular expressions.

## API
You can use funexp directly from your code:

`npm i @funexp/interpreter`

```javascript
const funexp = require("@funexp/interpreter");

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

Or, if you are using Webpack, you can use [@funexp/webpack-loader](/modules/webpack) to integrate with your project.

## Documentation
This section will be moved to a dedicated page in the future.

- **mod**
    - Represents a modifier. It depends on the RegExp target language.
        - Parameters:
            - *global*
                - Don't return after first match.
            - *multi-line*
                - `start` and `end` match start/end of line.
            - *insensitive*
                - Case insensitive match.
            - ... and many more depending on the target language.
        - *Example:*
            ```pug
            mod(global, insensitive)
            literal|this is a case insensitive regexp
            ```

            will be converted into 

            ```javascript
            /this is a case insensitive regexp/gi
            ```

- **start** or **end**
    - Represents the start or ending of the capture.
    If the modifier `multi-line` is present, will cause it to represent the start or ending of line.
    - *Example:*
        ```pug
        start
        any
        end
        ```

        will be converted into

        ```javascript
        /^.$/
        ```

- **literal** or **string**
    - Represents a text.
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

    - *Example:*
        ```pug
        any
        ```

        will be converted into

        ```javascript
        /./
        ```

- **quantifier**
    - Represents a quantifier, used to repeat a match.
    One of the given parameters needs to be present.
    
    - Parameters:
        - **\*** - Matches zero or more times.
        - **+** - Matches one or more times.
        - **[0-9]** - If any numbers were given (max two), it will be turned into a quantifier for the last token.

    - *Example:*
        ```pug
        group
            literal|abc
            quantifier(1, 2)
        quantifier(*)
        ```

        will be converted into

        ```javascript
        /(abc{1,2})*/
        ```

- **range**
    - Represents a range from one to another char.
    - Needs to be inside a `charset` tag.
    - See [charset](#charset) for an example.

    - Parameters:
        - **from** - The character where the range starts.
        - **to** - The character where the range ends.

- **charset**<a id="charset"></a>
    - Represents a character set / class.
    
    - *Example:*
        ```pug
        charset
            range(from="a", to="z")
        quantifier(*)
        ```

        will be converted into

        ```javascript
        /[a-z]*/
        ```

- **word** or **non-word**
    - Represents a match against any word (or non-word) character.
    - Word is equivalent to `[a-zA-Z0-9_]`.
    - Non-word is equivalent to `[^a-zA-Z0-9_]`.
    - *Example:*
        ```pug
        word
        non-word
        ```

        will be converted into

        ```javascript
        /\w\W/
        ```

- **whitespace** or **non-whitespace**
    - Represents a match against any whitespace (or non-whitespace) character.
    - Whitespace (in Javascript) is equivalent to `[\r\n\t\f\v \u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]`.
    - Non-whitespace (in Javascript) is equivalent to `[^\r\n\t\f\v \u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]`.
    - *Example:*
        ```pug
        whitespace
        non-whitespace
        ```

        will be converted into

        ```javascript
        /\s\S/
        ```

- **digit** or **non-digit**
    - Represents a match against any digit (or non-digit) character.
    - Whitespace (in Javascript) is equivalent to `[0-9]`.
    - Non-digit (in Javascript) is equivalent to `[^0-9]`.
    - *Example:*
        ```pug
        digit
        non-digit
        ```

        will be converted into

        ```javascript
        /\d\D/
        ```

- **lazy** or **greedy**
    - Represents a lazy or greedy match.
    - Lazy an greedy matches will consume *as much as possible* from the previous token.

    - *Example:*
        ```pug
        literal|i
        space
        group
            literal|love
            space
            lazy
        space
        any
        quantifier(*)
        ```

        will be converted into

        ```javascript
        /i (love?) .*/
        ```

- **reference**
    - Represents a backreference to an existing group.
    - Parameters:
        - **group** - The group to be referenced. Can be either the group ID or group name (if named references are supported by the language).
    - *Example:*
        ```pug
        group
            literal|i love you!
        reference(group=1)
        ```

        will be converted into

        ```javascript
        /(i love you)\1/
        ```

## Examples
You can view examples inside the [*test* folder](test/).

## Credits
- [pug.js](https://github.com/pugjs/pug)
    - funexp uses `pug-lexer` and `pug-parser` as the bases for lexing and parsing the pseudo-code.

## License
AGPL-3.0