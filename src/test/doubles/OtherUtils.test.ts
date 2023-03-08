import { calculateComplexity, OtherStringUtils, toUpperCaseWithCallback } from "../../app/doubles/OtherUtils";

describe('OtherUtils test suite', () => {

    describe('Example using a Stub', () => {
        it('calculateComplexity() - calculates complexity', () => {
            // ARRANGE
            const sut = calculateComplexity;

            // here we create a stub.
            // remember a stub is a "stunt" double of an object, which means we will use it in place of the real object to give us more control over the outcomes in our test
            // a stub is called "stub" because it will contain only a few of the properties that a real version of this object will contain.
            // we do this because we don't want tp create a whol bunch of properties we don't need for this specific test. Some objects can be HUGE and have very complicated properties
            // this is the therefore where is stub comes in handy
            // the following stub will be the test-double (stunt double) for the argument that we need to pass to the "calculateComplexity" function.
            // this function requires 5 properties (see the interface in the OtherUtils.ts).
            // for this test we are only interrested in "length" and "extraInfo", we know this because the calculateComplexitcy function only needs these 2 properties to work
            const stub = {
                length: 5,
                extraInfo: {
                    someProp: true,
                    anotherProp: false
                }
            };
            const expected = 10;

            // ACT
            // here we pass the stub to the sut(), which is an alias of the calculateComplexity() function
            // We are using TypeScript: if we attempt to simply pass the stub to the function TS will complain, it is doing its job and is the reason we use it.
            // Now this is a test and although we are grateful that TS tells us that the structure of the stub does not meet the Type Definistion for the expected argument,
            // we are allowed to override it here... tell TS that's okay, we are just doing a test here. We are aware that our stub does not contain all the properties,
            // that is our intention
            // The way we tell TS all this is to cast the stub to type "any", and now TS is happy. We explicitly told it to not care about the shape of the
            // object in this (and only this) case
            // we could have cast the stub above where we define it, but doing it here at the exact point where TS would complain will ba a lot more obvious later
            // when we return to this test in the future or another develper spots the "evil" any being used.
            // seeing as we are intentionally using a stub... this makes using any here a valid use case for it
            const actual = sut(stub as any);

            //ASERT
            expect(actual).toBe(expected);
        });
    });

    describe('Examples using Fakes', () => {
        it('toUpperCaseWithCallback() - Invalid argument', () => {
            // ARRANGE
            const sut = toUpperCaseWithCallback;

            // ACT
            // we send in a blank string and a Fake callback function as the 2nd param
            const actual = sut('', () => { });

            // ASSERT
            expect(actual).toBeUndefined();
        });

        it('toUpperCaseWithCallback() - Valid argument', () => {
            // ARRANGE
            const sut = toUpperCaseWithCallback;
            const expected = 'ABC';

            // ACT
            // we send in a blank string and a Fake callback function as the 2nd param
            const actual = toUpperCaseWithCallback('abc', () => { });

            // ASSERT
            expect(actual).toBe(expected);
        });
    });

    describe('Examples using Mocks', () => {

        describe('using custom mocks (not Jest Built-in Mocks)', () => {
            // define some tracking variables
            let callbackArguments = [];
            let timesCalled = 0;

            // define a manual mock (as opposed to using the Jest built-in mocks)
            function callbackMock(arg: string) {
                callbackArguments.push(arg);
                timesCalled++;
            }

            // reset the trackng variables between each test to ensure each test is independent
            afterEach(() => {
                callbackArguments = [];
                timesCalled = 0;
            });

            it('tracks callback - with invalid arguments', () => {
                // ARRANGE
                const argument = '';
                const expectedArgument = 'Invalid argument';
                const expectedTimesCalled = 1;

                // ACT
                const actual = toUpperCaseWithCallback(argument, callbackMock);

                // ASSERT
                expect(actual).toBeUndefined();
                // here we can check with what arguments the callback was invoked, inside the toUpperCaseWithCallback() function
                // here is also an example of checking the elements in an array
                expect(callbackArguments).toContain(expectedArgument);
                // here we can check if (how many times) the callback was invoked inside the toUpperCaseWithCallback() function
                expect(timesCalled).toBe(expectedTimesCalled);
            });

            it('tracks callback - with valid arguments', () => {
                // ARRANGE
                const argument = 'abc';
                const expectedResult = 'ABC';
                const expectedArgument = `called with ${argument}`;
                const expectedTimesCalled = 1;

                // ACT
                const actual = toUpperCaseWithCallback(argument, callbackMock);

                // ASSERT
                expect(actual).toBe(expectedResult);
                // here we can check with what arguments the callback was invoked, inside the toUpperCaseWithCallback() function
                // here is also an example of checking the elements in an array
                expect(callbackArguments).toContain(expectedArgument);
                // here we can check if (how many times) the callback was invoked inside the toUpperCaseWithCallback() function
                expect(timesCalled).toBe(expectedTimesCalled);
            });
        });

        describe('using Jest Built-in Mocks', () => {
            const callbackMock = jest.fn();

            // reset the trackng variables between each test to ensure each test is independent
            afterEach(() => {
                jest.clearAllMocks();
            });

            it('tracks callback - with invalid arguments', () => {
                // ARRANGE
                const argument = '';
                const expectedArgument = 'Invalid argument';
                const expectedTimesCalled = 1;

                // ACT
                const actual = toUpperCaseWithCallback(argument, callbackMock);

                // ASSERT
                expect(actual).toBeUndefined();
                expect(callbackMock).toBeCalledWith(expectedArgument);
                expect(callbackMock).toBeCalledTimes(expectedTimesCalled);
            });

            it('tracks callback - with valid arguments', () => {
                // ARRANGE
                const argument = 'abc';
                const expectedResult = 'ABC';
                const expectedArgument = `called with ${argument}`;
                const expectedTimesCalled = 1;

                // ACT
                const actual = toUpperCaseWithCallback(argument, callbackMock);

                // ASSERT
                expect(actual).toBe(expectedResult);
                expect(callbackMock).toBeCalledWith(expectedArgument);
                expect(callbackMock).toBeCalledTimes(expectedTimesCalled);
            });
        });
    });

    describe('OtherStringUtils tests with spies', () => {

        let sut: OtherStringUtils;

        beforeEach(() => {
            sut = new OtherStringUtils();
        });

        test('Use a spy to track calls', () => {
            // ARRANGE
            const argument = 'abc';
            const toUpperCaseSpy = jest.spyOn(sut, 'toUppercase');

            // ACT
            sut.toUppercase(argument);

            // ASSERT
            expect(toUpperCaseSpy).toBeCalledWith(argument);
        });

        test('Usa a spy to track calls to other modules', () => {
            // ARRANGE
            const argument = 'abc';
            const consoleLogSpy = jest.spyOn(console, 'log');

            // ACT
            sut.logString(argument);

            // ASSERT
            expect(consoleLogSpy).toBeCalledWith(argument);
        });

        test('Use a spy with a mocked implementation', () => {
            // ARRANGE
            const mosckedImplementationSpy = jest.spyOn(sut, 'callExternalService').mockImplementation(() => {
                console.log('calling with a mocked implementation!!!');

            });

            // ACT
            sut.callExternalService();

            // ASSERT
            // for the demo purposes we were just interested to see the log output and confirm
            // that the mocked console.log was called and not the one defined in the code
            // so we don't have an assertion. In real life the test would be more realixtic and have an assertion for it
        });
    });
});
