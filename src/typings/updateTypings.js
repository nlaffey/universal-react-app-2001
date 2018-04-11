import * as npmRun from 'npm-run';
import * as fs from 'fs';
import { typeIds } from '../contentful/typeIds';
import { getEntriesOfType } from '../contentful/service';
export var updateAllTypings = function () {
    Object.keys(typeIds).forEach(function (key) {
        var id = typeIds[key];
        updateTypingsByEntryId(key, id);
    });
};
// TODO: Limit query to just get 1. That's all we need.
var updateTypingsByEntryId = function (interfaceName, id) {
    getEntriesOfType(id).then(function (data) {
        console.log("Creating type, interfaceName: " + interfaceName + ", id: " + id);
        var path = "/contentful/" + interfaceName;
        fs.writeFileSync(__dirname + path + '-full.json', JSON.stringify(data));
        fs.writeFileSync(__dirname + path + '.json', JSON.stringify(data.items[0].fields));
        var command = "make_types -i ." + path + ".d.ts ." + path + ".json " + interfaceName;
        npmRun.execSync(command, { cwd: __dirname });
    }).catch(function (error) {
        console.error("Error during updateInterfaceByEntryId, interfaceName: " + interfaceName + ", id: " + id + "\n        Error: " + error + "\n    ");
    });
};
updateAllTypings();
//# sourceMappingURL=updateTypings.js.map