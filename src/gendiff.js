import stylish from './stylish.js';
import comparedKeys from './compared_keys.js';
import getParsedFile from './parsers.js';

const genDiff = (firstPath, secondPath) => {
  const parsedOne = getParsedFile(firstPath);
  const parsedTwo = getParsedFile(secondPath);
  const result = stylish(comparedKeys(parsedOne, parsedTwo));

  console.log(result);

  return result;
};

export default genDiff;
