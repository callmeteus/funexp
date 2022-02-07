import { InterpreterToken, TokenProperties } from "../../../model/interpreter/Token";

export default class CharsetInterpreterToken extends InterpreterToken {
    public static Properties: TokenProperties = {
        name: "charset"
    };

    public validate() {
        super.validate();

        this.asserts.hasBody();
    }

    public parse() {
        return this.interpreter.parse(this.node.block.nodes, this);
    }
}