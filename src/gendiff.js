import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getParsedFile = (file) => {
  const jsonPath = path.resolve('__fixtures__', file);
  const jsonData = fs.readFileSync(jsonPath, 'utf8');
  const jsonObj = JSON.parse(jsonData);

  return jsonObj;
};

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

  return result;
};

export default genDiff;
