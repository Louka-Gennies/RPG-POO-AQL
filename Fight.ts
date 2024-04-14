// deno-lint-ignore-file no-case-declarations
import Character from "./Character.ts";
import { Mage } from "./class/Class.ts";
import Inventory from "./Inventory.ts";
import Menu from "./Menu.ts";

export default class Fight {
  private team1: Character[];
  private team2: Character[];
  private order: Character[];
  private isFinished: boolean = false;

  constructor(team1: Character[], team2: Character[]) {
    this.team1 = team1;
    this.team2 = team2;
    this.order = this.calculateOrder(team1, team2);
  }

  private calculateOrder(team1: Character[], team2: Character[]) {
    const order = team1.concat(team2);
    order.sort((a, b) => b.speed - a.speed);
    return order;
  }

  private isAlive(char: Character) {
    if (char.currentHP <= 0) {
      return false;
    } else {
      return true;
    }
  }

  private team1Win(team1: Character[], team2: Character[]) {
    return team1.length > 0 && team2.length === 0;
  }

  private team2Win(team1: Character[], team2: Character[]) {
    return team1.length === 0 && team2.length > 0;
  }

  private async ItemManager(character: Character, invent: Inventory) {
    console.clear();
    const item = await character.ItemMenu(invent);
    switch (item) {
      case 0:
        invent.items[item].quantity -= 1;
        console.clear();
        const healed = character.heal(50);
        console.log(`You healed yourself of ${healed} HP\n`);
        await new Promise((r) => setTimeout(r, 1000));
        break;
      case 1:
        console.clear();
        const choicesFragment: string[] = [];
        for (let i = 0; i < this.team1.length; i++) {
          choicesFragment.push(this.team1[i].showHp() + "\n");
        }
        const menuFragment = new Menu(
          "Choose a character to revive:\n",
          choicesFragment,
        );
        const targetFragment = menuFragment.askQuestion();
        if (this.team1[targetFragment].currentHP > 0) {
          invent.items[item].quantity -= 1;
          console.clear();
          const healed = this.team1[targetFragment].heal(50);
          console.log(
            `${
              this.team1[targetFragment].name
            } has been healed of ${healed} HP\n`,
          );
          await new Promise((r) => setTimeout(r, 1000));
          break;
        } else {
          invent.items[item].quantity -= 1;
          console.clear();
          const healed = this.team1[targetFragment].res(20);
          console.log(
            `${
              this.team1[targetFragment].name
            } has been revived with ${healed} HP\n`,
          );
          await new Promise((r) => setTimeout(r, 1000));
          break;
        }
      case 2:
        console.clear();
        const choicesHalf: string[] = [];
        for (let i = 0; i < this.team1.length; i++) {
          choicesHalf.push(this.team1[i].showHp() + "\n");
        }
        const menuHalf = new Menu(
          "Choose a character to revive:\n",
          choicesHalf,
        );
        const targetHalf = menuHalf.askQuestion();
        if (this.team1[targetHalf].currentHP > 0) {
          invent.items[item].quantity -= 1;
          console.clear();
          const healed = this.team1[targetHalf].heal(100);
          console.log(
            `${this.team1[targetHalf].name} has been healed of ${healed} HP\n`,
          );
          break;
        } else {
          invent.items[item].quantity -= 1;
          console.clear();
          const healed = this.team1[targetHalf].res(100);
          console.log(
            `${
              this.team1[targetHalf].name
            } has been revived with ${healed} HP\n`,
          );
          break;
        }
      case 3:
        if (character instanceof Mage) {
          console.clear();
          character.rechargeMana(30);
          invent.items[item].quantity -= 1;
          break;
        } else {
          console.clear();
          console.log("You can't use this item on this character");
          console.clear();
          this.ItemManager(character, invent);
          break;
        }
    }
  }

  private async ActionManager(
    character: Character,
    team: Character[],
    invent: Inventory,
  ) {
    const action = character.actionMenu();
    switch (action) {
      case 0:
        character.attack(this.team2);
        break;
      case 1:
        if (character.name === "Priest") {
          console.clear();
          character.specialAttack(this.team1, invent);
          break;
        } else {
          console.clear();
          character.specialAttack(this.team2, invent);
          break;
        }
      case 2:
        this.ItemManager(character, invent);
        break;
    }
  }

  public async fight(invent: Inventory): Promise<boolean> {
    const team1Print = this.team1;
    const team2Print = this.team2;
    let alliesWin: boolean = false;
    while (!this.isFinished) {
      for (let i = 0; i < this.order.length; i++) {
        const character = this.order[i];
        if (this.team1Win(this.team1, this.team2)) {
          this.isFinished = true;
          alliesWin = true;
          break;
        } else if (this.team2Win(this.team1, this.team2)) {
          this.isFinished = true;
          alliesWin = false;
          break;
        } else if (this.isAlive(character)) {
          console.clear();
          console.log(`It's ${character.name}'s turn.\n`);
          character.active = true;
          character.stats(team1Print, team2Print);
          if (this.team1.includes(character)) {
            this.ActionManager(character, this.team1, invent);
            await new Promise((r) => setTimeout(r, 1000));
          } else {
            console.clear();
            character.attack(this.team1);
            await new Promise((r) => setTimeout(r, 1000));
          }
          character.active = false;
        }
      }
    }
    return alliesWin;
  }
}
