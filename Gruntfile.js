'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: [
        '/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
        ' * @link <%= pkg.homepage %>',
        ' * @license <%= pkg.license %>',
        ' */',
        ''
      ].join('\n')
    },
    jshint: {
      src: {
        files: { src: ['./**/*.js'] },
        options: { jshintrc: '.jshintrc' }
      }
    },
    uglify: {
      build: {
        expand: true,
        cwd: 'dist',
        src: ['*.js', '!*.min.js'],
        ext: '.min.js',
        dest: 'dist'
      }
    },
    surround: {
      main: {
        expand: true,
        cwd: 'src',
        src: ['*.js'],
        dest: 'dist',
        options: {
          prepend: ['(function(global, modulazer) {', "'use strict';"].join(
            '\n'
          ),
          append: '})(this, modulazer);'
        }
      },
      banner: {
        expand: true,
        cwd: 'dist',
        src: ['*.js'],
        dest: 'dist',
        options: {
          prepend: '<%= meta.banner %>'
        }
      }
    }
  });
};
