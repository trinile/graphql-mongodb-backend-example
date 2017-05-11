import QueryType from './types/query';
import { GraphQLSchema } from 'graphql';
import RootMutations from './types/mutations';


export var Schema = new GraphQLSchema({
  query: QueryType,
  mutation: RootMutations,
});

console.log('hello, updated schema!sdf');