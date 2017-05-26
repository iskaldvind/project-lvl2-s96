import _ from 'lodash';

const recursivelyMarkUnchanged = children => Object.keys(children).map((child) => {
  // mark 'unchaged' all children and their children recursively
  if (children[child] instanceof Object) {
    return { diff: 'unchaged', property: child, value: recursivelyMarkUnchanged(children[child]) };
  }
  return { diff: 'unchanged', property: child, value: children[child] };
});

const iterOverBuildDiffAST = (before, after) => {
  const propertiesBefore = Object.keys(before);
  const propertiesAfter = Object.keys(after);
  const propertiesUnion = _.union(propertiesBefore, propertiesAfter);
  return propertiesUnion.map((property) => {
    if ((property in before) && (property in after)) {
      // if both object have same property
      if ((before[property] instanceof Object) && (after[property] instanceof Object)) {
        // if both property values are objects
        if (JSON.stringify(before[property]) === JSON.stringify(after[property])) {
          // if property values (objects) are equal in content
          return { diff: 'unchanged', property, value: recursivelyMarkUnchanged(before[property]) };
        }
        // if property values (objects) are not equal in content
        return { diff: 'unchanged', property, value: iterOverBuildDiffAST(before[property], after[property]) };
      } else if (before[property] instanceof Object) {
        // if same property in before is an object and in after is a string
        return { diff: 'changed', property, value: { new: after[property], old: recursivelyMarkUnchanged(before[property]) } };
      } else if (after[property] instanceof Object) {
        // if same property in before is a string and in after is an object
        return { diff: 'changed', property, value: { new: recursivelyMarkUnchanged(after[property]), old: before[property] } };
      }
      // if both property values are strings
      if (before[property] === after[property]) {
        // if property values (strings) are equal
        return { diff: 'unchanged', property, value: before[property] };
      }
      // if property values (strings) are not equal
      return { diff: 'changed', property, value: { new: after[property], old: before[property] } };
    } else if (property in before) {
      // if property exists only in before
      if (before[property] instanceof Object) {
        // if its value is an object
        return { diff: 'deleted', property, value: recursivelyMarkUnchanged(before[property]) };
      }
      // if its value is a string
      return { diff: 'deleted', property, value: before[property] };
    }
    // if property exists only in after
    if (after[property] instanceof Object) {
      // if its value is an object
      return { diff: 'added', property, value: recursivelyMarkUnchanged(after[property]) };
    }
    // if its value is a string
    return { diff: 'added', property, value: after[property] };
  });
};


const buildDiffAST = (dataBefore, dataAfter) =>
  ({ diff: 'unchanged', property: '', value: iterOverBuildDiffAST(dataBefore, dataAfter) });

export default buildDiffAST;
