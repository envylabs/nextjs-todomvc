import { Server as HTTPServer, createServer } from 'http';

import { createMiddleware } from '@mswjs/http-middleware';
import express_esm, * as express_common from 'express';
import { Express } from 'express';
import { RestHandler } from 'msw';

import { DB } from './db';

const express = express_esm || express_common;

export class Server {
  private readonly _app: Express;
  private readonly _server: HTTPServer;
  private readonly _handlers: RestHandler[] = [];

  constructor(public readonly db: DB) {
    this._app = express();
    this._server = createServer(this._app);
  }

  async listen(
    { hostname, port }: { hostname: string; port: number } = {
      hostname: 'localhost',
      port: 3001,
    }
  ): Promise<void> {
    this._app.use(createMiddleware(...this._handlers));
    this._server.listen(port, hostname);
    return Promise.resolve();
  }

  register(handlers: RestHandler[]): void {
    this._handlers.push(...handlers);
  }

  reset(): void {
    this.db.clear();
  }

  async stop(): Promise<void> {
    this._server.close();
    return Promise.resolve();
  }
}
