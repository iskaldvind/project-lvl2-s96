const parseData = {
  json(...rawData) {
    try {
      return [...rawData].map(rawDataItem => JSON.parse(rawDataItem));
    } catch (err) {
      throw new Error('Unable to read file (missing or has wrong format)!');
    }
  },
  yml(rawData) {
    return rawData;
  },
};

export default parseData;
