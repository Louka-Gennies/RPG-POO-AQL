import { Mage } from './Class.ts'
import chalk from 'chalk'

const mage = new Mage(10, 10, 10, 10, 10, 10, 10, 10)

const strMage = mage.showHp()

console.log(strMage)

const str = "Mage : [████████████████████] (10/10) / Mana : [██████████] (10/10)"

console.log(str)

console.log(strMage.length)
console.log(str.length)

const spaceOutMage : string[] = []

for (let i = 0; i < strMage.length; i++) {
    spaceOutMage.push(strMage[i])
}

console.log(spaceOutMage)
console.log(spaceOutMage.length)

const spaceOut : string[] = []

for (let i = 0; i < str.length; i++) {
    spaceOut.push(str[i])
}

console.log(spaceOut)
console.log(spaceOut.length)

const color = chalk.hex("#FF3333")("█")
const colorDif = "\x1b[31m█\x1b[0m"
const white = "█"

console.log(color, color.length)
console.log(colorDif, colorDif.length)
console.log(white, white.length)

const maxChar = (a : string) : number => {
    // deno-lint-ignore no-control-regex
    const noColor = a.replace(/\x1b\[[0-9;]*m/g, '');
    return noColor.length;
}

console.log(maxChar(strMage))
console.log(maxChar(str))
