declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click a clickable item by label.
     */
    Click(label: string): Chainable<any>;

    /**
     * Double-click a clickable item by label.
     */
    doubleClick(label: string): Chainable<any>;

    /**
     * Fill in (type into) a typeable item by label.
     */
    fillIn(
      label: string,
      value: string,
      options?: { enter: boolean }
    ): Chainable<any>;

    /**
     * Find an element by type and label.
     */
    findControl(selector: string, label: string): Chainable<any>;

    /**
     * Find all elements by type and label.
     *
     */
    findControls(selector: string, label: string): Chainable<any>;

    /**
     * Toggle a toggleable item by label.
     */
    toggle(label: string): Chainable<any>;
  }
}
