const { resourceLimits } = require("worker_threads");

// @desc get workouts
// @route GET /workouts-2021
// @access Private
const getWorkouts = (req, res) => {
	res.status(200).json({ message: 'Get workouts' });
}

// @desc Set workout
// @route POST /workouts-2021
// @access Private
const setWorkout = (req, res) => {
	res.status(200).json({ message: 'Set workout' });
}

// @desc update workout
// @route PUT /workouts-2021:id
// @access Private
const updateWorkouts = (req, res) => {
	res.status(200).json({ message: `Update workout ${req.params.id}` });
}

// @desc Delete workout
// @route DELETE /workouts-2021:id
// @access Private
const deleteWorkout = (req, res) => {
	res.status(200).json({ message: `Delete workout ${req.params.id}` });
}

module.exports = {
	getWorkouts,
	setWorkout,
	updateWorkouts,
	deleteWorkout,
}