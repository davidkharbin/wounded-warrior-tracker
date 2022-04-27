import React, { useEffect, useState } from 'react';
import Workout from './Workout.jsx';
import axios from 'axios'
import '../styles/App.css'
import Totals from './Totals.jsx';

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
		<div className="App">
			<h1>Wounded Warrior Challenge 2021</h1>
			<h3>Goal:</h3>
			<p>1000 burpees + 1000 sit-ups + 1000 push-ups + 1000 pull-ups in November!</p>
			<Totals workouts={workouts} />
			<h3>Records: </h3>
			<ul>
				{workouts.map((workout, index) =>
					<Workout
						workout={workout}
						id={workout.activityId}
						key={workout.activityId}
						index={index} />)}
			</ul>
		</div>
	)
}

export default App
