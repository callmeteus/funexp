import { InterpreterToken, TokenProperties } from "../../../../model/interpreter/Token";
export default class RangeCharsetInterpreterToken extends InterpreterToken {
    static Properties: TokenProperties;
    private value;
    validate(): void;
    parse(): string;
}
