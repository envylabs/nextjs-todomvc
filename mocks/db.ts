import { drop } from '@mswjs/data';
import { FactoryAPI, ModelAPI } from '@mswjs/data/lib/glossary';

import { Name as ScenarioName, scenarios } from './scenarios';

export class DB {
  private readonly _factories: Record<string, FactoryAPI<any>> = {};

  clear(): void {
    for (const serviceName in this._factories) {
      drop(this._factories[serviceName]);
    }
  }

  loadScenario(name: ScenarioName): void {
    const scenario = scenarios[name];

    if (!scenario) {
      throw new Error(`Unknown scenario requested: ${name}`);
    }

    scenario(this);
  }

  modelsFor(serviceName: string, factoryName: string): ModelAPI<any, any> {
    const service = this._factories[serviceName];

    if (!service) {
      throw new Error(`Unrecognized service requested: ${serviceName}`);
    }

    const factory = service[factoryName];

    if (!factory) {
      throw new Error(
        `Unrecognized factory requested: ${serviceName}, ${factoryName.toString()}`
      );
    }

    return factory;
  }

  register(service: string, factories: FactoryAPI<any>): void {
    if (this._factories[service]) {
      throw new Error(`Factory already registered at ${service}`);
    }

    this._factories[service] = factories;
  }
}
