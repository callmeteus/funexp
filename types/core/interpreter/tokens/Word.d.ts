import { InterpreterToken, TokenProperties } from "../../../model/interpreter/Token";
export default class WordInterpreterToken extends InterpreterToken {
    static Properties: TokenProperties;
    validate(): void;
    parse(): any;
}
