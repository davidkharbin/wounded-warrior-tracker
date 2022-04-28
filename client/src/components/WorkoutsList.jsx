import React, { useState, useEffect } from 'react';
import Workout from './Workout.jsx';
import List from '@mui/material/List';
import { Button, Container, Stack } from '@mui/material';

const WorkoutsList = ({ workouts }) => {
	const [numberOfitemsShown, setNumberOfItemsToShown] = useState(3);

	const workoutsMap = workouts.map((workout, index) => {
		return (<Workout
			workout={workout}
			id={workout.activityId}
			key={workout.activityId}
			index={index} />)
	}).slice(0, numberOfitemsShown);

	function handleMoreClick() {
		let newNumber = numberOfitemsShown + 3;
		if (newNumber <= workouts.length + 3) {
			setNumberOfItemsToShown(numberOfitemsShown + 3);
		}
	}

	function handleLessClick() {
		let newNumber = numberOfitemsShown - 3;
		if (newNumber > 0) {
			setNumberOfItemsToShown(numberOfitemsShown - 3);
		}
	}

	return (
		<Container maxWidth='sm'>
			<List>
				{workoutsMap}
			</List>
			<Stack spacing={5} direction="row" justifyContent="center">
				<Button
					onClick={handleLessClick}>
					Show Less</Button>
				<Button
					onClick={handleMoreClick}>
					Show More</Button>
			</Stack>
		</Container>
	)
}

export default WorkoutsList