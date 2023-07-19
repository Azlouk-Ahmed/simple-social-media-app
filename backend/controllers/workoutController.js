const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

// get user workouts
const getUserWorkouts = async (req, res) => {
  const user_id = req.user._id;
  //console.log(user_id);
  const workouts = await Workout.find({user_id}).sort({createdAt: -1})

  res.status(200).json(workouts)
}
// get all workouts
const getAllWorkouts = async (req, res) => {
  const workouts = await Workout.aggregate([
    {
      $addFields: {
        user_id: {
          $toObjectId: "$user_id"
        }
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user"
      }
    }
  ]).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};


// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findById(id)

  if (!workout) {
    return res.status(404).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

// create a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  const user_id = req.user._id;

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!load) {
    emptyFields.push('load');
  }
  if (!reps) {
    emptyFields.push('reps');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
  }

  try {
    const workout = await Workout.create({ title, load, reps, user_id });

    const result = await Workout.aggregate([
      {
        $match: { _id: workout._id }
      },
      {
        $addFields: {
          user_id: {
            $toObjectId: "$user_id"
          }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user"
        }
      }
    ]);

    res.status(200).json(result[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }

  const workout = await Workout.findOneAndDelete({_id: id})

  if(!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }

  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

// like dislike workout
const likeWorkout = async (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such workout' });
  }

  try {
    const workout = await Workout.findById({ _id: id });

    if (workout.likes.includes(userId)) {
      await workout.updateOne({ $pull: { likes: userId } });
    } else {
      await workout.updateOne({ $push: { likes: userId } });
    }

    const result = await Workout.aggregate([
      {
        $match: { _id: workout._id }
      },
      {
        $addFields: {
          user_id: {
            $toObjectId: "$user_id"
          }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user"
        }
      }
    ]);

    const updatedWorkout = result[0];

    res.status(200).json(updatedWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  getAllWorkouts,
  getUserWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
  likeWorkout
}