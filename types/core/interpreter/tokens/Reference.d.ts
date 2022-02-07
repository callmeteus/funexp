import { InterpreterToken, TokenProperties } from "../../../model/interpreter/Token";
export default class ReferenceInterpreterToken extends InterpreterToken<{
    group?: string;
}> {
    static Properties: TokenProperties;
    validate(): void;
    parse(): string;
}
