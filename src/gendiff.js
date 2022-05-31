// import stylish from './stylish.js';
import comparedKeys from './compared_keys.js';
import getParsedFile from './parsers.js';

const genDiff = (firstPath, secondPath, formatter) => {
  const parsedOne = getParsedFile(firstPath);
  const parsedTwo = getParsedFile(secondPath);

  console.log(formatter);

  return formatter(comparedKeys(parsedOne, parsedTwo));
};

export default genDiff;
