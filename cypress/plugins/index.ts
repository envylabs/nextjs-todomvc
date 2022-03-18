import { mockResponseTask } from './mock-response-task';

const pluginConfig: Cypress.PluginConfig = (on, config) => {
  mockResponseTask(on, config);
};

export default pluginConfig;
