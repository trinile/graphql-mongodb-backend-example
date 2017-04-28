import mongoose from 'mongoose';
import config from './../../config';
import casual from 'casual';

import { User, Post, Comment } from './../../data/models';

mongoose.connect(config.databaseURL, () => {
  console.log('connected to mongodb at ', config.databaseURL);
});

console.log('what is connection', config.databaseURL);

let createPost = async (user) => {
  let post = new Post({
    title: casual.title,
    content: casual.text,
    type: 'post',
    _creator: user._id,
  });

  await post.save();
  await user.posts.push(post);
  await user.save();
}

let createUser = async () => {
  let fakeUser = new User({
    username: casual.username,
    first_name: casual.first_name,
    last_name: casual.last_name,
    email: casual.email,
    password: casual.password,
    type: 'user',
  });

  await fakeUser.save();
  await createPost(fakeUser);
  await createPost(fakeUser);
  await createPost(fakeUser);

  return fakeUser;
};

let user1 = createUser();
let user2 = createUser();
let user3 = createUser();
let user4 = createUser();

//TODO: seed database with friends and comments
// console.log('what is user1', user1); <- returning undefined..

// user1.friends = [ user2, user3, user4 ];
// user2.friends = [ user1, user4 ];
// user3.friends = [ user1, user4];
// user4.friends = [ user1, user2, user3];

// user1.save();
// user2.save();
// user3.save();
// user4.save();

setTimeout(function() {
  console.log('user user1:', user1._id); //returning undefined
  mongoose.disconnect();
}, 1000)