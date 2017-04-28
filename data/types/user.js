import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  globalIdField
} from 'graphql-relay';

import { User, Post, Comment } from '../models';
import { nodeInterface } from './../node';
import PostType from './post';
import CommentType from './comment';
//TODO: fix custom scalar for date type (showing null in graphql)
import DateType  from './customScalars/date';

let UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses the app',
  interfaces: nodeInterface,
  fields: () => ({
    _id: { 
      // type: globalIdField('User'),
      type: new GraphQLNonNull(GraphQLID),
      // description: 'id created from graphql-relay',
    },
    first_name: {
      type: GraphQLString,
      description: 'user\'s first name',
    },
    last_name: {
      type: GraphQLString,
      description: 'user\'s last name',
    },
    username: {
      type: GraphQLString,
      description: 'username created by user',
    },
    email: {
      type: GraphQLString,
      description: 'user\'s email address',
    },
    created_at: {
      type: DateType, //TODO: change to Date format
      description: 'date the user acct created',
    },
    updated_at: {
      type: DateType, //TODO: change to Date format
      description: 'date user updated acct info',
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'type identified for node definitions'
    },
    posts: {
      type: new GraphQLList(PostType),
      description: 'posts that belong to User'
    },
    comments: {
      type: new GraphQLList(CommentType),
      description: 'comments made by User',
    },
    friends: {
      type: new GraphQLList(UserType),
      description: 'friends of user',
    },
  }),
})

export default UserType;
