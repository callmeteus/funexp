import { PugNode } from "pug-parser";
import Interpreter from "../../core/Interpreter";

export type TokenAttributes = {
    name: string,
    type: "string" | "number" | "boolean",
    required?: boolean
}[];

export interface TokenProperties {
    /**
     * The token name (tag) used to identify the token
     */
    name: string|string[];

     /**
     * The token attributes
     * Defaults to false
     */
    attributes?: TokenAttributes;

    /**
     * If the token can have a body
     * Useful if the token doesn't accept a body
     * Defaults to false
     */
    canHaveBody?: boolean;
}

export abstract class InterpreterToken<TAttributes = {}> {
    /**
     * The token properties
     */
    public static Properties: TokenProperties;

    /**
     * Checks if the token names matches
     * @param name The name to be checked
     * @returns 
     */
    public static is(name: string) {
        const tokenName = this.Properties.name;
        return (Array.isArray(tokenName) ? tokenName : [tokenName]).includes(name);
    }

    /**
     * Retrieves this token name
     * @returns 
     */
    public static getName() {
        return typeof this.Properties.name === "string" ? this.Properties.name : this.Properties.name[0];
    }

    protected attributes: TAttributes;

    constructor(
        /**
         * The node related to this token
         */
        protected node: PugNode,

        /**
         * The interpreter instance related to this token
         */
        protected interpreter: Interpreter,

        /**
         * The token data
         */
        protected data: {
            /**
             * The parent token
             */
            parent?: InterpreterToken<TAttributes>;

            /**
             * The input array related to this token
             */
            array?: PugNode[]
        } = {}
    ) {
        const attributes = this.getClass().Properties.attributes;

        if (attributes) {
            // Parse the attributes
            this.attributes = attributes.reduce<Record<string, any>>((prev, curr) => {
                // Try finding a value for the given attribute name
                const value = node.attrs.find((node) => node.name === curr.name)?.val;

                if (curr.required === true && value === undefined) {
                    throw this.interpreter.makeError("Attribute \"" + curr.name + "\" is required.", this.node);
                }

                if (value !== undefined) {
                    if (curr.type === "string") {
                        prev[curr.name] = String(value)
                            .trim()
                                .replace(/^\s*["'](.+?)["']/g, "$1");
                    } else
                    if (curr.type === "boolean") {
                        prev[curr.name] = Boolean(value);
                    } else {
                        prev[curr.name] = Number(value);
                    }
                }

                return prev;
            }, {}) as any as TAttributes;
        }
    }

    protected get asserts() {
        const self = this;

        return {
            /**
             * Asserts that the token has no body contents
             * @param message An optional error message
             * @returns 
             */
            hasNoBody(message: string = "This tag doesn't support having body contents.") {
                return self.assert(self.hasBody(), message);
            },

            /**
             * Asserts that the token has body contents
             * @param message An optional error message
             * @returns 
             */
            hasBody(message: string = "This tag needs to have body contents.") {
                return self.assert(!self.hasBody(), message);
            },

            /**
             * Asserts that the parent token extends a given token class
             * @param token The token class that the parent token needs to extend
             * @returns 
             */
            parentsWith(token: { new(...args: any[]): InterpreterToken<any> }, message: string = "This tags needs to have a parent \"${token.getName()\" tag.") {
                return self.assert(!(self.data.parent instanceof token), `${message}`);
            }
        };
    }

    /**
     * Retrieves the node name related to this token
     * @returns 
     */
    protected getNodeName() {
        return this.node.name;
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