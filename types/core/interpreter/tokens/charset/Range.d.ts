import { InterpreterToken, TokenProperties } from "../../../../model/interpreter/Token";
export default class RangeCharsetInterpreterToken extends InterpreterToken<{
    from: string;
    to: string;
}> {
    static Properties: TokenProperties;
    private value;
    validate(): void;
    parse(): string;
}
