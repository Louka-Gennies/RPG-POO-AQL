import chalk from "chalk";
import Menu from "./Menu.ts"
import Inventory from "./Inventory.ts";

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
    const enemyNames = enemies.map((enemy) => enemy.showHp() + "\n");
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
      const difAtk = enemies[target].currentHP;
      enemies[target].currentHP = 0;
      console.log(`${this.name} attacked ${enemies[target].name} for ${difAtk} damage and defeated him!`);
      enemies.splice(target, 1);
    } else {
      console.clear();
      enemies[target].currentHP -= atk;
      console.log(`${this.name} attacked ${enemies[target].name} for ${atk} damage`);
    }
  };

  maxChar(a : string) : number {
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

  heal(prcntHP: number): number {
    const addHP = (this.maxHP / 100) * prcntHP;
    const health = this.currentHP + addHP;
    if (health > this.maxHP) {
      this.currentHP = this.maxHP;
      return addHP - (health - this.maxHP);
    } else {
      this.currentHP = health;
      return addHP;
    }
  };

  res(prcntHP: number): number {
    let choices: string[] = [];
    this.currentHP = (this.maxHP / 100) * prcntHP;
    return this.currentHP;
  };

  actionMenu(): number {
    const choices = ["Attack", "Special Attack", "Use Item"];
    const menu = new Menu("Choose an action: ", choices);
    return menu.askQuestion();
  };

  async ItemMenu(invent : Inventory): Promise<number> {
    const choices : string[] = [];
    for (let i = 0; i < invent.items.length; i++) {
      choices.push(invent.items[i].name + " x " + invent.items[i].quantity);
    }
    const menu = new Menu("Choose an item: ", choices);
    const resp = menu.askQuestion();
    if (invent.items[resp].quantity === 0) {
      console.clear();
      console.log("You don't have any of this item left.");
      await new Promise((r) => setTimeout(r, 1000));
      console.clear();
      return this.ItemMenu(invent);
    } else {
      return resp;
    }
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
    return `${chalk.cyan(this.name)} :\n${chalk.yellow("⚔️  Physical Attack")} : ${this.physicalAttack} / ${chalk.blue("🛡️  Physical Defense")} : ${this.physicalDefense} / ${chalk.green("👟 Speed")} : ${this.speed} / ${chalk.red("❤️  Max HP")} : ${this.maxHP}`;
  };
};
