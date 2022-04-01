import { test, expect, beforeEach } from '@jest/globals';
import { genDiff } from '../src/gendiff.js'

let data = 
`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('genDiff', ()=>{
  expect(genDiff('file1.json', 'file2.json')).toBe(data);
});