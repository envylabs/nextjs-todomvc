describe('Counter', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('correctly pluralizes active item count', () => {
    cy.fillIn('What needs to be done?', 'Todo #1');

    cy.contains('1 item left').should('exist');

    cy.fillIn('What needs to be done?', 'Todo #2');

    cy.contains('2 items left').should('exist');

    cy.toggle('Complete Todo #2');

    cy.contains('1 item left').should('exist');

    cy.toggle('Complete Todo #1');

    cy.contains('0 items left').should('exist');
  });
});
