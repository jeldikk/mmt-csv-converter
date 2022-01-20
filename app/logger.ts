import { app } from "electron";
import log from "electron-log";
import * as path from "path/posix";

log.transports.console.format = "{h}:{i}:{s} :: {text}";
log.transports.file.resolvePath = () => {
  return path.join(app.getPath("appData"), "mmt-logs/main.log");
};

export function logInfo(message: string) {
  log.info(message);
}

export function logError(message: string) {
  log.error(message);
}

export function logWarning(message: string) {
  log.warn(message);
}
