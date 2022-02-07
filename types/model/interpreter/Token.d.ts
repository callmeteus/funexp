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
    /**
     * The node related to this token
     */
    protected node: PugNode;
    /**
     * The interpreter instance related to this token
     */
    protected interpreter: Interpreter;
    /**
     * The token data
     */
    protected data: {
        /**
         * The parent token
         */
        parent?: InterpreterToken;
        /**
         * The input array related to this token
         */
        array?: PugNode[];
    };
    /**
     * The token properties
     */
    static Properties: TokenProperties;
    /**
     * Checks if the token names matches
     * @param name The name to be checked
     * @returns
     */
    static is(name: string): boolean;
    /**
     * Retrieves this token name
     * @returns
     */
    static getName(): string;
    protected attributes: Record<string, string | boolean | number>;
    constructor(
    /**
     * The node related to this token
     */
    node: PugNode, 
    /**
     * The interpreter instance related to this token
     */
    interpreter: Interpreter, 
    /**
     * The token data
     */
    data?: {
        /**
         * The parent token
         */
        parent?: InterpreterToken;
        /**
         * The input array related to this token
         */
        array?: PugNode[];
    });
    protected get asserts(): {
        /**
         * Asserts that the token has no body contents
         * @param message An optional error message
         * @returns
         */
        hasNoBody(message?: string): void;
        /**
         * Asserts that the token has body contents
         * @param message An optional error message
         * @returns
         */
        hasBody(message?: string): void;
        /**
         * Asserts that the parent token extends a given token class
         * @param token The token class that the parent token needs to extend
         * @returns
         */
        parentsWith(token: typeof InterpreterToken, message?: string): void;
    };
    /**
     * Retrieves the node name related to this token
     * @returns
     */
    protected getNodeName(): string;
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
