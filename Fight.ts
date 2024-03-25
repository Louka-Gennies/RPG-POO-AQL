import Character from "./Character.ts";

export default class Fight {
    team1 : Character[];
    team2 : Character[];

    constructor(team1 : Character[], team2 : Character[]) {
        this.team1 = team1;
        this.team2 = team2;
    }

    order(team1 : Character[], team2 : Character[]) {
        const order = team1.concat(team2);
        order.sort((a, b) => b.speed - a.speed);
        return order;
    }
}