describe(
    "Tests of tanh for exceptional values",
    function () {
        it("tanh(Infinity) = 1",
           function () {
               var y = tanh(Infinity);
               expect(y).toBe(1);
           });
        it("tanh(-Infinity) = -1",
           function () {
               var y = tanh(-Infinity);
               expect(y).toBe(-1);
           });
        it("tanh(NaN) = NaN",
           function () {
               var y = tanh(Infinity - Infinity);
               expect(y).toBeNaN();
           });
    });

describe(
    "Tests tanh basic functionality",
    function () {
        it("tanh(2^-56) = 2^-56, case |x| < 2^-55",
           function () {
               var x = Math.pow(2,-56);
               var y = tanh(x);
               expect(y).toBe(x);
           });
        it("tanh(-2^-56) = -2^-56, case |x| < 2^-55",
           function () {
               var x = -Math.pow(2,-56);
               var y = tanh(x);
               expect(y).toBe(x);
           });
        it("tanh(log(2)) = 3/5, case |x| < 1",
           function () {
               var y = tanh(Math.LN2);
               expect(y).toBe(0.6);
           });
        it("tanh(-log(2)) = -3/5, case |x| < 1",
           function () {
               var y = tanh(-Math.LN2);
               expect(y).toBe(-3/5);
           });
        it("tanh(2*log(2)) = 15/17, case |x| < 22, with |x| > 1",
           function () {
               var y = tanh(2*Math.LN2);
               expect(y).toBe(15/17);
           });
        it("tanh(-2*log(2)) = -15/17, case |x| < 22, with |x| > 1",
           function () {
               var y = tanh(-2*Math.LN2);
               expect(y).toBe(-15/17);
           });
        it("tanh(100) = 1, case |x| > 22",
           function () {
               var y = tanh(100);
               expect(y).toBe(1);
           });
        it("tanh(-100) = -1, case |x| > 22",
           function () {
               var y = tanh(-100);
               expect(y).toBe(-1);
           });
        it("tanh(1e300) = 1, no overflow",
           function () {
               var y = tanh(1e300);
               expect(y).toBe(1);
           });
        it("tanh(-1e300) = -1, no overflow",
           function () {
               var y = tanh(-1e300);
               expect(y).toBe(-1);
           });
    });
