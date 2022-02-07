import { InterpreterToken, TokenProperties } from "../../../model/interpreter/Token";

export default class StartAndEndInterpreterToken extends InterpreterToken {
    public static Properties: TokenProperties = {
        name: ["start", "end"]
    };

    public validate() {
        super.validate();

        this.asserts.hasNoBody();
        
        if (this.getNodeName() === "start") {
            // A start is only allowed in the start of the regexp, duh
            this.assert(this.interpreter.hasResult(), "A start tag can only be present at the start of the document.");
        } else {
            // If has any more nodes to be parsed
            this.assert(this.data.array.indexOf(this.node) !== this.data.array.length - 1, "An end tag can only be present at the end of the document.");
        }
    }

    public parse() {
        if (this.getNodeName() === "start") {
            return this.interpreter.getLanguage().startToken;
        } else {
            return this.interpreter.getLanguage().endToken;
        }
    }
}