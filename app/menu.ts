import { BrowserWindow, ipcMain, Menu, MenuItem, MenuItemConstructorOptions } from "electron"

export const menuTemplate: (MenuItemConstructorOptions | MenuItem)[] = [
    {
        label: 'Help',
        submenu: [
            {
                role: 'quit'
            }
        ]
    }
] 

export const mainMenu = Menu.buildFromTemplate(menuTemplate)