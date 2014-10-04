var should = require('should'),
    assert = require('assert'),
    decree = require('../');

describe('judge returns args', function() {

    var decs = [{
        type: 'string'
    }, {
        type: 'number'
    }, {
        type: 'hash'
    }];

    var judge = decree(decs);

    describe('with legal arguments', function() {

        var args = ['hello', 1, {
            a: 'b'
        }];
        it('should be ok', function() {
            args = judge(args);
            args[0].should.be.a.String;
            args[1].should.be.a.Number;
            args[2].should.be.an.Object;
        });

    });

    describe('with illegal arguments', function() {

        var args = [1, 1, {
            a: 'b'
        }];
        it('should throw an error', function() {
            judge.bind(null, args).should.throwError();
        });

    });

});

describe('judge with a callback', function() {

    var decs = [{
        type: 'string'
    }, {
        type: 'number'
    }, {
        type: 'hash'
    }];

    var judge = decree(decs);

    describe('with legal arguments', function() {

        var args = ['hello', 1, {
            a: 'b'
        }];
        it('should be ok', function() {
            args = judge(args, function(a1, a2, a3) {
                a1.should.be.a.String;
                a2.should.be.a.Number;
                a3.should.be.an.Object;
            });
        });

    });

    describe('with illegal arguments', function() {

        var args = [1, 1, {
            a: 'b'
        }];
        it('should throw an error', function() {
            judge.bind(null, args, function(a1, a2, a3) {
                throw "should not be thrown";
            }).should.throwError();
        });

    });

});

describe('judge with an error handling callback', function() {

    var decs = [{
        type: 'string'
    }, {
        type: 'number'
    }, {
        type: 'hash'
    }];

    var judge = decree(decs);

    describe('with legal arguments', function() {

        var args = ['hello', 1, {
            a: 'b'
        }];
        it('should be ok', function() {
            args = judge(args, function(a1, a2, a3) {
                a1.should.be.a.String;
                a2.should.be.a.Number;
                a3.should.be.an.Object;
            }, function(err) {
                throw "should not be thrown";
            });
        });

    });

    describe('with illegal arguments', function() {

        var args = [1, 1, {
            a: 'b'
        }];
        it('should call handler with an error', function() {
            judge.bind(null, args, function(a1, a2, a3) {
                throw "should not be thrown";
            }, function(err) {
                err.should.be.an.Error;
            });
        });

    });

});

describe('arguments with default assignments are modified', function() {

    var decs = [{
        type: 'hash',
        optional: true,
        default: {
            a: 'b'
        }
    }];

    var judge = decree(decs);

    it('should should not affect default value', function() {
        judge([], function(a) {
            a.should.be.an.Object;
            assert(a.a === 'b');
            // modify a (should not modify the default value):
            a.a = 'c';
            assert(a.a === 'c');
        });
        judge([], function(a) {
            a.should.be.an.Object;
            assert(a.a === 'b'); // still 'b'
        });
        assert(decs[0].default.a === 'b');
    });

});

describe('one type per argument', function() {

    describe('3 args, none is optional', function() {

        var decs = [{
            type: 'string'
        }, {
            type: 'number'
        }, {
            type: 'hash'
        }];

        var judge = decree(decs);

        describe('function called with legal arguments', function() {

            var args = ['hello', 1, {
                a: 'b'
            }];
            it('should be ok', function() {
                judge(args, function(a1, a2, a3) {
                    a1.should.be.a.String;
                    a2.should.be.a.Number;
                    a3.should.be.an.Object;
                });
            });

        });

        describe('function called with illegal arguments', function() {

            describe('judge returns args', function() {

                describe('illegal first argument', function() {
                    var args = [1, 1, {
                        a: 'b'
                    }];
                    it('should throw an error', function() {
                        judge.bind(null, args).should.throwError();
                    });
                });

                describe('illegal second argument', function() {
                    var args = ['hello', 'world', {
                        a: 'b'
                    }];
                    it('should throw an error', function() {
                        judge.bind(null, args).should.throwError();
                    });
                });

                describe('illegal third argument', function() {
                    var args = ['hello', 1, 1];
                    it('should throw an error', function() {
                        judge.bind(null, args).should.throwError();
                    });
                });

                describe('missing first argument', function() {
                    var args = [1, {
                        a: 'b'
                    }];
                    it('should throw an error', function() {
                        judge.bind(null, args).should.throwError();
                    });
                });

                describe('missing second argument', function() {
                    var args = ['hello', {
                        a: 'b'
                    }];
                    it('should throw an error', function() {
                        judge.bind(null, args).should.throwError();
                    });
                });

                describe('missing third argument', function() {
                    var args = ['hello', 1];
                    it('should throw an error', function() {
                        judge.bind(null, args).should.throwError();
                    });
                });

                describe('missing all arguments', function() {
                    var args = [];
                    it('should throw an error', function() {
                        judge.bind(null, args).should.throwError();
                    });
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

        var judge = decree(decs);

        describe('function called with legal arguments', function() {

            describe('all arguments provided', function() {

                var args = ['hi', 10, {
                    a: 'c'
                }];
                it('should be ok', function() {
                    judge(args, function(a1, a2, a3) {
                        assert(a1 === 'hi');
                        assert(a2 === 10);
                        a3.should.be.an.Object;
                        assert(a3.a === 'c');
                    });
                });

            });

            describe('first argument missing', function() {

                var args = [10, {
                    a: 'c'
                }];
                it('should be ok', function() {
                    judge(args, function(a1, a2, a3) {
                        assert(a1 === 'hello');
                        assert(a2 === 10);
                        a3.should.be.an.Object;
                        assert(a3.a === 'c');
                    });
                });

            });

            describe('third argument missing', function() {

                var args = ['hi', 1];
                it('should be ok', function() {
                    judge(args, function(a1, a2, a3) {
                        assert(a1 === 'hi');
                        assert(a2 === 1);
                        a3.should.be.an.Object;
                        assert(a3.a === 'b');
                    });
                });

            });

            describe('first and third arguments missing', function() {

                var args = [1];
                it('should be ok', function() {
                    judge(args, function(a1, a2, a3) {
                        assert(a1 === 'hello');
                        assert(a2 === 1);
                        a3.should.be.an.Object;
                        assert(a3.a === 'b');
                    });
                });

            });

        });

        describe('function called with illegal arguments', function() {

            describe('first argument illegal', function() {

                var args = [1, 1, {
                    a: 'c'
                }];
                it('should throw an error', function() {
                    judge.bind(null, args, function(a1, a2, a3) {
                        throw "should not be thrown";
                    }).should.throwError();
                });

            });

            describe('third argument illegal', function() {

                var args = ['hi', 1, 6];
                it('should throw an error', function() {
                    judge.bind(null, args, function(a1, a2, a3) {
                        throw "should not be thrown";
                    }).should.throwError();
                });

            });

            describe('second argument missing', function() {

                var args = ['hi', {
                    a: 'c'
                }];
                it('should throw an error', function() {
                    judge.bind(null, args, function(a1, a2, a3) {
                        throw "should not be thrown";
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
