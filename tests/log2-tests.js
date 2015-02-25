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
        it("log2(2^n) = n for n -1074 <= n <= 1023",
           function () {
               // Carefully construct the values for 2^k for -1074 <= k
               // <= -1023.  Don't won't to depend on Math.pow to
               // produce corectly rounded values.
               var n = -1074;
               // This loop covers n from -1074 to -1043
               for (var lowbits = 1; lowbits <= 0x80000000;  lowbits *= 2) {
                   var x = _ConstructDouble(0, lowbits);
                   var y = log2(x);
                   expect(y).toBe(y, n);
                   n += 1;
               }
               // This loop covers n from -1042 to -1023
               for (var hibits = 1; hibits <= 0x80000; hibits *= 2) {
                   var x = _ConstructDouble(hibits, 0);
                   var y = log2(x);
                   expect(y).toBe(y, n);
                   n += 1;
               }
               // The rest of the normal values of 2^n
               for (var n = -1022; n <= 1023; ++n) {
                   var x = Math.pow(2, n);
                   var y = log2(x);
                   expect(y).toBe(n);
               }
           });
    });

describe(
    "Test special values",
    function () {
        // The expected values were computed in extended precision
        // (fpprec = 64) via maxima and then rounded to float. I also
        // compared the actual bits in the extended representation and
        // the float result and verified that the rounded result is,
        // in fact, correctly rounded.
        it("log2(sqrt(2)) = 0.5000000000000001",
           function () {
               var x = Math.SQRT2;
               var y = log2(x);
               // Expected value isn't exactly 1/2 because Math.SQRT2
               // isn't exactly sqrt(2).
               expect(y).toBe(0.5000000000000001e0);
           });
        it("log2(1/sqrt(2)) = -0.4999999999999999",
           function () {
               var x = Math.SQRT1_2;
               var y = log2(x);
               // Expected value isn't exactly -1/2 because Math.SQRT1_2
               // isn't exactly sqrt(1/2).
               expect(y).toBe(-0.4999999999999999e0);
           });
        it("log2(10) = 3.321928094887362",
           function () {
               var y = log2(10);
               expect(y).toBe(3.321928094887362);
           });
        it("log2(100) = 6.643856189774724",
           function () {
               var y = log2(100);
               expect(y).toBe(6.643856189774724);
           });
    });
               
describe(
    "Test relationships",
    function () {
        it("|log2(1/x) + log2(x)| <= 1.5e-14, x = 1.1^k, 0 <= k < 1000",
           function () {
               var x = 1;
               for (var k = 0; k < 1000; ++k) {
                   var y = Math.abs(log2(x) + log2(1/x));
                   expect(y).toBeLessThan(1.5e-14);
                   x *= 1.1;
               }
           });
        it("|log2(x) - log(x)/log(2)| < 1e-15, x = 1.1^k, 0 <= k < 1000 ",
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
