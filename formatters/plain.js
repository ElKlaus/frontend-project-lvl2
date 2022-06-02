const plain = (tree) => {
  const result = tree.map((el) => {
    const [sign, key, value] = el;

    // console.log(nextSign, nextKey, nextValue);
    if (sign === '+') {
      el = `'${key}' was added with value: ${value}`;
    } else if (sign === '-') {
      el = `'${key}' was removed`;
    } else if (Array.isArray(value)) {
      el = `${key}.${plain(value)}`;
      // return plain(value);
    }

    return el;
  }, '');

  return result;
};

export default plain;
