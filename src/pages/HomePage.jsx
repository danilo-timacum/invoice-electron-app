import './HomePage.css';
import Modal from '../components/Modal';
import InvoiceCard from '../components/InvoiceCard';
import NoInvoice from '../components/NoInvoice';
import Form from '../components/Form';
import { useState } from 'react';
import Filter from '../components/Filter';
import React from 'react';

function HomePage({ invoices, setInvoices }) {
	const [showModal, setShowModal] = useState(false);
	const [filter, setFilter] = useState([]);

	const updateFilter = (item, state) => {
		if (state) {
			setFilter((curr) => [...curr, item]);
		} else {
			setFilter((curr) => curr.filter((a) => a !== item));
		}
	};

	const filterInovices = (invoices) => {
		return invoices.filter((invoice) => filter.includes(invoice.status));
	};

	const renderInovices = (invoices) => {
		return invoices.map((invoice) => {
			return (
				<InvoiceCard
					key={invoice.id}
					id={invoice.id}
					paymentDue={invoice.paymentDue}
					clientName={invoice.clientName}
					status={invoice.status}
					total={invoice.total}
				/>
			);
		});
	};

	return (
		<header>
			<div className='homepage'>
				<div className='homepage-title'>
					<h2>Invoices</h2>
					<p id='invoiceCounter'>{invoices.length} Invoices</p>
				</div>
				<Filter updateFilter={updateFilter} />
				<div onClick={() => setShowModal(true)} className='homepage-btn'>
					<span>
						<img src='../assets/icon-plus.svg' alt='icon-plus' />
					</span>
					<span className='new-span'>New</span>
					<span className='d-none'>Invoice</span>
				</div>
			</div>
			<div className='invoice-card-list'>
				{invoices.length ? (
					filter.length ? (
						renderInovices(filterInovices(invoices))
					) : (
						renderInovices(invoices)
					)
				) : (
					<NoInvoice />
				)}
			</div>
			{showModal && (
				<Modal showModal={setShowModal} modalTitle='Filter by category'>
					<Form setInvoices={setInvoices} />
				</Modal>
			)}
		</header>
	);
}

export default HomePage;
