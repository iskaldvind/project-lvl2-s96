const outputJSONCompose = (ast) => {
  if (!ast.children.length > 0) {
    if (ast.type === 'updated') {
      const [newValue, oldValue] = [ast.newValue, ast.oldValue].map((value) => {
        if (value instanceof Object) {
          return outputJSONCompose(value);
        }
        return value;
      });
      return `"${ast.property}": {"status": "${ast.type}", "newValue": "${newValue}", "oldValue": "${oldValue}"}`;
    }
    const [realValueStr, realValue] = ast.type === 'added' ? ['newValue', ast.newValue] : ['oldValue', ast.oldValue];
    return `"${ast.property}": {"status": "${ast.type}", "${realValueStr}": "${realValue}"}`;
  }
  return `"${ast.property}": {"status": "${ast.type}", "children": {${ast.children.map(child => outputJSONCompose(child))}}}`;
};

const outputJSON = ast => JSON.parse(`{${ast.map(shrub => outputJSONCompose(shrub)).join(',')}}`);

export default outputJSON;
