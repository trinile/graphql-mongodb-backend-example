import { Post, User } from '../models';
import  userService from './userService';

const getPostById = async (root, { _id }) => {
  try {
    let post = await Post.findOne({ _id }).exec();
    return post;
  }
  catch (err) {
    return err;
  }
};

const getListOfPosts = async () => {
  console.log('in list of posts');
  try {
    let posts = await Post.find({}).populate('_creator comments').exec();
    console.log(posts);
    return posts;
  }
  catch(err) {
    return err;
  }
};

//TODO: fix create post -.> user args
const createPost = async ({ title, content, _creator }) => {
  let newPost = new Post({
    title,
    content,
    _creator,
  });
  try {
    let post = await newPost.save();
    //save ref of post to user
    let args = { _id: _creator, posts: post._id };
    let user = await userService.updateUser(args);
    return post;
  } 
  catch(err) {
    return err;
  }
};

const updatePost = async ({ title, content, _id, _creator }) => {
  //NOTE: _creator not needed but graphql requires _creator? TODO:FIX this bug
  let updates = {};
  title ? updates.title = title : null;
  content ? updates.content = content : null;
  updates.update_at = Date.now();

  let post = await Post.findOneAndUpdate({ _id }, updates, { new: true }).exec();
  return post;
}

module.exports = {
  getPostById,
  getListOfPosts,
  createPost,
  updatePost,
}
