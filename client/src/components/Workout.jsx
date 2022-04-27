import React from 'react';
import '../styles/Workout.css';
import ViewButton from './ViewButton.jsx';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

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
		<>
			<ListItem >
				<ViewButton
					key={id}
					id={id} />
				<ListItemText 
					primary={date}
					secondary={`Push-Ups: ${pushUps} \n Pull-Ups: ${pullUps}`}
					 />
			</ListItem>
			<Divider variant="middle" component="li" />
		</>
	)
}

export default Workout
