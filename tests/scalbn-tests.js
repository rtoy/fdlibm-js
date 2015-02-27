describe(
    "Test exceptional cases",
    function () {
        it("scalbn(Infinity, 1) = Infinity",
           function () {
               var y = scalbn(Infinity, 1);
               expect(y).toBe(Infinity);
           });
        it("scalbn(-Infinity, 1) = -Infinity",
           function () {
               var y = scalbn(-Infinity, 1);
               expect(y).toBe(-Infinity);
           });
        it("scalbn(NaN, 1) = NaN",
           function () {
               var y = scalbn(NaN, 1);
               expect(y).toBeNaN();
           });
        it("scalbn(1, 50000) = Infinity",
           function () {
               var y = scalbn(1, 50000);
               expect(y).toBe(Infinity);
           });
        it("scalbn(-1, 50000) = -Infinity",
           function () {
               var y = scalbn(-1, 50000);
               expect(y).toBe(-Infinity);
           });
        it("scalbn(1, -50000) = 0",
           function () {
               var y = scalbn(1, -50000);
               expect(y).toBe(0);
           });
        it("scalbn(-1, -50000) = -0",
           function () {
               var y = 1/scalbn(-1, -50000);
               expect(y).toBe(-Infinity);
           });
        
    });

describe(
    "Test special values",
    function () {
        it("scalbn(0, 1) = 0",
           function () {
               var y = scalbn(0, 1);
               expect(y).toBe(0);
           });
        it("scalbn(-0, 1) = -0",
           function () {
               var y = 1/scalbn(-1/Infinity, 1);
               expect(y).toBe(-Infinity);
           });
        it("scalbn(2^-1043, 100) = 2^-943",
           function () {
               var y = scalbn(Math.pow(2, -1043), 100);
               expect(y).toBe(Math.pow(2,-943));
           });
        it("scalbn(2^-1043, -100) = 0",
           function () {
               var y = 1/scalbn(Math.pow(2, -1043), -100);
               expect(y).toBe(Infinity);
           });
        it("scalbn(2^-1043, -100000) = 0",
           function () {
               var y = 1/scalbn(Math.pow(2, -1043), -100000);
               expect(y).toBe(Infinity);
           });
        it("scalbn(2^-43, -1000) = 2^-1043)",
           function () {
               var y = scalbn(Math.pow(2,-43), -1000);
               expect(y).toBe(Math.pow(2,-1043));
           });
    });
