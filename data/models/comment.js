import mongoose from 'mongoose';

var commentSchema = new mongoose.Schema({
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
  }
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
  _post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  type: String,
});


//middleware hooks 
//before each comment, find the creator/user to populate
const findCreator = function(next) {
  this.populate({
    path: '_creator',
    select: 'username createdAt _id'
  });
  next();
};

commentSchema.pre('find', findCreator);


export default mongoose.model('Comment', commentSchema);
