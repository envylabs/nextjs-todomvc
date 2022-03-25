import {
  factories as worldTimeAPIFactories,
  handlers as worldTimeAPIHandlers,
} from './world-time-api';

export const factories = {
  worldTimeAPI: worldTimeAPIFactories,
};

export const handlers = {
  worldTimeAPI: worldTimeAPIHandlers,
};

export type Handlers = typeof handlers;
export type Factories = typeof factories;
export type Name = keyof Handlers | keyof Factories;
