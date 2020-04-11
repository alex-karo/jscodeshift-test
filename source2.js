"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const lodash_2 = require("lodash");
const filter_1 = require("lodash/filter");
const identity_1 = require("lodash/identity");
const data = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
];
lodash_1.default.filter([1, 2, 3], lodash_1.default.identity);
filter_1.default([1, 2, 3], identity_1.default);
lodash_2.orderBy(data, 'value');
const numbers = lodash_1.default.range(1, 10);
const chunks = lodash_1.default.chunk(numbers, 3);
lodash_2.map(data);
console.log(chunks);
//# sourceMappingURL=source2.js.map