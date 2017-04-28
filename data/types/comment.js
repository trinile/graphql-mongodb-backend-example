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
import PostType from './post';

let CommentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'a Comment created by a user',
  interfaces: nodeInterface,
  fields: () => ({
    _id: { 
      type: new GraphQLNonNull(GraphQLID),
      // type: globalIdField('Post'),
      // description: 'id created from graphqql-relay',
    },
    text: {
      type: GraphQLString,
      description: 'content of note',
    },
    //create connection
    creator: {
      type: UserType,
      description: 'user who wrote the comment',
    },
    post: {
      type: PostType,
      description: 'post from which comment was made',
    }
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
