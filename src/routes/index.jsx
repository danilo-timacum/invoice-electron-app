import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';

import './App.css';
import Sidebar from '../components/Sidebar';
import InvoicePage from '../pages/InvoicePage';
import HomePage from '../pages/HomePage';

import data from '../data/data.json';

// Test IF LocalStorage is accessible
function isTest() {
	let test = 'test';
	try {
		localStorage.setItem(test, test);
		localStorage.removeItem(test);
		return true;
	} catch (e) {
		return false;
	}
}

function Routes() {
	const [invoices, setInvoices] = useState([]);
	const [theme, setTheme] = useState('');

	useEffect(() => {
		if (isTest) {
			const invoicesData = JSON.parse(localStorage.getItem('invoicesData'))
				?.length
				? JSON.parse(localStorage.getItem('invoicesData'))
				: data;
			const invoicesTheme = localStorage.getItem('invoicesTheme') || 'light';
			console.log(invoicesData);
			setInvoices(invoicesData);
			setTheme(invoicesTheme);
			console.log('test');
		}
	}, []);

	useEffect(() => {
		if (isTest) {
			localStorage.setItem('invoicesData', JSON.stringify(invoices));
		}
	});

	useEffect(() => {
		if (isTest) {
			localStorage.setItem('invoicesTheme', theme || 'light');
		}
	});

	const deleteInvoice = (id) => {
		const changedInvoices = invoices.filter((invoice) => invoice.id !== id);
		setInvoices(changedInvoices);
	};

	const setToPaid = (id) => {
		const changedInvoices = invoices.map((invoice) => {
			if (invoice.id === id) {
				return { ...invoice, status: 'paid' };
			} else {
				return invoice;
			}
		});

		setInvoices(changedInvoices);
	};

	const fetchInvoice = (id) =>
		invoices?.find((invoice) => invoice.id === id) || null;

	return (
		<div className={`App ${theme}`}>
			<Router>
				<Sidebar theme={theme} setTheme={setTheme} />
				<Switch>
					<Route exact path='/'>
						<HomePage invoices={invoices} setInvoices={setInvoices} />
					</Route>
					<Route exact path='/invoice/:id'>
						<InvoicePage
							fetchInvoice={fetchInvoice}
							deleteInvoice={deleteInvoice}
							setToPaid={setToPaid}
							setInvoices={setInvoices}
						/>
					</Route>
				</Switch>
			</Router>
			{/* <HomePage /> */}
			{/* <InvoicePage /> */}
			{/* <Form />
      <ItemList />
      <Footer /> */}
		</div>
	);
}

export default Routes;
