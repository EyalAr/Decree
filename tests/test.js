var should = require("should"),
    decree = require('../');

describe('one type per argument', function() {

    describe('3 args, none is optional', function() {

        var decs = [{
            type: 'string'
        }, {
            type: 'number'
        }, {
            type: 'hash'
        }];

        describe('function called with legal arguments', function() {
            function test() {
                decree(decs)(arguments, function(a1, a2, a3) {
                    a1.should.be.a.String;
                    a2.should.be.a.Number;
                    a3.should.be.an.Object;
                });
            }
            it('should not throw an error', function() {
                test.bind(null, 'hello', 1, {
                    a: 'b'
                }).should.not.throwError();
            });
        });

        describe('function called with illegal arguments', function() {
            function test() {
                decree(decs)(arguments, function(a1, a2, a3) {});
            }
            describe('illegal first argument', function() {
                it('should throw an error', function() {
                    test.bind(null, 1, 1, {
                        a: 'b'
                    }).should.throwError();
                });
            });
            describe('illegal second argument', function() {
                it('should throw an error', function() {
                    test.bind(null, 'hello', 'world', {
                        a: 'b'
                    }).should.throwError();
                });
            });
            describe('illegal third argument', function() {
                it('should throw an error', function() {
                    test.bind(null, 'hello', 1, 1).should.throwError();
                });
            });
            describe('missing first argument', function() {
                it('should throw an error', function() {
                    test.bind(null, 1, {
                        a: 'b'
                    }).should.throwError();
                });
            });
            describe('missing second argument', function() {
                it('should throw an error', function() {
                    test.bind(null, 'hello', {
                        a: 'b'
                    }).should.throwError();
                });
            });
            describe('missing third argument', function() {
                it('should throw an error', function() {
                    test.bind(null, 'hello', 1).should.throwError();
                });
            });
            describe('no arguments', function() {
                it('should throw an error', function() {
                    test.bind(null).should.throwError();
                });
            });
        });

    }); // none is optional

    describe('3 args, first and third are optional', function() {

        var decs = [{
            type: 'string',
            optional: true,
            default: 'hello'
        }, {
            type: 'number'
        }, {
            type: 'hash',
            optional: true,
            default: {
                a: 'b'
            }
        }];

        describe('function called with legal arguments', function() {
            function test() {
                decree(decs)(arguments, function(a1, a2, a3) {
                    a1.should.be.a.String;
                    a2.should.be.a.Number;
                    a3.should.be.an.Object;
                });
            }
            describe('all arguments provided', function() {
                it('should not throw an error', function() {
                    test.bind(null, 'hello', 1, {
                        a: 'b'
                    }).should.not.throwError();
                });
            });
            describe('first argument missing', function() {
                it('should not throw an error', function() {
                    test.bind(null, 1, {
                        a: 'b'
                    }).should.not.throwError();
                });
            });
            describe('third argument missing', function() {
                it('should not throw an error', function() {
                    test.bind(null, 'world', 1).should.not.throwError();

                    function test() {
                        decree(decs)(arguments, function(a1, a2, a3) {
                            a1.should.be.a.String;
                            a2.should.be.a.Number;
                            a3.should.be.an.Object;
                            a3.a = 'c';
                        });
                        decree(decs)(arguments, function(a1, a2, a3) {
                            // the assignment a3.a = 'c' from before should have
                            // no effect here.
                            a3.a.should.be.equal('b');
                        });
                    }
                });
            });
            describe('first and third arguments missing', function() {
                it('should not throw an error', function() {
                    test.bind(null, 1).should.not.throwError();
                });
            });
        });

        describe('function called with illegal arguments', function() {
            function test() {
                decree(decs)(arguments, function(a1, a2, a3) {});
            }
            describe('first argument illegal', function() {
                it('should throw an error', function() {
                    test.bind(null, 1, 1, {
                        a: 'b'
                    }).should.throwError();
                });
            });
            describe('third argument illegal', function() {
                it('should throw an error', function() {
                    test.bind(null, 'hello', 1, 1).should.throwError();
                });
            });
            describe('second argument missing', function() {
                it('should throw an error', function() {
                    test.bind(null, 'hello', {
                        a: 'b'
                    }).should.throwError();
                });
            });
        });

    }); // first and third are optional

}); // one type per argument

describe('multiple types per argument', function() {

    describe('3 args, none is optional', function() {

        var decs = [{
            types: ['string', 'hash']
        }, {
            types: ['array', 'hash']
        }, {
            types: ['string', 'function', 'number']
        }];

        describe('function called with legal arguments', function() {
            function test() {
                decree(decs)(arguments, function(a1, a2, a3) {
                    //a1 should be a string or a hash:
                    if (!(Object.prototype.toString.call(a1) === '[object Object]' ||
                        Object.prototype.toString.call(a1) === '[object String]'))
                        throw "a1 incorrect type";
                    //a2 should be a hash or an array:
                    if (!(Object.prototype.toString.call(a2) === '[object Object]' ||
                        a2 instanceof Array))
                        throw "a2 incorrect type";
                    //a3 should be a Number, a string or a function:
                    if (!(a3 == Number(a3) ||
                        typeof a3 === 'function' ||
                        Object.prototype.toString.call(a3) === '[object String]'))
                        throw "a3 incorrect type";
                });
            }
            it('should not throw an error', function() {
                test.bind(null, 'hello', [1, 2, 3], 'world').should.not.throwError();
                test.bind(null, 'hello', [1, 2, 3], function() {}).should.not.throwError();
                test.bind(null, 'hello', [1, 2, 3], 1).should.not.throwError();
                test.bind(null, {
                    a: 'b'
                }, [1, 2, 3], 'world').should.not.throwError();
                test.bind(null, {
                    a: 'b'
                }, [1, 2, 3], function() {}).should.not.throwError();
                test.bind(null, {
                    a: 'b'
                }, [1, 2, 3], 1).should.not.throwError();
                test.bind(null, 'hello', {
                    foo: 'bar'
                }, 'world').should.not.throwError();
                test.bind(null, 'hello', {
                    foo: 'bar'
                }, function() {}).should.not.throwError();
                test.bind(null, 'hello', {
                    foo: 'bar'
                }, 1).should.not.throwError();
                test.bind(null, {
                    a: 'b'
                }, {
                    foo: 'bar'
                }, 'world').should.not.throwError();
                test.bind(null, {
                    a: 'b'
                }, {
                    foo: 'bar'
                }, function() {}).should.not.throwError();
                test.bind(null, {
                    a: 'b'
                }, {
                    foo: 'bar'
                }, 1).should.not.throwError();
            });
        });

        describe('function called with illegal arguments', function() {
            function test() {
                decree(decs)(arguments, function(a1, a2, a3) {});
            }
            describe('illegal first argument', function() {
                it('should throw an error', function() {
                    test.bind(null, 1, [1, 2, 3], 1).should.throwError();
                });
            });
            describe('illegal second argument', function() {
                it('should throw an error', function() {
                    test.bind(null, 'hello', 'world', function() {}).should.throwError();
                });
            });
            describe('illegal third argument', function() {
                it('should throw an error', function() {
                    test.bind(null, 'hello', [1, 2, 3], [1, 2, 3]).should.throwError();
                });
            });
            describe('missing first argument', function() {
                it('should throw an error', function() {
                    test.bind(null, [1, 2, 3], 'hello').should.throwError();
                });
            });
            describe('missing second argument', function() {
                it('should throw an error', function() {
                    test.bind(null, 'hello', -55).should.throwError();
                });
            });
            describe('missing third argument', function() {
                it('should throw an error', function() {
                    test.bind(null, 'hello', [1, 2, 3]).should.throwError();
                });
            });
            describe('no arguments', function() {
                it('should throw an error', function() {
                    test.bind(null).should.throwError();
                });
            });
        });

    }); //none is optional

    describe('3 args, first and second are optional', function() {

        var decs = [{
            types: ['string', 'hash'],
            optional: true,
            default: 'hello'
        }, {
            types: ['array', 'hash'],
            optional: true,
            default: [0, 9, 8]
        }, {
            types: ['string', 'function', 'number']
        }];

        describe('function called with legal arguments', function() {
            function test() {
                decree(decs)(arguments, function(a1, a2, a3) {
                    //a1 should be a string or a hash:
                    if (!(Object.prototype.toString.call(a1) === '[object Object]' ||
                        Object.prototype.toString.call(a1) === '[object String]'))
                        throw "a1 incorrect type";
                    //a2 should be a hash or an array:
                    if (!(Object.prototype.toString.call(a2) === '[object Object]' ||
                        a2 instanceof Array))
                        throw "a2 incorrect type";
                    //a3 should be a Number, a string or a function:
                    if (!(a3 == Number(a3) ||
                        typeof a3 === 'function' ||
                        Object.prototype.toString.call(a3) === '[object String]'))
                        throw "a3 incorrect type";
                });
            }
            it('should not throw an error', function() {
                test.bind(null, {
                    a: 'b'
                }, {
                    a: 'b'
                }, 0.99).should.not.throwError();
                test.bind(null, [1, 2, 3], function() {}).should.not.throwError();
                test.bind(null, 'hello', 1).should.not.throwError();
                test.bind(null, 1).should.not.throwError();
            });
        });

        describe('function called with illegal arguments', function() {
            function test() {
                decree(decs)(arguments, function(a1, a2, a3) {});
            }
            describe('ambiguity between first and second arguments', function() {
                it('should throw an error', function() {
                    test.bind(null, {
                        a: 'b'
                    }, 543).should.throwError();
                });
            });
        });

    }); //first and third are optional

}); // one type per argument
