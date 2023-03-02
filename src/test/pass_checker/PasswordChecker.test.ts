import { PasswordChecker, PasswordErrors } from "../../app/pass_checker/PasswordChecker";

describe('PasswordChecker test suite', () => {

    let sut: PasswordChecker;

    beforeEach(() => {
        sut = new PasswordChecker();
    });

    describe('password length checks', () => {
        it('password with < 8 characters is invalid', () => {
            // ARRANGE
            const password = '1234567';

            // ACT
            const actual = sut.checkPassword(password);

            // ASSERT
            expect(actual.valid).toBeFalsy();
            expect(actual.reasons).toContain(PasswordErrors.SHORT);
        });

        it('password with >= 8 characters is okay', () => {
            // ARRANGE
            const password = '12345678';

            // ACT
            const actual = sut.checkPassword(password);

            // ASSERT
            expect(actual.reasons).not.toContain(PasswordErrors.SHORT);
        });
    });

    describe('uppercase letter checks', () => {
        it('password with no uppercase letters is invalid', () => {
            // ARRANGE
            const password = 'abc';

            // ACT
            const actual = sut.checkPassword(password);

            // ASSERT
            expect(actual.valid).toBeFalsy();
            expect(actual.reasons).toContain(PasswordErrors.NO_UPPER_CASE);
        });

        it('password with at least 1 uppercase letter is okay', () => {
            // ARRANGE
            const password = 'abcX';

            // ACT
            const actual = sut.checkPassword(password);

            // ASSERT
            expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE);
        });
    });

    describe('lowercase letter checks', () => {
        it('password with no lowercase letters is invalid', () => {
            // ARRANGE
            const password = 'ABC';

            // ACT
            const actual = sut.checkPassword(password);

            // ASSERT
            expect(actual.valid).toBeFalsy();
            expect(actual.reasons).toContain(PasswordErrors.NO_LOWER_CASE);
        });

        it('password with at least 1 lowercase letter is okay', () => {
            // ARRANGE
            const password = 'ABCd';

            // ACT
            const actual = sut.checkPassword(password);

            // ASSERT
            expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE);
        });
    });
});
