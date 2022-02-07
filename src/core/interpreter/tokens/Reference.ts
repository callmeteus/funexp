import { InterpreterToken, TokenProperties } from "../../../model/interpreter/Token";

export default class ReferenceInterpreterToken extends InterpreterToken {
    public static Properties: TokenProperties = {
        name: "reference",
        attributes: [
            {
                name: "group",
                type: "string"
            }
        ]
    };

    public validate() {
        super.validate();
        this.asserts.hasNoBody();
    }

    public parse() {
        return "\\" + (
            isNaN(parseInt(this.attributes.group as string)) ?
                "k" + this.attributes.group :
                this.attributes.group
        );
    }
}