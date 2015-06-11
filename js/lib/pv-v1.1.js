/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.2.0
 */

/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


(function(_global) {
  "use strict";

  var shim = {};
  if (typeof(exports) === 'undefined') {
    if(typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
      shim.exports = {};
      define(function() {
        return shim.exports;
      });
    } else {
      // gl-matrix lives in a browser, define its namespaces in global
      shim.exports = typeof(window) !== 'undefined' ? window : _global;
    }
  }
  else {
    // gl-matrix lives in commonjs, define its namespaces in exports
    shim.exports = exports;
  }

  (function(exports) {
    /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


if(!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 0.000001;
}

if(!GLMAT_ARRAY_TYPE) {
    var GLMAT_ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
}

if(!GLMAT_RANDOM) {
    var GLMAT_RANDOM = Math.random;
}

/**
 * @class Common utilities
 * @name glMatrix
 */
var glMatrix = {};

/**
 * Sets the type of array used when creating new vectors and matricies
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix.setMatrixArrayType = function(type) {
    GLMAT_ARRAY_TYPE = type;
}

if(typeof(exports) !== 'undefined') {
    exports.glMatrix = glMatrix;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */

var vec2 = {};

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
vec2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = 0;
    out[1] = 0;
    return out;
};

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
vec2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
vec2.fromValues = function(x, y) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
vec2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
vec2.set = function(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
vec2.sub = vec2.subtract;

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
vec2.mul = vec2.multiply;

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};

/**
 * Alias for {@link vec2.divide}
 * @function
 */
vec2.div = vec2.divide;

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
vec2.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
vec2.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
vec2.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.distance}
 * @function
 */
vec2.dist = vec2.distance;

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec2.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
vec2.sqrDist = vec2.squaredDistance;

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
vec2.length = function (a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.length}
 * @function
 */
vec2.len = vec2.length;

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec2.squaredLength = function (a) {
    var x = a[0],
        y = a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
vec2.sqrLen = vec2.squaredLength;

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
vec2.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
vec2.normalize = function(out, a) {
    var x = a[0],
        y = a[1];
    var len = x*x + y*y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
vec2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
vec2.cross = function(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
vec2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
vec2.random = function (out, scale) {
    scale = scale || 1.0;
    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
};

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2d = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat3 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat4 = function(out, a, m) {
    var x = a[0], 
        y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
};

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec2.forEach = (function() {
    var vec = vec2.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 2;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec2.str = function (a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec2 = vec2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3 Dimensional Vector
 * @name vec3
 */

var vec3 = {};

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
vec3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
vec3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
vec3.fromValues = function(x, y, z) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
vec3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
vec3.set = function(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
vec3.sub = vec3.subtract;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
vec3.mul = vec3.multiply;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

/**
 * Alias for {@link vec3.divide}
 * @function
 */
vec3.div = vec3.divide;

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
vec3.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
vec3.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
vec3.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.distance}
 * @function
 */
vec3.dist = vec3.distance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec3.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
vec3.sqrDist = vec3.squaredDistance;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
vec3.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.length}
 * @function
 */
vec3.len = vec3.length;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec3.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
vec3.sqrLen = vec3.squaredLength;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
vec3.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
vec3.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x*x + y*y + z*z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
vec3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.cross = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
vec3.random = function (out, scale) {
    scale = scale || 1.0;

    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    var z = (GLMAT_RANDOM() * 2.0) - 1.0;
    var zScale = Math.sqrt(1.0-z*z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
    return out;
};

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat3 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
};

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
vec3.transformQuat = function(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec3.forEach = (function() {
    var vec = vec3.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 3;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec3.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec3 = vec3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4 Dimensional Vector
 * @name vec4
 */

var vec4 = {};

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
vec4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
};

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
vec4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
vec4.fromValues = function(x, y, z, w) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
vec4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
vec4.set = function(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
vec4.sub = vec4.subtract;

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
};

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
vec4.mul = vec4.multiply;

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
};

/**
 * Alias for {@link vec4.divide}
 * @function
 */
vec4.div = vec4.divide;

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
};

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
};

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
vec4.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
vec4.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
vec4.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.distance}
 * @function
 */
vec4.dist = vec4.distance;

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec4.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
vec4.sqrDist = vec4.squaredDistance;

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
vec4.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.length}
 * @function
 */
vec4.len = vec4.length;

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec4.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
vec4.sqrLen = vec4.squaredLength;

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
vec4.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
};

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
vec4.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var len = x*x + y*y + z*z + w*w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
        out[3] = a[3] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
vec4.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
};

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
vec4.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
vec4.random = function (out, scale) {
    scale = scale || 1.0;

    //TODO: This is a pretty awful way of doing this. Find something better.
    out[0] = GLMAT_RANDOM();
    out[1] = GLMAT_RANDOM();
    out[2] = GLMAT_RANDOM();
    out[3] = GLMAT_RANDOM();
    vec4.normalize(out, out);
    vec4.scale(out, out, scale);
    return out;
};

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
vec4.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
};

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
vec4.transformQuat = function(out, a, q) {
    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec4.forEach = (function() {
    var vec = vec4.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 4;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec4.str = function (a) {
    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec4 = vec4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x2 Matrix
 * @name mat2
 */

var mat2 = {};

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
mat2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
mat2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
mat2.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
    } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
    }
    
    return out;
};

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

        // Calculate the determinant
        det = a0 * a3 - a2 * a1;

    if (!det) {
        return null;
    }
    det = 1.0 / det;
    
    out[0] =  a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] =  a0 * det;

    return out;
};

/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.adjoint = function(out, a) {
    // Caching this value is nessecary if out == a
    var a0 = a[0];
    out[0] =  a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] =  a0;

    return out;
};

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
mat2.determinant = function (a) {
    return a[0] * a[3] - a[2] * a[1];
};

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a1 * b2;
    out[1] = a0 * b1 + a1 * b3;
    out[2] = a2 * b0 + a3 * b2;
    out[3] = a2 * b1 + a3 * b3;
    return out;
};

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
mat2.mul = mat2.multiply;

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a1 * s;
    out[1] = a0 * -s + a1 * c;
    out[2] = a2 *  c + a3 * s;
    out[3] = a2 * -s + a3 * c;
    return out;
};

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
mat2.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v1;
    out[2] = a2 * v0;
    out[3] = a3 * v1;
    return out;
};

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2.str = function (a) {
    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.mat2 = mat2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x3 Matrix
 * @name mat2d
 * 
 * @description 
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, b,
 *  c, d,
 *  tx,ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, b, 0
 *  c, d, 0
 *  tx,ty,1]
 * </pre>
 * The last column is ignored so the array is shorter and operations are faster.
 */

var mat2d = {};

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.create = function() {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */
mat2d.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.invert = function(out, a) {
    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
        atx = a[4], aty = a[5];

    var det = aa * ad - ab * ac;
    if(!det){
        return null;
    }
    det = 1.0 / det;

    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
};

/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */
mat2d.determinant = function (a) {
    return a[0] * a[3] - a[1] * a[2];
};

/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.multiply = function (out, a, b) {
    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
        atx = a[4], aty = a[5],
        ba = b[0], bb = b[1], bc = b[2], bd = b[3],
        btx = b[4], bty = b[5];

    out[0] = aa*ba + ab*bc;
    out[1] = aa*bb + ab*bd;
    out[2] = ac*ba + ad*bc;
    out[3] = ac*bb + ad*bd;
    out[4] = ba*atx + bc*aty + btx;
    out[5] = bb*atx + bd*aty + bty;
    return out;
};

/**
 * Alias for {@link mat2d.multiply}
 * @function
 */
mat2d.mul = mat2d.multiply;


/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
mat2d.rotate = function (out, a, rad) {
    var aa = a[0],
        ab = a[1],
        ac = a[2],
        ad = a[3],
        atx = a[4],
        aty = a[5],
        st = Math.sin(rad),
        ct = Math.cos(rad);

    out[0] = aa*ct + ab*st;
    out[1] = -aa*st + ab*ct;
    out[2] = ac*ct + ad*st;
    out[3] = -ac*st + ct*ad;
    out[4] = ct*atx + st*aty;
    out[5] = ct*aty - st*atx;
    return out;
};

/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/
mat2d.scale = function(out, a, v) {
    var vx = v[0], vy = v[1];
    out[0] = a[0] * vx;
    out[1] = a[1] * vy;
    out[2] = a[2] * vx;
    out[3] = a[3] * vy;
    out[4] = a[4] * vx;
    out[5] = a[5] * vy;
    return out;
};

/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/
mat2d.translate = function(out, a, v) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4] + v[0];
    out[5] = a[5] + v[1];
    return out;
};

/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2d.str = function (a) {
    return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.mat2d = mat2d;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3x3 Matrix
 * @name mat3
 */

var mat3 = {};

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
mat3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
mat3.fromMat4 = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
};

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
mat3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
mat3.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }
    
    return out;
};

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,

        // Calculate the determinant
        det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
};

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    out[0] = (a11 * a22 - a12 * a21);
    out[1] = (a02 * a21 - a01 * a22);
    out[2] = (a01 * a12 - a02 * a11);
    out[3] = (a12 * a20 - a10 * a22);
    out[4] = (a00 * a22 - a02 * a20);
    out[5] = (a02 * a10 - a00 * a12);
    out[6] = (a10 * a21 - a11 * a20);
    out[7] = (a01 * a20 - a00 * a21);
    out[8] = (a00 * a11 - a01 * a10);
    return out;
};

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
mat3.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b00 = b[0], b01 = b[1], b02 = b[2],
        b10 = b[3], b11 = b[4], b12 = b[5],
        b20 = b[6], b21 = b[7], b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
};

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
mat3.mul = mat3.multiply;

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
mat3.translate = function(out, a, v) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],
        x = v[0], y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
};

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.rotate = function (out, a, rad) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
mat3.scale = function(out, a, v) {
    var x = v[0], y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
mat3.fromMat2d = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
};

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
mat3.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[3] = xy + wz;
    out[6] = xz - wy;

    out[1] = xy - wz;
    out[4] = 1 - (xx + zz);
    out[7] = yz + wx;

    out[2] = xz + wy;
    out[5] = yz - wx;
    out[8] = 1 - (xx + yy);

    return out;
};

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
mat3.normalFromMat4 = function (out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
};

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat3.str = function (a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + 
                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.mat3 = mat3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4x4 Matrix
 * @name mat4
 */

var mat4 = {};

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    
    return out;
};

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
mat4.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
mat4.mul = mat4.multiply;

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.translate = function (out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.scale = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Rotates a mat4 by the given angle
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < GLMAT_EPSILON) { return null; }
    
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateZ = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    
    return out;
};

/**
* Calculates a 4x4 matrix from the given quaternion
*
* @param {mat4} out mat4 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat4} out
*/
mat4.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;

    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;

    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4.lookAt = function (out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < GLMAT_EPSILON &&
        Math.abs(eyey - centery) < GLMAT_EPSILON &&
        Math.abs(eyez - centerz) < GLMAT_EPSILON) {
        return mat4.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + 
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.mat4 = mat4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class Quaternion
 * @name quat
 */

var quat = {};

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
quat.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
quat.rotationTo = (function() {
    var tmpvec3 = vec3.create();
    var xUnitVec3 = vec3.fromValues(1,0,0);
    var yUnitVec3 = vec3.fromValues(0,1,0);

    return function(out, a, b) {
        var dot = vec3.dot(a, b);
        if (dot < -0.999999) {
            vec3.cross(tmpvec3, xUnitVec3, a);
            if (vec3.length(tmpvec3) < 0.000001)
                vec3.cross(tmpvec3, yUnitVec3, a);
            vec3.normalize(tmpvec3, tmpvec3);
            quat.setAxisAngle(out, tmpvec3, Math.PI);
            return out;
        } else if (dot > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        } else {
            vec3.cross(tmpvec3, a, b);
            out[0] = tmpvec3[0];
            out[1] = tmpvec3[1];
            out[2] = tmpvec3[2];
            out[3] = 1 + dot;
            return quat.normalize(out, out);
        }
    };
})();

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
quat.setAxes = (function() {
    var matr = mat3.create();

    return function(out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];

        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];

        matr[2] = view[0];
        matr[5] = view[1];
        matr[8] = view[2];

        return quat.normalize(out, quat.fromMat3(out, matr));
    };
})();

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
quat.clone = vec4.clone;

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
quat.fromValues = vec4.fromValues;

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
quat.copy = vec4.copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
quat.set = vec4.set;

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
quat.identity = function(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
quat.setAxisAngle = function(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
};

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
quat.add = vec4.add;

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
quat.multiply = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
};

/**
 * Alias for {@link quat.multiply}
 * @function
 */
quat.mul = quat.multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
quat.scale = vec4.scale;

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateX = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateY = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        by = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateZ = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bz = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
};

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
quat.calculateW = function (out, a) {
    var x = a[0], y = a[1], z = a[2];

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
};

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
quat.dot = vec4.dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
quat.lerp = vec4.lerp;

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
quat.slerp = function (out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    var        omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if ( cosom < 0.0 ) {
        cosom = -cosom;
        bx = - bx;
        by = - by;
        bz = - bz;
        bw = - bw;
    }
    // calculate coefficients
    if ( (1.0 - cosom) > 0.000001 ) {
        // standard case (slerp)
        omega  = Math.acos(cosom);
        sinom  = Math.sin(omega);
        scale0 = Math.sin((1.0 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {        
        // "from" and "to" quaternions are very close 
        //  ... so we can do a linear interpolation
        scale0 = 1.0 - t;
        scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    
    return out;
};

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
quat.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        dot = a0*a0 + a1*a1 + a2*a2 + a3*a3,
        invDot = dot ? 1.0/dot : 0;
    
    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0*invDot;
    out[1] = -a1*invDot;
    out[2] = -a2*invDot;
    out[3] = a3*invDot;
    return out;
};

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
quat.conjugate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
};

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 * @function
 */
quat.length = vec4.length;

/**
 * Alias for {@link quat.length}
 * @function
 */
quat.len = quat.length;

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
quat.squaredLength = vec4.squaredLength;

/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
quat.sqrLen = quat.squaredLength;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
quat.normalize = vec4.normalize;

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
quat.fromMat3 = (function() {
    // benchmarks:
    //    http://jsperf.com/typed-array-access-speed
    //    http://jsperf.com/conversion-of-3x3-matrix-to-quaternion

    var s_iNext = (typeof(Int8Array) !== 'undefined' ? new Int8Array([1,2,0]) : [1,2,0]);

    return function(out, m) {
        // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
        // article "Quaternion Calculus and Fast Animation".
        var fTrace = m[0] + m[4] + m[8];
        var fRoot;

        if ( fTrace > 0.0 ) {
            // |w| > 1/2, may as well choose w > 1/2
            fRoot = Math.sqrt(fTrace + 1.0);  // 2w
            out[3] = 0.5 * fRoot;
            fRoot = 0.5/fRoot;  // 1/(4w)
            out[0] = (m[7]-m[5])*fRoot;
            out[1] = (m[2]-m[6])*fRoot;
            out[2] = (m[3]-m[1])*fRoot;
        } else {
            // |w| <= 1/2
            var i = 0;
            if ( m[4] > m[0] )
              i = 1;
            if ( m[8] > m[i*3+i] )
              i = 2;
            var j = s_iNext[i];
            var k = s_iNext[j];
            
            fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
            out[i] = 0.5 * fRoot;
            fRoot = 0.5 / fRoot;
            out[3] = (m[k*3+j] - m[j*3+k]) * fRoot;
            out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
            out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
        }
        
        return out;
    };
})();

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
quat.str = function (a) {
    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.quat = quat;
}
;

  })(shim.exports);
})(this);

// Copyright (c) 2013 Marco Biasini
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to 
// deal in the Software without restriction, including without limitation the 
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or 
// sell copies of the Software, and to permit persons to whom the Software is 
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in 
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
// DEALINGS IN THE SOFTWARE.

(function(exports) {
  if (window.console === 'undefined') {
    window.console = {};
    window.console.log = function() {};
    window.console.error = function() {};
    window.console.time = function() {};
    window.console.timeEnd = function() {};
    window.console.info = function() {};
  }

  exports.derive = function(subclass, baseclass) {
    for (var prop in baseclass.prototype) {
      subclass.prototype[prop] = baseclass.prototype[prop];
    }
  };

  return true;

})(this);

// Copyright (c) 2013 Marco Biasini
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to 
// deal in the Software without restriction, including without limitation the 
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or 
// sell copies of the Software, and to permit persons to whom the Software is 
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in 
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
// DEALINGS IN THE SOFTWARE.

var geom = (function() {
"use strict";
// calculates the signed angle of vectors a and b with respect to
// the reference normal c. 
var signedAngle = (function() {
  var tmp = vec3.create();
  return function (a, b, c) {
    vec3.cross(tmp, a, b);
    return Math.atan2(vec3.dot(tmp, c), vec3.dot(a, b));
  };
})();

// calculate a vector orthogonal to an input vector
var ortho = (function() {
  var tmp = vec3.create();
  return function(out, vec) {
    vec3.copy(tmp, vec);
    if (Math.abs(vec[0]) < Math.abs(vec[1])) {
      if (Math.abs(vec[0]) < Math.abs(vec[2])) {
        tmp[0] += 1;
      } else {
        tmp[2] += 1;
      }
    } else {
      if (Math.abs(vec[1]) < Math.abs(vec[2])) {
        tmp[1] += 1;
      } else {
        tmp[2] += 1;
      }
    }
    return vec3.cross(out, vec, tmp);
  };
})();


// assumes that axis is normalized. don't expect  to get meaningful 
// results when it's not
var axisRotation = function(out, axis, angle) {
  var sa = Math.sin(angle),
      ca = Math.cos(angle),
      x  = axis[0], y  = axis[1], z = axis[2],
      xx = x*x, xy = x*y, xz = x*z, yy = y*y,
      yz = y*z, zz =z*z;

  out[0] = xx+ca-xx*ca;   out[1] = xy-ca*xy-sa*z; out[2] = xz-ca*xz+sa*y;
  out[3] = xy-ca*xy+sa*z; out[4] = yy+ca-ca*yy;   out[5] = yz-ca*yz-sa*x;
  out[6] = xz-ca*xz-sa*y; out[7] = yz-ca*yz+sa*x; out[8] = zz+ca-ca*zz;
  return out;
};

var cubicHermiteInterpolate = (function() {
  var p = vec3.create();
  return function (out, p_k, m_k, p_kp1, m_kp1, t, index) {
    var tt = t*t;
    var three_minus_two_t = 3.0 - 2.0*t;
    var h01 = tt*three_minus_two_t;
    var h00 = 1.0 - h01;
    var h10 = tt*(t - 2.0)+t;
    var h11 = tt*(t - 1.0);
    vec3.copy(p, p_k);
    vec3.scale(p, p, h00);
    vec3.scaleAndAdd(p, p, m_k, h10);
    vec3.scaleAndAdd(p, p, p_kp1, h01);
    vec3.scaleAndAdd(p, p, m_kp1, h11);
    out[index] = p[0];
    out[index+1] = p[1];
    out[index+2] = p[2];
};
})();

// interpolates the given list of points (stored in a Float32Array) with a 
// Cubic Hermite spline using the method of Catmull and Rom to calculate the 
// tangents.
function catmullRomSpline(points, num, strength, circular) {
  circular = circular || false;
  strength = strength || 0.5;
  var out = null;
  if (circular) {
    out = new Float32Array(points.length*num);
  } else {
    out = new Float32Array(3*(num*(points.length/3-1)+1));
  }
  var index = 0;
  var delta_t = 1.0/num;
  var m_k = vec3.create(), m_kp1 = vec3.create(); // tangents at k-1 and k+1
  var p_k = vec3.create(), p_kp1 = vec3.create(), 
      p_kp2 = vec3.create(), p_kp3 = vec3.create(); 
  var i, j, e;

  vec3.set(p_kp1, points[0], points[1], points[2]);
  vec3.set(p_kp2, points[3], points[4], points[5]);
  if (circular) {
    vec3.set(p_k,  points[points.length-3], points[points.length-2], 
             points[points.length-1]);
    vec3.sub(m_k, p_kp2, p_k);
    vec3.scale(m_k, m_k, strength);
  } else {
    vec3.set(p_k,   points[0], points[1], points[2]);
    vec3.set(m_k, 0, 0, 0);
  }
  for (i = 1, e = points.length/3-1; i < e; ++i) {
    vec3.set(p_kp3, points[3*(i+1)], points[3*(i+1)+1], points[3*(i+1)+2]);
    vec3.sub(m_kp1, p_kp3, p_kp1);
    vec3.scale(m_kp1, m_kp1, strength);
    for (j = 0; j < num; ++j) {
      cubicHermiteInterpolate(out, p_kp1, m_k, p_kp2, m_kp1, 
                              delta_t*j, index);
      index+=3;
    }
    vec3.copy(p_k, p_kp1);
    vec3.copy(p_kp1, p_kp2);
    vec3.copy(p_kp2, p_kp3);
    vec3.copy(m_k, m_kp1);
  }
  if (circular) {
    vec3.set(p_kp3, points[0], points[1], points[3]);
    vec3.sub(m_kp1, p_kp3, p_kp1);
    vec3.scale(m_kp1, m_kp1, strength);
  } else {
    vec3.set(m_kp1, 0, 0, 0);
  }
  for (j = 0; j < num; ++j) {
    cubicHermiteInterpolate(out, p_kp1, m_k, p_kp2, m_kp1, delta_t*j, index);
    index+=3;
  }
  if (!circular) {
    out[index] = points[points.length-3];
    out[index+1] = points[points.length-2];
    out[index+2] = points[points.length-1];
    return out;
  }
  vec3.copy(p_k, p_kp1);
  vec3.copy(p_kp1, p_kp2);
  vec3.copy(p_kp2, p_kp3);
  vec3.copy(m_k, m_kp1);
  vec3.set(p_kp3, points[3], points[4], points[5]);
  vec3.sub(m_kp1, p_kp3, p_kp1);
  vec3.scale(m_kp1, m_kp1, strength);
  for (j = 0; j < num; ++j) {
    cubicHermiteInterpolate(out, p_kp1, m_k, p_kp2, m_kp1, delta_t*j, index);
    index+=3;
  }
  return out;
}
return {
  signedAngle : signedAngle,
  axisRotation : axisRotation,
  ortho : ortho,
  catmullRomSpline : catmullRomSpline,
  cubicHermiteInterpolate : cubicHermiteInterpolate
};
})();

// Copyright (c) 2013 Marco Biasini
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy 
// of this software and associated documentation files (the "Software"), to deal 
// in the Software without restriction, including without limitation the rights 
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
// copies of the Software, and to permit persons to whom the Software is 
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
// SOFTWARE.

(function(exports) {
"use strict";

exports.rgb = {};

exports.rgb.create = vec3.create;
exports.rgb.scale = vec3.scale;
exports.rgb.copy = vec3.copy;
exports.rgb.fromValues = vec3.fromValues;

exports.rgb.mix = function(out, colorOne, colorTwo, t) {
  var oneMinusT = 1.0 - t;
  out[0] = colorOne[0]*t+colorTwo[0]*oneMinusT;
  out[1] = colorOne[1]*t+colorTwo[1]*oneMinusT;
  out[2] = colorOne[2]*t+colorTwo[2]*oneMinusT;
  return out;
};

var COLORS = {
  white : rgb.fromValues(1.0,1.0,1.0),
  black : rgb.fromValues(0.0,0.0,0.0),
  grey : rgb.fromValues(0.5,0.5,0.5),
  lightgrey : rgb.fromValues(0.8,0.8,0.8),
  darkgrey : rgb.fromValues(0.3,0.3,0.3),
  red : rgb.fromValues(1.0,0.0,0.0),
  darkred : rgb.fromValues(0.5,0.0,0.0),
  lightred : rgb.fromValues(1.0,0.5,0.5),
  green : rgb.fromValues(0.0,1.0,0.0),
  darkgreen : rgb.fromValues(0.0,0.5,0.0),
  lightgreen : rgb.fromValues(0.5,1.0,0.5),
  blue : rgb.fromValues(0.0,0.0,1.0),
  darkblue : rgb.fromValues(0.0,0.0,0.5),
  lightblue : rgb.fromValues(0.5,0.5,1.0),
  yellow : rgb.fromValues(1.0,1.0,0.0),
  darkyellow : rgb.fromValues(0.5,0.5,0.0),
  lightyellow : rgb.fromValues(1.0,1.0,0.5),
  cyan : rgb.fromValues(0.0,1.0,1.0),
  darkcyan : rgb.fromValues(0.0,0.5,0.5),
  lightcyan : rgb.fromValues(0.5,1.0,1.0),
  magenta : rgb.fromValues(1.0,0.0,1.0),
  darkmagenta : rgb.fromValues(0.5,0.0,0.5),
  lightmagenta : rgb.fromValues(1.0,0.5,1.0),
  orange : rgb.fromValues(1.0,0.5,0.0),
  darkorange : rgb.fromValues(0.5,0.25,0.0),
  lightorange : rgb.fromValues(1.0,0.75,0.5)
};

// converts color strings to RGB. for now only supports color names. 
// hex triples will need to be added.
exports.forceRGB = function(color) {
  if (COLORS[color] !== undefined) {
    return COLORS[color];
  }
  return color;
};

function Gradient(colors, stops) {
  this._colors = colors;
  for (var i = 0; i < this._colors.length; ++i) {
    this._colors[i] = exports.forceRGB(this._colors[i]);
  }
  this._stops = stops;
}

Gradient.prototype.colorAt = function(out, value) {
  if (value <= this._stops[0]) {
    return vec3.copy(out, this._colors[0]);
  }
  if (value >= this._stops[this._stops.length-1]) {
    return vec3.copy(out, this._colors[this._stops.length-1]);
  }
  // could use a binary search here, but since most gradients
  // have a really small number of stops, that's not going to
  // help much.
  var lowerIndex = 0;
  for (var i = 0; i < this._stops.length; ++i) {
    if (this._stops[i] > value) {
      break;
    }
    lowerIndex = i;
  }
  var upperIndex = lowerIndex+1;
  var lowerStop = this._stops[lowerIndex];
  var upperStop = this._stops[upperIndex];
  var t = (value - lowerStop)/ (upperStop - lowerStop);
  return rgb.mix(out, this._colors[upperIndex], this._colors[lowerIndex], t);
};
var GRADIENTS = { };
// creates a new gradient from the given set of colors. 
// 
// colors must be a valid list of colors.
//
// when stops is set to 'equal', then the color stops are
// assumed to be equi distant on the interval 0,1. otherwise,
// stops must be  a list of floating point numbers with the 
// same length than colors.
exports.gradient = function(colors, stops) {
  if (typeof colors === 'string') {
    return GRADIENTS[colors];
  }
  stops = stops || 'equal';
  if (stops === 'equal') {
    stops = [];
    for (var i = 0; i < colors.length; ++i) {
      stops.push(i*1.0/(colors.length-1));
    }
  }
  return new Gradient(colors, stops);
};

GRADIENTS.rainbow =gradient(['red', 'yellow', 'green', 'blue']);
GRADIENTS.reds = gradient(['lightred', 'darkred']);
GRADIENTS.greens = gradient(['lightgreen', 'darkgreen']);
GRADIENTS.blues = gradient(['lightblue', 'darkblue']);
GRADIENTS.trafficlight = gradient(['green', 'yellow', 'red']);
GRADIENTS.heatmap = gradient(['red', 'white', 'blue']);

function ColorOp(colorFunc, beginFunc, endFunc) {
  this.colorFor = colorFunc;
  this._beginFunc = beginFunc;
  this._endFunc = endFunc;
}

ColorOp.prototype.begin = function(obj) {
  if (this._beginFunc) {
    this._beginFunc(obj);
  }
};


ColorOp.prototype.end = function(obj) {
  if (this._endFunc) {
    this._endFunc(obj);
  }
};

exports.color = {};

exports.ColorOp = ColorOp;

exports.color.uniform = function(color) {
  color = exports.forceRGB(color);
  return new ColorOp(function(atom, out, index) {
    out[index] = color[0];
    out[index+1] = color[1];
    out[index+2] = color[2];
  }, null, null);
};

exports.color.byElement = function() {
  return new ColorOp(function(atom, out, index) {
    var ele = atom.element();
    if (ele === 'C') {
      out[index] = 0.8; out[index+1] = 0.8; out[index+2] = 0.8;
      return out;
    }
    if (ele === 'N') {
      out[index] = 0; out[index+1] = 0; out[index+2] = 1;
      return out;
    }
    if (ele === 'O') {
      out[index] = 1; out[index+1] = 0; out[index+2] = 0;
      return out;
    }
    if (ele === 'S') {
      out[index] = 0.8; out[index+1] = 0.8; out[index+2] = 0;
      return out;
    }
    if (ele === 'CA') {
      out[index] = 0.533; out[index+1] = 0.533; out[index+2] = 0.666;
      return out;
    }
    out[index] = 1; out[index+1] = 0; out[index+2] = 1;
    return out;
  }, null, null);
};

exports.color.bySS = function() {

  return new ColorOp(function(atom, out, index) {
    switch (atom.residue().ss()) {
      case 'C':
        out[index] = 0.8; out[index+1] = 0.8; out[index+2] = 0.8;
        return;
      case 'H':
        out[index] = 0.6; out[index+1] = 0.6; out[index+2] = 0.9;
        return;
      case 'E':
        out[index] = 0.2; out[index+1] = 0.8; out[index+2] = 0.2;
        return;
    }
  }, null, null);
};

exports.color.rainbow = function(grad) {
  if (!grad) {
    grad = gradient('rainbow');
  }
  var colorFunc = new ColorOp(function(a, out, index) {
    var idx = a.residue().index();
    var limits = this.chainLimits[a.residue().chain().name()];
    var t = 0.0;
    if (limits !== undefined) {
      t =  (idx - limits[0])/(limits[1]-limits[0]);
    } 
    var x = [0,0,0];
    grad.colorAt(x, t);
    out[index] = x[0];
    out[index+1] = x[1];
    out[index+2] = x[2];
  }, function(obj) {
    var chains = obj.chains();
    this.chainLimits = {};
    for (var i = 0; i < chains.length; ++i) {
      var bb = chains[i].backboneTraces();
      if (bb.length === 0) {
        continue;
      }
      var minIndex = bb[0].residueAt(0).index(), 
          maxIndex = bb[0].residueAt(bb[0].length()-1).index();
      for (var j = 1; j < bb.length; ++j) {
        var bbj = bb[j];
        minIndex = Math.min(minIndex, bbj.residueAt(0).index());
        maxIndex = Math.max(maxIndex, bbj.residueAt(bbj.length()-1).index());
      }
      this.chainLimits[chains[i].name()] = [minIndex, maxIndex];
    }
  },function(obj) {
    this.chainLimits = null;
  });
  return colorFunc;
};

exports.color.ssSuccession = function(grad, coilColor) {
  if (!grad) {
    grad = gradient('rainbow');
  }
  if (!coilColor) {
    coilColor = forceRGB('lightgrey');
  }
  var colorFunc = new ColorOp(function(a, out, index) {
    var idx = a.residue().index();
    var limits = this.chainLimits[a.residue().chain().name()];
    var ssIndex = limits.indices[idx];
    if (ssIndex === -1) {
      out[index] = coilColor[0];
      out[index+1] = coilColor[1];
      out[index+2] = coilColor[2];
      return;
    }
    var t = 0.0;
    if (limits.max === null) {
    }
    if (limits.max !== null) {
      t =  ssIndex/(limits.max > 0 ? limits.max : 1);
    } 
    var x = [0,0,0];
    grad.colorAt(x, t);
    out[index] = x[0];
    out[index+1] = x[1];
    out[index+2] = x[2];
  }, function(obj) {
    var chains = obj.chains();
    this.chainLimits = {};
    for (var i = 0; i < chains.length; ++i) {
      var residues = chains[i].residues();
      var maxIndex = null;
      var indices = {};
      var ssIndex = 0;
      var lastSS = 'C';
      for (var j = 0; j < residues.length; ++j) {
        var ss =  residues[j].ss();
        if (ss === 'C') {
          if (lastSS !== 'C') {
            ssIndex++;
          }
          indices[residues[j].index()] = -1;
        } else {
          maxIndex = ssIndex;
          indices[residues[j].index()] = ssIndex;
        }
        lastSS = ss;
      }
      this.chainLimits[chains[i].name()] = {
        indices : indices,
        max: maxIndex,
      };
    }
  },function(obj) {
    this.chainLimits = null;
  });
  return colorFunc;
};

exports.color.byChain = function(grad) {
  if (!grad) {
    grad = gradient('rainbow');
  }
  var colorFunc = new ColorOp(function(a, out, index) {
    var idx = a.residue().index();
    var chainIndex = this.chainIndices[a.residue().chain().name()];
    var t =  chainIndex*this.scale;
    var x = [0,0,0];
    grad.colorAt(x, t);
    out[index] = x[0];
    out[index+1] = x[1];
    out[index+2] = x[2];
  }, function(obj) {
    var chains = obj.chains();
    this.chainIndices = {};
    for (var i = 0; i < chains.length; ++i) {
      this.chainIndices[chains[i].name()] = i;
    }
    this.scale = chains.length > 1 ? 1.0/(chains.length-1) : 1.0;
  },function(obj) {
    this.chainIndices = null;
  });
  return colorFunc;
};

function getMinMaxRange(obj, iter, propName) {
  var min = null;
  var max = null;
  obj[iter](function(item) {
    var value = item.prop(propName);
    if (min === null && max === null) {
      min = max = value;
      return;
    }
    min = Math.min(min, value);
    max = Math.max(max, value);
  });
  return { min: min, max: max };
}

var gradColor = (function() {
  var color = vec3.create();
  return function(out, index, grad, t) {
    grad.colorAt(color, t);
    out[index+0] = color[0];
    out[index+1] = color[1];
    out[index+2] = color[2];
  };
})();

function colorByItemProp(propName, grad, options, iter, item) {
  if (!grad) {
    grad = gradient('rainbow');
  }
  options = options || {};
  return new ColorOp(function(a, out, index) {
      var t = 0.0;
      if (this._min !== this._max) {
        t = (item(a).prop(propName) - this._min)/(this._max - this._min);
      }
      gradColor(out, index, grad, t);
    }, 
    function(obj) {
      if (options.range) {
        this._min = options.range[0];
        this._max = options.range[1];
        return;
      }
      var range = getMinMaxRange(obj, iter, propName);
      this._min = range.min;
      this._max = range.max;
    }, 
    function(obj) { }
  );
}

exports.color.byAtomProp = function(propName, grad, options) {
  return colorByItemProp(propName, grad, options, 'eachAtom', 
                         function(a) {return a;});
};

exports.color.byResidueProp = function(propName, grad, options) {
  return colorByItemProp(propName, grad, options, 'eachResidue', 
                         function(a) {return a.residue();});
};

// linearly interpolates the array of colors and returns it as a Float32Array
// color must be an array containing a sequence of R,G,B triples.
exports.interpolateColor = function(colors, num) {
  var out = new Float32Array((num*(colors.length/3-1) + 1)*3);
  var index = 0;
  var bf = vec3.create(), af = vec3.create();
  var delta = 1/num;
  for (var i = 0; i < colors.length/3-1; ++i) {
    vec3.set(bf, colors[3*i], colors[3*i+1], colors[3*i+2]);
    vec3.set(af, colors[3*i+3], colors[3*i+4], colors[3*i+5]);
    for (var j = 0; j < num; ++j) {
      var t = delta * j;
      out[index] = bf[0]*(1-t)+af[0]*t;
      out[index+1] = bf[1]*(1-t)+af[1]*t;
      out[index+2] = bf[2]*(1-t)+af[2]*t;
      index+=3;
    }
  }
  out[index] = af[0];
  out[index+1] = af[1];
  out[index+2] = af[2];
  return out;
};



return true;
})(this);

// Copyright (c) 2013 Marco Biasini
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to 
// deal in the Software without restriction, including without limitation the 
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or 
// sell copies of the Software, and to permit persons to whom the Software is 
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in 
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
// DEALINGS IN THE SOFTWARE.


// During recoloring of a render style, most of the vertex attributes, e.g.
// normals and positions do not change. Only the color information for each
// vertex needs to be adjusted. 
//
// To do that efficiently, we need store an association between ranges of
// vertices and atoms in the original structure. Worse, we also need to 
// support render styles for which colors need to be interpolated, e.g.
// the smooth line trace, tube and cartoon render modes. 
//
// The vertex association data for the atom-based render styles is managed
// by AtomVertexAssoc, whereas the trace-based render styles are managed 
// by the TraceVertexAssoc class. 
function AtomVertexAssoc(structure, callColoringBeginEnd) {
  this._structure = structure;
  this._assocs = [];
  this._callBeginEnd = callColoringBeginEnd;

}

AtomVertexAssoc.prototype.addAssoc = function(atom, vertStart, vertEnd)  {
  this._assocs.push({ atom: atom, vertStart : vertStart, vertEnd : vertEnd });
};

AtomVertexAssoc.prototype.recolor = function(colorOp, view, buffer, offset, 
                                             stride) {
  // allocate buffer to hold all colors of the view.
  var colorData = new Float32Array(view.atomCount()*3); 
  if (this._callBeginEnd) {
    // FIXME: does this need to be called on the complete structure or the 
    // view?
    colorOp.begin(this._structure);
  }

  var atomMap = {};
  view.eachAtom(function(atom, index) {
    atomMap[atom.index()] = index;
    colorOp.colorFor(atom, colorData, index*3);
  });
  if (this._callBeginEnd) {
    colorOp.end(this._structure);
  }
  // apply the color to the actual interleaved vertex array.
  for (var i = 0; i < this._assocs.length; ++i) {
    var assoc = this._assocs[i];
    var ai = atomMap[assoc.atom.index()];
    if (ai === undefined) {
      continue;
    }
    var r = colorData[ai*3], g = colorData[ai*3+1], b = colorData[ai*3+2];
    for (var j = assoc.vertStart ; j < assoc.vertEnd; ++j) {
       buffer[offset+j*stride+0] = r;  
       buffer[offset+j*stride+1] = g;  
       buffer[offset+j*stride+2] = b;  
    }
  }
};

// handles the association between a trace element, and sets of vertices.
function TraceVertexAssoc(structure, interpolation, callColoringBeginEnd,
                          perResidueColors) {
  this._structure = structure;
  this._assocs = [];
  this._callBeginEnd = callColoringBeginEnd;
  this._interpolation = interpolation || 1;
  this._perResidueColors = {};
}

TraceVertexAssoc.prototype.setPerResidueColors = function(traceIndex, colors) {
  this._perResidueColors[traceIndex] = colors;
};

TraceVertexAssoc.prototype.addAssoc = function(traceIndex, slice, vertStart, 
                                               vertEnd) {
  this._assocs.push({ traceIndex: traceIndex, slice : slice, 
                      vertStart : vertStart, vertEnd : vertEnd});
};




TraceVertexAssoc.prototype.recolor = function(colorOp, view, buffer, offset, 
                                              stride) {
  // FIXME: this function might create quite a few temporary buffers. Implement
  // a buffer pool to avoid hitting the GC and having to go through the slow
  // creation of typed arrays.
  if (this._callBeginEnd) {
    // FIXME: does this need to be called on the complete structure?
    colorOp.begin(this._structure);
  }
  var colorData = [];
  var i, j;
  var chains = this._structure.chains();
  for (var ci = 0; ci < chains.length; ++ci) {
    var chain = chains[ci];
    var traces = chain.backboneTraces();
    for (i = 0; i < traces.length; ++i) {
      // get current residue colors
      var data = this._perResidueColors[i];
      var index = 0;
      var trace = traces[i];
      for (j = 0; j < trace.length(); ++j) {
        if (!view.containsResidue(trace.residueAt(j))) {
          index+=3;
          continue;
        }
        colorOp.colorFor(trace.centralAtomAt(j), data, index);
        index+=3;
      }
      if (this._interpolation > 1) {
        colorData.push(interpolateColor(data, this._interpolation));
      } else {
        colorData.push(data);
      }
    }
  }

  // store the color in the actual interleaved vertex array.
  for (i = 0; i < this._assocs.length; ++i) {
    var assoc = this._assocs[i];
    var ai = assoc.slice;
    var newColors = colorData[assoc.traceIndex];
    var r = newColors[ai*3], g = newColors[ai*3+1], b = newColors[ai*3+2];
    for (j = assoc.vertStart ; j < assoc.vertEnd; ++j) {
      buffer[offset+j*stride+0] = r;  
      buffer[offset+j*stride+1] = g;  
      buffer[offset+j*stride+2] = b;  
    }
  }
  if (this._callBeginEnd) {
    colorOp.end(this._structure);
  }
};


// Copyright (c) 2013 Marco Biasini
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy 
// of this software and associated documentation files (the "Software"), to deal 
// in the Software without restriction, including without limitation the rights 
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
// copies of the Software, and to permit persons to whom the Software is 
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
// SOFTWARE.

(function(exports) {

// A scene node holds a set of child nodes to be rendered on screen. Later on, 
// the SceneNode might grow additional functionality commonly found in a scene 
// graph, e.g. coordinate transformations.
function SceneNode(name) {
  this._children = [];
  this._visible = true;
  this._name = name || '';
}

SceneNode.prototype.add = function(node) {
  this._children.push(node);
};

SceneNode.prototype.draw = function(cam, shaderCatalog, style, pass) {
  for (var i = 0, e = this._children.length; i !== e; ++i) {
    this._children[i].draw(cam, shaderCatalog, style, pass);
  }
};


SceneNode.prototype.show = function() {
  this._visible = true;
};

SceneNode.prototype.hide = function() {
  this._visible = false;
};

SceneNode.prototype.name = function(name) { 
  if (name !== undefined) {
    this._name = name;
  }
  return this._name; 
};

SceneNode.prototype.destroy = function() {
  for (var i = 0; i < this._children.length; ++i) {
    this._children[i].destroy();
  }
};

function BaseGeom(gl) {
  SceneNode.prototype.constructor.call(this, gl);
  this._gl = gl;
  this._idRanges = [];
}


derive(BaseGeom, SceneNode);

BaseGeom.prototype.select = function(what) {
  return this.structure().select(what);
};


BaseGeom.prototype.structure = function() { return this._vertAssoc._structure; };

BaseGeom.prototype.setVertAssoc = function(assoc) {
  this._vertAssoc = assoc;
};

BaseGeom.prototype.addIdRange = function(range) {
  this._idRanges.push(range);
};

BaseGeom.prototype.destroy = function() {
  SceneNode.prototype.destroy.call(this);
  for (var i = 0; i < this._idRanges.length; ++i) {
    this._idRanges[i].recycle();
  }
};

// Holds geometrical data for objects rendered as lines. For each vertex,
// the color and position is stored in an interleaved format.
function LineGeom(gl) {
  BaseGeom.prototype.constructor.call(this, gl);
  this._data = [];
  this._ready = false;
  this._interleavedBuffer = gl.createBuffer();
  this._numLines = 0;
  this._vertAssoc = null;
  this._lineWidth = 1.0;
}

derive(LineGeom, BaseGeom);

LineGeom.prototype.setLineWidth = function(width) {
  this._lineWidth = width;
};

LineGeom.prototype.shaderForStyleAndPass = function(shaderCatalog, style, pass) {
  if (pass === 'outline') {
    return null;
  }
  if (pass === 'select') {
    return shaderCatalog.select;
  }
  return shaderCatalog.lines;
};

LineGeom.prototype._FLOATS_PER_VERT = 7;
LineGeom.prototype._POS_OFFSET = 0;
LineGeom.prototype._COLOR_OFFSET = 3;
LineGeom.prototype._ID_OFFSET = 6;

LineGeom.prototype.destroy = function() {
  BaseGeom.prototype.destroy.call(this);
  this._gl.deleteBuffer(this._interleavedBuffer);
};

LineGeom.prototype.numVerts = function() { return this._numLines*2; };

LineGeom.prototype.draw = function(cam, shaderCatalog, style, pass) {

  if (!this._visible) { return; }

  var shader = this.shaderForStyleAndPass(shaderCatalog, style, pass);
  if (!shader) { return; }
  cam.bind(shader);
  this.bind();
  this._gl.lineWidth(this._lineWidth);
  var vertAttrib = this._gl.getAttribLocation(shader, 'attrPos');
  this._gl.enableVertexAttribArray(vertAttrib);
  this._gl.vertexAttribPointer(vertAttrib, 3, this._gl.FLOAT, false, 
                               this._FLOATS_PER_VERT*4, this._POS_OFFSET*4);
  var clrAttrib = this._gl.getAttribLocation(shader, 'attrColor');
  this._gl.vertexAttribPointer(clrAttrib, 3, this._gl.FLOAT, false, 
                               this._FLOATS_PER_VERT*4, this._COLOR_OFFSET*4);
  this._gl.enableVertexAttribArray(clrAttrib);
  var idAttrib = this._gl.getAttribLocation(shader, 'attrObjId');
  if (idAttrib !== -1) {
    this._gl.vertexAttribPointer(idAttrib, 1, this._gl.FLOAT, false,
                                 this._FLOATS_PER_VERT*4, this._ID_OFFSET*4);
    this._gl.enableVertexAttribArray(idAttrib);
  }
  this._gl.drawArrays(this._gl.LINES, 0, this._numLines*2);
  this._gl.disableVertexAttribArray(vertAttrib);
  this._gl.disableVertexAttribArray(clrAttrib);
  if (idAttrib !== -1) { 
    this._gl.disableVertexAttribArray(idAttrib);
  }
};


LineGeom.prototype.colorBy = function(colorFunc, view) {
  console.time('LineGeom.colorBy');
  this._ready = false;
  view = view || this.structure();
  this._vertAssoc.recolor(colorFunc, view, this._data, 
                          this._COLOR_OFFSET, this._FLOATS_PER_VERT);
  console.timeEnd('LineGeom.colorBy');
};

LineGeom.prototype.bind = function() {
  this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._interleavedBuffer);
  if (this._ready) {
    return;
  }
  var floatArray = new Float32Array(this._data);
  this._gl.bufferData(this._gl.ARRAY_BUFFER, floatArray, this._gl.STATIC_DRAW);
  this._ready = true;
};

LineGeom.prototype.addLine = function(startPos, startColor, endPos, 
                                      endColor, idOne, idTwo) {
  this._data.push(startPos[0], startPos[1], startPos[2],
                  startColor[0], startColor[1], startColor[2], idOne,
                  endPos[0], endPos[1], endPos[2],
                  endColor[0], endColor[1], endColor[2], idTwo);
  this._numLines += 1;
  this._ready = false;
};

// a SceneNode which aggregates one or more (unnamed) geometries into one
// named object. It forwards coloring and configuration calls to all
// geometries it contains. 
//
// FIXME: CompositeGeom could possibly be merged directly into the 
// SceneNode by introducing named and unnamed child nodes at the SceneNode
// level. It only exists to support unnamed child nodes and hide the fact
// that some render styles require multiple MeshGeoms to be constructed.
function CompositeGeom(structure) {
  BaseGeom.prototype.constructor.call(this, null);
  this._geoms = [];
  this._structure = structure;
}

derive(CompositeGeom, BaseGeom);


CompositeGeom.prototype.addGeom = function(geom) {
  this._geoms.push(geom);
};

CompositeGeom.prototype.destroy = function() {
  BaseGeom.prototype.destroy.call(this);
  for (var i = 0; i < this._geoms.length; ++i) {
    this._geoms[i].destroy();
  }
  this._geoms = [];
};

CompositeGeom.prototype.structure = function() { 
  return this._structure;
};

CompositeGeom.prototype.forwardMethod = function(method, args) {
  for (var i = 0; i < this._geoms.length; ++i) {
    this._geoms[i][method].apply(this._geoms[i], args);
  }
};

CompositeGeom.prototype.colorBy = function() {
  var colorFunc = arguments[0];
  colorFunc.begin(this._structure);
  this.forwardMethod('colorBy', arguments);
  colorFunc.end(this._structure);
};

CompositeGeom.prototype.draw = function(cam, shaderCatalog, style, pass) {
  if (!this._visible) {
    return;
  }
  for (var i = 0; i < this._geoms.length; ++i) {
    this._geoms[i].draw(cam, shaderCatalog, style, pass);
  }
};


function ProtoSphere(stacks, arcs) {
  this._arcs = arcs;
  this._stacks = stacks;
  this._indices = new Uint16Array(3*arcs*stacks*2);
  this._verts = new Float32Array(3*arcs*stacks);
  var vert_angle = Math.PI/(stacks-1);
  var horz_angle = Math.PI*2.0/arcs;
  var i, j;
  for (i = 0; i < this._stacks; ++i) {
    var radius = Math.sin(i*vert_angle);
    var z = Math.cos(i*vert_angle);
    for (j = 0; j < this._arcs; ++j) {
      var nx = radius*Math.cos(j*horz_angle);
      var ny = radius*Math.sin(j*horz_angle);
      this._verts[3*(j+i*this._arcs)] = nx;
      this._verts[3*(j+i*this._arcs)+1] = ny;
      this._verts[3*(j+i*this._arcs)+2] = z;
    }
  }
  var index = 0;
  for (i = 0; i < this._stacks-1; ++i) {
    for (j = 0; j < this._arcs; ++j) {
      this._indices[index] = (i)*this._arcs+j;
      this._indices[index+1] = (i)*this._arcs+((j+1) % this._arcs);
      this._indices[index+2] = (i+1)*this._arcs+j;

      index += 3;
      
      this._indices[index] = (i)*this._arcs+((j+1) % this._arcs);
      this._indices[index+1] = (i+1)*this._arcs+((j+1) % this._arcs);
      this._indices[index+2] = (i+1)*this._arcs+j;
      index += 3;
    }
  }
}

ProtoSphere.prototype.addTransformed = (function() {
  
  var pos = vec3.create(), normal = vec3.create();

  return function(geom, center, radius, color, objId) {
    var baseIndex = geom.numVerts();
    for (var i = 0; i < this._stacks*this._arcs; ++i) {
      vec3.set(normal, this._verts[3*i], this._verts[3*i+1], 
                this._verts[3*i+2]);
      vec3.copy(pos, normal);
      vec3.scale(pos, pos, radius);
      vec3.add(pos, pos, center);
      geom.addVertex(pos, normal, color, objId);
    }
    for (i = 0; i < this._indices.length/3; ++i) {
      geom.addTriangle(baseIndex+this._indices[i*3], 
                      baseIndex+this._indices[i*3+1], 
                      baseIndex+this._indices[i*3+2]);
    }
  };
})();

ProtoSphere.prototype.num_indices = function() { 
  return this._indices.length; 
};

ProtoSphere.prototype.num_vertices = function() { 
  return this._verts.length; 
};

// A tube profile is a cross-section of a tube, e.g. a circle or a 'flat' square.
// They are used to control the style of helices, strands and coils for the 
// cartoon render mode. 
function TubeProfile(points, num, strength) {
  var interpolated = geom.catmullRomSpline(points, num, strength, true);

  this._indices = new Uint16Array(interpolated.length*2);
  this._verts = interpolated;
  this._normals = new Float32Array(interpolated.length);
  this._arcs = interpolated.length/3;

  var normal = vec3.create(), pos = vec3.create();

  for (var i = 0; i < this._arcs; ++i) {
    var i_prev = i === 0 ? this._arcs-1 : i-1;
    var i_next = i === this._arcs-1 ? 0 : i+1;
    normal[0] = this._verts[3*i_next+1] - this._verts[3*i_prev+1];
    normal[1] = this._verts[3*i_prev] - this._verts[3*i_next];
    vec3.normalize(normal, normal);
    this._normals[3*i] = normal[0];
    this._normals[3*i+1] = normal[1];
    this._normals[3*i+2] = normal[2];
  }

  for (i = 0; i < this._arcs; ++i) {
    this._indices[6*i] = i;
    this._indices[6*i+1] = i+this._arcs;
    this._indices[6*i+2] = ((i+1) % this._arcs) + this._arcs;
    this._indices[6*i+3] = i;
    this._indices[6*i+4] = ((i+1) % this._arcs) + this._arcs;
    this._indices[6*i+5] = (i+1) % this._arcs;
  }
}

TubeProfile.prototype.addTransformed = (function() {
  var pos = vec3.create(), normal = vec3.create();
  return function(geom, center, radius, rotation, color, first, offset,
                  objId) {
    var baseIndex = geom.numVerts() - this._arcs;
    for (var i = 0; i < this._arcs; ++i) {
      vec3.set(pos, radius*this._verts[3*i], radius*this._verts[3*i+1], 0.0);
      vec3.transformMat3(pos, pos, rotation);
      vec3.add(pos, pos, center);
      vec3.set(normal, this._normals[3*i], this._normals[3*i+1], 0.0);
      vec3.transformMat3(normal, normal, rotation);
      geom.addVertex(pos, normal, color, objId);
    }
    if (first) {
      return;
    }
    if (offset === 0) {
      // that's what happens most of the time, thus is has been optimized.
      for (i = 0; i < this._indices.length/3; ++i) {
        geom.addTriangle(baseIndex+this._indices[i*3], 
                          baseIndex+this._indices[i*3+1], 
                          baseIndex+this._indices[i*3+2]);
      }
      return;
    }
    for (i = 0; i < this._arcs; ++i) {
      geom.addTriangle(baseIndex+((i+offset) % this._arcs),
                        baseIndex+i+this._arcs,
                        baseIndex+((i+1) % this._arcs) + this._arcs);
      geom.addTriangle(baseIndex+(i+offset) % this._arcs,
                        baseIndex+((i+1) % this._arcs) + this._arcs,
                        baseIndex+((i+1+offset) % this._arcs));
    }

  };
})();


function ProtoCylinder(arcs) {
  this._arcs = arcs;
  this._indices = new Uint16Array(arcs*3*2);
  this._verts = new Float32Array(3*arcs*2);
  this._normals = new Float32Array(3*arcs*2);
  var angle = Math.PI*2/this._arcs;
  for (var i = 0; i < this._arcs; ++i) {
    var cos_angle = Math.cos(angle*i);
    var sin_angle = Math.sin(angle*i);
    this._verts[3*i] = cos_angle;
    this._verts[3*i+1] = sin_angle;
    this._verts[3*i+2] = -0.5;
    this._verts[3*arcs+3*i] = cos_angle;
    this._verts[3*arcs+3*i+1] = sin_angle;
    this._verts[3*arcs+3*i+2] = 0.5;
    this._normals[3*i] = cos_angle;
    this._normals[3*i+1] = sin_angle;
    this._normals[3*arcs+3*i] = cos_angle;
    this._normals[3*arcs+3*i+1] = sin_angle;
  }
  for (i = 0; i < this._arcs; ++i) {
    this._indices[6*i] = (i) % this._arcs;
    this._indices[6*i+1] = arcs+((i+1) % this._arcs);
    this._indices[6*i+2] = (i+1) % this._arcs;

    this._indices[6*i+3] = (i) % this._arcs;
    this._indices[6*i+4] = arcs+((i) % this._arcs);
    this._indices[6*i+5] = arcs+((i+1) % this._arcs);
  }
}

ProtoCylinder.prototype.addTransformed = (function() {
  var pos = vec3.create(), normal = vec3.create();
  return function(geom, center, length, radius, rotation, colorOne, 
                  colorTwo, idOne, idTwo) {
    var baseIndex = geom.numVerts();
    for (var i = 0; i < 2*this._arcs; ++i) {
      vec3.set(pos, radius*this._verts[3*i], radius*this._verts[3*i+1], 
                length*this._verts[3*i+2]);
      vec3.transformMat3(pos, pos, rotation);
      vec3.add(pos, pos, center);
      vec3.set(normal, this._normals[3*i], this._normals[3*i+1], this._normals[3*i+2]);
      vec3.transformMat3(normal, normal, rotation);
      var objId =i < this._arcs ? idOne : idTwo;
      geom.addVertex(pos, normal, i < this._arcs ? colorOne : colorTwo, objId);
    }
    for (i = 0; i < this._indices.length/3; ++i) {
      geom.addTriangle(baseIndex+this._indices[i*3], 
                        baseIndex+this._indices[i*3+1], 
                        baseIndex+this._indices[i*3+2]);
    }
  };
})();

// an (indexed) mesh geometry container.
//
// stores the vertex data in interleaved format. not doing so has severe 
// performance penalties in WebGL, and severe means orders of magnitude 
// slower than using an interleaved array.
//
// the vertex data is stored in the following format;
//
// Px Py Pz Nx Ny Nz Cr Cg Cb Id
//
// , where P is the position, N the normal and C the color information
// of the vertex.
function MeshGeom(gl) {
  BaseGeom.prototype.constructor.call(this, gl);
  this._interleavedBuffer = gl.createBuffer();
  this._indexBuffer = gl.createBuffer();
  this._vertData = [];
  this._indexData = [];
  this._numVerts = 0;
  this._numTriangles = 0;
  this._ready = false;
  this._vertAssoc = null;
}

MeshGeom.prototype._FLOATS_PER_VERT = 10;
MeshGeom.prototype._COLOR_OFFSET = 6;
MeshGeom.prototype._POS_OFFSET = 0;
MeshGeom.prototype._NORMAL_OFFSET = 3;

derive(MeshGeom, BaseGeom);

MeshGeom.prototype.setVertAssoc = function(assoc) {
  this._vertAssoc = assoc;
};

MeshGeom.prototype.destroy = function() {
  BaseGeom.prototype.destroy.call(this);
  this._gl.deleteBuffer(this._interleavedBuffer);
  this._gl.deleteBuffer(this._indexBuffer);
};

MeshGeom.prototype.numVerts = function() { return this._numVerts; };

MeshGeom.prototype.shaderForStyleAndPass = function(shaderCatalog, style, pass) {
  if (pass === 'outline') {
    return shaderCatalog.outline;
  }
  if (pass === 'select') {
    return shaderCatalog.select;
  }
  var shader = shaderCatalog[style];
  return shader !== undefined ? shader : null;
};


MeshGeom.prototype.colorBy = function(colorFunc, view) {
  console.time('MeshGeom.colorBy');
  this._ready = false;
  view = view || this.structure();
  this._vertAssoc.recolor(colorFunc, view, this._vertData, this._COLOR_OFFSET,
                          this._FLOATS_PER_VERT);
  console.timeEnd('MeshGeom.colorBy');
};

MeshGeom.prototype.draw = function(cam, shaderCatalog, style, pass) {

  if (!this._visible) { 
    return; 
  }
  
  var shader = this.shaderForStyleAndPass(shaderCatalog, style, pass);
  if (!shader) { 
    return; 
  }
  cam.bind(shader);
  this.bind();

  this._gl.enableVertexAttribArray(shader.posAttrib);
  this._gl.vertexAttribPointer(shader.posAttrib, 3, this._gl.FLOAT, false,
                               this._FLOATS_PER_VERT*4, this._POS_OFFSET*4);

  if (shader.normalAttrib !== -1) {
    this._gl.enableVertexAttribArray(shader.normalAttrib);
    this._gl.vertexAttribPointer(shader.normalAttrib, 3, this._gl.FLOAT, false, 
                                 this._FLOATS_PER_VERT*4, this._NORMAL_OFFSET*4);
  }

  if (shader.colorAttrib !== -1) {
    this._gl.vertexAttribPointer(shader.colorAttrib, 3, this._gl.FLOAT, false,
                                 this._FLOATS_PER_VERT*4, this._COLOR_OFFSET*4);
    this._gl.enableVertexAttribArray(shader.colorAttrib);
  }
  if (shader.objIdAttrib !== -1) {
    this._gl.vertexAttribPointer(shader.objIdAttrib, 1, this._gl.FLOAT, false,
                                 this._FLOATS_PER_VERT*4, 9*4);
    this._gl.enableVertexAttribArray(shader.objIdAttrib);
  }
  this._gl.drawElements(this._gl.TRIANGLES, this._numTriangles*3, 
                        this._gl.UNSIGNED_SHORT, 0);
  this._gl.disableVertexAttribArray(shader.posAttrib);
  if (shader.colorAttrib !==-1) {
    this._gl.disableVertexAttribArray(shader.colorAttrib);
  }
  if (shader.normalAttrib !== -1) {
    this._gl.disableVertexAttribArray(shader.normalAttrib);
  }
  if (shader.objIdAttrib !== -1) {
    this._gl.disableVertexAttribArray(shader.objIdAttrib);
  }
};

MeshGeom.prototype.addVertex = function(pos, normal, color, objId) {
  // pushing all values at once seems to be more efficient than pushing
  // separately. resizing the vertData prior and setting the elements
  // is substantially slower.
  this._vertData.push(pos[0], pos[1], pos[2], normal[0], normal[1], normal[2],
                      color[0], color[1], color[2], objId);
  this._numVerts += 1;
};

MeshGeom.prototype.addTriangle = function(idx1, idx2, idx3) {
  this._indexData.push(idx1, idx2, idx3);
  this._numTriangles += 1;
};

MeshGeom.prototype.bind = function() {
  this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._interleavedBuffer);
  this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
  if (this._ready) {
    return;
  }
  var floatArray = new Float32Array(this._vertData);
  this._gl.bufferData(this._gl.ARRAY_BUFFER, floatArray, 
                      this._gl.STATIC_DRAW);
  var indexArray = new Uint16Array(this._indexData);
  this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, indexArray, 
                      this._gl.STATIC_DRAW);
  this._ready = true;
};


function TextLabel(gl, canvas, context, pos, text) {
  SceneNode.prototype.constructor.call(this, gl);
  this._gl = gl;
  this._pos = pos;
  this._interleavedBuffer = this._gl.createBuffer();
  this._interleavedData = new Float32Array(5*6);

  this._prepareText(canvas, context, text);

  var halfWidth = this._width/2;
  var halfHeight = this._height/2;
  this._interleavedData[0] = pos[0];
  this._interleavedData[1] = pos[1];
  this._interleavedData[2] = pos[2];
  this._interleavedData[3] = -halfWidth;
  this._interleavedData[4] = -halfHeight;

  this._interleavedData[5] = pos[0];
  this._interleavedData[6] = pos[1];
  this._interleavedData[7] = pos[2];
  this._interleavedData[8] = halfWidth;
  this._interleavedData[9] = halfHeight;

  this._interleavedData[10] = pos[0];
  this._interleavedData[11] = pos[1];
  this._interleavedData[12] = pos[2];
  this._interleavedData[13] =  halfWidth;
  this._interleavedData[14] = -halfHeight;


  this._interleavedData[15] = pos[0];
  this._interleavedData[16] = pos[1];
  this._interleavedData[17] = pos[2];
  this._interleavedData[18] = -halfWidth;
  this._interleavedData[19] = -halfHeight;

  this._interleavedData[20] = pos[0];
  this._interleavedData[21] = pos[1];
  this._interleavedData[22] = pos[2];
  this._interleavedData[23] = -halfWidth;
  this._interleavedData[24] = halfHeight;

  this._interleavedData[25] = pos[0];
  this._interleavedData[26] = pos[1];
  this._interleavedData[27] = pos[2];
  this._interleavedData[28] = halfWidth;
  this._interleavedData[29] = halfHeight;


}

derive(TextLabel, SceneNode);

TextLabel.prototype._setupTextParameters = function(ctx) {
  ctx.fillStyle = 'black';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'bottom';
  ctx.font = '24px "Helvetica Neue"';
  ctx.fontWeight = 'lighter';
};

function smallestPowerOfTwo(size) {
  var s = 1;
  while (s < size) {
    s *= 2;
  }
  return s;
}

TextLabel.prototype._prepareText = function(canvas, ctx, text) {
  this._setupTextParameters(ctx);
  var estimatedWidth = ctx.measureText(text).width;
  var estimatedHeight = 24;
  canvas.width = smallestPowerOfTwo(estimatedWidth);
  canvas.height = smallestPowerOfTwo(estimatedHeight);
  this._setupTextParameters(ctx);
  ctx.fillText(text, 0, canvas.height);
  this._texture = this._gl.createTexture();
  this._textureFromCanvas(this._texture, canvas);
  this._xScale = estimatedWidth/canvas.width;
  this._yScale = estimatedHeight/canvas.height;
  this._width = estimatedWidth*0.1;
  this._height = estimatedHeight*0.1;
};

TextLabel.prototype._textureFromCanvas = function(targetTexture, srcCanvas) {
  this._gl.pixelStorei(this._gl.UNPACK_FLIP_Y_WEBGL, true);
  this._gl.bindTexture(this._gl.TEXTURE_2D, targetTexture);
  this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, this._gl.RGBA, 
                      this._gl.UNSIGNED_BYTE, srcCanvas);
  this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, 
                         this._gl.LINEAR);
  this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, 
                   gl.LINEAR_MIPMAP_LINEAR);
  this._gl.generateMipmap(this._gl.TEXTURE_2D);
  this._gl.bindTexture(this._gl.TEXTURE_2D, null);
};

TextLabel.prototype.bind = function() {
  this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._interleavedBuffer);
  this._gl.activeTexture(this._gl.TEXTURE0);
  this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
  if (this._ready) {
    return;
  }
  this._gl.bufferData(this._gl.ARRAY_BUFFER, this._interleavedData, 
                      this._gl.STATIC_DRAW);
  this._ready = true;
};

TextLabel.prototype.draw = function(cam, shaderCatalog, style, pass) {
  if (!this._visible) { return; }
  
  if (pass !== 'normal') {
    return;
  }
  var shader = shaderCatalog.text;
  cam.bind(shader);
  this.bind();
  this._gl.uniform1f(this._gl.getUniformLocation(shader, 'xScale'),
                     this._xScale);
  this._gl.uniform1f(this._gl.getUniformLocation(shader, 'yScale'),
                     this._yScale);
  this._gl.uniform1i(this._gl.getUniformLocation(shader, 'sampler'),
                     0);
  var vertAttrib = this._gl.getAttribLocation(shader, 'attrCenter');
  this._gl.enableVertexAttribArray(vertAttrib);
  this._gl.vertexAttribPointer(vertAttrib, 3, this._gl.FLOAT, false, 5*4, 0*4);
  var texAttrib = this._gl.getAttribLocation(shader, 'attrCorner');
  this._gl.vertexAttribPointer(texAttrib, 2, this._gl.FLOAT, 
                               false, 5*4, 3*4);
  this._gl.enableVertexAttribArray(texAttrib);
  this._gl.enable(this._gl.BLEND);
  this._gl.blendFunc(this._gl.SRC_ALPHA, this._gl.ONE_MINUS_SRC_ALPHA);
  this._gl.drawArrays(this._gl.TRIANGLES, 0, 6);
  this._gl.disableVertexAttribArray(vertAttrib);
  this._gl.disableVertexAttribArray(texAttrib);
  this._gl.disable(this._gl.BLEND);
};

// A continous range of object identifiers.
//
function ContinuousIdRange(pool, start, end) {
  this._pool = pool;
  this._start = start;
  this._next = start;
  this._end = end;
}

ContinuousIdRange.prototype.nextId = function(obj) {
  var id = this._next;
  this._next++;
  this._pool._objects[id] = obj;
  return id;
};
ContinuousIdRange.prototype.recycle = function() { 
  this._pool.recycle(this); 
};
ContinuousIdRange.prototype.length = function() { 
  return this._end - this._start; 
};

function UniqueObjectIdPool() {
  this._objects = {};
  this._unusedRangeStart = 0;
  this._free = [];
}

UniqueObjectIdPool.prototype.getContinuousRange = function(num) {
  // FIXME: keep the "free" list sorted, so we can binary search it
  // for a good match
  var bestIndex = -1;
  var bestLength = null;
  for (var i = 0; i < this._free.length; ++i) {
    var free = this._free[i];
    var length = free.length();
    if (length >= num && (bestLength === null || length < bestLength)) {
      bestLength = length;
      bestIndex = i;
    }
  }
  if (bestIndex !== -1) {
    var result = this._free[bestIndex];
    this._free.splice(bestIndex, 1);
    return result;
  }
  var start = this._unusedRangeStart;
  var end = start + num;
  this._unusedRangeStart = end;
  return new ContinuousIdRange(this, start, end);
};

UniqueObjectIdPool.prototype.recycle = function(range) {
  for (var i = range._start; i < range._next; ++i) {
    delete this._objects[i];
  }
  range._next = range._start;
  this._free.push(range);
};


UniqueObjectIdPool.prototype.objectForId = function(id) {
  return this._objects[id];
};


exports.SceneNode = SceneNode;
exports.AtomVertexAssoc = AtomVertexAssoc;
exports.TraceVertexAssoc = TraceVertexAssoc;
exports.MeshGeom = MeshGeom;
exports.LineGeom = LineGeom;
exports.CompositeGeom = CompositeGeom;
exports.TubeProfile = TubeProfile;
exports.ProtoSphere = ProtoSphere;
exports.ProtoCylinder = ProtoCylinder;
exports.TextLabel = TextLabel;
exports.UniqueObjectIdPool = UniqueObjectIdPool;

})(this);


// Copyright (c) 2013 Marco Biasini
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to 
// deal in the Software without restriction, including without limitation the 
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or 
// sell copies of the Software, and to permit persons to whom the Software is 
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in 
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
// DEALINGS IN THE SOFTWARE.

(function(exports) {
"use strict";

// atom covalent radii by element derived from Cambrige Structural Database. 
// Source: http://profmokeur.ca/chemistry/covalent_radii.htm
var ELEMENT_COVALENT_RADII = {
 H : 0.31, HE : 0.28, LI : 1.28, BE : 0.96,  B : 0.84,  C : 0.76,  N : 0.71, 
 O : 0.66,  F : 0.57, NE : 0.58, NA : 1.66, MG : 1.41, AL : 1.21, SI : 1.11, 
 P : 1.07,  S : 1.05, CL : 1.02, AR : 1.06,  K : 2.03, CA : 1.76, SC : 1.70, 
TI : 1.60,  V : 1.53, CR : 1.39, MN : 1.39, FE : 1.32, CO : 1.26, NI : 1.24, 
CU : 1.32, ZN : 1.22, GA : 1.22, GE : 1.20, AS : 1.19, SE : 1.20, BR : 1.20, 
KR : 1.16, RB : 2.20, SR : 1.95,  Y : 1.90, ZR : 1.75, NB : 1.64, MO : 1.54, 
TC : 1.47, RU : 1.46, RH : 1.42, PD : 1.39, AG : 1.45, CD : 1.44, IN : 1.42, 
SN : 1.39, SB : 1.39, TE : 1.38,  I : 1.39, XE : 1.40, CS : 2.44, BA : 2.15, 
LA : 2.07, CE : 2.04, PR : 2.03, ND : 2.01, PM : 1.99, SM : 1.98, EU : 1.98, 
GD : 1.96, TB : 1.94, DY : 1.92, HO : 1.92, ER : 1.89, TM : 1.90, YB : 1.87, 
LU : 1.87, HF : 1.75, TA : 1.70,  W : 1.62, RE : 1.51, OS : 1.44, IR : 1.41, 
PT : 1.36, AU : 1.36, HG : 1.32, TL : 1.45, PB : 1.46, BI : 1.48, PO : 1.40, 
AT : 1.50, RN : 1.50, FR : 2.60, RA : 2.21, AC : 2.15, TH : 2.06, PA : 2.00, 
 U : 1.96, NP : 1.90, PU : 1.87, AM : 1.80, CM : 1.69
};

function covalentRadius(ele) {
  var r = ELEMENT_COVALENT_RADII[ele.toUpperCase()];
  if (r !== undefined) {
    return r;
  }
  return 1.5;
}

//-----------------------------------------------------------------------------
// MolBase, ChainBase, ResidueBase, AtomBase
//-----------------------------------------------------------------------------

function MolBase() {

}


MolBase.prototype.eachResidue = function(callback) {
  for (var i = 0; i < this._chains.length; i+=1) {
    this._chains[i].eachResidue(callback);
  }
};

MolBase.prototype.eachAtom = function(callback, index) {
  index |= 0;
  for (var i = 0; i < this._chains.length; i+=1) {
    index = this._chains[i].eachAtom(callback, index);
  }
};

MolBase.prototype.residueCount = function () {
  var chains = this.chains();
  var count = 0;
  for (var ci = 0; ci < chains.length; ++ci) {
    count += chains[ci].residues().length;
  }
  return count;
};

MolBase.prototype.atomCount = function() {
  var chains = this.chains();
  var count = 0;
  for (var ci = 0; ci < chains.length; ++ci) {
    var residues = chains[ci].residues();
    for (var ri = 0; ri < residues.length; ++ri) {
      count+= residues[ri].atoms().length;
    }
  }
  return count;
};

MolBase.prototype.center = function() {
  var sum = vec3.create();
  var count = 0;
  this.eachAtom(function(atom) {
    vec3.add(sum, sum, atom.pos());
    count+=1;
  });
  if (count) {
    vec3.scale(sum, sum, 1/count);
  }
  return sum;
};

MolBase.prototype.select = function(what) {

  if (what === 'protein') {
    return this.residueSelect(function(r) { return r.isAminoacid(); });
  }
  if (what === 'water') {
    return this.residueSelect(function(r) { return r.isWater(); });
  }
  if (what === 'ligand') {
    return this.residueSelect(function(r) { 
      return !r.isAminoacid() && !r.isWater();
    });
  }
  // when what is not one of the simple strings above, we assume what
  // is a dictionary containing predicates which have to be fulfilled.
  return this._dictSelect(what);
};

MolBase.prototype.selectWithin = (function() {
  var dist = vec3.create();
  return function(mol, options) {
    console.time('Mol.selectWithin');
    options = options || {};
    var radius = options.radius || 4.0;
    var radiusSqr = radius*radius;
    var matchResidues = !!options.matchResidues;
    var targetAtoms = [];
    mol.eachAtom(function(a) { targetAtoms.push(a); });

    var view = new MolView(this.full());
    var addedRes = null, addedChain = null;
    var chains = this.chains();
    var skipResidue = false;
    for (var ci = 0; ci < chains.length; ++ci) {
      var residues = chains[ci].residues();
      addedChain = null;
      for (var ri = 0; ri < residues.length; ++ri) {
        addedRes = null;
        skipResidue = false;
        var atoms = residues[ri].atoms();
        for (var ai = 0; ai < atoms.length; ++ai) {
          if (skipResidue) {
            break;
          }
          for (var wi = 0; wi < targetAtoms.length; ++wi) {
            vec3.sub(dist, atoms[ai].pos(), targetAtoms[wi].pos());
            if (vec3.sqrLen(dist) > radiusSqr) {
              continue;
            }
            if (!addedChain) {
              addedChain = view.addChain(chains[ci].full(), false);
            }
            if (!addedRes) {
              addedRes = addedChain.addResidue(residues[ri].full(), 
                                               matchResidues);
            }
            if (matchResidues) {
              skipResidue = true;
              break;
            } 
            addedRes.addAtom(atoms[ai].full());
          }
        }
      }
    }
    console.timeEnd('Mol.selectWithin');
    return view;
  };
})();

MolBase.prototype.residueSelect = function(predicate) {
  console.time('Mol.residueSelect');
  var view = new MolView(this.full());
  for (var ci = 0; ci < this._chains.length; ++ci) {
    var chain = this._chains[ci];
    var chainView = null;
    var residues = chain.residues();
    for (var ri = 0; ri < residues.length; ++ri) {
      if (predicate(residues[ri])) {
        if (!chainView) {
          chainView = view.addChain(chain, false);
        }
        chainView.addResidue(residues[ri], true);
      }
    }
  }
  console.timeEnd('Mol.residueSelect');
  return view;
};

MolBase.prototype._atomPredicates = function(dict) {

  var predicates = [];
  if (dict.aname !== undefined) {
    predicates.push(function(a) { return a.name() === dict.aname; });
  }
  if (dict.anames !== undefined) {
    predicates.push(function(a) { 
      var n = a.name();
      for (var k = 0; k < dict.anames.length; ++k) {
        if (n === dict.anames[k]) {
          return true;
        }
      }
      return false;
    });
  }
  return predicates;
};
// extracts the residue predicates from the dictionary. 
// ignores rindices, rindexRange because they are handled separately.
MolBase.prototype._residuePredicates = function(dict) {

  var predicates = [];
  if (dict.rname !== undefined) {
    predicates.push(function(r) { return r.name() === dict.rname; });
  }
  if (dict.rnames !== undefined) {
    predicates.push(function(r) { 
      var n = r.name();
      for (var k = 0; k < dict.rnames.length; ++k) {
        if (n === dict.rnames[k]) {
          return true;
        }
      }
      return false;
    });
  }
  return predicates;
};

MolBase.prototype._chainPredicates = function(dict) {
  var predicates = [];
  if (dict.chain !== undefined) {
    predicates.push(function(c) { return c.name() === dict.chain; });
  }
  if (dict.chains !== undefined) {
    predicates.push(function(c) { 
      var n = c.name();
      for (var k = 0; k < dict.chains.length; ++k) {
        if (n === dict.chains[k]) {
          return true;
        }
      }
      return false;
    });
  }
  return predicates;
};

function fulfillsPredicates(obj, predicates) {
  for (var i = 0; i < predicates.length; ++i) {
    if (!predicates[i](obj)) {
      return false;
    }
  }
  return true;
}

MolBase.prototype._dictSelect = function(dict) {
  var view = new MolView(this);
  var residuePredicates = this._residuePredicates(dict);
  var atomPredicates = this._atomPredicates(dict);
  var chainPredicates = this._chainPredicates(dict);

  for (var ci = 0; ci < this._chains.length; ++ci) {
    var chain = this._chains[ci];
    if (!fulfillsPredicates(chain, chainPredicates)) {
      continue;
    }
    var chainView = null;
    var residues = chain.residues();
    var selResidues = [], i, e;
    if (dict.rindexRange !== undefined) {
      for (i = dict.rindexRange[0], 
           e = Math.min(residues.length, dict.rindexRange[1]); i < e; ++i) {
        selResidues.push(residues[i]);
      }
      residues = selResidues;
    }  else if (dict.rindices) {
      if (dict.rindices.length !== undefined) {
        selResidues = [];
        for (i = 0; i < dict.rindices.length; ++i) {
          selResidues.push(residues[dict.rindices[i]]);
        }
        residues = selResidues;
      }
    }
    for (var ri = 0; ri < residues.length; ++ri) {
      if (!fulfillsPredicates(residues[ri], residuePredicates)) {
        continue;
      }
      if (!chainView) {
        chainView = view.addChain(chain, false);
      }
      var residueView = null;
      var atoms = residues[ri].atoms();
      for (var ai = 0; ai < atoms.length; ++ai) {
        if (!fulfillsPredicates(atoms[ai], atomPredicates)) {
          continue;
        }
        if (!residueView) {
          residueView = chainView.addResidue(residues[ri], false);
        }
        residueView.addAtom(atoms[ai]);
      }
    }
  }
  return view;
};

function ChainBase() {

}

ChainBase.prototype.eachAtom = function(callback, index) {
  index |= 0;
  for (var i = 0; i< this._residues.length; i+=1) {
    index = this._residues[i].eachAtom(callback, index);
  }
  return index;
};

ChainBase.prototype.eachResidue = function(callback) {
  for (var i = 0; i < this._residues.length; i+=1) {
    callback(this._residues[i]);
  }
};



ChainBase.prototype.residues = function() { return this._residues; };

ChainBase.prototype.structure = function() { return this._structure; };


ChainBase.prototype.asView = function() {
  var view = new MolView(this.structure().full());
  view.addChain(this, true);
  return view;

};

ChainBase.prototype.prop = function(propName) { 
  return this[propName]();
};

function ResidueBase() {

}

ResidueBase.prototype.prop = function(propName) { 
  return this[propName]();
};

ResidueBase.prototype.isWater = function() {
  return this.name() === 'HOH' || this.name() === 'DOD';
};

ResidueBase.prototype.eachAtom = function(callback, index) {
  index |= 0;
  for (var i =0; i< this._atoms.length; i+=1) {
    callback(this._atoms[i], index);
    index +=1;
  }
  return index;
};

ResidueBase.prototype.qualifiedName = function() {
  return this.chain().name()+'.'+this.name()+this.num();
};

ResidueBase.prototype.atom = function(index_or_name) { 
  if (typeof index_or_name === 'string') {
    for (var i =0; i < this._atoms.length; ++i) {
     if (this._atoms[i].name() === index_or_name) {
       return this._atoms[i];
     }
    }
  }
  return this._atoms[index_or_name]; 
};


ResidueBase.prototype.center = function() {
  var count = 0;
  var c = vec3.create();
  this.eachAtom(function(atom) {
    vec3.add(c, c, atom.pos());
    count += 1;
  });
  if (count > 0) {
    vec3.scale(c, c, 1.0/count);
  }
  return c;
};

ResidueBase.prototype.isAminoacid = function() { 
  return this.atom('N') && this.atom('CA') && this.atom('C') && this.atom('O');
};
function AtomBase() {
}

AtomBase.prototype.name = function() { return this._name; };
AtomBase.prototype.pos = function() { return this._pos; };
AtomBase.prototype.element = function() { return this._element; };
AtomBase.prototype.index = function() { return this._index; };

AtomBase.prototype.prop = function(propName) { 
  return this[propName]();
};

AtomBase.prototype.eachBond = function(callback) {
  var bonds = this.bonds();
  for (var i = 0, e = bonds.length; i < e; ++i) {
    callback(bonds[i]);
  }
};

//-----------------------------------------------------------------------------
// Mol, Chain, Residue, Atom, Bond
//-----------------------------------------------------------------------------

function Mol(pv) {
  MolBase.prototype.constructor.call(this);
  this._chains = [];
  this._pv = pv;
  this._nextAtomIndex = 0;
}

derive(Mol, MolBase);


Mol.prototype.chains = function() { return this._chains; };

Mol.prototype.full = function() { return this; };

Mol.prototype.containsResidue = function(residue) {
  return residue.full().structure() === this;
};

Mol.prototype.chain = function(name) { 
  for (var i = 0; i < this._chains.length; ++i) {
    if (this._chains[i].name() === name) {
      return this._chains[i];
    }
  }
  return null;
};

Mol.prototype.nextAtomIndex = function() {
  var nextIndex = this._nextAtomIndex; 
  this._nextAtomIndex+=1; 
  return nextIndex; 
};

Mol.prototype.addChain = function(name) {
  var chain = new Chain(this, name);
  this._chains.push(chain);
  return chain;
};


Mol.prototype.connect = function(atom_a, atom_b) {
  var bond = new Bond(atom_a, atom_b);
  atom_a.addBond(bond);
  atom_b.addBond(bond);
  return bond;
};

// determine connectivity structure. for simplicity only connects atoms of the 
// same residue and peptide bonds
Mol.prototype.deriveConnectivity = function() {
  console.time('Mol.deriveConnectivity');
  var this_structure = this;
  var prev_residue;
  this.eachResidue(function(res) {
    var sqr_dist;
    var d = vec3.create();
    for (var i = 0; i < res.atoms().length; i+=1) {
      var atomI = res.atom(i);
      var covalentI = covalentRadius(atomI.element());
      for (var j = 0; j < i; j+=1) {
        var atomJ = res.atom(j);
        var covalentJ = covalentRadius(atomJ.element());
        sqr_dist = vec3.sqrDist(atomI.pos(), atomJ.pos());
        var lower = covalentI+covalentJ-0.30;
        var upper = covalentI+covalentJ+0.30;
        if (sqr_dist < upper*upper && sqr_dist > lower*lower) {
          this_structure.connect(res.atom(i), res.atom(j));
        }
      }
    }
    if (prev_residue) {
    var c_atom = prev_residue.atom('C');
    var n_atom = res.atom('N');
    if (c_atom && n_atom) {
      sqr_dist = vec3.sqrDist(c_atom.pos(), n_atom.pos());
      if (sqr_dist < 1.6*1.6) {
        this_structure.connect(n_atom, c_atom);
      }
    }
    }
    prev_residue = res;
  });
  console.timeEnd('Mol.deriveConnectivity');
};

function Chain(structure, name) {
  ChainBase.prototype.constructor.call(this);
  this._structure = structure;
  this._name = name;
  this._cachedTraces = [];
  this._residues = [];
}

derive(Chain, ChainBase);

Chain.prototype.name = function() { return this._name; };

Chain.prototype.full = function() { return this; };

Chain.prototype.addResidue = function(name, num) {
  var residue = new Residue(this, name, num);
  this._residues.push(residue);
  return residue;
};

// assigns secondary structure to residues in range from_num to to_num.
Chain.prototype.assign_ss = function(from_num, to_num, ss) {
  // FIXME: when the chain numbers are completely ordered, perform binary 
  // search to identify range of residues to assign secondary structure to.
  for (var i = 1; i < this._residues.length-1; ++i) {
    var res = this._residues[i];
    // FIXME: we currently don't set the secondary structure of the first and 
    // last residue of helices and sheets. that takes care of better 
    // transitions between coils and helices. ideally, this should be done
    // in the cartoon renderer, NOT in this function.
    if (res.num() <=  from_num || res.num() >= to_num) {
      continue;
    }
    res.set_ss(ss);
  }
};

// invokes a callback for each connected stretch of amino acids. these 
// stretches are used for all trace-based rendering styles, e.g. sline, 
// line_trace, tube, cartoon etc. 
Chain.prototype.eachBackboneTrace = function(callback) {
  this._cacheBackboneTraces();
  for (var i=0; i < this._cachedTraces.length; ++i) {
    callback(this._cachedTraces[i]);
  }
};

Chain.prototype._cacheBackboneTraces = function() {
  if (this._cachedTraces.length > 0) {
    return;
  }
  var  stretch = new BackboneTrace();
  for (var i = 0; i < this._residues.length; i+=1) {
    var residue = this._residues[i];
    if (!residue.isAminoacid()) {
      if (stretch.length() > 1) {
        this._cachedTraces.push(stretch);
        stretch = new BackboneTrace();
      }
      continue;
    }
    if (stretch.length() === 0) {
      stretch.push(residue);
      continue;
    }
    var ca_prev = this._residues[i-1].atom('C');
    var n_this = residue.atom('N');
    if (Math.abs(vec3.sqrDist(ca_prev.pos(), n_this.pos()) - 1.5*1.5) < 1) {
      stretch.push(residue);
    } else {
      if (stretch.length() > 1) {
        this._cachedTraces.push(stretch);
        stretch = new BackboneTrace();
      }
    }
  }
  if (stretch.length() > 1) {
    this._cachedTraces.push(stretch);
  }
};


// returns all connected stretches of amino acids found in this chain as 
// a list.
Chain.prototype.backboneTraces = function() {
  var traces = [];
  this.eachBackboneTrace(function(trace) { traces.push(trace); });
  return traces;

};

function Residue(chain, name, num) {
  ResidueBase.prototype.constructor.call(this);
  this._name = name;
  this._num = num;
  this._atoms = [];
  this._ss = 'C';
  this._chain = chain;
  this._index = chain.residues().length;
}

derive(Residue, ResidueBase);

Residue.prototype.name = function() { return this._name; };

Residue.prototype.num = function() { return this._num; };

Residue.prototype.full = function() { return this; };

Residue.prototype.addAtom = function(name, pos, element) {
  var atom = new Atom(this, name, pos, element, this.structure().nextAtomIndex());
  this._atoms.push(atom);
  return atom;
};

Residue.prototype.ss = function() { return this._ss; };
Residue.prototype.set_ss = function(ss) { this._ss = ss; };
Residue.prototype.index = function() { return this._index; };

Residue.prototype.atoms = function() { return this._atoms; };
Residue.prototype.chain = function() { return this._chain; };


Residue.prototype.structure = function() { 
  return this._chain.structure(); 
};

function Atom(residue, name, pos, element, index) {
  AtomBase.prototype.constructor.call(this);
  this._residue = residue;
  this._bonds = [];
  this._name = name;
  this._pos = pos;
  this._index = index;
  this._element = element;
}

derive(Atom, AtomBase);

Atom.prototype.addBond = function(bond) { this._bonds.push(bond); };
Atom.prototype.name = function() { return this._name; };
Atom.prototype.bonds = function() { return this._bonds; };
Atom.prototype.residue = function() { return this._residue; };
Atom.prototype.structure = function() { return this._residue.structure(); };
Atom.prototype.full = function() { return this; };
Atom.prototype.qualifiedName = function() {
  return this.residue().qualifiedName()+'.'+this.name();
};

var Bond = function(atom_a, atom_b) {
  var self = {
    atom_one : atom_a,
    atom_two : atom_b
  };
  return {
    atom_one : function() { return self.atom_one; },
    atom_two : function() { return self.atom_two; },

    // calculates the mid-point between the two atom positions
    mid_point : function(out) { 
      if (!out) {
        out = vec3.create();
      }
      vec3.add(out, self.atom_one.pos(), self.atom_two.pos());
      vec3.scale(out, out, 0.5);
      return out;
    }
  };
};

//-----------------------------------------------------------------------------
// MolView, ChainView, ResidueView, AtomView
//-----------------------------------------------------------------------------

function MolView(mol) {
  MolBase.prototype.constructor.call(this);
  this._mol = mol; 
  this._chains = [];
}

derive(MolView, MolBase);

MolView.prototype.full = function() { return this._mol; };

// add chain to view
MolView.prototype.addChain = function(chain, recurse) {
  var chainView = new ChainView(this, chain.full());
  this._chains.push(chainView);
  if (recurse) {
    var residues = chain.residues();
    for (var i = 0; i< residues.length; ++i) {
      chainView.addResidue(residues[i], true);
    }
  }
  return chainView;
};


MolView.prototype.containsResidue = function(residue) {
  if (!residue) {
    return false;
  }
  var chain = this.chain(residue.chain().name());
  if (!chain) {
    return false;
  }
  return chain.containsResidue(residue);
};


MolView.prototype.chains = function() { return this._chains; };


MolView.prototype.chain = function(name) {
  for (var i = 0; i < this._chains.length; ++i) {
    if (this._chains[i].name() === name) {
      return this._chains[i];
    }
  }
  return null;
};

function ChainView(molView, chain) {
  ChainBase.prototype.constructor.call(this);
  this._chain = chain;
  this._residues = [];
  this._molView = molView;
  this._residueMap = {};
}


derive(ChainView, ChainBase);

ChainView.prototype.addResidue = function(residue, recurse) {
  var resView = new ResidueView(this, residue.full());
  this._residues.push(resView);
  this._residueMap[residue.full().index()] = resView;
  if (recurse) {
    var atoms = residue.atoms();
    for (var i = 0; i < atoms.length; ++i) {
      resView.addAtom(atoms[i].full());
    }
  }
  return resView;
};

ChainView.prototype.containsResidue = function(residue) {
  var resView = this._residueMap[residue.full().index()];
  if (resView === undefined) {
    return false;
  }
  return resView.full() === residue.full();
};


ChainView.prototype.eachBackboneTrace = function(callback) {
  // backbone traces for the view must be based on the the full 
  // traces for the following reasons:
  //  - we must be able to display subsets with one residue in length,
  //    when they are part of a larger trace. 
  //  - when a trace residue is not at the end, e.g. the C-terminal or
  //    N-terminal end of the full trace, the trace residue starts
  //    midway between the residue and the previous, and ends midway
  //    between the residue and the next.
  //  - the tangents for the Catmull-Rom spline depend on the residues
  //    before and after. Thus, to get the same curvature for a 
  //    trace subset, the residues before and after must be taken
  //    into account.
  var fullTraces = this._chain.backboneTraces();
  var traceSubsets = [];
  for (var i = 0; i < fullTraces.length; ++i) {
    var subsets = fullTraces[i].subsets(this._residues);
    for (var j = 0; j < subsets.length; ++j) {
      callback(subsets[j]);
    }
  }
};

ChainView.prototype.backboneTraces = function() {
  var traces = [];
  this.eachBackboneTrace(function(trace) { traces.push(trace); });
  return traces;
};

ChainView.prototype.full = function() { return this._chain; };

ChainView.prototype.name = function () { return this._chain.name(); };

ChainView.prototype.structure = function() { return this._molView; };

function ResidueView(chainView, residue) {
  ResidueBase.prototype.constructor.call(this);
  this._chainView = chainView;
  this._atoms = [];
  this._residue = residue;
}


derive(ResidueView, ResidueBase);

ResidueView.prototype.addAtom = function(atom) {
  var atomView = new AtomView(this, atom.full());
  this._atoms.push(atomView);
};

ResidueView.prototype.full = function() { return this._residue; };
ResidueView.prototype.num = function() { return this._residue.num(); };
ResidueView.prototype.ss = function() { return this._residue.ss(); };
ResidueView.prototype.index = function() { return this._residue.index(); };
ResidueView.prototype.chain = function() { return this._chainView; };
ResidueView.prototype.name = function() { return this._residue.name(); };

ResidueView.prototype.atoms = function() { return this._atoms; };
ResidueView.prototype.qualifiedName = function() {
  return this._residue.qualifiedName();
};



function AtomView(resView, atom) {
  AtomBase.prototype.constructor.call(this);
  this._resView = resView;
  this._atom = atom;
  this._bonds = [];
}


derive(AtomView, AtomBase);

AtomView.prototype.full = function() { return this._atom; };
AtomView.prototype.name = function() { return this._atom.name(); };
AtomView.prototype.pos = function() { return this._atom.pos(); };
AtomView.prototype.element = function() { return this._atom.element(); };
AtomView.prototype.residue = function() { return this._resView; };
AtomView.prototype.bonds = function() { return this._atom.bonds(); };
AtomView.prototype.index = function() { return this._atom.index(); };
AtomView.prototype.qualifiedName = function() {
  return this._atom.qualifiedName();
};


function parseHelixRecord(line) {
  // FIXME: handle insertion codes
  var frst_num = parseInt(line.substr(21, 4), 10);
  var last_num = parseInt(line.substr(33, 4), 10);
  var chainName = line[19];
  return { first : frst_num, last : last_num, chainName : chainName };
}

function parseSheetRecord(line) {
  // FIXME: handle insertion codes
  var frst_num = parseInt(line.substr(22, 4), 10);
  var last_num = parseInt(line.substr(33, 4), 10);
  var chainName = line[21];
  return { first : frst_num, last : last_num, chainName : chainName };
}

// a truly minimalistic PDB parser. It will die as soon as the input is 
// not well-formed. it only reads ATOM, HETATM, HELIX and SHEET records, 
// everything else is ignored. in case of multi-model files, only the 
// first model is read.
//
// FIXME: load PDB currently spends a substantial amount of time creating
// the vec3 instances for the atom positions. it's possible that it's
// cheaper to initialize a bulk buffer once and create buffer views to
// that data for each atom position. since the atom's lifetime is bound to
// the parent structure, the buffer could be managed on that level and
// released once the structure is deleted.
function pdb(text) {
  console.time('pdb'); 
  var structure = new Mol();
  var currChain = null;
  var currRes = null;
  var currAtom = null;
  
  var helices = [];
  var sheets = [];
  
  function parseAndAddAtom(line, hetatm) {
    var alt_loc = line[16];
    if (alt_loc !== ' ' && alt_loc !== 'A') {
      return;
    }
    var chainName = line[21];
    var res_name = line.substr(17, 3);
    var atomName = line.substr(12, 4).trim();
    var rnumNum = parseInt(line.substr(22, 4), 10);
    var insCode = line[26];
    var updateResidue = false;
    var updateChain = false;
    if (!currChain || currChain.name() !== chainName) {
      updateChain = true;
      updateResidue = true;
    }
    if (!currRes || currRes.num() !== rnumNum) {
      updateResidue = true;
    }
    if (updateChain) {
      // residues of one chain might appear interspersed with residues from
      // other chains.
      currChain = structure.chain(chainName) || structure.addChain(chainName);
    }
    if (updateResidue) {
      currRes = currChain.addResidue(res_name, rnumNum,
                                       currChain.residues().length);
    }
    var pos = vec3.create();
    for (var i=0;i<3;++i) {
      pos[i] = (parseFloat(line.substr(30+i*8, 8)));
    }
    currRes.addAtom(atomName, pos, line.substr(76, 2).trim());
  }
  var lines = text.split(/\r\n|\r|\n/g);
  var i = 0;
  for (i = 0; i < lines.length; i++) {
    var line = lines[i];
    var recordName = line.substr(0, 6);

    if (recordName === 'ATOM  ') {
      parseAndAddAtom(line, false);
      continue;
    }
    if (recordName === 'HETATM') {
      parseAndAddAtom(line, true);
      continue;
    }
    if (recordName === 'HELIX ') {
      helices.push(parseHelixRecord(line));
      continue;
    }
    if (recordName === 'SHEET ') {
      sheets.push(parseSheetRecord(line));
      continue;
    }
    if (recordName === 'END') {
      break;
    }
  }
  var chain = null;
  for (i = 0; i < sheets.length; ++i) {
    var sheet = sheets[i];
    chain = structure.chain(sheet.chainName);
    if (chain) {
      chain.assign_ss(sheet.first, sheet.last, 'E');
    }
  }
  for (i = 0; i < helices.length; ++i) {
    var helix = helices[i];
    chain = structure.chain(helix.chainName);
    if (chain) {
      chain.assign_ss(helix.first, helix.last, 'H');
    }
  }
  structure.deriveConnectivity();
  console.log('imported', structure.chains().length, 'chain(s),',
              structure.residueCount(), 'residue(s)');
  console.timeEnd('pdb');

  return structure;
}

exports.mol = {};

exports.mol.Mol = Mol;
exports.mol.Chain = Chain;
exports.mol.Residue = Residue;
exports.mol.Atom = Atom;

exports.mol.MolView = MolView;
exports.mol.ChainView = ChainView;
exports.mol.ResidueView = ResidueView;
exports.mol.AtomView = AtomView;
exports.mol.pdb = pdb;

return true;

})(this);

// Copyright (c) 2013 Marco Biasini
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to 
// deal in the Software without restriction, including without limitation the 
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or 
// sell copies of the Software, and to permit persons to whom the Software is 
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in 
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
// DEALINGS IN THE SOFTWARE.

function BackboneTrace() {
  this._trace = [];
}

BackboneTrace.prototype.push = function(residue) {
  this._trace.push(residue);
};

BackboneTrace.prototype.length = function() { 
  return this._trace.length; 
};

BackboneTrace.prototype.residueAt = function(index) { 
  return this._trace[index]; 
};

BackboneTrace.prototype.posAt = function(out, index) { 
   vec3.copy(out, this._trace[index].atom('CA').pos()); 
   return out;
};

BackboneTrace.prototype.normalAt = function(out, index) { 
   vec3.sub(out, this._trace[index].atom('O').pos(), 
            this._trace[index].atom('C').pos()); 
   vec3.normalize(out, out);
   return out;
};

// nothing needs to be done for the backbone trace.
BackboneTrace.prototype.smoothPosAt = BackboneTrace.prototype.posAt;
BackboneTrace.prototype.smoothNormalAt = BackboneTrace.prototype.normalAt;

BackboneTrace.prototype.centralAtomAt = function(index) {
  return this._trace[index].atom('CA');
};

BackboneTrace.prototype.tangentAt = (function() {
  var posBefore = vec3.create();
  var posAfter = vec3.create();
  return function(out, index) {
    if (index > 0) {
      this.posAt(posBefore, index-1);
    } else {
      this.posAt(posBefore, index);
    }
    if (index < this._trace.length-1) {
      this.posAt(posAfter, index+1);
    } else {
      this.posAt(posAfter, index);
    }
    vec3.sub(out, posAfter, posBefore);
  };
})();


BackboneTrace.prototype.fullTraceIndex = function(index) { return index; };

BackboneTrace.prototype.subsets = function(residues) {
  // we assume that the residue list is ordered from N- to C-
  // terminus and we can traverse it in one go.
  var fullTraceIdx = 0, listIdx = 0;
  var subsets = [];
  while (listIdx < residues.length && fullTraceIdx < this._trace.length) {
    // increase pointer until we residue indices match.
    var residueIndex = residues[listIdx].full().index();
    while (this._trace.length > fullTraceIdx && 
           this._trace[fullTraceIdx].index() < residueIndex) {
      ++fullTraceIdx;
    }
    if (fullTraceIdx >= this._trace.length) {
      break;
    }
    var traceIndex = this._trace[fullTraceIdx].index();
    while (residues.length > listIdx && 
           residues[listIdx].full().index() < traceIndex) {
      ++listIdx;
    }
    if (listIdx >= residues.length) {
      break;
    }
    var fullTraceBegin = fullTraceIdx;
    var residueListBegin = listIdx;
    while (residues.length > listIdx && 
           this._trace.length > fullTraceIdx &&
           residues[listIdx].full().index() === this._trace[fullTraceIdx].index()) {
      ++listIdx;
      ++fullTraceIdx;
    }
    var residueListEnd = listIdx;
    var fullTraceEnd = fullTraceIdx;
    subsets.push(new TraceSubset(this, fullTraceBegin, fullTraceEnd,
                                 residues.slice(residueListBegin, 
                                                residueListEnd)));
    
  }
  return subsets;
};

// a trace subset, e.g. the part of a trace contained in a view. End regions
// are handled automatically depending on whether the beginning/end of the 
// trace subset coincides with the C- and N-terminus of the full trace.
function TraceSubset(fullTrace, fullTraceBegin, fullTraceEnd, trace) {
  this._fullTrace = fullTrace;
  this._fullTraceBegin = fullTraceBegin;
  this._fullTraceEnd = fullTraceEnd;
  this._trace = trace;
  this._isNTerminal = this._fullTraceBegin === 0;
  this._isCTerminal = this._fullTrace.length() === this._fullTraceEnd;
  var length = this._fullTraceEnd - this._fullTraceBegin; 
  if (!this._isCTerminal) {
    ++length;
  }
  if (!this._isNTerminal) {
    ++length;
    this._fullTraceBegin -= 1;
  }
  this._length = length;
}


TraceSubset.prototype.length = function() { 
  return this._length;
};

TraceSubset.prototype.residueAt = function(index) { 
  return this._fullTrace.residueAt(this._fullTraceBegin+index); 
};

TraceSubset.prototype._interpolate = (function() {
  var posOne = vec3.create();
  var tangentOne = vec3.create();
  var tangentTwo = vec3.create();
  return function(out, indexOne, indexTwo, strength) {
      this.tangentAt(tangentOne, indexOne);
      this.tangentAt(tangentTwo, indexTwo);
      vec3.scale(tangentOne, tangentOne, strength);
      vec3.scale(tangentTwo, tangentTwo, strength);
      geom.cubicHermiteInterpolate(out, 
                                   this.centralAtomAt(indexOne).pos(),
                                   tangentOne, 
                                   this.centralAtomAt(indexTwo).pos(),
                                   tangentTwo, 0.5, 0);
      return out;
  };
})();

// like posAt, but interpolates the position for the ends with a Catmull-Rom 
// spline.
TraceSubset.prototype.smoothPosAt = (function() {
  var posOne = vec3.create();
  var tangentOne = vec3.create();
  var tangentTwo = vec3.create();
  return function(out, index, strength) { 
    if (index === 0 && !this._isNTerminal) {
      return this._interpolate(out, index, index+1, strength);
    }
    if (index === this._length-1 && !this._isCTerminal) {
      return this._interpolate(out, index-1, index, strength);
    }
    var atom = this.centralAtomAt(index);
    vec3.copy(out, atom.pos()); 
    return out;
  };
})();


TraceSubset.prototype.smoothNormalAt = (function() {
  return function(out, index, strength) {
    this._fullTrace.normalAt(out, index+this._fullTraceBegin);
    return out;
  };
})();


TraceSubset.prototype.posAt = function(out, index) { 
  var atom = this.centralAtomAt(index);
  var atom2 = null;
  vec3.copy(out, atom.pos()); 
  if (index === 0 && !this._isNTerminal) {
    atom2 = this.centralAtomAt(index+1);
    vec3.add(out, out, atom2.pos());
    vec3.scale(out, out, 0.5);
  }
  if (index === this._length-1 && !this._isCTerminal) {
    atom2 = this.centralAtomAt(index-1);
    vec3.add(out, out, atom2.pos());
    vec3.scale(out, out, 0.5);
  }
  return out;
};

TraceSubset.prototype.centralAtomAt = function(index) {
  return this.residueAt(index).atom('CA');
};

TraceSubset.prototype.fullTraceIndex = function(index) { 
  return this._fullTraceBegin+index; 
};
TraceSubset.prototype.tangentAt =  function(out, index) {
  return this._fullTrace.tangentAt(out, index+this._fullTraceBegin);
};

// Copyright (c) 2013 Marco Biasini
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy 
// of this software and associated documentation files (the "Software"), to deal 
// in the Software without restriction, including without limitation the rights 
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
// copies of the Software, and to permit persons to whom the Software is 
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
// SOFTWARE.

var render = (function() {
"use strict";

var exports = {};

var R = 0.7071;
var COIL_POINTS = [
  -R, -R, 0,
   R, -R, 0,
   R, R, 0,
  -R,  R, 0
];


var HELIX_POINTS = [
  -6*R, -1.0*R, 0,
   6*R, -1.0*R, 0,
   6*R, 1.0*R, 0,
  -6*R,  1.0*R, 0
];

// performs an in-place smoothing over 3 consecutive positions.
var inplaceSmooth = (function() {
  var bf = vec3.create(), af = vec3.create(), cf = vec3.create();
  return function(positions, from, to) {
    vec3.set(bf, positions[3*(from-1)], positions[3*(from-1)+1], 
             positions[3*(from-1)+2]);
    vec3.set(cf, positions[3*from], positions[3*from+1], positions[3*from+2]);
    for (var i = from+1; i < to; ++i) {
      vec3.set(af, positions[3*i], positions[3*i+1], positions[3*i+2]);
      positions[3*(i-1)]   = af[0]*0.25 + cf[0]*0.50 + bf[0]*0.25;
      positions[3*(i-1)+1] = af[1]*0.25 + cf[1]*0.50 + bf[1]*0.25;
      positions[3*(i-1)+2] = af[2]*0.25 + cf[2]*0.50 + bf[2]*0.25;
      vec3.copy(bf, cf);
      vec3.copy(cf, af);
    }
  };
})();

// derive a rotation matrix which rotates the z-axis onto tangent. when
// left is given and use_hint is true, x-axis is chosen to be as close
// as possible to left.
//
// upon returning, left will be modified to contain the updated left
// direction.
var buildRotation = (function() {
  return function(rotation, tangent, left, up, use_left_hint) {
    if (use_left_hint) {
      vec3.cross(up, tangent, left);
    } else {
      geom.ortho(up, tangent);
    }

    vec3.cross(left, up, tangent);
    vec3.normalize(up, up);
    vec3.normalize(left, left);
    rotation[0] = left[0];
    rotation[1] = left[1];
    rotation[2] = left[2];

    rotation[3] = up[0];
    rotation[4] = up[1];
    rotation[5] = up[2];

    rotation[6] = tangent[0];
    rotation[7] = tangent[1];
    rotation[8] = tangent[2];
  };
})();

exports.spheres = function(structure, gl, options) {
  console.time('spheres');
  var clr = vec3.create();
  var geom = new MeshGeom(gl);
  var protoSphere = new ProtoSphere(options.sphereDetail, options.sphereDetail);
  var vertAssoc = new AtomVertexAssoc(structure, true);
  options.color.begin(structure);
  var atomCount = structure.atomCount();
  var idRange = options.idPool.getContinuousRange(atomCount);
  geom.addIdRange(idRange);
  structure.eachAtom(function(atom) {
    options.color.colorFor(atom, clr, 0);
    var vertStart = geom.numVerts();
    var objId = idRange.nextId(atom);
    protoSphere.addTransformed(geom, atom.pos(), 1.5, clr, objId);
    var vertEnd = geom.numVerts();
    vertAssoc.addAssoc(atom, vertStart, vertEnd);
  });
  geom.setVertAssoc(vertAssoc);
  console.timeEnd('spheres');
  options.color.end(structure);
  return geom;
};

exports.ballsAndSticks = (function() {
  var mp = vec3.create(), dir = vec3.create();
  var clr = vec3.create();
  var left = vec3.create(), up = vec3.create();
  var rotation = mat3.create();

  return function(structure, gl, options) {
    console.time('ballsAndSticks');
    var meshGeom = new MeshGeom(gl);
    var vertAssoc = new AtomVertexAssoc(structure, true);
    var protoSphere = new ProtoSphere(options.sphereDetail, options.sphereDetail);
    var protoCyl = new ProtoCylinder(options.arcDetail);
    var atomCount = structure.atomCount();
    var idRange = options.idPool.getContinuousRange(atomCount);
    meshGeom.addIdRange(idRange);
    options.color.begin(structure);
    structure.eachAtom(function(atom) {
      var objId = idRange.nextId(atom);
      var vertStart = meshGeom.numVerts();
      options.color.colorFor(atom, clr, 0);
      protoSphere.addTransformed(meshGeom, atom.pos(), options.radius, clr,
                                 objId);
      atom.eachBond(function(bond) {
        bond.mid_point(mp); 
        vec3.sub(dir, atom.pos(), mp);
        var length = vec3.length(dir);

        vec3.scale(dir, dir, 1.0/length);

        buildRotation(rotation, dir, left, up, false);

        vec3.add(mp, mp, atom.pos());
        vec3.scale(mp, mp, 0.5);
        protoCyl.addTransformed(meshGeom, mp, length, options.radius, rotation, 
                                clr, clr, objId);
      });
      var vertEnd = meshGeom.numVerts();
      vertAssoc.addAssoc(atom, vertStart, vertEnd);
    });
    meshGeom.setVertAssoc(vertAssoc);
    options.color.end(structure);
    console.timeEnd('ballsAndSticks');
    return meshGeom;
  };
})();

exports.lines = function(structure, gl, options) {
  console.time('lines');
  var mp = vec3.create();
  var lineGeom = new LineGeom(gl);
  lineGeom.setLineWidth(options.lineWidth);
  var clr = vec3.create();
  var vertAssoc = new AtomVertexAssoc(structure, true);
  options.color.begin(structure);
  var atomCount = structure.atomCount();
  var idRange = options.idPool.getContinuousRange(atomCount);
  lineGeom.addIdRange(idRange);
  structure.eachAtom(function(atom) {
    // for atoms without bonds, we draw a small cross, otherwise these atoms 
    // would be invisible on the screen.
    var vertStart = lineGeom.numVerts();
    var objId = idRange.nextId(atom);
    if (atom.bonds().length) {
      atom.eachBond(function(bond) {
        bond.mid_point(mp); 
        options.color.colorFor(atom, clr, 0);
        lineGeom.addLine(atom.pos(), clr, mp, clr, objId, objId);
      });
    } else {
      var cs = 0.2;
      var pos = atom.pos();
      options.color.colorFor(atom, clr, 0);
      lineGeom.addLine([pos[0]-cs, pos[1], pos[2]], clr, 
                        [pos[0]+cs, pos[1], pos[2]], clr, objId, objId);
      lineGeom.addLine([pos[0], pos[1]-cs, pos[2]], clr, 
                        [pos[0], pos[1]+cs, pos[2]], clr, objId, objId);
      lineGeom.addLine([pos[0], pos[1], pos[2]-cs], clr, 
                        [pos[0], pos[1], pos[2]+cs], clr, objId, objId);
    }
    var vertEnd = lineGeom.numVerts();
    vertAssoc.addAssoc(atom, vertStart, vertEnd);
  });
  lineGeom.setVertAssoc(vertAssoc);
  options.color.end(structure);
  console.timeEnd('lines');
  return lineGeom;
};

//--------------------------------------------------------------------------
// Some thoughts on trace-based render styles
//
//  * Backbone traces must be determined from the complete structure (Chain 
//    as opposed to ChainView). 
//
//  * For subsets, the trace must start midway between the residue before 
//    the visible part, and end midway after the last visible residue. 
//
//  * Curvature of trace subsets must be based on the full backbone trace. 
//--------------------------------------------------------------------------
exports.lineTrace = (function() {
  
  var colorOne = vec3.create(), colorTwo = vec3.create();
  var posOne = vec3.create(), posTwo = vec3.create();
  
  return function(structure, gl, options) {
    console.time('lineTrace');
    var lineGeom = new LineGeom(gl);
    var vertAssoc = new TraceVertexAssoc(structure, 1, true);
    lineGeom.setLineWidth(options.lineWidth);
    options.color.begin(structure);
    var chains = structure.chains();
    var traceIndex = 0;
    function makeLineTrace(trace) {
      vertAssoc.addAssoc(traceIndex, 0, lineGeom.numVerts(), 
                        lineGeom.numVerts()+1);
      var colors = new Float32Array(trace.length()*3);
      var idRange = options.idPool.getContinuousRange(trace.length());
      var idOne = idRange.nextId(trace.residueAt(0)), idTwo;
      lineGeom.addIdRange(idRange);
      for (var i = 1; i < trace.length(); ++i) {
        options.color.colorFor(trace.centralAtomAt(i-1), colorOne, 0);
        colors[(i-1)*3] = colorOne[0]; colors[(i-1)*3+1] = colorOne[1];
        colors[(i-1)*3+2] = colorOne[2];
        options.color.colorFor(trace.centralAtomAt(i), colorTwo, 0);
        trace.posAt(posOne, i-1);
        trace.posAt(posTwo, i);
        idTwo = idRange.nextId(trace.residueAt(i));

        lineGeom.addLine(posOne, colorOne, posTwo, colorTwo, 
                         idOne, idTwo);
        idOne = idTwo;
        idTwo = null;
        var vertEnd = lineGeom.numVerts();
        vertAssoc.addAssoc(traceIndex, i, vertEnd-1, 
                          vertEnd+((i === trace.length()-1) ? 0 : 1));
      }
      colors[trace.length()*3-3] = colorTwo[0];
      colors[trace.length()*3-2] = colorTwo[1];
      colors[trace.length()*3-1] = colorTwo[2];
      vertAssoc.setPerResidueColors(traceIndex, colors);
      traceIndex += 1;
    }
    for (var ci = 0; ci < chains.length; ++ci) {
      var chain = chains[ci];
      chain.eachBackboneTrace(makeLineTrace);
    }
    lineGeom.setVertAssoc(vertAssoc);
    options.color.end(structure);
    console.timeEnd('lineTrace');
    return lineGeom;
  };

})();


exports.sline = function(structure, gl, options) {
  console.time('sline');
  var lineGeom = new LineGeom(gl);
  options.color.begin(structure);
  var vertAssoc = new TraceVertexAssoc(structure, options.splineDetail, 1, true);
  lineGeom.setLineWidth(options.lineWidth);
  var posOne = vec3.create(), posTwo = vec3.create();
  var colorOne = vec3.create(), colorTwo = vec3.create();
  var chains = structure.chains();
  var i, e, traceIndex = 0;
  function makeTrace(trace) {
    var firstSlice = trace.fullTraceIndex(0);
    var positions = new Float32Array(trace.length()*3);
    var colors = new Float32Array(trace.length()*3);
    var objIds = [];
    var idRange = options.idPool.getContinuousRange(trace.length());
    lineGeom.addIdRange(idRange);

    for (i = 0; i < trace.length(); ++i) {
      var atom = trace.centralAtomAt(i);
      trace.smoothPosAt(posOne, i, options.strength);
      options.color.colorFor(atom, colors, 3*i);
      positions[i*3] = posOne[0];
      positions[i*3+1] = posOne[1];
      positions[i*3+2] = posOne[2];
      objIds.push(idRange.nextId(atom.residue()));
    }
    var idStart = objIds[0], idEnd = 0;
    vertAssoc.setPerResidueColors(traceIndex, colors);
    var sdiv = geom.catmullRomSpline(positions, options.splineDetail, 
                                      options.strength, false);
    var interpColors = interpolateColor(colors, options.splineDetail);
    var vertStart = lineGeom.numVerts();
    vertAssoc.addAssoc(traceIndex, firstSlice,
                       vertStart, vertStart+1);
    var halfSplineDetail = Math.floor(options.splineDetail/2);
    for (i = 1, e = sdiv.length/3; i < e; ++i) {
      posOne[0] = sdiv[3*(i-1)];
      posOne[1] = sdiv[3*(i-1)+1];
      posOne[2] = sdiv[3*(i-1)+2];
      posTwo[0] = sdiv[3*(i-0)];
      posTwo[1] = sdiv[3*(i-0)+1];
      posTwo[2] = sdiv[3*(i-0)+2];

      colorOne[0] = interpColors[3*(i-1)];
      colorOne[1] = interpColors[3*(i-1)+1];
      colorOne[2] = interpColors[3*(i-1)+2];
      colorTwo[0] = interpColors[3*(i-0)];
      colorTwo[1] = interpColors[3*(i-0)+1];
      colorTwo[2] = interpColors[3*(i-0)+2];
      var index = Math.floor((i+halfSplineDetail)/options.splineDetail);
      idEnd = objIds[Math.min(objIds.length-1, index)];
      lineGeom.addLine(posOne, colorOne, posTwo, colorTwo, idStart, idEnd);
      idStart = idEnd;
      var vertEnd = lineGeom.numVerts();
      vertAssoc.addAssoc(traceIndex, firstSlice+i, vertEnd-1, 
                         vertEnd+((i === trace.length-1) ? 0 : 1));
    }
    traceIndex += 1;
  }
  for (var ci = 0; ci < chains.length; ++ci) {
    var chain = chains[ci];
    chain.eachBackboneTrace(makeTrace);
  }
  lineGeom.setVertAssoc(vertAssoc);
  options.color.end(structure);
  console.timeEnd('sline');
  return lineGeom;
};

exports.trace = function(structure, gl, options) {
  console.time('trace');
  var compositeGeom = new CompositeGeom(structure);
  options.protoCyl = new ProtoCylinder(options.arcDetail);
  options.protoSphere = new ProtoSphere(options.sphereDetail, options.sphereDetail);
  options.color.begin(structure);
  var chains = structure.chains();
  for (var ci = 0; ci < chains.length; ++ci) {
    var chain = chains[ci];
    var meshGeom = _traceForChain(chain, gl, options);
    if (meshGeom) {
      compositeGeom.addGeom(meshGeom);
    }
  }
  options.color.end(structure);
  console.timeEnd('trace');
  return compositeGeom;
};

exports.cartoon = function(structure, gl, options) {
  console.time('cartoon');
  options.coilProfile = new TubeProfile(COIL_POINTS, options.arcDetail, 1.0);
  options.helixProfile = new TubeProfile(HELIX_POINTS, options.arcDetail, 0.1);
  options.strandProfile = new TubeProfile(HELIX_POINTS, options.arcDetail, 0.1);

  var compositeGeom = new CompositeGeom(structure);
  var chains = structure.chains();
  options.color.begin(structure);
  for (var i = 0, e = chains.length;  i < e; ++i) {
    var meshGeom = _cartoonForChain(chains[i], gl, options);
    if (meshGeom) {
      compositeGeom.addGeom(meshGeom);
    }
  }
  console.timeEnd('cartoon');
  options.color.end(structure);
  return compositeGeom;
};


var _cartoonAddTube = (function() {
  var rotation = mat3.create();
  var up = vec3.create();

  return function(mgeom, pos, left, res, tangent, color, first, options, 
                  offset, objId) {
    var ss = res.ss();
    var prof = options.coilProfile;
    if (ss === 'H' && !options.forceTube) {
      prof = options.helixProfile;
    } else if (ss === 'E' && !options.forceTube) {
      prof = options.strandProfile;
    } else {
      if (first) {
        geom.ortho(left, tangent);
      } else {
        vec3.cross(left, up, tangent);
      }
    }

    buildRotation(rotation, tangent, left, up, true);
    prof.addTransformed(mgeom, pos, options.radius, rotation, color, first, 
                         offset, objId);
  };
})();


// INTERNAL: fills positions, normals and colors from the information found in 
// trace. The 3 arrays must already have the correct size (3*trace.length).
var _colorPosNormalsFromTrace = (function() {
  var pos = vec3.create();
  var normal = vec3.create(), lastNormal = vec3.create();
                                 
  return function(trace, colors, positions, normals, objIds, pool, options) {
    var strand_start = null, strand_end = null;
    vec3.set(lastNormal, 0.0, 0.0, 0.0);
    for (var i = 0; i < trace.length(); ++i) {
      objIds.push(pool.nextId(trace.residueAt(i)));
      trace.smoothPosAt(pos, i, options.strength);
      positions[i*3] = pos[0]; 
      positions[i*3+1] = pos[1]; 
      positions[i*3+2] = pos[2];

      trace.smoothNormalAt(normal, i, options.strength);

      var atom = trace.centralAtomAt(i);
      options.color.colorFor(atom, colors, i*3);

      if (vec3.dot(normal, lastNormal) < 0) {
        vec3.scale(normal, normal, -1);
      }
      if (trace.residueAt(i).ss() === 'E' && !options.force_tube) {
        if (strand_start === null) {
          strand_start = i;
        }
        strand_end = i;
      }
      /*
      if (trace.residueAt(i).ss() === 'C' && strand_start !== null) {
        //inplaceSmooth(positions, strand_start, strand_end+1);
        //inplaceSmooth(normals, strand_start-1, strand_end+1);
        strand_start = null;
        strand_start = null;
      }
      */
      normals[i*3]   = positions[3*i]+normal[0]+lastNormal[0];
      normals[i*3+1] = positions[3*i+1]+normal[1]+lastNormal[1];
      normals[i*3+2] = positions[3*i+2]+normal[2]+lastNormal[2];
      vec3.copy(lastNormal, normal);
    }
  };
})();

// constructs a cartoon representation for all consecutive backbone traces found
// in the given chain. 
var _cartoonForChain = (function() {

  var tangent = vec3.create(), pos = vec3.create(), left =vec3.create(),
      color = vec3.create(), normal = vec3.create(), normal2 = vec3.create(),
      rot = mat3.create();

  return function(chain, gl, options) {
    var traces = chain.backboneTraces();
    if (traces.length === 0) {
      return null;
    }
    var meshGeom = new MeshGeom(gl);
    var vertAssoc = new TraceVertexAssoc(chain.asView(), options.splineDetail,
                                         false);
    for (var ti = 0; ti < traces.length; ++ti) {
      var trace = traces[ti];

      var positions = new Float32Array(trace.length()*3);
      var colors = new Float32Array(trace.length()*3);
      var normals = new Float32Array(trace.length()*3);

      var objIds = [];
      var idRange = options.idPool.getContinuousRange(trace.length());
      _colorPosNormalsFromTrace(trace, colors, positions, normals, objIds, 
                                idRange, options);
      meshGeom.addIdRange(idRange);
      var sdiv = geom.catmullRomSpline(positions, options.splineDetail, 
                                       options.strength, false);
      var normalSdiv = geom.catmullRomSpline(normals, options.splineDetail,
                                              options.strength, false);
      vertAssoc.setPerResidueColors(ti, colors);
      var interpColors = interpolateColor(colors, options.splineDetail);
      // handle start of trace. this could be moved inside the for-loop, but
      // at the expense of a conditional inside the loop. unrolling is 
      // slightly faster.
      //
      // we repeat the following steps for the start, central section and end 
      // of the profile: (a) assign position, normal, tangent and color, (b)
      // add tube (or rectangular profile for helices and strands).
      vec3.set(tangent, sdiv[3]-sdiv[0], sdiv[4]-sdiv[1], sdiv[5]-sdiv[2]);
      vec3.set(pos, sdiv[0], sdiv[1], sdiv[2]);
      vec3.set(normal, normalSdiv[0]-sdiv[0], 
               normalSdiv[1]-sdiv[0], normalSdiv[2]-sdiv[2]);
      vec3.normalize(tangent, tangent);
      vec3.normalize(normal, normal);
      vec3.set(color, interpColors[0], interpColors[1], interpColors[2]);

      var vertStart = meshGeom.numVerts();
      _cartoonAddTube(meshGeom, pos, normal, trace.residueAt(0), 
                      tangent, color, true, options, 0, objIds[0]);
      var vertEnd = meshGeom.numVerts();
      var slice = 0;
      vertAssoc.addAssoc(ti, slice, vertStart, vertEnd);
      slice +=1;
      var halfSplineDetail = Math.floor(options.splineDetail/2);

      // handle the bulk of the trace
      for (var i = 1, e = sdiv.length/3 ; i < e; ++i) {
        // compute 3*i, 3*(i-1), 3*(i+1) once and reuse
        var ix3 = 3*i, ipox3 = 3*(i+1), imox3  = 3*(i-1);

        vec3.set(pos, sdiv[ix3], sdiv[ix3+1], sdiv[ix3+2]);

        vec3.set(tangent, sdiv[ipox3]-sdiv[imox3],
                 sdiv[ipox3+1]-sdiv[imox3+1],
                 sdiv[ipox3+2]-sdiv[imox3+2]);
        vec3.normalize(tangent, tangent);
        vec3.set(color, interpColors[ix3], interpColors[ix3+1],
                interpColors[ix3+2]);

        var offset = 0; // <- set special handling of coil to helix,strand
                        //    transitions.
        var traceIndex = Math.floor(i/options.splineDetail);
        var prevTraceIndex = Math.floor((i-1)/options.splineDetail);
        if (traceIndex !== prevTraceIndex && !options.forceTube) {
          // for helix and strand regions, we can't base the left vector
          // of the current residue on the previous one, since it determines
          // the orientation of the strand and helix profiles.
          //
          // frequently, the transition regions from coil to strand and helix
          // contain strong twists which severely hamper visual quality. there
          // is not problem however when transitioning from helix or strand
          // to coil or inside a helix or strand.
          //
          // to avoid these visual artifacts, we calculate the best fit between
          // the current normal and the normal "after" which gives us an offset 
          // for stitching the two parts together. 
          if (trace.residueAt(prevTraceIndex).ss() === 'C' &&
              (trace.residueAt(traceIndex).ss() === 'H' ||
               trace.residueAt(traceIndex).ss() === 'E')) {
            // we don't want to generate holes, so we have to make sure
            // the vertices of the rotated profile align with the previous
            // profile.
            vec3.set(normal2, normalSdiv[imox3]-sdiv[imox3], 
                     normalSdiv[imox3+1]-sdiv[imox3+1],
                     normalSdiv[imox3+2]-sdiv[imox3+2]);
            vec3.normalize(normal2, normal2);
            var  argAngle = 2*Math.PI/(options.arcDetail*4);
            var signedAngle = geom.signedAngle(normal, normal2, tangent);
            offset = Math.round(signedAngle/argAngle);
            offset = (offset + options.arcDetail*4) % (options.arcDetail*4);
          }
        }
        // only set normal *after* handling the coil -> helix,strand
        // transition, since we depend on the normal of the previous step.
        vec3.set(normal, normalSdiv[3*i]-sdiv[ix3], 
                 normalSdiv[ix3+1]-sdiv[ix3+1],
                 normalSdiv[ix3+2]-sdiv[ix3+2]);
        vec3.normalize(normal, normal);
        vertStart = meshGeom.numVerts();
        var objIndex = Math.floor((i+halfSplineDetail)/options.splineDetail);
        var objId = objIds[Math.min(objIds.length-1, objIndex)];
        _cartoonAddTube(meshGeom, pos, normal, trace.residueAt(traceIndex), 
                        tangent, color, false, options, offset, objId);
        vertEnd = meshGeom.numVerts();
        vertAssoc.addAssoc(ti, slice, vertStart, vertEnd);
        slice += 1;
      }
    }
    meshGeom.setVertAssoc(vertAssoc);
    return meshGeom;
  };
})();

var _traceForChain = (function() {

  var rotation = mat3.create();

  var dir = vec3.create(), left = vec3.create(), up = vec3.create(),
      midPoint = vec3.create(), caPrevPos = vec3.create(), 
      caThisPos = vec3.create();
  var colorOne = vec3.create(), colorTwo = vec3.create();

  return function(chain, gl, options) {
    var traces = chain.backboneTraces();
    if (traces.length === 0) {
      return null;
    }
    var meshGeom = new MeshGeom(gl);
    var vertAssoc = new TraceVertexAssoc(chain.asView(), 1, false);
    var traceIndex = 0;
    for (var ti = 0; ti < traces.length; ++ti) {
      var trace = traces[ti];
      var idRange = options.idPool.getContinuousRange(trace.length());
      meshGeom.addIdRange(idRange);
      options.color.colorFor(trace.centralAtomAt(0), colorOne, 0);
      var vertStart = meshGeom.numVerts();
      trace.posAt(caPrevPos, 0);
      var idStart = idRange.nextId(trace.residueAt(0)), idEnd = 0;
      options.protoSphere.addTransformed(meshGeom, caPrevPos, options.radius, 
                                         colorOne, idStart);
      var vertEnd = null;
      vertAssoc.addAssoc(traceIndex, 0, vertStart, vertEnd);
      var colors = new Float32Array(trace.length()*3);
      colors[0] = colorOne[0];
      colors[1] = colorOne[1];
      colors[2] = colorOne[2];
      for (var i = 1; i < trace.length(); ++i) {
        idEnd = idRange.nextId(trace.residueAt(i));
        trace.posAt(caPrevPos, i-1);
        trace.posAt(caThisPos, i);
        options.color.colorFor(trace.centralAtomAt(i), colorTwo, 0);
        colors[i*3] = colorTwo[0];
        colors[i*3+1] = colorTwo[1];
        colors[i*3+2] = colorTwo[2];

        vec3.sub(dir, caThisPos, caPrevPos);
        var length = vec3.length(dir);

        vec3.scale(dir, dir, 1.0/length);

        buildRotation(rotation, dir, left, up, false);

        vec3.copy(midPoint, caPrevPos);
        vec3.add(midPoint, midPoint, caThisPos);
        vec3.scale(midPoint, midPoint, 0.5);
        var endSphere = meshGeom.numVerts();
        options.protoCyl.addTransformed(meshGeom, midPoint, length, 
                                        options.radius, rotation, 
                                        colorOne, colorTwo, idStart, idEnd);
        vertEnd = meshGeom.numVerts();
        vertEnd = vertEnd - (vertEnd-endSphere)/2;

        options.protoSphere.addTransformed(meshGeom, caThisPos, options.radius, 
                                           colorTwo, idEnd);
        idStart = idEnd;
        vertAssoc.addAssoc(traceIndex, i, vertStart, vertEnd);
        vertStart = vertEnd;
        vec3.copy(colorOne, colorTwo);
      }
      vertAssoc.setPerResidueColors(traceIndex, colors);
      vertAssoc.addAssoc(traceIndex, trace.length()-1, vertStart, 
                         meshGeom.numVerts());
      traceIndex += 1;
    }
    meshGeom.setVertAssoc(vertAssoc);
    return meshGeom;
  };
})();


return exports;

})();


// Copyright (c) 2013 Marco Biasini
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to 
// deal in the Software without restriction, including without limitation the 
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or 
// sell copies of the Software, and to permit persons to whom the Software is 
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in 
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
// DEALINGS IN THE SOFTWARE.

(function(exports) {

"use strict";


// A camera, providing us with a view into the 3D worlds. Handles projection,
// and modelview matrices and controls the global render parameters such as
// shader and fog.
function Cam(gl) {
  this._projection = mat4.create();
  this._modelview = mat4.create();
  this._near = 0.1;
  this._far = 400.0;
  this._fogNear = -5;
  this._fogFar = 10;
  this._fog = true;
  this._fogColor = vec3.fromValues(1, 1, 1);
  this._outlineColor = vec3.fromValues(0.1, 0.1, 0.1);
  this._center = vec3.create();
  this._zoom = 50;
  this._rotation = mat4.create();
  this._translation = mat4.create();
  this._updateMat = true;
  this._gl = gl;
  this._currentShader = null;
  this.setViewportSize(gl.viewportWidth, gl.viewportHeight);
  mat4.translate(this._modelview, this._modelview, [0, 0, -20]);
}

Cam.prototype._updateIfRequired = function() {
  if (!this._updateMat) {
    return false;
  }
  mat4.identity(this._modelview);
  mat4.translate(this._modelview, this._modelview, 
                  [-this._center[0], -this._center[1], -this._center[2]]);
  mat4.mul(this._modelview, this._rotation, this._modelview);
  mat4.identity(this._translation);
  mat4.translate(this._translation, this._translation, [0,0, -this._zoom]);
  mat4.mul(this._modelview, this._translation, this._modelview);
  this._updateMat = false;
  return true;
};

Cam.prototype.setViewportSize = function(width, height) {
  this._updateMat = true;
  mat4.identity(this._projection);
  mat4.perspective(this._projection, 45.0, width / height, this._near, 
                   this._far);
};

Cam.prototype.setCenter = function(point) {
  this._updateMat = true;
  vec3.copy(this._center, point);
};

Cam.prototype.fog =function(value) {
  if (value !== undefined) {
    this._fog = value;
  }
  return this._fog;
};

Cam.prototype.rotateZ = (function() {
  var tm = mat4.create();
  return function(delta) {
    mat4.identity(tm);
    this._updateMat = true;
    mat4.rotate(tm, tm, delta, [0,0,1]);
    mat4.mul(this._rotation, tm, this._rotation);
  };
})();

Cam.prototype.rotateX= (function(){
  var tm = mat4.create();
  return function(delta) {
    mat4.identity(tm);
    this._updateMat = true;
    mat4.rotate(tm, tm, delta, [1,0,0]);
    mat4.mul(this._rotation, tm, this._rotation);
  };
})();

Cam.prototype.rotateY = (function() {
  var tm = mat4.create();
  return function(delta) {
    mat4.identity(tm);
    this._updateMat = true;
    mat4.rotate(tm, tm, delta, [0,1,0]);
    mat4.mul(this._rotation, tm, this._rotation);
  };
})();

Cam.prototype.panX = function(delta) {
  return this.panXY(delta, 0);
};

Cam.prototype.panY = function(delta) {
  return this.panXY(0, delta);
};

Cam.prototype.panXY = (function () {
  var invertRotation = mat4.create();
  var newCenter = vec3.create();
  return function(deltaX, deltaY) {
    mat4.transpose(invertRotation, this._rotation);
    this._updateMat = true;
    vec3.set(newCenter, -deltaX, deltaY ,0);
    vec3.transformMat4(newCenter, newCenter, invertRotation);
    vec3.add(newCenter, newCenter, this._center);
    this.setCenter(newCenter);
  };
})();

Cam.prototype.zoom = function(delta) {
  this._updateMat = true;
  var factor = 1.0+delta*1e-2;
  this._zoom = Math.min(1000.0, Math.max(2.0, factor*this._zoom));
};

Cam.prototype.currentShader = function() { return this._currentShader; };

// sets all OpenGL parameters to make this camera active. 
//
// among other things, it sets the follow uniforms on the shader:
//
// - projectionMat   - the 4x4 projection matrix
// - modelviewMat    - the 4x4 modelview matrix
// - rotationMat     - the rotational part of the modelview matrix
// - fog             - boolean indicating whether fog is enabled
// - fogNear,fogFar  - near and far offset of fog
// - fogColor        - the color of fog
// - outlineColor    - color to be used for the outline shader
Cam.prototype.bind = function(shader) {
  var shaderChanged = false;
  if (this._currentShader !== shader)
  {
    this._currentShader = shader;
    this._gl.useProgram(shader);
    shaderChanged = true;
  }
  if (!this._updateIfRequired() && !shaderChanged) {
    return;
  }
  this._gl.uniformMatrix4fv(shader.projection, false, this._projection);
  this._gl.uniformMatrix4fv(shader.modelview, false, this._modelview);
  if (shader.rotation) {
    this._gl.uniformMatrix4fv(shader.rotation, false, this._rotation);
  }
  this._gl.uniform1i(shader.fog, this._fog);
  this._gl.uniform1f(shader.fogFar, this._fogFar+this._zoom);
  this._gl.uniform1f(shader.fogNear, this._fogNear+this._zoom);
  this._gl.uniform3fv(shader.fogColor, this._fogColor);
  this._gl.uniform3fv(shader.outlineColor, this._outlineColor);
};

exports.Cam = Cam;
})(this);


// Copyright (c) 2013 Marco Biasini
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

(function(exports) {

"use strict";

function FrameBuffer(gl, options) {
  this._width = options.width;
  this._height = options.height;
  this._colorBufferWidth = this._width;
  this._colorBufferHeight = this._height;
  this._gl = gl;
  this._colorHandle = this._gl.createFramebuffer();
  this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._colorHandle);
  this._depthHandle = this._gl.createRenderbuffer();
  this._gl.bindRenderbuffer(this._gl.RENDERBUFFER, this._depthHandle);
  this._gl.renderbufferStorage(this._gl.RENDERBUFFER, this._gl.DEPTH_COMPONENT16,
                               this._width, this._height);
  this._gl.framebufferRenderbuffer(this._gl.FRAMEBUFFER,
                                     this._gl.DEPTH_ATTACHMENT,
                                     this._gl.RENDERBUFFER, this._depthHandle);
  this._colorTexture = this._gl.createTexture();
  this._initColorBuffer();
}

FrameBuffer.prototype.width = function() { return this._width; };
FrameBuffer.prototype.height = function() { return this._height; };

FrameBuffer.prototype.bind = function() {
  this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._colorHandle);
  this._gl.bindRenderbuffer(this._gl.RENDERBUFFER, this._depthHandle);
  if (this._colorBufferWidth !== this._width ||
      this._colorBufferHeight !== this._height) {
    this._resizeBuffers();
  }
  this._gl.viewport(0, 0, this._width, this._height);
};

FrameBuffer.prototype._initColorBuffer = function() {
  this.bind();
  this._gl.bindTexture(this._gl.TEXTURE_2D, this._colorTexture);
  this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, this._width,
                      this._height, 0, this._gl.RGBA, this._gl.UNSIGNED_BYTE, 
                      null);
  this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0,
                                this._gl.TEXTURE_2D, this._colorTexture, 0);
  this._gl.bindTexture(this._gl.TEXTURE_2D, null);

  this.release();
};

FrameBuffer.prototype._resizeBuffers = function() {
  this._gl.bindRenderbuffer(this._gl.RENDERBUFFER, this._depthHandle);
  this._gl.renderbufferStorage(this._gl.RENDERBUFFER, this._gl.DEPTH_COMPONENT16,
                               this._width, this._height);
  this._gl.bindTexture(this._gl.TEXTURE_2D, this._colorTexture);
  this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, this._width,
                      this._height, 0, this._gl.RGBA, this._gl.UNSIGNED_BYTE, 
                      null);
  this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0,
                                this._gl.TEXTURE_2D, this._colorTexture, 0);
  this._gl.framebufferRenderbuffer(this._gl.FRAMEBUFFER,
                                     this._gl.DEPTH_ATTACHMENT,
                                     this._gl.RENDERBUFFER, this._depthHandle);
  this._gl.bindTexture(this._gl.TEXTURE_2D, null);
  this._colorBufferWidth = this._width;
  this._colorBufferHeight = this._height;
};

FrameBuffer.prototype.resize = function(width, height) {
  this._width = width;
  this._height = height;
};

FrameBuffer.prototype.release = function() {
  this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, null);
  this._gl.bindRenderbuffer(this._gl.RENDERBUFFER, null);
};

exports.FrameBuffer = FrameBuffer;

})(this);


// Copyright (c) 2013 Marco Biasini
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to 
// deal in the Software without restriction, including without limitation the 
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or 
// sell copies of the Software, and to permit persons to whom the Software is 
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in 
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
// DEALINGS IN THE SOFTWARE.

(function(exports) {

"use strict";

exports.shaders = {};

// line fragment shader, essentially uses the vertColor and adds some fog.
exports.shaders.LINES_FS = '\n\
precision mediump float;\n\
\n\
varying vec3 vertColor;\n\
varying vec3 vertNormal;\n\
uniform float fogNear;\n\
uniform float fogFar;\n\
uniform vec3 fogColor;\n\
uniform bool fog;\n\
\n\
void main(void) {\n\
  gl_FragColor = vec4(vertColor, 1.0);\n\
  float depth = gl_FragCoord.z / gl_FragCoord.w;\n\
  if (fog) {\n\
    float fog_factor = smoothstep(fogNear, fogFar, depth);\n\
    gl_FragColor = mix(gl_FragColor, vec4(fogColor, gl_FragColor.w),\n\
                        fog_factor);\n\
  }\n\
}';

// hemilight fragment shader
exports.shaders.HEMILIGHT_FS = '\n\
precision mediump float;\n\
\n\
varying vec3 vertColor;\n\
varying vec3 vertNormal;\n\
uniform float fogNear;\n\
uniform float fogFar;\n\
uniform vec3 fogColor;\n\
uniform bool fog;\n\
\n\
void main(void) {\n\
  float dp = dot(vertNormal, vec3(0.0, 0.0, 1.0));\n\
  float hemi = max(0.0, dp)*0.5+0.5;\n\
  gl_FragColor = vec4(vertColor*hemi, 1.0);\n\
  float depth = gl_FragCoord.z / gl_FragCoord.w;\n\
  if (fog) {\n\
    float fog_factor = smoothstep(fogNear, fogFar, depth);\n\
    gl_FragColor = mix(gl_FragColor, vec4(fogColor, gl_FragColor.w),\n\
                        fog_factor);\n\
  }\n\
}';

// hemilight vertex shader
exports.shaders.HEMILIGHT_VS = '\n\
attribute vec3 attrPos;\n\
attribute vec3 attrColor;\n\
attribute vec3 attrNormal;\n\
\n\
uniform mat4 projectionMat;\n\
uniform mat4 modelviewMat;\n\
varying vec3 vertColor;\n\
varying vec3 vertNormal;\n\
void main(void) {\n\
  gl_Position = projectionMat * modelviewMat * vec4(attrPos, 1.0);\n\
  vec4 n = (modelviewMat * vec4(attrNormal, 0.0));\n\
  vertNormal = n.xyz;\n\
  vertColor = attrColor;\n\
}';

// outline shader. mixes outlineColor with fogColor
exports.shaders.OUTLINE_FS = '\n\
precision mediump float;\n\
\n\
uniform vec3 outlineColor;\n\
uniform float fogNear;\n\
uniform float fogFar;\n\
uniform vec3 fogColor;\n\
uniform bool fog;\n\
\n\
void main() {\n\
  gl_FragColor = vec4(outlineColor, 1.0);\n\
  float depth = gl_FragCoord.z / gl_FragCoord.w;\n\
  if (fog) { \n\
    float fog_factor = smoothstep(fogNear, fogFar, depth);\n\
    gl_FragColor = mix(gl_FragColor, vec4(fogColor, gl_FragColor.w),\n\
                        fog_factor);\n\
  }\n\
}';

// outline vertex shader. Expands vertices along the (in-screen) xy
// components of the normals.
exports.shaders.OUTLINE_VS = '\n\
precision mediump float;\n\
\n\
attribute vec3 attrPos;\n\
attribute vec3 attrNormal;\n\
                                                                       \n\
uniform vec3 outlineColor;\n\
uniform mat4 projectionMat;\n\
uniform mat4 modelviewMat;\n\
\n\
void main(void) {\n\
  gl_Position = projectionMat * modelviewMat * vec4(attrPos, 1.0);\n\
  vec4 normal = modelviewMat * vec4(attrNormal, 0.0);\n\
  gl_Position.xy += normal.xy*0.200;\n\
}';

exports.shaders.TEXT_VS = '\n\
precision mediump float;\n\
\n\
attribute vec3 attrCenter;\n\
attribute vec2 attrCorner;\n\
uniform mat4 projectionMat;\n\
uniform mat4 modelviewMat;\n\
uniform mat4 rotationMat;\n\
varying vec2 vertTex;\n\
void main() { \n\
  vec4 rotated = vec4(attrCorner.x, attrCorner.y, 0.0, 0.0)*rotationMat;\n\
  vec4 adjustedPos = vec4(attrCenter, 1.0)+rotated;\n\
  gl_Position = projectionMat* modelviewMat* adjustedPos;\n\
  vertTex = (attrCorner+abs(attrCorner))/(2.0*abs(attrCorner)); \n\
}';

exports.shaders.TEXT_FS = '\n\
precision mediump float;\n\
\n\
uniform mat4 projectionMat;\n\
uniform mat4 modelviewMat;\n\
uniform sampler2D sampler;\n\
uniform float xScale;\n\
uniform float yScale;\n\
varying vec2 vertTex;\n\
void main() { \n\
  gl_FragColor = texture2D(sampler, vec2(vertTex.x*xScale, vertTex.y*yScale));\n\
}';

exports.shaders.SELECT_VS = '\n\
precision mediump float;\n\
uniform mat4 projectionMat;\n\
uniform mat4 modelviewMat;\n\
attribute vec3 attrPos;\n\
attribute float attrObjId;\n\
\n\
varying float objId;\n\
\n\
void main(void) {\n\
  gl_Position = projectionMat * modelviewMat * vec4(attrPos, 1.0);\n\
  objId = attrObjId;\n\
}';

exports.shaders.SELECT_FS = '\n\
precision mediump float;\n\
\n\
varying float objId;\n\
\n\
int intMod(int x, int y) { \n\
  int z = x/y;\n\
  return x-y*z;\n\
}\n\
void main(void) {\n\
  int integralObjId = int(objId+0.5);\n\
  int red = intMod(integralObjId, 256);\n\
  integralObjId/=256;\n\
  int green = intMod(integralObjId, 256);\n\
  integralObjId/=256;\n\
  int blue = intMod(integralObjId, 256);\n\
  gl_FragColor = vec4(float(red), float(green), float(blue), 255.0)/255.0;\n\
}';
})(this);

// Copyright (c) 2013 Marco Biasini
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to 
// deal in the Software without restriction, including without limitation the 
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or 
// sell copies of the Software, and to permit persons to whom the Software is 
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in 
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
// DEALINGS IN THE SOFTWARE.

var pv = (function(){
"use strict";


// FIXME: Browser vendors tend to block quite a few graphic cards. Instead
//   of showing this very generic message, implement a per-browser 
//   diagnostic. For example, when we detect that we are running a recent
//   Chrome and Webgl is not available, we should say that the user is
//   supposed to check chrome://gpu for details on why WebGL is not
//   available. Similar troubleshooting pages are available for other
//   browsers.
var WEBGL_NOT_SUPPORTED = '\
<div style="vertical-align:middle; text-align:center;">\
<h1>Oink</h1><p>Your browser does not support WebGL. \
You might want to try Chrome, Firefox, IE 11, or newer versions of Safari\
</p>\
<p>If you are using a recent version of one of the above browsers, your \
graphic card might be blocked. Check the browser documentation for details\
</p>\
</div>';


function bind(obj, fn) { 
  return function() { return fn.apply(obj, arguments); };
}


var requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();




function PV(domElement, opts) {
  opts = opts || {};
  this._options = {
    width : (opts.width || 500),
    height: (opts.height || 500),
    antialias : opts.antialias,
    quality : opts.quality || 'low',
    style : opts.style || 'hemilight'
  };
  this._objects = [];
  this._domElement = domElement;
  this._redrawRequested = false;
  this._resize = false;
  this._canvas = document.createElement('canvas');
  this._textureCanvas = document.createElement('canvas');
  this._textureCanvas.style.display = 'none';
  this._2dcontext = this._textureCanvas.getContext('2d');
  this._objectIdManager = new UniqueObjectIdPool();
  var parentRect = domElement.getBoundingClientRect();
  if (this._options.width === 'auto') {
    this._options.width = parentRect.width;
  }
  if (this._options.height === 'auto') {
    this._options.height = parentRect.height;
  }
  if ('outline' in opts) {
    this._options.outline = opts.outline;
  } else {
    this._options.outline = true;
  }
  this._ok = false;
  this.quality(this._options.quality);
  this._canvas.width = this._options.width;
  this._canvas.height = this._options.height;
  this._domElement.appendChild(this._canvas);
  this._domElement.appendChild(this._textureCanvas);

  document.addEventListener('DOMContentLoaded', 
                            bind(this, this._initPV));
}

// resizes the canvas, separated out from PV.resize because we want
// to call this function directly in a requestAnimationFrame together 
// with rendering to avoid flickering.
PV.prototype._ensureSize = function() {
  if (!this._resize) {
    return;
  }
  this._resize = false;
  this._options.realWidth = this._options.width * this._options.samples;
  this._options.realHeight = this._options.height * this._options.samples;
  this._gl.viewport(0, 0, this._options.realWidth, 
                    this._options._realHeight);
  this._canvas.width = this._options.realWidth;
  this._canvas.height = this._options.realHeight;
  this._cam.setViewportSize(this._options.realWidth, 
                            this._options.realHeight);
  if (this._options.samples > 1)  {
    this._initManualAntialiasing(this._options.samples);
  }
  this._pickBuffer.resize(this._options.width, this._options.height);
};

PV.prototype.resize = function(width, height) {
  if (width === this._options.width && height === this._options.height) {
    return;
  }
  this._resize = true;
  this._options.width = width;
  this._options.height = height;
  this.requestRedraw();
};

PV.prototype.fitParent = function() {
  var parentRect = this._domElement.getBoundingClientRect();
  this.resize(parentRect.width, parentRect.height);
};

PV.prototype.gl = function() { return this._gl; };

PV.prototype.ok = function() { return this._ok; };


PV.prototype.options = function(optName, value) {
  if (value !== undefined) {
    if (optName === 'fog') {
      this._cam.fog(value);
    } else {
      this._options[optName] = value;
    }
    return value;
  }
  return this._options[optName];
};

PV.prototype.quality = function(qual) {
  this._options.quality = qual;
  console.info('setting quality to', qual);
  if (qual === 'high') {
    this._options.arcDetail = 4;
    this._options.sphereDetail = 16;
    this._options.splineDetail = 8;
    return;
  } 
  if (qual === 'medium') {
    this._options.arcDetail = 3;
    this._options.sphereDetail = 10;
    this._options.splineDetail = 4;
    return;
  }
  if (qual === 'low') {
    this._options.arcDetail = 2;
    this._options.sphereDetail = 8;
    this._options.splineDetail = 2;
    return;
  }
  console.error('invalid quality argument', qual);
};

// returns the content of the WebGL context as a data URL element which can be 
// inserted into an img element. This allows users to save a picture to disk
PV.prototype.imageData = function() {
  return this._canvas.toDataURL();
};

PV.prototype._initContext = function() {
  try {
    var contextOpts = { 
      antialias : this._options.antialias,
      preserveDrawingBuffer : true // for image export
    };
    this._gl = this._canvas.getContext('experimental-webgl', 
                                       contextOpts);
  } catch (err) {
    console.error('WebGL not supported', err);
    return false;
  }
  if (!this._gl) {
    console.error('WebGL not supported');
    return false;
  }
  return true;
};

PV.prototype._initManualAntialiasing = function(samples) {
    var scale_factor = 1.0/samples;
    var trans_x = -(1-scale_factor)*0.5*this._options.realWidth;
    var trans_y = -(1-scale_factor)*0.5*this._options.realHeight;
    var translate = 'translate('+trans_x+'px, '+trans_y+'px)';
    var scale = 'scale('+scale_factor+', '+scale_factor+')';
    var transform = translate+' '+scale;

    this._canvas.style.webkitTransform = transform;
    this._canvas.style.transform = transform;
    this._canvas.style.ieTransform = transform;
    this._canvas.width = this._options.realWidth;
    this._canvas.height = this._options.realHeight;
};

PV.prototype._initPickBuffer = function(){
  var fbOptions = {
    width : this._options.width,
    height: this._options.height
  };
  this._pickBuffer = new FrameBuffer(this._gl, fbOptions);
};

PV.prototype._initGL = function () {
  var samples = 1;
  if (!this._initContext()) {
    return false;
  }

  if (!this._gl.getContextAttributes().antialias &&
      this._options.antialias) {
    console.info('hardware antialising not supported.',
                  'will use manual antialiasing instead.');
    samples = 2;
  }
  this._options.realWidth = this._options.width * samples;
  this._options.realHeight = this._options.height * samples;
  this._options.samples = samples;
  if (samples > 1) {
    this._initManualAntialiasing(samples);
  }
  this._gl.viewportWidth = this._options.realWidth;
  this._gl.viewportHeight = this._options.realHeight;

  this._gl.clearColor(1.0, 1.0, 1.0, 1.0);
  this._gl.lineWidth(2.0);
  this._gl.cullFace(this._gl.FRONT);
  this._gl.enable(this._gl.CULL_FACE);
  this._gl.enable(this._gl.DEPTH_TEST);
  this._initPickBuffer();
  return true;
};

PV.prototype._shaderFromString = function(shader_code, type) {
  var shader;
  if (type === 'fragment') {
    shader = this._gl.createShader(this._gl.FRAGMENT_SHADER);
  } else if (type === 'vertex') {
    shader = this._gl.createShader(this._gl.VERTEX_SHADER);
  } else {
    console.error('could not determine type for shader');
    return null;
  }
  this._gl.shaderSource(shader, shader_code);
  this._gl.compileShader(shader);
  if (!this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS)) {
    console.error(this._gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
};

PV.prototype._initShader = function(vert_shader, frag_shader) {
  var fs = this._shaderFromString(frag_shader, 'fragment');
  var vs = this._shaderFromString(vert_shader, 'vertex');
  var shaderProgram = this._gl.createProgram();
  this._gl.attachShader(shaderProgram, vs);
  this._gl.attachShader(shaderProgram, fs);
  this._gl.linkProgram(shaderProgram);
  if (!this._gl.getProgramParameter(shaderProgram, this._gl.LINK_STATUS)) {
    console.error('could not initialise shaders');
    console.error(this._gl.getShaderInfoLog(shaderProgram));
    return null;
  }
  // get vertex attribute location for the shader once to
  // avoid repeated calls to getAttribLocation/getUniformLocation
  var getAttribLoc = bind(this._gl, this._gl.getAttribLocation);
  var getUniformLoc = bind(this._gl, this._gl.getUniformLocation);
  shaderProgram.posAttrib    = getAttribLoc(shaderProgram, 'attrPos');
  shaderProgram.colorAttrib  = getAttribLoc(shaderProgram, 'attrColor');
  shaderProgram.normalAttrib = getAttribLoc(shaderProgram, 'attrNormal');
  shaderProgram.objIdAttrib  = getAttribLoc(shaderProgram, 'attrObjId');
  shaderProgram.projection   = getUniformLoc(shaderProgram, 'projectionMat');
  shaderProgram.modelview    = getUniformLoc(shaderProgram, 'modelviewMat');
  shaderProgram.rotation     = getUniformLoc(shaderProgram, 'rotationMat');
  shaderProgram.fog          = getUniformLoc(shaderProgram, 'fog');
  shaderProgram.fogFar       = getUniformLoc(shaderProgram, 'fogFar');
  shaderProgram.fogNear      = getUniformLoc(shaderProgram, 'fogNear');
  shaderProgram.fogColor     = getUniformLoc(shaderProgram, 'fogColor');
  shaderProgram.outlineColor = getUniformLoc(shaderProgram, 'outlineColor');

  return shaderProgram;
};

PV.prototype._mouseUp = function(event) {
  this._canvas.removeEventListener('mousemove', this._mouseRotateListener, 
                                   false);
  this._canvas.removeEventListener('mousemove', this._mousePanListener, 
                                   false);
  this._canvas.removeEventListener('mouseup', this._mouseUpListener, false);
  document.removeEventListener('mouseup', this._mouseUpListener, false);
  document.removeEventListener('mousemove', this._mouseRotateListener);
  document.removeEventListener('mousemove', this._mousePanListener);
};


PV.prototype._initPV = function() {
  if (!this._initGL()) {
    this._domElement.removeChild(this._canvas);
    this._domElement.innerHTML = WEBGL_NOT_SUPPORTED;
    this._domElement.style.width = this._options.width+'px';
    this._domElement.style.height = this._options.height+'px';
    return false; 
  }
  this._ok = true;
  this._cam = new Cam(this._gl);
  this._shaderCatalog = {
    hemilight : this._initShader(shaders.HEMILIGHT_VS, shaders.HEMILIGHT_FS),
    outline : this._initShader(shaders.OUTLINE_VS, shaders.OUTLINE_FS),
    lines : this._initShader(shaders.HEMILIGHT_VS, shaders.LINES_FS),
    text : this._initShader(shaders.TEXT_VS, shaders.TEXT_FS),
    select : this._initShader(shaders.SELECT_VS, shaders.SELECT_FS)
  };
  this._mousePanListener = bind(this, this._mousePan);
  this._mouseRotateListener = bind(this, this._mouseRotate);
  this._mouseUpListener = bind(this, this._mouseUp);
  this._boundDraw = bind(this, this._draw);
  // Firefox responds to the wheel event, whereas other browsers listen to
  // the mousewheel event. Register different event handlers, depending on
  // what properties are available.
  if ('onwheel' in this._canvas) {
    this._canvas.addEventListener('wheel', bind(this, this._mouseWheelFF), 
                                  false);
  } else {
    this._canvas.addEventListener('mousewheel', bind(this, this._mouseWheel), 
                                  false);
  }
  this._canvas.addEventListener('dblclick', bind(this, this._mouseDoubleClick),
                                false);
  this._canvas.addEventListener('mousedown', bind(this, this._mouseDown), 
                                false);
  return true;
};


PV.prototype.requestRedraw = function() {
  if (this._redrawRequested) {
    return;
  }
  this._redrawRequested = true;
  requestAnimFrame(this._boundDraw);
};

PV.prototype._drawWithPass = function(pass) {
  for (var i = 0, e = this._objects.length; i !== e; ++i) {
    this._objects[i].draw(this._cam, this._shaderCatalog, this._options.style, 
                          pass);
  }
};

PV.prototype._draw = function() {
  this._ensureSize();
  this._redrawRequested = false;

  this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
  this._gl.viewport(0, 0, this._options.realWidth, this._options.realHeight);
  this._gl.cullFace(this._gl.FRONT);
  this._gl.enable(this._gl.CULL_FACE);
  this._drawWithPass('normal');
  if (!this._options.outline) {
    return;
  }
  this._gl.cullFace(this._gl.BACK);
  this._gl.enable(this._gl.CULL_FACE);
  this._drawWithPass('outline');
};



PV.prototype.centerOn = function(what) {
  this._cam.setCenter(what.center());
};

PV.prototype.clear = function() {
  for (var i = 0; i < this._objects.length; ++i) {
    this._objects[i].destroy();
  }
  this._objects = [];
};

PV.prototype._mouseWheel = function(event) {
  this._cam.zoom(event.wheelDelta*0.05);
  this.requestRedraw();
};

PV.prototype._mouseWheelFF = function(event) {
  this._cam.zoom(-event.deltaY*2.00);
  this.requestRedraw();
};

PV.prototype._mouseDoubleClick = function(event) {
  var rect = this._canvas.getBoundingClientRect();
  var objects = this.pick({x : event.clientX-rect.left,
                           y: event.clientY - rect.top});
  if (objects.length > 0) {
    if (objects[0].pos) {
      this._cam.setCenter(objects[0].pos());
    }
    else {
      this._cam.setCenter(objects[0].atom('CA').pos());
    }
    this.requestRedraw();
  }
};

PV.prototype._mouseDown = function(event) {
  if (event.button !== 0) {
    return;
  }
  event.preventDefault();
  if (event.shiftKey === true){
    this._canvas.addEventListener('mousemove', this._mousePanListener, false);
    document.addEventListener('mousemove', this._mousePanListener, false);
  } else {
    this._canvas.addEventListener('mousemove', this._mouseRotateListener, false);
    document.addEventListener('mousemove', this._mouseRotateListener, false);
  }
  this._canvas.addEventListener('mouseup', this._mouseUpListener, false);
  document.addEventListener('mouseup', this._mouseUpListener, false);
  this._lastMousePos = { x: event.pageX, y: event.pageY };
};

PV.prototype._mouseRotate = function(event) {
  var newMousePos = { x : event.pageX, y : event.pageY };
  var delta = { x : newMousePos.x - this._lastMousePos.x,
                y : newMousePos.y - this._lastMousePos.y};
                
  var speed = 0.005;
  this._cam.rotateX(speed*delta.y);
  this._cam.rotateY(speed*delta.x);
  this._lastMousePos = newMousePos;
  this.requestRedraw();
};

PV.prototype._mousePan = function(event){
  var newMousePos = { x : event.pageX, y : event.pageY };
  var delta = { x : newMousePos.x - this._lastMousePos.x,
                y : newMousePos.y - this._lastMousePos.y};
                
  var speed = 0.05;
  this._cam.panXY(speed*delta.x, speed*delta.y);
  this._lastMousePos = newMousePos;
  this.requestRedraw();
};


PV.prototype.RENDER_MODES = [
  'sline', 'line', 'trace', 'lineTrace', 'cartoon', 'tube',
  'spheres'
];


/// simple dispatcher which allows to render using a certain style.
//  will bail out if the render mode does not exist.
PV.prototype.renderAs = function(structure, mode, opts) {
  var found = false;
  for (var i = 0; i < this.RENDER_MODES.length; ++i) {
    if (this.RENDER_MODES[i] === mode) {
      found = true;
      break;
    }
  }
  if (!found) {
    console.error('render mode', mode, 'not supported');
    return;
  }
  return this[mode](structure, opts);

};

PV.prototype.lineTrace = function(name, structure, opts) {
  opts = opts || {};
  var options = {
    color : opts.color || color.uniform([1, 0, 1]),
    lineWidth : opts.lineWidth || 4.0,
    idPool : this._objectIdManager
  };
  var obj = render.lineTrace(structure, this._gl, options);
  return this.add(name, obj);
};

PV.prototype.spheres = function(name, structure, opts) {
  opts = opts || {};
  var options = {
    color : opts.color || color.byElement(),
    sphereDetail : this.options('sphereDetail'),
    idPool : this._objectIdManager
  };
  var obj = render.spheres(structure, this._gl, options);
  return this.add(name, obj);
};

PV.prototype.sline = function(name, structure, opts) {
  opts = opts || {};
  var options = {
    color : opts.color || color.uniform([1, 0, 1]),
    splineDetail : opts.splineDetail || this.options('splineDetail'),
    strength: opts.strength || 1.0,
    lineWidth : opts.lineWidth || 4.0,
    idPool : this._objectIdManager
  };
  var obj =  render.sline(structure, this._gl, options);
  return this.add(name, obj);
};

PV.prototype.cartoon = function(name, structure, opts) {
  opts = opts || {};
  var options = {
    color : opts.color || color.bySS(),
    strength: opts.strength || 1.0,
    splineDetail : opts.splineDetail || this.options('splineDetail'),
    arcDetail : opts.arcDetail || this.options('arcDetail'),
    radius : opts.radius || 0.3,
    forceTube: opts.forceTube || false,
    idPool : this._objectIdManager
  };
  var obj =  render.cartoon(structure, this._gl, options);
  return this.add(name, obj);
};

// renders the protein using a smoothly interpolated tube, essentially 
// identical to the cartoon render mode, but without special treatment for 
// helices and strands.
PV.prototype.tube = function(name, structure, opts) {
  opts = opts || {};
  opts.forceTube = true;
  return this.cartoon(name, structure, opts);
};

PV.prototype.ballsAndSticks = function(name, structure, opts) {
  opts = opts || {};
  var options = {
    color : opts.color || color.byElement(),
    radius: opts.radius || 0.3,
    arcDetail : (opts.arcDetail || this.options('arcDetail'))*2,
    sphereDetail : opts.sphereDetail || this.options('sphereDetail'),
    idPool : this._objectIdManager
  };
  var obj = render.ballsAndSticks(structure, this._gl, options);
  return this.add(name, obj);
};

PV.prototype.lines = function(name, structure, opts) {
  opts = opts || {};
  var options = {
    color : opts.color || color.byElement(),
    lineWidth : opts.lineWidth || 4.0,
    idPool : this._objectIdManager
  };
  var obj =  render.lines(structure, this._gl, options);
  return this.add(name, obj);
};

PV.prototype.trace = function(name, structure, opts) {
  opts = opts || {};
  var options = {
    color : opts.color || color.uniform([1, 0, 0]),
    radius: opts.radius || 0.3,
    arcDetail : (opts.arcDetail || this.options('arcDetail'))*2,
    sphereDetail : opts.sphereDetail || this.options('sphereDetail'),
    idPool : this._objectIdManager
  };
  var obj = render.trace(structure, this._gl, options);
  return this.add(name, obj);
};


PV.prototype.label = function(pos, text) {
  return new TextLabel(this._gl, this._textureCanvas, 
                       this._2dcontext, pos, text);
};

// INTERNAL: draws scene into offscreen pick buffer with the "select"
// shader.
PV.prototype._drawPickingScene = function() {
  this._gl.clearColor(0.0, 0.0, 0.0, 0.0);
  this._gl.disable(this._gl.BLEND);
  this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
  this._gl.clearColor(1.0, 1.0, 1.0, 1.0);
  this._gl.cullFace(this._gl.FRONT);
  this._gl.enable(this._gl.CULL_FACE);
  this._drawWithPass('select');
};

PV.prototype.pick = function(pos) {
  this._pickBuffer.bind();
  this._drawPickingScene();
  var pixels = new Uint8Array(4*4*4);
  this._gl.readPixels(pos.x-2, this._options.height-(pos.y-2),
                      4, 4, this._gl.RGBA, this._gl.UNSIGNED_BYTE,
                      pixels);
  if (pixels.data) {
    pixels = pixels.data;
  }
  var pickedIds = {};
  var pickedObjects = [];
  for (var y = 0; y < 4; ++y) {
    for (var x = 0; x < 4; ++x) {
      var baseIndex = (y*4 + x)*4;
      if (pixels[baseIndex+3] === 0) {
        continue;
      }
      var objId = pixels[baseIndex+0] | pixels[baseIndex+1] << 8 |
                  pixels[baseIndex+2] << 16;
      if (pickedIds[objId] === undefined) {
        var obj = this._objectIdManager.objectForId(objId);
        if (obj !== undefined) {
          pickedObjects.push(obj);
          pickedIds[objId] = true;
        }
      }
    }
  }
  this._pickBuffer.release();
  return pickedObjects;
};

PV.prototype.add = function(name, obj) {
  obj.name(name);
  this._objects.push(obj);
  this.requestRedraw();
  return obj;
};

PV.prototype._globToRegex = function(glob) {
  var r = glob.replace('.', '\\.').replace('*', '.*');
  return new RegExp('^'+r+'$');
};

PV.prototype.forEach = function() {
  var callback, pattern = '*';
  if (arguments.length === 2) {
    callback = arguments[1];
    pattern = arguments[0];
  } else {
    callback = arguments[0];
  }
  var regex = this._globToRegex(pattern);
  for (var i = 0; i < this._objects.length; ++i) {
    var obj = this._objects[i];
    if (regex.test(obj.name())) {
      callback(obj, i);
    }
  }
};

PV.prototype.get = function(name) {
  for (var i = 0; i < this._objects.length; ++i) {
    if (this._objects[i].name() === name) {
      return this._objects[i];
    }
  }
  console.error('could not find object with name', name);
  return null;
};

PV.prototype.hide = function(glob) {
  this.forEach(glob, function(obj) {
    obj.hide();
  });
};

PV.prototype.show = function(glob) {
  this.forEach(glob, function(obj) {
    obj.show();
  });
};

// remove all objects whose names match the provided glob pattern from 
// the viewer. 
PV.prototype.rm = function(glob) {
  var newObjects = [];
  var regex = this._globToRegex(pattern);
  for (var i = 0; i < this._objects.length; ++i) {
    var obj = this._objects[i];
    if (!regex.test(obj.name())) {
      newObjects.push(obj);
    }
    obj.destroy();
  }
  this._objects = newObjects;
};


PV.prototype.all = function() {
  return this._objects;
};

return { Viewer: function(elem, options) { return new PV(elem, options); }};
})();

