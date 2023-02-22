import { parse, UrlWithParsedQuery } from "url";

export class Utils {
    public static parseUrl(url: string): UrlWithParsedQuery {
        if (!url) {
            throw new Error('url cannot be blank or an empty string');
        }
        return parse(url, true);
    }

    public static toUpperCase(arg: string): string {
        return arg.toLocaleUpperCase();
    }

    /* istanbul ignore next */
    public static someComplicatedUntestablePointlessToTestFunction() {
        return "foobar";
    }
}

