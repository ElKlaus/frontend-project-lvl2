import { test, expect } from '@jest/globals';
import genDiff from '../src/gendiff.js';

const data = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('genDiff - json', () => {
  expect(genDiff('file1.json', 'file2.json')).toBe(data);
});

test('genDiff - yml', () => {
  expect(genDiff('file1.yml', 'file2.yml')).toBe(data);
});
