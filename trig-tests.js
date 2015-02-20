// Jasmine testsuite for the trig functions

// For all the tests, we assume that Javascript reads the floating
// point numbers such that the actual value is the IEEE754 float that
// is closest to the given decimal value.  If there is a case where
// this is NOT true, then the floating point values must be replaced
// with calls to makeDoubleFloat to get the exact expected values.
//
// The expected values MUST be exactly equal; any difference signifies
// an error in the algorithms somewhere.

describe(
    "Tests for kernel_sin for |x| < pi/4",
    function() {
        it("sin(+0.0) is +0.0", function() {
                var y = 1/kernel_sin(+0.0, 0, false);
                expect(y).toBe(Infinity);
            });
        it("sin(-0.0) is -0.0", function() {
                var y = 1/kernel_sin(-0.0, 0, false);
                expect(y).toBe(-Infinity);
            });
        it("sin(x) = x for x < 2^-27. |x|=2^-32", function() {
                var x = Math.pow(2,-32);
                var y = kernel_sin(x, 0, false);
                expect(y).toBe(x);
                y = kernel_sin(-x, 0, false);
                expect(y).toBe(-x);
            });
        it("sin(%pi/8) = sqrt(sqrt(2)-1)/2^(3/4)", function() {
                var y = kernel_sin(Math.PI/8, 0, false);
                expect(y).toBe(0.3826834323650898e0);
            });
        it("sin(-%pi/8) = -sqrt(sqrt(2)-1)/2^(3/4)", function() {
                var y = kernel_sin(-Math.PI/8, 0, false);
                expect(y).toBe(-0.3826834323650898e0);
            });
    });

describe(
    "Tests for kernel_cos for |x| < pi/4",
    function() {
        it("cos(x) = 1 for |x| < 2^-27",
           function() {
               var x = Math.pow(2,-32);
               var y = kernel_cos(x, 0);
               expect(y).toBe(1);
               y = kernel_cos(-x, 0);
               expect(y).toBe(1);
           });
        it("Test case for |x| < 0.3 with cos(%pi/20) = sqrt(sqrt(2)*sqrt(sqrt(5)+5)+4)/2^(3/2)",
           function() {
               var x = Math.PI / 20;
               var y = kernel_cos(x, 0);
               expect(y).toBe(0.9876883405951378e0);
           });
        it("Test case |x| ~> 0.78125, cos(0.7812504768371582e0)",
           function () {
               var x = makeDoubleFloat(0x3fe90001, 0);
               var y = kernel_cos(x, 0);
               expect(y).toBe(0.7100335477927638e0);
           });
        it("Test case |x| ~> 0.78125, cos(0.78125)",
           function () {
               var y = kernel_cos(0.78125, 0);
               expect(y).toBe(0.7100338835660797);
           });
        it("cos(%pi/8) = sqrt(sqrt(2)+1)/2^(3/4)",
           function () {
               var x = Math.PI/8;
               var y = kernel_cos(x, 0);
               expect(y).toBe(0.9238795325112867e0);
           });
        it("cos(-%pi/8) = sqrt(sqrt(2)+1)/2^(3/4)",
           function () {
               var x = -Math.PI/8;
               var y = kernel_cos(x, 0);
               expect(y).toBe(0.9238795325112867e0);
           });
    });
           
describe(
    "Tests for kernel_tan for |x| < pi/4",
    function() {
        it("tan(0.0) = +0.0",
           function () {
               var y = 1/kernel_tan(0.0, 0, 1);
               expect(y).toBe(Infinity);
           });
        it("tan(-0.0) = -0.0",
           function () {
               var y = 1/kernel_tan(-0.0, 0, 1);
               expect(y).toBe(-Infinity);
           });
        it("tan(x) = x for |x| < 2^-28",
           function () {
               var x = Math.pow(2, -32);
               var y = kernel_tan(x, 0, 1);
               expect(y).toBe(x);
               y = kernel_tan(-x, 0, 1);
               expect(y).toBe(-x);
           });
        it("-cot(x) = 1/x, |x| < 2^-28",
           function () {
               var x = Math.pow(2,-32);
               var y = kernel_tan(x, 0, -1);
               expect(y).toBe(-1/x);
               y = kernel_tan(-x, 0, -1);
               expect(y).toBe(1/x);
           });
        it("Case |x| > .6744, tan(11/16)",
           function () {
               var y = kernel_tan(11/16, 0, 1);
               expect(y).toBe(0.8211418015898941e0);
               y = kernel_tan(-11/16, 0, 1);
               expect(y).toBe(-0.8211418015898941e0);
           });
        it("Case |x| < .6744, tan(pi/8) = sqrt(2)-1",
           function () {
               var x = Math.PI / 8;
               var y = kernel_tan(x, 0, 1);
               expect(y).toBe(0.41421356237309503e0);
           });
        it("Case |x| > .6744, -cot(11/16)",
           function () {
               var y = kernel_tan(11/16, 0, -1);
               expect(y).toBe(-1.217816457600625e0);
               y = kernel_tan(-11/16, 0, -1);
               expect(y).toBe(1.217816457600625e0);
           });
        it("Case |x| < .6744, -cot(pi/8) = -sqrt(2)-1",
           function () {
               var x = Math.PI / 8;
               var y = kernel_tan(x, 0, -1);
               expect(y).toBe(-2.4142135623730954e0);
           });
    });

describe(
    "Test pi reduction, small args",
    function () {
        it("No reduction for |x| < pi/4",
           function () {
               var x = 0.7853;
               var y = ieee754_rem_pio2(x);
               expect(y[0]).toBe(0);
               expect(y[1]).toBe(x);
               expect(y[2]).toBe(0);
               y = ieee754_rem_pio2(-x);
               expect(y[0]).toBe(0);
               expect(y[1]).toBe(-x);
               expect(y[2]).toBe(0);
           });
        it("|x| = 2.356194490192345e0",
           function () {
               var x = makeDoubleFloat(0x4002d97b, 0xffffffff);
               var y = ieee754_rem_pio2(x);
               expect(y[0]).toBe(1);
               expect(y[1]).toBe(0.7853972156855716e0);
               expect(y[2]).toBe(4.9789962508669555e-17);
           });
        it("|x| = 2.3561935424804688e0",
           function () {
               var x = makeDoubleFloat(0x4002d97c, 0);
               var y = ieee754_rem_pio2(x);
               expect(y[0]).toBe(1);
               expect(y[1]).toBe(0.7853972156855721e0);
               expect(y[2]).toBe(4.9789962508669555e-17);
           });
        it("First reduction, |x| ~= pi/2, 33+53 bits of pi",
           function () {
	       var x = 1.5707960128784182e0;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(1);
	       expect(y[1]).toBe(-3.139164784284367e-7);
	       expect(y[2]).toBe(-1.0562999066987326e-23);
	       y = ieee754_rem_pio2(-x);
	       expect(y[0]).toBe(-1);
	       expect(y[1]).toBe(3.139164784284367e-7);
	       expect(y[2]).toBe(1.0562999066987326e-23);
           });
        it("First reduction, |x| ~= pi/2, 33+33+53 bits of pi",
           function () {
	       var x = 1.570796012878418e0;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(1);
	       expect(y[1]).toBe(-3.139164786504813e-7);
	       expect(y[2]).toBe(-1.0562999066987326e-23);
	       y = ieee754_rem_pio2(-x);
	       expect(y[0]).toBe(-1);
	       expect(y[1]).toBe(3.139164786504813e-7);
	       expect(y[2]).toBe(1.0562999066987326e-23);
           });
    });

describe(
    "Test pi reduction, medium args",
    function () {
        it("Smallest medium arg x = 1647099.9999999998e0",
           function () {
	       var x = 1647099.9999999998e0;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(1048576);
	       expect(y[1]).toBe(0.6708347142497623e0);
	       expect(y[2]).toBe(-1.1076107309665303e-17);
           });
	it("First round, |x| = 15 (85 bits)",
	   function () {
	       var x = 15;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(10);
	       expect(y[1]).toBe(-0.7079632679489662e0);
	       expect(y[2]).toBe(5.381041526248233e-17);
	       y = ieee754_rem_pio2(-x);
	       expect(y[0]).toBe(-10);
	       expect(y[1]).toBe(0.7079632679489662e0);
	       expect(y[2]).toBe(-5.381041526248233e-17);
	   });
	it("First round, |x| = 49 (85 bits)",
	   function () {
	       var x = 49;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(31);
	       expect(y[1]).toBe(0.3053138693582048e0);
	       expect(y[2]).toBe(-1.0823396512592494e-17);
	       y = ieee754_rem_pio2(-x);
	       expect(y[0]).toBe(-31);
	       expect(y[1]).toBe(-0.3053138693582048e0);
	       expect(y[2]).toBe(1.0823396512592494e-17);
	   });
	it("Second round, 118 bits, |x| = 4.7123870849609375d0",
	   function() {
	       // x is 3/2*pi with the low 32 bits set to 0.
	       var x = 4.7123870849609375e0;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(3);
	       expect(y[1]).toBe(-1.895423752357694e-6);
	       expect(y[2]).toBe(7.419012120582594e-23);
	       y = ieee754_rem_pio2(-x);
	       expect(y[0]).toBe(-3);
	       expect(y[1]).toBe(1.895423752357694e-6);
	       expect(y[2]).toBe(-7.419012120582594e-23);
	   });
	it("Third round, 151 bits, |x| = 3/2*pi",
	   function() {
	       var x = 3/2 * Math.PI;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(3);
	       expect(y[1]).toBe(-1.8369701987210297e-16);
	       expect(y[2]).toBe(-7.833796929500809e-33);
	       y = ieee754_rem_pio2(-x);
	       expect(y[0]).toBe(-3);
	       expect(y[1]).toBe(1.8369701987210297e-16);
	       expect(y[2]).toBe(7.833796929500809e-33);
	   });
	it("Largest medium arg: |x| = 1647009, 2nd iteration needed.",
	   function () {
	       var x = 1647099;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(1048576);
	       expect(y[1]).toBe(-0.3291652855174071e0);
	       expect(y[2]).toBe(-1.1076107309665303e-17);
	       y = ieee754_rem_pio2(-x);
	       expect(y[0]).toBe(-1048576);
	       expect(y[1]).toBe(0.3291652855174071e0);
	       expect(y[2]).toBe(1.1076107309665303e-17);
	   });
	it("Largest medium arg: |x| = 1048576*pi/2, 3rd iteration needed.",
	   function () {
	       var x = 1048576 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(1048576);
	       expect(y[1]).toBe(-6.420676210313675e-11);
	       expect(y[2]).toBe(1.5701218739976096e-27);
	       y = ieee754_rem_pio2(-x);
	       expect(y[0]).toBe(-1048576);
	       expect(y[1]).toBe(6.420676210313675e-11);
	       expect(y[2]).toBe(-1.5701218739976096e-27);
	   });
    });

describe(
    "Test pi reduction, multiples of pi/2",
    function () {
	it("1*pi/2",
	   function () {
	       var x = 1 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(1);
	       expect(y[1]).toBe(-6.123233995736766e-17);
	       expect(y[2]).toBe(1.4974857633995285e-33);
	   });

	it("2*pi/2",
	   function () {
	       var x = 2 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(2);
	       expect(y[1]).toBe(-1.2246467991473532e-16);
	       expect(y[2]).toBe(2.994769809718341e-33);
	   });

	it("3*pi/2",
	   function () {
	       var x = 3 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(3);
	       expect(y[1]).toBe(-1.8369701987210297e-16);
	       expect(y[2]).toBe(-7.833796929500809e-33);
	   });

	it("4*pi/2",
	   function () {
	       var x = 4 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(4);
	       expect(y[1]).toBe(-2.4492935982947064e-16);
	       expect(y[2]).toBe(5.989539619436682e-33);
	   });

	it("5*pi/2",
	   function () {
	       var x = 5 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(5);
	       expect(y[1]).toBe(-3.061616997868383e-16);
	       expect(y[2]).toBe(1.981287616837413e-32);
	   });

	it("6*pi/2",
	   function () {
	       var x = 6 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(6);
	       expect(y[1]).toBe(-3.6739403974420594e-16);
	       expect(y[2]).toBe(-1.5667593859001618e-32);
	   });

	it("7*pi/2",
	   function () {
	       var x = 7 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(7);
	       expect(y[1]).toBe(-4.286263797015736e-16);
	       expect(y[2]).toBe(-1.8442573100641268e-33);
	   });

	it("8*pi/2",
	   function () {
	       var x = 8 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(8);
	       expect(y[1]).toBe(-4.898587196589413e-16);
	       expect(y[2]).toBe(1.1979079238873364e-32);
	   });

	it("9*pi/2",
	   function () {
	       var x = 9 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(9);
	       expect(y[1]).toBe(-5.51091059616309e-16);
	       expect(y[2]).toBe(2.5802415787810855e-32);
	   });

	it("10*pi/2",
	   function () {
	       var x = 10 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(10);
	       expect(y[1]).toBe(-6.123233995736766e-16);
	       expect(y[2]).toBe(3.962575233674826e-32);
	   });

	it("11*pi/2",
	   function () {
	       var x = 11 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(11);
	       expect(y[1]).toBe(-2.4499125789312946e-15);
	       expect(y[2]).toBe(-1.437661374195672e-31);
	   });

	it("12*pi/2",
	   function () {
	       var x = 12 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(12);
	       expect(y[1]).toBe(-7.347880794884119e-16);
	       expect(y[2]).toBe(-3.1335187718003235e-32);
	   });

	it("13*pi/2",
	   function () {
	       var x = 13 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(13);
	       expect(y[1]).toBe(9.803364199544708e-16);
	       expect(y[2]).toBe(8.109576198356073e-32);
	   });

	it("14*pi/2",
	   function () {
	       var x = 14 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(14);
	       expect(y[1]).toBe(-8.572527594031472e-16);
	       expect(y[2]).toBe(-3.6885146201282536e-33);
	   });

	it("15*pi/2",
	   function () {
	       var x = 15 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(15);
	       expect(y[1]).toBe(-2.6948419387607653e-15);
	       expect(y[2]).toBe(-8.847279122381724e-32);
	   });

	it("16*pi/2",
	   function () {
	       var x = 16 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(16);
	       expect(y[1]).toBe(-9.797174393178826e-16);
	       expect(y[2]).toBe(2.3958158477746728e-32);
	   });

	it("17*pi/2",
	   function () {
	       var x = 17 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(17);
	       expect(y[1]).toBe(7.354070601250002e-16);
	       expect(y[2]).toBe(3.778149502668422e-32);
	   });

	it("18*pi/2",
	   function () {
	       var x = 18 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(18);
	       expect(y[1]).toBe(-1.102182119232618e-15);
	       expect(y[2]).toBe(5.160483157562171e-32);
	   });

	it("19*pi/2",
	   function () {
	       var x = 19 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(19);
	       expect(y[1]).toBe(-2.939771298590236e-15);
	       expect(y[2]).toBe(-3.317944502806745e-32);
	   });

	it("20*pi/2",
	   function () {
	       var x = 20 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(20);
	       expect(y[1]).toBe(-1.2246467991473533e-15);
	       expect(y[2]).toBe(7.925150467349652e-32);
	   });

	it("21*pi/2",
	   function () {
	       var x = 21 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(21);
	       expect(y[1]).toBe(4.904777002955296e-16);
	       expect(y[2]).toBe(-5.532771930192468e-33);
	   });

	it("22*pi/2",
	   function () {
	       var x = 22 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(22);
	       expect(y[1]).toBe(-4.899825157862589e-15);
	       expect(y[2]).toBe(-2.875322748391344e-31);
	   });

	it("23*pi/2",
	   function () {
	       var x = 23 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(23);
	       expect(y[1]).toBe(-3.1847006584197066e-15);
	       expect(y[2]).toBe(2.2113901167682514e-32);
	   });

	it("24*pi/2",
	   function () {
	       var x = 24 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(24);
	       expect(y[1]).toBe(-1.4695761589768238e-15);
	       expect(y[2]).toBe(-6.267037543600647e-32);
	   });

	it("25*pi/2",
	   function () {
	       var x = 25 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(25);
	       expect(y[1]).toBe(2.45548340466059e-16);
	       expect(y[2]).toBe(4.567676892442579e-34);
	   });

	it("26*pi/2",
	   function () {
	       var x = 26 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(26);
	       expect(y[1]).toBe(1.9606728399089416e-15);
	       expect(y[2]).toBe(1.6219152396712146e-31);
	   });

	it("27*pi/2",
	   function () {
	       var x = 27 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(27);
	       expect(y[1]).toBe(-3.4296300182491773e-15);
	       expect(y[2]).toBe(7.740724736343248e-32);
	   });

	it("28*pi/2",
	   function () {
	       var x = 28 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(28);
	       expect(y[1]).toBe(-1.7145055188062944e-15);
	       expect(y[2]).toBe(-7.377029240256507e-33);
	   });

	it("29*pi/2",
	   function () {
	       var x = 29 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(29);
	       expect(y[1]).toBe(6.189806365883577e-19);
	       expect(y[2]).toBe(-5.5580050162563314e-36);
	   });

	it("30*pi/2",
	   function () {
	       var x = 30 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(30);
	       expect(y[1]).toBe(-5.3896838775215305e-15);
	       expect(y[2]).toBe(-1.7694558244763448e-31);
	   });

	it("31*pi/2",
	   function () {
	       var x = 31 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(31);
	       expect(y[1]).toBe(-3.674559378078648e-15);
	       expect(y[2]).toBe(-2.6172985905132346e-31);
	   });

	it("32*pi/2",
	   function () {
	       var x = 32 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(32);
	       expect(y[1]).toBe(-1.959434878635765e-15);
	       expect(y[2]).toBe(4.7916316955493457e-32);
	   });

	it("33*pi/2",
	   function () {
	       var x = 33 * Math.PI / 2;
	       var y = ieee754_rem_pio2(x);
	       expect(y[0]).toBe(33);
	       expect(y[1]).toBe(-2.443103791928823e-16);
	       expect(y[2]).toBe(1.243584692811771e-32);
	   });
    });

describe(
    "Test sin",
    function () {
	it("Small arg < pi/4",
	   function () {
	       var x = .5;
	       var y = sin(x);
	       expect(y).toBe(0.479425538604203e0);
	       y = sin(-x);
	       expect(y).toBe(-0.479425538604203e0);
	   });
	it("sin(Math.PI/2)",
	   function () {
	       var y = sin(Math.PI/2);
	       expect(y).toBe(1);
	       y = sin(-Math.PI/2);
	       expect(y).toBe(-1);
	   });
	it("sin(Math.PI) is not zero",
	   function () {
	       var y = sin(Math.PI);
	       expect(y).toBe(1.2246467991473532e-16);
	   });
	it("sin(2200*Math.PI)",
	   // https://code.google.com/p/v8/issues/detail?id=3006
	   function () {
	       var y = sin(2200*Math.PI);
	       expect(y).toBe(-7.047032979958965e-14);
	   });
	it("sin(.5e-4)",
	   // https://code.google.com/p/v8/issues/detail?id=3043
	   function () {
	       var y = sin(.5e-4);
	       expect(y).toBe(4.999999997916667e-5);
	   });
	it("Arg reduction n mod 4 = 0, x = 7/4*pi",
	   function () {
	       var x = 7/4 * Math.PI;
	       var y = sin(x);
	       // The answer is NOT -sqrt(1/2) because 7/4*Math.PI is
	       // slightly different from 7/4*pi!
	       expect(y).toBe(-0.7071067811865477e0);
	   });
	it("Arg reduction n mod 4 = 1, x = 9/4*pi",
	   function () {
	       var x = 9/4 * Math.PI;
	       var y = sin(x);
	       // The answer is NOT sqrt(1/2) because 9/4*Math.PI is
	       // slightly different from 9/4*pi!
	       expect(y).toBe(0.7071067811865474e0);
	   });
	it("Arg reduction n mod 4 = 2, x = 11/4*pi",
	   function () {
	       var x = 11/4 * Math.PI;
	       var y = sin(x);
	       // The answer is NOT sqrt(1/2) because 11/4*Math.PI is
	       // slightly different from 11/4*pi!
	       expect(y).toBe(0.7071067811865483e0);
	   });
	it("Arg reduction n mod 4 = 3, x = 13/4*pi",
	   function () {
	       var x = 13/4 * Math.PI;
	       var y = sin(x);
	       // The answer is NOT -sqrt(1/2) because 13/4*Math.PI is
	       // slightly different from 13/4*pi!
	       expect(y).toBe(-0.7071067811865479e0);
	   });
	it("Medium arg, x = 1048576/2*pi",
	   function () {
	       var x = 1048576/2 * Math.PI;
	       var y = sin(x);
	       expect(y).toBe(-6.420676210313675e-11);
	   });
    });

describe(
    "Test cos",
    function () {
	it("Small arg < pi/4",
	   function () {
	       var x = Math.pow(2, -28);
	       var y = cos(x);
	       expect(y).toBe(1);
	   });
	it("Test case |x| < 0.3",
	   function () {
	       var y = cos(0.25);
	       expect(y).toBe(0.9689124217106447e0);
	   });
	it("Test case |x| > .3 and |x| < .78125",
	   function () {
	       var y = cos(0.5);
	       expect(y).toBe(0.8775825618903728e0);
	   });
	it("Test case |x| > .78125",
	   function () {
	       var y = cos(0.785);
	       expect(y).toBe(0.7073882691671998e0);
	   });
	it("cos(Math.PI/2) is not zero",
	   function () {
	       var y = cos(Math.PI/2);
	       expect(y).toBe(6.123233995736766e-17);
	   });
	it("Arg reduction n mod 4 = 0, x = 7/4*pi",
	   function () {
	       var x = 7/4 * Math.PI;
	       var y = cos(x);
	       // The answer is NOT sqrt(1/2) because 7/4*Math.PI is
	       // slightly different from 7/4*pi!
	       expect(y).toBe(0.7071067811865474e0);
	   });
	it("Arg reduction n mod 4 = 1, x = 9/4*pi",
	   function () {
	       var x = 9/4 * Math.PI;
	       var y = cos(x);
	       // The answer is NOT sqrt(1/2) because 9/4*Math.PI is
	       // slightly different from 9/4*pi!
	       expect(y).toBe(0.7071067811865477e0);
	   });
	it("Arg reduction n mod 4 = 2, x = 11/4*pi",
	   function () {
	       var x = 11/4 * Math.PI;
	       var y = cos(x);
	       // The answer is NOT -sqrt(1/2) because 11/4*Math.PI is
	       // slightly different from 11/4*pi!
	       expect(y).toBe(-0.7071067811865467e0);
	   });
	it("Arg reduction n mod 4 = 3, x = 13/4*pi",
	   function () {
	       var x = 13/4 * Math.PI;
	       var y = cos(x);
	       // The answer is NOT -sqrt(1/2) because 13/4*Math.PI is
	       // slightly different from 13/4*pi!
	       expect(y).toBe(-0.7071067811865471e0);
	   });
	it("cos(1000000)",
	   // https://code.google.com/p/v8/issues/detail?id=3006
	   function () {
	       var y = cos(1000000);
	       expect(y).toBe(0.9367521275331447e0);
	   });
	it("Medium arg, x = 1048575/2*pi",
	   function () {
	       var x = 1048575/2 * Math.PI;
	       var y = cos(x);
	       expect(y).toBe(-3.435757038074824e-12);
	   });
    });

describe(
    "Test tan",
    function () {
	it("Small arg, x = 2^-28",
	   function () {
	       var x = Math.pow(2, -28);
	       var y = tan(x);
	       expect(y).toBe(x);
	   });
	it("tan(Math.PI/2), which is NOT Infinity",
	   function () {
	       var y = tan(Math.PI / 2);
	       expect(y).toBe(1.633123935319537e16);
	   });
	it("Test case |x| < .6744; (x = 0.5)",
	   function () {
	       var y = tan(0.5);
	       expect(y).toBe(0.5463024898437905e0);
	   });
	it("Test case |x| > .6744; (x = .6875)",
	   function () {
	       var y = tan(11/16);
	       expect(y).toBe(0.8211418015898941e0);
	   });
	it("tan(1.107148717794091) = 2.0000000000000027",
	   function () {
	       var y = tan(1.107148717794091e0);
	       expect(y).toBe(2.0000000000000027e0);
	   });
	it("Arg reduction, n even, x = 7/4*pi",
	   function () {
	       var y = tan(7/4*Math.PI);
	       // This is not exactly -1 because 7/4*Math.PI is not
	       // exactly 7/4*pi.
	       expect(y).toBe(-1.0000000000000004e0);
	   });
	it("Arg reduction, n odd, x = 9/4*pi",
	   function () {
	       var y = tan(9/4*Math.PI);
	       // This is not exactly 1 because 9/4*Math.PI is not
	       // exactly 9/4*pi.
	       expect(y).toBe(0.9999999999999994e0);
	   });
	it("Medium arg, x = 1048576*pi/2",
	   function () {
	       var x = 1048576/2*Math.PI;
	       var y = tan(x);
	       expect(y).toBe(-6.420676210313675e-11);
	   });
	it("Medium arg, x = 1048575*pi/2",
	   function () {
	       var x = 1048575/2*Math.PI;
	       var y = tan(x);
	       expect(y).toBe(2.910566692924059e11);
	   });
    });

	 
describe(
    "Test Payne-Hanek reduction",
    function () {
	it("2^120",
	   function () {
	       var x = Math.pow(2,120);
	       var y = ieee754_rem_pio2(x);
	       // expect(y[0]).toBe(6);
	       // expect(y[1]).toBe(-0.3874407610553695e0);
	       // expect(y[0]).toBe(-9.20673926649024e-18);
	   });
	it("-2^120",
	   function () {
	       var x = -Math.pow(2,120);
	       var y = ieee754_rem_pio2(x);
	       // expect(y[0]).toBe(-6);
	       // expect(y[1]).toBe(0.3874407610553695e0);
	       // expect(y[0]).toBe(9.20673926649024e-18);
	   });
	it("2^120*pi",
	   function () {
	       var x = Math.PI*Math.pow(2,120);
	       var y = ieee754_rem_pio2(x);
	       // expect(y[0]).toBe(5);
	       // expect(y[1]).toBe(0.3154834904134516e0);
	       // expect(y[0]).toBe(-2.35972819793514e-17);
	   });
    });

