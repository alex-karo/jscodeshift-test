import filter from "lodash/filter";
import identity from "lodash/identity";
import range from "lodash/range";
import chunk from "lodash/chunk";
import orderBy from "lodash/orderBy";
import map from "lodash/map";

const data: any = [
  {value: 1},
  {value: 2},
  {value: 3},
];

filter([1,2,3], identity);
filter([1,2,3], identity);
orderBy(data, 'value');

const numbers = range(1, 10);
const chunks = chunk(numbers,3);

map(data);

console.log(chunks);
