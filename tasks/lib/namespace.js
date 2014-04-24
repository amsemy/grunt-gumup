/*
 * grunt-gumup
 * https://github.com/amsemy/grunt-gumup
 *
 * Copyright (c) 2014 Amsemy
 * Licensed under the MIT license.
 */

'use strict';

var Namespace = function(sourceCache) {
    this._sourceCache = sourceCache;
    this._sources = [];
};

Namespace.prototype.add = function(srcFile) {
    this._sources.push(this._sourceCache.get(srcFile));
};

Namespace.prototype.resolve = function() {
    var sourceCache = this._sourceCache,
        sources = this._sources,
        processed = {},
        srcFiles = [];

    for (var s = 0, sLen = this._sources.length; s < sLen; s++) {
        var queue = [sources[s]];
        var stack = [];
        var direction = true;

        // Source file can contain few units, so assume that the file is a "big"
        // unit.
        while (true) {
            // Move in queue or get back via stack.
            var src = direction ? queue.shift() : stack.pop();
            // Skip processed units.
            if (direction && processed[src]) {
                direction = false;
                continue;
            }
            // Check for existing unprocessed dependencies.
            var deps = sourceCache.getDependencies(src, processed);
            if (deps.length) {
                if (direction) {
                    queue.unshift(deps);
                }
                for (var i = 0, len = stack.length; i < len; i++) {
                    if (stack[i] === src) {
                        error('Recursive dependency'); // TODO: print stack
                    }
                }
                stack.push(src);
                direction = true;
            } else {
                processed[src] = true;
                srcFiles.push(sourceCache.getFileName(src));
                direction = false;
                // Check the exit point.
                if (!stack.length) {
                    break;
                }
            }
        }

    }
    return srcFiles;
};

module.exports = Namespace;
