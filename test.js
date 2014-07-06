var decree = require('./index');

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
    types: ['string', 'p-int'], // either a string or a positive integer
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
        console.log(err);
    });
};

makeCoffee(function(msg) {
    console.log(msg);
});
makeCoffee(5.5, function(msg) {
    console.log(msg);
});
makeCoffee('bitter', 'large', function(msg) {
    console.log(msg);
});
makeCoffee('bitter', 2, function(msg) {
    console.log(msg);
});
makeCoffee(1.5, 'bitter', 'small', function(msg) {
    console.log(msg);
});
makeCoffee(1.5, 'bitter', 3, function(msg) {
    console.log(msg);
});
makeCoffee(2, 2, function(msg) {
    console.log(msg);
});
makeCoffee();
makeCoffee(1, 'bitter');
makeCoffee(2, 'bitter', function(msg) {
    console.log(msg);
});
