import path from 'path';
import fs from 'fs';
import parseData from './data-parser';
import buildDiffAST from './ast-builder';
import { printTree, printPlain } from './ast-printer';

const validFormats = ['tree', 'plain'];

const readFile = file => fs.readFileSync(file, 'utf-8');

const gendiff = (...args) => {
  console.log([args]);
  const [format, fileBefore, fileAfter] = args.length === 3 ? [...args] : ['tree', ...args];
  console.log('===>');
  console.log(format);
  console.log(fileBefore);
  console.log(fileAfter);
  console.log('<===');
  const rawData = [fileBefore, fileAfter]
    .map(filepath => path.resolve(filepath))
    .map(file => readFile(file));
  const extension = path.extname(fileBefore).slice(1);
  const [dataBefore, dataAfter] = parseData(extension)(rawData);
  const diffAST = buildDiffAST(dataBefore, dataAfter);
  if (format === 'tree') {
    return printTree(diffAST);
  }
  return printPlain(diffAST);
};

export default gendiff;
