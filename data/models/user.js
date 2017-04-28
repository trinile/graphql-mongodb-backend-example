import mongoose from 'mongoose';
import Post from './post';

let UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
    index: true,
    default: mongoose.Types.ObjectId
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
    minlength: [5, 'Username should be 5 characters or more'],
  },
  password: {
    type: String,
    minLength: [8, 'password should be 8 characters or more'],
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  type: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Note'}],
  friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});

//add hook for hashing password with bcrypt

export default mongoose.model('User', UserSchema);

