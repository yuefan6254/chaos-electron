const { Menu, MenuItem } = require('electron');
const menu = new Menu();

/**
 * 创建快捷键
 *
 */
function createMenu() {
    menu.append(new MenuItem({
        label: 'Print',
        accelerator: 'CmdOrCtrl+P',
        click: () => { console.log('time to print stuff') }
    }))
}

module.exports = {
    menu,
    createMenu
}