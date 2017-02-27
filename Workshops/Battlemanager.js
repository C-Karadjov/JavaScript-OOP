function solve() {
    'use strict';

    const ERROR_MESSAGES = {
        INVALID_NAME_TYPE: 'Name must be string!',
        INVALID_NAME_LENGTH: 'Name must be between between 2 and 20 symbols long!',
        INVALID_NAME_SYMBOLS: 'Name can contain only latin symbols and whitespaces!',
        INVALID_ALIGNMENT: 'Alignment must be good, neutral or evil!',
        INVALID_MANA: 'Mana must be a positive integer number!',
        INVALID_EFFECT: 'Effect must be a function with 1 parameter!',
        INVALID_DAMAGE: 'Damage must be a positive number that is at most 100!',
        INVALID_HEALTH: 'Health must be a positive number that is at most 200!',
        INVALID_SPEED: 'Speed must be a positive number that is at most 100!',
        INVALID_COUNT: 'Count must be a positive integer number!',
        INVALID_SPELL_OBJECT: 'Passed objects must be Spell-like objects!',
        NOT_ENOUGH_MANA: 'Not enough mana!',
        TARGET_NOT_FOUND: 'Target not found!',
        INVALID_BATTLE_PARTICIPANT: 'Battle participants must be ArmyUnit-like!'
    };

    const Validator = {
        validateName(str) {
            if (typeof str !== 'string') {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_TYPE);
            }
        },
        validateStringLengh(str) {
            if (str.length < 2 || str.length > 20) {
                throw Error(ERROR_MESSAGES.INVALID_NAME_LENGTH);
            }
        },
        validateStringLatin(str) {
            if (str.match(/[^a-zA-Z ]/)) {
                throw Error(ERROR_MESSAGES.INVALID_NAME_SYMBOLS);
            }
        },
        validatePositiveInteger(num, name) {
            if (num <= 0) {
                throw Error(`${name} must be a positive integer number!`);
            }
        },
        validateStringAlignment(str) {
            if (str !== 'good' && str !== 'neutral' && str !== 'evil') {
                throw Error(ERROR_MESSAGES.INVALID_ALIGNMENT);
            }
        },
        validateNumberBound(num, bound, name) {
            if (num > bound) {
                throw Error(`${name} must be a positive number that is at most ${bound}!`);
            }
        }
    }

    function* getId() {
        var id = 0;
        while (true) {
            id += 1;
            yield id;
        }
    }

    var idGenerator = getId();

    class Spell {
        constructor(name, manaCost, effect) {
            this.name = name;
            this.manaCost = manaCost;
            this.effect = effect;
        }
        get name() {
            return this._name;
        }
        set name(name) {
            Validator.validateName(name);
            Validator.validateStringLengh(name);
            Validator.validateStringLatin(name);
            this._name = name;
        }
        get manaCost() {
            return this._manaCost;
        }
        set manaCost(manaCost) {
            Validator.validatePositiveInteger(manaCost, 'Mana');
            this._manaCost = manaCost;
        }
        get effect() {
            return this._effect;
        }
        set effect(effect) {
            this._effect = effect;
        }
    }
    class Unit {
        constructor(name, alignment) {
            this.name = name;
            this.alignment = alignment;
        }
        get name() {
            return this._name;
        }
        set name(name) {
            Validator.validateName(name);
            Validator.validateStringLengh(name);
            Validator.validateStringLatin(name);
            this._name = name;
        }
        get alignment() {
            return this._alignment;
        }
        set alignment(alignment) {
            Validator.validateStringAlignment(alignment);
            this._alignment = alignment;
        }
    }
    class ArmyUnit extends Unit {
        constructor(name, alignment, damage, health, count, speed) {
            super(name, alignment)
            this.id = idGenerator.next().value;
            this.damage = damage;
            this.health = health;
            this.count = count;
            this.speed = speed;
        }
        get damage() {
            return this._damage;
        }
        set damage(damage) {
            Validator.validatePositiveInteger(damage, 'Damage');
            Validator.validateNumberBound(damage, 100, 'Damage');
            this._damage = damage;
        }
        get health() {
            return this._health;
        }
        set health(health) {
            Validator.validatePositiveInteger(health, 'Health');
            Validator.validateNumberBound(health, 200, 'Health');
            this._health = health;
        }
        get count() {
            return this._count;
        }
        set count(count) {
            Validator.validatePositiveInteger(count, 'Count');
            this._count = count;
        }
        get speed() {
            return this._speed;
        }
        set speed(speed) {
            Validator.validatePositiveInteger(speed, 'Speed');
            Validator.validateNumberBound(speed, 100, 'Speed');
            this._speed = speed;
        }
    }
    class Comander extends Unit {
        constructor(name, alignment, mana) {
            super(name, alignment)
            this.mana = mana;
            this.spellbook = [];
            this.army = [];
        }
        get mana() {
            return this._mana;
        }
        set mana(mana) {
            Validator.validatePositiveInteger(mana, 'Mana');
            this._mana = mana;
        }
    }

    class Battlemanager {
        constructor() {
            this._commanders = [];
            this._army_units = [];
        }

        getCommander(name, alignment, mana) {
            return new Comander(name, alignment, mana);
        }

        getArmyUnit(options) {
            return new ArmyUnit(options.name, options.alignment, options.damage, options.health, options.count, options.speed);
        }

        getSpell(name, manaCost, effect) {
            return new Spell(name, manaCost, effect);
        }

        addCommanders(...commanders) {
            this._commanders.push(...commanders);
            return this;
        }

        addSpellsTo(commanderName, ...spells) {
            var commander = this._commanders.find(commander => commander.name === commanderName);
            if (commander === undefined) {
                throw Error(`No such commander`);
            }
            commander.spellbook.push(...spells);
            return this;
        }

        addArmyUnitTo(commanderName, armyUnit) {
            let commander = this._commanders.find(commander => commander.name === commanderName);
            if (commander === undefined) {
                throw Error(`No such commander`);
            }

            commander.army.push(armyUnit);
            this._army_units.push(armyUnit);
            return this;
        }

        findCommanders(query) {
            return this._commanders
                .filter(commander => Object.keys(query).every(prop => query[prop] === commander[prop]))
                .sort((x, y) => x.name.localeCompare(y.name));
            // if (query.hasOwnProperty('name') || query.hasOwnProperty('alignment')) {
            //     return this._commanders.filter(x => x.name === query.name || x.alignment === query.alignment);
            // }
        }

        findArmyUnitById(id) {
            return this._army_units.find(x => x.id === id);
        }

        findArmyUnits(query) {
            return this._army_units
                .filter(unit => Object.keys(query).every(prop => query[prop] === unit[prop]))
                .sort((x, y) => {
                    const cmp = y.speed - x.speed;
                    if (cmp === 0) {
                        return x.name.localeCompare(y.name);
                    }
                    return cmp;
                });
        }

        spellcast(casterName, spellName, targetUnitId) {
            let commander = this._commanders.find(commander => commander.name === casterName);
            if (commander === undefined) {
                throw Error(`Can't cast with non-existant Commander`);
            }

            let spell = commander.spellbook.find(spell => spell.name === spellName);
            if (spell === undefined) {
                throw Error(`${commanderName} doesn't know ${spellName}`);
            }
            if (commander.mana < spell.manaCost) {
                throw Error(`Not enough mana!`);
            }

            if (this._army_units.find(unit => unit.id === targetUnitId) === undefined) {
                throw Error(`Target not found!`);
            }

            commander.mana -= spell.manaCost;
            spell.effect(targetUnitId);

            return this;
        }

        battle(attacker, defender) {
            // still not clear what to do here
            let totalDamage = attacker.damage * attacker.count;
            let totalHealth = defender.health * defender.count;
            totalHealth -= totalDamage;
            defender.count = Math.ceil(totalHealth / defender.health);

            if (defender.count < 0) {
                defender.count = 0;
            }

            return this;
        }

    }

    return new Battlemanager;

}
module.exports = solve;