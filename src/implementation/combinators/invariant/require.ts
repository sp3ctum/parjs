import {ParjsAction} from "../../../base/action";
import {Issues} from "../../common";
import {ParsingState} from "../../../abstract/basics/state";
import {ResultKind} from "../../../abstract/basics/result";
import {AnyParserAction} from "../../../abstract/basics/action";
/**
 * Created by User on 21-Nov-16.
 */
export class PrsMust extends ParjsAction {
    displayName = "must";
    isLoud = true;
    expecting : string;
    constructor(
        private inner : AnyParserAction,
        private requirement : (result : any) => boolean,
        private failType,
        private qualityName
    ) {
        super();
        inner.isLoud || Issues.quietParserNotPermitted(this);
        this.expecting = `intenral parser ${inner.displayName} yielding a result satisfying ${qualityName}`;
    }

    _apply(ps : ParsingState) {
        let {inner, requirement, failType} = this;
        inner.apply(ps);
        if (!ps.isOk) {
            return;
        }
        ps.kind = requirement(ps.value) ? ResultKind.OK : failType;
    }
}