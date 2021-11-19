import React, { useEffect, useState } from 'react';
import Workout from './Workout.jsx';
import axios from 'axios'
import '../styles/App.css'

const App = () => {
	const [totals, setTotals] = useState('');
	const [workouts, setWorkouts] = useState([]);

	const fetchTotals = () => {
		axios.get(`/totals`, {
		})
			.then((response) => {
				setTotals(response.data[0]);
				setWorkouts(response.data[1]
					.sort((firstWorkout, nextWorkout) => firstWorkout.id - nextWorkout.id));
			});
	};

	useEffect(() => {
		fetchTotals();
	}, []);

	return (
		<div className="App">
			<h1>Wounded Warrior Challenge 2021</h1>
			<h3 className="App-header">Totals To Date: </h3>
			<div className="App-totals">
				<p>Burpees: {totals.burpees}</p>
				<p>Pull-Ups: {totals.pullUps}</p>
				<p>Push-Ups: {totals.pushUps}</p>
				<p>Sit-Ups: {totals.sitUps}</p>
			</div>
			<h3 className="App-header">Journal: </h3>
			<ul>
				{workouts.map((workout, index) =>
					<Workout
						workout={workout}
						key={workout.id}
						index={index} />)}
			</ul>
		</div>
	)
}

export default App
