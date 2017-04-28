import mongoose from 'mongoose';
import config from '../config';

const mongoUri = config.databaseURL;

mongoose.connect(mongoUri, {
  server: {
    auto_reconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  },
});

const connection = mongoose.connection;

connection.on('error', (err) => {
  if (err.message.code === 'ETIMEDOUT') {
    console.log(err);
    mongoose.connect(mongoUri, opts);
  }
  console.log(err);
});

connection.once('open', () => {
  console.log(`MongoDB sucessfully connected to ${mongoUri}.`)
  mongoose.Promise = global.Promise;
});

export default connection;