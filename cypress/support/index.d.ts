declare namespace Cypress {
  type ServiceFactoryMap = import('../../mocks/services').ServiceFactoryMap;
  type ServiceModelDictionaries =
    import('../../mocks/services').ServiceModelDictionaries;
  type ServiceModelValues<
    S extends keyof ServiceModelDictionaries,
    D extends keyof ServiceModelDictionaries[S]
  > = import('../../mocks/services').ServiceModelValues<S, D>;
  type ScenarioName = import('../../mocks/scenarios').Name;

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
     * Toggle a togglable item by label.
     */
    toggle(label: string): Chainable<any>;

    /**
     * Create a one-off service model.
     */
    create<
      S extends keyof ServiceModelDictionaries,
      F extends keyof ServiceModelDictionaries[S],
      P extends ServiceModelValues<S, F>
    >(
      serviceName: S,
      factoryName: F,
      props?: P
    ): Chainable<Subject>;

    /**
     * Load a set of service models from a scenario.
     */
    scenario(name: ScenarioName): Chainable<Subject>;

    /**
     * Stop all mock servers.
     */
    stopMockServers(): Chainable<Subject>;

    task<
      S extends keyof ServiceFactoryMap,
      F extends keyof ServiceFactoryMap[S]
    >(
      event: 'factory:create',
      arg: { serviceName: S; factoryName: F; props: any },
      options?: Partial<Loggable & Timeoutable>
    ): Chainable<Subject>;

    task(
      event: 'mocks:stop',
      arg: {},
      options?: Partial<Loggable & Timeoutable>
    ): Chainable<Subject>;

    task(
      event: 'scenario:load',
      arg: { name: ScenarioName },
      options?: Partial<Loggable & Timeoutable>
    ): Chainable<Subject>;
  }
}
