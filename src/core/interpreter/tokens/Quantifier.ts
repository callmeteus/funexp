import { InterpreterToken, TokenProperties } from "../../../model/interpreter/Token";

export default class QuantifierInterpreterToken extends InterpreterToken {
    private static ValidQuantifiers = ["*", "+"];

    public static Properties: TokenProperties = {
        name: "quantifier"
    };

    private quantifier: string;

    public validate() {
        super.validate();
        this.asserts.hasNoBody();

        this.quantifier = this.node.attrs.map((attr) => attr.name).join("").trim();

        this.assert(
            !QuantifierInterpreterToken.ValidQuantifiers.includes(this.quantifier),
            "Invalid quantifier \"" + this.quantifier + "\""
        );
    }

    public parse() {
        return this.quantifier;
    }
}