'use strict';

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


var fileCache = require('../../tasks/lib/file_cache');

exports.file_cache = {
    read: function(test) {
        var fc = fileCache(gruntStub.stub(), 5);
        var buffer;

        buffer = fc.read("aaa");
        test.equal(gruntStub.callCount, 1);
        test.equal(buffer, "body:aaa");

        buffer = fc.read("aaa");
        test.equal(gruntStub.callCount, 1);
        test.equal(buffer, "body:aaa");

        buffer = fc.read("bbb");
        test.equal(gruntStub.callCount, 2);
        test.equal(buffer, "body:bbb");

        buffer = fc.read("ccc");
        test.equal(gruntStub.callCount, 3);
        test.equal(buffer, "body:ccc");

        buffer = fc.read("ddd");
        test.equal(gruntStub.callCount, 4);
        test.equal(buffer, "body:ddd");

        buffer = fc.read("eee");
        test.equal(gruntStub.callCount, 5);
        test.equal(buffer, "body:eee");

        buffer = fc.read("aaa");
        test.equal(gruntStub.callCount, 5);
        test.equal(buffer, "body:aaa");

        buffer = fc.read("fff");
        test.equal(gruntStub.callCount, 6);
        test.equal(buffer, "body:fff");

        buffer = fc.read("aaa");
        test.equal(gruntStub.callCount, 7);
        test.equal(buffer, "body:aaa");

        buffer = fc.read("ggg");
        test.equal(gruntStub.callCount, 8);
        test.equal(buffer, "body:ggg");

        buffer = fc.read("bbb");
        test.equal(gruntStub.callCount, 9);
        test.equal(buffer, "body:bbb");

        test.done();
    }
};
