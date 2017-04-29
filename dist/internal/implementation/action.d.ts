import { ParsingState } from "./state";
import { ReplyKind } from "../../reply";
export declare class BasicParsingState implements ParsingState {
    input: string;
    position: number;
    stack: any[];
    state: any;
    value: any;
    kind: ReplyKind;
    expecting: string;
    constructor(input: string);
    atLeast(kind: ReplyKind): boolean;
    atMost(kind: ReplyKind): boolean;
    readonly isOk: boolean;
    readonly isSoft: boolean;
    readonly isHard: boolean;
    readonly isFatal: boolean;
}
/**
 * A parsing action to perform. A parsing action is a fundamental operation that mutates a ParsingState.
 */
export declare abstract class ParjsAction {
    /**
     * The internal operation performed by the action. This will be overriden by derived classes.
     * @param ps
     * @private
     */
    protected abstract _apply(ps: ParsingState): void | void;
    abstract expecting: string;
    displayName: string;
    /**
     * Perform the action on the given ParsingState. This is a wrapper around a derived action's _apply method.
     * @param ps The parsing state.
     */
    apply(ps: ParsingState): void;
    /**
     * Whether this action returns a value or not. Determines if the parser is loud or not.
     */
    abstract isLoud: boolean;
}
/**
 * Inherited by parser actions for basic parsers (e.g. string or numeric parsers), rather than combinators.
 */
export declare abstract class ParjsBasicAction extends ParjsAction {
    isLoud: boolean;
}
