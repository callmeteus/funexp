export declare class RegExpError extends Error {
    constructor(message: string);
}
export default class Converter {
    protected source: string;
    private regexp;
    private flags;
    private startToken;
    private endToken;
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
    /**
     * Parses an input into a RegExp string
     * @param input The input AST or node array
     * @param process If can save the process into the converter RegExp
     * @returns
     */
    private parse;
}
