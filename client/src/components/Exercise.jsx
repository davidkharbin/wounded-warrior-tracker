import React from 'react'

const Exercise = ({ name, total }) => {
	return (
		<div>
			<span>{name}:</span>
			<span>{total}</span>
		</div>
	)
}

export default Exercise; 
