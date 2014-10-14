/**
 * @name validators
 * @amd isArray ../../bower_components/lodash-amd/compat/objects/isArray
 * @amd isFunction ../../bower_components/lodash-amd/compat/objects/isFunction
 * @amd isPlainObject ../../bower_components/lodash-amd/compat/objects/isPlainObject
 * @amd isString ../../bower_components/lodash-amd/compat/objects/isString
 * @amd isRegExp ../../bower_components/lodash-amd/compat/objects/isRegExp
 * @amd isBoolean ../../bower_components/lodash-amd/compat/objects/isBoolean
 * @amd isDate ../../bower_components/lodash-amd/compat/objects/isDate
 * @amd isNumber ../../bower_components/lodash-amd/compat/objects/isNumber
 * @cjs isArray lodash-node/compat/objects/isArray
 * @cjs isFunction lodash-node/compat/objects/isFunction
 * @cjs isPlainObject lodash-node/compat/objects/isPlainObject
 * @cjs isString lodash-node/compat/objects/isString
 * @cjs isRegExp lodash-node/compat/objects/isRegExp
 * @cjs isBoolean lodash-node/compat/objects/isBoolean
 * @cjs isDate lodash-node/compat/objects/isDate
 * @cjs isNumber lodash-node/compat/objects/isNumber
 */
function validatorsFactory(
    isArray,
    isFunction,
    isPlainObject,
    isString,
    isRegExp,
    isBoolean,
    isDate,
    isNumber
) {

    var validators = {
        '*': function() {
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

    return validators;

}
