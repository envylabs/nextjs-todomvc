import { DB } from './db';
import { Name as ScenarioName } from './scenarios';
import { Server } from './server';
import { routeHandlers } from './services';

export { Server } from './server';

interface ServerOptions {
  hostname?: string;
  scenarioName?: ScenarioName;
}

export interface ServerResult {
  db: DB;
  stop(): Promise<void>;
}

export async function startServers({
  hostname = 'localhost',
  scenarioName,
}: ServerOptions): Promise<ServerResult> {
  const servers: Server[] = [];
  const db = new DB();

  if (scenarioName) {
    db.loadScenario(scenarioName);
  }

  for (const name in routeHandlers) {
    const routeHandler = routeHandlers[name as keyof typeof routeHandlers];
    const server = new Server({
      db,
      handlers: routeHandler.handler(db),
      hostname,
      port: routeHandler.port,
    });
    await server.listen();
    servers.push(server);
  }

  return {
    db,
    stop: async () => {
      for (const server of servers) {
        await server.stop();
      }
    },
  };
}
