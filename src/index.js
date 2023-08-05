import { webcrypto as crypto } from 'node:crypto'

const alDigits = '0123456789'
const alCharsUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const alCharsLower = 'abcdefghijklmnopqrstuvwxyz'
const alSymbolsSafe = '+,-.:;@_~'
const alSymbols = ' !"#$%&\'()*<=>?/[\\]^`{|}'
const alSymbolsExt = '¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¹º»¼½¾¿×÷'
const alCharsExt = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿ'

/**
 * @typedef {object} PwdGenOptions
 * @property {number} [length=20] length of password
 * @property {boolean} [digits=true] use digits
 * @property {boolean} [uppercase=true] use uppercase characters
 * @property {boolean} [lowercase=true] use lowercase cha
 * @property {boolean} [symbolsSafe=true] use safe symbols only
 * @property {boolean} [symbols=true] use symbols
 * @property {boolean} [symbolsExt=false] use extended symbols
 * @property {boolean} [charsExt=false] use extended character set
 * @property {string} [excludeChars] exclude characters
 * @property {string} [alphabet] provide alphabet of allowed chars
 */

/**
 * @param {PwdGenOptions} options
 * @returns {{ password: string, entropy: number, alphabet: string }}
 */
export const generate = (options) => {
  const {
    length = 20,
    digits = true,
    uppercase = true,
    lowercase = true,
    symbolsSafe = true,
    symbols = true,
    symbolsExt = false,
    charsExt = false,
    excludeChars,
    alphabet: _alphabet
  } = options || {}

  let alphabet = _alphabet || (digits ? alDigits : '') +
    (uppercase ? alCharsUpper : '') +
    (lowercase ? alCharsLower : '') +
    (symbolsSafe ? alSymbolsSafe : '') +
    (symbols ? alSymbols : '') +
    (symbolsExt ? alSymbolsExt : '') +
    (charsExt ? alCharsExt : '')

  if (typeof excludeChars === 'string' && excludeChars.length) {
    let newAlphabet = ''
    for (let i = 0; i < alphabet.length; i++) {
      const char = alphabet[i]
      if (excludeChars.includes(char)) continue
      newAlphabet += char
    }
    alphabet = newAlphabet
  }

  if (alphabet.length === 0) {
    alphabet = alDigits + alCharsUpper + alCharsLower + alSymbolsSafe
  }

  let cnt = 0
  const rand = crypto.getRandomValues(new Uint8Array(length))
  const pwdChars = []

  for (let i = 0; i < length; i++) {
    cnt = (cnt + rand[i]) % alphabet.length
    pwdChars.push(alphabet[cnt])
  }

  const password = pwdChars.join('')
  const entropy = Number(Math.pow(alphabet.length, length).toPrecision(2))

  return { password, entropy, alphabet }
}
