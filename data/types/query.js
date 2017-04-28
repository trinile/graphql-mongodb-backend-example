import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInterfaceType,
} from 'graphql';

import { User, Post, Comment } from './../models';
import { nodeInterface, nodeField } from './../node';
import { postService, userService, commentService} from './../services';
import UserType from './user';
import PostType from './post';
import CommentType from './comment';

const QueryType = new GraphQLObjectType ({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    users: {
      type: new GraphQLList(UserType),
      resolve: userService.getListofUsers,
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve: (root, {id}) => {
        return userService.getUserById(id)
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: postService.getListOfPosts,
    },
    post: {
      type: PostType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve: (root, {id}) => {
        return postService.getPostById(id)
      }
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve: commentService.getListofComments,
    },
    comment: {
      type: CommentType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve: (root, {id}) => {
        return commentService.getCommentById(id)
      }
    }
  }),
});

export default QueryType;