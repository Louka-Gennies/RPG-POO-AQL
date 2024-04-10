import Character from './Character.ts';
import Fight from './Fight.ts';
import Inventory from './Inventory.ts';
import Menu from './Menu.ts';

export default class Room {
    allies: Character[];
    enemies: Character[];
    event: string | null;
  
    constructor(allies: Character[], enemies: Character[], event: string) {
      this.allies = allies;
      this.enemies = enemies;
      this.event = event;
    }

    eventManager() {
        if (this.event === "chest") {
            console.log("You found a chest!");
            const menu = new Menu("Do you want to open it?", ["Yes", "No"]);
            const response = menu.askQuestion();
            if (response === 0) {
                console.log("You open the chest!");
            } else {
                console.log("You left the chest behind...");
            }
        } else {
            console.log("You found nothing...");
        }
    };


    async enterRoom(invent : Inventory) : Promise<boolean> {
        const rommfight = new Fight(this.allies, this.enemies);
        const winOrLoose = await rommfight.fight(invent);
        let quit = false;
        if (winOrLoose) {
            console.log("You win! All enemies are defeated.");
            this.eventManager();
            const menu = new Menu("Do you want to continue?", ["Yes", "No"]);
            const response = menu.askQuestion();
            if (response === 0) {
                console.log("You continue your journey...");
                quit = false;
            } else {
                console.log("You left the dungeon...");
                quit = true;
            }
        } else {
            console.log("You lose... all your heroes are dead.");
            quit = true;
        }
        return quit;
    };
};
