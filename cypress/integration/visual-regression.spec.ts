import cypress = require('cypress');

describe('Visual Regression', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('starts with an empty list', () => {
    cy.percySnapshot();
  });

  it('properly displays mixed completion states', () => {
    cy.fillIn('What needs to be done?', 'Todo #1');
    cy.fillIn('What needs to be done?', 'Todo #2');
    cy.toggle('Complete Todo #1');
    cy.percySnapshot();
  });

  it('allows editing of todos', () => {
    cy.fillIn('What needs to be done?', 'Todo #1');
    cy.fillIn('What needs to be done?', 'Todo #2');
    cy.doubleClick('Todo #2');
    cy.percySnapshot();
  });
});
