export default class Item {
  public name: string;
  public quantity: number;
  public id: number;

  constructor(name: string, quantity: number, id: number) {
    this.name = name;
    this.quantity = quantity;
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  public getId(): number {
    return this.id;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public setQuantity(quantity: number): void {
    this.quantity = quantity;
  }

  public addQuantity(): void {
    this.quantity += 1;
  }

  public removeQuantity(): void {
    if (this.quantity - 1 < 0) {
      console.log("Cannot remove more than what is in the inventory");
    } else {
      this.quantity -= 1;
    }
  }
}
