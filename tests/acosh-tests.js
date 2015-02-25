describe(
    "Tests for acosh for exceptional values",
    function () {
        it("acosh(Infinity) = Infinity",
           function () {
               var y = acosh(Infinity);
               expect(y).toBe(Infinity);
           });
        it("acosh(-Infinity) = NaN",
           function () {
               var y = acosh(-Infinity);
               expect(y).toBeNaN();
           });
        it("acosh(NaN) = NaN",
           function () {
               var x = Infinity - Infinity;
               var y = acosh(x);
               expect(y).toBeNaN();
           });
        it("acosh(.9) = NaN",
           function () {
               var y = acosh(.9);
               expect(y).toBeNaN();
           });
    });

describe(
    "Test basic acosh functionality",
    function () {
        it("acosh(1) = 0",
           function () {
               var y = acosh(1);
               expect(y).toBe(0);
           });
        it("acosh(1.5) = log((sqrt(5)+3)/2), case 1 < x < 2",
           function () {
               var y = acosh(1.5);
               expect(y).toBe(0.9624236501192069e0);
           });
        it("acosh(4) = log(sqrt(15)+4), case 2 < x < 2^28",
           function () {
               var y = acosh(4);
               expect(y).toBe(2.0634370688955608e0);
           });
        it("acosh(2^50), case 2^28 < x",
           function () {
               var x = Math.pow(2,50);
               var y = acosh(x);
               expect(y).toBe(35.35050620855721e0);
           });
        it("acosh(most-positive-float), no overflow",
           function () {
               var x = 1.7976931348623157e308;
               var y = acosh(x);
               expect(y).toBe(710.4758600739439e0);
           });
    });


