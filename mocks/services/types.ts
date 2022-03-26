import { ModelDictionary } from '@mswjs/data/lib/glossary';
import { RestHandler } from 'msw';

import { DB } from '../db';

export type RouteHandlers = (db: DB) => RestHandler[];
export type Factories = ModelDictionary;
