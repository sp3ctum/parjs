import { string } from "@lib";
import { qthen } from "@lib/combinators";

describe("qthen", () => {
    it("succeeds", () => {
        const parser = string("ab").pipe(qthen(string("cd")));
        expect(parser.parse("abcd")).toBeSuccessful("cd");
    });
});
