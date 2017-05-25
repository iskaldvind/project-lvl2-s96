import ini from 'ini';
import yaml from 'js-yaml';

const dataParser = (data, parser) => data.map(dataItem => parser(dataItem));

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
