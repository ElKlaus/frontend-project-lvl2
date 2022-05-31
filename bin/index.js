#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/gendiff.js';
import stylish from '../formatters/stylish.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.3')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const formatter = program.opts().format ? program.opts().format : stylish; //check it
    console.log(genDiff(filepath1, filepath2, formatter));
  });

program.parse();
