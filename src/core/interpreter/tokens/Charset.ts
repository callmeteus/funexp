import { InterpreterToken, TokenProperties } from "../../../model/interpreter/Token";

export default class CharsetInterpreterToken extends InterpreterToken<{
    and?: boolean,
    or?: boolean
}> {
    public static Properties: TokenProperties = {
        name: "charset",
        attributes: [
            {
                name: "and",
                type: "boolean"
            },
            {
                name: "or",
                type: "boolean"
            }
        ]
    };

    public validate() {
        super.validate();

        this.asserts.hasBody();
    }

    public parse(): string {
        let op = "";

        if (this.attributes.and) {
            op = "&";
        } else
        if (this.attributes.or) {
            op = "|"
        }

        return `${op}[${this.interpreter.parse(this.node.block.nodes, this)}]`;
    }
}