/*
 * grunt-gumup
 * https://github.com/amsemy/grunt-gumup
 *
 * Copyright (c) 2014 Amsemy
 * Licensed under the MIT license.
 */

// Regular expressions used to check unit names.
//
//  unitName
//      :   IDENTIFIER ( '.' IDENTIFIER )*
//      ;
//
//  requireName
//      :   unitName ('.' '*')?
//      |   '*'
//      ;
//
//  IDENTIFIER
//      :   ('A'..'Z' | 'a'..'z' | '_' | '$') ('A'..'Z' | 'a'..'z' | '0'..'9' | '_'  | '$')*
//      ;
//
var unitNamePattern = /^(?:[A-Za-z_\$][\w\$]*(?:\.[A-Za-z_\$][\w\$]*)*)$/,
    requireNamePattern = /^(?:[A-Za-z_\$][\w\$]*(?:\.[A-Za-z_\$][\w\$]*)*(?:\.\*)?|\*)$/;

var Gumup = function() {

};

Gumup.prototype.init = function(name) {
};

Gumup.prototype.pick = function(name) {
};

Gumup.prototype.unit = function(name) {
};

module.exports = Gumup;
