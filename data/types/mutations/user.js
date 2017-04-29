import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from 'graphql';

import { userService } from './../../services';
import UserType from '../user';
import PostType from '../post';
import CommentType from '../comment';
import DateType from '../customScalars/date';

//import input types 
// import { updatePost } from './post';

let CreateUserType = new GraphQLInputObjectType({
  name: 'UserInput',
  description: 'A person who uses the app',
  // interfaces: nodeInterface,
  fields: () => ({
    username: {
      type: GraphQLString,
      description: 'username created by user',
    },
    email: {
      type: GraphQLString,
      description: 'user\'s email address',
    },
    password: {
      type: GraphQLString,
      description: 'user\'s password',
    },
  }),
})

let UpdateUserType = new GraphQLInputObjectType({
  name: 'updateUser',
  descriptions: 'changes to user profile',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    first_name: {
      type: GraphQLString,
    },
    last_name: {
      type: GraphQLString,
    },
    username: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    //TODO: create input object types for rest of these
    // posts: {
    //   type: new GraphQLList(Type),
    // },
    // comments: {
    //   type: new GraphQLList(CommentType),
    // },
    // friends: {
    //   type: new GraphQLList(UserType),
    // },
  }),
});

const UserMutationType = new GraphQLObjectType({
  name: 'UserMutations',
  fields: () => ({
    createUser: {
      type: UserType,
      description: 'new user signs up with app',
      args: {
        user: { type: CreateUserType }
      },
      resolve: (root, { user }) => {
        return userService.createUser(user);
      }
    },
    updateUser: {
      type: UserType,
      description: 'user makes changes to profile',
      args: {
        user: { type: UpdateUserType }
      },
      resolve: (root, { user }) => {
        return userService.updateUser(user);
      }
    }
  })
});

export default UserMutationType;
