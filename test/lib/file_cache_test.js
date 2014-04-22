'use strict';

var file_cache = require('../../tasks/lib/file_cache');

var gruntStub = {
    callCount: 0,
    stub: function() {
        return {
            file: {
                read: function (filepath) {
                    gruntStub.callCount++;
                    return "body:" + filepath;
                }
            }
        };
    }
};

exports.file_cache = {
    read: function(test) {
        var fileCache = file_cache(gruntStub.stub(), 5);
        var buffer;

        buffer = fileCache.read("aaa");
        test.equal(gruntStub.callCount, 1);
        test.equal(buffer, "body:aaa");

        buffer = fileCache.read("aaa");
        test.equal(gruntStub.callCount, 1);
        test.equal(buffer, "body:aaa");

        buffer = fileCache.read("bbb");
        test.equal(gruntStub.callCount, 2);
        test.equal(buffer, "body:bbb");

        buffer = fileCache.read("ccc");
        test.equal(gruntStub.callCount, 3);
        test.equal(buffer, "body:ccc");

        buffer = fileCache.read("ddd");
        test.equal(gruntStub.callCount, 4);
        test.equal(buffer, "body:ddd");

        buffer = fileCache.read("eee");
        test.equal(gruntStub.callCount, 5);
        test.equal(buffer, "body:eee");

        buffer = fileCache.read("aaa");
        test.equal(gruntStub.callCount, 5);
        test.equal(buffer, "body:aaa");

        buffer = fileCache.read("fff");
        test.equal(gruntStub.callCount, 6);
        test.equal(buffer, "body:fff");

        buffer = fileCache.read("aaa");
        test.equal(gruntStub.callCount, 7);
        test.equal(buffer, "body:aaa");

        buffer = fileCache.read("ggg");
        test.equal(gruntStub.callCount, 8);
        test.equal(buffer, "body:ggg");

        buffer = fileCache.read("bbb");
        test.equal(gruntStub.callCount, 9);
        test.equal(buffer, "body:bbb");

        test.done();
    }
};
