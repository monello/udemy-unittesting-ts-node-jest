import { Utils } from "../app/Utils";

describe('Utils test suite', () => {
    it('first test', () => {
        const result = Utils.toUpperCase('abc');
        expect(result).toBe('ABC');
    });
});
