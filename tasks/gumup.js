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
var unit_cache = require('./lib/unit_cache');

module.exports = function(grunt) {

    grunt.registerMultiTask('gumup', 'Concatenate gumup units.', function () {

        // Merge options with these defaults.
        var options = this.options({
            onResolve: null,
            cacheSize: 500,
            unitPath: "."
        });

        var fileCache = file_cache(grunt, options.cacheSize);
        var unitCache = unit_cache(grunt);

        // Iterate over all specified file groups.
        this.files.forEach(function(file) {

            file.src.forEach(srcFile, function() {
                // TODO: check file.exists
                unitCache.addSrc(srcFile);
            });

            var fileList = unitCache.resolve();
            var srcList = [];

            for (var i = 0, len = fileList.length; i < len; i++) {
                srcList.push(fileCache.read(fileList[i]));
            }

            if (typeof options.onResolve === 'function') {
                // Run callback function
                options.onResolve.call(this, fileList, file.dest);
            } else if (options.onResolve) {
                // Setup the project's Grunt configuration.
                var value
                grunt.config.set(options.onResolve, value);
            } else {
                // Concat the resolved files
                var src = srcList.join(options.separator);
                grunt.file.write(file.dest, src);
            }

            // Print a success message.
            grunt.log.writeln('File "' + file.dest + '" resolved: ' +
                chalk.green(fileList.length) + ' units');
        });

    });

};
