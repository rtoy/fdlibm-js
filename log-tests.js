describe(
    "Test exceptional cases",
    function () {
        it("log(-1) = NaN", function () {
                var y = log(-1);
                expect(y).toBeNaN();
            });
        it("log(0) = -Infinity", function () {
                var y = log(0);
                expect(y).toBe(-Infinity);
            });
        it("log(Infinity) = Infinity", function () {
                var y = log(Infinity);
                expect(y).toBe(Infinity);
            });
        it("log(NaN) = NaN", function () {
                var y = log(NaN);
                expect(y).toBeNaN();
            });
    });

describe(
    "Test special values",
    function () {
        it("log(1) = 0", function () {
                var y = log(1);
                expect(y).toBe(0);
            });
        it("log(Math.E) = 1",
           function () {
               // Also tests the main code, with i <= 0, k = -1
               var y = log(Math.E);
               expect(y).toBe(1);
           });
        it("log(1/Math.E) = -1",
           function () {
               // Also tests the main code, with i <= 0, k = -1
               var y = log(1/Math.E);
               expect(y).toBe(-1);
           });
        it("log(sqrt(Math.E)) = 0.5",
           // Tests main path, i < 0, k = 1
           function () {
               var x = Math.sqrt(Math.E);
               var y = log(x);
               expect(y).toBe(0.5);
           });
        it("log(sqrt(1/Math.E)) = -0.5",
           function () {
               var x = Math.sqrt(1/Math.E);
               var y = log(x);
               expect(y).toBe(-0.5);
           });
        it("log(2^-1023) = -709.0895657128241d0, denormal arg",
           function () {
               var y = log(Math.pow(2, -1023));
               expect(y).toBe(-709.08956571282410);
           });
        it("log(1.7976931348623157e308) = 709.7827128933840, largest double value",
           function () {
               var y = log(1.7976931348623157e308);
               expect(y).toBe(709.7827128933840);
           });
        it("log(1+2^-21) = 4.7683704451632344e-7",
           // Tests case 0 < f < 2^-20, k = 0
           function () {
               var y = log(1 + Math.pow(2, -21));
               expect(y).toBe(4.7683704451632344e-7);
           });
        it("log(2+2^-20) = 0.6931476573969898e0",
           // Tests case 0 < f < 2^-20, k = 1
           function () {
               var x = 2 + Math.pow(2, -20);
               var y = log(x);
               expect(y).toBe(0.6931476573969898e0);
           });
        it("log(4) = 1.3862943611198906",
           // Test branch f = 0, k = 2
           function () {
               var y = log(4);
               expect(y).toBe(0);
           });
        it("log(1.3799991607666016) = 0.3220828910287846; main path, i > 0 k = 0",
           // Tests main path, i > 0, k = 0
           function () {
               var x = _ConstructDouble(0x3ff00000 + 0x6147a);
               var y = log(x);
               expect(y).toBe(0.3220828910287846);
           });
        it("log(1.419999122619629) = 0.35065625373947773; main path, i > 0, k = 1",
           // Tests main path, i > 0, k = 1
           function () {
               var x = _ConstructDouble(0x3ff00000 + 0x6b851);
               var y = log(x);
               expect(y).toBe(0.35065625373947773);
           });
        it("log(1.3799982070922852) = 0.3220821999597803; main path i < 0, k = 0",
           // Tests main path, i < 0, k = 0
           function () {
               var x = _ConstructDouble(0x3ff00000 + 0x61479);
               var y = log(x);
               expect(y).toBe(0.3220821999597803);
           });
    });
