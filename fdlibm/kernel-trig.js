// A straightforward translation of fdlibm routines for sin, cos, and
// tan, by Raymond Toy (rtoy@google.com).

// __kernel_sin( x, y, iy)
// kernel sin function on [-pi/4, pi/4], pi/4 ~ 0.7854
// Input x is assumed to be bounded by ~pi/4 in magnitude.
// Input y is the tail of x.
// Input iy indicates whether y is 0. (if iy=0, y assume to be 0). 
//
// Algorithm
//      1. Since ieee_sin(-x) = -ieee_sin(x), we need only to consider positive x. 
//      2. if x < 2^-27 (hx<0x3e400000 0), return x with inexact if x!=0.
//      3. ieee_sin(x) is approximated by a polynomial of degree 13 on
//         [0,pi/4]
//                               3            13
//              sin(x) ~ x + S1*x + ... + S6*x
//         where
//      
//      |ieee_sin(x)         2     4     6     8     10     12  |     -58
//      |----- - (1+S1*x +S2*x +S3*x +S4*x +S5*x  +S6*x   )| <= 2
//      |  x                                               | 
// 
//      4. ieee_sin(x+y) = ieee_sin(x) + sin'(x')*y
//                  ~ ieee_sin(x) + (1-x*x/2)*y
//         For better accuracy, let 
//                   3      2      2      2      2
//              r = x *(S2+x *(S3+x *(S4+x *(S5+x *S6))))
//         then                   3    2
//              sin(x) = x + (S1*x + (x *(r-y/2)+y))
///
function kernel_sin(x, y, yNotZero)
{
    var S1  = -1.66666666666666324348e-01; // 0xBFC55555, 0x55555549
    var S2  =  8.33333333332248946124e-03; // 0x3F811111, 0x1110F8A6
    var S3  = -1.98412698298579493134e-04; // 0xBF2A01A0, 0x19C161D5
    var S4  =  2.75573137070700676789e-06; // 0x3EC71DE3, 0x57B1FE7D
    var S5  = -2.50507602534068634195e-08; // 0xBE5AE5E6, 0x8A2B9CEB
    var S6  =  1.58969099521155010221e-10; // 0x3DE5D93A, 0x5ACFD57C

    // fdlibm had ix < 0x3e400000.  This is the same as abs(x) <
    // 7.450587702351184d-9, where this constant is 0x3e400000
    // 0xffffffff.
    if (Math.abs(x) < 7.450587702351184e-9) {
        // We do not implement the part about signaling inexact when x is small.
        return x;
    }

    var z = x*x;
    var v = z*x;
    var r = S2+z*(S3+z*(S4+z*(S5+z*S6)));
    if (!yNotZero) {
        return x+v*(S1+z*r);
    } else {
        return x-((z*(0.5*y-v*r)-y)-v*S1);
    }
}

// __kernel_cos( x,  y )
// kernel cos function on [-pi/4, pi/4], pi/4 ~ 0.785398164
// Input x is assumed to be bounded by ~pi/4 in magnitude.
// Input y is the tail of x. 
//
// Algorithm
//      1. Since ieee_cos(-x) = ieee_cos(x), we need only to consider positive x.
//      2. if x < 2^-27 (hx<0x3e400000 0), return 1 with inexact if x!=0.
//      3. ieee_cos(x) is approximated by a polynomial of degree 14 on
//         [0,pi/4]
//                                       4            14
//              cos(x) ~ 1 - x*x/2 + C1*x + ... + C6*x
//         where the remez error is
//      
//      |              2     4     6     8     10    12     14 |     -58
//      |ieee_cos(x)-(1-.5*x +C1*x +C2*x +C3*x +C4*x +C5*x  +C6*x  )| <= 2
//      |                                                      | 
// 
//                     4     6     8     10    12     14 
//      4. let r = C1*x +C2*x +C3*x +C4*x +C5*x  +C6*x  , then
//             ieee_cos(x) = 1 - x*x/2 + r
//         since ieee_cos(x+y) ~ ieee_cos(x) - ieee_sin(x)*y 
//                        ~ ieee_cos(x) - x*y,
//         a correction term is necessary in ieee_cos(x) and hence
//              cos(x+y) = 1 - (x*x/2 - (r - x*y))
//         For better accuracy when x > 0.3, let qx = |x|/4 with
//         the last 32 bits mask off, and if x > 0.78125, let qx = 0.28125.
//         Then
//              cos(x+y) = (1-qx) - ((x*x/2-qx) - (r-x*y)).
//         Note that 1-qx and (x*x/2-qx) is EXACT here, and the
//         magnitude of the latter is at least a quarter of x*x/2,
//         thus, reducing the rounding error in the subtraction.
function kernel_cos(x, y)
{
    if (Math.abs(x) < 7.450587702351184e-9) {
        // We do not implement the part about signaling inexact when x is small.
        return 1.0;
    }

    var C1  =  4.16666666666666019037e-02; //  0x3FA55555, 0x5555554C
    var C2  = -1.38888888888741095749e-03; //  0xBF56C16C, 0x16C15177
    var C3  =  2.48015872894767294178e-05; //  0x3EFA01A0, 0x19CB1590
    var C4  = -2.75573143513906633035e-07; //  0xBE927E4F, 0x809C52AD
    var C5  =  2.08757232129817482790e-09; //  0x3E21EE9E, 0xBDB4B1C4
    var C6  = -1.13596475577881948265e-11; //  0xBDA8FAE9, 0xBE8838D4

    var absx = Math.abs(x);
    var z = x*x;
    var r = z*(C1+z*(C2+z*(C3+z*(C4+z*(C5+z*C6)))));

    // fdlibm had ix < 0x3fd33333. This implies abs(x) < 0.3000001907348632e0, where
    // the constant is 0x3fd33333, 0xffffffff.
    if (absx < 0.3000001907348632e0) {
        return 1 - (0.5*z - (z*r - x*y));
    } else {
        var qx;
        // fdblim had ix > 0x3fe90000.  This implies abs(x) > 0.78125
        // because 0x3fe90000 is 0.78125.
        if (absx > 0.78125) {
            qx = 0.28125;
        } else {
            // qx = x/4, but the low 32 bits are of the product are slammed to zero.
            qx = _ConstructDouble(_DoubleHi(0.25*x), 0);
        }

        var hz = 0.5*z - qx;
        var a = 1 - qx;
        return a - (hz - (z*r - x*y));
    }
}
    
// kernel tan function on [-pi/4, pi/4], pi/4 ~ 0.7854
// Input x is assumed to be bounded by ~pi/4 in magnitude.
// Input y is the tail of x.
// Input k indicates whether ieee_tan (if k = 1) or -1/tan (if k = -1) is returned.
//
// Algorithm
//      1. Since ieee_tan(-x) = -ieee_tan(x), we need only to consider positive x.
//      2. if x < 2^-28 (hx<0x3e300000 0), return x with inexact if x!=0.
//      3. ieee_tan(x) is approximated by a odd polynomial of degree 27 on
//         [0,0.67434]
//                               3             27
//              tan(x) ~ x + T1*x + ... + T13*x
//         where
//
//              |ieee_tan(x)         2     4            26   |     -59.2
//              |----- - (1+T1*x +T2*x +.... +T13*x    )| <= 2
//              |  x                                    |
//
//         Note: ieee_tan(x+y) = ieee_tan(x) + tan'(x)*y
//                        ~ ieee_tan(x) + (1+x*x)*y
//         Therefore, for better accuracy in computing ieee_tan(x+y), let
//                   3      2      2       2       2
//              r = x *(T2+x *(T3+x *(...+x *(T12+x *T13))))
//         then
//                                  3    2
//              tan(x+y) = x + (T1*x + (x *(r+y)+y))
//
//      4. For x in [0.67434,pi/4],  let y = pi/4 - x, then
//              tan(x) = ieee_tan(pi/4-y) = (1-ieee_tan(y))/(1+ieee_tan(y))
//                     = 1 - 2*(ieee_tan(y) - (ieee_tan(y)^2)/(1+ieee_tan(y)))

// Set returnTan to 1 for tan; -1 for cot.  Anything else is illegal
// and will cause incorrect results.
function kernel_tan(x, y, returnTan)
{
    var z;
    var w;
    var hx = _DoubleHi(x);
    var ix = hx & 0x7fffffff;
    
    if (ix < 0x3e300000) {
        // x < 2^-28
        // We don't try to generate inexact.
        if (((ix | _DoubleLo(x)) | (returnTan + 1)) == 0) {
            return 1 / Math.abs(x);
        } else {
            if (returnTan == 1) {
                return x;
            } else {
                // Compute -1/(x + y) carefully
                var w = x + y;
                var z = _ConstructDouble(_DoubleHi(w), 0);
                var v = y - (z - x);
                var a = -1 / w;
                var t = _ConstructDouble(_DoubleHi(a), 0);
                var s = 1 + t * z;
                return t + a * (s + t * v);
            }
        }
    }
    if (ix >= 0x3fe59428) {
        // |x| > .6744
        if (x < 0) {
            x = -x;
            y = -y;
        }
        var pio4 = 7.85398163397448278999e-01; // 3FE921FB, 54442D18
        var pio4lo = 3.06161699786838301793e-17; // 3C81A626, 33145C07
        z = pio4 - x;
        w = pio4lo - y;
        x = z + w;
        y = 0;
        /* istanbul ignore if */
        if (verbose > 0)
            console.log("|x| > .6744; x = " + x);
    }
    z = x * x;
    w = z * z;

    //
    // Break x^5*(T[1]+x^2*T[2]+...) into
    // x^5(T[1]+x^4*T[3]+...+x^20*T[11]) +
    // x^5(x^2*(T[2]+x^4*T[4]+...+x^22*[T12]))
    //
    var T0  = 3.33333333333334091986e-01;       /* 3FD55555, 55555563 */
    var T1  = 1.33333333333201242699e-01;       /* 3FC11111, 1110FE7A */
    var T2  = 5.39682539762260521377e-02;       /* 3FABA1BA, 1BB341FE */
    var T3  = 2.18694882948595424599e-02;       /* 3F9664F4, 8406D637 */
    var T4  = 8.86323982359930005737e-03;       /* 3F8226E3, E96E8493 */
    var T5  = 3.59207910759131235356e-03;       /* 3F6D6D22, C9560328 */
    var T6  = 1.45620945432529025516e-03;       /* 3F57DBC8, FEE08315 */
    var T7  = 5.88041240820264096874e-04;       /* 3F4344D8, F2F26501 */
    var T8  = 2.46463134818469906812e-04;       /* 3F3026F7, 1A8D1068 */
    var T9  = 7.81794442939557092300e-05;       /* 3F147E88, A03792A6 */
    var T10 = 7.14072491382608190305e-05;       /* 3F12B80F, 32F0A7E9 */
    var T11 =-1.85586374855275456654e-05;       /* BEF375CB, DB605373 */
    var T12 = 2.59073051863633712884e-05;       /* 3EFB2A70, 74BF7AD4 */

    var r = T1 + w * (T3 + w * (T5 + w * (T7 + w * (T9 + w * T11))));
    var v = z * (T2 + w * (T4 + w * (T6 + w * (T8 + w * (T10 + w * T12)))));
    var s = z * x;
    r = y + z * (s * (r + v) + y);
    r = r + T0 * s;
    w = x + r;
    if (ix >= 0x3fe59428) {
        /* istanbul ignore if */
        if (verbose > 0) {
            console.log("hx = " + hx);
            console.log("scale = " + (1 - ((hx >> 30) & 2)));
        }
        return (1 - ((hx >> 30) & 2)) *
            (returnTan - 2.0 * (x - (w * w / (w + returnTan) - r)));
    }
    if (returnTan == 1) {
        return w;
    } else {
        // Compute -1/(x+r) accurately
        z = _ConstructDouble(_DoubleHi(w), 0);
        v = r - (z - x); // z+v = r+x
        var a = -1 / w;
        var t = _ConstructDouble(_DoubleHi(a), 0);
        s = 1 + t*z;
        return t + a*(s + t*v);
    }
}

//
// Table of constants for 2/pi, 396 Hex digits (476 decimal) of 2/pi 
//
var two_over_pi = new Int32Array(
    [
        0xA2F983, 0x6E4E44, 0x1529FC, 0x2757D1, 0xF534DD, 0xC0DB62, 
        0x95993C, 0x439041, 0xFE5163, 0xABDEBB, 0xC561B7, 0x246E3A, 
        0x424DD2, 0xE00649, 0x2EEA09, 0xD1921C, 0xFE1DEB, 0x1CB129, 
        0xA73EE8, 0x8235F5, 0x2EBB44, 0x84E99C, 0x7026B4, 0x5F7E41, 
        0x3991D6, 0x398353, 0x39F49C, 0x845F8B, 0xBDF928, 0x3B1FF8, 
        0x97FFDE, 0x05980F, 0xEF2F11, 0x8B5A0A, 0x6D1F6D, 0x367ECF, 
        0x27CB09, 0xB74F46, 0x3F669E, 0x5FEA2D, 0x7527BA, 0xC7EBE5, 
        0xF17B3D, 0x0739F7, 0x8A5292, 0xEA6BFB, 0x5FB11F, 0x8D5D08, 
        0x560330, 0x46FC7B, 0x6BABF0, 0xCFBC20, 0x9AF436, 0x1DA9E3, 
        0x91615E, 0xE61B08, 0x659985, 0x5F14A0, 0x68408D, 0xFFD880, 
        0x4D7327, 0x310606, 0x1556CA, 0x73A8C9, 0x60E27B, 0xC08C6B, 
     ]);

var invpio2 =  6.36619772367581382433e-01; // 0x3FE45F30, 0x6DC9C883
var pio2_1  =  1.57079632673412561417e+00; // 0x3FF921FB, 0x54400000
var pio2_1t =  6.07710050650619224932e-11; // 0x3DD0B461, 0x1A626331
var pio2_2  =  6.07710050630396597660e-11; // 0x3DD0B461, 0x1A600000
var pio2_2t =  2.02226624879595063154e-21; // 0x3BA3198A, 0x2E037073
var pio2_3  =  2.02226624871116645580e-21; // 0x3BA3198A, 0x2E000000
var pio2_3t =  8.47842766036889956997e-32; // 0x397B839A, 0x252049C1

// Table of values of multiples of pi/2 from pi/2 to 50*pi/2. This is
// used as a quick check to see if an argument is close to a multiple
// of pi/2 and needs extra bits for reduction.  This array contains
// the high word the multiple of pi/2.

var npio2_hw = new Int32Array(
    [0x3FF921FB, 0x400921FB, 0x4012D97C, 0x401921FB, 0x401F6A7A, 0x4022D97C,
     0x4025FDBB, 0x402921FB, 0x402C463A, 0x402F6A7A, 0x4031475C, 0x4032D97C,
     0x40346B9C, 0x4035FDBB, 0x40378FDB, 0x403921FB, 0x403AB41B, 0x403C463A,
     0x403DD85A, 0x403F6A7A, 0x40407E4C, 0x4041475C, 0x4042106C, 0x4042D97C,
     0x4043A28C, 0x40446B9C, 0x404534AC, 0x4045FDBB, 0x4046C6CB, 0x40478FDB,
     0x404858EB, 0x404921FB
     ]);

// Table of values of multiples of pi/2 from pi/2 to 31*pi/2. This is
// the low word corresponding to the values in npio2_hw. Thus
// npio2_hw[k] and npio2_lw[k] form to make a double float value for
// (k+1)*pi/2.
var npio2_lw = new Int32Array(
    [0x54442D18, 0x54442D18, 0x7F3321D2, 0x54442D18, 0x2955385E, 0x7F3321D2,
     0xE9BBA775, 0x54442D18, 0xBECCB2BB, 0x2955385E, 0xC9EEDF00, 0x7F3321D2,
     0x347764A4, 0xE9BBA775, 0x9EFFEA46, 0x54442D18, 0x09886FEA, 0xBECCB2BB,
     0x7410F58C, 0x2955385E, 0xEF4CBD98, 0xC9EEDF00, 0xA4910069, 0x7F3321D2,
     0x59D5433B, 0x347764A4, 0x0F19860C, 0xE9BBA775, 0xC45DC8DE, 0x9EFFEA46,
     0x79A20BAF, 0x54442D18
     ]);

// rempi2_y0 and rempi2_y1 are the actual values for
// ieee754_rem_pio2(x) when x is an exact (floating-point) multiple of
// pi/2.
var rempi2_y0 = new Float64Array(
    [-6.123233995736766e-17, -1.2246467991473532e-16, -1.8369701987210297e-16,
     -2.4492935982947064e-16, -3.061616997868383e-16, -3.6739403974420594e-16,
     -4.286263797015736e-16, -4.898587196589413e-16, -5.51091059616309e-16,
     -6.123233995736766e-16, -2.4499125789312946e-15, -7.347880794884119e-16,
     9.803364199544708e-16, -8.572527594031472e-16, -2.6948419387607653e-15,
     -9.797174393178826e-16, 7.354070601250002e-16, -1.102182119232618e-15,
     -2.939771298590236e-15, -1.2246467991473533e-15, 4.904777002955296e-16,
     -4.899825157862589e-15, -3.1847006584197066e-15, -1.4695761589768238e-15,
     2.45548340466059e-16, 1.9606728399089416e-15, -3.4296300182491773e-15,
     -1.7145055188062944e-15, 6.189806365883577e-19, -5.3896838775215305e-15,
     -3.674559378078648e-15, -1.959434878635765e-15
     ]);

var rempi2_y1 = new Float64Array(
    [1.4974857633995285e-33, 2.994769809718341e-33, -7.833796929500809e-33,
     5.989539619436682e-33, 1.981287616837413e-32, -1.5667593859001618e-32,
     -1.8442573100641268e-33, 1.1979079238873364e-32, 2.5802415787810855e-32,
     3.962575233674826e-32, -1.437661374195672e-31, -3.1335187718003235e-32,
     8.109576198356073e-32, -3.6885146201282536e-33, -8.847279122381724e-32,
     2.3958158477746728e-32, 3.778149502668422e-32, 5.160483157562171e-32,
     -3.317944502806745e-32, 7.925150467349652e-32, -5.532771930192468e-33,
     -2.875322748391344e-31, 2.2113901167682514e-32, -6.267037543600647e-32,
     4.567676892442579e-34, 1.6219152396712146e-31, 7.740724736343248e-32,
     -7.377029240256507e-33, -5.5580050162563314e-36, -1.7694558244763448e-31,
     -2.6172985905132346e-31, 4.7916316955493457e-32]);

// Compute k and r such that x - k*pi/2 = r where |r| < pi/4. For
// precision, r is returned as two values y0 and y1 such that r = y0
// + y1 to more than double precision.
function ieee754_rem_pio2(x)
{
    var z, w, t, r, fn;
    var e0, i, j, nx, n;
    var y0, y1;
    
    var hx = _DoubleHi(x);
    var ix = hx & 0x7fffffff;

    if (ix <= 0x3fe921fb) {
        // |x| < ~<= pi/4, no need for reduction
        return [0, x, 0];
    }

//    if (ix < 0x4002d97c) {
    // ix < 0x4002d97c is the same as |x| <= _ConstructDouble(0x4002d97b, 0xffffffff)
    if (Math.abs(x) <= _ConstructDouble(0x4002d97b, 0xffffffff)) {
        // |x| ~< 3*pi/4, special case with n = +/- 1
        if (hx > 0) {
            z = x - pio2_1;
            if (ix != 0x3ff921fb) {
                // 33+53 bit pi is good enough
                y0 = z - pio2_1t;
                y1 = (z - y0) - pio2_1t;
            } else {
                // near pi/2, use 33+33+53 bit pi
                z -= pio2_2;
                y0 = z - pio2_2t;
                y1 = (z - y0) - pio2_2t;
            }
            return [1, y0, y1];
        } else {
            // Negative x
            z = x + pio2_1;
            if (ix != 0x3ff921fb) {
                // 33+53 bit pi is good enough
                y0 = z + pio2_1t;
                y1 = (z - y0) + pio2_1t;
            } else {
                // near pi/2, use 33+33+53 bit pi
                z += pio2_2;
                y0 = z + pio2_2t;
                y1 = (z - y0) + pio2_2t;
            }
            return [-1, y0, y1];
        }
    }

//    if (ix <= 0x413921fb) {
    // ix <= 0x413921fb is the same as |x| <= _ConstructDouble(0x413921fb, 0xffffffff)
    if (Math.abs(x) <= _ConstructDouble(0x413921fb, 0xffffffff)) {
        // |x| ~<= 2^19*(pi/2), medium size
        t = Math.abs(x);
        n = Math.floor(t * invpio2 + 0.5);
        fn = n;
        r = t - fn*pio2_1;
        w = fn*pio2_1t;
        // First round good to 85 bit
        if (n < 32 && ix != npio2_hw[n-1]) {
            // Quick check for cancellation
            y0 = r - w;
        } else if (n < 32 && _DoubleLo(x) == npio2_lw[n-1]) {
            // Exactly equal to a (machine) multiple of pi/2, so
            // lookup result instead of doing the third iteration that
            // would otherwise be needed.
            /* istanbul ignore if */
            if (verbose > 0)
                console.log("Exactly equal to pi/2*" + n);
            if (hx < 0) {
                return [-n, -rempi2_y0[n-1], -rempi2_y1[n-1]];
            } else {
                return [n, rempi2_y0[n-1], rempi2_y1[n-1]];
            }
        } else {
            j = ix >> 20;
            y0 = r - w;
            i = j - (_DoubleHi(y0)>>20) & 0x7ff;
            /* istanbul ignore if */
            if (verbose > 0)
                console.log("x = " + x + "; j = " + j + "; i = " + i);
            if (i > 16) {
                // 2nd iteration needed, good to 118
                t = r;
                w = fn * pio2_2;
                r = t - w;
                w = fn * pio2_2t - ((t - r) - w);
                y0 = r - w;
                i = j - (_DoubleHi(y0) >> 20) & 0x7ff;
                /* istanbul ignore if */
                if (verbose > 0)
                    console.log("2nd iteration; i = " + i + "; y0 = " + y0);
                if (i > 49) {
                    /* istanbul ignore if */
                    if (verbose > 0)
                        console.log("3rd iteration needed");
                    // 3rd iteration needed. 151 bits accuracy
                    t = r;
                    w = fn * pio2_3;
                    r = t - w;
                    w = fn * pio2_3t - ((t - r) - w);
                    y0 = r - w;
                }
            }
        }
        y1 = (r - y0) - w;
        if (hx < 0) {
            return [-n, -y0, -y1];
        } else {
            return [n, y0, y1];
        }
    }

    // All other large arguments
    if (ix >= 0x7ff00000) {
        // x is inf or NaN.  Return NaN.
        return [0, x - x, x - x];
    }

    // Need to do full Payne-Hanek reduction here!

    // set z = scalbn(|x|, ilogb(x)-23)
    e0 = (ix >> 20) - 1046;
    z = _ConstructDouble(ix - (e0 << 20), _DoubleLo(x));

    /* istanbul ignore if */
    if (verbose > 0) {
        console.log("x = " + x);
        console.log("z = " + z);
    }
    var tx = new Float64Array(3);
    for (i = 0; i < 2; i++) {
        tx[i] = Math.floor(z);
        z = (z - tx[i]) * 1.6777216e+07;
    }
    tx[2] = z;
    nx = 3;
    /* istanbul ignore if */
    if (verbose > 0) {
        console.log("tx[0] = " + tx[0]);
        console.log("tx[1] = " + tx[1]);
        console.log("tx[2] = " + tx[2]);
    }
    while (tx[nx - 1] == 0)
        --nx;
    /* istanbul ignore if */
    if (verbose > 0)
        console.log("Final nx = " + nx);

    // Call Payne-Hanek reduction
    var y = Array(3);
    n = kernel_rem_pio2(tx, y, e0, nx, 2, two_over_pi);
    /* istanbul ignore if */
    if (verbose > 0)
        console.log("rem: n = " + n + ", y = " + y);
    if (hx < 0) {
        return [-n, -y[0], -y[1]];
    } else {
       return [n, y[0], y[1]];
    }
}

function sin (x)
{
    var ix = _DoubleHi(x) & 0x7fffffff;

    if (ix <= 0x3fe921fb) {
        // |x| < pi/4, approximately.  No reduction needed.
        return kernel_sin(x, 0, 0);
    }

    if (ix >= 0x7ff00000) {
        // sin(Inf or NaN) is NaN
        return x - x;
    }

    // Argument reduction needed
    var y = ieee754_rem_pio2(x);
    var n = y[0] & 3;
    switch (n) {
      case 0:
          return kernel_sin(y[1], y[2], 1);
      case 1:
          return kernel_cos(y[1], y[2]);
      case 2:
          return -kernel_sin(y[1], y[2], 1);
      case 3:
          return -kernel_cos(y[1], y[2]);
    }
}

function cos (x)
{
    var ix = _DoubleHi(x) & 0x7fffffff;

    if (ix <= 0x3fe921fb) {
        // |x| < pi/4, approximately.  No reduction needed.
        return kernel_cos(x, 0);
    }

    if (ix >= 0x7ff00000) {
        // cos(Inf or NaN) is NaN
        return x - x;
    }

    // Argument reduction needed
    var y = ieee754_rem_pio2(x);
    var n = y[0] & 3;
    switch (n) {
      case 0:
          return kernel_cos(y[1], y[2]);
      case 1:
          return -kernel_sin(y[1], y[2], 1);
      case 2:
          return -kernel_cos(y[1], y[2]);
      case 3:
          return kernel_sin(y[1], y[2], 1);
    }
}


function tan (x)
{
    var ix = _DoubleHi(x) & 0x7fffffff;

    if (ix <= 0x3fe921fb) {
        // |x| < pi/4, approximately.  No reduction needed.
        return kernel_tan(x, 0, 1);
    }

    if (ix >= 0x7ff00000) {
        // tan(Inf or NaN) is NaN
        return x - x;
    }

    // Argument reduction needed
    var y = ieee754_rem_pio2(x);

    // flag is 1 if n is even and -1 if n is odd
    var flag;

    if ((y[0] & 1) == 0)
        flag = 1;
    else
        flag = -1;

    return kernel_tan(y[1], y[2], flag)
}
