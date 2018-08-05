import { typeIds } from '../src/contentful/typeIds';
import { getEntriesOfType } from '../src/contentful/service';
import { npmRun } from '../src/typings/npm-run';
import * as fs from 'fs';

const npmRun: npmRun = require('npm-run');
/**
 * Utility to auto generate typings from the Contentful api. This currently uses maketypes which requires
 * that we execute a npm script. This isn't terrible but there might be a more convenient way of doing this?
 */

const debugMode = false;

function createDataJsonFiles(path: string, data) {
  fs.writeFileSync(__dirname + path + '-full.json', JSON.stringify(data));
  fs.writeFileSync(__dirname + path + '.json', JSON.stringify(data.items[0].fields));
}

// TODO: Limit initialQuery to just get 1. That's all we need.
// TODO: Make this more generic so other services can use it
function updateTypingsByEntryId(interfaceName: string, id: string) {
  getEntriesOfType(id).then((data) => {
    const path = `${process.cwd()}/src/typings/contentful/${interfaceName}`;
    console.log(`Creating type for entry id: ${id}, outputting to path: ${path}`);
    if (debugMode) {
      createDataJsonFiles(path, data);
    }
    const command = `make_types -i .${path}.d.ts .${path}.json ${interfaceName}`;
    npmRun.execSync(command, { cwd: __dirname });
  }).catch((error) => {
    console.error(`Error during updateInterfaceByEntryId, interfaceName: ${interfaceName}, id: ${id}
        Error: ${error}
    `);
  });
};

function updateAllContentfulTypings() {
  Object.keys(typeIds).forEach((key: string) => {
    const id: string = typeIds[key];
    updateTypingsByEntryId(key, id);
  });
};

updateAllContentfulTypings();
