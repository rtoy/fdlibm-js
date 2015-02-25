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
//

// __ieee754_atanh(x)
// Method :
//    1.Reduced x to positive by atanh(-x) = -atanh(x)
//    2.For x>=0.5
//                  1              2x                          x
//	atanh(x) = --- * log(1 + -------) = 0.5 * log1p(2 * --------)
//                  2             1 - x                      1 - x
//	
// 	For x<0.5
//	atanh(x) = 0.5*log1p(2x+2x*x/(1-x))
//
// Special cases:
//	atanh(x) is NaN if |x| > 1 with signal;
//	atanh(NaN) is that NaN with no signal;
//	atanh(+-1) is +-INF with signal.
//
//

function atanh (x) {
    var ax = Math.abs(x);
    
    if (ax > 1) {
        // tanh(x) = NaN for |x| > 1
        return (x - x) / (x - x);
    }

    if (ax == 1) {
        // tanh(+/-1) = +/-Infinity
        return x/0;
    }

    if (ax < Math.pow(2,-28)) {
        // tanh(x) = x for |x| < 2^-28
        return x;
    }

    var t;
    if (ax < 0.5) {
        // |x| < 0.5
        t = ax + ax;
        t = 0.5 * log1p(t + t*ax/(1 - ax));
    } else {
        // |x| >= 0.5
        t = 0.5 * log1p((ax + ax)/(1 - ax));
    }

    if (x >= 0) {
        return t;
    } else {
        return -t;
    }
}
