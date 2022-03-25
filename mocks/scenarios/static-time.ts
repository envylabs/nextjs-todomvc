import { Scenario } from '.';

export const staticTime: Scenario = (db) => {
  const timezones = db.modelsFor('worldTimeAPI', 'timezone');

  timezones.create({
    datetime: '2022-03-17T19:34:17.689501-04:00',
    id: 'America/New_York',
  });
};
