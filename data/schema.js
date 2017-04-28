import QueryType from './types/query';
import { GraphQLSchema } from 'graphql';
import UserMutationType from './types/mutations/user';


export var Schema = new GraphQLSchema({
  query: QueryType,
  mutation: UserMutationType, //TODO
});
