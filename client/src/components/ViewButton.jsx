import React from 'react'
import '../styles/Workout.css'

const ViewButton = ({ id }) => {
	const link = `https://connect.garmin.com/modern/activity/${id}`;
	
	return (
		<div>
			<button className="Workout-button">
				<a
					href={link}
					target="_blank"
				> View Workout
				</a>
			</button>
		</div >
	)
}

export default ViewButton
