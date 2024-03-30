import Character from "./Character.ts";
import Menu from "./Menu.ts";

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

  specialAttack(enemies : Character[]): number {
    console.log("The warrior don't have a special attack, he just attack");
    return this.attack(enemies);
  };
};

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

  specialAttack(enemies : Character[]): number {
    this.currentMana -= 10;
    const phyAtk = this.physicalAttack;
    const enemyNames = enemies.map((enemy) => `${enemy.name}`);
    const menu = new Menu("Choose a target: ", enemyNames);
    const target = menu.askQuestion();
    if (phyAtk < 0) {
      return 0;
    } else if (enemies[target].currentHP - phyAtk < 0) {
      enemies[target].currentHP = 0;
      return enemies[target].currentHP;
    } else {
      enemies[target].currentHP -= phyAtk;
      return phyAtk;
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

  specialAttack(enemies : Character[]): number {
    let totalAtk = 0;
    const phyAtk = this.physicalAttack;
    for (let i = 0; i < enemies.length; i++) {
      const phyDef = enemies[i].physicalDefense;
      const atk = Math.floor((phyAtk - phyDef) * 0.4);
      if (atk < 0) {
        totalAtk += 0;
      } else if (enemies[i].currentHP - atk < 0) {
        enemies[i].currentHP = 0;
        totalAtk += enemies[i].currentHP;
      } else {
        enemies[i].currentHP -= atk;
        totalAtk += atk;
      }
    }
    return totalAtk;
  }
};

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

  specialAttack(enemies : Character[]): [number, number] {
    const phyAtk = this.physicalAttack;
    const enemyNames = enemies.map((enemy) => `${enemy.name}`);
    const menu = new Menu("Choose a target: ", enemyNames);
    const target = menu.askQuestion();
    const phyDef = enemies[target].physicalDefense;
    const atk = Math.floor((phyAtk - phyDef) * 1.3);
    const selfAtk = Math.floor((this.maxHP / 100) * 20);
    this.currentHP -= selfAtk;
    if (atk < 0) {
      return [0, selfAtk];
    } else if (enemies[target].currentHP - atk < 0) {
      enemies[target].currentHP = 0;
      return [enemies[target].currentHP, selfAtk];
    } else {
      enemies[target].currentHP -= atk;
      return [atk, selfAtk];
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

  specialAttack(maxHP: number, currentHP: number): number {
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

  specialAttack(): void {
    const item = Math.random() * 10;
    if (item <= 5) {
      console.log("You stole an half star");
    }
    else if (item > 5 && item <= 15) {
      console.log("You stole an ether");
    }
    else if (item > 15 && item <= 30) {
      console.log("You stole an star fragment");
    }
    else if (item > 30 && item <= 60) {
      console.log("You stole an potion");
    }
    else {
      console.log("You stole nothing");
    }
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

  attack(enemies : Character[]): number {
    let targetIndex;
    const phyAtk = this.physicalAttack;
    if (Math.random() < 0.8) {
      targetIndex = Math.floor(Math.random() * enemies.length);
    } else {
      targetIndex = enemies.reduce((lowest, enemy, index) => enemy.currentHP < enemies[lowest].currentHP ? index : lowest, 0);
    }
    const atk = phyAtk - enemies[targetIndex].physicalDefense;
    if (atk < 0) {
      return 0;
    } else if (enemies[targetIndex].currentHP - atk < 0) {
      enemies[targetIndex].currentHP = 0;
      return enemies[targetIndex].currentHP;
    } else {
      enemies[targetIndex].currentHP -= atk;
      return atk;
    }
  }
}

export class Boss extends Character {
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

  attack(enemies : Character[]): number {
    let targetIndex;
    const phyAtk = this.physicalAttack;
    if (Math.random() < 0.7) {
      if (Math.random() < 0.8) {
        targetIndex = Math.floor(Math.random() * enemies.length);
      } else {
        targetIndex = enemies.reduce((lowest, enemy, index) => enemy.currentHP < enemies[lowest].currentHP ? index : lowest, 0);
      }
      const atk = phyAtk - enemies[targetIndex].physicalDefense;
      if (atk < 0) {
        return 0;
      } else if (enemies[targetIndex].currentHP - atk < 0) {
        enemies[targetIndex].currentHP = 0;
        return enemies[targetIndex].currentHP;
      } else {
        enemies[targetIndex].currentHP -= atk;
        return atk;
      }
    } else {
      let atkTotal = 0;
      for (let i = 0; i < enemies.length; i++) {
        const atk = phyAtk - enemies[i].physicalDefense;
        if (atk < 0) {
          return 0;
        } else if (enemies[i].currentHP - atk < 0) {
          enemies[i].currentHP = 0;
          atkTotal += enemies[i].currentHP;
        } else {
          enemies[i].currentHP -= atk;
          atkTotal += atk;
        }
      }
      return atkTotal;
    }
  }
}
