import { compose, rest } from 'msw';

import { RouteHandlers } from '../types';

const routeHandlers: RouteHandlers = (db) => {
  return [
    rest.get<never, { area: string; location: string }>(
      '/api/timezone/:area/:location',
      (request, response, context) => {
        const id = `${request.params.area}/${request.params.location}`;
        const timezones = db.modelsFor('worldTimeAPI', 'timezone');
        const timezone = timezones.findFirst({ where: { id: { equals: id } } });

        if (!timezone) {
          return response(
            compose(
              context.status(404),
              context.json({ error: `unknown location ${id}` })
            )
          );
        }

        return response(context.json(timezone));
      }
    ),
  ];
};

export default routeHandlers;
