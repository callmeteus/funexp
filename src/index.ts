import { readFileSync } from "fs";
import Converter from "./core/Converter";

export = {
    /**
     * Parses a FunExp source and returns a RegExp
     * @param source The input to be parsed
     * @returns 
     */
    parse(source: string): RegExp {
        return new RegExp((new Converter(source)).lex());
    },

    /**
     * Parses a FunExp source and returns a RegExp string
     * @param source The input to be parsed
     * @returns 
     */
    parseAsString(source: string): string {
        return (new Converter(source)).lex();
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