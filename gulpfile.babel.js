import gulp from 'gulp';
import babel from 'gulp-babel';
import schema from 'gulp-graphql';

import path from 'path';
import fs from 'fs';
import nodemon from 'nodemon';

import webpack from 'webpack';
import prodconfig from './webpack.config.prod.js';
import devConfig from './webpack.config.dev.js';
import graphQLConfig from './webpack.config.js';

//TODO: generate-schema is not giving regeneratorRuntime error
//As consequence, watch-schema will not rebuild schema when files change
//Gulp file is useless at the moment! 

let config;
let env = process.env.NODE_ENV || 'development';
env === 'development' ? config = devConfig : prodConfig;


function onBuild(done) {
  return function(err, stats) {
    if(err) {
      console.log('Error', err);
    } else {
      console.log(stats.toString());
    }
    if (done) {
      done();
    }
  }
}

gulp.task('graphql-build', (done) => {
  let compiler = webpack(config, (err, stats) => {
    console.log('[graphql-build-task: building graphql webpack...]');
    onBuild(done)(err, stats);
  });
});

gulp.task('graphql-watch', () => {
  //leave out done cb
  let compiler = webpack(graphQLConfig).watch(100, (err, stats) => {
    console.log('[graphql-watch: compiling again...]');
    if (err) {
      console.log('Error', err);
    } 
    console.log(stats.toString());
    nodemon.restart();
  });
})
// Regenerate the graphql schema and recompile the frontend code that relies on schema.json
gulp.task('generate-schema', () => {
  console.log('[generate-schema: Generating graphql schema...]');
  return gulp.src('./data/schema.js')
    //TOFIX: getting Reference Error: regeneratorRuntime is not defined"
    //adding babel options not working :/ 
    .pipe(babel({
      presets: [ 'es2015', 'stage-0'],
      plugins: ['transform-object-rest-spread', ['transform-runtime', {
      'polyfill': false,
      'regenerator': true
    }]],
    }))
    // .pipe(require('babel/polyfill'))
    .pipe(schema({
      json: true,
      graphql: true,
    }))
    .on('error', console.log)
    .pipe(gulp.dest('./data/'))
    // .pipe(gulp.dest('./build/data'));
});

// recompile the schema whenever .js files in data are updated
gulp.task('watch-schema', () => {
  gulp.watch(path.join(__dirname, './data/', '**/*.js'), ['generate-schema']);
});

gulp.task('graphQL-server', ['graphql-watch', 'watch-schema'], () => {
  nodemon({
    execMap: {
      js: 'node'
    },
    script: path.join(__dirname, 'build', '[build].backend.js'),
    // do not watch any directory/files to refresh
    // all refreshes should be manual
    watch: ['foo/'],
    ext: 'noop',
    ignore: ['*']
  }).on('restart', () => {
    console.log('[nodemon]: restarting server...');
  });
});

gulp.task('build', ['graphql-build', 'generate-schema']);
gulp.task('default', ['graphQL-server']);
