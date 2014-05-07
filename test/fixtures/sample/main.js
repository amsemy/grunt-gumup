(function(ns) {

    var unit = ns.unit('main', implementation);

    unit.require('foo');
    unit.require('*');

    function implementation(units) {
        var foo = units.foo;

        // ...
    }

})(gumup);
