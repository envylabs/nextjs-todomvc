describe('Server-Side Network', () => {
  afterEach(() => {
    cy.clearFactories();
  });

  it('displays the current time from worldtimeapi.org', () => {
    cy.factoryCreate('worldTimeAPI', 'timezone', {
      datetime: '2022-03-17T19:34:17.689501-04:00',
      id: 'America/New_York',
    });

    cy.visit('/');
    cy.Click('server-side request');
    cy.contains('The time is').should(
      'have.attr',
      'datetime',
      '2022-03-17T23:34:17.689Z'
    );
  });

  it('displays the current time from worldtimeapi.org via a scenario', () => {
    cy.loadScenario('staticTime');

    cy.visit('/');
    cy.Click('server-side request');
    cy.contains('The time is').should(
      'have.attr',
      'datetime',
      '2022-03-17T23:34:17.689Z'
    );
  });
});
