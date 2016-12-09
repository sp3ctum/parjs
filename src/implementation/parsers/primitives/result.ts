import {ParjsAction, ParjsBasicAction} from "../../../base/action";
import {ResultKind} from "../../../abstract/basics/result";
import {ParsingState} from "../../../abstract/basics/state";
/**
 * Created by User on 22-Nov-16.
 */
export class PrsResult extends ParjsBasicAction {
    displayName ="result";
    isLoud = true;
    expecting = "anything";
    constructor(private result : any) {super()}
    _apply(ps : ParsingState) {
        let {result} = this;
        ps.value = result;
        ps.kind = ResultKind.OK;
    }
}