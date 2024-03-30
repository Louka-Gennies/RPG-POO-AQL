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

  specialAttack(enemies : Character[]): void {
    console.log("The warrior don't have a special attack, he just attack");
    this.attack(enemies);
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

  specialAttack(enemies : Character[]) : void {
    this.currentMana -= 10;
    const phyAtk = this.physicalAttack;
    const enemyNames = enemies.map((enemy) => `${enemy.name}`);
    const menu = new Menu("Choose a target: ", enemyNames);
    const target = menu.askQuestion();
    if (phyAtk < 0) {
      console.log(`${this.name} attacked ${enemies[target].name} with a magical attack for 0 damage`);
    } else if (enemies[target].currentHP - phyAtk < 0) {
      enemies[target].currentHP = 0;
      console.log(`${this.name} attacked ${enemies[target].name} with a magical attack for ${enemies[target].currentHP} damage and defeated him!`);
    } else {
      enemies[target].currentHP -= phyAtk;
      console.log(`${this.name} attacked ${enemies[target].name} with a magical attack for ${phyAtk} damage`);
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

  specialAttack(enemies : Character[]) : void {
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
    console.log(`${this.name} attacked all enemies for a total of ${totalAtk} damage`);
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

  specialAttack(enemies : Character[]): void {
    const phyAtk = this.physicalAttack;
    const enemyNames = enemies.map((enemy) => `${enemy.name}`);
    const menu = new Menu("Choose a target: ", enemyNames);
    const target = menu.askQuestion();
    const phyDef = enemies[target].physicalDefense;
    const atk = Math.floor((phyAtk - phyDef) * 1.3);
    const selfAtk = Math.floor((this.maxHP / 100) * 20);
    this.currentHP -= selfAtk;
    if (atk < 0) {
      console.log(`${this.name} attacked ${enemies[target].name} for 0 damage and deal to himself ${selfAtk} damage`);
    } else if (enemies[target].currentHP - atk < 0) {
      enemies[target].currentHP = 0;
      console.log(`${this.name} attacked ${enemies[target].name} for ${enemies[target].currentHP} damage and defeated him! and deal to himself ${selfAtk} damage`);
    } else {
      enemies[target].currentHP -= atk;
      console.log(`${this.name} attacked ${enemies[target].name} for ${atk} damage and deal to himself ${selfAtk} damage`);
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

  specialAttack(allies : Character[]) : void  {
    const alliesName = allies.map((allie) => `${allie.name}`);
    const menu = new Menu("Choose a target: ", alliesName);
    const target = menu.askQuestion();
    const addHP = (allies[target].maxHP / 100) * 25;
    const health = allies[target].currentHP + addHP;
    if (health > allies[target].maxHP) {
      console.log(`${this.name} healed ${allies[target].name} for ${allies[target].maxHP - allies[target].currentHP} HP`);
    } else {
      console.log(`${this.name} healed ${allies[target].name} for ${addHP} HP`);
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

  attack(enemies : Character[]): void {
    let targetIndex;
    const phyAtk = this.physicalAttack;
    if (Math.random() < 0.8) {
      targetIndex = Math.floor(Math.random() * enemies.length);
    } else {
      targetIndex = enemies.reduce((lowest, enemy, index) => enemy.currentHP < enemies[lowest].currentHP ? index : lowest, 0);
    }
    const atk = phyAtk - enemies[targetIndex].physicalDefense;
    if (atk < 0) {
      console.log(`${this.name} attacked ${enemies[targetIndex].name} for 0 damage`);
    } else if (enemies[targetIndex].currentHP - atk < 0) {
      enemies[targetIndex].currentHP = 0;
      console.log(`${this.name} attacked ${enemies[targetIndex].name} for ${enemies[targetIndex].currentHP} damage and defeated him!`);
    } else {
      enemies[targetIndex].currentHP -= atk;
      console.log(`${this.name} attacked ${enemies[targetIndex].name} for ${atk} damage`);
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

  attack(enemies : Character[]): void {
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
        console.log(`${this.name} attacked ${enemies[targetIndex].name} for 0 damage`);
      } else if (enemies[targetIndex].currentHP - atk < 0) {
        enemies[targetIndex].currentHP = 0;
        console.log(`${this.name} attacked ${enemies[targetIndex].name} for ${enemies[targetIndex].currentHP} damage and defeated him!`);
      } else {
        enemies[targetIndex].currentHP -= atk;
        console.log(`${this.name} attacked ${enemies[targetIndex].name} for ${atk} damage`);
      }
    } else {
      let totalAtk = 0;
      for (let i = 0; i < enemies.length; i++) {
        const atk = phyAtk - enemies[i].physicalDefense;
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
      console.log(`${this.name} attacked all enemies for a total of ${totalAtk} damage`);
    }
  }
}
