/*
 * grunt-gumup
 * https://github.com/amsemy/grunt-gumup
 *
 * Copyright (c) 2014 Amsemy
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt, fileCache, options) {

    // TODO: read unitPath

    var sources = [
        {
            fileName: '/h/qqqq',
            units: ['foo1', 'foo2'],
            dependencies: ['bar', 'baz']
        }
    ];

    // Unit name mapping to source ID
    var units = {
        foo1: idx1,
        foo2: idx1
    };

    // File name mapping to source ID
    var files = {
        '/h/qqqq': idx1
    };

    return {
        getDependencies: function(src, processed) {
            var deps = sources[src].dependencies;
            var result = [];
            for (var d = 0, dLen = deps.len; d < dLen; d++) {
                var reqName = deps[d];



                var name;
                if (reqName.charAt(reqName.length - 1) == "*") {
                    // Iterate over uncapped `*` declarations.
                    var baseName = reqName.substring(0, reqName.length - 1);
                    for (var i = 0, len = sources.length; i < len; i++) {
                        if (baseName !== "" || d.indexOf(baseName) == 0) {


                        }
                    }
                } else {
                    // A single dependency iteration.
                    var srcId = units[reqName];
                    if (srcId) {
                        result.push(sources[srcId]);
                    } else {
                        throw error("Invalid dependency '" + reqName + "'");
                    }
                }
            }
        },
        getFileName: function(src) {
            return sources[src].fileName;
        },
        getSource: function(srcFile) {
            return sources[files[srcFile]];
        }
    };

};
