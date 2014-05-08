'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.gumup = {

    sample: {

        'resolve with required units': function(test) {
            var actual = grunt.file.read('tmp/sample-with-required-units.js');
            var expected = grunt.file.read('test/expected/sample-with-required-units.js');
            test.equal(actual, expected);
            test.done();
        },

        'resolve without required units': function(test) {
            var actual = grunt.file.read('tmp/sample-without-required-units.js');
            var expected = grunt.file.read('test/expected/sample-without-required-units.js');
            test.equal(actual, expected);
            test.done();
        }

    },

    passResultToFunction: {

        'write result to file': function(test) {
            var actual = grunt.file.read('tmp/pass-result-to-function.txt');
            var expected = grunt.file.read('test/expected/pass-result-to-function.txt');
            test.equal(actual, expected);
            test.done();
        }

    },

    passResultToTask: {

        'write result to file': function(test) {
            var actual = grunt.file.read('tmp/pass-result-to-task.txt');
            var expected = grunt.file.read('test/expected/pass-result-to-task.txt');
            test.equal(actual, expected);
            test.done();
        }

    }

};
