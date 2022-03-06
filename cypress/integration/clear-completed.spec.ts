describe('Clear Completed', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('removes completed todos when clicked', () => {
    cy.fillIn('What needs to be done?', 'Todo #1');
    cy.toggle('Complete Todo #1');
    cy.Click('Clear completed');
  });

  it('is hidden with no completed todos', () => {
    cy.contains('Clear completed').should('not.exist');

    cy.fillIn('What needs to be done?', 'Todo #1');

    cy.contains('Clear completed').should('not.exist');

    cy.toggle('Complete Todo #1');

    cy.contains('Clear completed').should('exist');

    cy.toggle('Complete Todo #1'); // making it active again

    cy.contains('Clear completed').should('not.exist');
  });
});
