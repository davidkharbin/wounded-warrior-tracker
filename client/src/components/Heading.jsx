import React from 'react'
import { Divider, Stack, Typography } from '@mui/material'

const Heading = () => {
	return (
		<Stack spacing={2}>
			<Typography
				variant='h4'
				align='center'>Wounded Warrior Challenge 2021</Typography>

			<Typography
				variant='subtitle1'
				align='center'>In November complete 1,000: Burpees, Sit-ups, Push-ups, and Pull-ups...</Typography>
			<Divider />
		</Stack>
	)
}

export default Heading