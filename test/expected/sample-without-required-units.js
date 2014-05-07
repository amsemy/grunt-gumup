var thirdLib = {};

var secondLib = thirdLib;

(function(ns, secondLib) {

    ns.unit('baz', function () {
        // ...
    });

})(gumup, secondLib);

var firstLib = {};

(function(ns, firstLib) {

    ns.unit('lib.first', function () {
        return firstLib;
    });

})(gumup, firstLib);

(function(ns) {

    var unit = ns.unit('bar', implementation);

    unit.require('baz');
    unit.require('lib.first');

    function implementation(units) {
        var baz = units.baz,
            first = units.lib.first;

        // ...
    }

})(gumup);

(function(ns) {

    var unit = ns.unit('foo', implementation);

    unit.require('bar');
    unit.require('baz');
    unit.require('util.*');

    function implementation(units) {
        var bar = units.bar,
            baz = units.baz;

        // ...
    }

})(gumup);

(function(ns) {

    var unit = ns.unit('main', implementation);

    unit.require('foo');
    unit.require('*');

    function implementation(units) {
        var foo = units.foo;

        // ...
    }

})(gumup);
