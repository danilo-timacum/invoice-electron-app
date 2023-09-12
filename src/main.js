const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
	app.quit();
}

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		// width: 800,
		// height: 600,
		// contextBridge: true,
		width: 1920,
		height: 1080,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			devTools: isDev,
		},
	});

	const testWindow = new BrowserWindow({
		parent: mainWindow,
		// contextBridge: true,
		width: 500,
		height: 500,
		show: false,
		closable: false,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			devTools: isDev,
		},
	});

	ipcMain.on('show-test', () => {
		testWindow.show();
		console.log('ipcmain on show-test');
	});

	ipcMain.on('hide-test', () => {
		testWindow.hide();
		console.log('ipcmain on hide-test');
	});

	// mainWindow.webContents.session.protocol.handle('media', async (request) => {
	// 	const pathname = decodeURIComponent(request.url.replace('media:///', ''));
	// 	try {
	// 		// Fetch the file using the net module
	// 		const response = await net.fetch(`file://${pathname}`);
	// 		return response;
	// 	} catch (error) {
	// 		console.error('Failed to handle protocol:', error);
	// 		return null;
	// 	}
	// });

	// mainWindow.webContents.session.protocol.handle('file', (request) => {
	// 	const pathname = decodeURIComponent(request.url.replace('file:///', ''));
	// 	return net.fetch(pathname);
	// });

	// and load the index.html of the app.
	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
		testWindow.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/test.html`);
		// child.show();
	} else {
		mainWindow.loadFile(
			path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
		);
		testWindow.loadFile(
			path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/test.html`)
		);
		// child.show();
	}

	// Open the DevTools.
	mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// function getAssetPath(asset) {
// 	if (process.env.NODE_ENV === 'development') {
// 		return path.join(__dirname, '..', 'assets', asset);
// 	} else {
// 		return path.join(process.resourcesPath, 'assets', asset);
// 	}
// }

// ipcMain.handle('get-asset-path', (event, asset) => {
// 	return getAssetPath(asset);
// });
