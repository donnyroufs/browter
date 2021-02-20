import { DEFAULT_CONTROLLERS_DIR } from "./Constants";

export interface IRouterConfig {
  controllersDir: string;
}

export let config = <IRouterConfig>{
  controllersDir: DEFAULT_CONTROLLERS_DIR,
};

export function setRouterConfig(_config: IRouterConfig) {
  config = {
    ...config,
    ..._config,
  };
}
