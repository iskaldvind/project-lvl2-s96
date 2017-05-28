import outputTree from './ast-to-tree';
import outputPlain from './ast-to-plain';
import outputJSON from './ast-to-json';

const formatters = {
  plain(ast) {
    return outputPlain(ast);
  },
  json(ast) {
    return outputJSON(ast);
  },
  tree(ast) {
    return outputTree(ast);
  },
};

const outputAst = format => ast => formatters[format](ast);

export default outputAst;
