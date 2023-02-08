import { Utils } from "../app/Utils";

describe('Utils test suite', () => {
    it('first test', () => {
        const result = Utils.toUpperCase('abc');
        expect(result).toBe('ABC');
    });

    it('parses simple URL', () => {
        const parsedUrl = Utils.parseUrl('http://localhost:8080/login');
        expect(parsedUrl.href).toBe('http://localhost:8080/login');
        expect(parsedUrl.port).toBe('8080');
        expect(parsedUrl.protocol).toBe('http:');
        expect(parsedUrl.query).toEqual({});
    });

    it('parses URL with query', () => {
        const parsedUrl = Utils.parseUrl('http://localhost:8080/login?username=user&password=secret');
        expect(parsedUrl.query).toEqual({
            username: 'user',
            password: 'secret'
        });
    });

    it('invalid URL', () => {
        // to test if an error was thrown, you have to wrap the call in a function to "catch" the error
        // see: https://jestjs.io/docs/expect#tothrowerror
        function expectError() {
            Utils.parseUrl('');
        }
        expect(expectError).toThrow(); // toThrowError() and toThrow() are aliases

        // or simplified
        expect(() => Utils.parseUrl('')).toThrow();
    });

    it('invalid URL with specific message', () => {
        expect(() => Utils.parseUrl('')).toThrow(/url cannot be blank or an empty string/i);
    });

    // fom this article: https://techblog.topdesk.com/coding/frontend-testing-with-jest-assertions-deep-dive/#:~:text=toBe%20compares%20the%20referential%20identity,object%20is%20the%20same%20instance.
    test('To be, to equal and to strict equal', () => {
        // toBe test referential identity - it must point to the exact same reference
        const obj = { a: 2 };
        expect(obj).toBe(obj);  // Given is the exact same
        expect(obj).not.toBe({ a: 2 }); // Two new objects, therefore NOT the same reference
        // toEqual does a deep comparison: checks that two objects have the same properties and values, but doe not need to be the same reference
        expect(obj).toEqual({ a: 2 });
        expect(obj).not.toEqual({ b: 3 });
        expect(obj).toStrictEqual({ a: 2 });
        // there following assertion passes because even though the "given" object has a property "b" it is set to undefined so doesn't "exist"
        expect(obj).toEqual({ a: 2, b: undefined });
        // the following assertion had to be negated to pass, because toStrictEqual also checks for Types (shape)
        expect(obj)
            .not.toStrictEqual({ a: 2, b: undefined });

        const arr = [1, 'a', 1.2];
        expect(arr).toBe(arr);
        expect(arr).not.toBe([1, 'a', 1.2]);
        expect(arr).toEqual([1, 'a', 1.2]);
        expect(arr).toStrictEqual([1, 'a', 1.2]);
        expect(arr).toEqual([1, 'a', 1.2, undefined]);
        expect(arr).not.toEqual([1, undefined, 'a', 1.2]);
        expect(arr).not.toStrictEqual([1, undefined, 'a', 1.2]);
    });

    // fom this article: https://techblog.topdesk.com/coding/frontend-testing-with-jest-assertions-deep-dive/#:~:text=toBe%20compares%20the%20referential%20identity,object%20is%20the%20same%20instance.
    function divideBy10(a) {
        if (typeof a !== 'number') {
            throw new Error('NaN: ' + a);
        }
        return a / 10;
    }

    test('Errors', () => {
        expect(() => divideBy10('a')).toThrowError();
        expect(() => divideBy10(100)).not.toThrowError();
        // The next 2 assertions will cause an error to be thrown on line 68 above
        expect(() => divideBy10('a')).toThrowError(/NaN/);
        expect(() => divideBy10('a')).toThrowError('NaN');
        // The next assertion will cause an error to be thrown on line 66 above
        expect(() => divideBy10('a'))
            .toThrowError(new Error('NaN: a'));
    });
});
