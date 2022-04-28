import React from 'react'
import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';

const ViewButton = ({ id, name }) => {
	const link = `https://connect.garmin.com/modern/activity/${id}`;
	return (
		<Tooltip title="View on garmin.com">
			<Button
				variant="contained"
				href={link}
				size="sm"
				target="_blank">
				{`${name}`}
			</Button>
		</Tooltip>
	)
}

export default ViewButton
