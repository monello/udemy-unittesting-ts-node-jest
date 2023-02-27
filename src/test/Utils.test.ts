import { getStringInfo, stringInfo, StringUtils, toUpperCase } from "../app/Utils";

describe('Utils test suite', () => {

    describe.only('StringUtils class', () => {

        let sut: StringUtils;

        beforeAll(() => {
            console.log(">>>>>>>>>>>> hello from beforeAll <<<<<<<<<<<<");
        });

        afterAll(() => {
            console.log(">>>>>>>>>>>> hello from afterAll <<<<<<<<<<<<");
        });

        // SETUP
        beforeEach(() => {
            sut = new StringUtils;
            console.log("Hello from beforeEach()");
        });

        // TEARDOWN
        afterEach(() => {
            // usually the aferEach would be used to do clean-up. like database clean up etc.
            console.log("Hello from afterEach()");
        });

        it('should return a proper upper cased value', () => {
            // ARRANGE
            const expected = 'ABC';

            // ACT
            const actual = sut.toUpperCase('abc');

            // ASSERT
            expect(actual).toBe(expected);

            console.log("Hello from test ABC");
        });

        it('should also return a proper upper cased value', () => {
            // ARRANGE
            const expected = 'XYZ';

            // ACT
            const actual = sut.toUpperCase('xyz');

            // ASSERT
            expect(actual).toBe(expected);

            console.log("Hello from test XYZ");
        });
    });


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

    describe('getStringInfo for arg My-String should', () => {
        test('return right length', () => {
            const actual = getStringInfo('My-String');
            expect(actual.characters).toHaveLength(9);
        });
        test('return right lower case', () => {
            const actual = getStringInfo('My-String');
            expect(actual.lowerCase).toBe('my-string');
        });
        test('return right upper case', () => {
            const actual = getStringInfo('My-String');
            expect(actual.upperCase).toBe('MY-STRING');
        });
        test('return right characters', () => {
            const actual = getStringInfo('My-String');
            expect(actual.characters).toEqual(['M', 'y', '-', 'S', 't', 'r', 'i', 'n', 'g']);
            expect(actual.characters).toContain<string>('M');
            expect(actual.characters).toEqual(
                expect.arrayContaining(['S', 't', 'r', 'i', 'n', 'g', 'M', 'y', '-'])
            );
        });
        test('return defined extra info', () => {
            const actual = getStringInfo('My-String');
            expect(actual.extraInfo).toBeDefined();
        });

        test('return right extra info', () => {
            const actual = getStringInfo('My-String');
            expect(actual.extraInfo).toEqual({});
        });
    });

    describe('ToUpperCase examples', () => {
        it.each([
            { input: 'abc', expected: 'ABC' },
            { input: 'My-String', expected: 'MY-STRING' },
            { input: 'def', expected: 'DEF' }
        ])('$input toUpperCase should be $expected', ({ input, expected }) => {
            const actual = toUpperCase(input);
            expect(actual).toBe(expected);
        });
    });

});
