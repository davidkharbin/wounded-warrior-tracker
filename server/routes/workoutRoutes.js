const express = require('express');
const router = express.Router();
const { getWorkouts, setWorkout, updateWorkouts, deleteWorkout } = require('../controllers/workoutController');

router.get('/', getWorkouts);

router.post('/', setWorkout)

router.put('/:id', updateWorkouts)

router.delete('/:id', deleteWorkout)

module.exports = router;