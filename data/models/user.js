import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const SALT_WORK_FACTOR = 10;

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
  salt: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  type: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
  friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});

//add hook for hashing password with bcrypt
UserSchema.pre('save', async function(next) {
  //only hash passord if is is new or has been modified.
  let user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      user.salt = salt;
      return next(user); //pass in user to save hash to db
    });
  });
});

// TODO: hook up hashpassword in pre-save using async await
UserSchema.methods.hashPassword = async function(password, next) {
  let user = this;
  try {
    let salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    let hash = await bcrypt.hash(password, salt, null);
    // console.log('what is salt, hash', hash, salt);
    user.salt = salt;
    user.password = hash;
    return next(user);

  } catch(err) {
    return next(err);
  }
}
//TODO: hook up method to validating user login
UserSchema.methods.isValidPassword = async function(password, cb) {
  try {
    let isValid = bcrypt.compare(password, this.password);
    return cb(null, isValid);
  } catch (err) {
    return cb(err);
  }
};

export default mongoose.model('User', UserSchema);
