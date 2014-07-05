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
        callback('Coffee is ready! size ' + size + ', ' + sugars + ' sugars, ' + flavor);
    }, function(err) {
        // arguments error
        throw Error('Invalid arguments!');
    });
};
```
