const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema(
	{
		activityId: {type: Number, unique: true},
		activityName: String,
		startTimeLocal: String,
		summarizedExerciseSets: Array,
	}
	
)

module.exports = mongoose.model('workouts-2021', workoutSchema);
