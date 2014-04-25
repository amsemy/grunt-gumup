/*
 * grunt-gumup
 * https://github.com/amsemy/grunt-gumup
 *
 * Copyright (c) 2014 Amsemy
 * Licensed under the MIT license.
 */

'use strict';

var chalk = require('chalk');
var file_cache = require('./lib/file_cache');
var namespace = require('./lib/namespace');
var unit_cache = require('./lib/unit_cache');

module.exports = function(grunt) {

    grunt.registerMultiTask('gumup', 'Concatenate gumup units.', function () {

        // Merge options with these defaults.
        var options = this.options({
            cacheSize: 500,
            enviroment: {},
            onResolve: null,
            separator: grunt.util.linefeed,
            unitPath: null
        });

        // TODO: set options
        // TODO: check unitPath

        var fileCache = file_cache(grunt, options.cacheSize);
        var unitCache = unit_cache(grunt, fileCache, options);
        var resolvedFiles = {};

        // Iterate over all specified file groups.
        this.files.forEach(function(file) {

            // Resolve dependencies.
            var ns = new namespace(unitCache);
            file.src.forEach(file.src, function(srcFile) {
                ns.add(srcFile);
            });
            var srcFiles = ns.resolve();

            // Concat the resolved files.
            if (!options.onResolve) {
                var buffer = [];
                for (var i = 0, len = srcFiles.length; i < len; i++) {
                    buffer.push(fileCache.read(srcFiles[i]));
                }
                var dest = buffer.join(options.separator);
                grunt.file.write(file.dest, dest);
            } else {
                resolvedFiles[file.dest] = srcFiles;
            }

            // Print a success message.
            grunt.log.writeln('File "' + file.dest + '" resolved: ' +
                chalk.green(srcFiles.length) + ' units');
        });

        if (typeof options.onResolve === 'function') {
            // Run callback function.
            options.onResolve.call(this, resolvedFiles);
        } else if (options.onResolve) {
            // Setup the project's Grunt configuration.
            grunt.config.set(options.onResolve, resolvedFiles);
        }

    });

};
