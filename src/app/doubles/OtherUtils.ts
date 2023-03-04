export type stringInfo = {
    lowerCase: string;
    upperCase: string;
    characters: string[];
    length: number;
    extraInfo: Object | undefined;
};

type ToUpperCaseCallback = (arg: string) => void;

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
