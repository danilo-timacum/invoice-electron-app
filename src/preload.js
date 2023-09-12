// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electron', {
// 	getAssetPath: (asset) => ipcRenderer.invoke('get-asset-path', asset),
// });

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
	showTest: () => {
		console.log('clicked show');
		ipcRenderer.send('show-test');
	},
	hideTest: () => {
		console.log('clicked hide');
		ipcRenderer.send('hide-test');
	},
});
