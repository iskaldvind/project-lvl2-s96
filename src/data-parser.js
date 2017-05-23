import yaml from 'js-yaml';

const parseData = {
  json(...rawData) {
    try {
      return [...rawData].map(rawDataItem => JSON.parse(rawDataItem));
    } catch (err) {
      throw new Error('Unable to read file (missing or has wrong json format)!');
    }
  },
  yml(...rawData) {
    try {
      return [...rawData].map(rawDataItem => yaml.load(rawDataItem));
    } catch (err) {
      throw new Error('Unable to read file (missing or has wrong yml format)!');
    }
  },
};

export default parseData;
