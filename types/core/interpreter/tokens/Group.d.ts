import { InterpreterToken, TokenProperties } from "../../../model/interpreter/Token";
/**
 * @description Represents a group tag.
 */
export default class GroupInterpreterToken extends InterpreterToken<{
    optional?: boolean;
    name?: string;
    capture?: boolean;
    "positive-lookahead"?: boolean;
    "negative-lookahead"?: boolean;
}> {
    static Properties: TokenProperties;
    validate(): void;
    parse(): string;
}
