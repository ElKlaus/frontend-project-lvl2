import stylish from './stylish.js';
import plain from './plain.js';

const formatSelecting = (format) => {
  if (format === 'plain') {
    return plain;
  }

  return stylish;
};

export default formatSelecting;
