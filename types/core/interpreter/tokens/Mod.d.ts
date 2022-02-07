import { InterpreterToken, TokenProperties } from "../../../model/interpreter/Token";
export default class ModInterpreterToken extends InterpreterToken {
    private static Modifiers;
    static Properties: TokenProperties;
    validate(): void;
    parse(): string;
}
