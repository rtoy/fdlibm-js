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

// __ieee754_acosh(x)
// Method :
//      Based on 
//              acosh(x) = log [ x + sqrt(x*x-1) ]
//      we have
//              acosh(x) := log(x)+ln2, if x is large; else
//              acosh(x) := log(2x-1/(sqrt(x*x-1)+x)) if x>2; else
//              acosh(x) := log1p(t+sqrt(2.0*t+t*t)); where t=x-1.
//
// Special cases:
//      acosh(x) is NaN with signal if x<1.
//      acosh(NaN) is NaN without signal.
//

function acosh (x) {
    if (x < 1) {
        // x < 1 -> acosh = NaN
        return Infinity - Infinity;
    }
    if (x > Math.pow(2,28)) {
        // x > 2^28
        if (!isFinite(x)) {
            // x is infinite or NaN. Return infinity or NaN
            return x + x;
        }
        // acosh(huge) = log(2*x) = log(x) + log(2)
        return Math.log(x) + Math.LN2;
    }
    if (x === 1) {
        // acosh(1) = 0
        return 0;
    }
    if (x > 2) {
        // 2^28 > x > 2
        var t = x * x;
        return Math.log(2*x - 1/(x + Math.sqrt(t - 1)));
    }
    // 1 < x <= 2
    var t = x - 1;
    return log1p(t + Math.sqrt(2*t + t*t));
}

