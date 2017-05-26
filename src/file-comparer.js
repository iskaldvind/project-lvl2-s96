import path from 'path';
import fs from 'fs';
import parseData from './data-parser';
import buildDiffAST from './ast-builder';
import { printTree } from './ast-printer';

const readFile = file => fs.readFileSync(file, 'utf-8');

const gendiff = (fileBefore, fileAfter) => {
  const rawData = [fileBefore, fileAfter]
    .map(filepath => path.resolve(filepath))
    .map(file => readFile(file));
  const extension = path.extname(fileBefore).slice(1);
  const [dataBefore, dataAfter] = parseData(extension)(rawData);
  const diffAST = buildDiffAST(dataBefore, dataAfter);
  // console.log(diffAST);
  return printTree(diffAST);
  // console.log(diff);
  // return compareData(dataBefore, dataAfter);
  // return diff;
};

export default gendiff;
