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
