import mongoose from 'mongoose';

let CommentSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
    default: mongoose.Types.ObjectId,
  },
  text: {
    type: String,
    required: true,
    //add vaidation/ length?
  },
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
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  type: String,
});

//populate fields and then continue with query

export default mongoose.model('Comment', CommentSchema);
