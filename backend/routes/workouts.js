const express = require('express')
const {
  getAllposts,
  getUserposts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  likePost
} = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router()
router.use(requireAuth)

// GET all posts
router.get('/', getAllposts)

// GET all posts
router.get('/user', getUserposts)

// GET a single post
router.get('/:id', getPost)

// POST a new post
router.post('/', createPost)

// DELETE a post
router.delete('/:id', deletePost)

// UPDATE a post
router.patch('/:id', updatePost)

// like a post 
router.put('/like/:id', likePost)

module.exports = router