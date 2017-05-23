import fs from 'fs';

const readFile = (file) => {
  if (!fs.existsSync(file)) {
    throw new Error('File does not exist!');
  }
  return fs.readFileSync(file, 'utf-8');
};

export default readFile;
