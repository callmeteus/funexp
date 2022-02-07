import { InterpreterToken, TokenProperties } from "../../../model/interpreter/Token";

export default class LiteralInterpreterToken extends InterpreterToken {
    public static Properties: TokenProperties = {
        name: ["literal", "string", "space"],
        attributes: [
            {
                name: "optional",
                type: "boolean"
            }
        ]
    };

    public validate() {
        this.assert(this.hasBody(), "Literal tokens can't have a body.");
    }

    public parse() {
        let result: string = "";

        // If it's an optional attribute, we convert it
        // into a group and mark it as optional
        if (this.attributes.optional) {
            result += "(";
        }

        // Check if it's the "space" helper tag
        if (this.node.name === "space") {
            result += " ";
        } else {
            result += this.escape(
                this.node.block.nodes
                    .map((node) => node.val || "")
                    .join(" ")
                        .replace(/^("|')/, "")
                        .replace(/("|')$/, "")
            );
        }

        if (this.attributes.optional) {
            result += ")?";
        }

        return result;
    }
}