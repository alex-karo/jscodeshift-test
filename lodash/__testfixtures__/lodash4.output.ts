import identity from "lodash/identity";
import filter from "lodash/filter";
import value from "lodash/value";
import thru from "lodash/thru";
import split from "lodash/split";
import reverse from "lodash/reverse";
import chunk from "lodash/chunk";
import map from "lodash/map";
import join from "lodash/join";
import _ from "lodash/wrapperLodash";
import mixin from "lodash/mixin";
import orderBy from "lodash/orderBy";

mixin(_, {
    filter: filter,
    thru: thru,
    split: split,
    reverse: reverse,
    chunk: chunk,
    map: map
})

mixin(_, {
    join: join
}, {
    chain: false
})

_.prototype.value = value;

_([1,2,3]).filter(identity).value();
filter([1,2,3], identity);
filter([1,2,3], identity);
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
