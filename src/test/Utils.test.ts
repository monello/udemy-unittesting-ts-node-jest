import { toUpperCase } from "../app/Utils";

describe('Utils test suite', () => {
    it('should return uppercase of a valid string', () => {
        // ARRANGE
        // - sut: system under test - referencing to the toUppercase() function that we ate testing
        const sut = toUpperCase;
        const expected = 'ABC';

        // ACT
        const result = sut('abc');

        // ASSERT
        expect(result).toBe(expected);
    });
});
