"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMmtFile = exports.validateMmtFile = void 0;
var child_process_1 = require("child_process");
var path = require("path");
var logger_1 = require("../logger");
var PYTHON_OPTIONS = {
    pythonPath: path.resolve(__dirname, "./venv/Scripts/python"),
    pythonOptions: ["-u"],
    scriptPath: path.resolve(__dirname, "./pyscripts"),
};
var validateExe = path.resolve(__dirname, "./bin/retrieve_mmt_info.exe");
var convertExe = path.resolve(__dirname, "./bin/single_mmt.exe");
function validateMmtFile(filename) {
    return __awaiter(this, void 0, void 0, function () {
        var exePath;
        return __generator(this, function (_a) {
            // const options: Options = {
            //   mode: "json",
            //   ...PYTHON_OPTIONS,
            //   args: ["-f", filename],
            // };
            console.log("validateMmtFile is called");
            exePath = path.resolve(__dirname, "./bin/retrieve_mmt_info.exe");
            console.log({ exePath: exePath });
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    // let pythonShell = PythonShell.run(
                    //   "retrieve_mmt_info.py",
                    //   options,
                    //   (err) => {
                    //     logError(`validate-pylib > error message: ${err}`);
                    //     if (err) reject(err);
                    //   }
                    // );
                    var validateExec = (0, child_process_1.spawn)(exePath, ["-f", filename]);
                    validateExec.stdout.on("data", function (data) {
                        (0, logger_1.logInfo)("validate-exe > " + data);
                        resolve(data);
                    });
                    validateExec.stderr.on("data", function (data) {
                        reject(data);
                    });
                    validateExec.on("close", function () {
                        (0, logger_1.logInfo)("validation exe is signing off");
                    });
                    // logInfo(`validate-pylib > shell command: ${pythonShell.command}`);
                    // pythonShell.on("message", (chunk) => {
                    //   logInfo(`validate-pylib > ${chunk}`);
                    //   resolve(chunk);
                    // });
                    // pythonShell.on("close", () => {
                    //   logInfo("validation pythonShell is signing off");
                    // });
                })];
        });
    });
}
exports.validateMmtFile = validateMmtFile;
function convertMmtFile(ifilename, ofolder) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // const options: Options = {
            //   mode: "json",
            //   ...PYTHON_OPTIONS,
            //   args: ["-f", ifilename, "-o", ofolder],
            // };
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    // let pythonShell = PythonShell.run("single_mmt.py", options, (err) => {
                    //   if (err) {
                    //     logError(`convert-pylib > error message: ${err.message}`);
                    //     reject(err.message);
                    //   }
                    // });
                    var convertProcess = (0, child_process_1.spawn)(convertExe, ["-f", ifilename, "-o", ofolder]);
                    // logInfo(`convert-pylib > shell command: ${pythonShell.command}`);
                    convertProcess.stdout.on("data", function (data) {
                        (0, logger_1.logInfo)("convert-pylib > message: " + data);
                        resolve(data);
                    });
                    convertProcess.stderr.on("data", function (err) {
                        (0, logger_1.logInfo)("convert-pylib > error: " + err);
                        reject(err);
                    });
                    convertProcess.on("close", function () {
                        (0, logger_1.logInfo)("convert-pylib is finished");
                    });
                    // pythonShell.on("message", (chunk) => {
                    //   resolve(chunk);
                    // });
                    // pythonShell.on("close", () => {
                    //   logInfo(`convert-pylib > convert pythonShell finished`);
                    // });
                })];
        });
    });
}
exports.convertMmtFile = convertMmtFile;
//# sourceMappingURL=pylib.js.map