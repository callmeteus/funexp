import { InterpreterToken, TokenProperties } from "../../../model/interpreter/Token";

export default class QuantifierInterpreterToken extends InterpreterToken {
    private static QuantifierRegex = /([*+]|(\{[\d,]+\}))/;

    public static Properties: TokenProperties = {
        name: "quantifier"
    };

    private quantifier: string;

    public validate() {
        super.validate();
        this.asserts.hasNoBody();

        this.assert(this.node.attrs.length > 2, "Quantifiers can have at maximum 2 parameters (minimum and maximum).");

        // Check if it's just one quantifier
        if (this.node.attrs.length === 1) {
            // Extract it
            this.quantifier = this.node.attrs[0].name.trim();
        } else {
            // Join the quantifiers
            this.quantifier = "{" + this.node.attrs.map((attr) => attr.name).join(",").trim() + "}";
        }

        this.assert(
            !this.quantifier.match(QuantifierInterpreterToken.QuantifierRegex),
            "Invalid quantifier \"" + this.quantifier + "\""
        );
    }

    public parse() {
        return this.quantifier;
    }
}