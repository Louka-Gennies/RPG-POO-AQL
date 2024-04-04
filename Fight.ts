import Character from "./Character.ts";
import Menu from "./Menu.ts";
import chalk from "chalk";

export default class Fight {
  team1: Character[];
  team2: Character[];
  order: Character[];
  isFinished: boolean = false;

  constructor(team1: Character[], team2: Character[]) {
    this.team1 = team1;
    this.team2 = team2;
    this.order = this.calculateOrder(team1, team2);
  }

  calculateOrder(team1: Character[], team2: Character[]) {
    const order = team1.concat(team2);
    order.sort((a, b) => b.speed - a.speed);
    return order;
  }

  isAlive(char: Character) {
    if (char.currentHP <= 0) {
      return false;
    } else {
      return true;
    }
  }

  team1Win(team1: Character[], team2: Character[]) {
    return team1.length > 0 && team2.length === 0;
  }

  team2Win(team1: Character[], team2: Character[]) {
    return team1.length === 0 && team2.length > 0;
  }

  characterDeath(character: Character, team: Character[]) {
    const index = team.indexOf(character);
    team.splice(index, 1);
  }

  async fight() {
    while (!this.isFinished) {
      for (let i = 0; i < this.order.length; i++) {
        const character = this.order[i];
        if (this.team1Win(this.team1, this.team2)) {
          console.log("You win! All enemies are defeated.");
          this.isFinished = true;
          break;
        } else if (this.team2Win(this.team1, this.team2)) {
          console.log("You lose... all your heroes are dead.");
          this.isFinished = true;
          break;
        } else if (this.isAlive(character)) {
          console.clear();
          console.log(`It's ${character.name}'s turn.\n`);
          character.stats(this.team1, this.team2);
          if (this.team1.includes(character)) {
            const action = character.actionMenu();
            switch (action) {
              case 0:
                character.attack(this.team2);
                break;
              case 1:
                if (character.name === "Priest") {
                  console.clear();
                  character.specialAttack(this.team1);
                  await new Promise((r) => setTimeout(r, 1000));
                  break;
                } else {
                  console.clear();
                  character.specialAttack(this.team2);
                  await new Promise((r) => setTimeout(r, 1000));
                  break;
                }
              case 2:
                console.clear();
                console.log("You don't have any items.");
                await new Promise((r) => setTimeout(r, 1000));
                break;
            }
          } else {
            console.clear();
            character.attack(this.team1);
            await new Promise((r) => setTimeout(r, 1000));
          }
        }
      } 
    }
  }
};


