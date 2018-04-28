import * as npmRun from 'npm-run';
import * as fs from 'fs';
import { typeIds } from '../src/contentful/typeIds';
import { getEntriesOfType } from '../src/contentful/service';

export const updateAllTypings = () => {
  Object.keys(typeIds).forEach((key: string) => {
    const id: string = typeIds[key];
    updateTypingsByEntryId(key, id);
  });
};

// TODO: Limit query to just get 1. That's all we need.
const updateTypingsByEntryId = (interfaceName: string, id: string) => {
  getEntriesOfType(id).then((data) => {
    console.log(`Creating type, interfaceName: ${interfaceName}, id: ${id}`);
    const path = `${process.cwd()}/src/typings/contentful/${interfaceName}`;
    console.log(`path:${path}`);
    fs.writeFileSync(__dirname + path + '-full.json', JSON.stringify(data));
    fs.writeFileSync(__dirname + path + '.json', JSON.stringify(data.items[0].fields));
    const command = `make_types -i .${path}.d.ts .${path}.json ${interfaceName}`;
    npmRun.execSync(command, { cwd: __dirname });
  }).catch((error) => {
    console.error(`Error during updateInterfaceByEntryId, interfaceName: ${interfaceName}, id: ${id}
        Error: ${error}
    `);
  });
};


updateAllTypings();
