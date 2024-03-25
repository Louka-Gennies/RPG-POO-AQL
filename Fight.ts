import Character from "./Character.ts";

export default class Fight {
    team1 : Character[];
    team2 : Character[];
    order : Character[];
    isFinished : boolean = false;

    constructor(team1 : Character[], team2 : Character[]) {
        this.team1 = team1;
        this.team2 = team2;
        this.order = this.calculateOrder(team1, team2);
    }

    calculateOrder(team1 : Character[], team2 : Character[]) {
        const order = team1.concat(team2);
        order.sort((a, b) => b.speed - a.speed);
        return order;
    }

    isAlive (char : Character) {
        if (char.currentHP <= 0) {
            return false;
        } else {
            return true;
        }
    }

    team1Win(team1 : Character[], team2 : Character[]) {
        return team1.length > 0 && team2.length === 0;
    }

    team2Win(team1 : Character[], team2 : Character[]) {
        return team1.length === 0 && team2.length > 0;
    }
    characterDeath(character : Character, team : Character[]) {
        const index = team.indexOf(character);
        team.splice(index, 1);
    }



    fight() {
        while (!this.isFinished) {
            for (let i = 0; i < this.order.length; i++) {
                const character = this.order[i];
                if (this.team1Win(this.team1, this.team2)) {
                    console.log('Team 1 wins!');
                    this.isFinished = true;
                    break;
                } else if (this.team2Win(this.team1, this.team2)) {
                    console.log('Team 2 wins!');
                    this.isFinished = true;
                    break;
                }

                if (this.isAlive(character)) {
                    const target = this.team1.includes(character) ? this.team2 : this.team1;
                    const targetIndex = Math.floor(Math.random() * target.length);
                    const targetCharacter = target[targetIndex];
                    const damage = character.attack(character.physicalAttack, targetCharacter.physicalDefense, targetCharacter.currentHP);
                    targetCharacter.currentHP -= damage;
                    console.log(character.stat(character));
                    console.log(targetCharacter.stat(targetCharacter));
                    console.log(`${character.name} attacked ${targetCharacter.name} for ${damage} damage!`);
                    if (targetCharacter.currentHP <= 0) {
                        this.characterDeath(targetCharacter, target);
                    }
                }
            }
        }
    }
}

