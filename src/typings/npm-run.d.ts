/**
 * Custom typings for npmRun. Declaring this as a module doesn't seem to work. Typescript is ignoring this when
 * declared as module and instead things npmRun is some other type?
 * TODO: Investigate how to type npmRun properly
 */
export type npmRun = {
  execSync(cmd: string, options: { [key: string]: string }): void;
};

