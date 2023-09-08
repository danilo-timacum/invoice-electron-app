import './ViewInvoiceButtons.css';
import React from 'react';
import { useHistory } from 'react-router';

function ViewInvoiceButtons({
	setShowModal,
	deleteInvoice,
	setToPaid,
	status,
	id,
}) {
	const history = useHistory();

	return (
		<div className='view-invoice-buttons'>
			<button onClick={() => setShowModal(true)} className='edit-btn'>
				Edit
			</button>
			<button
				onClick={() => {
					deleteInvoice(id);
					history.push('/');
				}}
				className='delete-btn'
			>
				Delete
			</button>
			{status !== 'paid' ? (
				<button onClick={() => setToPaid(id)} className='mark-btn'>
					Mark as Paid
				</button>
			) : (
				''
			)}
		</div>
	);
}

export default ViewInvoiceButtons;
