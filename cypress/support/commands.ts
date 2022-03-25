const selectors = {
  button: [
    'button',
    'a',
    '[role="button"]',
    'input[type="reset"]',
    'input[type="button"]',
    'input[type="submit"]',
    '[role="link"]',
    '[role="menuitem"]',
    'input[alt][type="image"]',
  ],
  text: [
    'input:not([type="reset"]):not([type="button"]):not([type="submit"])',
    'textarea',
    '[role="slider"]',
    '[role="spinbutton"]',
    '[role="textbox"]',
    '[contenteditable="true"]',
  ],
  toggle: [
    '[role="menuitemcheckbox"]',
    '[role="checkbox"]',
    '[type="checkbox"]',
    '[role="radio"]',
    '[type="radio"]',
  ],
};

function isLabelledElement(element: unknown): element is HTMLInputElement {
  return typeof (element as HTMLInputElement).labels === 'object';
}

Cypress.Commands.add('findControls', (selector, label) => {
  return cy
    .get<HTMLElement>(selectors[selector].join(','), { log: false })
    .then((elements) => {
      return elements.filter((_, element) => {
        if (
          element.ariaLabel === label ||
          element.ariaPlaceholder === label ||
          element.getAttribute('placeholder') === label ||
          element.textContent === label
        ) {
          return true;
        }

        if (isLabelledElement(element)) {
          for (let i = 0; i < element.labels.length; i++) {
            if (element.labels[i].textContent === label) {
              return true;
            }
          }
        }
      });
    });
});

Cypress.Commands.add('findControl', (selector, label) => {
  return cy.findControls(selector, label).then((elements) => {
    if (elements.length === 0)
      throw new Error(`no matching label found: ${label}`);

    if (elements.length > 1)
      throw new Error(
        `ambiguous label (${elements.length} elements found): ${label}`
      );

    return cy.wrap(elements, { log: false });
  });
});

Cypress.Commands.add('Click', (label) => {
  const cmd = Cypress.log({ name: 'click', message: label });

  cy.findControl('button', label)
    .then((element) => {
      cmd.set({ $el: element }).snapshot();
    })
    .click({ log: false })
    .then(() => {
      cmd.snapshot().end();
    });
});

Cypress.Commands.add('doubleClick', (label) => {
  const cmd = Cypress.log({ name: 'double-click', message: label });

  cy.findControl('button', label)
    .then((element) => {
      cmd.set({ $el: element }).snapshot();
    })
    .dblclick({ log: false })
    .then(() => {
      cmd.snapshot().end();
    });
});

Cypress.Commands.add('fillIn', (label, value, options = { enter: true }) => {
  const cmd = Cypress.log({ name: 'fill in', message: label });

  cy.findControl('text', label)
    .then((element) => {
      cmd.set({ $el: element }).snapshot();
    })
    .type(`${value}${options.enter ? '{enter}' : ''}`, { log: false })
    .then((element) => {
      cmd.snapshot().end();
    });
});

Cypress.Commands.add('toggle', (label) => {
  const cmd = Cypress.log({ name: 'toggle', message: label });

  cy.findControl('toggle', label)
    .then((element) => {
      cmd.set({ $el: element }).snapshot();
    })
    .click({ log: false })
    .then((element) => {
      cmd.snapshot().end();
    });
});

Cypress.Commands.add('factoryCreate', (service, factory, props) => {
  cy.task('factory:create', { service, factory, props }, { log: false });
});

Cypress.Commands.add('clearFactories', () => {
  cy.task('factory:clear', {}, { log: false });
});

Cypress.Commands.add('loadScenario', (name) => {
  cy.task('scenario:load', { name }, { log: false });
});
