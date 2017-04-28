import gulp from 'gulp';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import nodemon from 'nodemon';
import path from 'path';
import schema from 'gulp-graphql';
import fs from 'fs';

import { graphQLConfig } from './webpack.config.js';

// restart the graphQL server whenever a required file is updated
gulp.task('graphQL-watch', (done) => {
  let compiled = false;
  webpack(graphQLConfig).watch(100, (err, stats) => {
    console.log('in graphql webpack watch');
    if (err) {
      console.log('error', err);
    }
    console.log(stats.toString());
    if (!compiled) {
      compiled = true;
      done()
    }
    nodemon.restart();
  });
});

// Regenerate the graphql schema and recompile the frontend code that relies on schema.json
gulp.task('generate-schema', () => {
  console.log('Generating graphql schema...');
  return gulp.src('./data/schema.js')
    .pipe(schema({
      json: true,
      graphql: true,
    }))
    .on('error', console.log)
    .pipe(gulp.dest('./data/'))
    .pipe(gulp.dest('build/data'))
    .on('end', recompile);
});

// recompile the schema whenever .js files in data are updated
gulp.task('watch-schema', () => {
  gulp.watch(path.join(__dirname, './data/', '**/*.js'), ['generate-schema']);
});

gulp.task('graphQL-server', ['graphQL-watch', 'watch-schema'], () => {
  nodemon({
    execMap: {
      js: 'node'
    },
    script: path.join(__dirname, 'build', 'build-server.js'),
    // do not watch any directory/files to refresh
    // all refreshes should be manual
    watch: ['foo/'],
    ext: 'noop',
    ignore: ['*']
  }).on('restart', () => {
    console.log('[nodemon]: restart');
  });
});

gulp.task('default', ['graphQL-server']);