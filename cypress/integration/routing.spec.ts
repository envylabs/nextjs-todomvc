describe('Routing', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('filters displayed todos', () => {
    cy.fillIn('What needs to be done?', 'Todo #1');
    cy.fillIn('What needs to be done?', 'Todo #2');
    cy.toggle('Complete Todo #1');

    cy.Click('All');

    cy.contains('Todo #1').should('exist');
    cy.contains('Todo #2').should('exist');

    cy.Click('Active');

    cy.contains('Todo #1').should('not.exist');
    cy.contains('Todo #2').should('exist');

    cy.Click('Completed');

    cy.contains('Todo #1').should('exist');
    cy.contains('Todo #2').should('not.exist');

    cy.Click('All');

    cy.contains('Todo #1').should('exist');
    cy.contains('Todo #2').should('exist');
  });
});
