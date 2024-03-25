import {
  Barbarian,
  Mage,
  Monster,
  Paladin,
  Priest,
  Thief,
  Warrior,
} from "./Class.ts";
import Fight from "./Fight.ts";

const character1 = new Warrior(10, 5, 5, 100, 100);
const character2 = new Mage(5, 2, 10, 50, 50, 10, 60, 60);
const character3 = new Paladin(7, 3, 7, 70, 70);
const monster1 = new Monster(10, 5, 5, 100, 100);
const monster2 = new Monster(5, 2, 10, 50, 50);
const monster3 = new Monster(7, 3, 7, 70, 70);

const allies = [character1, character2, character3];
const enemies = [monster1, monster2, monster3];

const room = new Fight(allies, enemies);
room.fight();
