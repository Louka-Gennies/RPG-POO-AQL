import Character from "./Character.ts";

class Warrior extends Character {
    constructor (name : string, physicalAttack : number, physicalDefense : number, speed : number, maxHP : number, currentHP : number) {
        super(name, physicalAttack, physicalDefense, speed, maxHP, currentHP);
    }
};

class Mage extends Character {
    magicAttack : number;
    maxMana : number;
    currentMana : number;

    constructor (name : string, physicalAttack : number, physicalDefense : number, speed : number, maxHP : number, currentHP : number, magicAttack : number, maxMana : number, currentMana : number) {
        super(name, physicalAttack, physicalDefense, speed, maxHP, currentHP);
        this.magicAttack = magicAttack;
        this.maxMana = maxMana;
        this.currentMana = currentMana;
    }

    magicAtk(phyAtk : number, currentHPennemy : number) : number {
        const atk = phyAtk
        if (atk < 0) {
            return 0
        } else if (currentHPennemy - atk < 0) {
            return currentHPennemy
        } else {
            return atk
        }
    }
};

class Paladin extends Character {
    constructor (name : string, physicalAttack : number, physicalDefense : number, speed : number, maxHP : number, currentHP : number) {
        super(name, physicalAttack, physicalDefense, speed, maxHP, currentHP);
    }

    holyAttack(phyAtk : number, phyDef : number, currentHPennemy : number) : number {
        const atk = phyAtk - phyDef
        if (atk < 0) {
            return 0
        } else if (currentHPennemy - atk < 0) {
            return currentHPennemy
        } else {
            return atk
        }
    }
};

class Barbarian extends Character {
    constructor (name : string, physicalAttack : number, physicalDefense : number, speed : number, maxHP : number, currentHP : number) {
        super(name, physicalAttack, physicalDefense, speed, maxHP, currentHP);
    }

    berserkAttack(phyAtk : number, phyDef : number, currentHPennemy : number) : number {
        const atk = phyAtk - phyDef
        if (atk < 0) {
            return 0
        } else if (currentHPennemy - atk < 0) {
            return currentHPennemy
        } else {
            return atk
        }
    }
};

class Priest extends Character {
    constructor (name : string, physicalAttack : number, physicalDefense : number, speed : number, maxHP : number, currentHP : number) {
        super(name, physicalAttack, physicalDefense, speed, maxHP, currentHP);
    }

    healSpell(maxHP : number, currentHP : number) : number {
        const addHP = (maxHP / 100) * 25
        const health = currentHP + addHP
        if (health > maxHP) {
            return maxHP
        } else {
            return health
        }
    }
};

class Thief extends Character {
    constructor (name : string, physicalAttack : number, physicalDefense : number, speed : number, maxHP : number, currentHP : number) {
        super(name, physicalAttack, physicalDefense, speed, maxHP, currentHP);
    }

    steal() : void {
        console.log("You stole 10 golds");
    }
};

class Monster extends Character {

};

class Boss extends Character {

};
