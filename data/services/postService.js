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
    return err
  }
  catch(err) {
    return err;
  }
};

const getAllPostsByUser = async (root, { _id }) => {
  try {
    let posts = await User.find({ _id }).populate('posts').exec();
    return posts;
  }
  catch(err) {
    return err;
  }
}

const addPost = async (obj, {title, content, userId }) => {
  let newPost = new Post({
    title,
    content,
    _creator: userId,
  });
  try {
    newPost.save();
  } 
  catch(err) {
    return err;
  }
};

// const updatePost = (root, {title, content, id}) => {
//   let modify = {};
//   title ? modify.title = title : null;
//   content ? modify.content = content : null;

//   return new Promise((resolve, reject) => {
//     Post.update({id: id}, modify, (err, res) => {
//       if (err) {
//         reject(err)
//       } else {
//         Post.find({id: id}, (err, res) => {
//           err || res.length != 1 ? reject(err) : resolve(res[0]);
//         });
//       }
//     });
//   });
// }

module.exports = {
  getPostById,
  getListOfPosts,
  addPost,
}
