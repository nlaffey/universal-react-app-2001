### Things to look into more
* Be more critical of what should be included in dependencies/devDependencies

### Known issues

* React hydrate is throwing a warning about the serverside html not being what was expected:
```
bundle.js:6 Warning: Did not expect server HTML to contain the text node "
        " in <div>.
 ```
* Unable to run dev script when using Intellij with yarn selected as the project manager
its giving the error below. It works fine when starting via command line with yarn or if I use npm as
the package manager in Intellij:

```
/home/nick/.nvm/versions/node/v8.0.0/bin/node /home/nick/.nvm/versions/node/v8.0.0/lib/node_modules/yarn/bin/yarn.js run dev
yarn run v1.5.1
$ PORT=3000 node $NODE_DEBUG_OPTION ./utils/startDevelopment.js
/home/nick/git/tacocat/utils/startDevelopment.js:3
const { webpackWatchWithLogging } = require('./runWebpack');
      ^

SyntaxError: Unexpected token {
    at exports.runInThisContext (vm.js:53:16)
    at Module._compile (module.js:374:25)
    at Object.Module._extensions..js (module.js:417:10)
 ```