/*
 * grunt-gumup
 * https://github.com/amsemy/grunt-gumup
 *
 * Copyright (c) 2014 Amsemy
 * Licensed under the MIT license.
 */

'use strict';

var Gumup = require('gumup');
var chalk = require('chalk');
var path = require('path');

module.exports = function(grunt) {

    grunt.registerMultiTask('gumup', 'Concatenate gumup units.', function () {

        // Merge options with these defaults.
        var options = this.options({
            onResolve: null,
            separator: grunt.util.linefeed
        });

        var gumup = new Gumup(options);
        var result = {};

        // Iterate over all specified file groups.
        this.files.forEach(function(file) {

            // Resolve dependencies.
            var srcFiles = file.src
                .map(function(filepath) {
                    return path.resolve(filepath);
                });
            var resFiles;
            try {
                resFiles = gumup.resolve(srcFiles);
            } catch (e) {
                grunt.log.error(e);
                if (e.details != null) {
                    grunt.log.error('Details: ' + e.details);
                }
                grunt.fail.warn('Unable to resolve dependencies.');
            }

            // Concat the resolved files.
            if (!options.onResolve) {
                var buffer = [];
                for (var i = 0, il = resFiles.length; i < il; i++) {
                    buffer.push(grunt.file.read(resFiles[i]));
                }
                var dest = buffer.join(options.separator);
                grunt.file.write(file.dest, dest);
            } else {
                result[file.dest] = resFiles;
            }

            // Print a success message.
            grunt.log.writeln('File ' + chalk.cyan(file.dest) + ' resolved: ' +
                chalk.green(resFiles.length) + ' units');
        });

        if (typeof options.onResolve === 'function') {
            // Run callback function.
            options.onResolve.call(this, result);
        } else if (typeof options.onResolve === 'string') {
            // Setup the project's Grunt configuration.
            grunt.config.set(options.onResolve, result);
        } else if (options.onResolve != null) {
            grunt.fail.warn('Invalid "onResolve" property value');
        }

    });

};
