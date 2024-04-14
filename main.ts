import Character from "./Character.ts";
import Room from "./Room.ts";
import {
  Barbarian,
  Mage,
  Monster,
  Paladin,
  Priest,
  Thief,
  Warrior,
} from "./class/Class.ts";
import Menu from "./Menu.ts";
import Item from "./Item.ts";
import Inventory from "./Inventory.ts";
import { exit } from "deno";

class gameManager {
  constructor() {
    console.log("Game Manager Created");
  }

  private async CharacterMenu(): Promise<Character[]> {
    const warrior = new Warrior(20, 5, 5, 100, 100); // high attack and defense, no special attack, average speed
    const mage = new Mage(10, 2, 10, 50, 50, 40, 20, 20); // low physical attack and defense, has mana and magic attack
    const paladin = new Paladin(14, 3, 7, 70, 70); // lower attack than warrior, slightly higher defense, has holy attack
    const barbarian = new Barbarian(20, 5, 5, 100, 100); // low defense, higher attack than warrior, has berserk attack
    const thief = new Thief(10, 2, 10, 50, 50); // average defense and physical attack, high speed, has steal action
    const priest = new Priest(14, 3, 7, 70, 70); // low defense, slightly higher attack than mage, has heal action

    const heroes = [warrior, mage, paladin, barbarian, thief, priest];

    const choices = [
      "Warrior",
      "Mage",
      "Paladin",
      "Barbarian",
      "Thief",
      "Priest",
      "Info",
      "Quit",
    ];
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
          console.log("You chose Warrior");
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
          console.log("You chose Mage");
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
          console.log("You chose Paladin");
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
          console.log("You chose Barbarian");
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
          console.log("You chose Thief");
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
          console.log("You chose Priest");
          await new Promise((r) => setTimeout(r, 1000));
          break;
        case 6:
          console.clear();
          for (let i = 0; i < heroes.length; i++) {
            console.log(`${i + 1}. ${heroes[i].fullStats()}\n`);
          }

          const answer = await prompt("Press enter to quit : ");
          if (answer === "") {
            console.clear();
            break;
          }
        case 7:
          console.clear();
          console.log("You chose to quit");
          await new Promise((r) => setTimeout(r, 1000));
          process.exit();
      }
      console.clear();
    }
    return allies;
  }

  private generateMonster() {
    const minHealth = 25;
    const maxHealth = 50;
    const minAttack = 5;
    const maxAttack = 10;
    const minDefense = 0;
    const maxDefense = 5;
    const minSpeed = 5;
    const maxSpeed = 10;

    const health = Math.floor(Math.random() * (maxHealth - minHealth + 1)) +
      minHealth;
    const attack = Math.floor(Math.random() * (maxAttack - minAttack + 1)) +
      minAttack;
    const defense = Math.floor(Math.random() * (maxDefense - minDefense + 1)) +
      minDefense;
    const speed = Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) +
      minSpeed;

    return new Monster(attack, defense, speed, health, health);
  }

  private generateBoss() {
    const minHealth = 75;
    const maxHealth = 100;
    const minAttack = 10;
    const maxAttack = 20;
    const minDefense = 4;
    const maxDefense = 5;
    const minSpeed = 10;
    const maxSpeed = 15;

    const health = Math.floor(Math.random() * (maxHealth - minHealth + 1)) +
      minHealth;
    const attack = Math.floor(Math.random() * (maxAttack - minAttack + 1)) +
      minAttack;
    const defense = Math.floor(Math.random() * (maxDefense - minDefense + 1)) +
      minDefense;
    const speed = Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) +
      minSpeed;

    return new Monster(attack, defense, speed, health, health);
  }

  public async startGame() {
    console.clear();
    console.log("Game Started");
    await new Promise((r) => setTimeout(r, 1000));
    console.clear();

    const boss1 = new Monster(15, 0, 10, 150, 50);

    const MonsterRoom1 = Array.from({ length: 3 }, this.generateMonster);
    const MonsterRoom2 = Array.from({ length: 3 }, this.generateMonster);
    const MonsterRoom3 = Array.from({ length: 3 }, this.generateMonster);
    const MonsterRoom4 = Array.from({ length: 3 }, this.generateMonster);

    const bossRoomMonster = [this.generateBoss()];

    const potion = new Item("Potion", 2, 0);
    const starFragment = new Item("Star Fragment", 1, 1);
    const halfStar = new Item("Half Star", 0, 2);
    const ether = new Item("Ether", 1, 3);
    const itemList = [potion, starFragment, halfStar, ether];

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

    const answer = await prompt("Press enter to continue : ");
    if (answer === "") {
      console.clear();
    }

    console.log("You enter the First Room !!!");
    await new Promise((r) => setTimeout(r, 1000));
    console.clear();

    console.log("Start of the fight !!!");
    await new Promise((r) => setTimeout(r, 1000));
    console.clear();
    const room1 = new Room(allies, MonsterRoom1, "", itemList, inventory);
    const room2 = new Room(allies, MonsterRoom2, "chest", itemList, inventory);
    const room3 = new Room(allies, MonsterRoom3, "", itemList, inventory);
    const room4 = new Room(allies, MonsterRoom4, "chest", itemList, inventory);
    const bossRoom = new Room(allies, bossRoomMonster, "", itemList, inventory);
    let quit = await room1.enterRoom(inventory);
    if (!quit) {
      console.clear();
      console.log("Your Team:\n");
      for (let i = 0; i < allies.length; i++) {
        console.log(`${i + 1}. ` + allies[i].showHp() + `\n`);
      }

      const answer = await prompt("Press enter to continue : ");
      if (answer === "") {
        console.clear();
      }

      console.log("You enter the Second Room !!!");
      await new Promise((r) => setTimeout(r, 1000));
      console.clear();

      console.log("Start of the fight !!!");
      await new Promise((r) => setTimeout(r, 1000));
      console.clear();

      quit = await room2.enterRoom(inventory);
    }
    if (!quit) {
      console.clear();
      console.log("Your Team:\n");
      for (let i = 0; i < allies.length; i++) {
        console.log(`${i + 1}. ` + allies[i].showHp() + `\n`);
      }

      const answer = await prompt("Press enter to continue : ");
      if (answer === "") {
        console.clear();
      }

      console.log("You enter the Third Room !!!");
      await new Promise((r) => setTimeout(r, 1000));
      console.clear();

      console.log("Start of the fight !!!");
      await new Promise((r) => setTimeout(r, 1000));
      console.clear();

      quit = await room3.enterRoom(inventory);
    }
    if (!quit) {
      console.clear();
      console.log("Your Team:\n");
      for (let i = 0; i < allies.length; i++) {
        console.log(`${i + 1}. ` + allies[i].showHp() + `\n`);
      }

      const answer = await prompt("Press enter to continue : ");
      if (answer === "") {
        console.clear();
      }

      console.log("You enter the Fourth Room !!!");
      await new Promise((r) => setTimeout(r, 1000));
      console.clear();

      console.log("Start of the fight !!!");
      await new Promise((r) => setTimeout(r, 1000));
      console.clear();

      quit = await room4.enterRoom(inventory);
    }
    if (!quit) {
      console.clear();
      console.log("Your Team:\n");
      for (let i = 0; i < allies.length; i++) {
        console.log(`${i + 1}. ` + allies[i].showHp() + `\n`);
      }

      const answer = await prompt("Press enter to continue : ");
      if (answer === "") {
        console.clear();
      }

      console.log("You enter the Final Boss Room !!!");
      await new Promise((r) => setTimeout(r, 1000));
      console.clear();

      console.log("Start of the fight !!!");
      await new Promise((r) => setTimeout(r, 1000));
      console.clear();

      quit = await bossRoom.enterRoom(inventory);
    }
    if (!quit) {
      console.clear();
      console.log("You Win !!!");
      await new Promise((r) => setTimeout(r, 1000));
      process.exit();
    } else {
      await new Promise((r) => setTimeout(r, 1000));
      console.clear();
      console.log("Game Over");
    }
  }
}

const game = new gameManager();
game.startGame();
