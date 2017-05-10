import {
  GraphQLObjectType,
} from 'graphql';

import PostMutations from './post';
import UserMutations from './user';

const RootMutations = new GraphQLObjectType({
  name: 'RootMutations',
  fields: () => ({
    ...PostMutations,
    ...UserMutations,
  })
});

export default RootMutations;
