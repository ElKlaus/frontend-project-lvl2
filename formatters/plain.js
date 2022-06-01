const plain = (tree) => {
  const result = tree.reduce((acc, el, index, array) => {
    const [sign, key, value] = el;
    const [nextSign, nextKey, nextValue] = array[index + 1] ? array[index + 1] : el;
    let newAcc = '';

    // console.log(sign, key, value);
    if (sign === '+') {
      newAcc = `Property '${key}' was added with value: ${value}\n`;
    } else if (sign === '-') {
      newAcc = `Property '${key}' was removed\n`;
    } else if (sign === ' ' && Array.isArray(value)) {
      newAcc = `Property '${key}'***.${plain(value)}`;
    }

    // if (Array.isArray(value)) {
    //   newAcc = `${acc}${key}***.${plain(value)}`;
    // } else {
    //   newAcc = `${acc}${key}* value: ${value}\n`;
    // }

    return acc + newAcc;
  }, '');

  return result;
};

export default plain;
