import _ from 'lodash';
import getParsedFile from './parsers.js';

const stylish = (data, replacer = ' ', spacesCount = 1) => {
  if (typeof data !== 'object') {
    return `${data}`;
  }

  let result = '';

  const iter = (coll, count) => {
    const spaces = replacer.repeat(count);
    const entries = Object.entries(coll);
    const newSpacesCount = count + spacesCount;

    return entries.reduce((acc, el) => {
      const [key, value] = el;

      if (value !== null && typeof value === 'object') {
        return `${acc}${spaces}${key}: {\n${iter(value, newSpacesCount)}${spaces}}\n`;
      }

      return `${acc}${spaces}${key}: ${value}\n`;
    }, '');
  };

  result = `{\n${iter(data, spacesCount)}}`;

  return result;
};

const flatPush = (arr, item) => arr.push(_.flatMap(item));

const comparedKeys = (firstObj, secondObj) => {
  const keysFirst = Object.keys(firstObj);
  const keysSecond = Object.keys(secondObj);
  const keys = _.union(keysFirst, keysSecond);
  const sortKeys = _.sortBy(keys, (item) => item);

  const diffArr = sortKeys.reduce((acc, el) => {
    if (typeof firstObj[el] === 'object' && typeof secondObj[el] === 'object') {
      acc.push([el, _.flatMap(comparedKeys(firstObj[el], secondObj[el]))]);
    } else if ((_.has(firstObj, el) && _.has(secondObj, el)) && (firstObj[el] === secondObj[el])) {
      acc.push(['', el, firstObj[el]]);
    } else if ((_.has(firstObj, el) && _.has(secondObj, el)) && (firstObj[el] !== secondObj[el])) {
      acc.push(['-', el, firstObj[el]]);
      acc.push(['+', el, secondObj[el]]);
    } else if (!(_.has(firstObj, el)) && _.has(secondObj, el)) {
      acc.push(['+', el, secondObj[el]]);
    } else if (_.has(firstObj, el) && !(_.has(secondObj, el))) {
      acc.push(['-', el, firstObj[el]]);
    }

    return acc;
  }, []);

  return diffArr;
};

const genDiff = (firstPath, secondPath) => {
  const parsedOne = getParsedFile(firstPath);
  const parsedTwo = getParsedFile(secondPath);
  const result = comparedKeys(parsedOne, parsedTwo);

  console.log(result);

  return result;
};

export default genDiff;
