const treeIndents = { base: '    ', unchanged: '    ', added: '  + ', removed: '  - ' };

const outputTreeFormat = (treeFormatter, ast, level, status) => {
  const currentBaseIndent = treeIndents.base.repeat(level - 1);
  const statusIndent = ast.type === 'updated' ? treeIndents[status] : treeIndents[ast.type];
  const leadingIndent = `${currentBaseIndent}${statusIndent}`;
  const trailingIndent = `${currentBaseIndent}${treeIndents.unchanged}`;
  const groupAstProperty = `${ast.property}: {`;
  if (ast.children.length > 0) {
    return [
      `${leadingIndent}${groupAstProperty}`,
      ast.children.map(treeFormatter(level)),
      `${trailingIndent}}`,
    ];
  } else if (ast.type === 'updated') {
    return outputTreeFormat(treeFormatter, {
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

const outputTree = (ast, level) => {
  const treeFormatter = currentLevel => child => outputTree(child, currentLevel + 1);
  if (ast.type === 'updated') {
    return [
      outputTreeFormat(treeFormatter, ast, level, 'added'),
      outputTreeFormat(treeFormatter, ast, level, 'removed'),
    ];
  }
  return [outputTreeFormat(treeFormatter, ast, level)];
};

export default outputTree;
