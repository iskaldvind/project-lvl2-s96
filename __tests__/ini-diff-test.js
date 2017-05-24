import path from 'path';
import compareFiles from '../src/file-comparer';

test('Should not throw an error with empty ini files', () => {
  const iniBefore = path.resolve('./__tests__/test_data/before-t1.ini');
  const iniAfter = path.resolve('./__tests__/test_data/after-t1.ini');
  expect(compareFiles(iniBefore, iniAfter)).toEqual('{\n}');
});

test('Should work fine with ini files', () => {
  const iniBefore = path.resolve('./__tests__/test_data/before-t2.ini');
  const iniAfter = path.resolve('./__tests__/test_data/after-t2.ini');
  expect(compareFiles(iniBefore, iniAfter).split('\n').sort())
    .toEqual(['    host: hexlet.io', '  + timeout: 20', '  + verbose: true', '  - proxy: 123.234.53.22', '  - timeout: 50', '{', '}']);
});
