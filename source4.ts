import * as _ from 'lodash';
import identity from 'lodash/identity';
import { filter as lodashFilter, orderBy } from 'lodash';

_([1,2,3]).filter(_.identity).value();
_.filter([1,2,3], identity);
lodashFilter([1,2,3], identity);
orderBy([1,2,3]);

const number = 10157624.45345;

const res = _(number)
  .thru(v => v.toFixed(0))
  .split('')
  .reverse()
  .chunk(3)
  .map(ch => ch.reverse().join(''))
  .reverse()
  .join(',');

console.log(res);
