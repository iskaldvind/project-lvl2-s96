import path from 'path';
import readFile from './file-reader';
import parseData from './data-parser';
import compareData from './data-comparer';

const compareFiles = (fileBefore, fileAfter) => {
  const rawData = [fileBefore, fileAfter].map(file => readFile(file));
  const extension = path.extname(fileBefore).slice(1);
  const parsedData = parseData(extension)(rawData);
  return compareData(parsedData);
};

export default compareFiles;
