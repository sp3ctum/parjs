/**
 * @module parjs/internal
 */ /** */
import {ParjsParser} from "./instance";
import {PrsCharWhere, PrsResult, PrsEof, PrsFail, PrsNewline, PrsString, PrsStringLen, PrsRest, AnyStringOf, PrsRegexp, PrsPosition, PrsState } from './implementation/parsers';
import {PrsAlts, PrsSeq} from './implementation/combinators';
import {ParjsAction, ParjsBasicAction} from "./implementation/action";
import {Chars} from "./implementation/functions/char-indicators";
import {AnyParser} from "../any";
import {ReplyKind} from "../reply";
import {IntOptions, PrsInt} from "./implementation/parsers/numbers/int";
import {FloatOptions, PrsFloat} from "./implementation/parsers/numbers/float";
import {assert} from 'chai';
import _ = require('lodash');
import {Issues} from "./implementation/issues";
import {PrsLate} from "./implementation/combinators/special/late";
import {LoudParser} from "../loud";
import {ParjsStatic, ParjsStaticHelper} from "../parjs";
import {AnyParserAction} from "./action";
import {BasicTraceVisualizer} from "./implementation/basic-trace-visualizer";
function wrap(action : ParjsAction) {
    return new ParjsParser(action);
}

export class ParjsHelper implements ParjsStaticHelper{
    isParser(obj : any) : obj is AnyParser {
        return obj instanceof ParjsParser;
    }

    isParserAction(obj : any) : obj is AnyParserAction {
        return obj instanceof ParjsBasicAction;
    }
}



export class ParjsParsers implements ParjsStatic {
    helper = new ParjsHelper();
    visualizer = new BasicTraceVisualizer();
    get spaces1() {
        return this.space.many(1).str.withName("spaces1");
    }

    late<T>(resolver : () => LoudParser<T>) : LoudParser<T> {
        return wrap(new PrsLate(() => resolver().action, true)).withName("late");
    }

    get asciiLetter() {
        return this.charWhere(Chars.isAsciiLetter).withName("asciiLetter")
    }


    any(...parsers : AnyParser[]) {
        return wrap(new PrsAlts(parsers.map(x => x.action))).withName("any");
    }

    seq(...parsers : AnyParser[]) {
        return wrap(new PrsSeq(parsers.map(x => x.action))).withName("seq");
    }

    get anyChar() {
        return wrap(new PrsStringLen(1)).withName("anyChar");
    }

    charWhere(predicate : (char : string) => boolean, property ?: string) {
        return wrap(new PrsCharWhere(predicate, property)).withName(`charWhere`);
    }

    anyCharOf(options : string) {
        return this.charWhere(x => options.includes(x), `any of ${options}`).withName("anyCharOf");
    }

    noCharOf(options : string) {
        return this.charWhere(x => !options.includes(x)).withName("noCharOf");
    }

    get digit() {
        return this.charWhere(Chars.isDigit).withName("digit");
    }

    get hex() {
        return this.charWhere(Chars.isHex).withName("hex");
    }

    get asciiLower() {
        return this.charWhere(Chars.isAsciiLower).withName("asciiLower");
    }

    get asciiUpper() {
        return this.charWhere(Chars.isAsciiUpper).withName("asciiUpper");
    }

    get newline() {
        return wrap(new PrsNewline(false)).withName("newline");
    }

    get unicodeNewline() {
        return wrap(new PrsNewline(true)).withName("unicodeNewline");
    }

    get space() {
        return this.charWhere(Chars.isInlineSpace).withName("space");
    }

    get unicodeSpace() {
        return this.charWhere(Chars.isUnicodeInlineSpace).withName("unicodeSpace");
    }

    get spaces() {
        return this.space.many().str.withName("spaces");
    }

    get unicodeSpaces() {
        return this.unicodeSpace.many().str.withName("unicodeSpaces");
    }

    get nop() {
        return this.result(undefined).q.withName("nop");
    }

    get rest() {
        return wrap(new PrsRest()).withName("rest");
    }

    string(str : string) {
        return wrap(new PrsString(str)).withName("string");
    }

    anyStringOf(...strs : string[]){
        return wrap(new AnyStringOf(strs)).withName("anyStringOf");
    }

    stringLen(length : number) {
        return wrap(new PrsStringLen(length)).withName("stringLen");
    }

    regexp(regex : RegExp) {
        return wrap(new PrsRegexp(regex)).withName("regexp");
    }

    result(x : any) {
        return wrap(new PrsResult(x)).withName("result");
    }

    get eof() {
        return wrap(new PrsEof()).withName("eof");
    }

    fail(expecting = "", kind : ReplyKind.Fail = ReplyKind.SoftFail) {
        return wrap(new PrsFail(kind, expecting)).withName("fail");
    }

    get position() {
        return wrap (new PrsPosition()).withName("position");
    }

    get state() {
        return wrap(new PrsState()).withName("state");
    }

    int(options ?: IntOptions) {
        options = _.defaults({}, options, {
            base: 10,
            allowSign : true
        });
        return wrap(new PrsInt(options)).withName("int");
    }

    float(options ?: FloatOptions) {
        options = _.defaults({}, options, {
            allowImplicitZero : true,
            allowExponent : true,
            allowSign : true,
            allowFloatingPoint : true
        } as FloatOptions);

        return wrap(new PrsFloat(options)).withName("float");
    }
}