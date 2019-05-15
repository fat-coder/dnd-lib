const race = [
  { name: 'dragonborn', strength: 2, charisma: 1, speed: 30 }
];

class Race {
  constructor(json) {
    Object.apply(this, json);
  }
}

const races = race.map(v => new Race(v));

module.exports = races;
