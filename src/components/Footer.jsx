import './Footer.css';
import React from 'react';

function Footer() {
	return (
		<div className='footer'>
			<div className='with-gradient'></div>
			<div className='with-buttons'>
				<button className='cancel-btn'>Cancel</button>
				<button className='save-btn'>Save Changes</button>
			</div>
		</div>
	);
}

export default Footer;
