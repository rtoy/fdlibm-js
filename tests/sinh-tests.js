describe(
    "Tests of sinh for exceptional values",
    function () {
        it("sinh(+0) = +0",
           function () {
               var y = sinh(0);
               expect(y).toBe(0);
           });
        it("sinh(-0) = -0",
           function () {
               var x = -1/Infinity;
               var y = sinh(x);
               expect(y).toBe(x);
           });

        it("sinh(Infinity) = Infinity",
           function () {
               var y = sinh(Infinity);
               expect(y).toBe(Infinity);
           });
        it("sinh(-Infinity = -Infinity",
           function () {
               var y = sinh(-Infinity);
               expect(y).toBe(-Infinity);
           });
        it("sinh(NaN) = NaN",
           function () {
           var y = sinh(Infinity - Infinity);
           expect(y).toBeNaN();
           });
    });

describe(
    "Tests sinh basic functionality",
    function () {
        it("sinh(2^-29) = 2^-29, case |x| < 2^-28",
           function () {
               var x = Math.pow(2,-29);
               var y = sinh(x);
               expect(y).toBe(x);
           });
        it("sinh(-2^-29) = -2^-29, case |x| < 2^-28",
           function () {
               var x = -Math.pow(2,-29);
               var y = sinh(x);
               expect(y).toBe(x);
           });
        it("sinh(0.5), case |x| < 1",
           function () {
               var y = sinh(0.5);
               expect(y).toBe(0.5210953054937474e0);
           });
        it("sinh(-0.5), case |x| < 1",
           function () {
               var y = sinh(-0.5);
               expect(y).toBe(-0.5210953054937474e0);
           });
        it("sinh(10*log(2)) = 1048575/2048, case |x| < 22",
           function () {
               var y = sinh(10*Math.LN2);
               expect(y).toBe(1048575/2048);
           });
        it("sinh(-10*log(2)) = -1048575/2048, case |x| < 22",
           function () {
               var y = sinh(-10*Math.LN2);
               expect(y).toBe(-1048575/2048);
           });
        it("sinh(10), case |x| < 22",
           function () {
               var y = sinh(10);
               expect(y).toBe(11013.232874703393e0);
           });
        it("sinh(-10), case |x| < 22",
           function () {
               var y = sinh(-10);
               expect(y).toBe(-11013.232874703393e0);
           });
        it("sinh(32*Math.LN2), case |x| in [22, log(maxdouble)]",
           function () {
               var y = sinh(32*Math.LN2);
               expect(y).toBe(2.1474836479999983e9);
           });
        it("sinh(-32*Math.LN2), case |x| in [22, log(maxdouble)]",
           function () {
               var y = sinh(-32*Math.LN2);
               expect(y).toBe(-2.1474836479999983e9);
           });
        it("sinh(100), case |x| in [22, log(maxdouble)]",
           function () {
               var y = sinh(100);
               expect(y).toBe(1.3440585709080678e43);
           });
        it("sinh(-100), case |x| in [22, log(maxdouble)]",
           function () {
               var y = sinh(-100);
               expect(y).toBe(-1.3440585709080678e43);
           });
        it("sinh(710.4758600739439), no overflow, case |x| in [log(maxdouble), ovfthreshold]",
           function () {
               var x = 710.4758600739439;
               var y = sinh(x);
               expect(y).toBe(1.7976931348621744e308);
           });
        it("sinh(-710.4758600739439), no overflow, case |x| in [log(maxdouble), ovfthreshold]",
           function () {
               var x = -710.4758600739439;
               var y = sinh(x);
               expect(y).toBe(-1.7976931348621744e308);
           });
        it("sinh(710.475860073944), overflow, case |x| > ovfthreshold]",
           function () {
               var x = 710.475860073944;
               var y = sinh(x);
               expect(y).toBe(Infinity);
           });
        it("sinh(-710.475860073944), overflow, case |x| > ovfthreshold]",
           function () {
               var x = -710.475860073944;
               var y = sinh(x);
               expect(y).toBe(-Infinity);
           });
        it("sinh(1000) = Infinity, case |x| > ovfthreshold",
           function () {
               var y = sinh(1000);
               expect(y).toBe(Infinity);
           });
        it("sinh(-1000) = -Infinity, case |x| > ovfthreshold",
           function () {
               var y = sinh(-1000);
               expect(y).toBe(-Infinity);
           });
    });

describe(
    "Test basic relationships",
    function () {
        it("sinh(x) + sinh(-x) = 0, x = 1.01^k, 0 <= k < 500",
           function () {
               for (var k = 0; k < 500; ++k) {
                   var x = Math.pow(1.01, k)
                   var y = sinh(x) + sinh(-x);
                   expect(y).toBe(0);
               }
           });
        it("sinh(x) + sinh(-x) = 0, x = 2^(-k), 0 <= k < 1000",
           function () {
               for (var k = 0; k < 1000; ++k) {
                   var x = Math.pow(2, -k);
                   var y = sinh(x) + sinh(-x);
                   expect(y).toBe(0);
               }
           });
    });
