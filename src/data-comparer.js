import _ from 'lodash';

const baseIndent = '';

const recursivelyIndentChildren = (children, indent) => {
  const childrenArray = Object.keys(children).map((child) => {
    // indent all children and indent even more their children recursively
    if (children[child] instanceof Object) {
      return [`${indent}    ${child}: {`, recursivelyIndentChildren(children[child], `${indent}    `)];
    }
    return `${indent}    ${child}: ${children[child]}`;
  });
  // last closing bracket
  return [...childrenArray, `${indent}}`];
};

const compareDataIter = (before, after, indent) => {
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
          return [
            `${indent}    ${property}: {`,
            recursivelyIndentChildren(before[property], `${indent}    `)];
        }
        // if property values (objects) are not equal in content
        return [
          `${indent}    ${property}: {`,
          compareDataIter(before[property], after[property], `${indent}    `)];
      } else if (before[property] instanceof Object) {
      // if same property in before is an object and in after is a string
        return [
          `${indent}  + ${property}: ${after[property]}`,
          `${indent}  - ${property}: {`,
          recursivelyIndentChildren(before[property] `${indent}    `)];
      } else if (after[property] instanceof Object) {
      // if same property in before is a string and in after is an object
        return [
          `${indent}  + ${property}: {`,
          recursivelyIndentChildren(after[property] `${indent}    `),
          `${indent}  - ${property}: ${before[property]}`];
      }
      // if both property values are strings
      if (before[property] === after[property]) {
      // if property values (strings) are equal
        return `${indent}    ${property}: ${before[property]}`;
      }
      // if property values (strings) are not equal
      return [
        `${indent}  + ${property}: ${after[property]}`,
        `${indent}  - ${property}: ${before[property]}`];
    } else if (property in before) {
    // if property exists only in before
      if (before[property] instanceof Object) {
      // if its value is an object
        return [
          `${indent}  - ${property}: {`,
          recursivelyIndentChildren(before[property], `${indent}    `)];
      }
      // if its value is a string
      return `${indent}  - ${property}: ${before[property]}`;
    }
    // if property exists only in after
    if (after[property] instanceof Object) {
    // if its value is an object
      return [
        `${indent}  + ${property}: {`,
        recursivelyIndentChildren(after[property], `${indent}    `)];
    }
    // if its value is a string
    return `${indent}  + ${property}: ${after[property]}`;
  });
};

const compareData = (dataBefore, dataAfter) => {
  const diffs = compareDataIter(dataBefore, dataAfter, baseIndent);
  const flatDiffs = _.flattenDeep(diffs);
  return ['{', ...flatDiffs, '}'].join('\n');
};

export default compareData;
