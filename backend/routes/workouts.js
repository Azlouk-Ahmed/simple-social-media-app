const express = require('express')
const {
  getUserWorkouts,
  getAllWorkouts, 
  getWorkout, 
  createWorkout, 
  deleteWorkout, 
  updateWorkout,
  likeWorkout
} = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router()
router.use(requireAuth)

// GET all workouts
router.get('/', getAllWorkouts)

// GET all workouts
router.get('/user', getUserWorkouts)

// GET a single workout
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)

// like a workout 
router.put('/like/:id', likeWorkout)

module.exports = router