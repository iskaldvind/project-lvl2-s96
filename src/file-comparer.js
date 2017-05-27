import path from 'path';
import fs from 'fs';
import parseData from './data-parser';
import buildDiffAST from './ast-builder';
import printAst from './ast-printer';

const readFile = file => fs.readFileSync(file, 'utf-8');

const gendiff = (fileBefore, fileAfter, format = 'tree') => {
  const rawData = [fileBefore, fileAfter]
    .map(filepath => path.resolve(filepath)).map(file => readFile(file));
  const extension = path.extname(fileBefore).slice(1);
  const [dataBefore, dataAfter] = parseData(extension)(rawData);
  const diffAST = buildDiffAST(dataBefore, dataAfter);
  // console.log(diffAST);
  return printAst(format)(diffAST);
};

export default gendiff;
