import React from 'react';
import Exercise from './Exercise.jsx';

const Totals = ({ workouts }) => {
	let totals = {
		burpees: 0,
		pullUps: 0,
		pushUps: 0,
		sitUps: 0
	}

	workouts.forEach(workout => {
		let summary = workout.summarizedExerciseSets;

		summary.forEach((exercise) => {
			if (exercise.subCategory === 'BURPEE') totals.burpees += exercise.reps;
			if (exercise.category === 'PULL_UP') totals.pullUps += exercise.reps;
			if (exercise.category === 'PUSH_UP') totals.pushUps += exercise.reps;
			if (exercise.category === 'SIT_UP') totals.sitUps += exercise.reps;
		})
	});


	return (
		<ul className='App-totals'>
			<li><Exercise name="Burpees" total={totals.burpees} /></li>
			<li><Exercise name="Pull-Ups" total={totals.pullUps} /></li>
			<li><Exercise name="Push-Ups" total={totals.pushUps} /></li>
			<li><Exercise name="Sit-Ups" total={totals.sitUps} /></li>
		</ul>
	)
}

export default Totals