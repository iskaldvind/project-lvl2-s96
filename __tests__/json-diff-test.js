import path from 'path';
import compareFiles from '../src/file-comparer';

test('Should throw an error with empty json files', () => {
  const jsonBefore = path.resolve('./__tests__/test_data/before-t1.json');
  const jsonAfter = path.resolve('./__tests__/test_data/after-t1.json');
  expect(() => compareFiles(jsonBefore, jsonAfter)).toThrowError();
});

test('Should work fine with json files', () => {
  const jsonBefore = path.resolve('./__tests__/test_data/before-t2.json');
  const jsonAfter = path.resolve('./__tests__/test_data/after-t2.json');
  expect(compareFiles(jsonBefore, jsonAfter).split('\n').sort())
    .toEqual(['    host: hexlet.io', '  + timeout: 20', '  + verbose: true', '  - proxy: 123.234.53.22', '  - timeout: 50', '{', '}']);
});
