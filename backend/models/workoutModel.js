const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description :{
    type : String,
    required: true
  },
  image : {
    type : String,
    required: false
  },
  user_id: {
    type: String,
    required: true
  },
  likes : []
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)