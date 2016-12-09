import {ParjsAction, ParjsBasicAction} from "../../../base/action";
import {ParsingState} from "../../../abstract/basics/state";
import {ResultKind} from "../../../abstract/basics/result";
/**
 * Created by User on 22-Nov-16.
 */
export class PrsStringLen extends ParjsBasicAction{
    displayName = "stringLen";
    expecting : string;

    constructor(private length : number) {
       super();
       this.expecting = `${length} characters`;
    }

    _apply(ps : ParsingState) {
        let {position, input} = ps;
        let {length} = this;
        if (input.length < position + length) {
            ps.kind = ResultKind.SoftFail;
            return;
        }
        ps.position += length;
        ps.value = input.substr(position, length);
        ps.kind = ResultKind.OK;
    }
}