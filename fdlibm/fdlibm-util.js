function _DoubleHi(f) {
    // Return the most significant 32 bits of a double float number.
    // This contains the sign, exponent, and 21 bits of the mantissa.
    var buf = new ArrayBuffer(8);
    (new Float64Array(buf))[0] = f;
    // Index 1 if the machine is little-endian.  Use index 0 for big-endian.
    var hi = (new Uint32Array(buf))[1];

    // Return as a signed integer
    return hi | 0;
}

function _DoubleLo(f) {
    // Return the least significant 32 bits of a double float number.
    // This contains the lower 32 bits of the mantissa.
    var buf = new ArrayBuffer(8);
    (new Float64Array(buf))[0] = f;
    // Index 1 if the machine is little-endian.  Use index 1 for big-endian.
    var lo = (new Uint32Array(buf))[0];

    return lo;
}

function _ConstructDouble(high, low)
{
    var buf = new ArrayBuffer(8);
    // This following is for a little-endian machine.  For a
    // big-endian machine reverse the indices.
    (new Uint32Array(buf))[1] = high;
    (new Uint32Array(buf))[0] = low;
    return new Float64Array(buf)[0];
}

// Relative error
function relerr(actual, expected)
{
    return Math.abs(actual - expected) / expected;
}

// Verbose logging level. 0 means no messages.
var verbose = 0;
