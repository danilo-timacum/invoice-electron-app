/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

console.log(
	'👋 This message is being logged by "renderer.js", included via Vite'
);

import './app';

// function updateImagePaths() {
// 	const images = document.querySelectorAll('img[data-asset]');

// 	console.log('inside updateImagePaths');

// 	images.forEach(async (img) => {
// 		console.log(img);
// 		const asset = img.getAttribute('data-asset');
// 		const src = await window.electron.getAssetPath(asset);
// 		img.src = src;
// 	});
// }

// function getAssetPath(asset) {
// 	if (process.env.NODE_ENV === 'development') {
// 		return path.join(__dirname, '..', 'assets', asset);
// 	} else {
// 		return path.join(__dirname, 'assets', asset);
// 	}
// }

// document.addEventListener('DOMContentLoaded', updateImagePaths);
