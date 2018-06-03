'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // grunt.registerTask('default', ['test']);
  // grunt.registerTask('test', ['jshint', 'karma:unit']);
  // grunt.registerTask('dist', ['surround:main', 'uglify', 'surround:banner' ]);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    claspOptions: grunt.file.readJSON('./app/.clasp.json'),
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
        files: { src: ['app/**/*.js'] },
        options: { jshintrc: '.jshintrc' }
      }
    },
    open: {
      dev: {
        path:
          'https://script.google.com/macros/s/<%= claspOptions.devId %>/dev',
        app: 'firefox'
      },
      prod: {
        url:
          'https://script.google.com/macros/s/<%= claspOptions.execId %>/exec',
        app: 'firefox'
      }
    },
    uglify: {
      options: {
        mangle: true,
        compress: true
      },
      build: {
        files: {
          'dist/output.min.js': ['app/**/*.js', '!*.min.js']
        }
      }
    },
    surround: {
      main: {
        expand: true,
        cwd: 'app',
        src: ['gs/**/*.js'],
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
