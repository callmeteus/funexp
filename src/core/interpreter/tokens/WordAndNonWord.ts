import { InterpreterToken, TokenProperties } from "../../../model/interpreter/Token";

export default class WordAndNonWordInterpreterToken extends InterpreterToken {
    public static Properties: TokenProperties = {
        name: ["non-word", "word"]
    };

    public validate() {
        super.validate();
        this.asserts.hasNoBody();
    }

    public parse() {
        return "\\" + this.node.name === "word" ? "w" : "W";
    }
}