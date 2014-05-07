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
