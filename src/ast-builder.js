import _ from 'lodash';

const recursivelyMarkUnchanged = children => Object.keys(children).map((child) => {
  if (children[child] instanceof Object) {
    return { type: 'unchaged', property: child, oldValue: recursivelyMarkUnchanged(children[child]), children: [] };
  }
  return { type: 'unchanged', property: child, oldValue: children[child], children: [] };
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
        return { type: 'updated', property, newValue: after[property], oldValue: recursivelyMarkUnchanged(before[property]), children: [] };
      } else if (after[property] instanceof Object) {
        return { type: 'updated', property, newValue: recursivelyMarkUnchanged(after[property]), oldValue: before[property], children: [] };
      }
      if (before[property] === after[property]) {
        return { type: 'unchanged', property, oldValue: before[property], children: [] };
      }
      return { type: 'updated', property, newValue: after[property], oldValue: before[property], children: [] };
    } else if (property in before) {
      if (before[property] instanceof Object) {
        return { type: 'removed', property, children: recursivelyMarkUnchanged(before[property]) };
      }
      return { type: 'removed', property, oldValue: before[property], children: [] };
    }
    if (after[property] instanceof Object) {
      return { type: 'added', property, children: recursivelyMarkUnchanged(after[property]) };
    }
    return { type: 'added', property, newValue: after[property], children: [] };
  });
};

const buildDiffAST = (dataBefore, dataAfter) => iterOverBuildDiffAST(dataBefore, dataAfter);

export default buildDiffAST;
