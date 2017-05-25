import gendiff from '../src/index';

const validDiff = [
  '{',
  '    host: hexlet.io',
  '  + timeout: 20',
  '  - timeout: 50',
  '  - proxy: 123.234.53.22',
  '  + verbose: true',
  '}'].join('\n');

test('Should not throw an error with empty ini files', () => {
  const iniBefore = './__tests__/__fixtures__/before-t1.ini';
  const iniAfter = './__tests__/__fixtures__/after-t1.ini';
  expect(gendiff(iniBefore, iniAfter)).toEqual('{\n}');
});

test('Should work fine with ini files', () => {
  const iniBefore = './__tests__/__fixtures__/before-t2.ini';
  const iniAfter = './__tests__/__fixtures__/after-t2.ini';
  expect(gendiff(iniBefore, iniAfter)).toEqual(validDiff);
});

test('Should throw an error with empty json files', () => {
  const jsonBefore = './__tests__/__fixtures__/before-t1.json';
  const jsonAfter = './__tests__/__fixtures__/after-t1.json';
  expect(() => gendiff(jsonBefore, jsonAfter)).toThrowError();
});

test('Should work fine with json files', () => {
  const jsonBefore = './__tests__/__fixtures__/before-t2.json';
  const jsonAfter = './__tests__/__fixtures__/after-t2.json';
  expect(gendiff(jsonBefore, jsonAfter)).toEqual(validDiff);
});

test('Should throw an error with empty yml files', () => {
  const ymlBefore = './__tests__/__fixtures__/before-t1.yml';
  const ymlAfter = './__tests__/__fixtures__/after-t1.yml';
  expect(() => gendiff(ymlBefore, ymlAfter)).toThrowError();
});

test('Should work fine with yml files', () => {
  const ymlBefore = './__tests__/__fixtures__/before-t2.yml';
  const ymlAfter = './__tests__/__fixtures__/after-t2.yml';
  expect(gendiff(ymlBefore, ymlAfter)).toEqual(validDiff);
});