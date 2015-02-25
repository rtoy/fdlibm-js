//
// ====================================================
// Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
//
// Developed at SunSoft, a Sun Microsystems, Inc. business.
// Permission to use, copy, modify, and distribute this
// software is freely granted, provided that this notice 
// is preserved.
// ====================================================
///

// __ieee754_log(x)
// Return the logrithm of x
//
// Method :                  
//   1. Argument Reduction: find k and f such that 
//			x = 2^k * (1+f), 
//	   where  sqrt(2)/2 < 1+f < sqrt(2) .
//
//   2. Approximation of log(1+f).
//	Let s = f/(2+f) ; based on log(1+f) = log(1+s) - log(1-s)
//		 = 2s + 2/3 s**3 + 2/5 s**5 + .....,
//	     	 = 2s + s*R
//      We use a special Reme algorithm on [0,0.1716] to generate 
// 	a polynomial of degree 14 to approximate R The maximum error 
//	of this polynomial approximation is bounded by 2**-58.45. In
//	other words,
//		        2      4      6      8      10      12      14
//	    R(z) ~ Lg1*s +Lg2*s +Lg3*s +Lg4*s +Lg5*s  +Lg6*s  +Lg7*s
//  	(the values of Lg1 to Lg7 are listed in the program)
//	and
//	    |      2          14          |     -58.45
//	    | Lg1*s +...+Lg7*s    -  R(z) | <= 2 
//	    |                             |
//	Note that 2s = f - s*f = f - hfsq + s*hfsq, where hfsq = f*f/2.
//	In order to guarantee error in log below 1ulp, we compute log
//	by
//		log(1+f) = f - s*(f - R)	(if f is not too large)
//		log(1+f) = f - (hfsq - s*(hfsq+R)).	(better accuracy)
//	
//	3. Finally,  log(x) = k*ln2 + log(1+f).  
//			    = k*ln2_hi+(f-(hfsq-(s*(hfsq+R)+k*ln2_lo)))
//	   Here ln2 is split into two floating point number: 
//			ln2_hi + ln2_lo,
//	   where n*ln2_hi is always exact for |n| < 2000.
//
// Special cases:
//	log(x) is NaN with signal if x < 0 (including -INF) ; 
//	log(+INF) is +INF; log(0) is -INF with signal;
//	log(NaN) is that NaN with no signal.
//
// Accuracy:
//	according to an error analysis, the error is always less than
//	1 ulp (unit in the last place).
//

var ln2_hi  =  6.93147180369123816490e-01;	// 3fe62e42 fee00000
var ln2_lo  =  1.90821492927058770002e-10;	// 3dea39ef 35793c76
var two54   =  1.80143985094819840000e+16;	// 43500000 00000000
var Lg1 = 6.666666666666735130e-01;	// 3FE55555 55555593
var Lg2 = 3.999999999940941908e-01;	// 3FD99999 9997FA04
var Lg3 = 2.857142874366239149e-01;	// 3FD24924 94229359
var Lg4 = 2.222219843214978396e-01;	// 3FCC71C5 1D8E78AF
var Lg5 = 1.818357216161805012e-01;	// 3FC74664 96CB03DE
var Lg6 = 1.531383769920937332e-01;	// 3FC39A09 D078C69F
var Lg7 = 1.479819860511658591e-01;     // 3FC2F112 DF3E5244

function log(x) {
    //console.log("arg = " + x);
    var hx = _DoubleHi(x);
    var lx = _DoubleLo(x);

    var k = 0;

    if (hx < 0x00100000) {			// x < 2**-1022 
        if (((hx & 0x7fffffff) | lx) == 0) 
            return -Infinity;		// log(+-0)=-inf
        if (hx<0) return NaN;	// log(-#) = NaN
        k -= 54;
        x *= two54; // subnormal number, scale up x
        hx = _DoubleHi(x);		// high word of x
    } 

    // x is infinity or NaN, so return infinity or NaN, respectively.
    if (hx >= 0x7ff00000)
        return x+x;

    k += (hx >> 20) - 1023;
    hx &= 0x000fffff;
    var i = (hx + 0x95f64) & 0x100000;
    //__HI(x) = hx|(i^0x3ff00000);

    // normalize x or x/2
    x = _ConstructDouble(hx|(i ^ 0x3ff00000), lx);
    k += (i >> 20);
    var f = x - 1.0;
    //console.log("x = " + x + ", k = " + k + ", f = " + f);
    var R;

    // Maybe replace this test with Math.abs(f) < 2^-20?
    if ((0x000fffff & (2+hx)) < 3) {	// |f| < 2**-20
        // I think the only way f = 0 is if x is a power of 2.
        if (f==0) {
            if (k==0)
                return 0;
            else {
                var dk = k;
                return dk * ln2_hi + dk * ln2_lo;
            }
        }
        R = f * f * (0.5 - 0.33333333333333333 * f);
        if (k == 0)
            return f - R;
        else {
            var dk = k;
            return dk * ln2_hi - ((R - dk * ln2_lo) - f);
        }
    }

    var s = f / (2.0 + f); 
    var dk = k;
    var z = s * s;

    // I think this computation of i, j is figuring out if f is not
    // too large.
    i = hx - 0x6147a;
    var j = 0x6b851 - hx;

    var w = z * z;
    //console.log("hx = " + hx + ", i = " + i + ", j = " + j);
    var t1= w * (Lg2 + w * (Lg4 + w * Lg6)); 
    var t2= z * (Lg1 + w * (Lg3 + w * (Lg5 + w * Lg7))); 

    i |= j;

    R = t2 + t1;

    if (i > 0) {
        // This appears to be handling the "better accuracy" case
        // given at the end of item 2, in the Method section above.
        
        //console.log("i = " + i + ", k = " + k);
        var hfsq = 0.5 * f * f;
        if (k == 0)
            return f - (hfsq - s * (hfsq + R));
        else
            return dk * ln2_hi - ((hfsq - (s * (hfsq + R) + dk * ln2_lo)) - f);
    } else {
        // This looks like the "f is not too large" case given at the
        // end of item 2, in the Method section above.
        
        //console.log("i = " + i + ", k = " + k);
        if (k == 0)
            return f - s * (f - R);
        else
            return dk * ln2_hi - ((s * (f - R) - dk * ln2_lo) - f);
    }
}
