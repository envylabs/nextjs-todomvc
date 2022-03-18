describe('Client-Side Network', () => {
  beforeEach(() => {
    cy.clearMockedResponses();
  });

  afterEach(() => {
    cy.clearMockedResponses();
  });

  it('it displays the current time from worldtimeapi.org', () => {
    cy.mockResponse({
      body: JSON.stringify({
        abbreviation: 'EDT',
        client_ip: '162.252.136.123',
        datetime: '2022-03-17T19:34:17.689501-04:00',
        day_of_week: 4,
        day_of_year: 76,
        dst: true,
        dst_from: '2022-03-13T07:00:00+00:00',
        dst_offset: 3600,
        dst_until: '2022-11-06T06:00:00+00:00',
        raw_offset: -18000,
        timezone: 'America/New_York',
        unixtime: 1647560057,
        utc_datetime: '2022-03-17T23:34:17.689501+00:00',
        utc_offset: '-04:00',
        week_number: 11,
      }),
      method: 'get',
      status: 200,
      url: 'http://localhost:3001/api/timezone/America/New_York',
    });

    cy.visit('/');
    cy.Click('client-side request');
    cy.contains('The time is March 17, 2022 at 7:34:17 PM EDT').should('exist');
  });
});
