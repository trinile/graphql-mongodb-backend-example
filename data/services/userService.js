import { User } from './../models';

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

// TODO: create function for updating user
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
  // friends ? updates.friends = friends : null;
  // posts ? updates.posts = posts : null;
  // comments ? updates.comments = comments : null;
  updates.updated_at = Date.now();

  console.log('what are updates', updates);
  try {
    let user = await User.findOneAndUpdate({ _id }, updates, { new: true }).exec();
    console.log('successfully updated user', user);
    return user;

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
