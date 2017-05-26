import path from 'path';
import fs from 'fs';
import parseData from './data-parser';
import buildDiffAST from './ast-builder';
import { printTree, printPlain } from './ast-printer';

const validFormats = ['tree', 'plain'];

const readFile = file => fs.readFileSync(file, 'utf-8');

const gendiff = (...args) => {
  const [passedFormat, fileBefore, fileAfter] = args.length === 3 ? args : ['tree', ...args];
  const format = passedFormat !== undefined && validFormats.indexOf(passedFormat) !== -1 ? passedFormat : 'tree';
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
