import _ from 'lodash';

const recursivelyMarkUnchanged = children => Object.keys(children).map((child) => {
  if (children[child] instanceof Object) {
    return { type: 'unchaged', property: child, value: recursivelyMarkUnchanged(children[child]) };
  }
  return { type: 'unchanged', property: child, value: children[child] };
});

const iterOverBuildDiffAST = (before, after) => {
  const propertiesBefore = Object.keys(before);
  const propertiesAfter = Object.keys(after);
  const propertiesUnion = _.union(propertiesBefore, propertiesAfter);
  return propertiesUnion.map((property) => {
    if ((property in before) && (property in after)) {
      if ((before[property] instanceof Object) && (after[property] instanceof Object)) {
        if (JSON.stringify(before[property]) === JSON.stringify(after[property])) {
          return { type: 'unchanged', property, children: recursivelyMarkUnchanged(before[property]) };
        }
        return { type: 'unchanged', property, children: iterOverBuildDiffAST(before[property], after[property]) };
      } else if (before[property] instanceof Object) {
        return { type: 'updated', property, newValue: after[property], oldValue: recursivelyMarkUnchanged(before[property]) };
      } else if (after[property] instanceof Object) {
        return { type: 'updated', property, newValue: recursivelyMarkUnchanged(after[property]), oldValue: before[property] };
      }
      if (before[property] === after[property]) {
        return { type: 'unchanged', property, value: before[property] };
      }
      return { type: 'updated', property, newValue: after[property], oldValue: before[property] };
    } else if (property in before) {
      if (before[property] instanceof Object) {
        return { type: 'removed', property, children: recursivelyMarkUnchanged(before[property]) };
      }
      return { type: 'removed', property, value: before[property] };
    }
    if (after[property] instanceof Object) {
      return { type: 'added', property, children: recursivelyMarkUnchanged(after[property]) };
    }
    return { type: 'added', property, value: after[property] };
  });
};

const buildDiffAST = (dataBefore, dataAfter) =>
  ({ type: 'unchanged', property: '', children: iterOverBuildDiffAST(dataBefore, dataAfter) });

export default buildDiffAST;
