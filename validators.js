'use strict';

module.exports = {
    '*': function() {
        return true;
    },
    'array': function(o) {
        return o instanceof Array;
    },
    'function': function(o) {
        return typeof o === 'function';
    },
    'hash': function(o) {
        return Object.prototype.toString.call(o) === '[object Object]';
    },
    'string': function(o) {
        return Object.prototype.toString.call(o) === '[object String]';
    },
    'number': function(o) {
        return !(o === null || isNaN(o));
    },
    'p-number': function(o) {
        return validators['number'](o) && o > 0;
    },
    'n-number': function(o) {
        return validators['number'](o) && o < 0;
    },
    'nn-number': function(o) {
        return validators['number'](o) && o >= 0;
    },
    'np-number': function(o) {
        return validators['number'](o) && o <= 0;
    },
    'int': function(o) {
        return o == parseInt(o);
    },
    'n-int': function(o) {
        return o == parseInt(o) && o < 0;
    },
    'p-int': function(o) {
        return o == parseInt(o) && o > 0;
    },
    'nn-int': function(o) {
        return o == parseInt(o) && o >= 0;
    },
    'np-int': function(o) {
        return o == parseInt(o) && o <= 0;
    }
};
