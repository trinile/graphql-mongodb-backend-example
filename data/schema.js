import QueryType from './types/query';
import { GraphQLSchema } from 'graphql';

//TODO mutation types
// var mutationType = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: () => ({
//     //add mutations here
//   })
// });


export var Schema = new GraphQLSchema({
  query: QueryType,
  // mutation: mutationType //TODO
});
