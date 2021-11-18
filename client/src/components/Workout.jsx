import React from 'react'

const Workout = ({workout}) => {
	let date = workout.date;
	let name = workout.name;
	let pushUps = 0;
	let sitUps = 0;
	let pullUps = 0;
	let burpees = 0;

	for (let i = 0; i < workout.summary.length; i++){
		let currentCategory = workout.summary[i].category;
		
		if (currentCategory === 'TOTAL_BODY') burpees += workout.summary[i].reps|| 0;
		if (currentCategory === 'PUSH_UP')    pushUps += workout.summary[i].reps|| 0;
		if (currentCategory === 'SIT_UP')     pullUps += workout.summary[i].reps|| 0;
		if (currentCategory === 'PULL_UP')     sitUps += workout.summary[i].reps|| 0;
	}

	return (
		<div>
			{`${date} | ${name} | Burpees: ${burpees} | Pull-Ups: ${pullUps} | Push-Ups: ${pushUps} | Sit-Ups: ${sitUps} `}
		</div>
	)
}

export default Workout
