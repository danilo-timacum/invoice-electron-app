import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ViewInvoiceButtons from '../components/ViewInvoiceButtons';
import Modal from '../components/Modal';
import Form from '../components/Form';
import './InvoicePage.css';
import React from 'react';

function InvoicePage({ fetchInvoice, deleteInvoice, setInvoices, setToPaid }) {
	const { id } = useParams();

	const [invoice, setInvoice] = useState(null);

	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		setInvoice(fetchInvoice(id));
	}, [id, fetchInvoice]);

	return (
		<div>
			{invoice ? (
				<>
					<div className='invoice-page'>
						<Link to='/' className='go-back'>
							<img src='../assets/icon-arrow-left.svg' alt='icon-left' />
							<span>go back</span>
						</Link>
						<div className='invoice-status'>
							<span>Status</span>
							<div className={`invoice-card-status ${invoice.status}`}>
								<span></span>
								<span id='invoiceStatus'>{invoice.status}</span>
							</div>
						</div>
						<div className='invoice-info'>
							<div className='invoice-info-header'>
								<div className='id-desc'>
									<div className='invoice-card-id'>
										<p>
											#<span>{invoice.id}</span>
										</p>
									</div>
									<p className='description' id='description'>
										{invoice.description}
									</p>
								</div>
								<div className='sender'>
									<p id='senderStreet'>{invoice.senderAddress.street}</p>
									<p id='senderCity'>{invoice.senderAddress.city}</p>
									<p id='senderPostCode'>{invoice.senderAddress.postCode}</p>
									<p id='senderCountry'>{invoice.senderAddress.country}</p>
								</div>
							</div>
							<div className='invoice-info-body'>
								<div className='date-due'>
									<p>Invoice Date</p>
									<span id='createdAt'>{invoice.createdAt}</span>
									<p>Payment Due</p>
									<span id='paymentDue'>{invoice.paymentDue}</span>
								</div>
								<div className='client'>
									<p>Bill To</p>
									<span id='clientName'>{invoice.clientName}</span>
									<p id='clientStreet'>{invoice.clientAddress.street}</p>
									<p id='clientCity'>{invoice.clientAddress.city}</p>
									<p id='clientPostCode'>{invoice.clientAddress.postCode}</p>
									<p id='clientCountry'>{invoice.clientAddress.country}</p>
								</div>
								<div className='sent-to'>
									<p>Sent to</p>
									<span>{invoice.clientEmail}</span>
								</div>
							</div>
							<div className='invoice-info-footer'>
								<div className='labels'>
									<p>Item Name</p>
									<p>QTY.</p>
									<p>Price</p>
									<p>Total</p>
								</div>
								<div className='design'>
									{invoice.items.map((item) => (
										<div key={item.name} className='banner-design'>
											<p>{item.name}</p>
											<p className='banner-quantity'>{item.quantity}</p>
											<p className='design-x'>x</p>
											<p className='banner-price'>£ {item.price}</p>
											<p className='banner-total'>£ {item.total}</p>
										</div>
									))}
								</div>
								<div className='grand-total'>
									<span>Grand Total</span>
									<span>£ {invoice.total}</span>
								</div>
							</div>
						</div>
					</div>
					<ViewInvoiceButtons
						setShowModal={setShowModal}
						deleteInvoice={deleteInvoice}
						setToPaid={setToPaid}
						status={invoice.status}
						id={invoice.id}
					/>
					{showModal && (
						<Modal showModal={setShowModal}>
							<Form
								formId={invoice.id}
								setInvoices={setInvoices}
								currentInvoice={invoice}
							/>
						</Modal>
					)}
				</>
			) : (
				'loading...'
			)}
		</div>
	);
}

export default InvoicePage;
