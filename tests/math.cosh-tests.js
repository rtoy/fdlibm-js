describe(
    "Tests of Math.cosh for exceptional values",
    function () {
        it("Math.cosh(Infinity) = Infinity",
           function () {
               var y = Math.cosh(Infinity);
               expect(y).toBe(Infinity);
           });
        it("Math.cosh(-Infinity) = Infinity",
           function () {
               var y = Math.cosh(-Infinity);
               expect(y).toBe(Infinity);
           });
        it("Math.cosh(NaN) = NaN",
           function () {
               var x = Infinity - Infinity;
               var y = Math.cosh(x);
               expect(y).toBeNaN();
           });
    });

describe(
    "Tests Math.cosh basic functionality",
    function () {
        it("Math.cosh(2^-55) = 1, tiny case",
           function () {
               var x = Math.pow(2,-55);
               var y = Math.cosh(x);
               expect(y).toBe(1);
           });
        it("Math.cosh(-2^-55) = 1, tiny case",
           function () {
               var x = -Math.pow(2,-55);
               var y = Math.cosh(x);
               expect(y).toBe(1);
           });
        it("Math.cosh(Math.LN2/4) = (sqrt(2)+1)/2^(5/4), case |x| < 1/2*log(2)",
           function () {
               var x = Math.LN2/4;
               var y = Math.cosh(x);
               expect(y).toBe(1.0150517651282178e0);
           });
        it("Math.cosh(-Math.LN2/4) = (sqrt(2)+1)/2^(5/4), case |x| < 1/2*log(2)",
           function () {
               var x = -Math.LN2/4;
               var y = Math.cosh(x);
               expect(y).toBe(1.0150517651282178e0);
           });
        it("Math.cosh(10*Math.LN2) = 1048577/2048, case 1/2*log(2) < |x| < 22",
           function () {
               var x = 10*Math.LN2;
               var y = Math.cosh(x);
               expect(y).toBe(512.00048828125e0);
           });
        it("Math.cosh(-10*Math.LN2) = 1048577/2048, case 1/2*log(2) < |x| < 22",
           function () {
               var x = -10*Math.LN2;
               var y = Math.cosh(x);
               expect(y).toBe(512.00048828125e0);
           });
        it("Math.cosh(32*Math.LN2), case 22 <= |x| < log(maxdouble)",
           function () {
               var x = 32*Math.LN2;
               var y = Math.cosh(x);
               expect(y).toBe(2.1474836479999983e9);
           });
        it("Math.cosh(-32*Math.LN2), case 22 <= |x| < log(maxdouble)",
           function () {
               var x = -32*Math.LN2;
               var y = Math.cosh(x);
               expect(y).toBe(2.1474836479999983e9);
           });
        it("Math.cosh(710.4758600739439), case log(maxdouble) <= |x| <= overflowthreshold",
           function () {
               var y = Math.cosh(710.4758600739439e0);
               expect(y).toBe(1.7976931348621744e308);
           });
        it("Math.cosh(-710.4758600739439), case log(maxdouble) <= |x| <= overflowthreshold",
           function () {
               var y = Math.cosh(-710.4758600739439e0);
               expect(y).toBe(1.7976931348621744e308);
           });
        it("Math.cosh(710.475860073944) = Infinity, overflow",
           function () {
               var y = Math.cosh(1000);
               expect(y).toBe(Infinity);
           });
        it("Math.cosh(-710.475860073944) = Infinity, overflow",
           function () {
               var y = Math.cosh(-1000);
               expect(y).toBe(Infinity);
           });
    });

