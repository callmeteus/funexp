import { InterpreterOptions } from "./core/Interpreter";
declare const _default: {
    /**
     * Parses a FunExp source and returns a RegExp
     * @param source The input to be parsed
     * @param options Any options to be passed to the interpreter
     * @returns
     */
    parse(source: string, options?: InterpreterOptions): RegExp;
    /**
     * Parses a FunExp source and returns a RegExp string
     * @param source The input to be parsed
     * @param options Any options to be passed to the interpreter
     * @returns
     */
    parseAsString(source: string, options?: InterpreterOptions): string;
    /**
     * Parses a FunExp file and returns a RegExp
     * @param filename The filename to be parsed
     * @param options Any options to be passed to the interpreter
     * @returns
     */
    parseFile(filename: string, options?: InterpreterOptions): RegExp;
    /**
     * Parses a FunExp file and returns a RegExp string
     * @param filename The filename to be parsed
     * @param options Any options to be passed to the interpreter
     * @returns
     */
    parseFileAsString(filename: string, options?: InterpreterOptions): string;
};
export = _default;
