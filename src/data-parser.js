const parseData = {
  json(...rawData) {
    return [...rawData].map(rawDataItem => JSON.parse(rawDataItem));
  },
  yml(rawData) {
    return rawData;
  },
};

export default parseData;
