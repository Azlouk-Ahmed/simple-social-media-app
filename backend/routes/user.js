const express = require("express");

const {loginUser, signupUser, getAllUsers,followUser, userPosts, getFollowers, updateCurrentUser, deleteUser} = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

const rout = express.Router();

rout.post("/login", loginUser);

rout.post("/signup", signupUser);

rout.delete("/delete",requireAuth, deleteUser);

rout.get("/users",requireAuth, getAllUsers);

rout.put("/follow/:id",requireAuth, followUser);

rout.get("/profile/:id", userPosts);

rout.get("/followers/:id",requireAuth, getFollowers);

rout.patch("/user",requireAuth, updateCurrentUser);

module.exports = rout