const weapon = [
  { name: 'club', cost: .1, bludgeoning: '1d4', weight: 2, light: true },
  { name: 'dagger', cost: 2, piercing: '1d4', weight: 1, finesse: true, light: true, thrown: [20, 60] },
  { name: 'greatclub', cost: .2, bludgeoning: '1d8', weight: 10, twohanded: true },
  { name: 'handaxe', cost: 5, slashing: '1d6', weight: 2, light: true, thrown: [20, 60] },
  { name: 'javelin', cost: .5, piercing: '1d6', weight: 2, thrown: [30, 120] },
  { name: 'hammer', cost: .2, bludgeoning: '1d4', weight: 2, light: true, range: [20, 60] },
  { name: 'mace', cost: 5, bludgeoning: '1d6', weight: 4 },
  { name: 'quarterstaff', cost: .2, bludgeoning: '1d6', weight: 4, versatile: '1d8' },
  { name: 'sickle', cost: 1, slashing: '1d4', weight: 2, light: true },
  { name: 'spear', cost: 1, piercing: '1d6', weight: 3, thrown: [20, 60], versatile: '1d8' },
  { name: 'light crossbow', cost: 25, piercing: '1d8', weight: 5, ammo: 'bolt', range: [80, 320], loading: true, twohanded: true },
  { name: 'dart', cost: .05, piercing: '1d4', weight: .25, finesse: true, thrown: [20, 60] },
  { name: 'shortbow', cost: 25, piercing: '1d6', weight: 2, range: [80, 320], ammo: 'arrow' },
  { name: 'sling', cost: .1, bludgeoning: '1d4', weight: 0, range: [30, 120], ammo: 'bullet' },
  { name: 'battleaxe', cost: 10, slashing: '1d8', weight: 4, versatile: '1d10', martial: true },
  { name: 'flail', cost: 10, bludgeoning: '1d8', weight: 2, martial: true },
  { name: 'glaive', cost: 20, slashing: '1d10', weight: 6, heavy: true, reach: true, twohanded: true, martial: true },
  { name: 'greataxe', cost: 30, slashing: '1d12', weight: 7, heavy: true, twohanded: true, martial: true },
  { name: 'greatsword', cost: 50, slashing: '2d6', weight: 6, heavy: true, twohanded: true, martial: true },
  { name: 'halberd', cost: 20, slashing: '1d10', weight: 6, heavy: true, twohanded: true, martial: true },
  { name: 'lance', cost: 10, piercing: '1d12', weight: 6, reach: true, twohanded: true, martial: true, special: 'You have disadvantage when you use a lance to attack a target within 5 feet of you. A lance requires only one hand when you are mounted.' },
  { name: 'longsword', cost: 15, slashing: '1d8', weight: 3, versatile: '1d10', martial: true },
  { name: 'maul', cost: 10, bludgeoning: '2d6', weight: 10, heavy: true, twohanded: true, martial: true },
  { name: 'morningstar', cost: 15, piercing: '1d8', weight: 4, martial: true },
  { name: 'pike', cost: 5, piercing: '1d10', weight: 18, heavy: true, twohanded: true, martial: true },
  { name: 'rapier', cost: 25, piercing: '1d8', weight: 2, finesse: true, martial: true },
  { name: 'scimitar', cost: 25, slashing: '1d6', weight: 3, finesse: true, light: true, martial: true },
  { name: 'shortsword', cost: 10, piercing: '1d6', weight: 2, finesse: true, light: true, martial: true },
  { name: 'triedent', cost: 5, piercing: '1d6', weight: 4, thrown: [20, 60], versatile: '1d8', martial: true },
  { name: 'war pick', cost: 5, piercing: '1d8', weight: 2, martial: true },
  { name: 'warhammer', cost: 15, bludgeoning: '1d8', weight: 2, versatile: '1d10', martial: true },
  { name: 'whip', cost: 2, slashing: '1d4', weight: 3, finesse: true, reach: true, martial: true },
  { name: 'blowgun', cost: 10, piercing: 1, weight: 1, ammo: 'needle', range: [25, 100], loading: true, martial: true },
  { name: 'hand crossbow', cost: 75, piercing: '1d6', weight: 1, ammo: 'bolt', range: [30, 120], light: true, loading: true, martial: true },
  { name: 'heavy crossbow', cost: 50, piercing: '1d10', weight: 18, ammo: 'bolt', range: [100, 400], heavy: true, loading: true, twohanded: true, martial: true },
  { name: 'longbow', cost: 50, piercing: '1d8', weight: 2, ammo: 'arrow', range: [150, 600], heavy: true, twohanded: true, martial: true },
  { name: 'net', cost: 1, weight: 3, thrown: [5, 15], martial: true, special: 'A Large or smaller creature hit by a net is restrained until it is freed. A net has no effect on creatures that are formless, or creatures that are Huge or larger. A creature can use its action to make a DC 10 Strength check, freeing itself or another creature within its reach on a success. Dealing 5 slashing damage to the net (AC 10) also frees the creature without harming it, ending the effect and destroying the net.\r\n\r\nWhen you use an action, bonus action, or reaction to attack with a net, you can make only one attack regardless of the number of attacks you can normally make.', martial: true }
];

class Weapon {
  constructor(json) {
    Object.apply(this, json);
  }
}

const weapons = weapon.map(v => new Weapon(v));

module.exports = weapons;
