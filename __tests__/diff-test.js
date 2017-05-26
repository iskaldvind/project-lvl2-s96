import path from 'path';
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
  '    }',
  '    group1: {',
  '      + baz: bars',
  '      - baz: bas',
  '        foo: bar',
  '    }',
  '  - group2: {',
  '        abc: 12345',
  '    }',
  '  + group3: {',
  '        fee: 100500',
  '    }',
  '}'].join('\n');

const fixturesDir = './__tests__/__fixtures__/';

test('Should work fine with flat ini files', () => {
  const iniBefore = path.join(fixturesDir, 'flat-before.ini');
  const iniAfter = path.join(fixturesDir, 'flat-after.ini');
  expect(gendiff(iniBefore, iniAfter)).toEqual(validDiffFlat);
});

test('Should work fine with complex ini files', () => {
  const iniBefore = path.join(fixturesDir, 'complex-before.ini');
  const iniAfter = path.join(fixturesDir, 'complex-after.ini');
  expect(gendiff(iniBefore, iniAfter)).toEqual(validDiffComplex);
});

test('Should work fine with flat json files', () => {
  const jsonBefore = path.join(fixturesDir, 'flat-before.json');
  const jsonAfter = path.join(fixturesDir, 'flat-after.json');
  expect(gendiff(jsonBefore, jsonAfter)).toEqual(validDiffFlat);
});

test('Should work fine with complex json files', () => {
  const jsonBefore = path.join(fixturesDir, 'complex-before.json');
  const jsonAfter = path.join(fixturesDir, 'complex-after.json');
  expect(gendiff(jsonBefore, jsonAfter)).toEqual(validDiffComplex);
});

test('Should work fine with flat yml files', () => {
  const ymlBefore = path.join(fixturesDir, 'flat-before.yml');
  const ymlAfter = path.join(fixturesDir, 'flat-after.yml');
  expect(gendiff(ymlBefore, ymlAfter)).toEqual(validDiffFlat);
});

test('Should work fine with complex yml files', () => {
  const ymlBefore = path.join(fixturesDir, 'complex-before.yml');
  const ymlAfter = path.join(fixturesDir, 'complex-after.yml');
  expect(gendiff(ymlBefore, ymlAfter)).toEqual(validDiffComplex);
});

