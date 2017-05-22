const program = require('commander');

program
  .version('0.0.17')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(`${firstConfig} and ${secondConfig}`);
    process.exit(1);
  })
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);

if (!program.args.length) {
  console.log('Both <firstConfig> and <secondConfig> parameters are required!');
  process.exit(1);
}
