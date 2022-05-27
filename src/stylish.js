import _ from 'lodash';

const stylish = (data, replacer = ' ', spacesCount = 1) => {
  let result = '';

  const iter = (coll, count) => {
    const spaces = replacer.repeat(count);
    const newSpacesCount = count + spacesCount;

    // const current = (typeof coll === 'object') ? Object.entries(coll) : coll;

    // console.log(current);

    return coll.reduce((acc, el) => {
      const [sign, key, value] = el;
      let newAcc = '';

      if (Array.isArray(key)) {
        newAcc = `${acc}${spaces}  ${sign}**: {\n${iter(key, newSpacesCount)}${spaces}}\n`;
      } else if (Array.isArray(value)) {
        newAcc = `${acc}${spaces}${key}**: {\n${iter(value, newSpacesCount)}${spaces}}\n`;
      } else {
        // console.log(key,'////', value);
        newAcc = `${acc}${spaces}${sign}${key}*: ${value}\n`;
      }

      return newAcc;
    }, '');
  };

  result = `{\n${iter(data, spacesCount)}}`;

  return result;
};

export default stylish;
