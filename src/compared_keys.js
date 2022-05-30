import _ from 'lodash';

const objToArr = (data) => {
  const entries = Object.entries(data);
  const result = [];

  for (const [key, value] of entries) {
    if (typeof value === 'object') {
      result.push([' ', key, objToArr(value)]);
    } else {
      result.push([' ', key, value]);
    }
  }

  // console.log(stylish(result));

  return result;
};

const comparedKeys = (firstObj, secondObj) => {
  const keysFirst = Object.keys(firstObj);
  const keysSecond = Object.keys(secondObj);
  const keys = _.union(keysFirst, keysSecond);
  const sortKeys = _.sortBy(keys, (item) => item);

  const diffArr = sortKeys.reduce((acc, el) => {
    if (typeof firstObj[el] === 'object' && typeof secondObj[el] === 'object') {
      acc.push([' ', el, (comparedKeys(firstObj[el], secondObj[el]))]);
    } else if ((_.has(firstObj, el) && _.has(secondObj, el)) && (firstObj[el] === secondObj[el])) {
      acc.push([' ', el, firstObj[el]]);
    } else if ((_.has(firstObj, el) && _.has(secondObj, el)) && (firstObj[el] !== secondObj[el])) {
      // console.log(firstObj[el], secondObj[el]);

      const current1 = typeof firstObj[el] === 'object' && firstObj[el] !== null ? objToArr(firstObj[el]) : firstObj[el];
      const current2 = typeof secondObj[el] === 'object' && secondObj[el] !== null ? objToArr(secondObj[el]) : secondObj[el];

      acc.push(['-', el, current1]);
      acc.push(['+', el, current2]);
    } else if (!(_.has(firstObj, el)) && _.has(secondObj, el)) {
      const current = typeof secondObj[el] === 'object' ? objToArr(secondObj[el]) : secondObj[el];

      acc.push(['+', el, current]);
    } else if (_.has(firstObj, el) && !(_.has(secondObj, el))) {
      const current = typeof firstObj[el] === 'object' ? objToArr(firstObj[el]) : firstObj[el];

      acc.push(['-', el, current]);
    }

    return acc;
  }, []);

  return diffArr;
};

export default comparedKeys;
