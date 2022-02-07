import { InterpreterToken, TokenProperties } from "../../../model/interpreter/Token";

export default class LazyInterpreterToken extends InterpreterToken {
    public static Properties: TokenProperties = {
        name: "lazy"
    };

    public validate() {
        super.validate();
    }

    public parse() {
        return (
            this.hasBody() ?
                this.interpreter.parse(this.node.block.nodes) + "?" :
                "?"
        );
    }
}