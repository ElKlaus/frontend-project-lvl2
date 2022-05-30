const stylish = (data, replacer = ' ', spacesCount = 2) => {
  const iter = (coll, count) => {
    const spaces = replacer.repeat(count);
    const newSpacesCount = count + spacesCount;

    // console.log(coll);

    return coll.reduce((acc, el) => {
      const [sign, key, value] = el;
      let newAcc = '';

      if (Array.isArray(value)) {
        newAcc = `${acc}${spaces}${sign} ${key}: {\n${iter(value, newSpacesCount + 2)}  ${spaces}}\n`;
      } else {
        newAcc = `${acc}${spaces}${sign} ${key}: ${value}\n`;
      }

      return newAcc;
    }, '');
  };

  return `{\n${iter(data, spacesCount)}}`;
};

export default stylish;
