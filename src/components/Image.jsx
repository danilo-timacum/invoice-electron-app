import React, { useState, useEffect } from 'react';

async function getAssetPath(assetName) {
	try {
		let assetPath = await window.electron.getAssetPath(assetName);
		console.log('Asset Path:', assetPath); // Log the asset path
		assetPath = assetPath ? `${encodeURI(assetPath)}` : ''; // Convert path to URL file://
		return assetPath;
	} catch (error) {
		console.error('Failed to get asset path:', error);
	}
}

export function ImageComponent({ assetName }) {
	const [src, setSrc] = useState('');

	useEffect(() => {
		async function fetchAssetPath() {
			const assetPath = await getAssetPath(assetName);
			console.log(assetPath);
			setSrc(assetPath);
		}

		fetchAssetPath();
	}, [assetName]);

	function handleError(e) {
		console.error('Failed to load image:', e);
	}

	return <img src={src} alt={assetName} onError={handleError} />;
}
