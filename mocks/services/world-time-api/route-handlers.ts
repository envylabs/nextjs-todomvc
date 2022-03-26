import { rest } from 'msw';

import { RouteHandlers } from '../types';

const routeHandlers: RouteHandlers = (db) => {
  return [
    rest.get<never, { area: string; location: string }>(
      '/api/timezone/:area/:location',
      (request, response, context) => {
        const timezones = db.modelsFor('worldTimeAPI', 'timezone');

        return response(
          context.json(
            timezones.findFirst({
              where: {
                id: {
                  equals: `${request.params.area}/${request.params.location}`,
                },
              },
            })
          )
        );
      }
    ),
  ];
};

export default routeHandlers;
