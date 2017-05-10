import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from 'graphql';

import { postService } from './../../services';
import UserType from '../user';
import PostType from '../post';
import CommentType from '../comment';
import DateType from '../customScalars/date';

let CreatePostType = new GraphQLInputObjectType({
  name: 'createPost',
  description: 'a Post created by a user',
  fields: () => ({
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    //create connection
    _creator: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'author id of the post',
    },
  })
});

let UpdatePostType = new GraphQLInputObjectType({
  name: 'updatePost',
  description: 'changes made to a post',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    _creator: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'author id of the post',
    },
    //remember to update update_at field to time reflect changes made
  }),
});

const PostMutations = {
  createPost: {
    type: PostType,
    description: 'creating a new post',
    args: {
      input: { type: CreatePostType },
    },
    resolve: (root, { input }) => {
      //root undefined
      return postService.createPost(input);
    },
  },
  updatePost: {
    type: PostType,
    args: {
      input: { type: UpdatePostType }
    },
    resolve: (root, { input }) => {
      return postService.updatePost(input);
    },
  }
};


export default PostMutations;
