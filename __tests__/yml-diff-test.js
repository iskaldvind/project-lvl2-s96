import path from 'path';
import compareFiles from '../src/file-comparer';

test('Should throw an error with empty yml files', () => {
  const ymlBefore = path.resolve('./__tests__/test_data/before-t1.yml');
  const ymlAfter = path.resolve('./__tests__/test_data/after-t1.yml');
  expect(() => compareFiles(ymlBefore, ymlAfter)).toThrowError();
});

test('Should work fine with yml files', () => {
  const ymlBefore = path.resolve('./__tests__/test_data/before-t2.yml');
  const ymlAfter = path.resolve('./__tests__/test_data/after-t2.yml');
  expect(compareFiles(ymlBefore, ymlAfter).split('\n').sort())
    .toEqual(['    host: hexlet.io', '  + timeout: 20', '  + verbose: true', '  - proxy: 123.234.53.22', '  - timeout: 50', '{', '}']);
});