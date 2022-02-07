import PugLexer from "pug-lexer";
import PugParser, { PugAST, PugNode } from "pug-parser";
import GroupInterpreterToken from "./interpreter/tokens/Group";
import LiteralInterpreterToken from "./interpreter/tokens/Literal";

export class RegExpError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export default class Interpreter {
    /**
     * All tokens used by the interpreter
     */
    private static Tokens = [
        LiteralInterpreterToken,
        GroupInterpreterToken
    ];

    private regexp: string = "";
    private flags: string = "";

    private startToken: "^" | "#" | string = "^";
    private endToken: "$" | "#" | string = "$";

    constructor(
        protected source: string
    ) {
        
    }

    public makeError(message: string, node?: PugNode) {
        if (node?.start && node?.end) {
            message += `\nStart: ${node.start}, end: ${node.end}.`;
        }

        if (node?.line) {
            message += ` on line ${node.line}`;
        }

        if (node?.line && node?.column) {
            const source = this.source.split(/[\n]/)[node?.line - 1];
            message += "\n\n" + source;
            message += "\n" + "-".repeat(node?.column) + "^";
        }

        return new RegExpError(message);
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
     * Parses an input into a RegExp string
     * @param input The input AST or node array
     * @param process If can save the process into the converter RegExp
     * @returns 
     */
    public parse(input: PugAST | PugNode[], process: boolean = true) {
        let result = "";

        const arr = (Array.isArray(input) ? input : input.nodes);

        // Iterate over all nodes
        arr.forEach((node) => {
            // Check if it's a tag
            if (node.type === "Tag") {
                for(let Token of Interpreter.Tokens) {
                    const token = new Token(node, this);

                    if (!token.is(node.name)) {
                        continue;
                    }

                    // Parse the token and prevent from continueing
                    result += token.parse();
                    return;
                }

                switch(node.name) {
                    default:
                        throw this.makeError("Unknown operator \"" + node.name + "\"", node);

                    // If it's a modifier
                    case "mod":
                        // Modifiers are not allowed outside of the document top
                        if (this.regexp.length > 0) {
                            throw this.makeError("Expression modifiers can only be present at the top of the document.");
                        } else {
                            const modifiers = {
                                global: "g",
                                "multi-line": "m"
                            } as const;

                            this.flags = node.attrs.map((attr) => modifiers[attr.name as keyof typeof modifiers]).join("");
                        }
                    break;

                    // If it's a start
                    case "start":
                        // A start is only allowed in the start of the regexp, duh
                        if (this.regexp.length > 0) {
                            throw this.makeError("Start modifier can only be present at the start of the document.");
                        }

                        result += this.startToken;
                    break;

                    // If it's an end
                    case "end":
                        // If has any more nodes to be parsed
                        if (arr.indexOf(node) !== arr.length - 1) {
                            throw this.makeError("End modifier can only be present at the end of the document.");
                        }

                        result += this.endToken;
                    break;

                    // If it's a meta operator (".")
                    case "meta":
                        const meta = node.attrs.map((attr) => attr.name).join("").trim();
                        result += meta;
                    break;

                    // If it's a quantifier (* or +)
                    case "quantifier":
                        const quantifier = node.attrs.map((attr) => attr.name).join("").trim();

                        if (!["*", "+"].includes(quantifier)) {
                            throw this.makeError("Invalid quantifier \"" + quantifier + "\"", node);
                        }

                        result += quantifier;
                    break;

                    // If it's an alternative / or (|)
                    case "alternative":
                        const block = node.block.nodes.map((node) => this.parse([node], false));
                        
                        result += block.join("|");
                    break;
                }
            }
        });

        if (process) {
            this.regexp += result;
            return this.regexp;
        }

        return result;
    }
}