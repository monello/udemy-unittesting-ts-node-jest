import * as OtherUtils from '../../app/doubles/OtherUtils';

// // example of how to mock ALL methods inside a module
// jest.mock('../../app/doubles/OtherUtils');

// example of how to mock onlt specified methods in a module while keepin
// the original implementaion of all the rest of the methods
jest.mock('../../app/doubles/OtherUtils', () => ({
    // 1. keep all methods functionality as it is implemented, using the spread operator
    ...jest.requireActual('../../app/doubles/OtherUtils'),
    // 2. now we can start mocking specific methods and thereby controlling the output of each
    calculateComplexity: () => { return 10; }
}));

// this is how you can mock external libraries
jest.mock('uuid', () => ({
    // here we control the output of the uuid, v4() method. we need to control it as it CANNOT be
    // predicted which makes it untestable otherwise
    v4: () => '123'
}));


describe('module tests', () => {
    test('calculate complexity', () => {
        // ARRANGE
        const sut = OtherUtils;
        const stub = {};

        // ACT
        // Remember, here is is okay to cast out stub to any in order to turn off TS types-checking
        // When we work with stubs we don't want to mock an ENTIRE object, but ONLY add the properties applicable to the sut we are testing.
        // In OtherUtils.test.ts we added only the properties that are used inside the calculateComplexity() function.
        // In this lesson we are mocking the entire module (OtherUtils.ts), meaning none of the functions have implementation bodies
        // This is why our stub is an empty object for this demo test
        const result = sut.calculateComplexity(stub as any);

        // ASSERT
        // we expect the output to be as we mocked it
        expect(result).toBe(10);
    });

    test('keep other functions', () => {
        // ARRANGE
        const sut = OtherUtils;
        const arg = 'abc';
        const expected = 'ABC';

        // ACT
        // we can test the toUpperCase with it's actual implementation, because we didn't mock it
        const result = sut.toUpperCase(arg);

        // ASSERT
        // we expect the output to be exactly as it was implemented
        expect(result).toBe(expected);
    });

    test('string with id', () => {
        // ARRANGE
        const sut = OtherUtils;
        const arg = 'ABC';
        const expected = 'abc123';

        // ACT
        // here we didn't mock the toLowerCaseWithId() method, but we did mock the
        // external library it uses, the v4() method specifically
        const result = OtherUtils.toLowerCaseWithId(arg);

        // ASSERT
        // we expect the uuid part of the output string to be as we mocked it: "123" (see: expected above)
        expect(result).toBe(expected);
    });

});
