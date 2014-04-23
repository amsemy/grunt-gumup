/*
 * grunt-gumup
 * https://github.com/amsemy/grunt-gumup
 *
 * Copyright (c) 2014 Amsemy
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt, size) {

    var cache = {},
        contents = [],
        idx = 0;

    function addToCache(filepath, buffer) {
        if (contents[idx] != null) {
            delete cache[contents[idx]];
        }
        cache[filepath] = buffer;
        contents[idx] = filepath;
        idx = (idx == size - 1 ? 0 : idx + 1);
    }

    return {
        read: function(filepath) {
            if (cache[filepath] == null) {
                var buffer = grunt.file.read(filepath);
                addToCache(filepath, buffer);
                return buffer;
            } else {
                return cache[filepath];
            }
        }
    };

};
