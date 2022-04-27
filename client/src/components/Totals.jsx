import React from 'react';
import Exercise from './Exercise.jsx';

const Totals = ({ workouts }) => {
	let totals = {
		burpees: 0,
		pullUps: 0,
		pushUps: 0,
		sitUps: 0
	}

	// workouts.forEach(workout => {
	// 	let summary = 
	// 	if (summary.subCategory === 'BURPEE') totals.burpees += summary.reps;
	// 	if (summary.category === 'PULL_UP') totals.pullUps += summary.reps;
	// 	if (summary.category === 'PUSH_UP') totals.pushUps += summary.reps;
	// 	if (summary.category === 'SIT_UP') totals.sitUps += summary.reps;
	// });


	return (
		<ul className='App-totals'>
			{/* <li><Exercise name="Burpees" total={totals.burpees} /></li>
			<li><Exercise name="Pull-Ups" total={totals.pullUps} /></li>
			<li><Exercise name="Push-Ups" total={totals.pushUps} /></li>
			<li><Exercise name="Sit-Ups" total={totals.sitUps} /></li> */}
		</ul>
	)
}

export default Totals