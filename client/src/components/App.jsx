import React, { useEffect, useState } from 'react';
import WorkoutsList from './WorkoutsList.jsx';
import axios from 'axios'
import '../styles/App.css'
import TotalsList from './TotalsList.jsx';
import { Container, Typography, Paper } from '@mui/material';
import Heading from './Heading.jsx';

const App = () => {
	const [workouts, setWorkouts] = useState([]);

	const fetchWorkouts = () => {
		axios.get(`http://localhost:3001/workouts-2021/`)
			.then((response) => {
				console.log(response.data)
				setWorkouts(response.data);
			});
	};

	useEffect(() => {
		fetchWorkouts();
	}, []);

	return (
		<Container maxWidth='lg'>
			<Heading />
			<TotalsList workouts={workouts} />
			<WorkoutsList workouts={workouts} />
		</Container>
	)
}

export default App
