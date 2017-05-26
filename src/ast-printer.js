import _ from 'lodash';

const treeIndents = { base: '    ', unchanged: '    ', added: '  + ', deleted: '  - ' };

const printTreeFormat = (formatter, ast, level, status) => {
  const currentBaseIndent = treeIndents.base.repeat(level === 0 ? level : level - 1);
  const statusIndent = ast.diff === 'changed' ? treeIndents[status] : treeIndents[ast.diff];
  const leadingIndent = level === 0 ? '' : `${currentBaseIndent}${statusIndent}`;
  const trailingIndent = level === 0 ? '' : `${currentBaseIndent}${treeIndents.unchanged}`;
  const groupAstProperty = ast.property === '' ? '{' : `${ast.property}: {`;
  if (ast.value instanceof Array) {
    return [
      `${leadingIndent}${groupAstProperty}`,
      ast.value.map(formatter(level)),
      `${trailingIndent}}`,
    ];
  } else if (ast.value instanceof Object) {
    const trueValue = status === 'added' ? ast.value.new : ast.value.old;
    return printTreeFormat(formatter,
      { diff: status, property: ast.property, value: trueValue }, level);
  }
  return [`${leadingIndent}${ast.property}: ${ast.value}`];
};

const printTreeCompose = (ast, level) => {
  const formatter = currentLevel => child => printTreeCompose(child, currentLevel + 1);
  if (ast.diff === 'changed') {
    return [
      printTreeFormat(formatter, ast, level, 'added'),
      printTreeFormat(formatter, ast, level, 'deleted'),
    ];
  }
  return [printTreeFormat(formatter, ast, level)];
};

export const printTree = ast => _.flattenDeep(printTreeCompose(ast, 0)).join('\n');

export const printPlain = (ast, level) => null * level;
