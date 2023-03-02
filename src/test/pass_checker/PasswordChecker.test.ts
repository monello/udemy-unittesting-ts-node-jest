import { PasswordChecker } from "../../app/pass_checker/PasswordChecker";

describe('PasswordChecker test suite', () => {

    let sut: PasswordChecker;

    beforeEach(() => {
        sut = new PasswordChecker();
    });

    it('just tesing the setup', () => {
        sut.checkPassword();
    });
});
