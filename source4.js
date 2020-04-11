"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const filter_1 = require("lodash/filter");
const identity_1 = require("lodash/identity");
const lodash_1 = require("lodash");
_([1, 2, 3]).filter(_.identity).value();
filter_1.default([1, 2, 3], identity_1.default);
lodash_1.filter([1, 2, 3], identity_1.default);
lodash_1.orderBy([1, 2, 3]);
const number = '100000000';
_(number)
    .map(parseInt)
    .split('')
    .reverse()
    .chunk(3)
    .map(ch => ch.reverse().join(''))
    .reverse()
    .join(',');
console.log(number);
//# sourceMappingURL=source4.js.map