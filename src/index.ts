import { readFileSync } from "fs";
import Interpreter, { InterpreterOptions } from "./core/Interpreter";

export = {
    /**
     * Parses a FunExp source and returns a RegExp
     * @param source The input to be parsed
     * @param options Any options to be passed to the interpreter
     * @returns 
     */
    parse(source: string, options?: InterpreterOptions): RegExp {
        return new RegExp((new Interpreter(source, options)).lex());
    },

    /**
     * Parses a FunExp source and returns a RegExp string
     * @param source The input to be parsed
     * @param options Any options to be passed to the interpreter
     * @returns 
     */
    parseAsString(source: string, options?: InterpreterOptions): string {
        return (new Interpreter(source, options)).lex();
    },


    /**
     * Parses a FunExp file and returns a RegExp
     * @param filename The filename to be parsed
     * @param options Any options to be passed to the interpreter
     * @returns 
     */
    parseFile(filename: string, options?: InterpreterOptions): RegExp {
        return this.parse(readFileSync(filename, "utf8"), options);
    },

    /**
     * Parses a FunExp file and returns a RegExp string
     * @param filename The filename to be parsed
     * @param options Any options to be passed to the interpreter
     * @returns 
     */
    parseFileAsString(filename: string, options?: InterpreterOptions): string {
        return this.parseAsString(readFileSync(filename, "utf8"), options);
    }
}