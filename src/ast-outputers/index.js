import _ from 'lodash';
import outputTree from './ast-to-tree';
import outputPlain from './ast-to-plain';
import outputJSON from './ast-to-json';

const formatters = {
  plain(ast) {
    return _.flattenDeep(ast.map(shrub => outputPlain(shrub, ''))).filter(item => item !== null).join('\n');
  },
  json(ast) {
    return JSON.parse(`{${ast.map(shrub => outputJSON(shrub)).join(',')}}`);
  },
  tree(ast) {
    return ['{', ..._.flattenDeep(ast.map(shrubs => outputTree(shrubs, 1))), '}'].join('\n');
  },
};

const outputAst = format => ast => formatters[format](ast);

export default outputAst;