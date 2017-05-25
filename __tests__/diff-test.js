import gendiff from '../src/index';

const validDiffFlat = [
  '{',
  '    host: hexlet.io',
  '  + timeout: 20',
  '  - timeout: 50',
  '  - proxy: 123.234.53.22',
  '  + verbose: true',
  '}'].join('\n');

const validDiffComplex = [
  '{',
  '    common: {',
  '        setting1: Value 1',
  '      - setting2: 200',
  '        setting3: true',
  '      - setting6: {',
  '            key: value',
  '        }',
  '      + setting4: blah blah',
  '      + setting5: {',
  '            key5: value5',
  '        }',
  '    group1: {',
  '      + baz: bars',
  '      - baz: bas',
  '        foo: bar',
  '  - group2: {',
  '        abc: 12345',
  '    }',
  '  + group3: {',
  '        fee: 100500',
  '    }',
  '}'].join('\n');

const pathBefore = './__tests__/__fixtures__/';
const pathAfter = './__tests__/__fixtures__/';

test('Should work fine with flat ini files', () => {
  const iniBefore = `${pathBefore}flat-before.ini`;
  const iniAfter = `${pathAfter}flat-after.ini`;
  expect(gendiff(iniBefore, iniAfter)).toEqual(validDiffFlat);
});

test('Should work fine with complex ini files', () => {
  const iniBefore = `${pathBefore}complex-before.ini`;
  const iniAfter = `${pathAfter}complex-after.ini`;
  expect(gendiff(iniBefore, iniAfter)).toEqual(validDiffComplex);
});

test('Should work fine with flat json files', () => {
  const jsonBefore = `${pathBefore}flat-before.json`;
  const jsonAfter = `${pathAfter}flat-after.json`;
  expect(gendiff(jsonBefore, jsonAfter)).toEqual(validDiffFlat);
});

test('Should work fine with complex json files', () => {
  const jsonBefore = `${pathBefore}complex-before.json`;
  const jsonAfter = `${pathAfter}complex-after.json`;
  expect(gendiff(jsonBefore, jsonAfter)).toEqual(validDiffComplex);
});

test('Should work fine with flat yml files', () => {
  const ymlBefore = `${pathBefore}flat-before.yml`;
  const ymlAfter = `${pathAfter}flat-after.yml`;
  expect(gendiff(ymlBefore, ymlAfter)).toEqual(validDiffFlat);
});

test('Should work fine with complex yml files', () => {
  const ymlBefore = `${pathBefore}complex-before.yml`;
  const ymlAfter = `${pathAfter}complex-after.yml`;
  expect(gendiff(ymlBefore, ymlAfter)).toEqual(validDiffComplex);
});
