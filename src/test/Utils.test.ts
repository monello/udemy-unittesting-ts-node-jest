import { getStringInfo, stringInfo, toUpperCase } from "../app/Utils";

describe('Utils test suite', () => {
    it('should return uppercase of a valid string', () => {
        // ARRANGE
        // - sut: system under test - referencing to the toUppercase() function that we ate testing
        const sut = toUpperCase;
        const expected = 'ABC';

        // ACT
        const actual = sut('abc');

        // ASSERT
        expect(actual).toBe(expected);
    });

    it('should return info for a valid string', () => {
        // ARRANGE
        const sut = getStringInfo;
        const expected: stringInfo = {
            lowerCase: 'my-string',
            upperCase: 'MY-STRING',
            characters: ['M', 'y', '-', 'S', 't', 'r', 'i', 'n', 'g'],
            length: 9,
            extraInfo: {}
        };

        // ACT
        const actual = sut('My-String');

        // ASSERT
        expect(actual.lowerCase).toBe(expected.lowerCase);
        expect(actual.upperCase).toBe(expected.upperCase);
        expect(actual.characters).toEqual(expected.characters); // note use of toEqual to compare array
        expect(actual.characters).toContain('M'); // handy matcher to check if an array contains an expected element
        expect(actual.characters).toContain<string>('M'); // using the optional Generic to apply more type-safety
        // this next example is usefuly when you don't know what the order of the array elements will be when returned, but you do know what st should contain
        expect(actual.characters).toEqual(
            expect.arrayContaining(['-', 'g', 'i', 'M'])
        );
        expect(actual.length).toBe(expected.length);
        expect(actual).toHaveLength(expected.length); // note the use of the handy tohaveLength matcher
        expect(actual.extraInfo).toEqual(expected.extraInfo); // note use of toEqual to compare objects

        // ways to assert that something is NOT undefined
        expect(actual.extraInfo).not.toBe(undefined);
        expect(actual.extraInfo).not.toBeUndefined();
        expect(actual.extraInfo).toBeDefined();
        expect(actual.extraInfo).toBeTruthy();
    });
});
