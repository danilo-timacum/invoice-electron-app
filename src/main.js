const {
	app,
	BrowserWindow,
	ipcMain,
	Notification,
	ipcRenderer,
} = require('electron');
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

	let testWindow = new BrowserWindow({
		// parent: mainWindow,
		// contextBridge: true,
		title: 'test',
		width: 500,
		height: 500,
		show: false,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			devTools: isDev,
		},
	});

	// ('window-all-closed');
	// ('before-quit');
	// ('will-quit');
	// ('quit');

	mainWindow.on('close', (event) => {
		console.log('close event');
		app.quit();
	});
	// mainWindow.on('closed', (event) => {
	// 	console.log('closed event');
	// });
	// mainWindow.on('hise', (event) => {
	// 	console.log('hise event');
	// });
	// mainWindow.on('minimize', (event) => {
	// 	console.log('minimize event');
	// });

	// mainWindow.on('before-quit', (event) => {
	// 	console.log('before-quit event');
	// 	console.log(event);
	// 	event.preventDefault();
	// 	testWindow.hide();
	// });

	// mainWindow.on('before-unload', (event) => {
	// 	console.log('before-unload event');
	// 	console.log(event);
	// 	event.preventDefault();
	// 	testWindow.hide();
	// });

	// mainWindow.on('close', (event) => {
	// 	console.log('close event');
	// 	console.log(event);
	// 	event.preventDefault();
	// 	mainWindow.hide();
	// 	testWindow.hide();
	// });

	// testWindow.on('before-quit', (event) => {
	// 	console.log('before-quit event');
	// 	console.log(event);
	// 	event.preventDefault();
	// 	testWindow.hide();
	// });

	// testWindow.on('before-unload', (event) => {
	// 	console.log('before-unload event');
	// 	console.log(event);
	// 	event.preventDefault();
	// 	testWindow.hide();
	// });

	// testWindow.on('page-hide', (event) => {
	// 	console.log('page-hide event');
	// 	console.log(event);
	// 	event.preventDefault();
	// 	testWindow.hide();
	// });

	// testWindow.on('close', (event) => {
	// 	console.log('close event');
	// 	console.log(event);
	// 	event.preventDefault();
	// 	testWindow.hide();
	// });

	// testWindow.on('closed', (event) => {
	// 	// if (win.hideInsteadOfClose == true) {
	// 	console.log('closed event');
	// 	console.log(event);
	// 	event.preventDefault();
	// 	testWindow.hide();
	// 	// }
	// });

	// Set a variable when the app is quitting.
	// var isAppQuitting = false;
	// testWindow.on('before-quit', function (evt) {
	// 	isAppQuitting = true;
	// });

	// testWindow.on('close', function (evt) {
	// 	if (!isAppQuitting) {
	// 		evt.preventDefault();
	// 	}
	// });

	const showTestWindow = () => {
		if (testWindow.isDestroyed()) {
			console.log('destroyed');
			testWindow = new BrowserWindow({
				// parent: mainWindow,
				// contextBridge: true,

				title: 'test',
				width: 500,
				height: 500,
				show: true,
				// closable: false,
				webPreferences: {
					preload: path.join(__dirname, 'preload.js'),
					devTools: isDev,
				},
			});
			if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
				testWindow.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/test.html`);
			} else {
				testWindow.loadFile(
					path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/test.html`)
				);
			}
		} else {
			console.log('not destroyed');
			testWindow.show();
		}
	};

	ipcMain.on('show-test', () => {
		showTestWindow();
		console.log('ipcmain on show-test');
	});

	ipcMain.on('hide-test', () => {
		console.log(testWindow.isDestroyed());
		if (!testWindow.isDestroyed()) {
			testWindow.hide();
		}
		console.log('ipcmain on hide-test');
	});

	ipcMain.on('create-test', () => {
		const testWindow = new BrowserWindow({
			// parent: mainWindow,
			// contextBridge: true,

			title: 'test',
			width: 500,
			height: 500,
			// show: false,
			closable: true,
			webPreferences: {
				preload: path.join(__dirname, 'preload.js'),
				devTools: isDev,
			},
		});
		if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
			testWindow.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/test.html`);
			// child.show();
		} else {
			testWindow.loadFile(
				path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/test.html`)
			);
			// child.show();
		}
		console.log('ipcmain on create-test');
		let count = BrowserWindow.getAllWindows().length;
		console.log({ count });
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

console.log(process.platform);

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

// state management setup
let sharedState;

ipcMain.on('state-update', (event, newState) => {
	sharedState = newState;

	console.log('Received state update in main process:', newState);
	BrowserWindow.getAllWindows().forEach((win) => {
		if (event.sender !== win.webContents) {
			console.log('Sending state update to other windows:', newState);
			win.webContents.send('state-update', newState);
		}
	});
});

ipcMain.handle('get-current-state', (event) => {
	return sharedState;
});

const showNotification = (title, body) => {
	const myNotification = new Notification({ title, body });
	// myNotification.on('click', () => {
	// 	console.log('Notification clicked');
	// 	console.log(BrowserWindow.getAllWindows());
	// 	BrowserWindow.getAllWindows()[0].webContents.send('show-test');
	// });
	myNotification.show();
};

ipcMain.on('show-notification', (event, a, b) => {
	console.log(a, b);
	showNotification(a, b);
});
