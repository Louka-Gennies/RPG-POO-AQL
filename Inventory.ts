import Item from './Item.ts';

export default class Inventory {
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
            console.log(`${item.getName()} x${item.getQuantity()}\n`);
        });
    }
}