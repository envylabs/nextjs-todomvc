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
  private readonly _hostname: string;
  private readonly _port: number;
  readonly db: DB;

  constructor({
    db,
    handlers,
    hostname = 'localhost',
    port,
  }: {
    db: DB;
    handlers: RestHandler[];
    hostname?: string;
    port: number;
  }) {
    this.db = db;
    this._handlers = handlers;
    this._hostname = hostname;
    this._port = port;

    this._app = express();
    this._app.use(createMiddleware(...this._handlers));
    this._server = createServer(this._app);
  }

  async listen(): Promise<void> {
    this._server.listen(this._port, this._hostname);
    return Promise.resolve();
  }

  async stop(): Promise<void> {
    this._server.close();
    return Promise.resolve();
  }
}
