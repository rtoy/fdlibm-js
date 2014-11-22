describe(
    "Test special cases",
    function () {
        it("log2(x) = NaN for x < 0",
           function () {
               var y = log2(-1);
               expect(y).toBeNaN();
           });
        it("log2(-0) = -Infinity",
           function () {
               var x = 1 / -Infinity;
               var y = log2(x);
               expect(y).toBe(-Infinity);
           });
        it("log2(+0) = -Infinity",
           function () {
               var x = 1 / Infinity;
               var y = log2(x);
               expect(y).toBe(-Infinity);
           });
        it("log2(NaN) = NaN",
           function () {
               var y = log2(NaN);
               expect(y).toBeNaN();
           });
        it("log2(Infinity) = Infinity",
           function () {
               var y = log2(Infinity);
               expect(y).toBe(Infinity);
           });
        it("log2(-Infinity) = NaN",
           function () {
               var y = log2(-Infinity);
               expect(y).toBeNaN();
           });
    });
               
describe(
    "Test integral powers of 2",
    function () {
        it("log2(2^n) = n for n -1022 <= n <= 1022",
           function () {
               for (var n = -1022; n <= 1022; ++n) {
                   var x = Math.pow(2, n);
                   var y = log2(x);
                   expect(y).toBe(n);
               }
           });
    });

describe(
    "Test special values",
    function () {
        it("log2(sqrt(2)) = 1/2",
           function () {
               var x = Math.SQRT2;
               var y = log2(x);
               // Expected value isn't exactly 1/2 because Math.SQRT2
               // isn't exactly sqrt(2).
               expect(y).toBe(0.5000000000000001e0);
           });
        it("log2(1/sqrt(2)) = -1/2",
           function () {
               var x = Math.SQRT1_2;
               var y = log2(x);
               // Expected value isn't exactly -1/2 because Math.SQRT1_2
               // isn't exactly sqrt(1/2).
               expect(y).toBe(-0.4999999999999999e0);
           });
    });
               
describe(
    "Test relationships",
    function () {
        it("log2(1/x) + log2(x) = 0, x = 1.1^k, 0 <= k < 1000",
           function () {
               var x = 1;
               for (var k = 0; k < 1000; ++k) {
                   var y = Math.abs(log2(x) + log2(1/x));
                   expect(y).toBeLessThan(1.5e-14);
                   x *= 1.1;
               }
           });
        it("log2(x) ~= log(x)/log(2)",
           function () {
               var x = Math.pow(2, -100);
               for (var k = 0; k < 1000; ++k) {
                   var y = log2(x);
                   var expected = Math.log(x) / Math.LN2;
                   var err = relerr(y, expected);
                   expect(err).toBeLessThan(1e-15);
                   x *= 1.1;
               }
           });
    });
