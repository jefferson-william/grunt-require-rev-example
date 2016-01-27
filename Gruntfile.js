'use strict';

module.exports = function (grunt) {

  var config = {
    app: 'app',
    dist: 'dist/app'
  };

  grunt.initConfig({
    config: config,
    watch: {},
    requireRev: {
      options: {
        baseDir: 'dist',
        configFileRequire: 'dist/scripts/bootstrap.js'
      },
      dist: {
        expand: true,
        cwd: 'dist',
        src: [
          'scripts/**/*.js',
          'bower_components/**/*.js'
        ]
      }
    },
    clean: {
      dist: 'dist/'
    },
    copy: {
      dist: {
        expand: true,
        cwd: 'app/',
        src: [
          'scripts/**/*.js',
          'styles/**/*.css',
          'bower_components/**/*.js',
          'bower_components/**/*.css'
        ],
        dest: 'dist/'
      }
    },
    browserSync: {
      options: {
        notify: false,
        background: true,
        watchOptions: {
          ignored: ''
        }
      },
      livereload: {
        options: {
          files: [
            '<%= config.app %>/{,*/}*.html',
            '.tmp/styles/{,*/}*.css',
            '<%= config.app %>/images/{,*/}*',
            '.tmp/scripts/{,*/}*.js'
          ],
          port: 9000,
          server: {
            baseDir: ['.tmp', config.app],
            routes: {
              '/bower_components': './bower_components'
            }
          }
        }
      },
      dist: {
        options: {
          background: false,
          server: '<%= config.dist %>'
        }
      }
    },
    debug: {
      options: {
        open: true // do not open node-inspector in Chrome automatically
      }
    }
  });

  grunt.registerTask('debugger', 'My debug task.', function() {
    var done = this.async();
    grunt.util.spawn({
        cmd: 'node',
        args: ['--debug', 'app.js'],
        opts: {
            //cwd: current workin directory
        }
      },
      function (error, result, code) {
        if (error) {
          grunt.log.write (result);
          grunt.fail.fatal(error);
        }

        done();
      }
    );

    grunt.log.writeln('node started');

    grunt.util.spawn({
        cmd: 'node_modules/node-inspector',
        args: ['&'],
        opts: {
            //cwd: current workin directory
        }
      },
      function (error, result, code) {
        if (error) {
          grunt.log.write (result);
          grunt.fail.fatal(error);
        }

        done();
      }
    );

    grunt.log.writeln ('inspector started');
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-require-rev');
  grunt.loadNpmTasks('grunt-debug-task');

  grunt.registerTask('default', [
    'browserSync:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'copy:dist',
    'requireRev:dist',
    'browserSync:dist',
    'watch'
  ]);

  grunt.registerTask('r', ['clean', 'copy', 'requireRev']);
  grunt.registerTask('rev', ['clean', 'copy', 'requireRev']);

};

// grunt clean && grunt copy && grunt rev && grunt browserSync:dist
