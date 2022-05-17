import _ from 'lodash';
import getParsedFile from './parsers.js';

const stringlify = (data, replacer = ' ', spacesCount = 1) => {
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

const comparedKeys = (firstObj, secondObj) => {
  const keysFirst = Object.keys(firstObj);
  const keysSecond = Object.keys(secondObj);
  const keys = _.union(keysFirst, keysSecond);
  const sortKeys = _.sortBy(keys, (item) => item);

  const res = sortKeys.reduce((acc, el) => {
    let concat = acc;

    if (typeof firstObj[el] === 'object' && typeof secondObj[el] === 'object') {
      concat += `${el}:${comparedKeys(firstObj[el], secondObj[el])}`;
    } else if (typeof firstObj[el] === 'object' && typeof secondObj[el] !== 'object') {
      console.log(firstObj[el]);
      // concat += stringlify(firstObj[el]);
    } else if (typeof firstObj[el] !== 'object' && typeof secondObj[el] === 'object') {
      // concat += stringlify(secondObj[el]);
    } else if ((_.has(firstObj, el) && _.has(secondObj, el)) && (firstObj[el] === secondObj[el])) {
      concat += `    ${el}: ${firstObj[el]}\n`;
    } else if ((_.has(firstObj, el) && _.has(secondObj, el))
        && (firstObj[el] !== secondObj[el])) {
      concat += `  - ${el}: ${firstObj[el]}\n  + ${el}: ${secondObj[el]}\n`;
    } else if (_.has(firstObj, el) && !(_.has(secondObj, el))) {
      concat += `  - ${el}: ${firstObj[el]}\n`;
    } else if (!(_.has(firstObj, el) && _.has(secondObj, el))) {
      concat += `  + ${el}: ${secondObj[el]}\n`;
    }

    return concat;
  }, '');

  return res;
};

const genDiff = (firstPath, secondPath) => {
  const parsedOne = getParsedFile(firstPath);
  const parsedTwo = getParsedFile(secondPath);
  const result = stringlify(parsedOne);/*`{\n${comparedKeys(parsedOne, parsedTwo)}}`;*/

  console.log(result);

  return result;
};

export default genDiff;
