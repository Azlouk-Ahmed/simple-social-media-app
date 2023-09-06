const User  = require("../models/userModel")
const Workout = require("../models/workoutModel");
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const generateToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: "365d" })
}
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.login(email, password);
        const token = generateToken(user._id)
        res.status(200).json({user, token})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
   
}

const signupUser = async (req, res) => {
    const {email, password, name, surname, img} = req.body;
    try {
        const user = await User.signup(email, password, name, surname, img)
        const token = generateToken(user._id)
        res.status(200).json({user,token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


const getAllUsers = async (req, res) => {
    const user_id = req.user._id;
    try {
        const users = await User.find({ _id: { $ne: user_id } }).sort( {name : 1});
        res.status(200).json(users)
    } catch (error) {
        res.status(200).json({error: error.message})
    }
}

// follow unfollow user
const followUser = async (req, res) => {
    let user;
    const user_id = req.user._id;
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such user' });
    }
    try {
        user = await User.findById({_id : id});
        (user.followers.includes(user_id)) ? 
            await user.updateOne({$pull : {followers : user_id}}) :
            await user.updateOne({$push : {followers : user_id}})
        const result = await User.findById({_id : id})
        return res.status(200).json(result);
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//get user with posts

const userPosts = async (req, res) => {
    const user_id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).json({error: "no such user"});
    }
    try {
        const user = await User.findById({_id: user_id});
        const posts = await Workout.find({user_id});
        return res.status(200).json({user,posts :[...posts]});
        
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

// get follower of a user 
const getFollowers = async (req, res) => {
    const userId = req.params.id;
    const user_id = req.user._id; 
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const followerIds = user.followers;
    const users = await User.find({ _id: { $in: followerIds, $ne: user_id } });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//update user info 
const updateCurrentUser = async (req, res) => {
    const user_id = req.user._id;
    const currentUser = await User.findOneAndUpdate({_id: user_id}, {
        ...req.body
    }, { new: true });
    if(!currentUser) {
        return res.status(404).json({error : "Error udating user"})
    }
    return res.status(200).json(currentUser);
}

module.exports = {updateCurrentUser, loginUser, signupUser, getAllUsers, followUser, userPosts, getFollowers};