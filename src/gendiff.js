import _ from 'lodash';
import getParsedFile from './parsers.js';

const genDiff = (firstPath, secondPath) => {
  const firstObj = getParsedFile(firstPath);
  const secondObj = getParsedFile(secondPath);
  const keysFirst = Object.keys(firstObj);
  const keysSecond = Object.keys(secondObj);
  const keys = _.union(keysFirst, keysSecond);
  const sortKeys = _.sortBy(keys, (item) => item);
  let result = '{\n';

  const comparedKeys = sortKeys.reduce((acc, el) => {
    let concat = acc;

    if ((_.has(firstObj, el) && _.has(secondObj, el)) && (firstObj[el] === secondObj[el])) {
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

  result += `${comparedKeys}}`;

  console.log(result);

  return result;
};

export default genDiff;
