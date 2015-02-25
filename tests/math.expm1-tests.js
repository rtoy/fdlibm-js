describe(
    "Tests for Math.expm1 for exceptional values",
    function () {
	it("Math.expm1(Infinity) = Infinity", function () {
		var y = Math.expm1(Infinity);
		expect(y).toBe(Infinity);
	    });
	it("Math.expm1(-Infinity) = -1", function () {
		var y = Math.expm1(-Infinity);
		expect(y).toBe(-1);
	    });
	it("Math.expm1(NaN) = NaN", function () {
		var x = Infinity - Infinity;
		var y = Math.expm1(x);
		expect(y).toBeNaN();
	    });
    });

describe(
    "Tests Math.expm1 for large arguments",
    function () {
	it("Math.expm1(709.8) = Infinity", function () {
		var y;
		y = Math.expm1(709.8);
		expect(y).toBe(Infinity);
	    });
	it("Math.expm1(1.7976931348623157e308) = Infinity", function () {
		// x = most positive double float
		var x = 1.7976931348623157e308
		var y = Math.expm1(x);
		expect(y).toBe(Infinity);
	    });
    });

describe(
    "Tests Math.expm1(x) for x < -56*log(2)",
    function () {
	it("Math.expm1(x) = -1 for x = -56*log(2), with the low word 0", function () {
		// x = -56*log(2), but low word is set to 0
		var x = -38.81622314453125e0;
		var y = Math.expm1(x);
		expect(y).toBe(-1);
	    });
	it("Math.expm1(-50) = -1", function () {
		var y = Math.expm1(-50);
		expect(y).toBe(-1);
	    });
	it("Math.expm1(-1.7976931348623157e308) = -1", function () {
		// x is most negative double float
		var x = -1.7976931348623157e308;
		var y = Math.expm1(x);
		expect(y).toBe(-1);
	    });
    });
describe(
    "Test argument reduction",
    function () {
	it("Math.expm1(1) = Math.E - 1, case 0.5*log(2) < |x| < 1.5*log(2)", function() {
		// Case of 0.5*log(2) < |x| < 1.5*log(2)
		var y = Math.expm1(1);
		expect(y).toBe(1.718281828459045e0);
	    });
	it("Math.expm1(-1) = 1/Math.E - 1, case 0.5*log(2) < |x| < 1.5*log(2)", function() {
		// Case of 0.5*log(2) < |x| < 1.5*log(2)
		var y = Math.expm1(-1);
		expect(y).toBe(-0.6321205588285577e0);
	    });
	it("Math.expm1(2) = Math.E^2-1, case 1.5*log(2) < |x|", function() {
		// Case of 1.5*log(2) < |x|
		var y = Math.expm1(2);
		expect(y).toBe(6.38905609893065e0);
	    });
	it("Math.expm1(-2) = 1/Math.E^2-1, case 1.5*log(2) < |x|", function() {
		// Case of 1.5*log(2) < |x|
		var y = Math.expm1(-2);
		expect(y).toBe(-0.8646647167633873e0);
	    });
	it("Math.expm1(0) = 0", function() {
		var y = Math.expm1(0);
		expect(y).toBe(0);
	    });
	it("Math.expm1(2^-55), where Math.expm1(x) = x", function() {
		var x = Math.pow(2,-55);
		var y = Math.expm1(x);
		expect(y).toBe(x);
	    });
	// These tests are for the case where argument reduction has x
	// in the primary range.
	it("Math.expm1(1/4*log(2)) = 2^(1/4) - 1, test branch k = 0", function () {
		// Tests the branch k = 0
		var x = 0.25 * Math.LN2;
		var y = Math.expm1(x);
		expect(y).toBe(0.18920711500272105e0);
	    });
	it("Math.expm1(-log(2)) = -0.5, test branch k = -1", function () {
		// Tests the branch k = -1
		var x = -Math.LN2;
		var y = Math.expm1(x);
		expect(y).toBe(-0.5);
	    });
	it("Math.expm1(log(2)) = 1, test branch k = 1", function () {
		// Tests the branch k = 1
		var x = Math.LN2;
		var y = Math.expm1(x);
		expect(y).toBe(1);
	    });
	it("Math.expm1(-3*log(2)), test branch k <= -2 || k > 56. with k = -3", function () {
		// Tests the branch k <= -2 || k > 56. k = -3 here.
		var x = -3 * Math.LN2;
		var y = Math.expm1(x);
		expect(y).toBe(-0.875);
	    });
	it("Math.expm1(57*log(2)), test branch k <= -2 || k > 56. with k = 57.", function () {
		// Tests the branch k <= -2 || k > 56. k = 57 here.
		var x = 57 * Math.LN2;
		var y = Math.expm1(x);
		expect(y).toBe(1.4411518807585582e17);
	    });
	it("Math.expm1(19*log(2)), test branch k < 20, with k = 19", function () {
		// Tests the last branch for k < 20. k = 19 here.
		var x = 19 * Math.LN2;
		var y = Math.expm1(x);
		expect(y).toBe(524286.99999999994);
	    });
	it("Math.expm1(20*log(2)), test branch k >= 20, k = 20", function () {
		// Tests the else branch of k < 20, k = 20 here.
		var x = 20 * Math.LN2;
		var y = Math.expm1(x);
		expect(y).toBe(1048575.0);
	    });
		
    });
	
