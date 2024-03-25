import Character from "./Character.ts";

export default class Fight {
    team1 : Character[];
    team2 : Character[];
    order : Character[];

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
    isAlive(team1 : Character[], team2 : Character[]) {
        if (team1[0].currentHP <= 0 || team2[0].currentHP <= 0) {
            return false;
        }
    }
    
        


}
