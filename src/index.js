const program = require('commander');

program
  .version('0.0.18')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(`${firstConfig} and ${secondConfig}`);
    process.exit(1);
  })
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);

if (!program.args.length) {
  program.help();
}
