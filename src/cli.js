import program from 'commander';
import gendiff from './file-comparer';

const main = () => {
  program
    .version('0.0.64')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      console.log(gendiff(firstConfig, secondConfig));
    })
    .description('Compares two configuration files and shows a difference')
    .option('-f, --format [type]', 'output format')
    .parse(process.argv);

  if (!program.args.length) {
    program.help();
  }
};

export default main;
