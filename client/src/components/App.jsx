import React, { useEffect, useState } from 'react';
import Workout from './Workout.jsx';
import axios from 'axios'
import '../styles/App.css'
import Exercise from './Burpees.jsx';

const App = () => {
	const [totals, setTotals] = useState('');
	const [workouts, setWorkouts] = useState([]);
	
	const sortWorkoutsAsc = (firstWorkout, nextWorkout) => {
		return firstWorkout.id - nextWorkout.id;
	};

	const fetchTotals = () => {
		console.log('fetchTotals ran');
		axios.get(`https://cryptographic.ninja:8443/totals`, {
		})
			.then((response) => {
				console.log(response.data)
				setTotals(response.data[0]);
				setWorkouts(response.data[1]
				.sort(sortWorkoutsAsc));
			});
	};

	useEffect(() => {
		fetchTotals();
	}, []);

	return (
		<div className="App">
			<h1>Wounded Warrior Challenge 2021</h1>
			<h3>Goal:</h3>
			<p> <span className="strikethrough">830 burpees in November</span></p>
			<p>1000 burpees + 1000 sit-ups + 1000 push-ups + 1000 pull-ups in November!</p>
			<h3>Totals To Date: </h3>
			<ul className="App-totals">
				<Exercise name="Burpees" total={totals.burpees} />
				<Exercise name="Pull-Ups" total={totals.pullUps} />
				<Exercise name="Push-Ups" total={totals.pushUps} />
				<Exercise name="Sit-Ups" total={totals.sitUps} />
			</ul>
			<h3>Records: </h3>
			<ul>
				{workouts.map((workout, index) =>
					<Workout
						workout={workout}
						id={workout.id}
						key={workout.id}
						index={index} />)}
			</ul>
		</div>
	)
}

export default App
