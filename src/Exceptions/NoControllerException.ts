export class NoControllerException extends Error {
  constructor(controllerName: string) {
    super(
      `Cannot find ${controllerName} make sure the directory is properly set.`
    );
  }
}
