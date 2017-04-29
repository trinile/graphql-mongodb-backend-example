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
      description: 'title of the post',
    },
    content: {
      type: GraphQLString,
      description: 'content of post',
    },
    //create connection
    _creator: {
      type: UserType,
      description: 'author id of the post',
    },
  })
});

let UpdatePostType = new GraphQLInputObjectType({
  name: 'updatePost',
  description: 'changes made to a post',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    }
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    _creator: {
      type: UserType,
      description: 'author id of the post',
    },
    //remember to update update_at field to time reflect changes made
  }),
});

const PostMutationType = new GraphQLObjectType({
  name: 'Post Mutations',
  description: 'mutations done to posts',
  fields: () => {
    createPost: {
      type: PostType,
      args: {
        post: { type: PostType },
      },
      resolve: (root, post) => {
        return postService.createPost(post);
      }
    },
    updatePost: {
      type: PostType,
      args: {
        post: { type: PostType }
      },
      resolve: (root, post) => {
        return postService.updatePost(post);
      }
    }
  }
})

module.exports = {
  CreatePostType,
  UpdatePostType,
  PostMutationType,
};
