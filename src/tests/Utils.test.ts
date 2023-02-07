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
});
