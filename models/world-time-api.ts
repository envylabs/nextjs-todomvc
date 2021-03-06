import { isLeft } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import api from './world-time-api.timezones.json';
import prettyReporter from 'io-ts-reporters';
import axios, { AxiosResponse } from 'axios';
import { optional, sparseType } from 'io-ts-extra';

function keyObject<T extends readonly string[]>(
  array: T
): { [K in T[number]]: null } {
  return Object.fromEntries(array.map((value) => [value, null])) as any;
}

const DEFAULT_TIME_ZONE = 'America/New_York';

const WorldTimeAPIResponse = sparseType({
  abbreviation: t.string,
  client_ip: t.string,
  datetime: t.string,
  day_of_week: t.number,
  day_of_year: t.number,
  dst: t.boolean,
  dst_from: optional(t.string),
  dst_offset: t.number,
  dst_until: optional(t.string),
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
  let response: AxiosResponse;
  timezone = timezone || DEFAULT_TIME_ZONE;

  if (!isKnownTimezone(timezone)) {
    throw new Error(`Unknown timezone requested: ${timezone}`);
  }

  try {
    response = await axios.get(
      `http://worldtimeapi.org/api/timezone/${timezone}`,
      { timeout: 5000 }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }

  const parsedResponseBody = WorldTimeAPIResponse.decode(response.data);

  if (isLeft(parsedResponseBody)) {
    throw new Error(prettyReporter.report(parsedResponseBody).join(', '));
  }

  return new Date(parsedResponseBody.right.datetime);
}
