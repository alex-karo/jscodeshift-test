import * as _ from 'lodash';
import filter from 'lodash/filter';
import identity from 'lodash/identity';
import { filter as lodashFilter, orderBy } from 'lodash';

_([1,2,3]).filter(_.identity).value();
filter([1,2,3], identity);
lodashFilter([1,2,3], identity);
orderBy([1,2,3]);

const number = '100000000';

_.chain(number)
  .toInteger()
  .split('')
  .reverse()
  .chunk(3)
  .map(ch => ch.reverse().join(''))
  .reverse()
  .join(',')
  .value();

console.log(number);
