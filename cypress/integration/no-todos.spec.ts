describe('No todos', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('hides the #main content', () => {
    cy.contains('Mark all as complete').should('not.exist');
  });

  it('hides the #footer content', () => {
    cy.contains('0 items left').should('not.exist');
  });
});
