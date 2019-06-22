const armor = [
  { scale: 'light', name: 'padded', ac: 11, weight: 8, cost: 10, stealthpenalty: true },
  { scale: 'light', name: 'leather', ac: 11, weight: 10, cost: 5 },
  { scale: 'light', name: 'studded leather', ac: 12, weight: 13, cost: 45 },
  { scale: 'medium', name: 'hide', ac: 12, weight: 12, cost: 10, maxdex: 2 },
  { scale: 'medium', name: 'chain shirt', ac: 13, weight: 20, cost: 50, maxdex: 2 },
  { scale: 'medium', name: 'scale mail', ac: 14, weight: 45, cost: 50, maxdex: 2, stealthpenalty: true },
  { scale: 'medium', name: 'breastplate', ac: 14, weight: 20, cost: 400, maxdex: 2 },
  { scale: 'medium', name: 'half plate', ac: 15, weight: 40, cost: 750, maxdex: 2, stealthpenalty: true },
  { scale: 'heavy', name: 'ring mail', ac: 14, weight: 40, cost: 30, maxdex: 0, stealthpenalty: true },
  { scale: 'heavy', name: 'chain mail', ac: 16, weight: 55, cost: 75, maxdex: 0, strength: 13, stealthpenalty: true },
  { scale: 'heavy', name: 'splint', ac: 17, weight: 60, cost: 200, maxdex: 0, strength: 15, stealthpenalty: true },
  { scale: 'heavy', name: 'plate', ac: 18, weight: 65, cost: 1500, maxdex: 0, strength: 15, stealthpenalty: true },
];

class Armor {
  constructor(json) {
    Object.apply(this, json);
  }
}

const armors = armor.map(v => new Armor(v));

module.exports = armors;
