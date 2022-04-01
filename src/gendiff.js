import fs from 'fs';
import path from 'path';
import _ from 'lodash';


const getParsedArr = (file) => {
  const jsonPath = path.resolve('src', file);
  const jsonData = fs.readFileSync(jsonPath, 'utf8');
  const jsonObj = JSON.parse(jsonData);
  const entries = Object.entries(jsonObj);

  // console.log(sortArr);

  return jsonObj;  
}

const genDiff = (firstPath, secondPath) => {
  const firstObj = getParsedArr(firstPath);
  const secondObj = getParsedArr(secondPath);
  const keysFirst = Object.keys(firstObj);
  const keysSecond = Object.keys(secondObj);
  const keys = _.union(keysFirst, keysSecond);
  const sortKeys = _.sortBy(keys, (item) => item);
  let result = '{\n';

  for (const key of sortKeys) {
    if ((_.has(firstObj, key) && _.has(secondObj, key)) && (firstObj[key] === secondObj[key])) {
      result += `    ${key}: ${firstObj[key]}\n`;
    } else if ((_.has(firstObj, key) && _.has(secondObj, key)) && (firstObj[key] !== secondObj[key])) {
      result += `  - ${key}: ${firstObj[key]}\n  + ${key}: ${secondObj[key]}\n`;
    } else if (_.has(firstObj, key) && !(_.has(secondObj, key))) {
      result += `  - ${key}: ${firstObj[key]}\n`;
    } else if (!(_.has(firstObj, key) && _.has(secondObj, key))) {
      result += `  + ${key}: ${secondObj[key]}\n`;
    }
  }
  
  result += '}';

  console.log(result);


  return result;
};



export { genDiff };