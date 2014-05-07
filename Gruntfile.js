/*
 * grunt-gumup
 * https://github.com/amsemy/grunt-gumup
 *
 * Copyright (c) 2014 Amsemy
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        gumup: {
            sample: {
                options: {
                    cwd: 'test/fixtures',
                    externals: [
                        {
                            globals: ['firstLib'],
                            files: ['third-party/first-lib.js'],
                            usages: ['sample/lib/first.js']
                        },
                        {
                            globals: ['secondLib'],
                            files: [
                                'third-party/third-lib.js',
                                'third-party/second-lib.js'
                            ],
                            usages: ['sample/baz.js']
                        }
                    ],
                    unitPath: ['sample']
                },
                files: {
                    'tmp/sample-without-required-units.js': [
                        'test/fixtures/sample/main.js'
                    ]
                }
            }
        },

        // Unit tests.
        nodeunit: {
//            tests: ['test/*_test.js']
            tests: ['test/lib/file_cache_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', /*'gumup',*/ 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
