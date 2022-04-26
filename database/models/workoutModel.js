const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema(
	{
		activityName: String,
		activityId: {type: Number, unique: true},
		summarizedExerciseSets: Array
	}
	
)

module.exports = mongoose.model('workouts-2021', workoutSchema);
