"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var action_1 = require("../../../base/action");
var result_1 = require("../../../abstract/basics/result");
/**
 * Created by lifeg on 24/11/2016.
 */
var PrsEof = (function (_super) {
    __extends(PrsEof, _super);
    function PrsEof() {
        _super.apply(this, arguments);
        this.isLoud = false;
        this.displayName = "eof";
        this.expecting = "end of input";
    }
    PrsEof.prototype._apply = function (ps) {
        if (ps.position === ps.input.length) {
            ps.kind = result_1.ResultKind.OK;
        }
        else {
            ps.kind = result_1.ResultKind.SoftFail;
        }
    };
    return PrsEof;
}(action_1.ParjsBasicAction));
exports.PrsEof = PrsEof;

//# sourceMappingURL=eof.js.map
