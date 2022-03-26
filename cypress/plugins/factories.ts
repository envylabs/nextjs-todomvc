import { ServerResult, startServers } from '../../mocks';
import { Name } from '../../mocks/scenarios';
import {
  ServiceModelValues,
  ServiceFactoryMap,
  ServiceModelDictionaries,
} from '../../mocks/services';

let _serverResult: ServerResult | undefined;

async function getServerResult(): Promise<ServerResult> {
  if (!_serverResult) {
    _serverResult = await startServers({});
  }

  return _serverResult;
}

async function factoryCreate<
  S extends keyof ServiceFactoryMap,
  F extends keyof ServiceFactoryMap[S],
  D extends keyof ServiceModelDictionaries[S],
  P extends ServiceModelValues<S, D>
>({
  serviceName,
  factoryName,
  props,
}: {
  serviceName: S;
  factoryName: F;
  props?: P;
}) {
  const server = await getServerResult();
  const factory = server.db.modelsFor(serviceName, factoryName);
  return (factory as any).create(props);
}

async function loadScenario({ name }: { name: Name }): Promise<void> {
  const server = await getServerResult();
  await server.db.loadScenario(name);
  return null;
}

async function stopServers(): Promise<void> {
  if (_serverResult) {
    await _serverResult.stop();
    _serverResult = undefined;
  }

  return null;
}

export function setupFactoryTasks(
  on: Cypress.PluginEvents,
  _config: Cypress.PluginConfigOptions
): void {
  on('task', {
    'mocks:stop': stopServers,
    'factory:create': factoryCreate,
    'scenario:load': loadScenario,
  });
}
