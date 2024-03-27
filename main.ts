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

class gameManager {
  constructor() {
    console.log("Game Manager Created");
  }

  async startGame() {
    console.clear();
    console.log("Game Started");
    await new Promise((r) => setTimeout(r, 1000));
    console.clear();
    const warrior = new Warrior(10, 5, 5, 100, 100);
    const mage = new Mage(5, 2, 10, 50, 50, 10, 60, 60);
    const paladin = new Paladin(7, 3, 7, 70, 70);
    const barbarian = new Barbarian(10, 5, 5, 100, 100);
    const thief = new Thief(5, 2, 10, 50, 50);
    const priest = new Priest(7, 3, 7, 70, 70);

    const alliesChoice = ["Warrior", "Mage", "Paladin", "Barbarian", "Thief", "Priest"];
    const allies = [];
    
    const monster1 = new Monster(10, 5, 5, 100, 100);
    const monster2 = new Monster(5, 2, 10, 50, 50);
    const monster3 = new Monster(7, 3, 7, 70, 70);

    const monsters = [monster1, monster2, monster3];

    while (allies.length < 3) {
      console.log("Your Team:\n");
      for (let i = 0; i < allies.length; i++) {
        console.log(`${i + 1}. ` + allies[i].stat(allies[i]));
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
          console.clear();
          console.log("You chose Priest")
          await new Promise((r) => setTimeout(r, 1000));
          break;
      }
      console.clear();
    }
  }
}

const game = new gameManager();
game.startGame();
