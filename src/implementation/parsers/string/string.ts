import {ParjsAction, ParjsBasicAction} from "../../../base/action";
import {ParsingState} from "../../../abstract/basics/state";
import {ResultKind} from "../../../abstract/basics/result";
/**
 * Created by User on 21-Nov-16.
 */
export class PrsString extends ParjsBasicAction  {
    displayName = "string";
    expecting : string;
    constructor(private str : string) {
        super();
        this.expecting = `'${str}'`;
    }
    _apply(ps : ParsingState) {
        let {str} = this;
        let {position, input} = ps;
        let i;
        if (position + str.length > input.length) {
            ps.kind = ResultKind.SoftFail;
            return;
        }
        for (let i = 0; i < str.length; i++, position++) {
            if (str.charCodeAt(i) !== input.charCodeAt(position)) {
                ps.kind = ResultKind.SoftFail;
                return;
            }
        }
        ps.position += str.length;
        ps.value = str;
        ps.kind = ResultKind.OK;
    }
}