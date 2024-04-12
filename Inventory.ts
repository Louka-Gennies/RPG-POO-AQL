import Item from './Item.ts';

export default class Inventory {

    public addItems(item: Item, quantity: number) {
        for (let i = 0; i < quantity; i++) {
          this.addItem(item);
        }
    }

    public items: Item[] = [];

    public addItem(item: Item): void {
        this.items.push(item);
    }

    public removeItem(item: Item): void {
        this.items = this.items.filter(i => i !== item);
    }

    public getItems(): Item[] {
        return this.items;
    }

    public showItems(): void {
        console.log('Inventory:\n');
        this.items.forEach(item => {
            if (item.getQuantity() > 0) {
                console.log(`${item.getName()} x ${item.getQuantity()}\n`);
            }
        });
    }
}