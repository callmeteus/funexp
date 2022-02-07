import { InterpreterToken, TokenProperties } from "../../../model/interpreter/Token";

export default class GroupInterpreterToken extends InterpreterToken {
    public static Properties: TokenProperties = {
        name: "group",
        attributes: [
            {
                name: "optional",
                type: "boolean"
            },
            {
                name: "name",
                type: "string"
            }
        ]
    };

    public validate() {
        super.validate();
        this.asserts.hasBody();
    }

    public parse() {
        let result: string = "";

        result += "(";

        // If has any attributes than the "optional" one
        if (this.node.attrs.filter((attr) => attr.name !== "optional").length) {
            result += "?";

            if (this.attributes.name !== undefined) {
                result += "<" + (this.attributes.name as string).trim() + ">";
            }
        }

        result += this.interpreter.parse(this.node.block, this);
        result += ")";

        if (this.attributes.optional !== undefined && !!Boolean(this.attributes.optional)) {
            result += "?";
        }

        return result;
    }
}