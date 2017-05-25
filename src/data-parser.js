import ini from 'ini';
import yaml from 'js-yaml';

const dataParser = (data, parser) => {
  try {
    return data.map(dataItem => parser(dataItem));
  } catch (err) {
    throw new Error('Unable to parse data, assuming wrong format.');
  }
};

const parseDataRegisrty = {
  json(rawData) {
    return dataParser(rawData, JSON.parse);
  },
  yml(rawData) {
    return dataParser(rawData, yaml.load);
  },
  ini(rawData) {
    return dataParser(rawData, ini.parse);
  },
};

const parseData = extension => rawData => parseDataRegisrty[extension](rawData);

export default parseData;
