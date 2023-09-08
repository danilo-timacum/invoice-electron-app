import { useState } from 'react';
import { formatDate } from '../helpers/helpers';
import React from 'react';
import imgIconDelete from '../assets/icon-delete.svg';

import './Form.css';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const digits = '0123456789';

function Form({ formId, setInvoices, currentInvoice = null }) {
	const [senderStreet, setSenderStreet] = useState(
		currentInvoice ? currentInvoice.senderAddress.street : ''
	);
	const [senderCity, setSenderCity] = useState(
		currentInvoice ? currentInvoice.senderAddress.city : ''
	);
	const [senderPostCode, setSenderPostCode] = useState(
		currentInvoice ? currentInvoice.senderAddress.postCode : ''
	);
	const [senderCountry, setSenderCountry] = useState(
		currentInvoice ? currentInvoice.senderAddress.country : ''
	);
	const [clientStreet, setClientStreet] = useState(
		currentInvoice ? currentInvoice.clientAddress.street : ''
	);
	const [clientCity, setClientCity] = useState(
		currentInvoice ? currentInvoice.clientAddress.city : ''
	);
	const [clientPostCode, setClientPostCode] = useState(
		currentInvoice ? currentInvoice.clientAddress.postCode : ''
	);
	const [clientCountry, setClientCountry] = useState(
		currentInvoice ? currentInvoice.clientAddress.country : ''
	);
	const [clientName, setClientName] = useState(
		currentInvoice ? currentInvoice.clientName : ''
	);
	const [clientMail, setClientMail] = useState(
		currentInvoice ? currentInvoice.clientEmail : ''
	);
	const [date, setDate] = useState(
		currentInvoice ? currentInvoice.createdAt : ''
	);
	const [terms, setTerms] = useState(
		currentInvoice ? currentInvoice.paymentTerms : ''
	);
	const [description, setDescription] = useState(
		currentInvoice ? currentInvoice.description : ''
	);
	const [items, setItems] = useState(
		currentInvoice
			? currentInvoice.items
			: [
					{
						name: '',
						quantity: '',
						price: '',
						total: '',
					},
			  ]
	);

	const addItem = (e) => {
		e.preventDefault();
		const newItem = {
			name: '',
			quantity: '',
			price: '',
			total: '',
		};
		setItems((current) => [...current, newItem]);
	};

	const handleItemsChange = (index, event) => {
		const values = [...items];
		values[index][event.target.name] = event.target.value;
		values[index].total = +values[index].quantity * +values[index].price;
		setItems(values);
	};

	const removeItem = (itemName) => {
		const filteredItems = items.filter((item) => item.name !== itemName);
		setItems([...filteredItems]);
	};

	const generateId = () => {
		const randomId =
			letters[Math.floor(Math.random() * letters.length)] +
			letters[Math.floor(Math.random() * letters.length)] +
			digits[Math.floor(Math.random() * digits.length)] +
			digits[Math.floor(Math.random() * digits.length)] +
			digits[Math.floor(Math.random() * digits.length)] +
			digits[Math.floor(Math.random() * digits.length)];
		return randomId;
	};

	const submitForm = (e) => {
		e.preventDefault();

		const newEntry = {
			id: currentInvoice ? currentInvoice.id : generateId(),
			createdAt: formatDate(new Date(Date.now())),
			paymentDue: formatDate(new Date(date)),
			description: description,
			paymentTerms: +terms,
			clientName: clientName,
			clientEmail: clientMail,
			status: 'pending',
			senderAddress: {
				street: senderStreet,
				city: senderCity,
				postCode: senderPostCode,
				country: senderCountry,
			},
			clientAddress: {
				street: clientStreet,
				city: clientCity,
				postCode: clientPostCode,
				country: clientCountry,
			},
			items: items,
			total: items.reduce((sum, currentValue) => sum + currentValue.total, 0),
		};

		if (currentInvoice) {
			setInvoices((curr) =>
				curr.map((item) => {
					if (item.id === currentInvoice.id) {
						return newEntry;
					} else {
						return item;
					}
				})
			);
		} else {
			setInvoices((curr) => [...curr, newEntry]);
		}
	};

	return (
		<form onSubmit={submitForm} className='form'>
			<p className='form-edit'>
				{formId ? (
					<span>
						Edit <small>#</small>
						<small>{formId}</small>
					</span>
				) : (
					'New Invoice'
				)}
			</p>
			<p className='bill-from'>Bill From</p>
			<div className='sender'>
				<div className='street-address'>
					<span>Street Address</span>
					<div>
						<input
							type='text'
							value={senderStreet}
							onChange={(e) => setSenderStreet(e.target.value)}
						/>
					</div>
				</div>
				<div className='city'>
					<span>City</span>
					<div>
						<input
							type='text'
							value={senderCity}
							onChange={(e) => setSenderCity(e.target.value)}
						/>
					</div>
				</div>
				<div className='postcode'>
					<span>Post Code</span>
					<div>
						<input
							type='text'
							value={senderPostCode}
							onChange={(e) => setSenderPostCode(e.target.value)}
						/>
					</div>
				</div>
				<div className='country'>
					<span>Country</span>
					<div>
						<input
							type='text'
							value={senderCountry}
							onChange={(e) => setSenderCountry(e.target.value)}
						/>
					</div>
				</div>
			</div>
			<p className='bill-from'>Bill To</p>
			<div className='client'>
				<div className='name'>
					<span>Client’s Name</span>
					<div>
						<input
							type='text'
							value={clientName}
							onChange={(e) => setClientName(e.target.value)}
						/>
					</div>
				</div>
				<div className='email'>
					<span>Client’s Email</span>
					<div>
						<input
							type='email'
							value={clientMail}
							onChange={(e) => setClientMail(e.target.value)}
						/>
					</div>
				</div>
				<div className='street-address'>
					<span>Street Address</span>
					<div>
						<input
							type='text'
							value={clientStreet}
							onChange={(e) => setClientStreet(e.target.value)}
						/>
					</div>
				</div>
				<div className='city'>
					<span>City</span>
					<div>
						<input
							type='text'
							value={clientCity}
							onChange={(e) => setClientCity(e.target.value)}
						/>
					</div>
				</div>
				<div className='postcode'>
					<span>Post Code</span>
					<div>
						<input
							type='number'
							value={clientPostCode}
							onChange={(e) => setClientPostCode(e.target.value)}
						/>
					</div>
				</div>
				<div className='country'>
					<span>Country</span>
					<div>
						<input
							type='text'
							value={clientCountry}
							onChange={(e) => setClientCountry(e.target.value)}
						/>
					</div>
				</div>
			</div>
			<div className='data'>
				<div className='date'>
					<span>Invoice Date</span>
					<div>
						<input
							type='date'
							value={date}
							onChange={(e) => setDate(e.target.value)}
						/>
					</div>
				</div>
				<div className='terms'>
					<span>Payment Terms</span>
					<div>
						<input
							type='text'
							value={terms}
							onChange={(e) => setTerms(e.target.value)}
						/>
					</div>
				</div>
				<div className='description'>
					<span>Project Description</span>
					<div>
						<input
							type='text'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
				</div>
			</div>
			<div className='item-list'>
				<p>Item List</p>

				{items.map((item, i) => (
					<div key={i} className='item'>
						<div className='item-name'>
							<span>Item Name</span>
							<div>
								<input
									name='name'
									type='text'
									placeholder='Banner Design'
									value={items[i].name}
									onChange={(e) => handleItemsChange(i, e)}
								/>
							</div>
						</div>
						<div className='item-quantity'>
							<span>Qty.</span>
							<div>
								<input
									name='quantity'
									type='text'
									placeholder='1'
									value={items[i].quantity}
									onChange={(e) => handleItemsChange(i, e)}
								/>
							</div>
						</div>
						<div className='item-price'>
							<span>Price</span>
							<div>
								<input
									name='price'
									type='text'
									placeholder='156.00'
									value={items[i].price}
									onChange={(e) => handleItemsChange(i, e)}
								/>
							</div>
						</div>
						<div className='item-total'>
							<span>Total</span>
							<div>
								<input
									name='total'
									type='text'
									placeholder='156.00'
									value={items[i].total}
									readOnly
								/>
							</div>
						</div>
						<div onClick={() => removeItem(item.name)} className='item-delete'>
							<img src={imgIconDelete} alt='icon-delete' />
						</div>
					</div>
				))}
				<button type='button' onClick={addItem} className='new-item'>
					+ Add New Item
				</button>
			</div>
			<div className='bottom-separator'></div>
			<button>Submit</button>
		</form>
	);
}

export default Form;
