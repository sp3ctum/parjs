import { ParjsAction } from "../../action";
import { AnyParserAction } from "../../../action";
import { ParsingState } from "../../state";
/**
 * Created by User on 21-Nov-16.
 */
export declare class PrsStr extends ParjsAction {
    private inner;
    isLoud: boolean;
    expecting: string;
    constructor(inner: AnyParserAction);
    _apply(ps: ParsingState): void;
}
