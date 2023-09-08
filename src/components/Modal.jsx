import ReactDOM from 'react-dom';
import './Modal.css';
import React from 'react';

export default function Modal({ children, showModal, modalTitle = '' }) {
	const handleClose = (e) => {
		if (e.target === e.currentTarget) {
			showModal(false);
		}
	};

	return ReactDOM.createPortal(
		<div className='modal-backdrop' onClick={handleClose}>
			<div className='modal'>
				<div className='modal-inside'>{children}</div>
			</div>
		</div>,
		document.body
	);
}
