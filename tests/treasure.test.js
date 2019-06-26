const { individual, hoard } = require('../src/treasure');

[...Array(100).keys()].forEach(() => console.log(hoard.low.executeAll()));

// console.log(hoard.nub.executeAll());