describe(
    "Tests of Math.tanh for exceptional values",
    function () {
        it("Math.tanh(Infinity) = 1",
           function () {
               var y = Math.tanh(Infinity);
               expect(y).toBe(1);
           });
        it("Math.tanh(-Infinity) = -1",
           function () {
               var y = Math.tanh(-Infinity);
               expect(y).toBe(-1);
           });
        it("Math.tanh(NaN) = NaN",
           function () {
               var y = Math.tanh(Infinity - Infinity);
               expect(y).toBeNaN();
           });
    });

describe(
    "Tests Math.tanh basic functionality",
    function () {
        it("Math.tanh(2^-56) = 2^-56, case |x| < 2^-55",
           function () {
               var x = Math.pow(2,-56);
               var y = Math.tanh(x);
               expect(y).toBe(x);
           });
        it("Math.tanh(-2^-56) = -2^-56, case |x| < 2^-55",
           function () {
               var x = -Math.pow(2,-56);
               var y = Math.tanh(x);
               expect(y).toBe(x);
           });
        it("Math.tanh(log(2)) = 3/5, case |x| < 1",
           function () {
               var y = Math.tanh(Math.LN2);
               expect(y).toBe(0.6);
           });
        it("Math.tanh(-log(2)) = -3/5, case |x| < 1",
           function () {
               var y = Math.tanh(-Math.LN2);
               expect(y).toBe(-3/5);
           });
        it("Math.tanh(2*log(2)) = 15/17, case |x| < 22, with |x| > 1",
           function () {
               var y = Math.tanh(2*Math.LN2);
               expect(y).toBe(15/17);
           });
        it("Math.tanh(-2*log(2)) = -15/17, case |x| < 22, with |x| > 1",
           function () {
               var y = Math.tanh(-2*Math.LN2);
               expect(y).toBe(-15/17);
           });
        it("Math.tanh(100) = 1, case |x| > 22",
           function () {
               var y = Math.tanh(100);
               expect(y).toBe(1);
           });
        it("Math.tanh(-100) = -1, case |x| > 22",
           function () {
               var y = Math.tanh(-100);
               expect(y).toBe(-1);
           });
        it("Math.tanh(1e300) = 1, no overflow",
           function () {
               var y = Math.tanh(1e300);
               expect(y).toBe(1);
           });
        it("Math.tanh(-1e300) = -1, no overflow",
           function () {
               var y = Math.tanh(-1e300);
               expect(y).toBe(-1);
           });
    });
