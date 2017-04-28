import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLString,
} from 'graphql';

import { userService } from './../../services';
import UserType from '../user';

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

const UserMutationType = new GraphQLObjectType({
  name: 'UserMutations',
  fields: () => ({
//     //add mutations here
    createUser: {
      type: UserType,
      description: 'new user signs up with app',
      args: {
        user: { type: CreateUserType }
      },
      resolve: (value, { user }) => {
        console.log('what is user --->', user);
        return userService.createUser(user);
      }
    }
  })
});

export default UserMutationType;
