import React, { useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Container } from '@mui/material';

const Totals = ({ workouts }) => {

	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open)
	};

	const totals = {
		burpees: 0,
		pullUps: 0,
		pushUps: 0,
		sitUps: 0
	};

	workouts.forEach(workout => {
		const summary = workout.summarizedExerciseSets;

		summary.forEach((exercise) => {
			if (exercise.subCategory === 'BURPEE') totals.burpees += exercise.reps;
			if (exercise.category === 'PULL_UP') totals.pullUps += exercise.reps;
			if (exercise.category === 'PUSH_UP') totals.pushUps += exercise.reps;
			if (exercise.category === 'SIT_UP') totals.sitUps += exercise.reps;
		})
	});


	return (
		<Container maxWidth='sm'>
			<List
				sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}
				component="nav"
				aria-labelledby="nested-list-subheader"
				subheader={
					<ListSubheader component="div" id="nested-list-subheader">

					</ListSubheader>
				}
			>

				<ListItemButton onClick={handleClick}>
					<ListItemIcon>
						<ViewListIcon />
					</ListItemIcon>
					<ListItemText primary="Totals to date" />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItemButton sx={{ pl: 4 }}>
							<ListItemIcon>
								{/* <StarBorder /> */}
							</ListItemIcon>
							<ListItemText primary={`Burpees: ${totals.burpees}`} />

						</ListItemButton>
						<ListItemButton sx={{ pl: 4 }}>
							<ListItemIcon>
								{/* <StarBorder /> */}
							</ListItemIcon>

							<ListItemText primary={`Pull-Ups: ${totals.pullUps}`} />
						</ListItemButton>
						<ListItemButton sx={{ pl: 4 }}>
							<ListItemIcon>
								{/* <StarBorder /> */}
							</ListItemIcon>
							<ListItemText primary={`Push-Ups: ${totals.pushUps}`} />
						</ListItemButton>
						<ListItemButton sx={{ pl: 4 }}>
							<ListItemIcon>
								{/* <StarBorder /> */}
							</ListItemIcon>
							<ListItemText primary={`SitUps: ${totals.sitUps}`} />
						</ListItemButton>
					</List>
				</Collapse>
			</List>
		</Container>

	)
}

export default Totals