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
// scalbn (double x, int n)
// scalbn(x,n) returns x* 2**n  computed by  exponent  
// manipulation rather than by actually performing an 
// exponentiation or a multiplication.
//
var huge = 1e300;
var tiny = 1e-300;
var two54 = Math.pow(2, 54);
var twom54 = Math.pow(2, -54);

function scalbn(x, n)

{
    var  k,hx,lx;
    hx = _DoubleHi(x);
    lx = _DoubleLo(x);
    k = (hx&0x7ff00000)>>20;		/* extract exponent */
    if (k==0) {				/* 0 or subnormal x */
        if ((lx|(hx&0x7fffffff))==0) return x; /* +-0 */
        x *= two54; 
        hx = _DoubleHi(x);
        k = ((hx&0x7ff00000)>>20) - 54; 
        if (n< -50000) return tiny*x; 	/*underflow*/
    }
    if (k==0x7ff) return x+x;		/* NaN or Inf */
    k = k+n; 
    if (k >  0x7fe) return huge*copysign(huge,x); /* overflow  */
    if (k > 0) { 				/* normal result */
        //_DoubleHi(x) = (hx&0x800fffff)|(k<<20);
        x = _ConstructDouble((hx&0x800fffff)|(k<<20), _DoubleLo(x));
        return x;
    }
    if (k <= -54)
        if (n > 50000) 	/* in case integer overflow in n+k */
            return huge*copysign(huge,x);	/*overflow*/
        else return tiny*copysign(tiny,x); 	/*underflow*/
    k += 54;				/* subnormal result */
    //__HI(x) = (hx&0x800fffff)|(k<<20);
    x = _ConstructDouble((hx&0x800fffff)|(k<<20), _DoubleLo(x));
    return x*twom54;
}
