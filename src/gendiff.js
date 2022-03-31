import fs from 'fs';
import path from 'path';
import _ from 'lodash';


const getParsedArr = (file) => {
  const jsonPath = path.resolve('src', file);
  const jsonData = fs.readFileSync(jsonPath, 'utf8');
  const jsonObj = JSON.parse(jsonData);
  const entries = Object.entries(jsonObj);
  const sortArr = _.sortBy(entries, (item) => item);

  // console.log(sortArr);

  return jsonObj;  
}

const genDiff = (firstPath, secondPath) => {
  const firstArr = getParsedArr(firstPath);
  const secondArr = getParsedArr(secondPath);
  const keysFirst = Object.keys(firstArr);
  const keysSecond = Object.keys(secondArr);
  const keys = _.union(keysFirst, keysSecond);

  // let result = firstArr.map((el) => {
  //   const [key, value] = el;
  
  //   console.log(key, value);
  
  //   return el;
  // });

  

  console.log(keys);


  // console.log(arrForCompare1, arrForCompare2);
};



export { genDiff };