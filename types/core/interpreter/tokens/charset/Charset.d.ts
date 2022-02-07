import { InterpreterToken, TokenProperties } from "../../../model/interpreter/Token";
export default class CharsetInterpreterToken extends InterpreterToken {
    private static PartsRegExp;
    static Properties: TokenProperties;
    private value;
    validate(): void;
    parse(): string;
}
