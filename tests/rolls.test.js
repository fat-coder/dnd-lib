const Roll = require('../src/rolls');

const rolls = [
  new Roll('1d4'),
  new Roll('1D4'),
  new Roll('d4'),
  new Roll('2d4+3'),
  new Roll('1d6+str'),
  new Roll('1d4+dex'),
  new Roll('asdfasdf'),
  new Roll('d100'),
];

rolls
.filter(v => v.isValid)
  .forEach(v => console.log(`${v} => ${v.roll()}`));

const d100 = new Roll('d100');
const record = {};
[...Array(100).keys()].forEach(v => record[(v + 1).toString()] = 0);
for (let i = 0; i < 1000000; i++) {
  const roll = d100.roll();
  record[roll.toString()]++;
}
console.log(record);
