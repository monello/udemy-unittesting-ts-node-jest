
export enum PasswordErrors {
    SHORT = 'Password is too short!',
    NO_UPPER_CASE = 'Upper case letter is required!',
    NO_LOWER_CASE = 'Lower case letter is required!'
}

export interface CheckResult {
    valid: boolean;
    reasons: PasswordErrors[];
}
export class PasswordChecker {
    public checkPassword(password: string): CheckResult {
        const reasons: PasswordErrors[] = [];
        if (password.length < 8) {
            reasons.push(PasswordErrors.SHORT);
        }
        // if the incoming password exactly matches a forced lowercase version, it means the incoming had NO UPPER CASE chars
        if (password === password.toLowerCase()) {
            reasons.push(PasswordErrors.NO_UPPER_CASE);
        }
        // if the incoming password exactly matches a forced uppercase version, it means the incoming had NO LOWER CASE chars
        if (password === password.toUpperCase()) {
            reasons.push(PasswordErrors.NO_LOWER_CASE);
        }
        return {
            valid: !reasons.length,
            reasons: reasons
        };
    }
}
