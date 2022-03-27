#!/usr/bin/env ts-node

import { Name as ScenarioName } from './scenarios';

import { startServers } from '.';

const scenarioName: ScenarioName =
  (process.argv[2] as ScenarioName) ||
  process.env.MOCK_SCENARIO ||
  'staticTime';

console.log(`Starting mock servers with ${scenarioName}`);
startServers({ hostname: 'localhost', scenarioName })
  .then(() => {
    console.log(`Mock servers are running.`);
  })
  .catch(() => {
    console.error('Mock server(s) failed to start.');
    process.exit(1);
  });

export {};
