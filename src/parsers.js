import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getParsedFile = (file) => {
  const filePath = path.resolve('__fixtures__', file);
  const fileFormat = path.extname(filePath);
  const fileData = fs.readFileSync(filePath, 'utf8');
  const result = fileFormat === 'json' ? JSON.parse(fileData) : yaml.load(fs.readFileSync(filePath));

  return result;
};

export default getParsedFile;
