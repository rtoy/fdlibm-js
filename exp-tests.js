describe(
    "Tests of exp for exceptional values",
    function () {
        it("exp(Infinity) = Infinity",
           function () {
               var y = exp(Infinity);
               expect(y).toBe(Infinity);
           });
        it("exp(-Infinity) = 0",
           function() {
               var y = exp(-Infinity);
               // Check for +0
               expect(1/y).toBe(Infinity);
           });
        it("exp(NaN) = NaN",
           function () {
               var x = Infinity - Infinity;
               var y = exp(x);
               expect(y).toBeNaN();
           });
    });

describe(
    "Tests exp basic functionality",
    function () {
        it("exp(709.7822265625e0), no overflow",
           function () {
               var x = _ConstructDouble(0x40862e42, 0);
               var y = exp(x);
               expect(y).toBe(1.7968190737295725e308);
           });
        it("exp(-709.7822265625e0), no underflow",
           function () {
               var x = -_ConstructDouble(0x40862e42, 0);
               var y = exp(x);
               // The expected value is 5.565382338080107e-309, but V8
               // apparently doesn't quite read this value correctly.
               // Explicitly construct the number.
               //expect(y).toBe(_ConstructDouble(262271, 2232219626));
               expect(y).toBe(_ConstructDouble(262271, 2232219626));
           });
        it("exp(7.09782712893383973096e+02), no overflow",
           function () {
               var x = 7.09782712893383973096e+02;
               var y = exp(x);
               expect(y).toBe(1.7976931348622732e308);
           });
        it("exp(-7.45133219101941108420e+02), no underflow",
           function () {
               var x = -7.45133219101941108420e+02;
               var y = exp(x);
               expect(y).toBe(4.9406564584124654e-324);
           });
        it("exp(709.7827128933841e0), overflow",
           function () {
               var x = _ConstructDouble(0x40862E42, 0xFEFA39EF+1);
               var y = exp(x);
               expect(y).toBe(Infinity);
           });
        it("exp(-7.45133219101941108420e+02), underflow",
           function () {
               var x = _ConstructDouble(0xc0874910, 0xD52D3051+1);
               var y = exp(x);
               expect(y).toBe(0);
           });
        it("exp(2^-29) = 1 + 2^-29, case |x| < 2^-28",
           function () {
               var x = Math.pow(2,-29);
               var y = exp(x);
               expect(y).toBe(1+x);
           });
        it("exp(-2^-29) = 1 - 2^-29, case |x| < 2^-28",
           function () {
               var x = -Math.pow(2,-29);
               var y = exp(x);
               expect(y).toBe(1+x);
           });
        it("exp(0.5), case 0.5*log(2) < |x| < 1.5*log(2)",
           function () {
               y = exp(0.5);
               expect(y).toBe(1.6487212707001282e0);
           });
        it("exp(-0.5), case 0.5*log(2) < |x| < 1.5*log(2)",
           function () {
               y = exp(-0.5);
               expect(y).toBe(0.6065306597126334e0);
           });
        it("exp(2), case |x| > 1.5*log(2)",
           function () {
               y = exp(2);
               expect(y).toBe(7.38905609893065e0);
           });
        it("exp(-2), case |x| > 1.5*log(2)",
           function () {
               y = exp(-2);
               expect(y).toBe(0.1353352832366127e0);
           });
        it("exp(2^-1022), case k < -1021",
           function () {
               var x = Math.pow(2,-1022);
               var y = exp(x);
               expect(y).toBe(1);
           });
        it("exp(2^-1021), case k >= -1021",
           function () {
               var x = Math.pow(2,-1021);
               var y = exp(x);
               expect(y).toBe(1);
           });
        it("exp(7.09782712893383973096e+02), no overflow",
           function () {
               var y = exp(7.09782712893383973096e+02);
               expect(y).toBe(1.7976931348622732e308);
           });
        it("exp(709.7827128933841d0), overflows",
           function () {
               // This constant is 1 bit more tha o_threshold: 
               var x = _ConstructDouble(0x40862E42, 1+0xFEFA39EF);
               var y = exp(x);
               expect(y).toBe(Infinity);
           });
        it("exp(-7.45133219101941108420e+02), no underflow",
           function () {
               var x = -7.45133219101941108420e+02;
               var y = exp(x);
               expect(y).toBe(4.9406564584124654e-324);
           });
        it("exp(-745.1332191019412), underflows",
           function () {
               var x = _ConstructDouble(0xc0874910, 0xD52D3051+1);
               var y = exp(x);
               expect(y).toBe(0);
           });
        it("exp(1000) = Infinity, overflow case",
           function () {
               var y = exp(1000);
               expect(y).toBe(Infinity);
           });
        it("exp(-1000) = 0, underflow case",
           function () {
               var y = exp(-1000);
               expect(y).toBe(0);
           });
    });

describe(
    "Test that exp(x) is still monotonic near x = 1",
    // Our implementation of exp(x) added a special case for x = 1 so
    // that exp(1) = Math.E. Without that, exp(1) was different from
    // Math.E, which is bad.
    //
    // The following tests verify that exp(x) is still monotonic at x
    // = 1. This is a very important to maintain in floating point.
    function () {
        it("exp(1) = Math.E",
           function () {
               var y = exp(1);
               expect(y).toBe(Math.E);
           });
        it("exp(1-negeps) <= Math.E",
           function () {
               // negeps is the smallest value for x such that 1 - x differs from 1.
               var negeps = _ConstructDouble(0x3c900000,1);
               var y = exp(1-negeps);
               var compare = y <= Math.E;
               expect(compare).toBe(true);
           });
        it("Math.E <= exp(1+eps)",
           function () {
               // eps is the smallest value for x such that 1 + x differs from 1.
               var eps = _ConstructDouble(0x3CA00000,1);
               var y = exp(1+eps);
               var compare = Math.E <= y;
               expect(compare).toBe(true);
           });
    });
