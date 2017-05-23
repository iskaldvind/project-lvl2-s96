const fs = require('fs');

const getData = (file) => {
  if (!fs.existsSync(file)) {
    throw new Error(`File ${file} does not exist!`);
  }
  return fs.readFileSync(file, 'utf-8');
};

export default getData;
