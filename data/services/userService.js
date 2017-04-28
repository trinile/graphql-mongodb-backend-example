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
  console.log('getting list of users------->');
  try {
    let users = await User.find({}).populate('posts').exec();
    return users;
  }

  catch(err) {
    return err;
  }
}

const addUser = async (root, req) => {
  const { 
    username,
    first_name,
    last_name,
    password,
    email,
    posts,
    comments,
    friends,
  } = req

  const newUser = newUser({
    username,
    first_name,
    last_name,
    password,
    email,
    posts,
    comments,
    friends,
  });

  try {
    return await newUser.save();
  }
  catch(err) {
    return err;
  }

};

//TODO: create function for updating user
// const updateUser = (user) => {
//   try {
//     //TODO: req.body 
//     let saveUser = user.save().exec();
//   }
//   catch (err) {
//     return err;
//   }
// }

module.exports = {
  getUserById,
  getListofUsers,
  addUser,
}
