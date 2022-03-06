describe('New Todo', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('focuses the new todo input on load', () => {
    cy.focused().should('have.attr', 'placeholder', 'What needs to be done?');
  });

  it('adds a new todo with ENTER', () => {
    cy.focused()
      .type('Todo #1')
      .should('have.value', 'Todo #1')
      .type('{enter}');
    cy.contains('Todo #1').should('exist');
  });

  it('clears the new todo when submitted', () => {
    cy.focused()
      .type('Todo #1')
      .should('have.value', 'Todo #1')
      .type('{enter}')
      .should('have.value', '');
  });

  it('trims new todos', () => {
    cy.fillIn('What needs to be done?', '\t Todo With Whitespace \t ');
    cy.contains('Todo With Whitespace').should('exist');
  });

  it('does not add a todo of whitespace', () => {
    cy.fillIn('What needs to be done?', '\t\t\t ').should('have.value', '');
    cy.contains('Active').should('not.exist'); // placeholder for not finding an empty element
  });
});
