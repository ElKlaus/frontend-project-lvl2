const plain = (tree) => {
  const result = tree.reduce((acc, el) => {
    const [sign, key, value] = el;
    let newAcc = '';
    let newSign = '';

    switch (sign) {
      case '+':
        newSign = 'was added';
        break;
      case '-':
        newSign = 'was removed';
        break;
      case ' ':
        newSign = 'was updated';
        break;
      default: console.log('error');
    }

    if (Array.isArray.value) {
      newAcc = `Property ${acc}${key}${newSign}with value${plain(value)}\n`;
    } else {
      newAcc = `Property ${acc}${key}${newSign}with value${value}\n`;
    }

    return newAcc;
  }, '');

  return result;
};

export default plain;
