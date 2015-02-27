//
// ====================================================
// Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
//
// Developed at SunSoft, a Sun Microsystems, Inc. business.
// Permission to use, copy, modify, and distribute this
// software is freely granted, provided that this notice 
// is preserved.
// ====================================================

// asinh(x)
// Method :
//      Based on 
//              asinh(x) = sign(x) * log [ |x| + sqrt(x*x+1) ]
//      we have
//      asinh(x) := x  if  1+x*x=1,
//               := sign(x)*(log(x)+ln2)) for large |x|, else
//               := sign(x)*log(2|x|+1/(|x|+sqrt(x*x+1))) if|x|>2, else
//               := sign(x)*log1p(|x| + x^2/(1 + sqrt(1+x^2)))  
//

function asinh (x) {
    if (!isFinite(x)) {
        // x is inf or NaN. Return x
        return x;
    }

    var ax = Math.abs(x);
    var w;
    
    if (ax < Math.pow(2,-28)) {
        // |x| < 2^-28, return x
        return x;
    }

    if (ax > Math.pow(2,28)) {
        // |x| > 2^28
        w = Math.log(ax) + Math.LN2;
    } else if (ax > 2) {
        // 2^28 >= |x| > 2
        w = Math.log(2 * ax + 1 / (Math.sqrt(x*x+1) + ax));
    } else {
        // 2 >= |x| > 2^-28
        var t = x*x;
        w = log1p(ax + t/(1 + Math.sqrt(1+t)));
    }
    if (x >= 0)
        return w;
    else
        return -w;
}
