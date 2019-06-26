const rollRegex = /(?<count>\d*)d(?<size>\d+)\+?(?<bonus>\d*)\+?(?<ability>\w*)/i;

class Roll {
  constructor(value) {
    if (value) {
      if (typeof value === 'string') {
        const match = value.match(rollRegex);
        if (match && match.groups) {
          this.count = Number(match.groups.count);
          this.size = Number(match.groups.size);
          this.bonus = Number(match.groups.bonus);
          this.ability = match.groups.ability;
        }
      }
    }
  }

  get isValid() {
    return !!this.size;
  }

  toString() {
    if (!this.isValid)
      return 'invalid';

    let result = '';
    if (this.count)
      result += `${this.count}`;
    result += `d${this.size}`;
    if (this.bonus)
      result += `+${this.bonus}`;
    if (this.ability)
      result += `+${this.ability}`;
    return result;
  }

  roll(stats) {
    if (!this.isValid)
      return Number.NaN;

    let result = 0;
    for (let i = 0; i < (this.count || 1); i++) {
      result += Math.trunc(Math.random() * this.size) + 1;
    }
    result += this.bonus;

    if (stats && stats[this.ability] && Number.isSafeInteger(stats[this.ability]))
      result += stats[this.ability];

    // console.log(`${this} = ${result}`);
    return result;
  }
}

module.exports = Roll;
