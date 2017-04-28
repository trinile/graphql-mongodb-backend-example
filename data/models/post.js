import mongoose from 'mongoose';

var PostSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
    index: true,
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
  comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  type: String,
});

export default mongoose.model('Post', PostSchema);
