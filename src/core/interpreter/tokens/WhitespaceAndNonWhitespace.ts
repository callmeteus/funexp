import { InterpreterToken, TokenProperties } from "../../../model/interpreter/Token";

export default class WhitespaceAndNonWhitespaceInterpreterToken extends InterpreterToken {
    public static Properties: TokenProperties = {
        name: ["non-whitespace", "whitespace"]
    };

    public validate() {
        super.validate();
        this.asserts.hasNoBody();
    }

    public parse() {
        return "\\" + (this.node.name === "whitespace" ? "s" : "S");
    }
}