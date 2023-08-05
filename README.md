# pwdgen

> Generates a random and secure password; With CLI

[![npm-badge][npm-badge]][npm]
![types-badge][types-badge]

## Usage

    npm i -g pwdgen

## CLI

    pwdgen [options]

    Generates a random and secure password.

    -h|--help                   This help text
    -l|--length <number>        Length of password. Default is 20
    -0|--no-digits              Do not use digits
    -U|--no-upper               Do not use uppercase characters
    -L|--no-lower               Do not use lowercase characters
    -S|--no-symbols             Do not use symbols
    -s|--safe-symbols           Use safe symbols
    -e|--ext                    Use extended symbols and characters
    -r|--remove-chars <string>  Remove chars from allowed chars
    -a|--alphabet <string>      Use alphabet only

## API

```js 
import { generate } from 'pwdgen'

const options = { length: 30 }
generate(options)
```

**options**

```ts
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
```

## License

MIT License

See [LICENSE][] for more info.

[LICENSE]: ./LICENSE
[npm-badge]: https://badgen.net/npm/v/pwdgen
[npm]: https://www.npmjs.com/package/pwdgen
[types-badge]: https://badgen.net/npm/types/pwdgen
