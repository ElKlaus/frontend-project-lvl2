import _ from 'lodash';

const objToArr = (data) => {
  const entries = Object.entries(data);
  const result = entries.reduce((acc, el) => {
    const [key, value] = el;
    if (typeof value === 'object') {
      acc.push([' ', key, objToArr(value)]);
    } else {
      acc.push([' ', key, value]);
    }

    return acc;
  }, []);

  return result;
};

const comparedKeys = (firstObj, secondObj) => {
  const keysFirst = Object.keys(firstObj);
  const keysSecond = Object.keys(secondObj);
  const keys = _.union(keysFirst, keysSecond);
  const sortKeys = _.sortBy(keys, (item) => item);

  const diffArr = sortKeys.reduce((acc, el) => {
    const crntFrst = firstObj[el];
    const crntScnd = secondObj[el];
    const chkdFrst = _.isObject(crntFrst) ? objToArr(crntFrst) : crntFrst;
    // const chkdScnd = _.isObject(crntScnd) && crntScnd !== null ? objToArr(crntScnd) : crntScnd;

    if (_.isObject(crntFrst) && _.isObject(crntScnd)) {
      acc.push([' ', el, (comparedKeys(crntFrst, crntScnd))]);
    } else if ((_.has(firstObj, el) && _.has(secondObj, el)) && (crntFrst === crntScnd)) {
      acc.push([' ', el, crntFrst]);
    } else if ((_.has(firstObj, el) && _.has(secondObj, el)) && (crntFrst !== crntScnd)) {
      const current1 = _.isObject(crntFrst) ? objToArr(crntFrst) : crntFrst;
      const current2 = _.isObject(crntScnd) ? objToArr(crntScnd) : crntScnd;

      acc.push(['-', el, current1]);
      acc.push(['+', el, current2]);
    } else if (!(_.has(firstObj, el)) && _.has(secondObj, el)) {
      const current = _.isObject(crntScnd) ? objToArr(crntScnd) : crntScnd;

      acc.push(['+', el, current]);
    } else if (_.has(firstObj, el) && !(_.has(secondObj, el))) {
      acc.push(['-', el, chkdFrst]);
    }

    return acc;
  }, []);

  return diffArr;
};

export default comparedKeys;
