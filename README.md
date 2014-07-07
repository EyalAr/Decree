Declarative arguments-resolver

0. [Overview](#overview)
    0. [Install](#install)
0. [Example](#example)
0. [How to use](#how-to-use)
    0. [Declaration structure](#declaration-structure)
    0. [Errors](#errors)
    0. [Built-in types](#built-in-types)
    0. [Custom types](#custom-types)

## Overview

Decree is a declarative arguments-resolver. It saves you time and code when you
need to do arguments validation and disambiguation in your APIs.

Simply declare the conditions your arguments should hold, such as their types
and default values. Decree will take care of the rest, and provide you with
clean and disambiguated arguments.

If the user provided an illegal combination of arguments, Decree will tell you
where was the problem.

### Install

`npm install decree`

## Example

Let's say you have a function which takes 4 arguments. The task of verifying
the legality of the arguments is oftentimes complicated and cumbersome.

**Without Decree:**

```Javascript
function makeCoffee(sugars, flavor, size, callback){
    // verify arguments:
    //   sugar: optional, non-negative number. default: 1
    //   type: optional, string. default: 'bitter'
    //   size: optional, string or positive integer. default: 'large'
    //   callback: required, function
    // was sugars provided? if not, flavor = sugars? size = flavor? callback = size?
    // but what if flavor was not provided...?
    // what about the callback? maybe callback = size? callback = flavor?
    // ...
    if (/* arguments are valid */){
        // make coffee...
        callback('Coffee is ready!');
    } else {
        throw Error('Invalid arguments!');
    }
}
```

 **With Decree**, arguments disambiguation is easy. You just declare the properties
 of your arguments, and let Decree resolve them for you:

```Javascript
var decree = require('decree');

// argument declarations:
var decs = [{
    name: 'sugars',
    type: 'nn-decimal', // non-negative decimal
    optional: true,
    default: 1
}, {
    name: 'flavor',
    type: 'string',
    optional: true,
    default: 'bitter'
}, {
    name: 'size',
    types: ['string', 'p-int'],
    optional: true,
    default: 'large'
}, {
    name: 'callback',
    type: 'function'
}];

function makeCoffee() {
    decree(decs)(arguments, function(sugars, flavor, size, callback) {
        // arguments are disambiguated and ready to be used.
        // make coffee...
        callback('Coffee is ready!');
    });
};
```

## How to use

Decree needs to know what you expect. Simply build an array to describe your
argument expectations.

```Javascript
// declarations:
var decs = [angle, color, callback];
```

Each item in the array is an object which describes an argument.

- `angle` is required and can only be a number.
- `color` is an optional argument. If not provided, it defaults to `white`. it
  can be a string (`white`, `green`, etc.), an array of RGB values
  `[R, G, B]`, or a hash `{r: R, g: G, b: B}`.
- `callback` is required and can only be a function.
 
 Tell it to Decree:

```Javascript
var decs = [{
    name: 'angle',
    type: 'number'
}, {
    name: 'color',
    types: ['string', 'array', 'hash'],
    optional: true,
    default: 'white'
}, {
    name: 'callback',
    type: 'function'
}]
```

 When finished declaring your expectations, use Decree to resolve your
 function's arguments:

```Javascript
var decree = require('decree');
var decs = [ /* ... */ ];

function foo() {
    // pass your function's arguments directly to decree:
    decree(decs)(arguments, function(angle, color, callback) {
        // here you can be sure angle, color and callback are of
        // the correct types and values
    });
}

// use foo as normal:
foo(45, 'green', function() {}); //angle: 45, color: green, callback: a function
foo(45, function() {}); //angle: 45, color: white, callback: a function
foo('green', function() {}); //oops... angle is not provided. error is thrown.
```

### Declaration structure

When declaring an argument, tell Decree:

0. `name {String}`: **Optional**. Will be used to identify the argument in error
   messages.
0. `type {String/Function}` / `types{Array[String/Function]}`: **Required**.
   See [built-in types](#built-in-types) or
   [how to define a custom type](#custom-types).
0. `optional {Boolean}`: **Optional**. Is this argument optional?
   Defaults to `false`.
0. `default`: **Optional**. If the argument is optional, this default value will
   be assigned if no value is provided.

```Javascript
{
    name: ...,
    types: [ ... ],
    optional: ...,
    default: ...
}
```

### Errors

When there is a problem with the arguments Decree can provide a detailed
explanation of what went wrong. By default, an error object will be thrown,
unless you provide a second callback which is called with the error.

```Javascript
var decree = require('decree');
var decs = [ /* ... */ ];

function foo() {
    // pass your function's arguments directly to decree:
    decree(decs)(arguments, function(angle, color, callback) {
        // here you can be sure angle, color and callback are of
        // the correct types and values
    }, function(err) {
        // if here, there was a problem with the arguments the user passed
        // 'err' contains the information you need
    });
}
```

### Built-in types

Decree supports several argument types:

- `*`: Argument matches any type.
- `array`
- `function`
- `hash`: Argument is a simple key-value object.
- `string`
- `number`
- `n-number`: Argument is a negative number
- `p-number`: Argument is a positive number
- `nn-number`: Argument is a non-negative number
- `np-number`: Argument is a non-positive number
- `int`: Argument is an integer
- `n-int`: Argument is a negative integer
- `p-int`: Argument is a positive integer
- `nn-int`: Argument is a non-negative integer
- `np-int`: Argument is a non-positive integer
- `decimal`: Argument is a decimal number
- `n-decimal`: Argument is a negative decimal number
- `p-decimal`: Argument is a positive decimal number
- `nn-decimal`: Argument is a non-negative decimal number
- `np-decimal`: Argument is a non-positive decimal number

### Custom types

Coming soon
