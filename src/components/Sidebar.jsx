import './Sidebar.css';
import { Link } from 'react-router-dom';
import React from 'react';

const Sidebar = ({ theme, setTheme }) => {
	const toggleTheme = () => {
		setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
	};

	return (
		<aside className='sidebar'>
			<div className='sidebar-logo-wrapper'>
				<Link to='/'>
					<img src='../assets/logo.svg' alt='logo' />
				</Link>
			</div>
			<div onClick={toggleTheme} className='sidebar-toggle-theme'>
				<img
					src={
						theme === 'light'
							? '../assets//icon-moon.svg'
							: '../assets//icon-sun.svg'
					}
					alt='icon-moon'
				/>
			</div>
			<div className='sidebar-avatar-image'>
				<img src='../assets/image-avatar.jpg' alt='avatar' />
			</div>
		</aside>
	);
};

export default Sidebar;
