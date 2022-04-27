import React from 'react';
import '../styles/Workout.css';
import ViewButton from './ViewButton.jsx';
import ListItem from '@mui/material/ListItem';

const Workout = ({ workout, index, id }) => {
	let date = workout.startTimeLocal.substring(0, 10);
	let pushUps = 0;
	let sitUps = 0;
	let pullUps = 0;
	let burpees = 0;
	
	for (let i = 0; i < workout.summarizedExerciseSets.length; i++) {
		let currentCategory = workout.summarizedExerciseSets[i].category;

		if (currentCategory === 'TOTAL_BODY') burpees += workout.summarizedExerciseSets[i].reps || 0;
		if (currentCategory === 'PUSH_UP') pushUps += workout.summarizedExerciseSets[i].reps || 0;
		if (currentCategory === 'SIT_UP') sitUps += workout.summarizedExerciseSets[i].reps || 0;
		if (currentCategory === 'PULL_UP') pullUps += workout.summarizedExerciseSets[i].reps || 0;
	}

	return (
		<ListItem>
			<span className="Workout-box">
				<ViewButton
				 key={id}
				 id={id}/>
			</span>
			<span className="Workout-box">{date}</span>
			<span className="Workout-box">Burpees: {burpees}</span>
			<span className="Workout-box">Pull-ups: {pullUps}</span>
			<span className="Workout-box">Push-ups: {pushUps}</span>
			<span className="Workout-box">Sit-ups: {sitUps}</span>
		</ListItem>
	)
}

export default Workout
