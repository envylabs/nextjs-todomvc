import { primaryKey } from '@mswjs/data';

const factories = {
  timezone: {
    abbreviation: () => 'EDT',
    client_ip: () => '1.1.1.1',
    datetime: () => JSON.stringify(new Date()),
    day_of_week: () => 1,
    day_of_year: () => 1,
    dst_from: () => '',
    dst_offset: () => 1,
    dst_until: () => '',
    dst: () => true,
    id: primaryKey(() => 'America/New_York'),
    raw_offset: () => 1,
    timezone: () => 'America/New_York',
    unixtime: () => 1,
    utc_datetime: () => '1',
    utc_offset: () => '1',
    week_number: () => 1,
  },
};

export default factories;
