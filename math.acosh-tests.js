describe(
    "Tests for Math.acosh for exceptional values",
    function () {
        it("Math.acosh(Infinity) = Infinity",
           function () {
               var y = Math.acosh(Infinity);
               expect(y).toBe(Infinity);
           });
        it("Math.acosh(-Infinity) = NaN",
           function () {
               var y = Math.acosh(-Infinity);
               expect(y).toBeNaN();
           });
        it("Math.acosh(NaN) = NaN",
           function () {
               var x = Infinity - Infinity;
               var y = Math.acosh(x);
               expect(y).toBeNaN();
           });
        it("Math.acosh(.9) = NaN",
           function () {
               var y = Math.acosh(.9);
               expect(y).toBeNaN();
           });
    });

describe(
    "Test basic Math.acosh functionality",
    function () {
        it("Math.acosh(1) = 0",
           function () {
               var y = Math.acosh(1);
               expect(y).toBe(0);
           });
        it("Math.acosh(1.5) = log((sqrt(5)+3)/2), case 1 < x < 2",
           function () {
               var y = Math.acosh(1.5);
               expect(y).toBe(0.9624236501192069e0);
           });
        it("Math.acosh(4) = log(sqrt(15)+4), case 2 < x < 2^28",
           function () {
               var y = Math.acosh(4);
               expect(y).toBe(2.0634370688955608e0);
           });
        it("Math.acosh(2^50), case 2^28 < x",
           function () {
               var x = Math.pow(2,50);
               var y = Math.acosh(x);
               expect(y).toBe(35.35050620855721e0);
           });
        it("Math.acosh(most-positive-float), no overflow",
           function () {
               var x = 1.7976931348623157e308;
               var y = Math.acosh(x);
               expect(y).toBe(710.4758600739439e0);
           });
    });


