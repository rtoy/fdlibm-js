describe(
    "Test special cases",
    function () {
        it("Math.log10(Infinity) = Infinity", function () {
		var y = Math.log10(Infinity);
		expect(y).toBe(Infinity);
            });
        it("Math.log10(NaN) = NaN", function () {
                var y = Math.log10(NaN);
                expect(y).toBeNaN();
            });
        it("Math.log10(+0) = -Infinity", function () {
                var x = 1 / +Infinity;
                var y = Math.log10(x);
                expect(y).toBe(-Infinity);
            });
        it("Math.log10(-0) = -Infinity", function () {
                var x = 1 / -Infinity;
                var y = Math.log10(x);
                expect(y).toBe(-Infinity);
            });
        it("Math.log10(x) = NaN for x < 0", function () {
                var y = Math.log10(-1);
                expect(y).toBeNaN();
            });
    });

describe(
    "Test powers of 10",
    function () {
        it("Math.log10(10^n) = n for -311 <=n <= 308",
           function () {
               // NOTE: it is not necessarily true that Math.log10(10^n) =
               // n for an integer n. For n < 0 or n > 22, 10^n is not
               // exactly representable by a float.  Someone will have
               // to do the proof that Math.log10(10^n) is actually n for
               // these other values of n.  However, fdlibm's log10
               // function does return n for n from -311 to 308. V8 does not support this range because Math.pow(10,n) is inaccurate for some of the these values.
               for (var n = -311; n <= 308; ++n) {
                   var x = Math.pow(10,n);
                   var y = Math.log10(x);
                   expect(y).toBe(n);
               }
           });
    });

describe(
    "Test small args",
    function () {
        it("Math.log10(<denormal>)", function () {
                var x = 1.5 * Math.pow(2,-1023);
                var y = Math.log10(x);
                expect(y).toBe(-307.77759430519706)
            });
        it("log10(1-Number.EPSILON) = -9.643274665532873e-17", function () {
            // Note that Number.EPSILON is not the smallest eps such
            // that 1+eps != 1.  It is the the difference between the
            // smallest float greater than 1 and 1, so Number.EPSILON
            // is about 2*eps.
            var x = 1 - Number.EPSILON;
            var y = Math.log10(x);
            // Note: The expected answer assumes that log10 is using
            // Math.log. If log (from fdlibm-js) is used, the answer
            // is off by one bit.  But based on a comparison with
            // Maxima, that would be the correctly rounded result.
            // The value here is not the correctly rounded value.
            expect(y).toBe(-9.643274665532873e-17);
          });
    });
