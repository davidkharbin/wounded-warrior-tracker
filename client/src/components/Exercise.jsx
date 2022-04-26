import React from 'react'

const Exercise = ({ name, total }) => {
	return (
		<li className="total">
			<span>{name}:</span><span>{total}</span>
		</li>
	)
}

export default Exercise; 
