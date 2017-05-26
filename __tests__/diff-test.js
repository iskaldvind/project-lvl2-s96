import path from 'path';
import gendiff from '../src/index';

const validDiffFlatTree = [
  '{',
  '    host: hexlet.io',
  '  + timeout: 20',
  '  - timeout: 50',
  '  - proxy: 123.234.53.22',
  '  + verbose: true',
  '}'].join('\n');

const validDiffFlatPlain = [
  "Property 'timeout' was updated. From '50' to '20'",
  "Property 'proxy' was removed",
  "Property 'verbose' was added with value: true",
].join('\n');

const validDiffComplexTree = [
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

const validDiffComplexPlain = [
  "Property 'common.setting2' was removed",
  "Property 'common.setting6' was removed",
  "Property 'common.setting4' was added with value: blah blah",
  "Property 'common.setting5' was added with complex value",
  "Property 'group1.baz' was updated. From 'bas' to 'bars'",
  "Property 'group2' was removed",
  "Property 'group3' was added with complex value",
].join('\n');

const fixturesDir = './__tests__/__fixtures__/';


test('Should make valid Tree output with flat ini files', () => {
  const iniBefore = path.join(fixturesDir, 'flat-before.ini');
  const iniAfter = path.join(fixturesDir, 'flat-after.ini');
  expect(gendiff(iniBefore, iniAfter)).toEqual(validDiffFlatTree);
});

test('Should make valid Tree output with complex ini files', () => {
  const iniBefore = path.join(fixturesDir, 'complex-before.ini');
  const iniAfter = path.join(fixturesDir, 'complex-after.ini');
  expect(gendiff(iniBefore, iniAfter)).toEqual(validDiffComplexTree);
});

test('Should make valid Tree output with flat json files', () => {
  const jsonBefore = path.join(fixturesDir, 'flat-before.json');
  const jsonAfter = path.join(fixturesDir, 'flat-after.json');
  expect(gendiff(jsonBefore, jsonAfter)).toEqual(validDiffFlatTree);
});

test('Should make valid Tree output with complex json files', () => {
  const jsonBefore = path.join(fixturesDir, 'complex-before.json');
  const jsonAfter = path.join(fixturesDir, 'complex-after.json');
  expect(gendiff(jsonBefore, jsonAfter)).toEqual(validDiffComplexTree);
});

test('Should make valid Tree output with flat yml files', () => {
  const ymlBefore = path.join(fixturesDir, 'flat-before.yml');
  const ymlAfter = path.join(fixturesDir, 'flat-after.yml');
  expect(gendiff(ymlBefore, ymlAfter)).toEqual(validDiffFlatTree);
});

test('Should make valid Tree output with complex yml files', () => {
  const ymlBefore = path.join(fixturesDir, 'complex-before.yml');
  const ymlAfter = path.join(fixturesDir, 'complex-after.yml');
  expect(gendiff(ymlBefore, ymlAfter)).toEqual(validDiffComplexTree);
});

test('Should make valid Plain output with flat json files', () => {
  const jsonBefore = path.join(fixturesDir, 'flat-before.json');
  const jsonAfter = path.join(fixturesDir, 'flat-after.json');
  expect(gendiff('plain', jsonBefore, jsonAfter)).toEqual(validDiffFlatPlain);
});

test('Should make valid Plain output with complex json files', () => {
  const jsonBefore = path.join(fixturesDir, 'complex-before.json');
  const jsonAfter = path.join(fixturesDir, 'complex-after.json');
  expect(gendiff('plain', jsonBefore, jsonAfter)).toEqual(validDiffComplexPlain);
});
