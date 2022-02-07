import { PugNode } from "pug-parser";
import Interpreter from "../../core/Interpreter";
export interface TokenProperties {
    /**
     * The token name (tag) used to identify the token
     */
    name: string | string[];
    /**
    * The token attributes
    * Defaults to false
    */
    attributes?: {
        name: string;
        type: "string" | "number" | "boolean";
        required?: boolean;
    }[];
    /**
     * If the token can have a body
     * Useful if the token doesn't accept a body
     * Defaults to false
     */
    canHaveBody?: boolean;
}
export declare abstract class InterpreterToken {
    protected node: PugNode;
    protected interpreter: Interpreter;
    protected parent?: InterpreterToken;
    /**
     * The token properties
     */
    static Properties: TokenProperties;
    protected attributes: Record<string, string | boolean | number>;
    constructor(node: PugNode, interpreter: Interpreter, parent?: InterpreterToken);
    /**
     * Checks if the token names matches
     * @param name The name to be checked
     * @returns
     */
    is(name: string): boolean;
    /**
     * Retrieves the class related to this token
     * @returns
     */
    getClass<T extends typeof InterpreterToken>(): T;
    /**
     * Parses the token and returns the RegExp related to it
     */
    abstract parse(): string;
    /**
     * Throws an error if a given value is true
     * @param value The boolean to be asserted
     * @param message The error message if the value is true
     */
    protected assert(value: boolean, message: string): void;
    /**
     * Escapes all RegExp operators from a string
     * @param string The string to be escaped
     * @returns
     */
    protected escape(string: string): string;
    /**
     * Validates the token attributes
     */
    validate(): any;
    /**
     * Checks if the node has attributes
     * @returns
     */
    hasAttributes(): boolean;
    /**
     * Checks if the node has a body
     * @returns
     */
    hasBody(): boolean;
}
