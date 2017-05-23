#! /usr/bin/env node
import main from '../';
import compareFiles from '../compare';

if (!module.parent) {
  main();
}

export default compareFiles;
