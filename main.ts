import Character from "./Character.ts";
import {
  Barbarian,
  Mage,
  Monster,
  Paladin,
  Priest,
  Thief,
  Warrior,
} from "./Class.ts";
import Fight from "./Fight.ts";
import Menu from "./Menu.ts";
import chalk from "chalk";

class gameManager {
  constructor() {
    console.log("Game Manager Created");
  }

  stats(allies : Character[], monsters : Character[]) {
    let maxLineLen = 0;
    for (let i = 0; i < allies.length; i++) {
      if (allies[i].showHp().length > maxLineLen) {
        maxLineLen = allies[i].showHp().length;
      }
    }
    console.log(chalk.hex("#1a67ed")("Heroes :") + " ".repeat(maxLineLen - 20) + chalk.hex("#db2323")("Monsters :"));
    for (let i = 0; i < allies.length; i++) {
      let formatLine = allies[i].showHp();
      if (allies[i].showHp().length != maxLineLen) {
        const spaces = maxLineLen - allies[i].showHp().length;
        formatLine += " ".repeat(spaces);
      }
      console.log(formatLine + " ".repeat(10) + monsters[i].showHp());
    }
  }

  async startGame() {
    console.clear();
    console.log("Game Started");
    await new Promise((r) => setTimeout(r, 1000));
    console.clear();
    const warrior = new Warrior(10, 5, 5, 100, 100); // high attack and defense, no special attack, average speed
    const mage = new Mage(5, 2, 10, 50, 50, 40, 20, 20); // low physical attack and defense, has mana and magic attack
    const paladin = new Paladin(7, 3, 7, 70, 70); // lower attack than warrior, slightly higher defense, has holy attack
    const barbarian = new Barbarian(10, 5, 5, 100, 100); // low defense, higher attack than warrior, has berserk attack
    const thief = new Thief(5, 2, 10, 50, 50); // average defense and physical attack, high speed, has steal action
    const priest = new Priest(7, 3, 7, 70, 70); // low defense, slightly higher attack than mage, has heal action

    const alliesChoice = ["Warrior", "Mage", "Paladin", "Barbarian", "Thief", "Priest"];
    const allies: Character[] = [];
    
    const monster1 = new Monster(10, 5, 5, 100, 100);
    const monster2 = new Monster(5, 2, 10, 50, 50);
    const monster3 = new Monster(7, 3, 7, 70, 70);

    const monsters = [monster1, monster2, monster3];

    while (allies.length < 3) {
      console.log("Your Team:\n");
      for (let i = 0; i < allies.length; i++) {
        console.log(`${i + 1}. ` + allies[i].showHp() + `\n`);
      }
      const charChoice = new Menu("Choose your character: ", alliesChoice);
      const response = charChoice.askQuestion();
      switch (response) {
        case 0:
          if (allies.includes(warrior)) {
            console.clear();
            console.log("You already chose this character");
            await new Promise((r) => setTimeout(r, 1000));
            break;
          }
          allies.push(warrior);
          alliesChoice[response] = `\x1b[90m${alliesChoice[response]}\x1b[0m`;
          console.clear();
          console.log("You chose Warrior")
          await new Promise((r) => setTimeout(r, 1000));
          break;
        case 1:
          if (allies.includes(mage)) {
            console.clear();
            console.log("You already chose this character");
            await new Promise((r) => setTimeout(r, 1000));
            break;
          }
          allies.push(mage);
          alliesChoice[response] = `\x1b[90m${alliesChoice[response]}\x1b[0m`;
          console.clear();
          console.log("You chose Mage")
          await new Promise((r) => setTimeout(r, 1000));
          break;
        case 2:
          if (allies.includes(paladin)) {
            console.clear();
            console.log("You already chose this character");
            await new Promise((r) => setTimeout(r, 1000));
            break;
          }
          allies.push(paladin);
          alliesChoice[response] = `\x1b[90m${alliesChoice[response]}\x1b[0m`;
          console.clear();
          console.log("You chose Paladin")
          await new Promise((r) => setTimeout(r, 1000));
          break;
        case 3:
          if (allies.includes(barbarian)) {
            console.clear();
            console.log("You already chose this character");
            await new Promise((r) => setTimeout(r, 1000));
            break;
          }
          allies.push(barbarian);
          alliesChoice[response] = `\x1b[90m${alliesChoice[response]}\x1b[0m`;
          console.clear();
          console.log("You chose Barbarian")
          await new Promise((r) => setTimeout(r, 1000));
          break;
        case 4:
          if (allies.includes(thief)) {
            console.clear();
            console.log("You already chose this character");
            await new Promise((r) => setTimeout(r, 1000));
            break;
          }
          allies.push(thief);
          alliesChoice[response] = `\x1b[90m${alliesChoice[response]}\x1b[0m`;
          console.clear();
          console.log("You chose Thief")
          await new Promise((r) => setTimeout(r, 1000));
          break;
        case 5:
          if (allies.includes(priest)) {
            console.clear();
            console.log("You already chose this character");
            await new Promise((r) => setTimeout(r, 1000));
            break;
          }
          allies.push(priest);
          alliesChoice[response] = `\x1b[90m${alliesChoice[response]}\x1b[0m`;
          console.clear();
          console.log("You chose Priest")
          await new Promise((r) => setTimeout(r, 1000));
          break;
      }
      console.clear();
    }
    console.log("Your Team:\n");
    for (let i = 0; i < allies.length; i++) {
      console.log(`${i + 1}. ` + allies[i].showHp() + `\n`);
    }
    await new Promise((r) => setTimeout(r, 1000));
    console.clear();
    console.log("Start of the fight !!!");
    await new Promise((r) => setTimeout(r, 1000));
    console.clear();
    this.stats(allies, monsters);
  }
}

const game = new gameManager();
game.startGame();
