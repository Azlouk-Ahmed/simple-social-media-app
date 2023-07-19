const express = require("express");

const {loginUser, signupUser, getAllUsers,followUser, userPosts, getFollowers} = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

const rout = express.Router();

rout.post("/login", loginUser);

rout.post("/signup", signupUser);

rout.get("/users", getAllUsers);

rout.put("/follow/:id",requireAuth, followUser);

rout.get("/profile/:id", userPosts);

rout.get("/followers/:id", getFollowers);

module.exports = rout