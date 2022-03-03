import { isLeft } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import api from './world-time-api.timezones.json';
import prettyReporter from 'io-ts-reporters';

function keyObject<T extends readonly string[]>(
  array: T
): { [K in T[number]]: null } {
  return Object.fromEntries(array.map((value) => [value, null])) as any;
}

const DEFAULT_TIME_ZONE = 'America/New_York';

const WorldTimeAPIResponse = t.type({
  abbreviation: t.string,
  client_ip: t.string,
  datetime: t.string,
  day_of_week: t.number,
  day_of_year: t.number,
  dst: t.boolean,
  dst_from: t.union([t.string, t.null]),
  dst_offset: t.number,
  dst_until: t.union([t.string, t.null]),
  raw_offset: t.number,
  timezone: t.keyof(keyObject(api.timezones)),
  unixtime: t.number,
  utc_datetime: t.string,
  utc_offset: t.string,
  week_number: t.number,
});

export function isKnownTimezone(timezone: string): boolean {
  return api.timezones.includes(timezone);
}

export async function getCurrentTime(timezone?: string | null): Promise<Date> {
  let response: Response;
  let rawResponseBody: unknown;
  timezone = timezone || DEFAULT_TIME_ZONE;

  if (!isKnownTimezone(timezone)) {
    throw new Error(`Unknown timezone requested: ${timezone}`);
  }

  try {
    response = await fetch(`https://worldtimeapi.org/api/timezone/${timezone}`);
  } catch (error) {
    console.error(error);
    throw error;
  }

  try {
    rawResponseBody = await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }

  const parsedResponseBody = WorldTimeAPIResponse.decode(rawResponseBody);

  if (isLeft(parsedResponseBody)) {
    throw new Error(prettyReporter.report(parsedResponseBody).join(', '));
  }

  try {
  } catch (error) {
    console.error(error);
    throw error;
  }

  return new Date(parsedResponseBody.right.datetime);
}
