import { InterpreterToken, TokenProperties } from "../../../model/interpreter/Token";
export default class GroupInterpreterToken extends InterpreterToken {
    static Properties: TokenProperties;
    validate(): void;
    parse(): string;
}
