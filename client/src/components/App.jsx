import React, { useEffect, useState } from 'react'
import Workouts from './Workouts.jsx';
import axios from 'axios'

const App = () => {
	const [totals, setTotals] = useState('');
	const [workouts, setWorkouts] = useState([]);
	
	const fetchTotals = () => {
		axios.get(`/totals`, {
		})
			.then((response) => {
				setTotals(response.data[0]);
				setWorkouts(response.data[1]
					.sort((firstWorkout, nextWorkout) => firstWorkout.id - nextWorkout.id ));
			});
	};

	useEffect(() => {
		fetchTotals();
	}, []);

	return (
		<div>
			<h1>Wounded Warrior Challenge 2021</h1>
			<ul>Remaining reps...
				<li>Burpees: {totals.burpees}</li>
				<li>Pull-Ups: {totals.pullUps}</li>
				<li>Push-Ups: {totals.pushUps}</li>
				<li>Sit-Ups: {totals.sitUps}</li>
			</ul>
			{workouts.map((workout) => <Workouts workout={workout} key={workout.id}/>)}
		</div>
	)
}

export default App
