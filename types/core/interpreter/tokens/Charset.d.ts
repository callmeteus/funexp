import { InterpreterToken, TokenProperties } from "../../../model/interpreter/Token";
export default class CharsetInterpreterToken extends InterpreterToken<{
    and?: boolean;
    or?: boolean;
}> {
    static Properties: TokenProperties;
    validate(): void;
    parse(): string;
}
