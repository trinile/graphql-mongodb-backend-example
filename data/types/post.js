import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import { Post } from '../models';
import { nodeInterface } from '../../node';
import DateType  from './customScalars/date';
import UserType from './user';
import CommentType from './comment';

let PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'a Post created by a user',
  interfaces: nodeInterface,
  fields: () => ({
    id: { 
      type: new GraphQLNonNull(GraphQLID),
      // type: globalIdField('Post'),
      // description: 'id created from graphqql-relay',
    },
    title: {
      type: GraphQLString,
      description: 'title of the note',
    },
    content: {
      type: GraphQLString,
      description: 'content of note',
    },
    //create connection
    creator: {
      type: UserType,
      description: 'author id of the note',
    },
    comments: {
      type: new GraphQLList(CommentType),
      description: 'comments on the post',
    },
    created_at: {
      type: DateType,
      description: 'date the note was created',
    },
    updated_at: {
      type: DateType,
      description: 'date user updated note',
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
  })
})

export default CommentType;
