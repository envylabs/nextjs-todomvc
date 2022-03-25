#!/usr/bin/env ts-node

import { Name as ScenarioName } from './scenarios';

import { createServer } from '.';

const scenarioName: ScenarioName =
  (process.argv[2] as ScenarioName) || 'staticTime';
const hostname = 'localhost';
const port = 3001;

console.log(`Starting mock server with ${scenarioName}`);
const server = createServer({ scenarioName });
server.listen({ hostname, port }).then(
  () => {
    console.log(`Mock server is running on http://localhost:3001/.`);
  },
  () => {
    console.error('Mock server failed to start.');
    process.exit(1);
  }
);

export {};
