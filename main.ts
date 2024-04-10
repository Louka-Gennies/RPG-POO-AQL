import Character from "./Character.ts";
import Room from "./Room.ts";
import {Barbarian,Mage,Monster,Paladin,Priest,Thief,Warrior,} from "./class/Class.ts";;
import Menu from "./Menu.ts";
import Item from "./Item.ts";
import Inventory from "./Inventory.ts";

class gameManager {
  constructor() {
    console.log("Game Manager Created");
  }

  async CharacterMenu(): Promise<Character[]> {
    const warrior = new Warrior(10, 5, 5, 100, 100); // high attack and defense, no special attack, average speed
    const mage = new Mage(5, 2, 10, 50, 50, 40, 20, 20); // low physical attack and defense, has mana and magic attack
    const paladin = new Paladin(7, 3, 7, 70, 70); // lower attack than warrior, slightly higher defense, has holy attack
    const barbarian = new Barbarian(10, 5, 5, 100, 100); // low defense, higher attack than warrior, has berserk attack
    const thief = new Thief(5, 2, 10, 50, 50); // average defense and physical attack, high speed, has steal action
    const priest = new Priest(7, 3, 7, 70, 70); // low defense, slightly higher attack than mage, has heal action

    const heroes = [warrior, mage, paladin, barbarian, thief, priest];

    const choices = ["Warrior", "Mage", "Paladin", "Barbarian", "Thief", "Priest", "Info", "Quit"];
    const allies: Character[] = [];

    while (allies.length < 3) {
      const charChoice = new Menu("Choose your character: ", choices);
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
          choices[response] = `\x1b[90m${choices[response]}\x1b[0m`;
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
          choices[response] = `\x1b[90m${choices[response]}\x1b[0m`;
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
          choices[response] = `\x1b[90m${choices[response]}\x1b[0m`;
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
          choices[response] = `\x1b[90m${choices[response]}\x1b[0m`;
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
          choices[response] = `\x1b[90m${choices[response]}\x1b[0m`;
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
          choices[response] = `\x1b[90m${choices[response]}\x1b[0m`;
          console.clear();
          console.log("You chose Priest")
          await new Promise((r) => setTimeout(r, 1000));
          break;
          case 6:
            console.clear();
            for (let i = 0; i < heroes.length; i++) {
              console.log(`${i + 1}. ${heroes[i].fullStats()}\n`);
            }

            const answer = await prompt('Press enter to quit : ');
            if (answer === '') {
              console.clear();
              break;
            }
          case 7:
            console.clear();
            console.log("You chose to quit");
            await new Promise((r) => setTimeout(r, 1000));
            Deno.exit();
      }
      console.clear();
    }
    return allies;
  }

  async startGame() {
    console.clear();
    console.log("Game Started");
    await new Promise((r) => setTimeout(r, 1000));
    console.clear();
    
    const monster1 = new Monster(10, 0, 5, 100, 20);
    const monster2 = new Monster(5, 0, 10, 50, 20);
    const monster3 = new Monster(7, 0, 7, 70, 20);
    const boss1 = new Monster(15, 0, 10, 150, 50);

    const monsters = [monster1, monster2, monster3];
    const boss = [boss1];

    const potion = new Item("Potion", 2);
    const starFragment = new Item("Star Fragment", 1);
    const halfStar = new Item("Half Star", 0);
    const ether = new Item("Ether", 1);

    const inventory = new Inventory();
    inventory.addItem(potion);
    inventory.addItem(starFragment);
    inventory.addItem(halfStar);
    inventory.addItem(ether);

    const allies = await this.CharacterMenu();
    console.clear();
    
    console.log("Your Team:\n");
    for (let i = 0; i < allies.length; i++) {
      console.log(`${i + 1}. ` + allies[i].showHp() + `\n`);
    }
    
    const answer = await prompt('Press enter to continue : ');
    if (answer === '') {
      console.clear();
    }

    console.log("Start of the fight !!!");
    await new Promise((r) => setTimeout(r, 1000));
    console.clear();
    const room1 = new Room(allies, monsters, "fight");
    const room2 = new Room(allies, monsters, "chest");
    const room3 = new Room(allies, monsters, "fight");
    const room4 = new Room(allies, monsters, "chest");
    const room5 = new Room(allies, boss, "fight");
    const quit = await room1.enterRoom(inventory);
    if (!quit) {
      await room2.enterRoom(inventory);
    }
    if (!quit) {
      await room3.enterRoom(inventory);
    }
    if (!quit) {
      await room4.enterRoom(inventory);
    }
    if (!quit) {
      await room5.enterRoom(inventory);
    }
    if (!quit) {
      console.clear();
      console.log("All rooms cleared, you win!");
      await new Promise((r) => setTimeout(r, 1000));
      console.clear();
    } else {
      await new Promise((r) => setTimeout(r, 1000));
      console.clear();
      console.log("Game Over");
    }

  }
}

const game = new gameManager();
game.startGame();
