const Post = require('../models/workoutModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

// get user posts
const getUserposts = async (req, res) => {
  const user_id = req.user._id;
  //console.log(user_id);
  const posts = await Post.find({user_id}).sort({createdAt: -1})

  res.status(200).json(posts)
}
// get all posts
const getAllposts = async (req, res) => {
  const posts = await Post.aggregate([
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

  res.status(200).json(posts);
};


// get a single Post
const getPost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Post'})
  }

  const Post = await Post.findById(id)

  if (!Post) {
    return res.status(404).json({error: 'No such Post'})
  }

  res.status(200).json(Post)
}

// create a new Post
const createPost = async (req, res) => {
  const { description, title, image } = req.body;
  const user_id = req.user._id;

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!description) {
    emptyFields.push('description');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
  }

  try {
    const newPost = await Post.create({ title, description, image, user_id });

    const result = await Post.aggregate([
      {
        $match: { _id: newPost._id }
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


// delete a Post
const deletePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such Post'})
  }

  const Post = await Post.findOneAndDelete({_id: id})

  if(!Post) {
    return res.status(400).json({error: 'No such Post'})
  }

  res.status(200).json(Post)
}

// update a Post
const updatePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such Post'})
  }

  const Post = await Post.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!Post) {
    return res.status(400).json({error: 'No such Post'})
  }

  res.status(200).json(Post)
}

// like dislike Post
const likePost = async (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such Post' });
  }

  try {
    const likePost = await Post.findById({ _id: id });
    if (likePost.likes.includes(userId)) {
      await likePost.updateOne({ $pull: { likes: userId } });
    } else {
      await likePost.updateOne({ $push: { likes: userId } });
    }
    
    const result = await Post.aggregate([
      {
        $match: { _id: likePost._id }
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
    const updatedPost = result[0];

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  getAllposts,
  getUserposts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  likePost
}