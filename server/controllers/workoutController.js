const asyncHandler = require('express-async-handler');
// @desc get workouts
// @route GET /workouts-2021
// @access Private
const getWorkouts = asyncHandler(async (req, res) => {
	res.status(200).json({ message: 'Get workouts' });
});

// @desc Set workout
// @route POST /workouts-2021
// @access Private
const setWorkout = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400)
		throw new Error('Please submit string data')
	}
	res.status(200).json({ message: 'Set workout' });
});

// @desc update workout
// @route PUT /workouts-2021:id
// @access Private
const updateWorkouts = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Update workout ${req.params.id}` });
});

// @desc Delete workout
// @route DELETE /workouts-2021:id
// @access Private
const deleteWorkout = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Delete workout ${req.params.id}` });
});

module.exports = {
	getWorkouts,
	setWorkout,
	updateWorkouts,
	deleteWorkout,
}