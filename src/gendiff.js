import fs from 'fs';
import path from 'path';


const jsonPath = path.resolve('src', 'file1.json');


const genDiff = (arg1, arg2) => {
  const jsonData = fs.readFileSync(jsonPath);

  console.log(jsonData);

  // console.log(arg1, arg2);
};



export { genDiff };