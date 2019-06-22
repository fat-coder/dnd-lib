const monster = [{
  name: 'human', size: 'medium', speed: 30, hit_dice: '1d8',
  attributes: {
    strength: 10, dexterity: 10, constitution: 10,
    intelligence: 10, wisdom: 10, charisma: 10,
  },
  languages: ['common']
}, {
  name: 'dwarf', size: 'medium', speed: 25, hit_dice: '1d10',
  attributes: {
    strength: 12, dexterity: 8, constitution: 12,
    intelligence: 8, wisdom: 12, charisma: 8,
  },
  traits: { darkvision: 60 },
  resistances: ['poison'],
  languages: ['dwarven', 'common',]
}, {
  name: 'elf', size: 'medium', speed: 30, hit_dice: '1d6',
  attributes: {
    strength: 8, dexterity: 12, constitution: 8,
    intelligence: 12, wisdom: 10, charisma: 10,
  },
  traits: {
    darkvision: 60,
    fey_ancestory: 'advantage vs charmed, immune to magic sleep',
    trance: 'four hours of sleep for long rest'
  },
  proficiencies: ['perception'],
  languages: ['common', 'elven']
}, {
  name: 'gnome', size: 'small', speed: 25, hit_dice: '1d6',
  attributes: {
    strength: 8, dexterity: 12, constitution: 8,
    intelligence: 12, wisdom: 8, charisma: 12,
  },
  traits: {
    darkvision: 60,
    gnome_cunning: 'advantage on int, wis, cha vs magic'
  },
  languages: ['common', 'gnomish']
}, {
  name: 'goblin', size: 'small', speed: 30, hit_dice: '2d6',
  attributes: {
    strength: 8, dexterity: 14, constitution: 10,
    intelligence: 10, wisdom: 8, charisma: 8,
  },
  traits: {
    darkvision: 60,
    nimble_escape: 'disengage or hide as bonus action'
  },
  proficiencies: ['stealth'],
  languages: ['common', 'goblin']
}, {
  name: 'kobold', size: 'small', speed: 30, hit_dice: '2d6',
  attributes: {
    strength: 7, dexterity: 15, constitution: 9,
    intelligence: 8, wisdom: 7, charisma: 8,
  },
  traits: {
    darkvision: 60,
    pack_tactics: 'advantage if adjacent friendly threatens target',
    sunlight_sensitivity: 'disadvantage if self or target in sunlight for sight or attacks'
  },
  languages: ['common', 'draconic']
}, {
  name: 'gnoll', size: 'medium', speed: 30, hit_dice: '5d8',
  attributes: {
    strength: 14, dexterity: 12, constitution: 11,
    intelligence: 6, wisdom: 10, charisma: 7,
  },
  traits: {
    darkvision: 60,
    rampage: 'when target hits 0, move half speed and make bite attack',
  },
  attacks: { bite: { damage: '1d4', type: 'piercing' }, },
  languages: ['common']
}, {
  name: 'orc', size: 'medium', speed: 30, hit_dice: '2d8',
  attributes: {
    strength: 10, dexterity: 10, constitution: 10,
    intelligence: 10, wisdom: 10, charisma: 10,
  },
  traits: {
    darkvision: 60,
    aggressive: 'bonus action to move up to speed toward hostile in sight'
  },
  proficiencies: ['intimidation'],
  languages: ['common']
}, {
  name: 'worg', size: 'large', speed: 50, hit_dice: '4d10',
  attributes: {
    strength: 16, dexterity: 13, constitution: 13,
    intelligence: 7, wisdom: 11, charisma: 8
  },
  traits: {
    natural_armor: 2,
    darkvision: 60,
    keen_hearing_and_smell: 'advantage on perception vs hear & smell'
  },
  proficiencies: ['perception'],
  attacks: { bite: { damage: '2d6', type: 'piercing', special: 'strength vs dc13 -> prone' } },
  languages: ['goblin', 'worg']
}, {
  name: 'bugbear', size: 'medium', speed: 30, hit_dice: '5d8',
  attributes: {
    strength: 15, dexterity: 14, constitution: 13,
    intelligence: 8, wisdom: 11, charisma: 9
  },
  traits: {
    darkvision: 60,
    brute: 'melee weapons deal an extra die on damage',
    surprise_attack: 'surprise on first round deals 2d6'
  },
  proficiencies: ['stealth', 'survival'],
  languages: ['common', 'goblin'],
}, {
  name: 'harpy', size: 'medium', speed: 20, flying: 40, hit_dice: '7d8',
  attributes: {
    strength: 12, dexterity: 13, constitution: 12,
    intelligence: 7, wisdom: 10, charisma: 13
  },
  traits: {
    multiattack: 2,
    luring_song: 'wisdom vs dc 11, charmed; must move directly to within 5 feet avoiding dangerous terrain; successful save grants immunity per harpy; save at end of each turn'
  },
  attacks: { claws: { damage: '2d4', type: 'slashing' } },
  languages: ['common']
}, {
  name: 'centaur', size: 'large', speed: 50, hit_dice: '6d10',
  attributes: {
    strength: 18, dexterity: 14, constitution: 14,
    intelligence: 9, wisdom: 13, charisma: 11
  },
  traits: {
    charge: 'move at least 30 feet and make melee attack; deal extra 3d6 piercing damage',
    multiattack: 2,
  },
  proficiencies: ['athletics', 'perception', 'survival'],
  attacks: { hooves: { damage: '2d6', type: 'bludgeoning' } },
  languages: ['elvish', 'sylvan']
}, {
  name: 'hobgoblin', size: 'medium', speed: 30, hit_dice: '2d8',
  attributes: {
    strength: 13, dexterity: 12, constitution: 12,
    intelligence: 10, wisdom: 10, charisma: 9
  },
  traits: {
    darkvision: 60,
    martial_advantage: 'deal 2d6 extra damage per turn if adjacent friendly threatens target'
  }
}, {
  name: 'horse', size: 'large', speed: 60, hit_dice: '2d10',
  attributes: {
    strength: 16, dexterity: 10, constitution: 12,
    intelligence: 2, wisdom: 11, charisma: 7
  },
  proficiencies: [ 'perception' ],
  attacks: { hooves: { damage: '2d4', type: 'bludgeoning' } },
}];

class Monster {
  constructor(json) {
    Object.apply(this, json);
  }
}

const monsters = monster.map(v => new Monster(v));

module.exports = monsters;
