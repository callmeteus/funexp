declare module "pug-parser" {
    export interface PugAST {
        type: "Block",
        nodes: PugNode[]
    }

    /**
     * Represents a generic pug node
     */
    export interface PugNode extends Record<string, any> {
        type: string,
        start?: number,
        end?: number,
        block?: PugAST,
        attrs?: {
            name: string,
            val: string,
            mustEscape: boolean
        }[]
    }

    export default (input: any[], options?: Record<string, any>) => PugAST;
}