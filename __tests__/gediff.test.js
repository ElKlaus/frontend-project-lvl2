import { test, expect } from '@jest/globals';
import genDiff from '../src/gendiff.js';

const data = `{
  common: {
    + follow: false
      setting1: Value 1
    - setting2: 200
    - setting3: true
    + setting3: null
    + setting4: blah blah
    + setting5: {
          key5: value5
      }
      setting6: {
          doge: {
            - wow: 
            + wow: so much
          }
          key: value
        + ops: vops
      }
  }
  group1: {
    - baz: bas
    + baz: bars
      foo: bar
    - nest: {
          key: value
      }
    + nest: str
  }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

test('genDiff - json', () => {
  expect(genDiff('file1.json', 'file2.json')).toBe(data);
});

test('genDiff - yml', () => {
  expect(genDiff('file1.yml', 'file2.yml')).toBe(data);
});
