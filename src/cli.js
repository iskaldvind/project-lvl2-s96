import program from 'commander';
import gendiff from './file-comparer';

const main = () => {
  program
    .version('0.0.85')
    .arguments('<firstConfig> <secondConfig>')
    .description('Compares two configuration files and shows a difference')
    .option('-f, --format [type]', 'output format')
    .action((firstConfig, secondConfig, options) => {
      console.log(gendiff(options.format, firstConfig, secondConfig));
    })
    .parse(process.argv);

  if (!program.args.length) {
    program.help();
  }
};

export default main;
