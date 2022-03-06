describe('Mark all as complete', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('toggles all todo completions when checked', () => {
    cy.fillIn('What needs to be done?', 'Todo #1');
    cy.fillIn('What needs to be done?', 'Todo #2');

    cy.findControl('toggle', 'Complete Todo #1').should('not.be.checked');
    cy.findControl('toggle', 'Complete Todo #2').should('not.be.checked');
    cy.findControl('toggle', 'Mark all as complete').should('not.be.checked');

    cy.toggle('Mark all as complete');

    cy.findControl('toggle', 'Mark all as complete').should('be.checked');
    cy.findControl('toggle', 'Complete Todo #1').should('be.checked');
    cy.findControl('toggle', 'Complete Todo #2').should('be.checked');

    cy.toggle('Mark all as complete');

    cy.findControl('toggle', 'Complete Todo #1').should('not.be.checked');
    cy.findControl('toggle', 'Complete Todo #2').should('not.be.checked');
    cy.findControl('toggle', 'Mark all as complete').should('not.be.checked');
  });

  it('is unchecked when a todo item is made active', () => {
    cy.fillIn('What needs to be done?', 'Todo #1');
    cy.fillIn('What needs to be done?', 'Todo #2');

    cy.findControl('toggle', 'Complete Todo #1').should('not.be.checked');
    cy.findControl('toggle', 'Complete Todo #2').should('not.be.checked');

    cy.toggle('Mark all as complete');

    cy.findControl('toggle', 'Mark all as complete').should('be.checked');
    cy.findControl('toggle', 'Complete Todo #1').should('be.checked');
    cy.findControl('toggle', 'Complete Todo #2').should('be.checked');

    cy.toggle('Complete Todo #1');

    cy.findControl('toggle', 'Mark all as complete').should('not.be.checked');
    cy.findControl('toggle', 'Complete Todo #1').should('not.be.checked');
    cy.findControl('toggle', 'Complete Todo #2').should('be.checked');
  });

  it('is checked when all todo items are made complete', () => {
    cy.fillIn('What needs to be done?', 'Todo #1');
    cy.fillIn('What needs to be done?', 'Todo #2');

    cy.findControl('toggle', 'Mark all as complete').should('not.be.checked');
    cy.findControl('toggle', 'Complete Todo #1').should('not.be.checked');
    cy.findControl('toggle', 'Complete Todo #2').should('not.be.checked');

    cy.toggle('Complete Todo #1');

    cy.findControl('toggle', 'Mark all as complete').should('not.be.checked');
    cy.findControl('toggle', 'Complete Todo #1').should('be.checked');
    cy.findControl('toggle', 'Complete Todo #2').should('not.be.checked');

    cy.toggle('Complete Todo #2');

    cy.findControl('toggle', 'Mark all as complete').should('be.checked');
    cy.findControl('toggle', 'Complete Todo #1').should('be.checked');
    cy.findControl('toggle', 'Complete Todo #2').should('be.checked');
  });
});
