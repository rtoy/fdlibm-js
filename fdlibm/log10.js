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
    var hx = _DoubleHi(x);
    var lx = _DoubleLo(x);
    var k = 0;

    if (hx < 0x00100000) {
        // x < 2^-1022
        // log10(+/- 0) = -Infinity
        if (((hx&0x7fffffff)|lx) == 0)
            return -Infinity;
        // log10 of negative number is NaN
        if (hx<0)
            return NaN;
        // subnormal number. scale up x
        k -= 54;
        x *= Math.pow(2, 54);
        hx = _DoubleHi(x);
        lx = _DoubleLo(x);
        //console.log("subnormal: k = " + k + ", x = " + x + ", hx = " + hx);
        //console.log("lx = " + _DoubleLo(x));
        //console.log("x = " + x);
    }

    // Infinity or NaN
    if (hx >= 0x7ff00000)
        return x;

    //console.log("hx = " + hx);
    k += (hx >> 20) - 1023;
    i = (k & 0x80000000) >>> 31;
    hx = (hx & 0x000fffff) | ((0x3ff - i) << 20);
    //console.log("k = " + k);
    //console.log("i = " + i);
    //console.log("hx = " + hx);
    y = k + i;
    x = _ConstructDouble(hx, _DoubleLo(x));
    //console.log("y = " + y);
    //console.log("new x = " + x + ", hi, lo = " + _DoubleHi(x) + " " + _DoubleLo(x));

    z = y * log10_2lo + ivln10 * Math.log(x);
    //console.log("z = " + z);
    
    return z + y * log10_2hi;
}
