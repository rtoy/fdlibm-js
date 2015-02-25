describe(
    "Test exceptional cases",
    function () {
        it("Math.log(-1) = NaN", function () {
                var y = Math.log(-1);
                expect(y).toBeNaN();
            });
        it("Math.log(0) = -Infinity", function () {
                var y = Math.log(0);
                expect(y).toBe(-Infinity);
            });
        it("Math.log(Infinity) = Infinity", function () {
                var y = Math.log(Infinity);
                expect(y).toBe(Infinity);
            });
        it("Math.log(NaN) = NaN", function () {
                var y = Math.log(NaN);
                expect(y).toBeNaN();
            });
    });

describe(
    "Test special values",
    function () {
        it("Math.log(1) = 0", function () {
                var y = Math.log(1);
                expect(y).toBe(0);
            });
        it("Math.log(Math.E) = 1",
           function () {
               // Also tests the main code, with i <= 0, k = -1
               var y = Math.log(Math.E);
               expect(y).toBe(1);
           });
        it("Math.log(1/Math.E) = -1",
           function () {
               // Also tests the main code, with i <= 0, k = -1
               var y = Math.log(1/Math.E);
               expect(y).toBe(-1);
           });
        it("Math.log(sqrt(Math.E)) = 0.5",
           // Tests main path, i < 0, k = 1
           function () {
               var x = Math.sqrt(Math.E);
               var y = Math.log(x);
               expect(y).toBe(0.5);
           });
        it("Math.log(sqrt(1/Math.E)) = -0.5",
           function () {
               var x = Math.sqrt(1/Math.E);
               var y = Math.log(x);
               expect(y).toBe(-0.5);
           });
        it("Math.log(2^-1023) = -709.0895657128241d0, denormal arg",
           function () {
               var y = Math.log(Math.pow(2, -1023));
               expect(y).toBe(-709.08956571282410);
           });
        it("Math.log(1.7976931348623157e308) = 709.7827128933840, largest double value",
           function () {
               var y = Math.log(1.7976931348623157e308);
               expect(y).toBe(709.7827128933840);
           });
        it("Math.log(1+2^-21) = 4.7683704451632344e-7",
           // Tests case 0 < f < 2^-20, k = 0
           function () {
               var y = Math.log(1 + Math.pow(2, -21));
               expect(y).toBe(4.7683704451632344e-7);
           });
        it("Math.log(2+2^-20) = 0.6931476573969898e0",
           // Tests case 0 < f < 2^-20, k = 1
           function () {
               var x = 2 + Math.pow(2, -20);
               var y = Math.log(x);
               expect(y).toBe(0.6931476573969898e0);
           });
        it("Math.log(4) = 1.3862943611198906",
           // Test branch f = 0, k = 2
           function () {
               var y = Math.log(4);
               expect(y).toBe(1.3862943611198906);
           });
        it("Math.log(1.3799991607666016) = 0.3220828910287846; main path, i > 0, k = 0",
           // Tests main path, i > 0, k = 0
           function () {
               var x = _ConstructDouble(0x3ff00000 + 0x6147a);
               var y = Math.log(x);
               expect(y).toBe(0.3220828910287846);
           });
        it("Math.log(1.419999122619629) = 0.35065625373947773; main path, i > 0, k = 1",
           // Tests main path, i > 0, k = 1
           function () {
               var x = _ConstructDouble(0x3ff00000 + 0x6b851);
               var y = Math.log(x);
               expect(y).toBe(0.35065625373947773);
           });
        it("Math.log(0.6899995803833008) = -0.3710642895311607; main path, i > 0 k = -1",
           // Tests main path, i > 0, k = -1
           function () {
               var x = _ConstructDouble(0x3fe00000 + 0x6147a);
               var y = Math.log(x);
               expect(y).toBe(-0.3710642895311607);
           });
        it("Math.log(1.3799982070922852) = 0.3220821999597803; main path i < 0, k = 0",
           // Tests main path, i < 0, k = 0
           function () {
               var x = _ConstructDouble(0x3ff00000 + 0x61479);
               var y = Math.log(x);
               expect(y).toBe(0.3220821999597803);
           });
        it("Math.log(2.7599964141845703) = 1.0152293805197257; main path i < 0, k = 1",
           // Tests main path, i < 0, k = 1
           function () {
               var x = _ConstructDouble(0x40000000 + 0x61479);
               var y = Math.log(x);
               expect(y).toBe(1.0152293805197257);
           });
        it("Math.log(0.6899991035461426) = -0.37106498060016496; main path i < 0, k = -1",
           // Tests main path, i < 0, k = -1
           function () {
               var x = _ConstructDouble(0x3fe00000 + 0x61479);
               var y = Math.log(x);
               expect(y).toBe(-0.37106498060016496);
           });
    });

describe(
    "Test relationships",
    function () {
        it("|Math.log(x) + Math.log(1/x)| < 1.77635684e-15, x = 1.2^k, 0 <= k < 2000",
           function () {
               var x = 1;
               var maxValue = -1;
               for (var k = 0; k < 2000; ++k) {
                   var y = Math.abs(Math.log(x) + Math.log(1/x));
                   maxValue = Math.max(maxValue, y);
                   x *= 1.4;
               }
               expect(maxValue).toBeLessThan(1.77635684e-15);
           });
        it("|Math.exp(Math.log(x)) - x|/x < 1.2908444e-13, x = 1.4^k, 0 <= k < 2000",
           function () {
               var x = 1;
               var maxRelativeError = 0;
               for (var k = 0; k < 2000; ++k) {
                   var y = Math.abs(Math.exp(Math.log(x)) - x) / x;
                   maxRelativeError = Math.max(maxRelativeError, y);
                   x *= 1.4;
               }
               expect(maxRelativeError).toBeLessThan(1.2908444e-13);
           });
        it("|Math.exp(Math.log(x)) - x|/x < 1.266577e-13, x = 1.4^(-k), 0 <= k < 2000",
           function () {
               var x = 1;
               var maxRelativeError = 0;
               for (var k = 0; k < 2000; ++k) {
                   var y = Math.abs(Math.exp(Math.log(x)) - x) / x;
                   maxRelativeError = Math.max(maxRelativeError, y);
                   x /= 1.4;
               }
               expect(maxRelativeError).toBeLessThan(1.266577e-13);
           });
        it("|exp(Math.log(x)) - x|/x < 5.6766649e-14, x = 1.4^k, 0 <= k < 2000",
           function () {
               var x = 1;
               var maxRelativeError = 0;
               for (var k = 0; k < 2000; ++k) {
                   var y = Math.abs(exp(Math.log(x)) - x) / x;
                   maxRelativeError = Math.max(maxRelativeError, y);
                   x *= 1.4;
               }
               expect(maxRelativeError).toBeLessThan(5.6766649e-14);
           });
        it("|exp(Math.log(x)) - x|/x < 5.68410245e-14, x = 1.4^(-k), 0 <= k < 2000",
           function () {
               var x = 1;
               var maxRelativeError = 0;
               for (var k = 0; k < 2000; ++k) {
                   var y = Math.abs(exp(Math.log(x)) - x) / x;
                   maxRelativeError = Math.max(maxRelativeError, y);
                   x /= 1.4;
               }
               expect(maxRelativeError).toBeLessThan(5.68410245e-14);
           });
    });
