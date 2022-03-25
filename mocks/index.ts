import { DB } from './db';
import { Name as ScenarioName } from './scenarios';
import { Server } from './server';
import { Name as ServiceName, factories, handlers } from './services';

export { Server } from './server';

type ServerOptions = {
  scenarioName?: ScenarioName;
};

export function createServer({ scenarioName }: ServerOptions): Server {
  const db = new DB();

  for (const name in factories) {
    db.register(name, factories[name as ServiceName]());
  }

  const server = new Server(db);

  for (const name in handlers) {
    server.register(handlers[name as ServiceName](db));
  }

  if (scenarioName) {
    db.loadScenario(scenarioName);
  }

  return server;
}
