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

// __ieee754_cosh(x)
// Method : 
// mathematically cosh(x) if defined to be (exp(x)+exp(-x))/2
//      1. Replace x by |x| (cosh(x) = cosh(-x)). 
//      2. 
//                                                      [ exp(x) - 1 ]^2 
//          0        <= x <= ln2/2  :  cosh(x) := 1 + -------------------
//                                                         2*exp(x)
//
//                                                exp(x) +  1/exp(x)
//          ln2/2    <= x <= 22     :  cosh(x) := -------------------
//                                                        2
//          22       <= x <= lnovft :  cosh(x) := exp(x)/2 
//          lnovft   <= x <= ln2ovft:  cosh(x) := exp(x/2)/2 * exp(x/2)
//          ln2ovft  <  x           :  cosh(x) := huge*huge (overflow)
//
// Special cases:
//      cosh(x) is |x| if x is +INF, -INF, or NaN.
//      only cosh(0)=1 is exact for finite x.
//

function cosh (x) {
    // x is Inf or NaN
    if (!isFinite(x)) {
        return x*x;
    }

    var ix = _DoubleHi(x) & 0x7fffffff;
    
    // |x| in [0,0.5*log2], return 1+expm1(|x|)^2/(2*exp(|x|))
    if (ix < 0x3fd62e43) {
        var t = expm1(Math.abs(x));
        var w = 1 + t;
        if (ix < 0x3c800000) {
            // |x| < 2^-55; cosh(tiny) = 1, 
            return w;
        }
        return 1 + (t*t)/(w + w);
    }

    // |x| in [0.5*log2, 22], return (exp(|x|)+1/exp(|x|)/2
    if (ix < 0x40360000) {
        var t = Math.exp(Math.abs(x));
        return 0.5*t + 0.5/t;
    }

    // |x| in [22, log(maxdouble)], return half*exp(|x|)
    if (ix < 0x40862e42) {
        return 0.5*Math.exp(Math.abs(x));
    }

    // |x| in [log(maxdouble), overflowthreshold]
    if (Math.abs(x) <= 710.4758600739439e0) {
        var w = Math.exp(0.5*Math.abs(x));
        var t = 0.5*w;
        return t*w;
    }

    // |x| > overflowthreshold, cosh(x) overflows
    return Infinity;
}
