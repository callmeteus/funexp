import { PugNode } from "pug-parser";
import Interpreter from "../../core/Interpreter";

export interface TokenProperties {
    /**
     * The token name (tag) used to identify the token
     */
    name: string|string[];

     /**
     * The token attributes
     * Defaults to false
     */
    attributes?: {
        name: string,
        type: "string" | "number" | "boolean",
        required?: boolean
    }[];

    /**
     * If the token can have a body
     * Useful if the token doesn't accept a body
     * Defaults to false
     */
    canHaveBody?: boolean;
}

export abstract class InterpreterToken {
    /**
     * The token properties
     */
    public static Properties: TokenProperties;

    protected attributes: Record<string, string | boolean | number>;

    constructor(
        protected node: PugNode,
        protected interpreter: Interpreter,
        protected parent?: InterpreterToken
    ) {
        const attributes = this.getClass().Properties.attributes;

        this.attributes = attributes.reduce<Record<string, string | boolean | number>>((prev, curr) => {
            const value = node.attrs.find((node) => node.name === curr.name)?.val;

            if (curr.required === true && value === undefined) {
                throw this.interpreter.makeError("Attribute \"" + curr.name + "\" is required.", this.node);
            }

            if (curr.type === "string") {
                prev[curr.name] = String(value);
            } else
            if (curr.type === "boolean") {
                prev[curr.name] = Boolean(value);
            } else {
                prev[curr.name] = Number(value);
            }

            return prev;
        }, {});
    }

    /**
     * Checks if the token names matches
     * @param name The name to be checked
     * @returns 
     */
    public is(name: string) {
        const tokenName = this.getClass().Properties.name;
        return (Array.isArray(tokenName) ? tokenName : [tokenName]).includes(name);
    }

    /**
     * Retrieves the class related to this token
     * @returns 
     */
    public getClass<T extends typeof InterpreterToken>(): T {
        // @ts-ignore
        return this.constructor;
    }

    /**
     * Parses the token and returns the RegExp related to it
     */
    abstract parse(): string;

    /**
     * Throws an error if a given value is true
     * @param value The boolean to be asserted
     * @param message The error message if the value is true
     */
    protected assert(value: boolean, message: string) {
        if (value) {
            throw this.interpreter.makeError(message, this.node);
        }
    }

    /**
     * Escapes all RegExp operators from a string
     * @param string The string to be escaped
     * @returns 
     */
    protected escape(string: string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    /**
     * Validates the token attributes
     */
    public validate(): any {
        
    }

    /**
     * Checks if the node has attributes
     * @returns 
     */
    public hasAttributes() {
        return this.node.attrs.length > 0;
    }

    /**
     * Checks if the node has a body
     * @returns 
     */
    public hasBody() {
        return this.node.block.nodes.length > 0;
    }
}