import PugLexer from "pug-lexer";
import PugParser, { PugAST, PugNode } from "pug-parser";
import { InterpreterToken } from "../model/interpreter/Token";
import AlternativeInterpreterToken from "./interpreter/tokens/Alternative";
import AnyInterpreterToken from "./interpreter/tokens/Any";
import GroupInterpreterToken from "./interpreter/tokens/Group";
import LiteralInterpreterToken from "./interpreter/tokens/Literal";
import ModInterpreterToken from "./interpreter/tokens/Mod";
import QuantifierInterpreterToken from "./interpreter/tokens/Quantifier";
import StartAndEndInterpreterToken from "./interpreter/tokens/StartAndEnd";

const debug = require("debug")("funexp:interpreter");

export interface RegExpLanguage {
    name: string;
    startToken: "^" | "#" | string;
    endToken: "$" | "#" | string;
}

export interface InterpreterOptions {
    fileName?: string
}

export class RegExpInterpretationError extends Error {
    public line?: number;
    public column?: number;
    public fileName?: string;

    constructor(message: string) {
        super(message);
    }
}

export default class Interpreter {
    /**
     * All tokens used by the interpreter
     */
    private static Tokens = [
        AlternativeInterpreterToken,
        AnyInterpreterToken,
        GroupInterpreterToken,
        LiteralInterpreterToken,
        ModInterpreterToken,
        QuantifierInterpreterToken,
        StartAndEndInterpreterToken
    ];

    private regexp: string = "";
    private flags: string = "";

    constructor(
        protected source: string,
        protected options?: InterpreterOptions
    ) {
        
    }

    public getLanguage(): RegExpLanguage {
        return {
            name: "javascript",
            startToken: "^",
            endToken: "$"
        };
    }

    /**
     * Creates a RegExp interpretation error
     * @param message The error message
     * @param node The node related to this error
     * @returns 
     */
    public makeError(message: string, node?: PugNode) {
        const error = new RegExpInterpretationError(message);

        if (node?.start && node?.end) {
            error.message += `\nStart: ${node.start}, end: ${node.end}.`;
        }

        if (node?.line) {
            error.line = node.line;
        }

        if (node?.line && node?.column) {
            const source = this.source.split(/[\n]/)[node?.line - 1];
            error.message += "\n\t" + source;
            error.message += "\n\t" + "-".repeat(node?.column - 1) + "^";

            error.line = node.line;
            error.column = node.column;
        }

        if (this.options?.fileName) {
            error.fileName = this.options.fileName;
        }

        return error;
    }

    /**
     * Converts the source into a RegExp
     * @returns 
     */
    public lex() {
        const lexed = PugLexer(this.source);
        const parsed = PugParser(lexed);

        this.parse(parsed);

        return "/" + this.regexp + "/" + this.flags;
    }

    /**
     * Checks if the interpreter already has any result
     * @returns 
     */
    public hasResult() {
        return this.regexp.length > 0;
    }

    /**
     * Sets the resulting RegExp flags
     * @param flags The new flags to be set
     */
    public setFlags(flags: string[]|string) {
        this.flags = Array.isArray(flags) ? flags.join("") : flags;
    }

    /**
     * Parses an input into a RegExp string
     * @param input The input AST or node array
     * @param parent The parent token related to this parsing body
     * @returns 
     */
    public parse(input: PugAST | PugNode[], parent?: InterpreterToken) {
        let result = "";

        const arr = (Array.isArray(input) ? input : input.nodes);

        // Iterate over all nodes
        arr.forEach((node) => {
            // Check if it's a tag
            if (node.type === "Tag") {
                for(let Token of Interpreter.Tokens) {
                    if (!Token.is(node.name)) {
                        debug("\"%s\" doesn't match with %O", node.name, Token.Properties.name);
                        continue;
                    }

                    debug("found token \"%s\" for tag \"%s\"", Token.Properties.name, node.name);

                    // Create a new token instance
                    const token = new Token(node, this, {
                        array: arr,
                        parent
                    });

                    token.validate();

                    // Parse the token and break the loop
                    result += token.parse();

                    debug("regexp result expanded to \"%s\"", result);

                    return;
                }

                // If we made into here, it surely is an unknown tag
                throw this.makeError("Unknown tag \"" + node.name + "\"");
            }
        });

        if (!parent) {
            this.regexp += result;
            return this.regexp;
        }

        return result;
    }
}