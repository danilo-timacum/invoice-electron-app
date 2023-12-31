import React from 'react';
import ReactDOM from 'react-dom/client';
import TestChild from './components/testWindow/TestChild';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<div>
			<h1>Test Window</h1>
			<button
				type='button'
				onClick={() => {
					window.electronAPI.hideTest();
				}}
			>
				Hide
			</button>

			<div>
				<TestChild />
			</div>
		</div>
	</React.StrictMode>
);
