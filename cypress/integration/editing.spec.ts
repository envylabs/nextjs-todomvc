describe('Editing', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('edits a todo by double-clicking its title', () => {
    cy.fillIn('What needs to be done?', 'Todo #1');

    cy.get('[aria-label="Edit Todo #1"').should('not.exist');

    cy.doubleClick('Todo #1');

    cy.get('[aria-label="Edit Todo #1"').should('exist');
  });

  it('focuses on the todo title input when editing', () => {
    cy.fillIn('What needs to be done?', 'Todo #1');
    cy.doubleClick('Todo #1');
    cy.get('[aria-label="Edit Todo #1"').should('have.focus');
  });

  it('changes a todo title with ENTER', () => {
    cy.fillIn('What needs to be done?', 'Todo #1');

    cy.contains('Todo #1 Edited').should('not.exist');

    cy.doubleClick('Todo #1');

    cy.fillIn('Edit Todo #1', ' Edited');

    cy.contains('Todo #1 Edited').should('exist');
  });

  it('changes a todo title when blurred', () => {
    cy.fillIn('What needs to be done?', 'Todo #1');

    cy.contains('Todo #1 Edited').should('not.exist');

    cy.doubleClick('Todo #1');

    cy.fillIn('Edit Todo #1', ' Edi', { enter: false });

    cy.contains('Todo #1 Edited').should('not.exist');

    cy.fillIn('Edit Todo #1', 'ted', { enter: false }).blur();

    cy.contains('Todo #1 Edited').should('exist');
  });

  it('removes empty todos after editing', () => {
    cy.fillIn('What needs to be done?', 'Todo #1');
    cy.doubleClick('Todo #1');
    cy.fillIn('Edit Todo #1', '{selectAll} ');
    cy.contains('Todo #1').should('not.exist');
    cy.contains('Active').should('not.exist'); // placeholder for not finding an empty element
  });

  it('ignores and resets an edit on ESCAPE', () => {
    cy.fillIn('What needs to be done?', 'Todo #1');
    cy.doubleClick('Todo #1');
    cy.fillIn('Edit Todo #1', ' Edited{esc}', { enter: false });

    cy.contains('Todo #1 Edited').should('not.exist');
    cy.contains('Todo #1').should('exist');
  });
});
