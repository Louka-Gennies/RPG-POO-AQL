import Character from './Character.ts';
import Fight from './Fight.ts';
import Inventory from './Inventory.ts';
import Menu from './Menu.ts';
import Item from './Item.ts';

export default class Room {
    allies: Character[];
    enemies: Character[];
    event: string | null;
    itemList: Item[];
  
    constructor(allies: Character[], enemies: Character[], event: string, itemList: Item[]) {
      this.allies = allies;
      this.enemies = enemies;
      this.event = event;
      this.itemList = itemList;
    }

    async eventManager(allies : Character[]) {
        if (this.event === "chest") {
            console.log("You found a chest!");
            const menu = new Menu("Do you want to open it?", ["Yes", "No"]);
            const response = menu.askQuestion();
            if (response === 0) {
                const alliesChoices : string[] = [];
                for (let i = 0; i < allies.length; i++) {
                    alliesChoices.push(allies[i].showHp() + "\n");
                }
                console.clear();
                const menu = new Menu("Choose wich character will open the chest", alliesChoices)
                const response = menu.askQuestion();
                const character = allies[response];
                const trappedChest = Math.random() < 0.3;
                console.log("You open the chest!");
                if (trappedChest) {
                    console.clear();
                    console.log("The chest was trapped! You lose 10 HP.\n");

                    character.currentHP -= 10;
                    console.log(character.showHp());
                    await new Promise((r) => setTimeout(r, 1000));

                } else { 
                    const itemDuplicate = Math.random() < 0.5;
                    if (itemDuplicate){
                        const randomItem = this.itemList[Math.floor(Math.random() * this.itemList.length)];
                        console.log("You found an item: " + randomItem.name);
                    }else{
                        const randomItem = this.itemList[Math.floor(Math.random() * this.itemList.length)];
                        console.log("You found an item: " + randomItem.name);
                    }

                }
            } else {
                console.clear();
                console.log("You left the chest behind...");
                await new Promise((r) => setTimeout(r, 1000));
            }
        } else {
            console.clear();
            console.log("You found nothing...");
            await new Promise((r) => setTimeout(r, 1000));
        }
    };


    async enterRoom(invent : Inventory) : Promise<boolean> {
        const rommfight = new Fight(this.allies, this.enemies);
        const winOrLoose = await rommfight.fight(invent);
        let quit = false;
        if (winOrLoose) {
            console.clear();
            console.log("You win! All enemies are defeated.");
            await new Promise((r) => setTimeout(r, 1000));
            console.clear();
            await this.eventManager(this.allies);
            const menu = new Menu("Do you want to continue?", ["Yes", "No"]);
            console.clear();
            const response = menu.askQuestion();
            if (response === 0) {
                console.clear();
                console.log("You continue your journey...");
                await new Promise((r) => setTimeout(r, 1000));
                quit = false;
            } else {
                console.clear();
                console.log("You left the dungeon...");
                await new Promise((r) => setTimeout(r, 1000));
                quit = true;
            }
        } else {
            console.clear();
            console.log("You lose... all your heroes are dead.");
            await new Promise((r) => setTimeout(r, 1000));
            quit = true;
        }
        return quit;
    };
};
