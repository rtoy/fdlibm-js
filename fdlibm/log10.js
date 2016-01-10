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

// __ieee754_log10(x)
// Return the base 10 logarithm of x
// 
// Method :
//      Let log10_2hi = leading 40 bits of log10(2) and
//          log10_2lo = log10(2) - log10_2hi,
//          ivln10   = 1/log(10) rounded.
//      Then
//              n = ilogb(x), 
//              if(n<0)  n = n+1;
//              x = scalbn(x,-n);
//              log10(x) := n*log10_2hi + (n*log10_2lo + ivln10*log(x))
//
// Note 1:
//      To guarantee log10(10**n)=n, where 10**n is normal, the rounding 
//      mode must set to Round-to-Nearest.
// Note 2:
//      [1/log(10)] rounded to 53 bits has error  .198   ulps;
//      log10 is monotonic at all binary break points.
//
// Special cases:
//      log10(x) is NaN with signal if x < 0; 
//      log10(+INF) is +INF with no signal; log10(0) is -INF with signal;
//      log10(NaN) is that NaN with no signal;
//      log10(10**N) = N  for N=0,1,...,22.
//
// Constants:
// The hexadecimal values are the intended ones for the following constants.
// The decimal values may be used, provided that the compiler will convert
// from decimal to binary accurately enough to produce the hexadecimal values
// shown.
//

var ivln10     =  4.34294481903251816668e-01; /* 0x3FDBCB7B, 0x1526E50E */
var log10_2hi  =  3.01029995663611771306e-01; /* 0x3FD34413, 0x509F6000 */
var log10_2lo  =  3.69423907715893078616e-13; /* 0x3D59FEF3, 0x11F12B36 */

function log10(x) {
    if (x !== x || x < 0) {
        return 0 / 0;
    }
    if (x === 0) {
        return -1 / 0;
    }
    if (x === 1 / 0) {
        return 1 / 0;
    }
    var e = ilogb(x);
    if (e < 0) {
        e += 1;
    }
    return e * log10_2lo + ivln10 * Math.log(scalbn(x, -e)) + e * log10_2hi;
}
