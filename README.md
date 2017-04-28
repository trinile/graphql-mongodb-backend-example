# graphql-mongodb-backend-example


This is a basic backend boilerplate for setting up a graphql server with mongodb and express. 

## installation
```
npm install
```

```
npm start
```

## File structure
  - config
    - index
  - data
    - models
      - comment.js
      - index.js
      - post.js
      - user.js
    - services
      - commentService.js
      - index.js
      - postService.js
      -userService.js
    - types
      - customScalars
        - date.js
      - comment.js
      - post.js
      - query.js
      - user.js
    - index.js
    - node.js
    - schema.graphql
    - schema.js
    - schema.json
  - node_modules
  - scripts
    - schema
      - updateSchema.js
    - seed
      - seedDatabase.js
  - .babelrc
  - gitignore
  - package.json
  - server.js
  - webpack.config.js 

## GraphQL
go to http://localhost:8080/graphql to work with the graphqil to make queries 
from schema.js
root query is:

```Javascript
export var Schema = new GraphQLSchema({
  query: QueryType,
});
```
QueryType has these fields that can be queried on: in types/query.js 
- node
- users : retrieves all users 
- user(id) : retrieves user by id 
- posts : retrieves all posts
- post(id) : retrieves post by id 
- comments : retrieves all  comments 
- comment(id) : retrieves all comments by id 

graphiql queries look like this: 
![graphiql screenshot](http://i68.tinypic.com/1zz486p.png)
## Database
### Models
- user
- post
- comment 

Example schema in [model].js
```Javascript
import mongoose from 'mongoose';

let newModelSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: mongoose.Types.ObjectId,
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //add in field for graphql type 
  type: { 
    type: String,
  }
})

export default mongoose.model('User', UserSchema);
```

## Schema 
### Node interface and Node field

Node Interface used for re-fetching of objects 
```Javascript
let nodeInterface = new GraphQLInterfaceType({
  name: 'Node',
  description: 'An object with an ID',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The global unique ID of an object'
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The type of the object"
    }
  }),
  resolveType: (obj) => {
    if (obj.type === 'user') {
      return UserType;
    } else if (obj.type === 'post') {
      return PostType;
    } else if (obj.type === 'comment') {
      return CommentType;
    }
  }
});

module.exports = {
  nodeInterface: () => [ nodeInterface ], //wrap nodeInterface in function to avoid circular dependency issues 
  nodeField: nodeField,
}
```

