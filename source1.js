"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const data = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
];
_.filter([1, 2, 3], _.identity);
_.orderBy(data, 'value');
const numbers = _.range(1, 10);
const chunks = _.chunk(numbers, 3);
data.map(_ => 5);
console.log(chunks);
//# sourceMappingURL=source1.js.map