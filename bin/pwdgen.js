#!/usr/bin/env node

import { generate } from '../src/index.js'

function argv (args) {
  const argv = args || process.argv.slice(2)
  const cmd = {
    length: 20,
    digits: true,
    uppercase: true,
    lowercase: true,
    symbolsSafe: true,
    symbols: true
  }

  while (argv.length) {
    let arg = argv.shift()

    if (/^-[a-zA-Z0-9]{2,}/.test(arg)) {
      const [, ...parts] = arg.split('')
      for (let i = parts.length - 1; i >= 0; i--) {
        argv.unshift(`-${parts[i]}`)
      }
      arg = argv.shift()
    }

    switch (arg) {
      case '-h':
      case '--help':
        cmd.help = help
        break
      case '-v':
      case '--version':
        cmd.version = true
        break
      case '-m':
      case '--multi':
        cmd.multi = true
        break
      case '-l':
      case '--length': {
        const length = Number(argv.shift())
        if (isNaN(length) || Math.floor(length) !== length) {
          throw TypeError('length must be an integer')
        }
        cmd.length = length
        break
      }
      case '-0':
      case '--no-digits':
        cmd.digits = false
        break
      case '-U':
      case '--no-upper':
        cmd.uppercase = false
        break
      case '-L':
      case '--no-lower':
        cmd.lowercase = false
        break
      case '-s':
      case '--safe-symbols':
        cmd.symbolsSafe = true
        cmd.symbols = false
        cmd.symbolsExt = false
        break
      case '-S':
      case '--no-symbols':
        cmd.symbolsSafe = false
        cmd.symbols = false
        cmd.symbolsExt = false
        break
      case '-e':
      case '--ext':
        if (cmd.symbols) { // must not have safe-symbols enabled
          cmd.symbolsExt = true
        }
        cmd.charsExt = true
        break
      case '-r':
      case '--remove-chars':
        cmd.excludeChars = argv.shift() || ''
        break
      case '-a':
      case '--alphabet':
        cmd.alphabet = argv.shift() || ''
        break
      default:
        break
    }
  }
  return cmd
}

const help = `
    pwdgen [options]

    Generates a random and secure password.

    -h|--help                   This help text
    -m|--multi                  Generate 20 passwords
    -l|--length <number>        Length of password. Default is 20
    -0|--no-digits              Do not use digits
    -U|--no-upper               Do not use uppercase characters
    -L|--no-lower               Do not use lowercase characters
    -S|--no-symbols             Do not use symbols
    -s|--safe-symbols           Use safe symbols
    -e|--ext                    Use extended symbols and characters
    -r|--remove-chars <string>  Remove chars from allowed chars
    -a|--alphabet <string>      Use alphabet only

`

/* eslint-disable no-console */

;(function main () {
  try {
    const options = argv()
    if (options.help) {
      console.log(help)
      process.exit(0)
    }
    if (options.multi) {
      for (let i = 0; i < 19; i++) {
        const { password } = generate(options)
        console.log(password)
      }
    }
    const { password } = generate(options)
    console.log(password)
  } catch (e) {
    console.error(e.message)
    process.exit(1)
  }
})()
