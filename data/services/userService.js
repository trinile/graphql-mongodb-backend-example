import { User } from './../models';
import _ from 'lodash';

const getUserById = async function(_id) {
  try {
    let user = await User.findOne({ _id }).populate('posts friends').exec();
    return user;
  }
  catch (err) {
    return err;
  }
}

const getListofUsers = async function() {
  try {
    let users = await User.find({}).populate('posts').exec();
    return users;
  }

  catch(err) {
    return err;
  }
}

const createUser = async ({ username, password, email }) => {
  let newUser = new User({
    username,
    password,
    email,
  });

  try {
    newUser = await newUser.save();
    return newUser;
  }
  catch(err) {
    return err;
  }
};

const updateUser = async (user) => {
  const { 
    _id,
    username,
    first_name,
    last_name,
    email,
    password,
    friends,
    posts,
    comments,
  } = user;

  let updates = {};
  username ? updates.username = username : null;
  first_name ? updates.first_name = first_name : null;
  last_name ? updates.last_name = last_name : null;
  email ? updates.email = email : null;
  password ? updates.password = password : null;
  //TODO: add updating friends, posts, comments
  //SHOULD IT BE HERE??
  // friends ? updates.friends = friends : null;
  // posts ? updates.posts = posts : null;
  // comments ? updates.comments = comments : null;
  updates.updated_at = Date.now();
  console.log('what are updates', updates);
  try {
    //if updating password, call find, then save() methods to re-hash password.
    if (updates.password) {
      let user = await User.findById({ _id }).exec();
      _.forEach(updates, (update, key) => {
        user[key] = update;
      })
      user = user.save();
      return user;
    }
    else {
      // must set { new: true } option to return updated entry
      //mongo will return user before updates otherwise
      let user = await User.findOneAndUpdate({ _id }, updates, { new: true }).exec();
      return user;
    }
  }
  catch (err) {
    return err;
  }
}

const deleteUser = async ({ _id }) => {
  try {
    return await User.remove({ _id });
  } catch (err) {
    return err;
  }
}

module.exports = {
  getUserById,
  getListofUsers,
  createUser,
  updateUser,
  deleteUser,
}
