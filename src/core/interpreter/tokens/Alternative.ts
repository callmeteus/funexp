import { InterpreterToken, TokenProperties } from "../../../model/interpreter/Token";

export default class AlternativeInterpreterToken extends InterpreterToken {
    public static Properties: TokenProperties = {
        name: "alternative"
    };

    public validate() {
        super.validate();
        this.asserts.hasBody("No alternatives were given.");
    }

    public parse() {
        const block: string[] = this.node.block.nodes.map((node) =>
            this.interpreter.parse([node], this)
        );

        return block.join("|");
    }
}