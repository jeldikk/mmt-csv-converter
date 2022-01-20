"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logWarning = exports.logError = exports.logInfo = void 0;
var electron_1 = require("electron");
var electron_log_1 = require("electron-log");
var path = require("path/posix");
electron_log_1.default.transports.console.format = "{h}:{i}:{s} > {text}";
electron_log_1.default.transports.file.resolvePath = function () {
    return path.join(electron_1.app.getPath("appData"), "mmt-logs/main.log");
};
function logInfo(message) {
    electron_log_1.default.info(message);
}
exports.logInfo = logInfo;
function logError(message) {
    electron_log_1.default.error(message);
}
exports.logError = logError;
function logWarning(message) {
    electron_log_1.default.warn(message);
}
exports.logWarning = logWarning;
//# sourceMappingURL=logger.js.map