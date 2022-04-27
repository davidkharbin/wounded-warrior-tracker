const asyncHandler = require('express-async-handler');


const Workout = require('../../database/models/workoutModel');

// @desc get workouts
// @route GET /workouts-2021
// @access Private
const getWorkouts = asyncHandler(async (req, res) => {
	let workouts = await Workout.find().sort({ activityId: 1 });
	res.status(200).json(workouts);
});

// @desc Set workout
// @route POST /workouts-2021
// @access Private
const setWorkout = asyncHandler(async (req, res) => {
	console.log(req.body)
	let workout = await Workout.create({
		activityId: req.body.activityId,
		activityName: req.body.activityName,
		startTimeLocal: req.body.startTimeLocal,
		summarizedExerciseSets: req.body.summarizedExerciseSets
	})
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