import { useState } from 'react';
import './Filter.css';
import React from 'react';

const Filter = ({ updateFilter }) => {
	const [showFilter, setShowFilter] = useState(false);

	return (
		<div className='position-relative'>
			<div
				className='homepage-filter'
				onClick={() => setShowFilter((curr) => !curr)}
			>
				<span>Filter</span>
				<img src='../assets/icon-check.svg' alt='icon-check' />
			</div>
			{showFilter && (
				<div className='filter-wrapper'>
					<div className=' filter-item'>
						<input
							onChange={(e) => updateFilter('draft', e.target.checked)}
							type='checkbox'
							id='draft'
							name='draft'
						/>
						<small>draft</small>
					</div>
					<div className='filter-item'>
						<input
							onChange={(e) => updateFilter('pending', e.target.checked)}
							type='checkbox'
							id='pending'
							name='pending'
						/>
						<small>pending</small>
					</div>
					<div className='filter-item'>
						<input
							onChange={(e) => updateFilter('paid', e.target.checked)}
							type='checkbox'
							id='paid'
							name='paid'
						/>
						<small>paid</small>
					</div>
				</div>
			)}
		</div>
	);
};

export default Filter;
