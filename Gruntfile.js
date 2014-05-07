/*
 * grunt-gumup
 * https://github.com/amsemy/grunt-gumup
 *
 * Copyright (c) 2014 Amsemy
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

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

        clean: {
            tests: ['tmp']
        },

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
                    'tmp/sample-with-required-units.js': [
                        'test/fixtures/sample/main.js',
                        'test/fixtures/sample/util/*'
                    ],
                    'tmp/sample-without-required-units.js': [
                        'test/fixtures/sample/main.js'
                    ]
                }
            }
        },

        nodeunit: {
            tests: ['test/gumup-test.js']
        }

    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('test', ['clean', 'gumup', 'nodeunit']);

    grunt.registerTask('default', ['jshint', 'test']);

};
