import {ParjsAction, ParjsBasicAction} from "../../../base/action";
import {ParsingState} from "../../../abstract/basics/state";
import {ResultKind} from "../../../abstract/basics/result";
/**
 * Created by User on 21-Nov-16.
 */

export class PrsRest extends ParjsBasicAction {
    displayName = "rest";
    isLoud = true;
    expecting = "zero or more characters";
    _apply(pr : ParsingState) {
        let {position, input} = pr;
        let text = input.substr(Math.min(position, input.length));
        pr.position = input.length;
        pr.value = text;
        pr.kind = ResultKind.OK;
    }
}