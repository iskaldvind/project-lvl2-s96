import outputTree from './ast-to-tree';
import outputPlain from './ast-to-plain';
import outputJSON from './ast-to-json';

const renderers = { plain: outputPlain, tree: outputTree, json: outputJSON };

const outputAst = format => ast => renderers[format](ast);

export default outputAst;
