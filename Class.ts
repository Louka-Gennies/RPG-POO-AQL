import Character from "./Character.ts";

export class Warrior extends Character {
  constructor(
    physicalAttack: number,
    physicalDefense: number,
    speed: number,
    maxHP: number,
    currentHP: number,
  ) {
    const name = "Warrior";
    super(name, physicalAttack, physicalDefense, speed, maxHP, currentHP);
  }
}

export class Mage extends Character {
  magicAttack: number;
  maxMana: number;
  currentMana: number;

  constructor(
    physicalAttack: number,
    physicalDefense: number,
    speed: number,
    maxHP: number,
    currentHP: number,
    magicAttack: number,
    maxMana: number,
    currentMana: number,
  ) {
    const name = "Mage";
    super(name, physicalAttack, physicalDefense, speed, maxHP, currentHP);
    this.magicAttack = magicAttack;
    this.maxMana = maxMana;
    this.currentMana = currentMana;
  }

  magicAtk(phyAtk: number, currentHPennemy: number): number {
    const atk = phyAtk;
    this.currentMana -= 20;
    if (atk < 0) {
      return 0;
    } else if (currentHPennemy - atk < 0) {
      return currentHPennemy;
    } else {
      return atk;
    }
  }
}

export class Paladin extends Character {
  constructor(
    physicalAttack: number,
    physicalDefense: number,
    speed: number,
    maxHP: number,
    currentHP: number,
  ) {
    const name = "Paladin";
    super(name, physicalAttack, physicalDefense, speed, maxHP, currentHP);
  }

  holyAttack(phyAtk: number, phyDef: number, currentHPennemy: number): number {
    const atk = phyAtk - phyDef;
    if (atk < 0) {
      return 0;
    } else if (currentHPennemy - atk < 0) {
      return currentHPennemy;
    } else {
      return atk;
    }
  }
}

export class Barbarian extends Character {
  constructor(
    physicalAttack: number,
    physicalDefense: number,
    speed: number,
    maxHP: number,
    currentHP: number,
  ) {
    const name = "Barbarian";
    super(name, physicalAttack, physicalDefense, speed, maxHP, currentHP);
  }

  berserkAttack(
    phyAtk: number,
    phyDef: number,
    currentHPennemy: number,
  ): number {
    const atk = phyAtk - phyDef;
    if (atk < 0) {
      return 0;
    } else if (currentHPennemy - atk < 0) {
      return currentHPennemy;
    } else {
      return atk;
    }
  }
}

export class Priest extends Character {
  constructor(
    physicalAttack: number,
    physicalDefense: number,
    speed: number,
    maxHP: number,
    currentHP: number,
  ) {
    const name = "Priest";
    super(name, physicalAttack, physicalDefense, speed, maxHP, currentHP);
  }

  healSpell(maxHP: number, currentHP: number): number {
    const addHP = (maxHP / 100) * 25;
    const health = currentHP + addHP;
    if (health > maxHP) {
      return maxHP;
    } else {
      return health;
    }
  }
}

export class Thief extends Character {
  constructor(
    physicalAttack: number,
    physicalDefense: number,
    speed: number,
    maxHP: number,
    currentHP: number,
  ) {
    const name = "Thief";
    super(name, physicalAttack, physicalDefense, speed, maxHP, currentHP);
  }

  steal(): void {
    console.log("You stole 10 golds");
  }
}

export class Monster extends Character {
  constructor(
    physicalAttack: number,
    physicalDefense: number,
    speed: number,
    maxHP: number,
    currentHP: number,
  ) {
    const monsterName = [
      "Goblin",
      "Orc",
      "Troll",
      "Dragon",
      "Wyvern",
      "Giant",
      "Golem",
      "Slime",
      "Skeleton",
      "Zombie",
    ];
    const randomName = Math.floor(Math.random() * monsterName.length);
    name = monsterName[randomName];
    super(name, physicalAttack, physicalDefense, speed, maxHP, currentHP);
  }
}

export class Boss extends Character {
}
