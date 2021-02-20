import { DEFAULT_CONTROLLERS_DIR } from "./Constants";
import { CatchExceptionsWrapper } from "./CatchExceptionsWrapper";

export interface IRouterConfig {
  controllersDir: string;
  catchExceptionsWrapper: typeof CatchExceptionsWrapper;
}

export let config = <IRouterConfig>{
  controllersDir: DEFAULT_CONTROLLERS_DIR,
  catchExceptionsWrapper: CatchExceptionsWrapper,
};

export function setRouterConfig(_config: IRouterConfig) {
  config = {
    ...config,
    ..._config,
  };
}
