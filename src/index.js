import compareFiles from './compare';

const program = require('commander');

const main = () => {
  program
    .version('0.0.33')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      console.log(compareFiles(firstConfig, secondConfig));
    })
    .description('Compares two configuration files and shows a difference')
    .option('-f, --format [type]', 'output format')
    .parse(process.argv);

  if (!program.args.length) {
    program.help();
  }
};

export default main;

