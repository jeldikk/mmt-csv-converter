"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainMenu = exports.menuTemplate = void 0;
var electron_1 = require("electron");
exports.menuTemplate = [
    {
        label: 'Help',
        submenu: [
            {
                role: 'quit'
            }
        ]
    }
];
exports.mainMenu = electron_1.Menu.buildFromTemplate(exports.menuTemplate);
//# sourceMappingURL=menu.js.map