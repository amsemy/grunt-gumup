'use strict';

var gruntMock = {
    file: {
        read: function() {
            return {};
        }
    }
};

var fileCache = require('../../lib/file_cache');


