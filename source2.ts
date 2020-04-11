import * as _ from 'lodash';
import { orderBy } from 'lodash';
import filter from 'lodash/filter';
import identity from 'lodash/identity';

const data: any = [
  {value: 1},
  {value: 2},
  {value: 3},
];

_.filter([1,2,3], _.identity);
filter([1,2,3], identity);
_.orderBy(data, 'value');
orderBy(data, 'value');

const numbers = _.range(1, 10);
const chunks = _.chunk(numbers,3);

console.log(chunks);
