//
// ====================================================
// Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
//
// Developed at SunSoft, a Sun Microsystems, Inc. business.
// Permission to use, copy, modify, and distribute this
// software is freely granted, provided that this notice 
// is preserved.
// ====================================================
//

// __ieee754_sinh(x)
// Method : 
// mathematically sinh(x) if defined to be (exp(x)-exp(-x))/2
//	1. Replace x by |x| (sinh(-x) = -sinh(x)). 
//	2. 
//		                                    E + E/(E+1)
//	    0        <= x <= 22     :  sinh(x) := --------------, E=expm1(x)
//			       			        2
//
//	    22       <= x <= lnovft :  sinh(x) := exp(x)/2 
//	    lnovft   <= x <= ln2ovft:  sinh(x) := exp(x/2)/2 * exp(x/2)
//	    ln2ovft  <  x	    :  sinh(x) := x*shuge (overflow)
//
// Special cases:
//	sinh(x) is |x| if x is +INF, -INF, or NaN.
//	only sinh(0)=0 is exact for finite x.
//

function sinh (x) {
    // x is infinity or NaN. Return infinity or NaN.
    if (!isFinite(x)) {
        return x;
    }

    var h = (x < 0) ? -0.5 : 0.5;

    // |x| in [0, 22]. return sign(x)*0.5*(E+E/(E+1))
    var ax = Math.abs(x);
    if (ax < 22) {
        if (ax < Math.pow(2,-28)) {
            // |x| < 2^-28. sinh(tiny) = tiny
            return x;
        }
        var t = expm1(ax);
        if (ax < 1) {
            return h*(2*t - t*t/(t + 1));
        }
        return h*(t + t/(t + 1));
    }

    // |x| in [22, log(maxdouble)], return 0.5 * exp(|x|)
    // 0x40862e42 = high word of log(maxdouble)
    if (ax < _ConstructDouble(0x40862e42,0)) {
        return h*exp(ax);
    }

    // |x| in [log(maxdouble), overflowthreshold]
    // overflowthreshold = 710.4758600739426e0
    if (ax <= _ConstructDouble(0x408633ce, 0x8fb9f872)) {
        var w = exp(0.5*ax);
        var t = h * w;
        return t * w;
    }

    // |x| > overflowthreshold, sinh(x) overflows. Return infinity of
    // the appropriate sign.
    return x*1e300;
}
