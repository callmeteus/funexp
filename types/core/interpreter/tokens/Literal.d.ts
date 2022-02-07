import { InterpreterToken, TokenProperties } from "../../../model/interpreter/Token";
export default class LiteralInterpreterToken extends InterpreterToken<{
    optional?: boolean;
}> {
    static Properties: TokenProperties;
    validate(): void;
    parse(): string;
}
