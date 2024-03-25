import chalk from 'chalk';

export default class Character {
    name : string;
    physicalAttack : number;
    physicalDefense : number;
    speed : number;
    maxHP : number;
    currentHP : number;

    constructor (name : string, physicalAttack : number, physicalDefense : number, speed : number, maxHP : number, currentHP : number) {
        this.name = name;
        this.physicalAttack = physicalAttack;
        this.physicalDefense = physicalDefense;
        this.speed = speed;
        this.maxHP = maxHP;
        this.currentHP = currentHP;
    }

    attack(phyAtk : number, phyDef : number, currentHPennemy : number) : number {
        const atk = phyAtk - phyDef
        if (atk < 0) {
            return 0
        } else if (currentHPennemy - atk < 0) {
            return currentHPennemy
        } else {
            return atk
        }
    }

    heal(prcntHP : number, maxHP : number, currentHP : number) : number {
        const addHP = (maxHP / 100) * prcntHP
        const health = currentHP + addHP
        if (health > maxHP) {
            return maxHP
        } else {
            return health
        }
    }

    res(prcntHP : number, maxHP : number) : number {
        return (maxHP / 100) * prcntHP
    }

    stat(character : Character) : string {
        const totalBars = 20;
        const hpPerBar = character.maxHP / totalBars;
        const filledBars = Math.round(character.currentHP / hpPerBar);
        const emptyBars = totalBars - filledBars;
        const filledBarsString = chalk.green('\u2588'.repeat(filledBars));
        const emptyBarsString = '\u2591'.repeat(emptyBars);
        const hpBar = `HP: [${filledBarsString}${emptyBarsString}] (${character.currentHP}/${character.maxHP})`;

        return `${character.name}\n${hpBar}\n`;
    }

}

