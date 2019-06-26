const Roll = require('./roll');

class Treasure {
  constructor(content) {
    this.name = content.name;
    this.low = content.low;
    this.high = content.high;
    this.multiplier = content.multiplier;
    this.table = content.table;

    if (content.table && tables[content.table]) {
      this.table = tables[content.table];
    }

    this.roll = new Roll(content.roll);
    if (content.items && content.items.length) {
      this.items = content.items.map(v => new Treasure(v));
    }
    if (content.always && content.always.length) {
      this.always = content.always.map(v => new Treasure(v));
    }
  }

  execute(input) {
    return Array.from(this.executeIterator(input));
  }

  executeAll() {
    const results = [];
    const process = this.execute();

    while (process.length) {
      const next = process.pop();
      if (next instanceof Treasure) {
        process.push(...next.execute());
      } else {
        results.push(next);
      }
    }

    return results.reduce((a, c) => {
      Object.keys(c).forEach(v => a[v] = (a[v] || 0) + c[v]);
      return a;
    }, {});
  }

  * executeIterator(input) {
    if (this.always) {
      for (const a of this.always)
        yield a;
    }

    if (!input && this.roll)
      input = this.roll.roll();

    if (!input)
      input = 1;

    if (this.items) {
      for (const item of this.items) {
        if (item.low <= input && input <= item.high) {
          yield item;
        }
      }
    } else if (this.table) {
      for (let i = 0; i < input; i++) {
        yield this.table;
      }
    } else if (this.name) {
      if (details[this.name]) {
        yield details[this.name];
      } else {

        let count = input || 1;
        if (this.multiplier)
          count *= this.multiplier;

        const result = {};
        result[this.name] = count;
        yield result;
      }
    }
  }
}

const weightedWeapons = {
  roll: 'd100',
  items: [
    {low: 1, high: 1, name: 'club'},
    {low: 2, high: 6, name: 'dagger'},
    {low: 7, high: 7, name: 'greatclub'},
    {low: 8, high: 8, name: 'handaxe'},
    {low: 9, high: 9, name: 'javelin'},
    {low: 10, high: 10, name: 'hammer'},
    {low: 11, high: 11, name: 'mace'},
    {low: 12, high: 12, name: 'quarterstaff'},
    {low: 13, high: 13, name: 'sickle'},
    {low: 14, high: 14, name: 'spear'},
    {low: 15, high: 15, name: 'light crossbow'},
    {low: 16, high: 16, name: 'dart'},
    {low: 17, high: 26, name: 'shortbow'},
    {low: 27, high: 27, name: 'sling'},
    {low: 28, high: 28, name: 'battleaxe'},
    {low: 29, high: 29, name: 'flail'},
    {low: 30, high: 30, name: 'glaive'},
    {low: 31, high: 31, name: 'greataxe'},
    {low: 32, high: 32, name: 'greatsword'},
    {low: 33, high: 33, name: 'halberd'},
    {low: 34, high: 34, name: 'lance'},
    {low: 35, high: 35, name: 'longsword'},
    {low: 36, high: 55, name: 'maul'},
    {low: 56, high: 56, name: 'morningstar'},
    {low: 57, high: 57, name: 'pike'},
    {low: 58, high: 71, name: 'rapier'},
    {low: 72, high: 72, name: 'scimitar'},
    {low: 73, high: 82, name: 'shortsword'},
    {low: 83, high: 83, name: 'trident'},
    {low: 84, high: 84, name: 'war pick'},
    {low: 85, high: 85, name: 'warhammer'},
    {low: 86, high: 86, name: 'whip'},
    {low: 87, high: 87, name: 'blowgun'},
    {low: 88, high: 88, name: 'hand crossbow'},
    {low: 89, high: 89, name: 'heavy crossbow'},
    {low: 90, high: 99, name: 'longbow'},
    {low: 100, high: 100, name: 'net'},
  ]
};

const ammunition = {roll: '2d6+6', name: 'ammunition'};

const individualTreasure = [
  {
    name: 'nub', low: 0, high: 4,
    roll: 'd100',
    items: [
      {low: 1, high: 30, always: [{roll: '5d6', name: 'copper'}]},
      {low: 31, high: 60, always: [{roll: '4d6', name: 'silver'}]},
      {low: 61, high: 70, always: [{roll: '3d6', name: 'electrum'}]},
      {low: 71, high: 95, always: [{roll: '3d6', name: 'gold'}]},
      {low: 96, high: 100, always: [{roll: '1d6', name: 'platinum'}]},
    ]
  },
  {
    name: 'low', low: 5, high: 10,
    roll: 'd100',
    items: [
      {
        low: 1, high: 30, always: [
          {roll: '4d6', name: 'copper', multiplier: 100},
          {roll: '1d6', name: 'electrum', multiplier: 10}
        ]
      },
      {
        low: 31, high: 60, always: [
          {roll: '6d6', name: 'silver', multiplier: 10},
          {roll: '2d6', name: 'gold', multiplier: 10}
        ]
      },
      {
        low: 61, high: 60, always: [
          {roll: '1d6', name: 'electrum', multiplier: 100},
          {roll: '2d6', name: 'gold', multiplier: 10}
        ]
      },
      {
        low: 71, high: 95, always: [
          {roll: '4d6', name: 'gold', multiplier: 10}
        ]
      },
      {
        low: 96, high: 100, always: [
          {roll: '2d6', name: 'gold', multiplier: 10},
          {roll: '3d6', name: 'platinum'}
        ]
      },
    ]
  },
  {
    name: 'medium', low: 11, high: 16,
    roll: 'd100',
    items: [
      {
        low: 1, high: 20, always: [
          {roll: '4d6', name: 'silver', multiplier: 100},
          {roll: '1d6', name: 'gold', multiplier: 100},
        ]
      },
      {
        low: 21, high: 35, always: [
          {roll: '1d6', name: 'electrum', multiplier: 100},
          {roll: '1d6', name: 'gold', multiplier: 100},
        ]
      },
      {
        low: 36, high: 75, always: [
          {roll: '2d6', name: 'gold', multiplier: 100},
          {roll: '1d6', name: 'platinum', multiplier: 10},
        ]
      },
      {
        low: 76, high: 100, always: [
          {roll: '2d6', name: 'gold', multiplier: 100},
          {roll: '2d6', name: 'platinum', multiplier: 10},
        ]
      }
    ]
  },
  {
    name: 'high', low: 17, high: 30,
    roll: 'd100',
    items: [
      {
        low: 1, high: 15, always: [
          {roll: '2d6', name: 'electrum', multiplier: 1000},
          {roll: '8d6', name: 'gold', multiplier: 100},
        ]
      },
      {
        low: 16, high: 55, always: [
          {roll: '1d6', name: 'gold', multiplier: 1000},
          {roll: '1d6', name: 'platinum', multiplier: 100},
        ]
      },
      {
        low: 56, high: 100, always: [
          {roll: '1d6', name: 'gold', multiplier: 1000},
          {roll: '2d6', name: 'platinum', multiplier: 100},
        ]
      }
    ]
  }
];

const hoardTreasure = [
  {
    name: 'nub', low: 0, high: 4,
    always: [
      {roll: '6d6', name: 'copper', multiplier: 100},
      {roll: '3d6', name: 'silver', multiplier: 100},
      {roll: '2d6', name: 'gold', multiplier: 10},
    ],
    roll: 'd100',
    items: [
      {low: 1, high: 6, always: []},
      {low: 7, high: 16, always: [{roll: '2d6', name: '10 gp gems'}]},
      {low: 17, high: 26, always: [{roll: '2d4', name: '25 gp art objects'}]},
      {low: 27, high: 36, always: [{roll: '2d6', name: '50 gp gems'}]},
      {low: 37, high: 44, always: [{roll: '2d6', name: '10 gp gems'}, {roll: '1d6', table: 'a'}]},
      {low: 45, high: 52, always: [{roll: '2d4', name: '25 gp art objects'}, {roll: '1d6', table: 'a'}]},
      {low: 53, high: 60, always: [{roll: '2d6', name: '50 gp gems'}, {roll: '1d6', table: 'a'}]},
      {low: 61, high: 65, always: [{roll: '2d6', name: '10 gp gems'}, {roll: '1d6', table: 'b'}]},
      {low: 66, high: 70, always: [{roll: '2d4', name: '25 gp art objects'}, {roll: '1d6', table: 'b'}]},
      {low: 71, high: 75, always: [{roll: '2d6', name: '50 gp gems'}, {roll: '1d6', table: 'b'}]},
      {low: 76, high: 78, always: [{roll: '2d6', name: '10 gp gems'}, {roll: '1d6', table: 'c'}]},
      {low: 79, high: 80, always: [{roll: '2d4', name: '25 gp art objects'}, {roll: '1d6', table: 'c'}]},
      {low: 81, high: 85, always: [{roll: '2d6', name: '50 gp gems'}, {roll: '1d6', table: 'c'}]},
      {low: 86, high: 92, always: [{roll: '2d4', name: '25 gp art objects'}, {roll: '1d6', table: 'f'}]},
      {low: 93, high: 97, always: [{roll: '2d6', name: '50 gp gems'}, {roll: '1d6', table: 'f'}]},
      {low: 98, high: 99, always: [{roll: '2d4', name: '25 gp art objects'}, {roll: '1d6', table: 'g'}]},
      {low: 100, high: 100, always: [{roll: '2d6', name: '50 gp gems'}, {roll: '1d6', table: 'g'}]},
    ]
  },
  {
    name: 'low', low: 5, high: 10,
    always: [
      {roll: '2d6', name: 'copper', multiplier: 100},
      {roll: '2d6', name: 'silver', multiplier: 1000},
      {roll: '6d6', name: 'gold', multiplier: 100},
      {roll: '3d6', name: 'platinum'},
    ],
    roll: 'd100',
    items: [
      {low: 1, high: 4},
      {low: 5, high: 10, always: [{roll: '2d4', name: '25 gp art objects'}]},
      {low: 11, high: 16, always: [{roll: '3d6', name: '50 gp gem'}]},
      {low: 17, high: 22, always: [{roll: '3d6', name: '100 gp gems'}]},
      {low: 23, high: 28, always: [{roll: '2d4', name: '25 gp art objects'}]},
      {low: 29, high: 32, always: [{roll: '2d4', name: '25 gp art objects'}, {roll: '1d6', table: 'a'}]},
      {low: 33, high: 36, always: [{roll: '3d6', name: '50 gp gems'}, {roll: '1d6', table: 'a'}]},
      {low: 37, high: 40, always: [{roll: '3d6', name: '100 gp gems'}, {roll: '1d6', table: 'a'}]},
      {low: 41, high: 44, always: [{roll: '2d4', name: '250 gp art objects'}, {roll: '1d6', table: 'a'}]},
      {low: 45, high: 49, always: [{roll: '2d4', name: '25 gp art objects'}, {roll: '1d4', table: 'b'}]},
      {low: 50, high: 54, always: [{roll: '3d6', name: '50 gp gems'}, {roll: '1d4', table: 'b'}]},
      {low: 55, high: 59, always: [{roll: '3d6', name: '100 gp gems'}, {roll: '1d4', table: 'b'}]},
      {low: 60, high: 63, always: [{roll: '2d4', name: '250 gp art objects'}, {roll: '1d4', table: 'b'}]},
      {low: 64, high: 66, always: [{roll: '2d4', name: '25 gp art objects'}, {roll: '1d4', table: 'c'}]},
      {low: 67, high: 69, always: [{roll: '3d6', name: '50 gp gems'}, {roll: '1d4', table: 'c'}]},
      {low: 70, high: 72, always: [{roll: '3d6', name: '100 gp gems'}, {roll: '1d4', table: 'c'}]},
      {low: 73, high: 74, always: [{roll: '2d4', name: '250 gp art objects'}, {roll: '1d4', table: 'c'}]},
      {low: 75, high: 76, always: [{roll: '2d4', name: '25 gp art objects'}, {roll: '1', table: 'd'}]},
      {low: 77, high: 78, always: [{roll: '3d6', name: '50 gp gems'}, {roll: '1', table: 'd'}]},
      {low: 79, high: 79, always: [{roll: '3d6', name: '100 gp gems'}, {roll: '1', table: 'd'}]},
      {low: 80, high: 80, always: [{roll: '2d4', name: '250 gp art objects'}, {roll: '1', table: 'd'}]},
      {low: 81, high: 84, always: [{roll: '2d4', name: '25 gp art objects'}, {roll: '1d4', table: 'f'}]},
      {low: 85, high: 88, always: [{roll: '3d6', name: '50 gp gems'}, {roll: '1d4', table: 'f'}]},
      {low: 89, high: 91, always: [{roll: '3d6', name: '100 gp gems'}, {roll: '1d4', table: 'f'}]},
      {low: 92, high: 94, always: [{roll: '2d4', name: '250 gp art objects'}, {roll: '1d4', table: 'f'}]},
      {low: 95, high: 96, always: [{roll: '3d6', name: '100 gp gems'}, {roll: '1d6', table: 'g'}]},
      {low: 97, high: 98, always: [{roll: '2d4', name: '250 gp art objects'}, {table: 'g'}]},
      {low: 99, high: 99, always: [{roll: '3d6', name: '100 gp gems'}, {table: 'h'}]},
      {low: 100, high: 100, always: [{roll: '2d4', name: '250 gp art objects'}, {table: 'h'}]},
    ]
  },
  {
    name: 'medium', low: 11, high: 16,
    always: [
      {roll: '4d6', name: 'gold', multiplier: 1000},
      {roll: '35d6', name: 'platinum', multiplier: 100},
    ],
    roll: 'd100',
    items: [
      {low: 1, high: 3},
      {low: 4, high: 6, always: [{roll: '2d4', name: '250 gp art objects'}]},
      {low: 7, high: 10, always: [{roll: '2d4', name: '750 gp art objects'}]},
      {low: 11, high: 12, always: [{roll: '3d6', name: '500 gp gems'}]},
      {low: 13, high: 15, always: [{roll: '3d6', name: '1000 gp gems'}]},
      {
        low: 16, high: 19, always: [
          {roll: '2d4', name: '250 gp art objects'},
          {roll: '1d4', table: 'a'},
          {roll: '1d6', table: 'b'},
        ]
      },
      {
        low: 20, high: 23, always: [
          {roll: '2d4', name: '750 gp art objects'},
          {roll: '1d4', table: 'a'},
          {roll: '1d6', table: 'b'},
        ]
      },
      {
        low: 24, high: 26, always: [
          {roll: '3d6', name: '500 gp gems'},
          {roll: '1d4', table: 'a'},
          {roll: '1d6', table: 'b'},
        ]
      },
      {
        low: 27, high: 29, always: [
          {roll: '3d6', name: '1000 gp gems'},
          {roll: '1d4', table: 'a'},
          {roll: '1d6', table: 'b'},
        ]
      },
      {
        low: 30, high: 35, always: [
          {roll: '2d4', name: '250 gp art objects'},
          {roll: '1d6', table: 'c'},
        ]
      },
      {
        low: 36, high: 40, always: [
          {roll: '2d4', name: '750 gp art objects'},
          {roll: '1d6', table: 'c'},
        ]
      },
      {
        low: 41, high: 45, always: [
          {roll: '3d6', name: '500 gp gems'},
          {roll: '1d6', table: 'c'},
        ]
      },
      {
        low: 46, high: 50, always: [
          {roll: '3d6', name: '1000 gp gems'},
          {roll: '1d6', table: 'c'},
        ]
      },
      {
        low: 51, high: 54, always: [
          {roll: '2d4', name: '250 gp art objects'},
          {roll: '1d4', table: 'd'},
        ]
      },
      {
        low: 55, high: 58, always: [
          {roll: '2d4', name: '750 gp art objects'},
          {roll: '1d4', table: 'd'},
        ]
      },
      {
        low: 59, high: 62, always: [
          {roll: '3d6', name: '500 gp gems'},
          {roll: '1d4', table: 'd'},
        ]
      },
      {
        low: 63, high: 66, always: [
          {roll: '3d6', name: '1000 gp gems'},
          {roll: '1d4', table: 'd'},
        ]
      },
      {
        low: 67, high: 68, always: [
          {roll: '2d4', name: '250 gp art objects'},
          {table: 'e'},
        ]
      },
      {
        low: 69, high: 70, always: [
          {roll: '2d4', name: '750 gp art objects'},
          {table: 'e'},
        ]
      },
      {
        low: 71, high: 72, always: [
          {roll: '3d6', name: '500 gp gems'},
          {table: 'e'},
        ]
      },
      {
        low: 73, high: 74, always: [
          {roll: '3d6', name: '1000 gp gems'},
          {table: 'e'},
        ]
      },
      {
        low: 75, high: 76, always: [
          {roll: '2d4', name: '250 gp art objects'},
          {table: 'f'},
          {roll: '1d4', table: 'g'},
        ]
      },
      {
        low: 77, high: 78, always: [
          {roll: '2d4', name: '750 gp art objects'},
          {table: 'f'},
          {roll: '1d4', table: 'g'},
        ]
      },
      {
        low: 79, high: 80, always: [
          {roll: '3d6', name: '500 gp gems'},
          {table: 'f'},
          {roll: '1d4', table: 'g'},
        ]
      },
      {
        low: 81, high: 82, always: [
          {roll: '3d6', name: '1000 gp gems'},
          {table: 'f'},
          {roll: '1d4', table: 'g'},
        ]
      },
      {
        low: 83, high: 85, always: [
          {roll: '2d4', name: '250 gp art objects'},
          {roll: '1d4', table: 'h'},
        ]
      },
      {
        low: 86, high: 88, always: [
          {roll: '2d4', name: '750 gp art objects'},
          {roll: '1d4', table: 'h'},
        ]
      },
      {
        low: 89, high: 90, always: [
          {roll: '3d6', name: '500 gp gems'},
          {roll: '1d4', table: 'h'},
        ]
      },
      {
        low: 91, high: 92, always: [
          {roll: '3d6', name: '1000 gp gems'},
          {roll: '1d4', table: 'h'},
        ]
      },
      {
        low: 93, high: 94, always: [
          {roll: '2d4', name: '250 gp art objects'},
          {table: 'i'},
        ]
      },
      {
        low: 95, high: 96, always: [
          {roll: '2d4', name: '750 gp art objects'},
          {table: 'i'},
        ]
      },
      {
        low: 97, high: 98, always: [
          {roll: '3d6', name: '500 gp gems'},
          {table: 'i'},
        ]
      },
      {
        low: 99, high: 100, always: [
          {roll: '3d6', name: '1000 gp gems'},
          {table: 'i'},
        ]
      },
    ]
  },
  {
    name: 'high', low: 17, high: 30,
    always: [
      {roll: '12d6', name: 'gold', multiplier: 1000},
      {roll: '8d6', name: 'platinum', multiplier: 1000},
    ],
    roll: 'd100',
    items: [
      {low: 1, high: 2},
      {low: 3, high: 5, always: [{roll: '3d6', name: '1000 gp gems'}, {roll: '1d8', table: 'c'}]},
      {low: 6, high: 8, always: [{roll: '1d10', name: '2500 gp art objects'}, {roll: '1d8', table: 'c'}]},
      {low: 9, high: 11, always: [{roll: '1d4', name: '7500 gp art objects'}, {roll: '1d8', table: 'c'}]},
      {low: 12, high: 14, always: [{roll: '1d8', name: '5000 gp gems'}, {roll: '1d8', table: 'c'}]},
      {low: 15, high: 22, always: [{roll: '3d6', name: '1000 gp gems'}, {roll: '1d6', table: 'd'}]},
      {low: 23, high: 30, always: [{roll: '1d10', name: '2500 gp art objects'}, {roll: '1d6', table: 'd'}]},
      {low: 31, high: 38, always: [{roll: '1d4', name: '7500 gp art objects'}, {roll: '1d6', table: 'd'}]},
      {low: 39, high: 46, always: [{roll: '1d8', name: '5000 gp gems'}, {roll: '1d6', table: 'd'}]},
      {low: 47, high: 52, always: [{roll: '3d6', name: '1000 gp gems'}, {roll: '1d6', table: 'e'}]},
      {low: 53, high: 58, always: [{roll: '1d10', name: '2500 gp art objects'}, {roll: '1d6', table: 'e'}]},
      {low: 59, high: 63, always: [{roll: '1d4', name: '7500 gp art objects'}, {roll: '1d6', table: 'e'}]},
      {low: 64, high: 68, always: [{roll: '1d8', name: '5000 gp gems'}, {roll: '1d6', table: 'e'}]},
      {low: 69, high: 69, always: [{roll: '3d6', name: '1000 gp gems'}, {roll: '1d4', table: 'g'}]},
      {low: 70, high: 70, always: [{roll: '1d10', name: '2500 gp art objects'}, {roll: '1d4', table: 'g'}]},
      {low: 71, high: 71, always: [{roll: '1d4', name: '7500 gp art objects'}, {roll: '1d4', table: 'g'}]},
      {low: 72, high: 72, always: [{roll: '1d8', name: '5000 gp gems'}, {roll: '1d4', table: 'g'}]},
      {low: 73, high: 74, always: [{roll: '3d6', name: '1000 gp gems'}, {roll: '1d4', table: 'h'}]},
      {low: 75, high: 76, always: [{roll: '1d10', name: '2500 gp art objects'}, {roll: '1d4', table: 'h'}]},
      {low: 77, high: 78, always: [{roll: '1d4', name: '7500 gp art objects'}, {roll: '1d4', table: 'h'}]},
      {low: 79, high: 80, always: [{roll: '1d8', name: '5000 gp gems'}, {roll: '1d4', table: 'h'}]},
      {low: 81, high: 85, always: [{roll: '3d6', name: '1000 gp gems'}, {roll: '1d4', table: 'i'}]},
      {low: 86, high: 90, always: [{roll: '1d10', name: '2500 gp art objects'}, {roll: '1d4', table: 'i'}]},
      {low: 91, high: 95, always: [{roll: '1d4', name: '7500 gp art objects'}, {table: 'f'}, {roll: '1d4', table: 'g'}]},
      {low: 96, high: 100, always: [{roll: '1d8', name: '5000 gp gems'}, {roll: '1d4', table: 'i'}]},
    ]
  }
];

const treasureTables = {
  a: {
    roll: 'd100',
    items: [
      {low: 1, high: 50, name: `potion of healing`},
      {low: 51, high: 60, name: `spell scroll (cantrip)`},
      {low: 61, high: 70, name: `potion of climbing`},
      {low: 71, high: 90, name: `spell scroll (1st level)`},
      {low: 91, high: 94, name: `spell scroll (2nd level)`},
      {low: 95, high: 98, name: `potion of greater healing`},
      {low: 99, high: 99, name: `bag of holding`},
      {low: 100, high: 100, name: `driftglobe`},
    ]
  },
  b: {
    roll: 'd100',
    items: [
      {low: 1, high: 15, name: `potion of greater healing`},
      {low: 16, high: 22, name: `potion of fire breath`},
      {low: 23, high: 29, name: `potion of resistance`},
      {low: 30, high: 34, name: `ammunition, +1`},
      {low: 35, high: 39, name: `potion of animal friendship`},
      {low: 40, high: 44, name: `potion of hill giant strength`},
      {low: 45, high: 49, name: `potion of growth`},
      {low: 50, high: 54, name: `potion of water breathing`},
      {low: 55, high: 59, name: `spell scroll (2nd level)`},
      {low: 60, high: 64, name: `spell scroll (3rd level)`},
      {low: 65, high: 67, name: `bag of holding`},
      {low: 68, high: 70, name: `keoghtom's ointment`},
      {low: 71, high: 73, name: `oil of slipperiness`},
      {low: 74, high: 75, name: `dust of disappearance`},
      {low: 76, high: 77, name: `dust of dryness`},
      {low: 78, high: 79, name: `dust of sneezing and choking`},
      {low: 80, high: 81, name: `elemental gem`},
      {low: 82, high: 83, name: `philter of love`},
      {low: 84, high: 84, name: `alchemy jug`},
      {low: 85, high: 85, name: `cap of water breathing`},
      {low: 86, high: 86, name: `cloak of the manta ray`},
      {low: 87, high: 87, name: `driftglobe`},
      {low: 88, high: 88, name: `goggles of night`},
      {low: 89, high: 89, name: `helm of comprehending languages`},
      {low: 90, high: 90, name: `immovable rod`},
      {low: 91, high: 91, name: `lantern of revealing`},
      {low: 92, high: 92, name: `mariner's armor`},
      {low: 93, high: 93, name: `mithral armor`},
      {low: 94, high: 94, name: `potion of poison`},
      {low: 95, high: 95, name: `ring of swimming`},
      {low: 96, high: 96, name: `robe of useful items`},
      {low: 97, high: 97, name: `rope of climbing`},
      {low: 98, high: 98, name: `saddle of the cavalier`},
      {low: 99, high: 99, name: `wand of magic detection`},
      {low: 100, high: 100, name: `wand of secrets`},
    ]
  },
  c: {
    roll: 'd100',
    items: [
      {low: 1, high: 15, name: `potion of superior healing`},
      {low: 16, high: 22, name: `spell scroll (4th level)`},
      {low: 23, high: 27, name: `ammunition, +2`},
      {low: 28, high: 32, name: `potion of clairvoyance`},
      {low: 33, high: 37, name: `potion of diminution`},
      {low: 38, high: 42, name: `potion of gaseous form`},
      {low: 43, high: 47, name: `potion of frost giant strength`},
      {low: 48, high: 52, name: `potion of stone giant strength`},
      {low: 53, high: 57, name: `potion of heroism`},
      {low: 58, high: 62, name: `potion of invulnerability`},
      {low: 63, high: 67, name: `potion of mind reading`},
      {low: 68, high: 72, name: `spell scroll (5thlevel)`},
      {low: 73, high: 75, name: `elixir of health`},
      {low: 76, high: 78, name: `oil of etherealness`},
      {low: 79, high: 81, name: `potion of fire giant strength`},
      {low: 82, high: 84, name: `quaal's feather token`},
      {low: 85, high: 87, name: `scroll of protection`},
      {low: 88, high: 89, name: `bag of beans`},
      {low: 90, high: 91, name: `bead of force`},
      {low: 92, high: 92, name: `chime of opening`},
      {low: 93, high: 93, name: `decanter of endless water`},
      {low: 94, high: 94, name: `eyes of minute seeing`},
      {low: 95, high: 95, name: `folding boat`},
      {low: 96, high: 96, name: `heward's handy haversack`},
      {low: 97, high: 97, name: `horseshoes of speed`},
      {low: 98, high: 98, name: `necklace of fireballs`},
      {low: 99, high: 99, name: `periapt of health`},
      {low: 100, high: 100, name: `sending stones`},]
  },
  d: {
    roll: 'd100',
    items: [
      {low: 1, high: 20, name: `potion of supreme healing`},
      {low: 21, high: 30, name: `potion of invisibility`},
      {low: 31, high: 40, name: `potion of speed`},
      {low: 41, high: 50, name: `spell scroll (6thlevel)`},
      {low: 51, high: 57, name: `spell scroll (7thlevel)`},
      {low: 58, high: 62, name: `ammunition, +3`},
      {low: 63, high: 67, name: `oil of sharpness`},
      {low: 68, high: 72, name: `potion of flying`},
      {low: 73, high: 77, name: `potion of cloud giant strength`},
      {low: 78, high: 82, name: `potion of longevity`},
      {low: 83, high: 87, name: `potion of vitality`},
      {low: 88, high: 92, name: `spell scroll (8thlevel)`},
      {low: 93, high: 95, name: `horseshoes of a zephyr`},
      {low: 96, high: 98, name: `nolzur's marvelous pigments`},
      {low: 99, high: 99, name: `bag of devouring`},
      {low: 100, high: 100, name: `portable hole`},
    ]
  },
  e: {
    roll: 'd100',
    items: [
      {low: 1, high: 30, name: `spell scroll (8thlevel)`},
      {low: 31, high: 55, name: `potion of storm giant strength`},
      {low: 56, high: 70, name: `poti on of supreme healing`},
      {low: 71, high: 85, name: `spell scroll (9st level)`},
      {low: 86, high: 93, name: `universal solvent`},
      {low: 94, high: 98, name: `arrow of slaying`},
      {low: 99, high: 100, name: `sovereign glue`},
    ]
  },
  f: {
    roll: 'd100',
    items: [
      {low: 1, high: 15, name: `weapon, +1`},
      {low: 16, high: 18, name: `shield,+ 1`},
      {low: 19, high: 21, name: `sentinel shield`},
      {low: 22, high: 23, name: `amulet of proof against detection and location`},
      {low: 24, high: 25, name: `boots of elvenkind`},
      {low: 26, high: 27, name: `boots of striding and springing`},
      {low: 27, high: 29, name: `bracers of archery`},
      {low: 30, high: 31, name: `brooch of shielding`},
      {low: 32, high: 33, name: `broom of flying`},
      {low: 34, high: 35, name: `cloak of elvenkind`},
      {low: 36, high: 37, name: `cloak of protection`},
      {low: 38, high: 39, name: `gauntlets of ogre power`},
      {low: 40, high: 41, name: `hat of disguise`},
      {low: 42, high: 43, name: `javelin of lightning`},
      {low: 44, high: 45, name: `pearl of power`},
      {low: 46, high: 47, name: `rod of the pact keeper, + 1`},
      {low: 48, high: 49, name: `slippers of spider climbing`},
      {low: 50, high: 51, name: `staff of the adder`},
      {low: 52, high: 53, name: `staff of the python`},
      {low: 54, high: 55, name: `sword of vengeance`},
      {low: 56, high: 57, name: `trident of fish command`},
      {low: 58, high: 59, name: `wand of magic missiles`},
      {low: 60, high: 61, name: `wand of the war mage, + 1`},
      {low: 62, high: 63, name: `wand of web`},
      {low: 64, high: 65, name: `weapon of warning`},
      {low: 66, high: 66, name: `adamantine armor (chain mail)`},
      {low: 67, high: 67, name: `adamantine armor (chain shirt)`},
      {low: 68, high: 68, name: `adamantine armor (scale mail)`},
      {low: 69, high: 69, name: `bag of tricks (gray)`},
      {low: 70, high: 70, name: `bag of tricks (rust)`},
      {low: 71, high: 71, name: `bag of tricks (tan)`},
      {low: 72, high: 72, name: `boots of the winterlands`},
      {low: 73, high: 73, name: `circlet of blasting`},
      {low: 74, high: 74, name: `deck of illusions`},
      {low: 75, high: 75, name: `eversmoking bottle`},
      {low: 76, high: 76, name: `eyes of charming`},
      {low: 77, high: 77, name: `eyes of the eagle`},
      {low: 78, high: 78, name: `figurine of wondrous power (silver raven)`},
      {low: 79, high: 79, name: `gem of brightness`},
      {low: 80, high: 80, name: `gloves of missile snaring`},
      {low: 81, high: 81, name: `gloves of swimming and climbing`},
      {low: 82, high: 82, name: `gloves of thievery`},
      {low: 83, high: 83, name: `headband of intellect`},
      {low: 84, high: 84, name: `helm of telepathy`},
      {low: 85, high: 85, name: `instrument of the bards (doss lute)`},
      {low: 86, high: 86, name: `instrument of the bards (fochlucan bandore)`},
      {low: 87, high: 87, name: `instrument of the bards (mac-fuimidh cittern)`},
      {low: 88, high: 88, name: `medallion of thoughts`},
      {low: 89, high: 89, name: `necklace of adaptation`},
      {low: 90, high: 90, name: `periapt of wound closure`},
      {low: 91, high: 91, name: `pipes of haunting`},
      {low: 92, high: 92, name: `pipes of the sewers`},
      {low: 93, high: 93, name: `ring of jumping`},
      {low: 94, high: 94, name: `ring of mind shielding`},
      {low: 95, high: 95, name: `ring of warmth`},
      {low: 96, high: 96, name: `ring of water walking`},
      {low: 97, high: 97, name: `quiver of ehlonna`},
      {low: 98, high: 98, name: `stone of good luck`},
      {low: 99, high: 99, name: `wind fan`},
      {low: 100, high: 100, name: `winged boots`},
    ]
  },
  g: {
    roll: 'd100',
    items: [
      {low: 1, high: 11, name: `weapon, +2`},
      {low: 12, high: 14, name: `figurine of wondrous power`},
      {low: 15, high: 15, name: `adamantine armor (breastplate)`},
      {low: 16, high: 16, name: `adamantine armor (splint)`},
      {low: 17, high: 17, name: `amulet of health`},
      {low: 18, high: 18, name: `armor of vulnerability`},
      {low: 19, high: 19, name: `arrow-catching shield`},
      {low: 20, high: 20, name: `belt of dwarvenkind`},
      {low: 21, high: 21, name: `belt of hill giant strength`},
      {low: 22, high: 22, name: `berserker axe`},
      {low: 23, high: 23, name: `boots of levitation`},
      {low: 24, high: 24, name: `boots of speed`},
      {low: 25, high: 25, name: `bowl of commanding water elementals`},
      {low: 26, high: 26, name: `bracers of defense`},
      {low: 27, high: 27, name: `brazier of commanding fire elementals`},
      {low: 28, high: 28, name: `cape of the mountebank`},
      {low: 29, high: 29, name: `censer of controlling air elementals`},
      {low: 30, high: 30, name: `armor, +1 chain mail`},
      {low: 31, high: 31, name: `armor of resistance (chain mail)`},
      {low: 32, high: 32, name: `armor of resistance (chain shirt)`},
      {low: 33, high: 33, name: `armor,+ 1 chain shirt`},
      {low: 34, high: 34, name: `cloak of displacement`},
      {low: 35, high: 35, name: `cloak of the bat`},
      {low: 36, high: 36, name: `cube of force`},
      {low: 37, high: 37, name: `daern's instant fortress`},
      {low: 38, high: 38, name: `dagger of venom`},
      {low: 39, high: 39, name: `dimensional shackles`},
      {low: 40, high: 40, name: `dragon slayer`},
      {low: 41, high: 41, name: `elven chain`},
      {low: 42, high: 42, name: `flame tongue`},
      {low: 43, high: 43, name: `gem of seeing`},
      {low: 44, high: 44, name: `giant slayer`},
      {low: 45, high: 45, name: `clamoured studded leather`},
      {low: 46, high: 46, name: `helm of teleportation`},
      {low: 47, high: 47, name: `horn of blasting`},
      {low: 48, high: 48, name: `horn of valhalla (silver or brass)`},
      {low: 49, high: 49, name: `instrument of the bards (canaithmandolin)`},
      {low: 50, high: 50, name: `instrument ofthe bards (cii lyre)`},
      {low: 51, high: 51, name: `loun stone (awareness)`},
      {low: 52, high: 52, name: `loun stone (protection)`},
      {low: 53, high: 53, name: `loun stone (reserve)`},
      {low: 54, high: 54, name: `loun stone (sustenance)`},
      {low: 55, high: 55, name: `iron bands of bilarro`},
      {low: 56, high: 56, name: `armor, + 1 leather`},
      {low: 57, high: 57, name: `armor of resistance (leather)`},
      {low: 58, high: 58, name: `mace of disruption`},
      {low: 59, high: 59, name: `mace of smiting`},
      {low: 60, high: 60, name: `mace of terror`},
      {low: 61, high: 61, name: `mantle of spell resistance`},
      {low: 62, high: 62, name: `necklace of prayer beads`},
      {low: 63, high: 63, name: `periapt of proof against poison`},
      {low: 64, high: 64, name: `ring of animal influence`},
      {low: 65, high: 65, name: `ring of evasion`},
      {low: 66, high: 66, name: `ring of feather falling`},
      {low: 67, high: 67, name: `ring of free action`},
      {low: 68, high: 68, name: `ring of protection`},
      {low: 69, high: 69, name: `ring of resistance`},
      {low: 70, high: 70, name: `ring of spell storing`},
      {low: 71, high: 71, name: `ring of the ram`},
      {low: 72, high: 72, name: `ring of x-ray vision`},
      {low: 73, high: 73, name: `robe of eyes`},
      {low: 74, high: 74, name: `rod of rulership`},
      {low: 75, high: 75, name: `rod of the pact keeper, +2`},
      {low: 76, high: 76, name: `rope of entanglement`},
      {low: 77, high: 77, name: `armor, +1 scale mail`},
      {low: 78, high: 78, name: `armor of resistance (scale mail)`},
      {low: 79, high: 79, name: `shield, +2`},
      {low: 80, high: 80, name: `shield of missile attraction`},
      {low: 81, high: 81, name: `staff of charming`},
      {low: 82, high: 82, name: `staff of healing`},
      {low: 83, high: 83, name: `staff of swarming insects`},
      {low: 84, high: 84, name: `staff of the woodlands`},
      {low: 85, high: 85, name: `staff of withering`},
      {low: 86, high: 86, name: `stone of controlling earthelementals`},
      {low: 87, high: 87, name: `sun blade`},
      {low: 88, high: 88, name: `sword of life stealing`},
      {low: 89, high: 89, name: `sword of wounding`},
      {low: 90, high: 90, name: `tentacle rod`},
      {low: 91, high: 91, name: `vicious weapon`},
      {low: 92, high: 92, name: `wand of binding`},
      {low: 93, high: 93, name: `wand of enemy detection`},
      {low: 94, high: 94, name: `wand of fear`},
      {low: 95, high: 95, name: `wand of fireballs`},
      {low: 96, high: 96, name: `wand of lightning bolts`},
      {low: 97, high: 97, name: `wand of paralysis`},
      {low: 98, high: 98, name: `wand of the war mage, +2`},
      {low: 99, high: 99, name: `wand of wonder`},
      {low: 100, high: 100, name: `wings of flying`},
    ]
  },
  h: {
    roll: 'd100',
    items: [
      {low: 1, high: 10, name: `weapon, +3`},
      {low: 11, high: 12, name: `amulet of the planes`},
      {low: 13, high: 14, name: `carpet of flying`},
      {low: 15, high: 16, name: `crystal ball (very rare version)`},
      {low: 17, high: 18, name: `ring of regeneration`},
      {low: 19, high: 20, name: `ring of shooting stars`},
      {low: 21, high: 22, name: `ring of telekinesis`},
      {low: 23, high: 24, name: `robe of scintillating colors`},
      {low: 25, high: 26, name: `robe of stars`},
      {low: 27, high: 28, name: `rod of absorption`},
      {low: 29, high: 30, name: `rod of alertness`},
      {low: 31, high: 32, name: `rod of security`},
      {low: 33, high: 34, name: `rod of the pact keeper, +3`},
      {low: 35, high: 36, name: `scimitar of speed`},
      {low: 37, high: 38, name: `shield, +3`},
      {low: 39, high: 40, name: `staff of fire`},
      {low: 41, high: 42, name: `staff of frost`},
      {low: 43, high: 44, name: `staff of power`},
      {low: 45, high: 46, name: `staff of striking`},
      {low: 47, high: 48, name: `staff of thunder and lightning`},
      {low: 49, high: 50, name: `sword of sharpnes`},
      {low: 51, high: 52, name: `wand of polymorph`},
      {low: 53, high: 54, name: `wand of the war mage, + 3`},
      {low: 55, high: 55, name: `adamantine armor (half plate)`},
      {low: 56, high: 56, name: `adamantine armor (plate)`},
      {low: 57, high: 57, name: `animated shield`},
      {low: 58, high: 58, name: `belt of fire giant strength`},
      {low: 59, high: 59, name: `belt of frost (or stone) giant strength`},
      {low: 60, high: 60, name: `armor, + 1 breastplate`},
      {low: 61, high: 61, name: `armor of resistance (breastplate)`},
      {low: 62, high: 62, name: `candle of invocation`},
      {low: 63, high: 63, name: `armor, +2 chain mail`},
      {low: 64, high: 64, name: `armor, +2 chain shirt`},
      {low: 65, high: 65, name: `cloak of arachnida`},
      {low: 66, high: 66, name: `dancing sword`},
      {low: 67, high: 67, name: `demon armor`},
      {low: 68, high: 68, name: `dragon scale mail`},
      {low: 69, high: 69, name: `dwarven plate`},
      {low: 70, high: 70, name: `dwarven thrower`},
      {low: 71, high: 71, name: `efreeti bottle`},
      {low: 72, high: 72, name: `figurine of wondrous power (obsidian steed)`},
      {low: 73, high: 73, name: `frost brand`},
      {low: 74, high: 74, name: `helm of brilliance`},
      {low: 75, high: 75, name: `horn ofvalhalla (bronze)`},
      {low: 76, high: 76, name: `instrument of the bards (anstruthharp)`},
      {low: 77, high: 77, name: `loun stone (absorption)`},
      {low: 78, high: 78, name: `loun stone (agility)`},
      {low: 79, high: 79, name: `loun stone (fortitude)`},
      {low: 80, high: 80, name: `loun stone (insight)`},
      {low: 81, high: 81, name: `loun stone (intellect)`},
      {low: 82, high: 82, name: `loun stone (leadership)`},
      {low: 83, high: 83, name: `loun stone (strength)`},
      {low: 84, high: 84, name: `armor, +2 leather`},
      {low: 85, high: 85, name: `manual of bodily health`},
      {low: 86, high: 86, name: `manual of gainful exercise`},
      {low: 87, high: 87, name: `manual of golems`},
      {low: 88, high: 88, name: `manual of quickness of action`},
      {low: 89, high: 89, name: `mirror of life trapping`},
      {low: 90, high: 90, name: `nine lives stealer`},
      {low: 91, high: 91, name: `oathbow`},
      {low: 92, high: 92, name: `armor, +2 scale mail`},
      {low: 93, high: 93, name: `spellguard shield`},
      {low: 94, high: 94, name: `armor, + 1 splint`},
      {low: 95, high: 95, name: `armor of resistance (splint)`},
      {low: 96, high: 96, name: `armor, + 1 studded leather`},
      {low: 97, high: 97, name: `armor of resistance (studded leather)`},
      {low: 98, high: 98, name: `tome of clear thought`},
      {low: 99, high: 99, name: `tome of leadership and influence`},
      {low: 100, high: 100, name: `tome of understanding`},
    ]
  },
  i: {
    roll: 'd100',
    item: [
      {low: 1, high: 5, name: `defender`},
      {low: 6, high: 10, name: `hammer of thunderbolts`},
      {low: 16, high: 20, name: `sword of answering`},
      {low: 21, high: 23, name: `holy avenger`},
      {low: 24, high: 26, name: `ring of djinni summoning`},
      {low: 27, high: 29, name: `ring of invisibility`},
      {low: 30, high: 32, name: `ring of spell turning`},
      {low: 36, high: 38, name: `rod of lordly might`},
      {low: 39, high: 41, name: `vorpal sword`},
      {low: 42, high: 43, name: `belt of cloud giant strength`},
      {low: 44, high: 45, name: `armor, +2 breastplate`},
      {low: 46, high: 47, name: `armor, +3 chain mail`},
      {low: 48, high: 49, name: `armor, +3 chain shirt`},
      {low: 50, high: 51, name: `cloak of invisibility`},
      {low: 52, high: 53, name: `crystal ball (legendary version)`},
      {low: 54, high: 55, name: `armor, + 1 half plate`},
      {low: 56, high: 57, name: `iron flask`},
      {low: 58, high: 59, name: `armor, +3 leather`},
      {low: 60, high: 61, name: `armor, +1 plate`},
      {low: 62, high: 63, name: `robe of the archmagi`},
      {low: 64, high: 65, name: `rod of resurrection`},
      {low: 66, high: 67, name: `armor, +1 scale mail`},
      {low: 68, high: 69, name: `scarab of protection`},
      {low: 70, high: 71, name: `armor, +2 splint`},
      {low: 72, high: 73, name: `armor, +2 studded leather`},
      {low: 74, high: 75, name: `well of many worlds`},
      {low: 76, high: 76, name: `magic armor`},
      {low: 77, high: 77, name: `apparatus of kwalish`},
      {low: 78, high: 78, name: `armor of invulnerability`},
      {low: 79, high: 79, name: `belt of storm giant strength`},
      {low: 80, high: 80, name: `cubic gate`},
      {low: 81, high: 81, name: `deck of many things`},
      {low: 82, high: 82, name: `efreeti chain`},
      {low: 83, high: 83, name: `armor of resistance (half plate)`},
      {low: 84, high: 84, name: `horn ofvalhalla (iron)`},
      {low: 85, high: 85, name: `instrument of the bards (oiiamh harp)`},
      {low: 86, high: 86, name: `loun stone (greater absorption)`},
      {low: 87, high: 87, name: `loun stone (mastery)`},
      {low: 88, high: 88, name: `loun stone (regeneration)`},
      {low: 89, high: 89, name: `plate armor of etherealness`},
      {low: 90, high: 90, name: `plate armor of resistance`},
      {low: 91, high: 91, name: `ring of air elemental command`},
      {low: 92, high: 92, name: `ring of earthelemental command`},
      {low: 93, high: 93, name: `ring of fire elemental command`},
      {low: 94, high: 94, name: `ring of three wishes`},
      {low: 95, high: 95, name: `ring of water elemental command`},
      {low: 96, high: 96, name: `sphere of annihilation`},
      {low: 97, high: 97, name: `talisman of pure good`},
      {low: 98, high: 98, name: `talisman of the sphere`},
      {low: 99, high: 99, name: `talisman of ultimate evil`},
      {low: 100, high: 100, name: `tome of the stilled tongue`},
    ]
  }
};

const treasureDetails = {
  'figurine of wondrous power': {
    roll: 'd8',
    items: [
      {low: 1, high: 1, name: 'bronze griffon'},
      {low: 2, high: 2, name: 'ebony fly'},
      {low: 3, high: 3, name: 'golden lions'},
      {low: 4, high: 4, name: 'ivory goats'},
      {low: 5, high: 5, name: 'marble elephant'},
      {low: 6, high: 7, name: 'onyx dog'},
      {low: 8, high: 8, name: 'serpentine owl'},
    ]
  },
  'magic armor': {
    roll: 'd12',
    items: [
      {low: 1, high: 2, name: '+2 half plate'},
      {low: 3, high: 4, name: '+2 plate'},
      {low: 5, high: 6, name: '+3 studded leather'},
      {low: 7, high: 8, name: '+3 breastplate'},
      {low: 9, high: 10, name: '+3 splint'},
      {low: 11, high: 11, name: '+3 half plate'},
      {low: 12, high: 12, name: '+3 plate'},
    ]
  }
};

const makeStuff = (list, mod) => {
  const json = JSON.stringify(list);
  const result = JSON.parse(json);
  const process = [result];
  while (process.length) {
    const next = process.pop();
    if (next.name)
      next.name = mod(next.name);
    if (next.items)
      process.push(...next.items);
    if (next.always)
      process.push(...next.always);
  }
  return result;
};

treasureDetails['weapon, +1'] = makeStuff(weightedWeapons, v => `${v} +1`);
treasureDetails['weapon, +2'] = makeStuff(weightedWeapons, v => `${v} +2`);
treasureDetails['weapon, +3'] = makeStuff(weightedWeapons, v => `${v} +3`);
treasureDetails['ammunition, +1'] = makeStuff(ammunition, v => `${v} +1`);
treasureDetails['ammunition, +2'] = makeStuff(ammunition, v => `${v} +2`);
treasureDetails['ammunition, +3'] = makeStuff(ammunition, v => `${v} +3`);

const tables = {};
Object.keys(treasureTables)
  .forEach(v => tables[v] = new Treasure(treasureTables[v]));

const details = {};
Object.keys(treasureDetails)
  .forEach(v => details[v] = new Treasure(treasureDetails[v]));

const individual = {};
individualTreasure.forEach(v => individual[v.name] = new Treasure(v));

const hoard = {};
hoardTreasure.forEach(v => hoard[v.name] = new Treasure(v));

module.exports = {individual, hoard};
