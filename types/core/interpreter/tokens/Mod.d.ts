import { InterpreterToken, TokenProperties } from "../../../model/interpreter/Token";
export default class ModInterpreterToken extends InterpreterToken<{
    global?: boolean;
    "multi-line"?: boolean;
    insensitive?: boolean;
}> {
    private static Modifiers;
    static Properties: TokenProperties;
    validate(): void;
    parse(): string;
}
