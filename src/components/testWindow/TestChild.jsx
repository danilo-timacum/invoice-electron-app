import React, { useState, useEffect } from 'react';

const TestChild = () => {
	const [sharedState, setSharedState] = useState();

	useEffect(() => {
		// Get initial state
		const fetchCurrentState = async () => {
			const currentState = await window.electronAPI.sharedState();
			setSharedState(currentState);
		};

		fetchCurrentState();

		// Init state listening and get the cleanup function
		const cleanup = window.electronAPI.initState(setSharedState);

		// Call the cleanup function on component unmount
		return cleanup;
	}, []);

	const handleChange = (e) => {
		const newState = e.target.value;
		setSharedState(newState);
		window.electronAPI.sendStateUpdate(newState);
	};

	return (
		<div>
			<input type='text' value={sharedState || ''} onChange={handleChange} />
		</div>
	);
};

export default TestChild;
