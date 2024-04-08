import chalk from "chalk";
import Menu from "./Menu.ts"
import Inventory from "./Inventory.ts";
import Item from "./Item.ts";

export default class Character {
  name: string;
  physicalAttack: number;
  physicalDefense: number;
  speed: number;
  maxHP: number;
  currentHP: number;
  active: boolean = false;

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
    const enemyNames = enemies.map((enemy) => `${enemy.name}` + " " + enemy.showHp() + "\n");
    console.clear();
    const menu = new Menu("Choose a target: ", enemyNames);
    const target = menu.askQuestion();
    const phyDef = enemies[target].physicalDefense;
    const atk = phyAtk - phyDef;
    if (atk <= 0) {
      console.clear();
      console.log(`${this.name} attacked ${enemies[target].name} for 0 damage`);
    } else if (enemies[target].currentHP - atk <= 0) {
      console.clear();
      enemies[target].currentHP = 0;
      console.log(`${this.name} attacked ${enemies[target].name} for ${enemies[target].currentHP} damage and defeated him!`);
      enemies.splice(target, 1);
    } else {
      console.clear();
      enemies[target].currentHP -= atk;
      console.log(`${this.name} attacked ${enemies[target].name} for ${atk} damage`);
    }
  };

  maxChar(a : string) : number {
    // deno-lint-ignore no-control-regex
    const noColor = a.replace(/\x1b\[[0-9;]*m/g, '');
    return noColor.length;
  };

  stats(allies : Character[], monsters : Character[]) {
    let maxLineLen = 0;
    const spacing = 10;
    for (let i = 0; i < allies.length; i++) {
      const lineLength = this.maxChar(allies[i].showHp());
      if (lineLength > maxLineLen) {
        maxLineLen = lineLength;
      }
    }
    console.log(chalk.hex("#1a67ed")("Heroes :") + " ".repeat(maxLineLen- 8 + spacing) + chalk.hex("#db2323")("Monsters :") + "\n");
    for (let i = 0; i < allies.length; i++) {
      let formatLine = allies[i].showHp();
      const lineLength = this.maxChar(formatLine);
      if (lineLength != maxLineLen) {
        const spaces = maxLineLen - lineLength;
        formatLine += " ".repeat(spaces);
      }
      if (monsters[i]) {
        console.log(formatLine + " ".repeat(spacing) + monsters[i].showHp() + "\n");
      } else {
        console.log(formatLine + "\n");
      }
    }
  };

  specialAttack(enemies : Character[] | null, invent : Inventory | null): void {
    console.log("Special Attack");
  };

  heal(prcntHP: number): void {
    const addHP = (this.maxHP / 100) * prcntHP;
    const health = this.currentHP + addHP;
    if (health > this.maxHP) {
      this.currentHP = this.maxHP;
    } else {
      this.currentHP = health;
    }
  };

  res(prcntHP: number, allies: Character[]): void {
    let choices: string[] = [];
    for (let i = 0; i < allies.length; i++) {
      if (allies[i].currentHP <= 0) {
        choices.push(allies[i].name);
      }
    }
    if (choices.length === 0) {
      console.log("No one to revive");
      return;
    }
    const menu = new Menu("Choose a character to revive: ", choices);
    const target = menu.askQuestion();
    allies[target].currentHP = (allies[target].maxHP / 100) * prcntHP;
  };

  actionMenu(): number {
    const choices = ["Attack", "Special Attack", "Use Item"];
    const menu = new Menu("Choose an action: ", choices);
    return menu.askQuestion();
  };

  ItemMenu(invent : Inventory): number {
    const choices : string[] = [];
    for (let i = 0; i < invent.items.length; i++) {
      choices.push(invent.items[i].name + " x " + invent.items[i].quantity);
    }
    const menu = new Menu("Choose an item: ", choices);
    return menu.askQuestion();
  };

  showHp(): string {
    const totalBars = 20;
    const hpPerBar = this.maxHP / totalBars;
    let filledBars = totalBars
    if (this.currentHP <= 0) {
      filledBars = 0;
    } else {
      filledBars = Math.round(this.currentHP / hpPerBar);
    }
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
    let hpBar = `${this.name} : [${filledBarsString}${emptyBarsString}] (${this.currentHP}/${this.maxHP})`;
    if (this.active) {
      hpBar = chalk.hex("#00ffdd")(`${this.name}`) + ` : [${filledBarsString}${emptyBarsString}] (${this.currentHP}/${this.maxHP})`;
    } else {
      hpBar = `${this.name} : [${filledBarsString}${emptyBarsString}] (${this.currentHP}/${this.maxHP})`;
    }
    return `${hpBar}`;
  };

  fullStats(): string {
    return `${this.name} : ${this.physicalAttack} / ${this.physicalDefense} / ${this.speed} / ${this.maxHP} / ${this.currentHP}`;
  };

  useItem(invent : Inventory): void {
    let index = this.ItemMenu(invent);
    if (invent.items[index].quantity === 0) {
        console.log("You don't have any of this item left.");
        this.useItem(invent);
    } else {
        console.log(`You used ${invent.items[index].name}`);
        invent.items[index].quantity -= 1;
        invent.showItems();
    }
  };
};
