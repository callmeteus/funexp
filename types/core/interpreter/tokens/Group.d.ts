import { InterpreterToken, TokenProperties } from "../../../model/interpreter/Token";
/**
 * @description Represents a group tag.
 */
export default class GroupInterpreterToken extends InterpreterToken {
    static Properties: TokenProperties;
    validate(): void;
    parse(): string;
}
