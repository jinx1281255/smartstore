

'use strict';
const { electron, globalShortcut, app, ipcMain, BrowserWindow }  = require('electron')
//var ncp = require('copy-paste').global()
let win = null

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null
}

function createMainWindow() {
	const win = new BrowserWindow({ //electron.BrowserWindow({
		minWidth: 300,
		minHeight: 510,
		maxHeight: 510,
		maxWidth: 300,
		width: 300,
		height: 510,
		titleBarStyle: 'customButtonsOnHover',
		frame: false,
		backgroundColor: '#292F39' 
	})
	win.loadURL(`file://${__dirname}/index.html`);
	win.webContents.openDevTools()
	// Register shortcuts listener.
	const areport = globalShortcut.register('Cmd+Shift+R', () => {
		win.webContents.send('gHKReport', 'Report Sent')
		// test = function (){
		// 	test.copy = exports.copy
		// 	test.paste = exports.paste
		// 	return exports
		// }
		
	})
	const aentity = globalShortcut.register('Cmd+Shift+E', () => {
		win.webContents.send('gHKEntity', 'Entity Sent')
	})
	const acase = globalShortcut.register('Cmd+Shift+C', () => {
		win.webContents.send('gHKCase', 'Case Sent')
	})
	const aauditrule = globalShortcut.register('Cmd+Shift+A', () => {
		win.webContents.send('gHKAuditRule', 'Audit Rule Sent')
	})
	const aworkflow = globalShortcut.register('Cmd+Shift+W', () => {
		win.webContents.send('gHKWorkflow', 'Workflow Sent')
	})
	const auser = globalShortcut.register('Cmd+Shift+U', () => {
		win.webContents.send('gHKUser', 'User Sent')
	})
	win.on('closed', onClosed);
	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
})

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
})

ipcMain.on('fieldsFull', (event, arg) => {
    console.log(arg)
})
ipcMain.on('copyExec', (event, arg) => {
	console.log(arg + 'from ipcMain')
})

