import React from 'react';
import ViewButton from './ViewButton.jsx';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const Workout = ({ workout, index, id }) => {
	let date = workout.startTimeLocal.substring(0, 10);
	let name = workout.activityName.substring(workout.activityName.indexOf('D'));
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
		<ListItem divider >
			<ViewButton
				name={name}
				key={id}
				id={id} />
			<ListItemText
				inset
				primary={`Burpees: ${burpees} | Pull-Ups: ${pullUps} | Push-Ups: ${pushUps} | Sit-Ups: ${sitUps} `}
				secondary={date}
			/>
		</ListItem>
	)
}

export default Workout
