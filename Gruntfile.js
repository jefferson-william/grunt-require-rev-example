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
      dist: {
        expand: true,
        cwd: 'dist',
        src: [
          'scripts/*.js'
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
          'bower_components/**/*'
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
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-require-rev');

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

  grunt.registerTask('rev', ['requireRev']);

};

// grunt clean && grunt copy && grunt rev && grunt browserSync:dist
