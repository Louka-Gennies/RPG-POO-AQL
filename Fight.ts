import Character from "./Character.ts";

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
  displayMenu() {
    console.log("1. Attack");
    console.log("2. Special attack");
    console.log("3. Use item");
  }

  fight() {
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
        }
        const choice = ["attack", "special attack", "use item"];
        const menu = new Menu("Choose an action: ", choice);
        const action = menu.askQuestion();
        switch (action) {
            case 0:
                
      }
    }
  }
}
