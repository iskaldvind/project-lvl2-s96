import _ from 'lodash';

const treeIndents = { base: '    ', unchanged: '    ', added: '  + ', removed: '  - ' };

const printTreeFormat = (treeFormatter, ast, level, status) => {
  const currentBaseIndent = treeIndents.base.repeat(level === 0 ? level : level - 1);
  const statusIndent = ast.diff === 'updated' ? treeIndents[status] : treeIndents[ast.diff];
  const leadingIndent = level === 0 ? '' : `${currentBaseIndent}${statusIndent}`;
  const trailingIndent = level === 0 ? '' : `${currentBaseIndent}${treeIndents.unchanged}`;
  const groupAstProperty = ast.property === '' ? '{' : `${ast.property}: {`;
  if (ast.value instanceof Array) {
    return [
      `${leadingIndent}${groupAstProperty}`,
      ast.value.map(treeFormatter(level)),
      `${trailingIndent}}`,
    ];
  } else if (ast.value instanceof Object) {
    const realValue = status === 'added' ? ast.value.new : ast.value.old;
    return printTreeFormat(treeFormatter,
      { diff: status, property: ast.property, value: realValue }, level);
  }
  return [`${leadingIndent}${ast.property}: ${ast.value}`];
};

const printTreeCompose = (ast, level) => {
  const treeFormatter = currentLevel => child => printTreeCompose(child, currentLevel + 1);
  if (ast.diff === 'updated') {
    return [
      printTreeFormat(treeFormatter, ast, level, 'added'),
      printTreeFormat(treeFormatter, ast, level, 'removed'),
    ];
  }
  return [printTreeFormat(treeFormatter, ast, level)];
};

export const printTree = ast => _.flattenDeep(printTreeCompose(ast, 0)).join('\n');

const printPlainCompose = (ast, path) => {
  const chainedProperty = `${path}${ast.property}`;
  if (ast.value instanceof Array) {
    if (ast.diff === 'added') {
      return [`Property '${chainedProperty}' was added with complex value`];
    } else if (ast.diff === 'removed') {
      return [`Property '${chainedProperty}' was removed`];
    }
    return ast.value.map(child => printPlainCompose(child, `${chainedProperty === '' ? '' : `${chainedProperty}.`}`));
  } else if (ast.value instanceof Object) {
    const newValue = (ast.value.new instanceof Object) ? 'complex value' : `'${ast.value.new}'`;
    const oldValue = (ast.value.old instanceof Object) ? 'complex value' : `'${ast.value.old}'`;
    return [`Property '${chainedProperty}' was updated. From ${oldValue} to ${newValue}`];
  }
  if (ast.diff === 'added') {
    return [`Property '${chainedProperty}' was added with value: ${ast.value}`];
  } else if (ast.diff === 'removed') {
    return [`Property '${chainedProperty}' was removed`];
  }
  return null;
};

export const printPlain = ast => _.flattenDeep(printPlainCompose(ast, '')).filter(item => item !== null).join('\n');
