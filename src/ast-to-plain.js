const outputPlain = (ast, path) => {
  const chainedProperty = `${path}${ast.property}`;
  if (ast.children.length > 0) {
    if (ast.type === 'added') {
      return [`Property '${chainedProperty}' was added with complex value`];
    } else if (ast.type === 'removed') {
      return [`Property '${chainedProperty}' was removed`];
    }
    return ast.children.map(child => outputPlain(child, `${chainedProperty === '' ? '' : `${chainedProperty}.`}`));
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

export default outputPlain;
