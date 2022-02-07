import { readFileSync } from "fs";
import Interpreter from "./core/Interpreter";

export = {
    /**
     * Parses a FunExp source and returns a RegExp
     * @param source The input to be parsed
     * @returns 
     */
    parse(source: string): RegExp {
        return new RegExp((new Interpreter(source)).lex());
    },

    /**
     * Parses a FunExp source and returns a RegExp string
     * @param source The input to be parsed
     * @returns 
     */
    parseAsString(source: string): string {
        return (new Interpreter(source)).lex();
    },


    /**
     * Parses a FunExp file and returns a RegExp
     * @param filename The filename to be parsed
     * @returns 
     */
    parseFile(filename: string): RegExp {
        return this.parse(readFileSync(filename, "utf8"));
    },

    /**
     * Parses a FunExp file and returns a RegExp string
     * @param filename The filename to be parsed
     * @returns 
     */
    parseFileAsString(filename: string): string {
        return this.parseAsString(readFileSync(filename, "utf8"));
    }
}