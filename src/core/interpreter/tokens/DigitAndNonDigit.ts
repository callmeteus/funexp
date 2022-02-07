import { InterpreterToken, TokenProperties } from "../../../model/interpreter/Token";

export default class DigitAndNonDigitInterpreterToken extends InterpreterToken {
    public static Properties: TokenProperties = {
        name: ["non-digit", "digit"]
    };

    public validate() {
        super.validate();
        this.asserts.hasNoBody();
    }

    public parse() {
        return "\\" + (this.node.name === "digit" ? "d" : "D");
    }
}