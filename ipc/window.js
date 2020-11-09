/**
 * 窗口通信
 */

const { ipcMain, ipcRenderer, remote } = require('electron');
const is = require('electron-is');

// ipc通信发送的窗口状态改变事件的channel名称
const windowStateChangeChannel = 'window-state-changed';

// window当前状态
const WINDOW_STATE = {
    FULLSCREEN: 'full-screen',
    MAXIMIZED: 'maximized',
    MINIMIZED: 'minimized',
    HIDDEN: 'hidden',
    NORMAL: 'normal'
}

// window可执行操作，通过发送消息触发
const windowAction = {
    maximize: 'window-maximize',
    unmaximize: 'window-unmaximize',
    minimize: 'window-minimize',
    close: 'window-close'
}

/**
 * 获取window当前状态
 * @param {*} window 
 */
function getWindowState(window) {
    if (window.isFullScreen()) {
        return WINDOW_STATE.FULLSCREEN;
    }

    if (window.isMaximized()) {
        return WINDOW_STATE.MAXIMIZED;
    }

    if (window.isMinimized()) {
        return WINDOW_STATE.MINIMIZED;
    }

    if (!window.isVisible()) {
        return WINDOW_STATE.HIDDEN;
    }

    return WINDOW_STATE.NORMAL;
}

/**
 * 发送window-state-changed消息到renderer进程
 * @param {*} window 
 * @param {*} state 
 */
function sendWindowStateEvent(window, state) {
    window.webContents.send(windowStateChangeChannel, state)
}

/**
 * 注册window状态变化事件，发送消息到renderer进程
 * @param {*} window 
 */
function registerWindowStateChangedEvents(window) {
    window.on('enter-full-screen', () => sendWindowStateEvent(window, WINDOW_STATE.FULLSCREEN));
    window.on('leave-full-screen', () => sendWindowStateEvent(window, WINDOW_STATE.NORMAL));
    window.on('maximize', () => sendWindowStateEvent(window, WINDOW_STATE.MAXIMIZED));
    window.on('minimize', () => sendWindowStateEvent(window, WINDOW_STATE.MINIMIZED));
    window.on('unmaximize', () => sendWindowStateEvent(window, WINDOW_STATE.NORMAL));
    window.on('restore', () => sendWindowStateEvent(window, WINDOW_STATE.NORMAL));
    window.on('hide', () => sendWindowStateEvent(window, WINDOW_STATE.HIDDEN));
    window.on('show', () => sendWindowStateEvent(window, WINDOW_STATE.NORMAL));
}

/**
 * 注册window状态变化动作，使用ipcRenderer.send发送对应的消息触发
 * @param {*} window 
 */
function registerWindowStateChangeActions(window) {
    // 窗口最小化
    ipcMain.on(windowAction.minimize, () => window.minimize());
    // 窗口最大化
    ipcMain.on(windowAction.maximize, () => window.maximize());
    // 窗口取消最大化
    ipcMain.on(windowAction.unmaximize, () => window.unmaximize());
    // 窗口关闭
    ipcMain.on(windowAction.close, () => window.destroy())
}

/**
 * 生成带有Promise的操作窗口函数，可以进一步处理事件结束后的逻辑
 * @param {*} action 
 */
function generatePromisedWindowStateFunc(action) {
    return () => {
        return new Promise((resolve) => {
            ipcRenderer.send(action)
            ipcRenderer.once(windowStateChangeChannel, (event, args) => {
                resolve(args)
            })
        })
    }
}

/**
 * 生成不带有promise的操作窗口函数，只负责触发事件
 * @param {*} action 
 */
function generateWindowStateFunc(action) {
    return () => {
        ipcRenderer.send(action)
    }
}

/**
 * 最大化窗口，因为window与macOS的差异，单独写成一个函数
 */
function handleMaximizeWindow() {
    if (is.windows()) {
        remote.getCurrentWindow().maximize()
        return Promise.resolve(WINDOW_STATE.MAXIMIZED)
    }

    return new Promise((resolve) => {
        ipcRenderer.send(windowAction.maximize);
        ipcRenderer.once(windowStateChangeChannel, (event, args) => {
            resolve(args)
        })
    })
}

/**
 * 窗口操作方法，包括最大化，最小化，关闭
 * 每个方法返回一个promise。方便处理后续逻辑
 */
const windowStateActionResponse = {
    maximize: generatePromisedWindowStateFunc(windowAction.maximize),
    unmaximize: generatePromisedWindowStateFunc(windowAction.unmaximize),
    minimize: generatePromisedWindowStateFunc(windowAction.minimize),
    close: generatePromisedWindowStateFunc(windowAction.close)
}

/**
 * 窗口操作方法，包括最大化，最小化，关闭
 * 只发送消息，不处理成功之后的回调
 */
const windowStateAction = {
    maximize: generateWindowStateFunc(windowAction.maximize),
    unmaximize: generateWindowStateFunc(windowAction.unmaximize),
    minimize: generateWindowStateFunc(windowAction.minimize),
    close: generateWindowStateFunc(windowAction.close)
}

/**
 * 窗口改变事件增加监听
 * @param {*} handle 
 */
function listenToWindowStateChange(handle) {
    ipcRenderer.on(windowStateChangeChannel, handle);
    return () => {
        ipcRenderer.removeListener(windowStateChangeChannel, handle);
    }
}

export {
    WINDOW_STATE,
    getWindowState,
    registerWindowStateChangeActions,
    registerWindowStateChangedEvents,
    windowStateActionResponse,
    windowStateAction,
    listenToWindowStateChange
}