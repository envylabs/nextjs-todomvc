import { createServer, Server } from '../../mocks';
import { Name } from '../../mocks/scenarios';

let _server: Server | undefined;

async function getServer(): Promise<Server> {
  if (!_server) {
    _server = createServer({});
    _server.listen({ hostname: 'localhost', port: 3001 });
  }

  return _server;
}

async function factoryCreate({
  service,
  factory,
  props,
}: {
  service: string;
  factory: string;
  props: any;
}): Promise<any> {
  const server = await getServer();
  return server.db.modelsFor(service, factory).create(props);
}

async function clearFactories(): Promise<void> {
  if (_server) {
    await _server.stop();
    _server = undefined;
  }

  return null;
}

async function loadScenario({ name }: { name: Name }): Promise<void> {
  const server = await getServer();
  await server.db.loadScenario(name);
  return null;
}

export function setupFactoryTasks(
  on: Cypress.PluginEvents,
  _config: Cypress.PluginConfigOptions
): void {
  on('task', {
    'factory:clear': clearFactories,
    'factory:create': factoryCreate,
    'scenario:load': loadScenario,
  });
}
