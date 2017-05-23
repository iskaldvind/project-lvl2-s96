import * as compare from '../src/compare';

test('Should work fine with empty objects', () => {
  const oldData = {};
  const newData = {};
  expect(compare.compareData(oldData, newData)).toEqual({});
});

test('Should return valid comparison object', () => {
  const oldData = { must_not_change: 'u', must_be_deleted: 'd', must_change_value: 'c' };
  const newData = { must_not_change: 'u', must_be_added: 'a', must_change_value: 'x' };
  expect(compare.compareData(oldData, newData)).toEqual({
    '    must_not_change': 'u',
    '  - must_be_deleted': 'd',
    '  + must_be_added': 'a',
    '  * must_change_value': ['x', 'c'],
  });
});

