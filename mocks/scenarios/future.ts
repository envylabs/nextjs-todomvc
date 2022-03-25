import { Scenario } from '.';

export const future: Scenario = (db) => {
  const timezones = db.modelsFor('worldTimeAPI', 'timezone');

  timezones.create({
    datetime: '2050-12-25T09:00:00.000000-04:00',
    id: 'America/New_York',
  });
};
