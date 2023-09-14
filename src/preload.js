// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electron', {
// 	getAssetPath: (asset) => ipcRenderer.invoke('get-asset-path', asset),
// });
// if (isTest) {
// }

const { contextBridge, ipcRenderer } = require('electron');
import('wdio-electron-service/preload');

contextBridge.exposeInMainWorld('electronAPI', {
	showTest: () => {
		console.log('clicked show');
		ipcRenderer.send('show-test');
	},
	hideTest: () => {
		console.log('clicked hide');
		ipcRenderer.send('hide-test');
	},
	createTest: () => {
		console.log('clicked create');
		ipcRenderer.send('create-test');
	},

	showNotification: (a, b) => {
		console.log('clicked show notification');
		ipcRenderer.send('show-notification', a, b);
	},

	initState: (setState) => {
		console.log('inside initState');
		const stateUpdateHandler = (event, newState) => {
			console.log({ receivedState: newState });
			setState(newState);
		};

		ipcRenderer.on('state-update', stateUpdateHandler);

		// Return a cleanup function to remove the event listener
		return () => {
			console.log('state-update listener cleanup');
			ipcRenderer.removeListener('state-update', stateUpdateHandler);
		};
	},

	sharedState: async () => ipcRenderer.invoke('get-current-state'),

	sendStateUpdate: (state) => {
		console.log({ state });
		ipcRenderer.send('state-update', state);
	},
});
