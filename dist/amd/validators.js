define([
    '../../bower_components/lodash-amd/compat/objects/isArray',
    '../../bower_components/lodash-amd/compat/objects/isFunction',
    '../../bower_components/lodash-amd/compat/objects/isPlainObject',
    '../../bower_components/lodash-amd/compat/objects/isString',
    '../../bower_components/lodash-amd/compat/objects/isRegExp',
    '../../bower_components/lodash-amd/compat/objects/isBoolean',
    '../../bower_components/lodash-amd/compat/objects/isDate',
    '../../bower_components/lodash-amd/compat/objects/isNumber'
], function validatorsFactory(isArray, isFunction, isPlainObject, isString, isRegExp, isBoolean, isDate, isNumber) {
    var validators = {
        '*': function () {
            return true;
        },
        'array': isArray,
        'function': isFunction,
        'hash': isPlainObject,
        'string': isString,
        'regexp': isRegExp,
        'date': isDate,
        'boolean': isBoolean,
        'number': isNumber,
        'p-number': function (o) {
            return validators['number'](o) && o > 0;
        },
        'n-number': function (o) {
            return validators['number'](o) && o < 0;
        },
        'nn-number': function (o) {
            return validators['number'](o) && o >= 0;
        },
        'np-number': function (o) {
            return validators['number'](o) && o <= 0;
        },
        'int': function (o) {
            return o == parseInt(o);
        },
        'n-int': function (o) {
            return o == parseInt(o) && o < 0;
        },
        'p-int': function (o) {
            return o == parseInt(o) && o > 0;
        },
        'nn-int': function (o) {
            return o == parseInt(o) && o >= 0;
        },
        'np-int': function (o) {
            return o == parseInt(o) && o <= 0;
        }
    };
    return validators;
});