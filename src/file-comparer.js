import path from 'path';
import fs from 'fs';
import parseData from './data-parser';
import compareData from './data-comparer';

const readFile = file => fs.readFileSync(file, 'utf-8');

const gendiff = (fileBefore, fileAfter) => {
  const rawData = [fileBefore, fileAfter]
    .map(filepath => path.resolve(filepath))
    .map(file => readFile(file));
  const extension = path.extname(fileBefore).slice(1);
  const [dataBefore, dataAfter] = parseData(extension)(rawData);
  return compareData(dataBefore, dataAfter);
};

export default gendiff;
