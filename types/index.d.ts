declare const _default: {
    /**
     * Parses a FunExp source and returns a RegExp
     * @param source The input to be parsed
     * @returns
     */
    parse(source: string): RegExp;
    /**
     * Parses a FunExp source and returns a RegExp string
     * @param source The input to be parsed
     * @returns
     */
    parseAsString(source: string): string;
    /**
     * Parses a FunExp file and returns a RegExp
     * @param filename The filename to be parsed
     * @returns
     */
    parseFile(filename: string): RegExp;
    /**
     * Parses a FunExp file and returns a RegExp string
     * @param filename The filename to be parsed
     * @returns
     */
    parseFileAsString(filename: string): string;
};
export = _default;
