import _ from 'lodash';

const compareData = (dataPair) => {
  const [before, after] = dataPair;
  const propertiesBefore = Object.keys(before);
  const propertiesAfter = Object.keys(after);
  const propertiesUnion = _.union(propertiesBefore, propertiesAfter);
  const diffs = propertiesUnion.map((property) => {
    if ((property in before) && (property in after)) {
      if (before[property] === after[property]) {
        return `    ${property}: ${before[property]}`;
      }
      return [`  + ${property}: ${after[property]}`, `  - ${property}: ${before[property]}`];
    } else if (property in before) {
      return `  - ${property}: ${before[property]}`;
    }
    return `  + ${property}: ${after[property]}`;
  });
  const flatDiffs = _.flatten(diffs);
  return ['{', ...flatDiffs, '}'].join('\n');
};

export default compareData;
