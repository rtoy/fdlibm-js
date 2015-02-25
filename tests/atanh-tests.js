describe(
    "Tests for atanh for exceptional values",
    function () {
        it("atanh(1) = Infinity",
           function () {
               var y = atanh(1);
               expect(y).toBe(Infinity);
           });
        it("atanh(-1) = -Infinity",
           function () {
               var y = atanh(-1);
               expect(y).toBe(-Infinity);
           });
        it("atanh(+0) = +0",
           function () {
               var x = 1/Infinity;
               var y = atanh(x);
               expect(y).toBe(x);
           });
        it("atanh(-0) = -0",
           function () {
               var x = -1/Infinity;
               var y = atanh(x);
               expect(y).toBe(x);
           });
        it("atanh(2) = NaN",
           function () {
               var y = atanh(2);
               expect(y).toBeNaN();
           });
        it("atanh(-2) = NaN",
           function () {
               var y = atanh(2);
               expect(y).toBeNaN();
           });
        it("atanh(NaN) = NaN",
           function () {
               var x = Infinity - Infinity;
               var y = atanh(x);
               expect(y).toBeNaN();
           });
    });

describe(
    "Test basic atanh functionality",
    function () {
        it("atanh(x) = x, for |x| < 2^-28, x = 2^-29",
           function () {
               var x = Math.pow(2,-29);
               var y = atanh(x);
               expect(y).toBe(x);
           });
        it("atanh(x) = x, for |x| < 2^-28, x = -2^-29",
           function () {
               var x = -Math.pow(2,-29);
               var y = atanh(x);
               expect(y).toBe(x);
           });
        it("atanh(0.25) = log(5/3)/2, |x| < 0.5",
           function () {
               var y = atanh(0.25);
               expect(y).toBe(0.25541281188299536e0);
           });
        it("atanh(-0.25) = log(3/5)/2, |x| < 0.5",
           function () {
               var y = atanh(-0.25);
               expect(y).toBe(-0.25541281188299536e0);
           });
        it("atanh(0.75) = log(7)/2, 0.5 < |x| < 1",
           function () {
               var y = atanh(0.75);
               expect(y).toBe(0.9729550745276566e0);
           });
        it("atanh(-0.75) = -log(7)/2, 0.5 < |x| < 1",
           function () {
               var y = atanh(-0.75);
               expect(y).toBe(-0.9729550745276566e0);
           });
    });
