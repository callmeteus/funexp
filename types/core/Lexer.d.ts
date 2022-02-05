export declare class RegExpError extends Error {
    constructor(message: string);
}
export default class Lexer {
    protected source: string;
    private regexp;
    private flags;
    constructor(source: string);
    private makeError;
    /**
     * Converts the source into a RegExp
     * @returns
     */
    lex(): string;
    /**
     * Escapes all RegExp operators from a string
     * @param string The string to be escaped
     * @returns
     */
    private escapeRegExp;
    private parse;
}
