describe(
    "Test special cases",
    function () {
	it("Math.log1p(-1) = inf", function () {
		var y = Math.log1p(-1);
		expect(y).toBe(-Infinity)
	    });
	it("Math.log1p(x) = NaN for x < -1", function () {
		var y = Math.log1p(-2);
		expect(y).toBeNaN();
	    });
	it("Math.log1p(0) = 0", function () {
		var y = Math.log1p(0);
		expect(y).toBe(0);
	    });
	it("Math.log1p(1.7976931348623157e308)", function () {
		// x = most positive double float.
		var x = 1.7976931348623157e308;
		var y = Math.log1p(x);
		expect(y).toBe(709.782712893384e0);
	    });
    });

describe(
    "Test small args",
    function () {
	it("Math.log1p(x) = x for |x| < 2^-54. x = 2^-55", function () {
		var x = Math.pow(2,-55);
		var y = Math.log1p(x);
		expect(y).toBe(x);
	    });
	it("Math.log1p(x) for 2^-54 < |x| < 2^-29", function () {
		var x = Math.pow(2, -30);
		var y = Math.log1p(x);
		expect(y).toBe(9.313225741817976e-10);
	    });
    });

describe(
    "Test coverage",
    function () {
	it("Math.log1p(-0.25), -.2929 < x < .41422, where k = 0", function () {
		var x = -0.25;
		var y = Math.log1p(x);
		expect(y).toBe(-0.2876820724517809e0);
	    });
	it("Math.log1p(0.25), -.2929 < x < .41422, where k = 0", function () {
		var x = 0.25;
		// True value is log(1.25) = log(5/4) = log(5)-2*log(2)
		var y = Math.log1p(x);
		expect(y).toBe(0.22314355131420976e0);
	    });
	it("Math.log1p(10), 0.41422 < x < 9.007e15", function () {
		var x = 10;
		// True value is log(11)
		var y = Math.log1p(x);
		expect(y).toBe(2.3978952727983707e0);
	    });
	it("Math.log1p(10e15), x > 9.007e15", function () {
		var x = 10e15;
		var y = Math.log1p(x);
		expect(y).toBe(36.841361487904734e0);
	    });
	it("log1p, normalize u case", function () {
		var x = _ConstructDouble(0x4346a09e, 0);
		var y = Math.log1p(x);
		expect(y).toBe(37.08337388996168e0);
	    });
	it("log1p, normalize u/2 case", function () {
		var x = _ConstructDouble(0x4346a090, 0);
		var y = Math.log1p(x);
		expect(y).toBe(37.08336444902049e0);
	    });
	it("Math.log1p(3), case |f| = 0, k != 0", function () {
		var y = Math.log1p(3);
		// True value is log(4) = 2*log(2)
		expect(y).toBe(1.3862943611198906e0);
	    });
	it("Math.log1p(3+2^-20), case |f| != 0, k != 0", function () {
		var y = Math.log1p(3 + Math.pow(2,-20));
		expect(y).toBe(1.3862945995384413e0);
	    });
	it("Math.log1p(0.75), final if case, k = 0", function () {
		var y = Math.log1p(0.75);
		expect(y).toBe(0.5596157879354227e0);
	    });
	it("Math.log1p(1.25), final if case, k != 0", function () {
		// True value is log(9/4) = 2*log(3/2)
		var y = Math.log1p(1.25);
		expect(y).toBe(0.8109302162163288e0);
	    });
    });

