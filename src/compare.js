import * as _ from 'lodash';
import getData from './getData';

const initialDifferency = {};
const initialDifferencyStr = '';

const getDifferency = (differency) => {
  const differencyStr = Object.keys(differency).reduce((acc, property) => {
    if (property[2] === '*') {
      const propertyStart = property.slice(0, 2);
      const propertyEnd = property.slice(3);
      const newValue = differency[property][0];
      const oldValue = differency[property][1];
      return `${acc}${propertyStart}+${propertyEnd}: ${newValue}\n${propertyStart}-${propertyEnd}: ${oldValue}\n`;
    }
    return `${acc}${property}: ${differency[property]}\n`;
  }, initialDifferencyStr);
  return `{\n${differencyStr}}\n`;
};

export const compareData = (formerData, latterData) => {
  const formerProperties = Object.keys(formerData);
  const latterProperties = Object.keys(latterData);
  const propertyAdditions = _.difference(latterProperties, formerProperties);
  const differencyWithAdditions = propertyAdditions.reduce((acc, property) => {
    acc[`  + ${property}`] = latterData[property];
    return acc;
  }, initialDifferency);
  const propertyRemovals = _.difference(formerProperties, latterProperties);
  const differencyWithRemovals = propertyRemovals.reduce((acc, property) => {
    acc[`  - ${property}`] = formerData[property];
    return acc;
  }, differencyWithAdditions);
  const propertyUnchanged = _.intersection(formerProperties, latterProperties);
  const valuesUnchanged = propertyUnchanged.filter(property =>
  formerData[property] === latterData[property]);
  const differencyWithUnchangedValues = valuesUnchanged.reduce((acc, property) => {
    acc[`    ${property}`] = formerData[property];
    return acc;
  }, differencyWithRemovals);
  const valuesChanged = _.difference(propertyUnchanged, valuesUnchanged);
  return valuesChanged.reduce((acc, property) => {
    acc[`  * ${property}`] = [latterData[property], formerData[property]];
    return acc;
  }, differencyWithUnchangedValues);
};

const compareFiles = (former, latter) => {
  try {
    const formerData = JSON.parse(getData(former));
    const latterData = JSON.parse(getData(latter));
    const differency = compareData(formerData, latterData);
    return getDifferency(differency);
  } catch (err) {
    return err[0];
  }
};

export default compareFiles;
