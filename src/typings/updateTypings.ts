import * as npmRun from 'npm-run';
import * as fs from 'fs';
import { typeIds } from '../contentful/typeIds';
import { getEntriesOfType } from '../contentful/service';

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
    const path = `/contentful/${interfaceName}`;
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
