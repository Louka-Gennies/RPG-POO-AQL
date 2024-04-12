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
    invent: Inventory;
  
    constructor(allies: Character[], enemies: Character[], event: string, itemList: Item[], invent: Inventory) {
      this.allies = allies;
      this.enemies = enemies;
      this.event = event;
      this.itemList = itemList;
      this.invent = invent;
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
                await new Promise((r) => setTimeout(r, 1000));
                const character = allies[response];
                const trappedChest = Math.random() < 0.001;
                console.log("You open the chest!");
                await new Promise((r) => setTimeout(r, 1000));
                if (trappedChest) {
                    console.clear();
                    console.log("The chest was trapped! You lose 10 HP.\n");

                    character.currentHP -= 10;
                    console.log(character.showHp());
                    await new Promise((r) => setTimeout(r, 1000));

                } else { 
                    const itemDuplicate = Math.random() <= 0.01;
                    if (itemDuplicate){

                        const randomItem = this.itemList[Math.floor(Math.random() * this.itemList.length)];
                        console.log("You found items: 2 " + randomItem.name);
                        const itemId = randomItem.getId();
                        if (!this.invent.items[itemId]) {
                            this.invent.addItem(randomItem);
                        }
                        this.invent.items[itemId].addQuantity();
                        this.invent.items[itemId].addQuantity();


                    }else{
                        const firstRandomItem = this.itemList[Math.floor(Math.random() * this.itemList.length)];
                        let secondRandomItem = this.itemList[Math.floor(Math.random() * this.itemList.length)];
                        while (firstRandomItem.name === secondRandomItem.name){
                            secondRandomItem = this.itemList[Math.floor(Math.random() * this.itemList.length)];
                        }
                        const firstItemId = firstRandomItem.getId();
                        const secondItemId = secondRandomItem.getId();

                        console.log("You found an item: " + firstRandomItem.name + " and " + secondRandomItem.name);
                        this.invent.items[firstItemId].addQuantity();
                        this.invent.items[secondItemId].addQuantity();
                        await new Promise((r) => setTimeout(r, 4000));
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
