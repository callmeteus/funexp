import { PugAST, PugNode } from "pug-parser";
import { InterpreterToken } from "../model/interpreter/Token";
export interface RegExpLanguage {
    name: string;
    startToken: "^" | "#" | string;
    endToken: "$" | "#" | string;
    flags: Record<string, string>;
}
export interface InterpreterOptions {
    fileName?: string;
}
export declare class RegExpInterpretationError extends Error {
    line?: number;
    column?: number;
    fileName?: string;
    constructor(message: string);
}
export default class Interpreter {
    protected source: string;
    protected options?: InterpreterOptions;
    /**
     * All tokens used by the interpreter
     */
    private static Tokens;
    private regexp;
    private flags;
    constructor(source: string, options?: InterpreterOptions);
    getLanguage(): RegExpLanguage;
    /**
     * Creates a RegExp interpretation error
     * @param message The error message
     * @param node The node related to this error
     * @returns
     */
    makeError(message: string, node?: PugNode): RegExpInterpretationError;
    /**
     * Converts the source into a RegExp
     * @returns
     */
    lex(): string;
    /**
     * Checks if the interpreter already has any result
     * @returns
     */
    hasResult(): boolean;
    /**
     * Sets the resulting RegExp flags
     * @param flags The new flags to be set
     */
    setFlags(flags: string[] | string): void;
    /**
     * Parses an input into a RegExp string
     * @param input The input AST or node array
     * @param parent The parent token related to this parsing body
     * @returns
     */
    parse(input: PugAST | PugNode[], parent?: InterpreterToken): string;
}
