import chalk from "chalk";
import Menu from "./Menu.ts"

export default class Character {
  name: string;
  physicalAttack: number;
  physicalDefense: number;
  speed: number;
  maxHP: number;
  currentHP: number;

  constructor(
    name: string,
    physicalAttack: number,
    physicalDefense: number,
    speed: number,
    maxHP: number,
    currentHP: number,
  ) {
    this.name = name;
    this.physicalAttack = physicalAttack;
    this.physicalDefense = physicalDefense;
    this.speed = speed;
    this.maxHP = maxHP;
    this.currentHP = currentHP;
  }

  attack(enemies : Character[]): number {
    const phyAtk = this.physicalAttack;
    const enemyNames = enemies.map((enemy) => `${enemy.name}`);
    const menu = new Menu("Choose a target: ", enemyNames);
    const target = menu.askQuestion();
    const phyDef = enemies[target].physicalDefense;
    const atk = phyAtk - phyDef;
    if (atk < 0) {
      return 0;
    } else if (enemies[target].currentHP - atk < 0) {
      enemies[target].currentHP = 0;
      return enemies[target].currentHP;
    } else {
      enemies[target].currentHP -= atk;
      return atk;
    }
  }

  heal(prcntHP: number, maxHP: number, currentHP: number): number {
    const addHP = (maxHP / 100) * prcntHP;
    const health = currentHP + addHP;
    if (health > maxHP) {
      return maxHP;
    } else {
      return health;
    }
  }

  res(prcntHP: number, maxHP: number): number {
    return (maxHP / 100) * prcntHP;
  }

  stat(character: Character): string {
    const totalBars = 20;
    const hpPerBar = character.maxHP / totalBars;
    const filledBars = Math.round(character.currentHP / hpPerBar);
    const emptyBars = totalBars - filledBars;
    let filledBarsString = "";
    if (filledBars <= 5) {
      filledBarsString = chalk.hex("#FF3333")("\u2588".repeat(filledBars));
    } else if (filledBars <= 10) {
      filledBarsString = chalk.hex("#FF9933")("\u2588".repeat(filledBars));
    } else if (filledBars <= 15) {
      filledBarsString = chalk.hex("#FFFF33")("\u2588".repeat(filledBars));
    } else {
      filledBarsString = chalk.hex("#33FF33")("\u2588".repeat(filledBars));
    }
    const emptyBarsString = chalk.gray("\u2588".repeat(emptyBars));
    const hpBar = `${this.name} HP: [${filledBarsString}${emptyBarsString}] (${character.currentHP}/${character.maxHP})`;
    return `${hpBar}\n`;
  }
}

const warrior = new Character("hero", 10, 1, 10, 100, 100);
const warrior2 = new Character("hero2", 10, 1, 10, 100, 100);
console.log(warrior.stat(warrior));
console.log(warrior2.stat(warrior2));
const monster1 = new Character("skeleton", 10, 1, 10, 100, 100);
const monster2 = new Character("zombie", 10, 1, 10, 100, 100);
const monster3 = new Character("slime", 10, 1, 10, 100, 100);
const monsterGroup = [monster1, monster2, monster3];
const heroes = [warrior, warrior2];
console.log(monster1.stat(monster1));
console.log(monster2.stat(monster2));
console.log(monster3.stat(monster3));
warrior.attack(monsterGroup);
console.log(monster1.stat(monster1));
console.log(monster2.stat(monster2));
console.log(monster3.stat(monster3));
warrior.attack(monsterGroup);
console.log(monster1.stat(monster1));
console.log(monster2.stat(monster2));
console.log(monster3.stat(monster3));
warrior.attack(monsterGroup);
console.log(monster1.stat(monster1));
console.log(monster2.stat(monster2));
console.log(monster3.stat(monster3));

monster1.attack(heroes);
console.log(warrior.stat(warrior));
console.log(warrior2.stat(warrior2));
monster1.attack(heroes);
console.log(warrior.stat(warrior));
console.log(warrior2.stat(warrior2));
monster1.attack(heroes);
console.log(warrior.stat(warrior));
console.log(warrior2.stat(warrior2));
monster1.attack(heroes);
console.log(warrior.stat(warrior));
console.log(warrior2.stat(warrior2));



