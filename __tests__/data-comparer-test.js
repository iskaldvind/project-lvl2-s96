import compareData from '../src/data-comparer';

test('Should work fine with empty objects', () => {
  const oldData = {};
  const newData = {};
  expect(compareData(oldData, newData)).toEqual('{\n}');
});

test('Should return valid number of differency strings', () => {
  const oldData = { must_not_change: 'u', must_be_deleted: 'd', must_change_value: 'c' };
  const newData = { must_not_change: 'u', must_be_added: 'a', must_change_value: 'x' };
  expect(compareData(oldData, newData).split('\n').length).toEqual(7);
});

