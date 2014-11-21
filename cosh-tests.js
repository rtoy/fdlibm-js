describe(
    "Tests of cosh for exceptional values",
    function () {
        it("cosh(Infinity) = Infinity",
           function () {
               var y = cosh(Infinity);
               expect(y).toBe(Infinity);
           });
        it("cosh(-Infinity) = Infinity",
           function () {
               var y = cosh(-Infinity);
               expect(y).toBe(Infinity);
           });
        it("cosh(NaN) = NaN",
           function () {
               var x = Infinity - Infinity;
               var y = cosh(x);
               expect(y).toBeNaN();
           });
    });

describe(
    "Tests cosh basic functionality",
    function () {
        it("cosh(2^-55) = 1, tiny case",
           function () {
               var x = Math.pow(2,-55);
               var y = cosh(x);
               expect(y).toBe(1);
           });
        it("cosh(-2^-55) = 1, tiny case",
           function () {
               var x = -Math.pow(2,-55);
               var y = cosh(x);
               expect(y).toBe(1);
           });
        it("cosh(Math.LN2/4) = (sqrt(2)+1)/2^(5/4), case |x| < 1/2*log(2)",
           function () {
               var x = Math.LN2/4;
               var y = cosh(x);
               expect(y).toBe(1.0150517651282178e0);
           });
        it("cosh(-Math.LN2/4) = (sqrt(2)+1)/2^(5/4), case |x| < 1/2*log(2)",
           function () {
               var x = -Math.LN2/4;
               var y = cosh(x);
               expect(y).toBe(1.0150517651282178e0);
           });
        it("cosh(10*Math.LN2) = 1048577/2048, case 1/2*log(2) < |x| < 22",
           function () {
               var x = 10*Math.LN2;
               var y = cosh(x);
               expect(y).toBe(512.00048828125e0);
           });
        it("cosh(-10*Math.LN2) = 1048577/2048, case 1/2*log(2) < |x| < 22",
           function () {
               var x = -10*Math.LN2;
               var y = cosh(x);
               expect(y).toBe(512.00048828125e0);
           });
        it("cosh(32*Math.LN2), case 22 <= |x| < log(maxdouble)",
           function () {
               var x = 32*Math.LN2;
               var y = cosh(x);
               expect(y).toBe(2.1474836479999983e9);
           });
        it("cosh(-32*Math.LN2), case 22 <= |x| < log(maxdouble)",
           function () {
               var x = -32*Math.LN2;
               var y = cosh(x);
               expect(y).toBe(2.1474836479999983e9);
           });
        it("cosh(710.4758600739439), case log(maxdouble) <= |x| <= overflowthreshold",
           function () {
               var y = cosh(710.4758600739439e0);
               expect(y).toBe(1.7976931348621744e308);
           });
        it("cosh(-710.4758600739439), case log(maxdouble) <= |x| <= overflowthreshold",
           function () {
               var y = cosh(-710.4758600739439e0);
               expect(y).toBe(1.7976931348621744e308);
           });
        it("cosh(710.475860073944) = Infinity, overflow",
           function () {
               var y = cosh(1000);
               expect(y).toBe(Infinity);
           });
        it("cosh(-710.475860073944) = Infinity, overflow",
           function () {
               var y = cosh(-1000);
               expect(y).toBe(Infinity);
           });
    });

