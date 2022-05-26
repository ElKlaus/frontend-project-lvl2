import _ from 'lodash';
import getParsedFile from './parsers.js';

const stylish = (data, replacer = ' ', spacesCount = 1) => {
  let result = '';

  const iter = (coll, count) => {
    const spaces = replacer.repeat(count);
    const newSpacesCount = count + spacesCount;

    return coll.reduce((acc, el) => {
      const [sign, key, value] = el;
      let newAcc = '';

      if (Array.isArray(key)) {
        newAcc = `${acc}${spaces}${sign}**: {\n${iter(key, newSpacesCount)}${spaces}}\n`;
      } else {
        newAcc = `${acc}${spaces}${sign} ${key}*: ${value}\n`;
      }

      return newAcc;
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

  const diffArr = sortKeys.reduce((acc, el) => {
    if (typeof firstObj[el] === 'object' && typeof secondObj[el] === 'object') {
      acc.push([el, (comparedKeys(firstObj[el], secondObj[el]))]);
    } else if ((_.has(firstObj, el) && _.has(secondObj, el)) && (firstObj[el] === secondObj[el])) {
      acc.push([' ', el, firstObj[el]]);
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
  const result = stylish(comparedKeys(parsedOne, parsedTwo));

  console.log(result);

  return result;
};

export default genDiff;
