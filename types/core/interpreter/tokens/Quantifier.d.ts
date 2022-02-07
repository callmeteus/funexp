import { InterpreterToken, TokenProperties } from "../../../model/interpreter/Token";
export default class QuantifierInterpreterToken extends InterpreterToken {
    private static ValidQuantifiers;
    static Properties: TokenProperties;
    private quantifier;
    validate(): void;
    parse(): string;
}
