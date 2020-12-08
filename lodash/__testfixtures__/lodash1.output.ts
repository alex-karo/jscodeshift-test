import filter from "lodash/filter";
import identity from "lodash/identity";
import orderBy from "lodash/orderBy";
import range from "lodash/range";
import chunk from "lodash/chunk";

const data: any = [
  {value: 1},
  {value: 2},
  {value: 3},
];

filter([1,2,3], identity);
orderBy(data, 'value');

const numbers = range(1, 10);
const chunks = chunk(numbers,3);

data.map(_ => 5);

console.log(chunks);
