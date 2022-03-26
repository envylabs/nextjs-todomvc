import { Name as ScenarioName, scenarios } from './scenarios';
import { ServiceFactory, ServiceFactoryMap, factories } from './services';

export class DB {
  constructor(private readonly _factories: ServiceFactoryMap = factories()) {}

  loadScenario(name: ScenarioName): void {
    const scenario = scenarios[name];

    if (!scenario) {
      throw new Error(`Unknown scenario requested: ${name}`);
    }

    scenario(this);
  }

  modelsFor<
    S extends keyof ServiceFactoryMap,
    F extends keyof ServiceFactory<S>
  >(serviceName: S, factoryName: F) {
    const service = this._factories[serviceName];

    if (!service) {
      throw new Error(`Unrecognized service requested: ${String(serviceName)}`);
    }

    const factory = service[factoryName];

    if (!factory) {
      throw new Error(
        `Unrecognized factory requested: ${String(serviceName)}, ${String(
          factoryName
        )}`
      );
    }

    return factory;
  }
}
