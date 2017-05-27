import _ from 'lodash';

const treeIndents = { base: '    ', unchanged: '    ', added: '  + ', removed: '  - ' };

const printTreeFormat = (treeFormatter, ast, level, status) => {
  const currentBaseIndent = treeIndents.base.repeat(level === 0 ? level : level - 1);
  const statusIndent = ast.type === 'updated' ? treeIndents[status] : treeIndents[ast.type];
  const leadingIndent = level === 0 ? '' : `${currentBaseIndent}${statusIndent}`;
  const trailingIndent = level === 0 ? '' : `${currentBaseIndent}${treeIndents.unchanged}`;
  const groupAstProperty = ast.property === '' ? '{' : `${ast.property}: {`;
  if (ast.children) {
    return [
      `${leadingIndent}${groupAstProperty}`,
      ast.children.map(treeFormatter(level)),
      `${trailingIndent}}`,
    ];
  } else if (ast.value instanceof Array) {
    const realValue = status === 'added' ? ast.value[0] : ast.value[1];
    return printTreeFormat(treeFormatter,
      { type: status, property: ast.property, value: realValue }, level);
  }
  return [`${leadingIndent}${ast.property}: ${ast.value}`];
};

const printTreeCompose = (ast, level) => {
  const treeFormatter = currentLevel => child => printTreeCompose(child, currentLevel + 1);
  if (ast.type === 'updated') {
    return [
      printTreeFormat(treeFormatter, ast, level, 'added'),
      printTreeFormat(treeFormatter, ast, level, 'removed'),
    ];
  }
  return [printTreeFormat(treeFormatter, ast, level)];
};

const printTree = ast => _.flattenDeep(printTreeCompose(ast, 0)).join('\n');

const printPlainCompose = (ast, path) => {
  const chainedProperty = `${path}${ast.property}`;
  if (ast.children) {
    if (ast.type === 'added') {
      return [`Property '${chainedProperty}' was added with complex value`];
    } else if (ast.type === 'removed') {
      return [`Property '${chainedProperty}' was removed`];
    }
    return ast.children.map(child => printPlainCompose(child, `${chainedProperty === '' ? '' : `${chainedProperty}.`}`));
  } else if (ast.value instanceof Array) {
    const [newValue, oldValue] = [ast.value[0], ast.value[1]].map((value) => {
      if (value instanceof Object) {
        return 'complex value';
      }
      return `'${value}'`;
    });
    return [`Property '${chainedProperty}' was updated. From ${oldValue} to ${newValue}`];
  }
  if (ast.type === 'added') {
    return [`Property '${chainedProperty}' was added with value: ${ast.value}`];
  } else if (ast.type === 'removed') {
    return [`Property '${chainedProperty}' was removed`];
  }
  return null;
};

const printPlain = ast => _.flattenDeep(printPlainCompose(ast, '')).filter(item => item !== null).join('\n');

const printJSON = ast => JSON.stringify(ast);

const printAst = (ast, format) => {
  switch (format) {
    case 'plain':
      return printPlain(ast);
    case 'json':
      return printJSON(ast);
    default:
      return printTree(ast);
  }
};

export default printAst;
