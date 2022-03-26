import { factory } from '@mswjs/data';
import { InitialValues } from '@mswjs/data/lib/glossary';

import factoriesWorldTimeAPI from './world-time-api/factories';
import routeHandlersWorldTimeAPI from './world-time-api/route-handlers';

export const routeHandlers = {
  worldTimeAPI: { handler: routeHandlersWorldTimeAPI, port: 3001 },
};

const serviceModelDictionaries = {
  worldTimeAPI: factoriesWorldTimeAPI,
};

export function factories() {
  return {
    worldTimeAPI: factory(factoriesWorldTimeAPI),
  };
}

export type ServiceFactoryMap = ReturnType<typeof factories>;
export type ServiceFactory<S extends keyof ServiceFactoryMap> =
  ServiceFactoryMap[S];
export type ServiceModelDictionaries = typeof serviceModelDictionaries;
export type ServiceModelValues<
  S extends keyof ServiceModelDictionaries,
  D extends keyof ServiceModelDictionaries[S]
> = InitialValues<ServiceModelDictionaries[S], D>;
