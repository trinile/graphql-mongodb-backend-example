import { Post, User, Comment } from '../models';

//TODO: complete comment service
// hook up to posts and user
const getCommentById = async (root, { id }) => {
  try {
    let comment = await Comment.findOne({ _id  }).exec();
    return comment;
  }
  catch (err) {
    return err;
  }
};

const getListOfComments = async () => {
  try {
    let comment = await Comment.find({}).populate({
      path: '_creator',
      select: 'username createdAt'
    }).populate({
      path: 'post',
      select: 'title',
    }).exec();
  }
  catch(err) {
    return err;
  }
};

const getAllCommentsByUser = async (root, { _id }) => {
  try {
    let comments = await User.find({ _id }).populate('Comments').exec();
    return comments;
  }
  catch(err) {
    return err;
  }
}

// const addComment = async (obj, {text, postId, userId}) => {
//   let newComment = new Comment({
//     text,
//     post: postId,
//     _creator: userId,
//   });

//   try {
//     newComment = await newComment.save();
//     //push comment to post
//     let post = await Post.find({ 
//       _id: postId,
//       { $push: { 'comments': newComment._id } }
//     });
//   } 
//   catch(err) {
//     return err;
//   }
// };

// const updateComment = (root, {title, content, id}) => {
//   let modify = {};
//   title ? modify.title = title : null;
//   content ? modify.content = content : null;

//   return new Promise((resolve, reject) => {
//     Note.update({id: id}, modify, (err, res) => {
//       if (err) {
//         reject(err)
//       } else {
//         Note.find({id: id}, (err, res) => {
//           err || res.length != 1 ? reject(err) : resolve(res[0]);
//         });
//       }
//     });
//   });
// }

module.exports = {
  getCommentById,
  getListOfComments,
  // addComment,
}
