// Jasmine testsuite for the trig functions

// For all the tests, we assume that Javascript reads the floating
// point numbers such that the actual value is the IEEE754 float that
// is closest to the given decimal value.  If there is a case where
// this is NOT true, then the floating point values must be replaced
// with calls to _ConstructDouble to get the exact expected values.
//
// The expected values MUST be exactly equal; any difference signifies
// an error in the algorithms somewhere.

describe(
    "Test sin",
    function () {
	it("Small arg < pi/4",
	   function () {
	       var x = .5;
	       var y = Math.sin(x);
	       expect(y).toBe(0.479425538604203e0);
	       y = Math.sin(-x);
	       expect(y).toBe(-0.479425538604203e0);
	   });
	it("Math.sin(Math.PI/2)",
	   function () {
	       var y = Math.sin(Math.PI/2);
	       expect(y).toBe(1);
	       y = Math.sin(-Math.PI/2);
	       expect(y).toBe(-1);
	   });
	it("Math.sin(Math.PI) is not zero",
	   function () {
	       var y = Math.sin(Math.PI);
	       expect(y).toBe(1.2246467991473532e-16);
	   });
	it("Math.sin(2200*Math.PI)",
	   // https://code.google.com/p/v8/issues/detail?id=3006
	   function () {
	       var y = Math.sin(2200*Math.PI);
	       expect(y).toBe(-7.047032979958965e-14);
	   });
	it("Math.sin(.5e-4)",
	   // https://code.google.com/p/v8/issues/detail?id=3043
	   function () {
	       var y = Math.sin(.5e-4);
	       expect(y).toBe(4.999999997916667e-5);
	   });
	it("Arg reduction n mod 4 = 0, x = 7/4*pi",
	   function () {
	       var x = 7/4 * Math.PI;
	       var y = Math.sin(x);
	       // The answer is NOT -sqrt(1/2) because 7/4*Math.PI is
	       // slightly different from 7/4*pi!
	       expect(y).toBe(-0.7071067811865477e0);
	   });
	it("Arg reduction n mod 4 = 1, x = 9/4*pi",
	   function () {
	       var x = 9/4 * Math.PI;
	       var y = Math.sin(x);
	       // The answer is NOT sqrt(1/2) because 9/4*Math.PI is
	       // slightly different from 9/4*pi!
	       expect(y).toBe(0.7071067811865474e0);
	   });
	it("Arg reduction n mod 4 = 2, x = 11/4*pi",
	   function () {
	       var x = 11/4 * Math.PI;
	       var y = Math.sin(x);
	       // The answer is NOT sqrt(1/2) because 11/4*Math.PI is
	       // slightly different from 11/4*pi!
	       expect(y).toBe(0.7071067811865483e0);
	   });
	it("Arg reduction n mod 4 = 3, x = 13/4*pi",
	   function () {
	       var x = 13/4 * Math.PI;
	       var y = Math.sin(x);
	       // The answer is NOT -sqrt(1/2) because 13/4*Math.PI is
	       // slightly different from 13/4*pi!
	       expect(y).toBe(-0.7071067811865479e0);
	   });
	it("Medium arg, x = 1048576/2*pi",
	   function () {
	       var x = 1048576/2 * Math.PI;
	       var y = Math.sin(x);
	       expect(y).toBe(-6.420676210313675e-11);
	   });
    });

describe(
    "Test cos",
    function () {
	it("Small arg < pi/4",
	   function () {
	       var x = Math.pow(2, -28);
	       var y = Math.cos(x);
	       expect(y).toBe(1);
	   });
	it("Test case |x| < 0.3",
	   function () {
	       var y = Math.cos(0.25);
	       expect(y).toBe(0.9689124217106447e0);
	   });
	it("Test case |x| > .3 and |x| < .78125",
	   function () {
	       var y = Math.cos(0.5);
	       expect(y).toBe(0.8775825618903728e0);
	   });
	it("Test case |x| > .78125",
	   function () {
	       var y = Math.cos(0.785);
	       expect(y).toBe(0.7073882691671998e0);
	   });
	it("Math.cos(Math.PI/2) is not zero",
	   function () {
	       var y = Math.cos(Math.PI/2);
	       expect(y).toBe(6.123233995736766e-17);
	   });
	it("Arg reduction n mod 4 = 0, x = 7/4*pi",
	   function () {
	       var x = 7/4 * Math.PI;
	       var y = Math.cos(x);
	       // The answer is NOT sqrt(1/2) because 7/4*Math.PI is
	       // slightly different from 7/4*pi!
	       expect(y).toBe(0.7071067811865474e0);
	   });
	it("Arg reduction n mod 4 = 1, x = 9/4*pi",
	   function () {
	       var x = 9/4 * Math.PI;
	       var y = Math.cos(x);
	       // The answer is NOT sqrt(1/2) because 9/4*Math.PI is
	       // slightly different from 9/4*pi!
	       expect(y).toBe(0.7071067811865477e0);
	   });
	it("Arg reduction n mod 4 = 2, x = 11/4*pi",
	   function () {
	       var x = 11/4 * Math.PI;
	       var y = Math.cos(x);
	       // The answer is NOT -sqrt(1/2) because 11/4*Math.PI is
	       // slightly different from 11/4*pi!
	       expect(y).toBe(-0.7071067811865467e0);
	   });
	it("Arg reduction n mod 4 = 3, x = 13/4*pi",
	   function () {
	       var x = 13/4 * Math.PI;
	       var y = Math.cos(x);
	       // The answer is NOT -sqrt(1/2) because 13/4*Math.PI is
	       // slightly different from 13/4*pi!
	       expect(y).toBe(-0.7071067811865471e0);
	   });
	it("Math.cos(1000000)",
	   // https://code.google.com/p/v8/issues/detail?id=3006
	   function () {
	       var y = Math.cos(1000000);
	       expect(y).toBe(0.9367521275331447e0);
	   });
	it("Medium arg, x = 1048575/2*pi",
	   function () {
	       var x = 1048575/2 * Math.PI;
	       var y = Math.cos(x);
	       expect(y).toBe(-3.435757038074824e-12);
	   });
    });

describe(
    "Test tan",
    function () {
	it("Small arg, x = 2^-28",
	   function () {
	       var x = Math.pow(2, -28);
	       var y = Math.tan(x);
	       expect(y).toBe(x);
	   });
	it("Math.tan(Math.PI/2), which is NOT Infinity",
	   function () {
	       var y = Math.tan(Math.PI / 2);
	       expect(y).toBe(1.633123935319537e16);
	   });
	it("Test case |x| < .6744; (x = 0.5)",
	   function () {
	       var y = Math.tan(0.5);
	       expect(y).toBe(0.5463024898437905e0);
	   });
	it("Test case |x| > .6744; (x = .6875)",
	   function () {
	       var y = Math.tan(11/16);
	       expect(y).toBe(0.8211418015898941e0);
	   });
	it("Math.tan(1.107148717794091) = 2.0000000000000027",
	   function () {
	       var y = Math.tan(1.107148717794091e0);
	       expect(y).toBe(2.0000000000000027e0);
	   });
	it("Arg reduction, n even, x = 7/4*pi",
	   function () {
	       var y = Math.tan(7/4*Math.PI);
	       // This is not exactly -1 because 7/4*Math.PI is not
	       // exactly 7/4*pi.
	       expect(y).toBe(-1.0000000000000004e0);
	   });
	it("Arg reduction, n odd, x = 9/4*pi",
	   function () {
	       var y = Math.tan(9/4*Math.PI);
	       // This is not exactly 1 because 9/4*Math.PI is not
	       // exactly 9/4*pi.
	       expect(y).toBe(0.9999999999999994e0);
	   });
	it("Medium arg, x = 1048576*pi/2",
	   function () {
	       var x = 1048576/2*Math.PI;
	       var y = Math.tan(x);
	       expect(y).toBe(-6.420676210313675e-11);
	   });
	it("Medium arg, x = 1048575*pi/2",
	   function () {
	       var x = 1048575/2*Math.PI;
	       var y = Math.tan(x);
	       expect(y).toBe(2.910566692924059e11);
	   });
    });
