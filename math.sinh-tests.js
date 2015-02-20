describe(
    "Tests of Math.sinh for exceptional values",
    function () {
        it("Math.sinh(+0) = +0",
           function () {
               var y = Math.sinh(0);
               expect(y).toBe(0);
           });
        it("Math.sinh(-0) = -0",
           function () {
               var x = -1/Infinity;
               var y = Math.sinh(x);
               expect(y).toBe(x);
           });

        it("Math.sinh(Infinity) = Infinity",
           function () {
               var y = Math.sinh(Infinity);
               expect(y).toBe(Infinity);
           });
        it("Math.sinh(-Infinity = -Infinity",
           function () {
               var y = Math.sinh(-Infinity);
               expect(y).toBe(-Infinity);
           });
        it("Math.sinh(NaN) = NaN",
           function () {
           var y = Math.sinh(Infinity - Infinity);
           expect(y).toBeNaN();
           });
    });

describe(
    "Tests Math.sinh basic functionality",
    function () {
        it("Math.sinh(2^-29) = 2^-29, case |x| < 2^-28",
           function () {
               var x = Math.pow(2,-29);
               var y = Math.sinh(x);
               expect(y).toBe(x);
           });
        it("Math.sinh(-2^-29) = -2^-29, case |x| < 2^-28",
           function () {
               var x = -Math.pow(2,-29);
               var y = Math.sinh(x);
               expect(y).toBe(x);
           });
        it("Math.sinh(0.5), case |x| < 1",
           function () {
               var y = Math.sinh(0.5);
               expect(y).toBe(0.5210953054937474e0);
           });
        it("Math.sinh(-0.5), case |x| < 1",
           function () {
               var y = Math.sinh(-0.5);
               expect(y).toBe(-0.5210953054937474e0);
           });
        it("Math.sinh(10*log(2)) = 1048575/2048, case |x| < 22",
           function () {
               var y = Math.sinh(10*Math.LN2);
               expect(y).toBe(1048575/2048);
           });
        it("Math.sinh(-10*log(2)) = -1048575/2048, case |x| < 22",
           function () {
               var y = Math.sinh(-10*Math.LN2);
               expect(y).toBe(-1048575/2048);
           });
        it("Math.sinh(10), case |x| < 22",
           function () {
               var y = Math.sinh(10);
               expect(y).toBe(11013.232874703393e0);
           });
        it("Math.sinh(-10), case |x| < 22",
           function () {
               var y = Math.sinh(-10);
               expect(y).toBe(-11013.232874703393e0);
           });
        it("Math.sinh(32*Math.LN2), case |x| in [22, log(maxdouble)]",
           function () {
               var y = Math.sinh(32*Math.LN2);
               expect(y).toBe(2.1474836479999983e9);
           });
        it("Math.sinh(-32*Math.LN2), case |x| in [22, log(maxdouble)]",
           function () {
               var y = Math.sinh(-32*Math.LN2);
               expect(y).toBe(-2.1474836479999983e9);
           });
        it("Math.sinh(100), case |x| in [22, log(maxdouble)]",
           function () {
               var y = Math.sinh(100);
               expect(y).toBe(1.3440585709080678e43);
           });
        it("Math.sinh(-100), case |x| in [22, log(maxdouble)]",
           function () {
               var y = Math.sinh(-100);
               expect(y).toBe(-1.3440585709080678e43);
           });
        it("Math.sinh(710.4758600739439), no overflow, case |x| in [log(maxdouble), ovfthreshold]",
           function () {
               var x = 710.4758600739439;
               var y = Math.sinh(x);
               expect(y).toBe(1.7976931348621744e308);
           });
        it("Math.sinh(-710.4758600739439), no overflow, case |x| in [log(maxdouble), ovfthreshold]",
           function () {
               var x = -710.4758600739439;
               var y = Math.sinh(x);
               expect(y).toBe(-1.7976931348621744e308);
           });
        it("Math.sinh(710.475860073944), overflow, case |x| > ovfthreshold]",
           function () {
               var x = 710.475860073944;
               var y = Math.sinh(x);
               expect(y).toBe(Infinity);
           });
        it("Math.sinh(-710.475860073944), overflow, case |x| > ovfthreshold]",
           function () {
               var x = -710.475860073944;
               var y = Math.sinh(x);
               expect(y).toBe(-Infinity);
           });
        it("Math.sinh(1000) = Infinity, case |x| > ovfthreshold",
           function () {
               var y = Math.sinh(1000);
               expect(y).toBe(Infinity);
           });
        it("Math.sinh(-1000) = -Infinity, case |x| > ovfthreshold",
           function () {
               var y = Math.sinh(-1000);
               expect(y).toBe(-Infinity);
           });
    });
