import _ from 'lodash';

const treeIndents = { base: '    ', unchanged: '    ', added: '  + ', removed: '  - ' };

const printTreeFormat = (treeFormatter, ast, level, status) => {
  const currentBaseIndent = treeIndents.base.repeat(level - 1);
  const statusIndent = ast.type === 'updated' ? treeIndents[status] : treeIndents[ast.type];
  const leadingIndent = `${currentBaseIndent}${statusIndent}`;
  const trailingIndent = `${currentBaseIndent}${treeIndents.unchanged}`;
  const groupAstProperty = `${ast.property}: {`;
  if (ast.children.length) {
    return [
      `${leadingIndent}${groupAstProperty}`,
      ast.children.map(treeFormatter(level)),
      `${trailingIndent}}`,
    ];
  } else if (ast.type === 'updated') {
    return printTreeFormat(treeFormatter, {
      type: status,
      property: ast.property,
      newValue: ast.newValue,
      oldValue: ast.oldValue,
      children: ast.children },
      level);
  }
  const value = ast.type === 'added' ? ast.newValue : ast.oldValue;
  return [`${leadingIndent}${ast.property}: ${value}`];
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

const printPlainCompose = (ast, path) => {
  const chainedProperty = `${path}${ast.property}`;
  if (ast.children.length) {
    if (ast.type === 'added') {
      return [`Property '${chainedProperty}' was added with complex value`];
    } else if (ast.type === 'removed') {
      return [`Property '${chainedProperty}' was removed`];
    }
    return ast.children.map(child => printPlainCompose(child, `${chainedProperty === '' ? '' : `${chainedProperty}.`}`));
  } else if (ast.type === 'updated') {
    const [newValue, oldValue] = [ast.newValue, ast.oldValue].map((value) => {
      if (value instanceof Object) {
        return 'complex value';
      }
      return `'${value}'`;
    });
    return [`Property '${chainedProperty}' was updated. From ${oldValue} to ${newValue}`];
  }
  if (ast.type === 'added') {
    return [`Property '${chainedProperty}' was added with value: ${ast.newValue}`];
  } else if (ast.type === 'removed') {
    return [`Property '${chainedProperty}' was removed`];
  }
  return null;
};

const printJSON = (ast) => {
  if (!ast.children.length) {
    if (ast.type === 'updated') {
      const [newValue, oldValue] = [ast.newValue, ast.oldValue].map((value) => {
        if (value instanceof Object) {
          return printJSON(value);
        }
        return value;
      });
      return `"${ast.property}": {"status": "${ast.type}", "newValue": "${newValue}", "oldValue": "${oldValue}"}`;
    }
    const [realValueStr, realValue] = ast.type === 'added' ? ['newValue', ast.newValue] : ['oldValue', ast.oldValue];
    return `"${ast.property}": {"status": "${ast.type}", "${realValueStr}": "${realValue}"}`;
  }
  return `"${ast.property}": {"status": "${ast.type}", "children": {${ast.children.map(child => printJSON(child))}}}`;
};

const printers = {
  plain(ast) {
    return _.flattenDeep(ast.map(shrub => printPlainCompose(shrub, ''))).filter(item => item !== null).join('\n');
  },
  json(ast) {
    return JSON.parse(`{${ast.map(shrub => printJSON(shrub)).join(',')}}`);
  },
  tree(ast) {
    return ['{', ..._.flattenDeep(ast.map(shrubs => printTreeCompose(shrubs, 1))), '}'].join('\n');
  },
};

const printAst = format => ast => printers[format](ast);

export default printAst;
