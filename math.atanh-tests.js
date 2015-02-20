describe(
    "Tests for Math.atanh for exceptional values",
    function () {
        it("Math.atanh(1) = Infinity",
           function () {
               var y = Math.atanh(1);
               expect(y).toBe(Infinity);
           });
        it("Math.atanh(-1) = -Infinity",
           function () {
               var y = Math.atanh(-1);
               expect(y).toBe(-Infinity);
           });
        it("Math.atanh(+0) = +0",
           function () {
               var x = 1/Infinity;
               var y = Math.atanh(x);
               expect(y).toBe(x);
           });
        it("Math.atanh(-0) = -0",
           function () {
               var x = -1/Infinity;
               var y = Math.atanh(x);
               expect(y).toBe(x);
           });
        it("Math.atanh(2) = NaN",
           function () {
               var y = Math.atanh(2);
               expect(y).toBeNaN();
           });
        it("Math.atanh(-2) = NaN",
           function () {
               var y = Math.atanh(2);
               expect(y).toBeNaN();
           });
        it("Math.atanh(NaN) = NaN",
           function () {
               var x = Infinity - Infinity;
               var y = Math.atanh(x);
               expect(y).toBeNaN();
           });
    });

describe(
    "Test basic Math.atanh functionality",
    function () {
        it("Math.atanh(x) = x, for |x| < 2^-28, x = 2^-29",
           function () {
               var x = Math.pow(2,-29);
               var y = Math.atanh(x);
               expect(y).toBe(x);
           });
        it("Math.atanh(x) = x, for |x| < 2^-28, x = -2^-29",
           function () {
               var x = -Math.pow(2,-29);
               var y = Math.atanh(x);
               expect(y).toBe(x);
           });
        it("Math.atanh(0.25) = log(5/3)/2, |x| < 0.5",
           function () {
               var y = Math.atanh(0.25);
               expect(y).toBe(0.25541281188299536e0);
           });
        it("Math.atanh(-0.25) = log(3/5)/2, |x| < 0.5",
           function () {
               var y = Math.atanh(-0.25);
               expect(y).toBe(-0.25541281188299536e0);
           });
        it("Math.atanh(0.75) = log(7)/2, 0.5 < |x| < 1",
           function () {
               var y = Math.atanh(0.75);
               expect(y).toBe(0.9729550745276566e0);
           });
        it("Math.atanh(-0.75) = -log(7)/2, 0.5 < |x| < 1",
           function () {
               var y = Math.atanh(-0.75);
               expect(y).toBe(-0.9729550745276566e0);
           });
    });
