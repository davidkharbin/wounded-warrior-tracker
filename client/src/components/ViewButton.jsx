import React from 'react'
import '../styles/Workout.css'
import Button from '@mui/material/Button';

const ViewButton = ({ id }) => {
	const link = `https://connect.garmin.com/modern/activity/${id}`;

	return (
		<Button
			variant="contained"
			href={link} 
			size="small"
			target="_blank">
			View Workout
		</Button>
	)
}

export default ViewButton
