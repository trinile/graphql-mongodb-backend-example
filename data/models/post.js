import mongoose from 'mongoose';

var PostSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
    default: mongoose.Types.ObjectId,
  },
  title: String,
  content: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
  },
  _comments: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
  isDeleted: {
    type: Boolean,
    default: false,
  },
  type: String,
});

//middleware hooks

export default mongoose.model('Post', PostSchema);
