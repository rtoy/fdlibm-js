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

// fdlibm does not have an explicit log2 function, but fdlibm's pow
// function does implement an accurate log2 function as part of the
// pow implementation.  This extracts the core parts of that as a
// separate log2 function.

// Method:
// Compute log2(x) in two pieces:
//   log2(x) = w1 + w2
// where w1 has 53-24 = 29 bits of trailing zeroes.

var bp = [1, 1.5];
var dp_h = [0, 5.84962487220764160156e-01];
var dp_l = [0, 1.35003920212974897128e-08];

// Polynomial coefficients for (3/2)*(log2(x) - 2*s - 2/3*s^3)
var L1  =  5.99999999999994648725e-01; // 0x3FE33333, 0x33333303
var L2  =  4.28571428578550184252e-01; // 0x3FDB6DB6, 0xDB6FABFF
var L3  =  3.33333329818377432918e-01; // 0x3FD55555, 0x518F264D
var L4  =  2.72728123808534006489e-01; // 0x3FD17460, 0xA91D4101
var L5  =  2.30660745775561754067e-01; // 0x3FCD864A, 0x93C9DB65
var L6  =  2.06975017800338417784e-01; // 0x3FCA7E28, 0x4A454EEF

// cp = 2/(3*ln(2)). Note that cp_h + cp_l is cp, but with more accuracy.
var cp    =  9.61796693925975554329e-01; // 0x3FEEC709, 0xDC3A03FD =2/(3ln2)
var cp_h  =  9.61796700954437255859e-01; // 0x3FEEC709, 0xE0000000 =(float)cp
var cp_l  = -7.02846165095275826516e-09; // 0xBE3E2FE0, 0x145B01F5 =tail of cp_h

function log2 (x)
{
    var ax = Math.abs(x);
    var hx = _DoubleHi(x);
    var lx = _DoubleLo(x);
    var ix = hx & 0x7fffffff;

    // Handle special cases
    if ((ix | lx) == 0) {
        // log2(+/- 0) = -Infinity
        return -Infinity;
    }

    if (hx < 0) {
        // log(x) = NaN, if x < 0
        return NaN;
    }

    if (ix >= 0x7ff00000) {
        // log2(Infinity) = Infinity
        // log2(NaN) = NaN
        return x;
    }
    
    var n = 0;

    // Take care of subnormal number
    if (ix < 0x00100000) {
        ax *= Math.pow(2, 53);
        n -= 53;
        ix = _DoubleHi(ax);
    }

    n += (ix >> 20) - 0x3ff;
    var j = ix & 0x000fffff;

    // Determine interval
    ix = j | 0x3ff00000;  // normalize ix

    var k;

    // console.log("n = " + n);
    // console.log("j = " + j);
    // console.log("ix = " + ix);

    if (j <= 0x3988e) {
        // |x| < sqrt(3/2)
        k = 0;
    } else if (j < 0xbb67a) {
        // |x| < sqrt(3)
        k = 1;
    } else {
        k = 0;
        n += 1;
        ix -= 0x00100000;
    }
    
    ax = _ConstructDouble(ix, _DoubleLo(ax));

    // console.log("ax = " + ax);

    // Compute ss = s_h + s_l = (x - 1)/(x+1) or (x - 1.5)/(x + 1.5)
    var u = ax - bp[k];
    var v = 1 / (ax + bp[k]);
    var ss = u * v;
    var s_h = _ConstructDouble(_DoubleHi(ss), 0);

    // t_h = ax + bp[k] High
    var t_h = _ConstructDouble(((ix >> 1) | 0x20000000) + 0x00080000 + (k << 18), 0);
    var t_l = ax - (t_h - bp[k]);
    var s_l = v * ((u - s_h * t_h) - s_h * t_l);

    // Compute log2(ax)
    var s2 = ss * ss;
    var r = s2 * s2 * (L1 + s2 * (L2 + s2 * (L3 + s2 * (L4 + s2 * (L5 + s2 * L6)))));
    r += s_l *(s_h + ss);
    s2  = s_h * s_h;
    t_h = _ConstructDouble(_DoubleHi(3.0 + s2 + r), 0);
    t_l = r - ((t_h - 3.0) - s2);
    // u+v = ss*(1+...)
    u = s_h * t_h;
    v = s_l * t_h + t_l * ss;

    // 2/(3log2)*(ss+...)
//    p_h = u + v;
//    __LO(p_h) = 0;
    p_h = _ConstructDouble(_DoubleHi(u + v), 0);
    p_l = v - (p_h - u);
    z_h = cp_h * p_h;           // cp_h+cp_l = 2/(3*log2)
    z_l = cp_l * p_h + p_l * cp + dp_l[k];
    // log2(ax) = (ss+..)*2/(3*log2) = n + dp_h + z_h + z_l
    var t = n;

//    t1 = (((z_h+z_l)+dp_h[k])+t);
//    __LO(t1) = 0;
    var t1 = _ConstructDouble(_DoubleHi(((z_h + z_l) + dp_h[k]) + t), 0);
    var t2 = z_l - (((t1 - t) - dp_h[k]) - z_h);

    // Now t1 + t2 = log2(ax), but we don't need the extra precision so just sum them up.
    return t1 + t2;
}



