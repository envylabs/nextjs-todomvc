import type { DB } from '../db';

import { future } from './future';
import { staticTime } from './static-time';

export const scenarios = {
  future,
  staticTime,
};

export type Scenario = (db: DB) => void;
export type Scenarios = typeof scenarios;
export type Name = keyof Scenarios;
