import { v4 } from "uuid";

export type stringInfo = {
    lowerCase: string;
    upperCase: string;
    characters: string[];
    length: number;
    extraInfo: Object | undefined;
};

type ToUpperCaseCallback = (arg: string) => void;

export function toUpperCase(arg: string) {
    return arg.toUpperCase();
}

export function toLowerCaseWithId(arg: string) {
    return arg.toLowerCase() + v4();
}

export function calculateComplexity(stringInfo: stringInfo) {
    return Object.keys(stringInfo).length * stringInfo.length;
}

export function toUpperCaseWithCallback(arg: string, callback: ToUpperCaseCallback) {
    if (!arg) {
        callback('Invalid argument');
        return;
    }
    callback(`called with ${arg}`);
    return arg.toUpperCase();
}

export class OtherStringUtils {

    private cannotSpyOnMe() {
        console.log('you cannot spy on private methods - whithout hacks :)');
    }

    public callExternalService() {
        console.log("Some fancy functionality that interacts with an external service");
    }

    public toUppercase(arg: string) {
        return arg.toUpperCase();
    }

    public logString(arg: string) {
        console.log(arg);

    }

}
