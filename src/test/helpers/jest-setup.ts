import { expect } from "@jest/globals";
import type { MatcherFunction, SyncExpectationResult } from "expect";
import {
    ResultKind,
    isParjsFailure,
    isParjsResult,
    isParjsSuccess
} from "../../lib/internal/result";

// helper
const fail = (message: string): SyncExpectationResult => ({
    pass: false,
    message: () => message
});

const toBeSuccessful: MatcherFunction<[value: unknown]> =
    // jest recommends to type the parameters as `unknown` and to validate the values
    function (actual: unknown, expected: unknown): SyncExpectationResult {
        if (!isParjsResult(actual)) {
            throw new Error("toBeSuccessful must be called on a ParjsResult");
        }

        if (!isParjsSuccess(actual)) {
            return fail(`expected the parse result ${actual} to be a ParjsSuccess instance`);
        }

        if (actual.kind !== "OK") {
            return fail(
                `expected the parse result ${actual} to have kind 'OK' but it had kind '${actual.kind}'`
            );
        }

        if (expected !== undefined) {
            try {
                // check the structure of the objects, not their references
                expect(actual.value).toEqual(expected);
            } catch (error) {
                return fail(
                    `expected the parse result ${actual} to have value ${expected}.\n\n${error}`
                );
            }
        }

        return {
            pass: true,
            message() {
                return `toBeSuccessful succeeded 👍`;
            }
        };
    };

const toBeFailure: MatcherFunction<[kind?: string]> = function (
    actual: unknown,
    expected: unknown
): SyncExpectationResult {
    if (!isParjsResult(actual)) {
        throw new Error("toBeFailure must be called on a ParjsResult");
    }

    if (!isParjsFailure(actual)) {
        return fail(
            `expected the parse result ${actual} to be a ParjsFailure instance, but its type is '${typeof actual}'`
        );
    }

    // if a kind was specified, check it
    if (expected !== undefined && actual.kind !== expected) {
        return fail(
            `expected the parse result ${actual} to have kind '${expected}' but it had kind '${actual.kind}'`
        );
    }

    return {
        pass: true,
        message() {
            return `toBeFailure succeeded 👍`;
        }
    };
};

expect.extend({
    toBeSuccessful,
    toBeFailure
});

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeSuccessful<T>(value?: T): R;
            toBeFailure(kind?: ResultKind): R;
        }
    }
}

export {};