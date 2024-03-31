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

  attack(enemies : Character[]): void {
    const phyAtk = this.physicalAttack;
    const enemyNames = enemies.map((enemy) => `${enemy.name}`);
    const menu = new Menu("Choose a target: ", enemyNames);
    const target = menu.askQuestion();
    const phyDef = enemies[target].physicalDefense;
    const atk = phyAtk - phyDef;
    if (atk < 0) {
      console.log(`${this.name} attacked ${enemies[target].name} for 0 damage`);
    } else if (enemies[target].currentHP - atk < 0) {
      enemies[target].currentHP = 0;
      console.log(`${this.name} attacked ${enemies[target].name} for ${enemies[target].currentHP} damage and defeated him!`);
    } else {
      enemies[target].currentHP -= atk;
      console.log(`${this.name} attacked ${enemies[target].name} for ${atk} damage`);
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

  actionMenu(): number {
    const choices = ["Attack", "Special Attack", "Use Item"];
    const menu = new Menu("Choose an action: ", choices);
    return menu.askQuestion();
  }

  ItemMenu(): number {
    const choices = ["Potion", "Half Star", "Ether", "Star Fragment"];
    const menu = new Menu("Choose an item: ", choices);
    return menu.askQuestion();
  }

  showHp(): string {
    const totalBars = 20;
    const hpPerBar = this.maxHP / totalBars;
    const filledBars = Math.round(this.currentHP / hpPerBar);
    const emptyBars = totalBars - filledBars;
    let filledBarsString = "";
    if (filledBars <= 5) {
      filledBarsString = chalk.hex("#FF3333")("█".repeat(filledBars));
    } else if (filledBars <= 10) {
      filledBarsString = chalk.hex("#FF9933")("█".repeat(filledBars));
    } else if (filledBars <= 15) {
      filledBarsString = chalk.hex("#FFFF33")("█".repeat(filledBars));
    } else {
      filledBarsString = chalk.hex("#33FF33")("█".repeat(filledBars));
    }
    const emptyBarsString = chalk.gray("█".repeat(emptyBars));
    const hpBar = `${this.name} : [${filledBarsString}${emptyBarsString}] (${this.currentHP}/${this.maxHP})`;
    return `${hpBar}`;
  }

  fullStats(): string {
    return `${this.name} : ${this.physicalAttack} / ${this.physicalDefense} / ${this.speed} / ${this.maxHP} / ${this.currentHP}`;
  }

}
