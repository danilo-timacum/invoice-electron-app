import './Sidebar.css';
import { Link } from 'react-router-dom';
import React from 'react';
import imgLogo from '../assets/logo.svg';
import imgSun from '../assets/icon-moon.svg';
import imgMoon from '../assets/icon-sun.svg';
import imgAvatar from '../assets/image-avatar.jpg';

async function getAssetPath(assetName) {
	try {
		const assetPath = await window.electron.getAssetPath(assetName);
		console.log(assetPath);
		return assetPath;
	} catch (error) {
		console.error('Failed to get asset path:', error);
	}
}

const Sidebar = ({ theme, setTheme }) => {
	const toggleTheme = () => {
		setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
	};

	return (
		<aside className='sidebar'>
			<div className='sidebar-logo-wrapper'>
				<Link to='/'>
					<img src={imgLogo} alt='logo' />
				</Link>
			</div>
			<div onClick={toggleTheme} className='sidebar-toggle-theme'>
				<img src={theme === 'light' ? imgMoon : imgSun} alt='icon-moon' />
			</div>
			<div className='sidebar-avatar-image'>
				<img src={imgAvatar} alt='avatar' />
				{/* <img data-asset='image-avatar.jpg' alt='avatar' />
				<img
					src='file://Users/Danilo/Documents/test/invoice-electron-app/out/invoice-electron-app-darwin-arm64/invoice-electron-app.app/Contents/Resources/assets/image-avatar.jpg'
					alt='avatar'
				/>
				<ImageComponent assetName='image-avatar.jpg' /> */}
			</div>
		</aside>
	);
};

export default Sidebar;
