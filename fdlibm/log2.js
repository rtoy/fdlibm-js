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

// fdlibm does not have an explicit log2 function
// This code is based on the same idea as the log10 implementation.

function log2 (x) {
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
    return Math.LOG2E * Math.log(scalbn(x, -e)) + e;
}
