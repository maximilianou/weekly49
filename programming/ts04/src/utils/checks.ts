/* istanbul ignore next */
export function assertNever(value: never, msg: string): never {
  throw new Error(msg + ": " + JSON.stringify(value));
}
