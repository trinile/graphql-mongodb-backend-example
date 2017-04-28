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

const createUser = async ({ username, password, email }) => {
  console.log('what is user', username, password, email);
  let newUser = new User({
    username,
    password,
    email,
  });

  try {
    newUser = await newUser.save();
    console.log('what is new user', newUser);
    return newUser;
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
  createUser,
}
