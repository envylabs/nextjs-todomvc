import { RestHandler } from 'msw';

import { DB } from '../db';

export type RouteHandlers = (db: DB) => RestHandler[];
