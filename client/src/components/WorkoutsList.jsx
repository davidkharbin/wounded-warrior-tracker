import React from 'react'
import Workout from './Workout.jsx'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
// import InboxIcon from '@mui/icons-material/Inbox';
// import DraftsIcon from '@mui/icons-material/Drafts';

const WorkoutsList = ({ workouts }) => {
	return (
		<Box sx={{ width: '100%', maxWidth: 900, bgcolor: 'background.paper' }}>
			<List>
					{workouts.map((workout, index) =>
						<Workout
							workout={workout}
							id={workout.activityId}
							key={workout.activityId}
							index={index} />)}
			</List>
		</Box>

	)
}

export default WorkoutsList