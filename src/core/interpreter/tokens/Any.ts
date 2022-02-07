import { InterpreterToken, TokenProperties } from "../../../model/interpreter/Token";

export default class AnyInterpreterToken extends InterpreterToken {
    public static Properties: TokenProperties = {
        name: "any"
    };

    public validate() {
        super.validate();
        this.asserts.hasNoBody();
    }

    public parse() {
        return ".";
    }
}