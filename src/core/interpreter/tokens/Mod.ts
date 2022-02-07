import { InterpreterToken, TokenProperties } from "../../../model/interpreter/Token";

export default class ModInterpreterToken extends InterpreterToken {
    private static Modifiers = {
        global: "g",
        "multi-line": "m",
        insensitive: "i"
    } as const;

    public static Properties: TokenProperties = {
        name: "mod",
        attributes: [
            {
                name: "global",
                type: "boolean"
            },
            {
                name: "multi-line",
                type: "boolean"
            },
            {
                name: "insensitive",
                type: "boolean"
            }
        ]
    };

    public validate() {
        super.validate();
        this.assert(this.interpreter.hasResult(), "Expression modifiers can only be present at the top of the document.")
        this.asserts.hasNoBody();
    }

    public parse() {
        this.interpreter.setFlags(
            this.node.attrs.map((attr) =>
                ModInterpreterToken.Modifiers[attr.name as keyof typeof ModInterpreterToken.Modifiers]
            )
        );

        return "";
    }
}