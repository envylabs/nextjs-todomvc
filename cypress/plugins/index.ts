import { setupFactoryTasks } from './factories';

const pluginConfig: Cypress.PluginConfig = (on, config) => {
  setupFactoryTasks(on, config);
};

export default pluginConfig;
