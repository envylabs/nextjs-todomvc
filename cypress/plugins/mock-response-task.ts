import { getLocal, Mockttp } from 'mockttp';

let _mockServer: Mockttp | undefined;

async function clearMockedResponses(): Promise<null> {
  if (!_mockServer) {
    return null;
  }

  await _mockServer.stop();
  _mockServer = undefined;

  return null;
}

async function getServer(): Promise<Mockttp> {
  if (!_mockServer) {
    _mockServer = getLocal();
    await _mockServer.start(3001);
  }

  return _mockServer;
}

async function mockResponse({
  body,
  method,
  status,
  url,
}: {
  body: string | Buffer;
  method: 'get';
  status: number;
  url: string | RegExp;
}): Promise<null> {
  const mockServer = await getServer();

  switch (method) {
    case 'get':
      mockServer.forGet(url).thenReply(status, body);
      return null;
  }
}

export function mockResponseTask(
  on: Cypress.PluginEvents,
  _config: Cypress.PluginConfigOptions
): void {
  on('task', {
    'response:mock:clear': clearMockedResponses,
    'response:mock': mockResponse,
  });
}
