describe(
    "Tests for asinh for exceptional values",
    function () {
        it("asinh(Infinity) = Infinity",
           function () {
               var y = asinh(Infinity);
               expect(y).toBe(Infinity);
           });
        it("asinh(-Infinity) = -Infinity",
           function () {
               var y = asinh(-Infinity);
               expect(y).toBe(-Infinity);
           });
        it("asinh(NaN) = NaN",
           function () {
               var x = Infinity - Infinity;
               var y = asinh(x);
               expect(y).toBeNaN();
           });
    });

describe(
    "Test basic asinh functionality",
    function () {
        it("asinh(-0) = -0",
           function () {
               var x = 1/(-Infinity);
               var y = 1/asinh(x);
               expect(y).toBe(-Infinity);
           });
        it("asinh(+0) = +0",
           function () {
               var x = 1/(Infinity);
               var y = 1/asinh(x);
               expect(y).toBe(Infinity);
           });
        it("asinh(2^-29) = 2^-29, case |x| < 2^-28, where acosh(x) = x",
           function () {
               var x = Math.pow(2,-29);
               var y = asinh(x);
               expect(y).toBe(x);
           });
        it("asinh(-2^-29) = -2^-29, case |x| < 2^-28, where acosh(x) = x",
           function () {
               var x = -Math.pow(2,-29);
               var y = asinh(x);
               expect(y).toBe(x);
           });
        it("asinh(2^-28), case 2 > |x| >= 2^-28",
           function () {
               var x = Math.pow(2,-28);
               var y = asinh(x);
               expect(y).toBe(3.725290298461914e-9);
           });
        it("asinh(-2^-28), case 2 > |x| >= 2^-28",
           function () {
               var x = -Math.pow(2,-28);
               var y = asinh(x);
               expect(y).toBe(-3.725290298461914e-9);
           });
        it("asinh(1), case 2 > |x| > 2^-28",
           function () {
               var y = asinh(1);
               expect(y).toBe(0.881373587019543e0);
           });
        it("asinh(-1), case 2 > |x| > 2^-28",
           function () {
               var y = asinh(-1);
               expect(y).toBe(-0.881373587019543e0);
           });
        it("asinh(5), case 2^28 > |x| > 2",
           function () {
               var y = asinh(5);
               expect(y).toBe(2.3124383412727525e0);
           });
        it("asinh(-5), case 2^28 > |x| > 2",
           function () {
               var y = asinh(-5);
               expect(y).toBe(-2.3124383412727525e0);
           });
        it("asinh(2^28), case 2^28 > |x|",
           function () {
               var x = Math.pow(2,28);
               var y = asinh(x);
               expect(y).toBe(20.101268236238415e0);
           });
        it("asinh(-2^28), case 2^28 > |x|",
           function () {
               var x = -Math.pow(2,28);
               var y = asinh(x);
               expect(y).toBe(-20.101268236238415e0);
           });
        it("asinh(<most-positive-float>), no overflow",
           function () {
               var x = 1.7976931348623157e308;
               var y = asinh(x);
               expect(y).toBe(710.4758600739439e0);
           });
        it("asinh(-<most-positive-float>), no overflow",
           function () {
               var x = -1.7976931348623157e308;
               var y = asinh(x);
               expect(y).toBe(-710.4758600739439e0);
           });
    });
