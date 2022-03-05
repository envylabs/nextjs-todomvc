import type { NextApiHandler } from 'next';
import { getCurrentTime } from '../../models/world-time-api';
import * as t from 'io-ts';
import { isLeft } from 'fp-ts/lib/Either';
import { optional, sparseType } from 'io-ts-extra';
import prettyReporter from 'io-ts-reporters';

export const RequestPayload = sparseType({
  timezone: optional(t.string),
});

export const ResponsePayload = t.type({
  time: t.string,
});

const handler: NextApiHandler = async (request, response) => {
  const { method } = request;
  let time: Date;
  let timezone: string | null | undefined;
  let parsedRequestBody: t.Validation<t.TypeOf<typeof RequestPayload>>;

  if (method !== 'GET') {
    response.setHeader('Allow', ['GET']);
    response.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  if (request.query) {
    parsedRequestBody = RequestPayload.decode(request.query);

    if (isLeft(parsedRequestBody)) {
      response
        .status(422)
        .json({ error: prettyReporter.report(parsedRequestBody).join(', ') });
      return;
    }

    timezone = parsedRequestBody.right.timezone;
  }

  try {
    time = await getCurrentTime(timezone);
  } catch (error) {
    console.error(error);
    response.status(503).json({
      error: error instanceof Error ? error.message : 'An error occurred',
    });
    return;
  }

  response.status(200).json({ time });
};

export default handler;
