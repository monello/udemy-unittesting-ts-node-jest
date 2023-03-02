
export enum PasswordErrors {
    SHORT = 'Password is too short!',
    NO_UPPER_CASE = 'Upper case letter is required!',
    NO_LOWER_CASE = 'Lower case letter is required!',
    NO_NUMBER = 'At least one number is required!'
}

export interface CheckResult {
    valid: boolean;
    reasons: PasswordErrors[];
}
export class PasswordChecker {
    public checkPassword(password: string): CheckResult {
        const reasons: PasswordErrors[] = [];

        this.checkLength(password, reasons);
        this.checkUpperCase(password, reasons);
        this.checkLowerCase(password, reasons);

        return {
            valid: !reasons.length,
            reasons: reasons
        };
    }

    public checkAdminPassword(password: string): CheckResult {
        // first perform all the basic password checks
        const { reasons } = this.checkPassword(password);

        // now do the admin password checks
        this.checkNumber(password, reasons);

        return {
            valid: !reasons.length,
            reasons: reasons
        };
    }


    private checkNumber(password: string, reasons: PasswordErrors[]) {
        const hasNumber = /\d/;
        if (!hasNumber.test(password)) {
            reasons.push(PasswordErrors.NO_NUMBER);
        }
    }

    private checkLength(password: string, reasons: PasswordErrors[]) {
        if (password.length < 8) {
            reasons.push(PasswordErrors.SHORT);
        }
    }

    private checkUpperCase(password: string, reasons: PasswordErrors[]) {
        // if the incoming password exactly matches a forced lowercase version, it means the incoming had NO UPPER CASE chars
        if (password === password.toLowerCase()) {
            reasons.push(PasswordErrors.NO_UPPER_CASE);
        }
    }

    private checkLowerCase(password: string, reasons: PasswordErrors[]) {
        // if the incoming password exactly matches a forced uppercase version, it means the incoming had NO LOWER CASE chars
        if (password === password.toUpperCase()) {
            reasons.push(PasswordErrors.NO_LOWER_CASE);
        }
    }
}
