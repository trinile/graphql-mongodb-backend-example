'use strict';

let config = {};

config.port = process.env.PORT || 8080;
config.databaseURL = 'mongodb://localhost/exampleDB';

export default config;