Let's say you have a function which takes 4 arguments. The task of verifying
the legality of the arguments is oftentimes complicated and cumbersome:

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

 With Decree, arguments disambiguation is easy. You just declare the properties
 of your arguments, and let Decree resolve them for you:

 ```Javascript
var decree = require('decree');

// argument declarations:
var decs = [{
    type: 'nn-decimal', // non-negative decimal
    optional: true,
    default: 1
}, {
    type: 'string',
    optional: true,
    default: 'bitter'
}, {
    types: ['string', 'p-int'],
    optional: true,
    default: 'large'
}, {
    type: 'function'
}];

function makeCoffee() {
    decree(decs)(arguments, function(sugars, flavor, size, callback) {
        // arguments are disambiguated and ready to be used.
        // make coffee...
        callback('Coffee is ready! size ' + size + ', ' + sugars + ' sugars, ' + flavor);
    }, function(err) {
        // arguments error
        throw Error('Invalid arguments!');
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

Each item in the array is an object which describes an argument. `color` for
example, is an optional argument. If not provided, it defaults to `white`. it
can be a string (`white`, `green`, etc.), an array of RGB values
`[255, 255, 255]`, or a hash `{r: 255, g: 255, b: 255}`.
 
 Tell it to Decree:

 ```Javascript
 // color is:
{
    types: ['string', 'array', 'hash'],
    optional: true,
    default: 'white'
}
 ```

 When finished declaring your expectations, use Decree to resolve your
 function's arguments:

 ```Javascript
var decree = require('decree');
var decs = [/* ... */];
function foo(){
    // pass your function's arguments directly to decree:
    decree(decs)(arguments, function(angle, color, callback){});
}
 ```
