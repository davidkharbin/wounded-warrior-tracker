import React, { useEffect, useState } from 'react';
import WorkoutsList from './WorkoutsList.jsx';
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
			<p>1000 burpees, sit-ups, push-ups, and pull-ups in November!</p>
			<Totals workouts={workouts} />
			<WorkoutsList workouts={workouts}/>
			{/* <ul>
				{workouts.map((workout, index) =>
					<Workout
						workout={workout}
						id={workout.activityId}
						key={workout.activityId}
						index={index} />)}
			</ul> */}
		</div>
	)
}

export default App
