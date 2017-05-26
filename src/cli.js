import program from 'commander';
import gendiff from './file-comparer';

const main = () => {
  program
    .version('0.0.79')
    .arguments('<firstConfig> <secondConfig>')
    .description('Compares two configuration files and shows a difference')
    .option('-f, --format [type]', 'output format')
    .action((firstConfig, secondConfig) => {
      console.log(gendiff(firstConfig, secondConfig));
    })
    .parse(process.argv);

  if (!program.args.length) {
    program.help();
  }
};

export default main;
