require('ts-node').register({project: "./tsconfig.electron.json",}); // This will register the TypeScript compiler
require('./electron/index.ts'); // This will load our Typescript application