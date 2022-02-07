import { PugAST, PugNode } from "pug-parser";
export declare class RegExpError extends Error {
    constructor(message: string);
}
export default class Interpreter {
    protected source: string;
    /**
     * All tokens used by the interpreter
     */
    private static Tokens;
    private regexp;
    private flags;
    private startToken;
    private endToken;
    constructor(source: string);
    makeError(message: string, node?: PugNode): RegExpError;
    /**
     * Converts the source into a RegExp
     * @returns
     */
    lex(): string;
    /**
     * Parses an input into a RegExp string
     * @param input The input AST or node array
     * @param process If can save the process into the converter RegExp
     * @returns
     */
    parse(input: PugAST | PugNode[], process?: boolean): string;
}
