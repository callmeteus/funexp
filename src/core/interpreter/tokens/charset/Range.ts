import { InterpreterToken, TokenProperties } from "../../../../model/interpreter/Token";
import CharsetInterpreterToken from "../Charset";

export default class RangeCharsetInterpreterToken extends InterpreterToken {
    public static Properties: TokenProperties = {
        name: "range",
        attributes: [
            {
                name: "from",
                type: "string",
                required: true
            },
            {
                name: "to",
                type: "string",
                required: true
            }
        ]
    };

    private value: string = "";

    public validate() {
        super.validate();

        this.asserts.parentsWith(CharsetInterpreterToken);
        this.asserts.hasNoBody();

        this.assert(
            (this.attributes.from as string).charCodeAt(0) > (this.attributes.to as string).charCodeAt(0),
            "An invalid range was specified"
        );

        this.value = this.attributes.from + "-" + this.attributes.to;
    }

    public parse() {
        return "[" + this.value + "]";
    }
}