const program = require('commander');

program
    .version('0.0.2')
    .description('Compares two configuration files and shows a difference')
    .option('-h, --help', 'output usage infirmation')
    .option('-V, --version', 'output the version number')
    .option('-f, --format [type]', 'output format')
    .parse(process.argv);

if (!program.args.length) program.help();
