export function generate(options: PwdGenOptions): {
    password: string;
    entropy: number;
    alphabet: string;
};
export type PwdGenOptions = {
    /**
     * length of password
     */
    length?: number | undefined;
    /**
     * use digits
     */
    digits?: boolean | undefined;
    /**
     * use uppercase characters
     */
    uppercase?: boolean | undefined;
    /**
     * use lowercase cha
     */
    lowercase?: boolean | undefined;
    /**
     * use safe symbols only
     */
    symbolsSafe?: boolean | undefined;
    /**
     * use symbols
     */
    symbols?: boolean | undefined;
    /**
     * use extended symbols
     */
    symbolsExt?: boolean | undefined;
    /**
     * use extended character set
     */
    charsExt?: boolean | undefined;
    /**
     * exclude characters
     */
    excludeChars?: string | undefined;
    /**
     * provide alphabet of allowed chars
     */
    alphabet?: string | undefined;
};
