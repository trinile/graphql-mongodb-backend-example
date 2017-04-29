import { Post, User } from '../models';


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
  try {
    let post = await Post.find({}).exec();
    return post;
  }
  catch(err) {
    return err;
  }
};

const createPost = async (obj, {title, content, user }) => {
  let newPost = new Post({
    title,
    content,
    _creator: user._id,
  });
  try {
    let post = await newPost.save();
    await user.posts.push(post);
    await user.save();
    return post;
  } 
  catch(err) {
    return err;
  }
};

const updatePost = async (obj, {title, content, _id}) => {
  let updates = {};
  title ? updates.title = title : null;
  content ? updates.content = content : null;
  updates.update_at = Date.now();

  return await Post.update({ _id }, changes).exec();
}

module.exports = {
  getPostById,
  getListOfPosts,
  createPost,
  updatePost,
}
