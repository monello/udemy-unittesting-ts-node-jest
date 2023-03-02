import { PasswordChecker } from "../../app/pass_checker/PasswordChecker";

describe('PasswordChecker test suite', () => {

    let sut: PasswordChecker;

    beforeEach(() => {
        sut = new PasswordChecker();
    });

    describe('password length checks', () => {
        it('password with < 8 characters is invalid', () => {
            // ARRANGE
            const password = '123456a';

            // ACT
            const actual = sut.checkPassword(password);

            // ASSERT
            expect(actual).toBeFalsy();
        });

        it('password with >= 8 characters is okay', () => {
            // ARRANGE
            const password = '123456Ab';

            // ACT
            const actual = sut.checkPassword(password);

            // ASSERT
            expect(actual).toBeTruthy();
        });
    });

    describe('uppercase letter checks', () => {
        it('password with no uppercase letters is invalid', () => {
            // ARRANGE
            const password = '1234abcd';

            // ACT
            const actual = sut.checkPassword(password);

            // ASSERT
            expect(actual).toBeFalsy();
        });

        it('password with at least 1 uppercase letter is okay', () => {
            // ARRANGE
            const password = '1234abcX';

            // ACT
            const actual = sut.checkPassword(password);

            // ASSERT
            expect(actual).toBeTruthy();
        });
    });

    describe('lowercase letter checks', () => {
        it('password with no lowercase letters is invalid', () => {
            // ARRANGE
            const password = '1234ABCD';

            // ACT
            const actual = sut.checkPassword(password);

            // ASSERT
            expect(actual).toBeFalsy();
        });

        it('password with at least 1 lowercase letter is okay', () => {
            // ARRANGE
            const password = '1234ABCd';

            // ACT
            const actual = sut.checkPassword(password);

            // ASSERT
            expect(actual).toBeTruthy();
        });
    });
});
