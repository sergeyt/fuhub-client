!function(root, factory) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = factory(); else if ("function" == typeof define && define.amd) define([], factory); else {
        var a = factory();
        for (var i in a) ("object" == typeof exports ? exports : root)[i] = a[i];
    }
}(this, function() {
    /******/
    return function(modules) {
        /******/
        /******/
        // The require function
        /******/
        function __webpack_require__(moduleId) {
            /******/
            /******/
            // Check if module is in cache
            /******/
            if (installedModules[moduleId]) /******/
            return installedModules[moduleId].exports;
            /******/
            /******/
            // Create a new module (and put it into the cache)
            /******/
            var module = installedModules[moduleId] = {
                /******/
                exports: {},
                /******/
                id: moduleId,
                /******/
                loaded: !1
            };
            /******/
            /******/
            // Return the exports of the module
            /******/
            /******/
            /******/
            // Execute the module function
            /******/
            /******/
            /******/
            // Flag the module as loaded
            /******/
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
            module.loaded = !0, module.exports;
        }
        // webpackBootstrap
        /******/
        // The module cache
        /******/
        var installedModules = {};
        /******/
        /******/
        // Load entry module and return exports
        /******/
        /******/
        /******/
        /******/
        // expose the modules object (__webpack_modules__)
        /******/
        /******/
        /******/
        // expose the module cache
        /******/
        /******/
        /******/
        // __webpack_public_path__
        /******/
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
        __webpack_require__.p = "", __webpack_require__(0);
    }([ /* 0 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function initSession(init, showLogin) {
            var client = new _client2.default();
            client.token().then(function(token) {
                (0, _store.setToken)(token), _lodash2.default.isFunction(init) && init();
            }, function() {
                _lodash2.default.isFunction(showLogin) && showLogin();
            });
        }
        function isLoggedIn() {
            return ((0, _store.getToken)() || "").length > 0;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.reduxCollection = exports.setToken = exports.getToken = exports.Client = exports.EventStream = exports.SSE = exports.ServerEvents = exports.API = exports.mimeType = void 0;
        var _global = __webpack_require__(20);
        Object.defineProperty(exports, "API", {
            enumerable: !0,
            get: function() {
                return _global.API;
            }
        }), Object.defineProperty(exports, "ServerEvents", {
            enumerable: !0,
            get: function() {
                return _global.ServerEvents;
            }
        }), Object.defineProperty(exports, "SSE", {
            enumerable: !0,
            get: function() {
                return _global.SSE;
            }
        }), exports.initSession = initSession, exports.isLoggedIn = isLoggedIn;
        var _lodash = __webpack_require__(10), _lodash2 = _interopRequireDefault(_lodash), _client = __webpack_require__(17), _client2 = _interopRequireDefault(_client), _store = __webpack_require__(9), _eventstream = __webpack_require__(19), _eventstream2 = _interopRequireDefault(_eventstream), _redux = __webpack_require__(39), _redux2 = _interopRequireDefault(_redux), _mimeType2 = __webpack_require__(8), _mimeType3 = _interopRequireDefault(_mimeType2);
        exports.mimeType = _mimeType3.default, exports.EventStream = _eventstream2.default, 
        exports.Client = _client2.default, exports.getToken = _store.getToken, exports.setToken = _store.setToken, 
        exports.reduxCollection = _redux2.default, exports.default = _client2.default;
    }, /* 1 */
    /***/
    function(module, exports) {
        function defaultSetTimout() {
            throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
            throw new Error("clearTimeout has not been defined");
        }
        function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) //normal enviroments in sane situations
            return setTimeout(fun, 0);
            // if setTimeout wasn't available but was latter defined
            if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) return cachedSetTimeout = setTimeout, 
            setTimeout(fun, 0);
            try {
                // when when somebody has screwed with setTimeout but no I.E. maddness
                return cachedSetTimeout(fun, 0);
            } catch (e) {
                try {
                    // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                    return cachedSetTimeout.call(null, fun, 0);
                } catch (e) {
                    // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                    return cachedSetTimeout.call(this, fun, 0);
                }
            }
        }
        function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) //normal enviroments in sane situations
            return clearTimeout(marker);
            // if clearTimeout wasn't available but was latter defined
            if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) return cachedClearTimeout = clearTimeout, 
            clearTimeout(marker);
            try {
                // when when somebody has screwed with setTimeout but no I.E. maddness
                return cachedClearTimeout(marker);
            } catch (e) {
                try {
                    // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                    return cachedClearTimeout.call(null, marker);
                } catch (e) {
                    // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                    // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                    return cachedClearTimeout.call(this, marker);
                }
            }
        }
        function cleanUpNextTick() {
            draining && currentQueue && (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, 
            queue.length && drainQueue());
        }
        function drainQueue() {
            if (!draining) {
                var timeout = runTimeout(cleanUpNextTick);
                draining = !0;
                for (var len = queue.length; len; ) {
                    for (currentQueue = queue, queue = []; ++queueIndex < len; ) currentQueue && currentQueue[queueIndex].run();
                    queueIndex = -1, len = queue.length;
                }
                currentQueue = null, draining = !1, runClearTimeout(timeout);
            }
        }
        // v8 likes predictible objects
        function Item(fun, array) {
            this.fun = fun, this.array = array;
        }
        function noop() {}
        // shim for using process in browser
        var cachedSetTimeout, cachedClearTimeout, process = module.exports = {};
        !function() {
            try {
                cachedSetTimeout = "function" == typeof setTimeout ? setTimeout : defaultSetTimout;
            } catch (e) {
                cachedSetTimeout = defaultSetTimout;
            }
            try {
                cachedClearTimeout = "function" == typeof clearTimeout ? clearTimeout : defaultClearTimeout;
            } catch (e) {
                cachedClearTimeout = defaultClearTimeout;
            }
        }();
        var currentQueue, queue = [], draining = !1, queueIndex = -1;
        process.nextTick = function(fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
            queue.push(new Item(fun, args)), 1 !== queue.length || draining || runTimeout(drainQueue);
        }, Item.prototype.run = function() {
            this.fun.apply(null, this.array);
        }, process.title = "browser", process.browser = !0, process.env = {}, process.argv = [], 
        process.version = "", // empty string to avoid regexp issues
        process.versions = {}, process.on = noop, process.addListener = noop, process.once = noop, 
        process.off = noop, process.removeListener = noop, process.removeAllListeners = noop, 
        process.emit = noop, process.binding = function(name) {
            throw new Error("process.binding is not supported");
        }, process.cwd = function() {
            return "/";
        }, process.chdir = function(dir) {
            throw new Error("process.chdir is not supported");
        }, process.umask = function() {
            return 0;
        };
    }, /* 2 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */
        (function(global) {
            /*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
            /* eslint-disable no-proto */
            "use strict";
            function typedArraySupport() {
                try {
                    var arr = new Uint8Array(1);
                    // typed array instances can be augmented
                    // chrome 9-10 lack `subarray`
                    return arr.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function() {
                            return 42;
                        }
                    }, 42 === arr.foo() && "function" == typeof arr.subarray && 0 === arr.subarray(1, 1).byteLength;
                } catch (e) {
                    return !1;
                }
            }
            function kMaxLength() {
                return Buffer.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
            }
            function createBuffer(that, length) {
                if (kMaxLength() < length) throw new RangeError("Invalid typed array length");
                // Return an augmented `Uint8Array` instance, for best performance
                // Fallback: Return an object instance of the Buffer class
                return Buffer.TYPED_ARRAY_SUPPORT ? (that = new Uint8Array(length), that.__proto__ = Buffer.prototype) : (null === that && (that = new Buffer(length)), 
                that.length = length), that;
            }
            /**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */
            function Buffer(arg, encodingOrOffset, length) {
                if (!(Buffer.TYPED_ARRAY_SUPPORT || this instanceof Buffer)) return new Buffer(arg, encodingOrOffset, length);
                // Common case.
                if ("number" == typeof arg) {
                    if ("string" == typeof encodingOrOffset) throw new Error("If encoding is specified then the first argument must be a string");
                    return allocUnsafe(this, arg);
                }
                return from(this, arg, encodingOrOffset, length);
            }
            function from(that, value, encodingOrOffset, length) {
                if ("number" == typeof value) throw new TypeError('"value" argument must not be a number');
                return "undefined" != typeof ArrayBuffer && value instanceof ArrayBuffer ? fromArrayBuffer(that, value, encodingOrOffset, length) : "string" == typeof value ? fromString(that, value, encodingOrOffset) : fromObject(that, value);
            }
            function assertSize(size) {
                if ("number" != typeof size) throw new TypeError('"size" argument must be a number');
                if (size < 0) throw new RangeError('"size" argument must not be negative');
            }
            function alloc(that, size, fill, encoding) {
                return assertSize(size), size <= 0 ? createBuffer(that, size) : void 0 !== fill ? "string" == typeof encoding ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill) : createBuffer(that, size);
            }
            function allocUnsafe(that, size) {
                if (assertSize(size), that = createBuffer(that, size < 0 ? 0 : 0 | checked(size)), 
                !Buffer.TYPED_ARRAY_SUPPORT) for (var i = 0; i < size; ++i) that[i] = 0;
                return that;
            }
            function fromString(that, string, encoding) {
                if ("string" == typeof encoding && "" !== encoding || (encoding = "utf8"), !Buffer.isEncoding(encoding)) throw new TypeError('"encoding" must be a valid string encoding');
                var length = 0 | byteLength(string, encoding);
                that = createBuffer(that, length);
                var actual = that.write(string, encoding);
                // Writing a hex string, for example, that contains invalid characters will
                // cause everything after the first invalid character to be ignored. (e.g.
                // 'abxxcd' will be treated as 'ab')
                return actual !== length && (that = that.slice(0, actual)), that;
            }
            function fromArrayLike(that, array) {
                var length = array.length < 0 ? 0 : 0 | checked(array.length);
                that = createBuffer(that, length);
                for (var i = 0; i < length; i += 1) that[i] = 255 & array[i];
                return that;
            }
            function fromArrayBuffer(that, array, byteOffset, length) {
                // this throws if `array` is not a valid ArrayBuffer
                if (array.byteLength, byteOffset < 0 || array.byteLength < byteOffset) throw new RangeError("'offset' is out of bounds");
                if (array.byteLength < byteOffset + (length || 0)) throw new RangeError("'length' is out of bounds");
                // Return an augmented `Uint8Array` instance, for best performance
                // Fallback: Return an object instance of the Buffer class
                return array = void 0 === byteOffset && void 0 === length ? new Uint8Array(array) : void 0 === length ? new Uint8Array(array, byteOffset) : new Uint8Array(array, byteOffset, length), 
                Buffer.TYPED_ARRAY_SUPPORT ? (that = array, that.__proto__ = Buffer.prototype) : that = fromArrayLike(that, array), 
                that;
            }
            function fromObject(that, obj) {
                if (Buffer.isBuffer(obj)) {
                    var len = 0 | checked(obj.length);
                    return that = createBuffer(that, len), 0 === that.length ? that : (obj.copy(that, 0, 0, len), 
                    that);
                }
                if (obj) {
                    if ("undefined" != typeof ArrayBuffer && obj.buffer instanceof ArrayBuffer || "length" in obj) return "number" != typeof obj.length || isnan(obj.length) ? createBuffer(that, 0) : fromArrayLike(that, obj);
                    if ("Buffer" === obj.type && isArray(obj.data)) return fromArrayLike(that, obj.data);
                }
                throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
            }
            function checked(length) {
                // Note: cannot use `length < kMaxLength()` here because that fails when
                // length is NaN (which is otherwise coerced to zero.)
                if (length >= kMaxLength()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
                return 0 | length;
            }
            function SlowBuffer(length) {
                // eslint-disable-line eqeqeq
                return +length != length && (length = 0), Buffer.alloc(+length);
            }
            function byteLength(string, encoding) {
                if (Buffer.isBuffer(string)) return string.length;
                if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) return string.byteLength;
                "string" != typeof string && (string = "" + string);
                var len = string.length;
                if (0 === len) return 0;
                for (// Use a for loop to avoid recursion
                var loweredCase = !1; ;) switch (encoding) {
                  case "ascii":
                  case "latin1":
                  case "binary":
                    return len;

                  case "utf8":
                  case "utf-8":
                  case void 0:
                    return utf8ToBytes(string).length;

                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return 2 * len;

                  case "hex":
                    return len >>> 1;

                  case "base64":
                    return base64ToBytes(string).length;

                  default:
                    if (loweredCase) return utf8ToBytes(string).length;
                    // assume utf8
                    encoding = ("" + encoding).toLowerCase(), loweredCase = !0;
                }
            }
            function slowToString(encoding, start, end) {
                var loweredCase = !1;
                // Return early if start > this.length. Done here to prevent potential uint32
                // coercion fail below.
                if (// No need to verify that "this.length <= MAX_UINT32" since it's a read-only
                // property of a typed array.
                // This behaves neither like String nor Uint8Array in that we set start/end
                // to their upper/lower bounds if the value passed is out of range.
                // undefined is handled specially as per ECMA-262 6th Edition,
                // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
                (void 0 === start || start < 0) && (start = 0), start > this.length) return "";
                if ((void 0 === end || end > this.length) && (end = this.length), end <= 0) return "";
                if (// Force coersion to uint32. This will also coerce falsey/NaN values to 0.
                end >>>= 0, start >>>= 0, end <= start) return "";
                for (encoding || (encoding = "utf8"); ;) switch (encoding) {
                  case "hex":
                    return hexSlice(this, start, end);

                  case "utf8":
                  case "utf-8":
                    return utf8Slice(this, start, end);

                  case "ascii":
                    return asciiSlice(this, start, end);

                  case "latin1":
                  case "binary":
                    return latin1Slice(this, start, end);

                  case "base64":
                    return base64Slice(this, start, end);

                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return utf16leSlice(this, start, end);

                  default:
                    if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
                    encoding = (encoding + "").toLowerCase(), loweredCase = !0;
                }
            }
            function swap(b, n, m) {
                var i = b[n];
                b[n] = b[m], b[m] = i;
            }
            // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
            // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
            //
            // Arguments:
            // - buffer - a Buffer to search
            // - val - a string, Buffer, or number
            // - byteOffset - an index into `buffer`; will be clamped to an int32
            // - encoding - an optional encoding, relevant is val is a string
            // - dir - true for indexOf, false for lastIndexOf
            function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
                // Empty buffer means no match
                if (0 === buffer.length) return -1;
                if (// Normalize byteOffset
                "string" == typeof byteOffset ? (encoding = byteOffset, byteOffset = 0) : byteOffset > 2147483647 ? byteOffset = 2147483647 : byteOffset < -2147483648 && (byteOffset = -2147483648), 
                byteOffset = +byteOffset, // Coerce to Number.
                isNaN(byteOffset) && (// byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
                byteOffset = dir ? 0 : buffer.length - 1), // Normalize byteOffset: negative offsets start from the end of the buffer
                byteOffset < 0 && (byteOffset = buffer.length + byteOffset), byteOffset >= buffer.length) {
                    if (dir) return -1;
                    byteOffset = buffer.length - 1;
                } else if (byteOffset < 0) {
                    if (!dir) return -1;
                    byteOffset = 0;
                }
                // Finally, search either indexOf (if dir is true) or lastIndexOf
                if (// Normalize val
                "string" == typeof val && (val = Buffer.from(val, encoding)), Buffer.isBuffer(val)) // Special case: looking for empty string/buffer always fails
                // Special case: looking for empty string/buffer always fails
                return 0 === val.length ? -1 : arrayIndexOf(buffer, val, byteOffset, encoding, dir);
                if ("number" == typeof val) // Search for a byte value [0-255]
                // Search for a byte value [0-255]
                return val &= 255, Buffer.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? dir ? Uint8Array.prototype.indexOf.call(buffer, val, byteOffset) : Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset) : arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir);
                throw new TypeError("val must be string, number or Buffer");
            }
            function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
                function read(buf, i) {
                    return 1 === indexSize ? buf[i] : buf.readUInt16BE(i * indexSize);
                }
                var indexSize = 1, arrLength = arr.length, valLength = val.length;
                if (void 0 !== encoding && (encoding = String(encoding).toLowerCase(), "ucs2" === encoding || "ucs-2" === encoding || "utf16le" === encoding || "utf-16le" === encoding)) {
                    if (arr.length < 2 || val.length < 2) return -1;
                    indexSize = 2, arrLength /= 2, valLength /= 2, byteOffset /= 2;
                }
                var i;
                if (dir) {
                    var foundIndex = -1;
                    for (i = byteOffset; i < arrLength; i++) if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
                        if (foundIndex === -1 && (foundIndex = i), i - foundIndex + 1 === valLength) return foundIndex * indexSize;
                    } else foundIndex !== -1 && (i -= i - foundIndex), foundIndex = -1;
                } else for (byteOffset + valLength > arrLength && (byteOffset = arrLength - valLength), 
                i = byteOffset; i >= 0; i--) {
                    for (var found = !0, j = 0; j < valLength; j++) if (read(arr, i + j) !== read(val, j)) {
                        found = !1;
                        break;
                    }
                    if (found) return i;
                }
                return -1;
            }
            function hexWrite(buf, string, offset, length) {
                offset = Number(offset) || 0;
                var remaining = buf.length - offset;
                length ? (length = Number(length), length > remaining && (length = remaining)) : length = remaining;
                // must be an even number of digits
                var strLen = string.length;
                if (strLen % 2 !== 0) throw new TypeError("Invalid hex string");
                length > strLen / 2 && (length = strLen / 2);
                for (var i = 0; i < length; ++i) {
                    var parsed = parseInt(string.substr(2 * i, 2), 16);
                    if (isNaN(parsed)) return i;
                    buf[offset + i] = parsed;
                }
                return i;
            }
            function utf8Write(buf, string, offset, length) {
                return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
            }
            function asciiWrite(buf, string, offset, length) {
                return blitBuffer(asciiToBytes(string), buf, offset, length);
            }
            function latin1Write(buf, string, offset, length) {
                return asciiWrite(buf, string, offset, length);
            }
            function base64Write(buf, string, offset, length) {
                return blitBuffer(base64ToBytes(string), buf, offset, length);
            }
            function ucs2Write(buf, string, offset, length) {
                return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
            }
            function base64Slice(buf, start, end) {
                return 0 === start && end === buf.length ? base64.fromByteArray(buf) : base64.fromByteArray(buf.slice(start, end));
            }
            function utf8Slice(buf, start, end) {
                end = Math.min(buf.length, end);
                for (var res = [], i = start; i < end; ) {
                    var firstByte = buf[i], codePoint = null, bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
                    if (i + bytesPerSequence <= end) {
                        var secondByte, thirdByte, fourthByte, tempCodePoint;
                        switch (bytesPerSequence) {
                          case 1:
                            firstByte < 128 && (codePoint = firstByte);
                            break;

                          case 2:
                            secondByte = buf[i + 1], 128 === (192 & secondByte) && (tempCodePoint = (31 & firstByte) << 6 | 63 & secondByte, 
                            tempCodePoint > 127 && (codePoint = tempCodePoint));
                            break;

                          case 3:
                            secondByte = buf[i + 1], thirdByte = buf[i + 2], 128 === (192 & secondByte) && 128 === (192 & thirdByte) && (tempCodePoint = (15 & firstByte) << 12 | (63 & secondByte) << 6 | 63 & thirdByte, 
                            tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343) && (codePoint = tempCodePoint));
                            break;

                          case 4:
                            secondByte = buf[i + 1], thirdByte = buf[i + 2], fourthByte = buf[i + 3], 128 === (192 & secondByte) && 128 === (192 & thirdByte) && 128 === (192 & fourthByte) && (tempCodePoint = (15 & firstByte) << 18 | (63 & secondByte) << 12 | (63 & thirdByte) << 6 | 63 & fourthByte, 
                            tempCodePoint > 65535 && tempCodePoint < 1114112 && (codePoint = tempCodePoint));
                        }
                    }
                    null === codePoint ? (// we did not generate a valid codePoint so insert a
                    // replacement char (U+FFFD) and advance only 1 byte
                    codePoint = 65533, bytesPerSequence = 1) : codePoint > 65535 && (// encode to utf16 (surrogate pair dance)
                    codePoint -= 65536, res.push(codePoint >>> 10 & 1023 | 55296), codePoint = 56320 | 1023 & codePoint), 
                    res.push(codePoint), i += bytesPerSequence;
                }
                return decodeCodePointsArray(res);
            }
            function decodeCodePointsArray(codePoints) {
                var len = codePoints.length;
                if (len <= MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, codePoints);
                for (// Decode in chunks to avoid "call stack size exceeded".
                var res = "", i = 0; i < len; ) res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
                return res;
            }
            function asciiSlice(buf, start, end) {
                var ret = "";
                end = Math.min(buf.length, end);
                for (var i = start; i < end; ++i) ret += String.fromCharCode(127 & buf[i]);
                return ret;
            }
            function latin1Slice(buf, start, end) {
                var ret = "";
                end = Math.min(buf.length, end);
                for (var i = start; i < end; ++i) ret += String.fromCharCode(buf[i]);
                return ret;
            }
            function hexSlice(buf, start, end) {
                var len = buf.length;
                (!start || start < 0) && (start = 0), (!end || end < 0 || end > len) && (end = len);
                for (var out = "", i = start; i < end; ++i) out += toHex(buf[i]);
                return out;
            }
            function utf16leSlice(buf, start, end) {
                for (var bytes = buf.slice(start, end), res = "", i = 0; i < bytes.length; i += 2) res += String.fromCharCode(bytes[i] + 256 * bytes[i + 1]);
                return res;
            }
            /*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
            function checkOffset(offset, ext, length) {
                if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
                if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
            }
            function checkInt(buf, value, offset, ext, max, min) {
                if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
                if (offset + ext > buf.length) throw new RangeError("Index out of range");
            }
            function objectWriteUInt16(buf, value, offset, littleEndian) {
                value < 0 && (value = 65535 + value + 1);
                for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> 8 * (littleEndian ? i : 1 - i);
            }
            function objectWriteUInt32(buf, value, offset, littleEndian) {
                value < 0 && (value = 4294967295 + value + 1);
                for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) buf[offset + i] = value >>> 8 * (littleEndian ? i : 3 - i) & 255;
            }
            function checkIEEE754(buf, value, offset, ext, max, min) {
                if (offset + ext > buf.length) throw new RangeError("Index out of range");
                if (offset < 0) throw new RangeError("Index out of range");
            }
            function writeFloat(buf, value, offset, littleEndian, noAssert) {
                return noAssert || checkIEEE754(buf, value, offset, 4, 3.4028234663852886e38, -3.4028234663852886e38), 
                ieee754.write(buf, value, offset, littleEndian, 23, 4), offset + 4;
            }
            function writeDouble(buf, value, offset, littleEndian, noAssert) {
                return noAssert || checkIEEE754(buf, value, offset, 8, 1.7976931348623157e308, -1.7976931348623157e308), 
                ieee754.write(buf, value, offset, littleEndian, 52, 8), offset + 8;
            }
            function base64clean(str) {
                // Node converts strings with length < 2 to ''
                if (// Node strips out invalid characters like \n and \t from the string, base64-js does not
                str = stringtrim(str).replace(INVALID_BASE64_RE, ""), str.length < 2) return "";
                // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
                for (;str.length % 4 !== 0; ) str += "=";
                return str;
            }
            function stringtrim(str) {
                return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
            }
            function toHex(n) {
                return n < 16 ? "0" + n.toString(16) : n.toString(16);
            }
            function utf8ToBytes(string, units) {
                units = units || 1 / 0;
                for (var codePoint, length = string.length, leadSurrogate = null, bytes = [], i = 0; i < length; ++i) {
                    // is surrogate component
                    if (codePoint = string.charCodeAt(i), codePoint > 55295 && codePoint < 57344) {
                        // last char was a lead
                        if (!leadSurrogate) {
                            // no lead yet
                            if (codePoint > 56319) {
                                // unexpected trail
                                (units -= 3) > -1 && bytes.push(239, 191, 189);
                                continue;
                            }
                            if (i + 1 === length) {
                                // unpaired lead
                                (units -= 3) > -1 && bytes.push(239, 191, 189);
                                continue;
                            }
                            // valid lead
                            leadSurrogate = codePoint;
                            continue;
                        }
                        // 2 leads in a row
                        if (codePoint < 56320) {
                            (units -= 3) > -1 && bytes.push(239, 191, 189), leadSurrogate = codePoint;
                            continue;
                        }
                        // valid surrogate pair
                        codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
                    } else leadSurrogate && (units -= 3) > -1 && bytes.push(239, 191, 189);
                    // encode utf8
                    if (leadSurrogate = null, codePoint < 128) {
                        if ((units -= 1) < 0) break;
                        bytes.push(codePoint);
                    } else if (codePoint < 2048) {
                        if ((units -= 2) < 0) break;
                        bytes.push(codePoint >> 6 | 192, 63 & codePoint | 128);
                    } else if (codePoint < 65536) {
                        if ((units -= 3) < 0) break;
                        bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, 63 & codePoint | 128);
                    } else {
                        if (!(codePoint < 1114112)) throw new Error("Invalid code point");
                        if ((units -= 4) < 0) break;
                        bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, 63 & codePoint | 128);
                    }
                }
                return bytes;
            }
            function asciiToBytes(str) {
                for (var byteArray = [], i = 0; i < str.length; ++i) // Node's code seems to be doing this and not & 0x7F..
                byteArray.push(255 & str.charCodeAt(i));
                return byteArray;
            }
            function utf16leToBytes(str, units) {
                for (var c, hi, lo, byteArray = [], i = 0; i < str.length && !((units -= 2) < 0); ++i) c = str.charCodeAt(i), 
                hi = c >> 8, lo = c % 256, byteArray.push(lo), byteArray.push(hi);
                return byteArray;
            }
            function base64ToBytes(str) {
                return base64.toByteArray(base64clean(str));
            }
            function blitBuffer(src, dst, offset, length) {
                for (var i = 0; i < length && !(i + offset >= dst.length || i >= src.length); ++i) dst[i + offset] = src[i];
                return i;
            }
            function isnan(val) {
                return val !== val;
            }
            var base64 = __webpack_require__(42), ieee754 = __webpack_require__(47), isArray = __webpack_require__(22);
            exports.Buffer = Buffer, exports.SlowBuffer = SlowBuffer, exports.INSPECT_MAX_BYTES = 50, 
            /**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.
	
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
            Buffer.TYPED_ARRAY_SUPPORT = void 0 !== global.TYPED_ARRAY_SUPPORT ? global.TYPED_ARRAY_SUPPORT : typedArraySupport(), 
            /*
	 * Export kMaxLength after typed array support is determined.
	 */
            exports.kMaxLength = kMaxLength(), Buffer.poolSize = 8192, // not used by this implementation
            // TODO: Legacy, not needed anymore. Remove in next major version.
            Buffer._augment = function(arr) {
                return arr.__proto__ = Buffer.prototype, arr;
            }, /**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
            Buffer.from = function(value, encodingOrOffset, length) {
                return from(null, value, encodingOrOffset, length);
            }, Buffer.TYPED_ARRAY_SUPPORT && (Buffer.prototype.__proto__ = Uint8Array.prototype, 
            Buffer.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && Buffer[Symbol.species] === Buffer && // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
            Object.defineProperty(Buffer, Symbol.species, {
                value: null,
                configurable: !0
            })), /**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
            Buffer.alloc = function(size, fill, encoding) {
                return alloc(null, size, fill, encoding);
            }, /**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
            Buffer.allocUnsafe = function(size) {
                return allocUnsafe(null, size);
            }, /**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
            Buffer.allocUnsafeSlow = function(size) {
                return allocUnsafe(null, size);
            }, Buffer.isBuffer = function(b) {
                return !(null == b || !b._isBuffer);
            }, Buffer.compare = function(a, b) {
                if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) throw new TypeError("Arguments must be Buffers");
                if (a === b) return 0;
                for (var x = a.length, y = b.length, i = 0, len = Math.min(x, y); i < len; ++i) if (a[i] !== b[i]) {
                    x = a[i], y = b[i];
                    break;
                }
                return x < y ? -1 : y < x ? 1 : 0;
            }, Buffer.isEncoding = function(encoding) {
                switch (String(encoding).toLowerCase()) {
                  case "hex":
                  case "utf8":
                  case "utf-8":
                  case "ascii":
                  case "latin1":
                  case "binary":
                  case "base64":
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return !0;

                  default:
                    return !1;
                }
            }, Buffer.concat = function(list, length) {
                if (!isArray(list)) throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === list.length) return Buffer.alloc(0);
                var i;
                if (void 0 === length) for (length = 0, i = 0; i < list.length; ++i) length += list[i].length;
                var buffer = Buffer.allocUnsafe(length), pos = 0;
                for (i = 0; i < list.length; ++i) {
                    var buf = list[i];
                    if (!Buffer.isBuffer(buf)) throw new TypeError('"list" argument must be an Array of Buffers');
                    buf.copy(buffer, pos), pos += buf.length;
                }
                return buffer;
            }, Buffer.byteLength = byteLength, // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
            // Buffer instances.
            Buffer.prototype._isBuffer = !0, Buffer.prototype.swap16 = function() {
                var len = this.length;
                if (len % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                for (var i = 0; i < len; i += 2) swap(this, i, i + 1);
                return this;
            }, Buffer.prototype.swap32 = function() {
                var len = this.length;
                if (len % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                for (var i = 0; i < len; i += 4) swap(this, i, i + 3), swap(this, i + 1, i + 2);
                return this;
            }, Buffer.prototype.swap64 = function() {
                var len = this.length;
                if (len % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                for (var i = 0; i < len; i += 8) swap(this, i, i + 7), swap(this, i + 1, i + 6), 
                swap(this, i + 2, i + 5), swap(this, i + 3, i + 4);
                return this;
            }, Buffer.prototype.toString = function() {
                var length = 0 | this.length;
                return 0 === length ? "" : 0 === arguments.length ? utf8Slice(this, 0, length) : slowToString.apply(this, arguments);
            }, Buffer.prototype.equals = function(b) {
                if (!Buffer.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
                return this === b || 0 === Buffer.compare(this, b);
            }, Buffer.prototype.inspect = function() {
                var str = "", max = exports.INSPECT_MAX_BYTES;
                return this.length > 0 && (str = this.toString("hex", 0, max).match(/.{2}/g).join(" "), 
                this.length > max && (str += " ... ")), "<Buffer " + str + ">";
            }, Buffer.prototype.compare = function(target, start, end, thisStart, thisEnd) {
                if (!Buffer.isBuffer(target)) throw new TypeError("Argument must be a Buffer");
                if (void 0 === start && (start = 0), void 0 === end && (end = target ? target.length : 0), 
                void 0 === thisStart && (thisStart = 0), void 0 === thisEnd && (thisEnd = this.length), 
                start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) throw new RangeError("out of range index");
                if (thisStart >= thisEnd && start >= end) return 0;
                if (thisStart >= thisEnd) return -1;
                if (start >= end) return 1;
                if (start >>>= 0, end >>>= 0, thisStart >>>= 0, thisEnd >>>= 0, this === target) return 0;
                for (var x = thisEnd - thisStart, y = end - start, len = Math.min(x, y), thisCopy = this.slice(thisStart, thisEnd), targetCopy = target.slice(start, end), i = 0; i < len; ++i) if (thisCopy[i] !== targetCopy[i]) {
                    x = thisCopy[i], y = targetCopy[i];
                    break;
                }
                return x < y ? -1 : y < x ? 1 : 0;
            }, Buffer.prototype.includes = function(val, byteOffset, encoding) {
                return this.indexOf(val, byteOffset, encoding) !== -1;
            }, Buffer.prototype.indexOf = function(val, byteOffset, encoding) {
                return bidirectionalIndexOf(this, val, byteOffset, encoding, !0);
            }, Buffer.prototype.lastIndexOf = function(val, byteOffset, encoding) {
                return bidirectionalIndexOf(this, val, byteOffset, encoding, !1);
            }, Buffer.prototype.write = function(string, offset, length, encoding) {
                // Buffer#write(string)
                if (void 0 === offset) encoding = "utf8", length = this.length, offset = 0; else if (void 0 === length && "string" == typeof offset) encoding = offset, 
                length = this.length, offset = 0; else {
                    if (!isFinite(offset)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    offset |= 0, isFinite(length) ? (length |= 0, void 0 === encoding && (encoding = "utf8")) : (encoding = length, 
                    length = void 0);
                }
                var remaining = this.length - offset;
                if ((void 0 === length || length > remaining) && (length = remaining), string.length > 0 && (length < 0 || offset < 0) || offset > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                encoding || (encoding = "utf8");
                for (var loweredCase = !1; ;) switch (encoding) {
                  case "hex":
                    return hexWrite(this, string, offset, length);

                  case "utf8":
                  case "utf-8":
                    return utf8Write(this, string, offset, length);

                  case "ascii":
                    return asciiWrite(this, string, offset, length);

                  case "latin1":
                  case "binary":
                    return latin1Write(this, string, offset, length);

                  case "base64":
                    // Warning: maxLength not taken into account in base64Write
                    return base64Write(this, string, offset, length);

                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return ucs2Write(this, string, offset, length);

                  default:
                    if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
                    encoding = ("" + encoding).toLowerCase(), loweredCase = !0;
                }
            }, Buffer.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                };
            };
            // Based on http://stackoverflow.com/a/22747272/680742, the browser with
            // the lowest limit is Chrome, with 0x10000 args.
            // We go 1 magnitude less, for safety
            var MAX_ARGUMENTS_LENGTH = 4096;
            Buffer.prototype.slice = function(start, end) {
                var len = this.length;
                start = ~~start, end = void 0 === end ? len : ~~end, start < 0 ? (start += len, 
                start < 0 && (start = 0)) : start > len && (start = len), end < 0 ? (end += len, 
                end < 0 && (end = 0)) : end > len && (end = len), end < start && (end = start);
                var newBuf;
                if (Buffer.TYPED_ARRAY_SUPPORT) newBuf = this.subarray(start, end), newBuf.__proto__ = Buffer.prototype; else {
                    var sliceLen = end - start;
                    newBuf = new Buffer(sliceLen, void 0);
                    for (var i = 0; i < sliceLen; ++i) newBuf[i] = this[i + start];
                }
                return newBuf;
            }, Buffer.prototype.readUIntLE = function(offset, byteLength, noAssert) {
                offset |= 0, byteLength |= 0, noAssert || checkOffset(offset, byteLength, this.length);
                for (var val = this[offset], mul = 1, i = 0; ++i < byteLength && (mul *= 256); ) val += this[offset + i] * mul;
                return val;
            }, Buffer.prototype.readUIntBE = function(offset, byteLength, noAssert) {
                offset |= 0, byteLength |= 0, noAssert || checkOffset(offset, byteLength, this.length);
                for (var val = this[offset + --byteLength], mul = 1; byteLength > 0 && (mul *= 256); ) val += this[offset + --byteLength] * mul;
                return val;
            }, Buffer.prototype.readUInt8 = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 1, this.length), this[offset];
            }, Buffer.prototype.readUInt16LE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 2, this.length), this[offset] | this[offset + 1] << 8;
            }, Buffer.prototype.readUInt16BE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 2, this.length), this[offset] << 8 | this[offset + 1];
            }, Buffer.prototype.readUInt32LE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 4, this.length), (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + 16777216 * this[offset + 3];
            }, Buffer.prototype.readUInt32BE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 4, this.length), 16777216 * this[offset] + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
            }, Buffer.prototype.readIntLE = function(offset, byteLength, noAssert) {
                offset |= 0, byteLength |= 0, noAssert || checkOffset(offset, byteLength, this.length);
                for (var val = this[offset], mul = 1, i = 0; ++i < byteLength && (mul *= 256); ) val += this[offset + i] * mul;
                return mul *= 128, val >= mul && (val -= Math.pow(2, 8 * byteLength)), val;
            }, Buffer.prototype.readIntBE = function(offset, byteLength, noAssert) {
                offset |= 0, byteLength |= 0, noAssert || checkOffset(offset, byteLength, this.length);
                for (var i = byteLength, mul = 1, val = this[offset + --i]; i > 0 && (mul *= 256); ) val += this[offset + --i] * mul;
                return mul *= 128, val >= mul && (val -= Math.pow(2, 8 * byteLength)), val;
            }, Buffer.prototype.readInt8 = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 1, this.length), 128 & this[offset] ? (255 - this[offset] + 1) * -1 : this[offset];
            }, Buffer.prototype.readInt16LE = function(offset, noAssert) {
                noAssert || checkOffset(offset, 2, this.length);
                var val = this[offset] | this[offset + 1] << 8;
                return 32768 & val ? 4294901760 | val : val;
            }, Buffer.prototype.readInt16BE = function(offset, noAssert) {
                noAssert || checkOffset(offset, 2, this.length);
                var val = this[offset + 1] | this[offset] << 8;
                return 32768 & val ? 4294901760 | val : val;
            }, Buffer.prototype.readInt32LE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 4, this.length), this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
            }, Buffer.prototype.readInt32BE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 4, this.length), this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
            }, Buffer.prototype.readFloatLE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 4, this.length), ieee754.read(this, offset, !0, 23, 4);
            }, Buffer.prototype.readFloatBE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 4, this.length), ieee754.read(this, offset, !1, 23, 4);
            }, Buffer.prototype.readDoubleLE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 8, this.length), ieee754.read(this, offset, !0, 52, 8);
            }, Buffer.prototype.readDoubleBE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 8, this.length), ieee754.read(this, offset, !1, 52, 8);
            }, Buffer.prototype.writeUIntLE = function(value, offset, byteLength, noAssert) {
                if (value = +value, offset |= 0, byteLength |= 0, !noAssert) {
                    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
                    checkInt(this, value, offset, byteLength, maxBytes, 0);
                }
                var mul = 1, i = 0;
                for (this[offset] = 255 & value; ++i < byteLength && (mul *= 256); ) this[offset + i] = value / mul & 255;
                return offset + byteLength;
            }, Buffer.prototype.writeUIntBE = function(value, offset, byteLength, noAssert) {
                if (value = +value, offset |= 0, byteLength |= 0, !noAssert) {
                    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
                    checkInt(this, value, offset, byteLength, maxBytes, 0);
                }
                var i = byteLength - 1, mul = 1;
                for (this[offset + i] = 255 & value; --i >= 0 && (mul *= 256); ) this[offset + i] = value / mul & 255;
                return offset + byteLength;
            }, Buffer.prototype.writeUInt8 = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 1, 255, 0), 
                Buffer.TYPED_ARRAY_SUPPORT || (value = Math.floor(value)), this[offset] = 255 & value, 
                offset + 1;
            }, Buffer.prototype.writeUInt16LE = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 2, 65535, 0), 
                Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = 255 & value, this[offset + 1] = value >>> 8) : objectWriteUInt16(this, value, offset, !0), 
                offset + 2;
            }, Buffer.prototype.writeUInt16BE = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 2, 65535, 0), 
                Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 8, this[offset + 1] = 255 & value) : objectWriteUInt16(this, value, offset, !1), 
                offset + 2;
            }, Buffer.prototype.writeUInt32LE = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 4, 4294967295, 0), 
                Buffer.TYPED_ARRAY_SUPPORT ? (this[offset + 3] = value >>> 24, this[offset + 2] = value >>> 16, 
                this[offset + 1] = value >>> 8, this[offset] = 255 & value) : objectWriteUInt32(this, value, offset, !0), 
                offset + 4;
            }, Buffer.prototype.writeUInt32BE = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 4, 4294967295, 0), 
                Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 24, this[offset + 1] = value >>> 16, 
                this[offset + 2] = value >>> 8, this[offset + 3] = 255 & value) : objectWriteUInt32(this, value, offset, !1), 
                offset + 4;
            }, Buffer.prototype.writeIntLE = function(value, offset, byteLength, noAssert) {
                if (value = +value, offset |= 0, !noAssert) {
                    var limit = Math.pow(2, 8 * byteLength - 1);
                    checkInt(this, value, offset, byteLength, limit - 1, -limit);
                }
                var i = 0, mul = 1, sub = 0;
                for (this[offset] = 255 & value; ++i < byteLength && (mul *= 256); ) value < 0 && 0 === sub && 0 !== this[offset + i - 1] && (sub = 1), 
                this[offset + i] = (value / mul >> 0) - sub & 255;
                return offset + byteLength;
            }, Buffer.prototype.writeIntBE = function(value, offset, byteLength, noAssert) {
                if (value = +value, offset |= 0, !noAssert) {
                    var limit = Math.pow(2, 8 * byteLength - 1);
                    checkInt(this, value, offset, byteLength, limit - 1, -limit);
                }
                var i = byteLength - 1, mul = 1, sub = 0;
                for (this[offset + i] = 255 & value; --i >= 0 && (mul *= 256); ) value < 0 && 0 === sub && 0 !== this[offset + i + 1] && (sub = 1), 
                this[offset + i] = (value / mul >> 0) - sub & 255;
                return offset + byteLength;
            }, Buffer.prototype.writeInt8 = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 1, 127, -128), 
                Buffer.TYPED_ARRAY_SUPPORT || (value = Math.floor(value)), value < 0 && (value = 255 + value + 1), 
                this[offset] = 255 & value, offset + 1;
            }, Buffer.prototype.writeInt16LE = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 2, 32767, -32768), 
                Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = 255 & value, this[offset + 1] = value >>> 8) : objectWriteUInt16(this, value, offset, !0), 
                offset + 2;
            }, Buffer.prototype.writeInt16BE = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 2, 32767, -32768), 
                Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 8, this[offset + 1] = 255 & value) : objectWriteUInt16(this, value, offset, !1), 
                offset + 2;
            }, Buffer.prototype.writeInt32LE = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648), 
                Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = 255 & value, this[offset + 1] = value >>> 8, 
                this[offset + 2] = value >>> 16, this[offset + 3] = value >>> 24) : objectWriteUInt32(this, value, offset, !0), 
                offset + 4;
            }, Buffer.prototype.writeInt32BE = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648), 
                value < 0 && (value = 4294967295 + value + 1), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 24, 
                this[offset + 1] = value >>> 16, this[offset + 2] = value >>> 8, this[offset + 3] = 255 & value) : objectWriteUInt32(this, value, offset, !1), 
                offset + 4;
            }, Buffer.prototype.writeFloatLE = function(value, offset, noAssert) {
                return writeFloat(this, value, offset, !0, noAssert);
            }, Buffer.prototype.writeFloatBE = function(value, offset, noAssert) {
                return writeFloat(this, value, offset, !1, noAssert);
            }, Buffer.prototype.writeDoubleLE = function(value, offset, noAssert) {
                return writeDouble(this, value, offset, !0, noAssert);
            }, Buffer.prototype.writeDoubleBE = function(value, offset, noAssert) {
                return writeDouble(this, value, offset, !1, noAssert);
            }, // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
            Buffer.prototype.copy = function(target, targetStart, start, end) {
                // Copy 0 bytes; we're done
                if (start || (start = 0), end || 0 === end || (end = this.length), targetStart >= target.length && (targetStart = target.length), 
                targetStart || (targetStart = 0), end > 0 && end < start && (end = start), end === start) return 0;
                if (0 === target.length || 0 === this.length) return 0;
                // Fatal error conditions
                if (targetStart < 0) throw new RangeError("targetStart out of bounds");
                if (start < 0 || start >= this.length) throw new RangeError("sourceStart out of bounds");
                if (end < 0) throw new RangeError("sourceEnd out of bounds");
                // Are we oob?
                end > this.length && (end = this.length), target.length - targetStart < end - start && (end = target.length - targetStart + start);
                var i, len = end - start;
                if (this === target && start < targetStart && targetStart < end) // descending copy from end
                for (i = len - 1; i >= 0; --i) target[i + targetStart] = this[i + start]; else if (len < 1e3 || !Buffer.TYPED_ARRAY_SUPPORT) // ascending copy from start
                for (i = 0; i < len; ++i) target[i + targetStart] = this[i + start]; else Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
                return len;
            }, // Usage:
            //    buffer.fill(number[, offset[, end]])
            //    buffer.fill(buffer[, offset[, end]])
            //    buffer.fill(string[, offset[, end]][, encoding])
            Buffer.prototype.fill = function(val, start, end, encoding) {
                // Handle string cases:
                if ("string" == typeof val) {
                    if ("string" == typeof start ? (encoding = start, start = 0, end = this.length) : "string" == typeof end && (encoding = end, 
                    end = this.length), 1 === val.length) {
                        var code = val.charCodeAt(0);
                        code < 256 && (val = code);
                    }
                    if (void 0 !== encoding && "string" != typeof encoding) throw new TypeError("encoding must be a string");
                    if ("string" == typeof encoding && !Buffer.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
                } else "number" == typeof val && (val &= 255);
                // Invalid ranges are not set to a default, so can range check early.
                if (start < 0 || this.length < start || this.length < end) throw new RangeError("Out of range index");
                if (end <= start) return this;
                start >>>= 0, end = void 0 === end ? this.length : end >>> 0, val || (val = 0);
                var i;
                if ("number" == typeof val) for (i = start; i < end; ++i) this[i] = val; else {
                    var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString()), len = bytes.length;
                    for (i = 0; i < end - start; ++i) this[i + start] = bytes[i % len];
                }
                return this;
            };
            // HELPER FUNCTIONS
            // ================
            var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
        }).call(exports, function() {
            return this;
        }());
    }, /* 3 */
    /***/
    function(module, exports) {
        "function" == typeof Object.create ? // implementation from standard node.js 'util' module
        module.exports = function(ctor, superCtor) {
            ctor.super_ = superCtor, ctor.prototype = Object.create(superCtor.prototype, {
                constructor: {
                    value: ctor,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            });
        } : // old school shim for old browsers
        module.exports = function(ctor, superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {};
            TempCtor.prototype = superCtor.prototype, ctor.prototype = new TempCtor(), ctor.prototype.constructor = ctor;
        };
    }, /* 4 */
    /***/
    function(module, exports, __webpack_require__) {
        // a duplex stream is just a stream that is both readable and writable.
        // Since JS doesn't have multiple prototypal inheritance, this class
        // prototypally inherits from Readable, and then parasitically from
        // Writable.
        "use strict";
        function Duplex(options) {
            return this instanceof Duplex ? (Readable.call(this, options), Writable.call(this, options), 
            options && options.readable === !1 && (this.readable = !1), options && options.writable === !1 && (this.writable = !1), 
            this.allowHalfOpen = !0, options && options.allowHalfOpen === !1 && (this.allowHalfOpen = !1), 
            void this.once("end", onend)) : new Duplex(options);
        }
        // the no-half-open enforcer
        function onend() {
            // if we allow half-open state, or if the writable side ended,
            // then we're ok.
            this.allowHalfOpen || this._writableState.ended || // no more data can be written.
            // But allow more writes to happen in this tick.
            processNextTick(onEndNT, this);
        }
        function onEndNT(self) {
            self.end();
        }
        /*<replacement>*/
        var objectKeys = Object.keys || function(obj) {
            var keys = [];
            for (var key in obj) keys.push(key);
            return keys;
        };
        /*</replacement>*/
        module.exports = Duplex;
        /*<replacement>*/
        var processNextTick = __webpack_require__(12), util = __webpack_require__(6);
        util.inherits = __webpack_require__(3);
        /*</replacement>*/
        var Readable = __webpack_require__(25), Writable = __webpack_require__(14);
        util.inherits(Duplex, Readable);
        for (var keys = objectKeys(Writable.prototype), v = 0; v < keys.length; v++) {
            var method = keys[v];
            Duplex.prototype[method] || (Duplex.prototype[method] = Writable.prototype[method]);
        }
    }, /* 5 */
    /***/
    function(module, exports) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), Resource = function() {
            function Resource(client, type, id) {
                _classCallCheck(this, Resource), this.client = client, this.type = type, this.id = id, 
                this.path = "/api/" + type + "/" + this.id;
            }
            return _createClass(Resource, [ {
                key: "fetchJSON",
                value: function(path) {
                    var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return this.client.fetchJSON(path, options);
                }
            }, {
                key: "postJSON",
                value: function(path, body) {
                    var extra = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    return this.client.postJSON(path, body, extra);
                }
            }, {
                key: "putJSON",
                value: function(path, body) {
                    var extra = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    return this.client.putJSON(path, body, extra);
                }
            }, {
                key: "fetch",
                value: function() {
                    return this.client.fetchJSON(this.path);
                }
            }, {
                key: "load",
                value: function() {
                    return this.fetch();
                }
            }, {
                key: "update",
                value: function(payload) {
                    return this.client.putJSON(this.path, payload);
                }
            }, {
                key: "delete",
                value: function() {
                    return this.client.delete(this.path);
                }
            }, {
                key: "remove",
                value: function() {
                    return this.delete();
                }
            } ]), Resource;
        }();
        // TODO WithEvents functional mixin
        // TODO WithComments functional mixin
        exports.default = Resource;
    }, /* 6 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */
        (function(Buffer) {
            // Copyright Joyent, Inc. and other Node contributors.
            //
            // Permission is hereby granted, free of charge, to any person obtaining a
            // copy of this software and associated documentation files (the
            // "Software"), to deal in the Software without restriction, including
            // without limitation the rights to use, copy, modify, merge, publish,
            // distribute, sublicense, and/or sell copies of the Software, and to permit
            // persons to whom the Software is furnished to do so, subject to the
            // following conditions:
            //
            // The above copyright notice and this permission notice shall be included
            // in all copies or substantial portions of the Software.
            //
            // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
            // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
            // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
            // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
            // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
            // USE OR OTHER DEALINGS IN THE SOFTWARE.
            // NOTE: These type checking functions intentionally don't use `instanceof`
            // because it is fragile and can be easily faked with `Object.create()`.
            function isArray(arg) {
                return Array.isArray ? Array.isArray(arg) : "[object Array]" === objectToString(arg);
            }
            function isBoolean(arg) {
                return "boolean" == typeof arg;
            }
            function isNull(arg) {
                return null === arg;
            }
            function isNullOrUndefined(arg) {
                return null == arg;
            }
            function isNumber(arg) {
                return "number" == typeof arg;
            }
            function isString(arg) {
                return "string" == typeof arg;
            }
            function isSymbol(arg) {
                return "symbol" == typeof arg;
            }
            function isUndefined(arg) {
                return void 0 === arg;
            }
            function isRegExp(re) {
                return "[object RegExp]" === objectToString(re);
            }
            function isObject(arg) {
                return "object" == typeof arg && null !== arg;
            }
            function isDate(d) {
                return "[object Date]" === objectToString(d);
            }
            function isError(e) {
                return "[object Error]" === objectToString(e) || e instanceof Error;
            }
            function isFunction(arg) {
                return "function" == typeof arg;
            }
            function isPrimitive(arg) {
                // ES6 symbol
                return null === arg || "boolean" == typeof arg || "number" == typeof arg || "string" == typeof arg || "symbol" == typeof arg || "undefined" == typeof arg;
            }
            function objectToString(o) {
                return Object.prototype.toString.call(o);
            }
            exports.isArray = isArray, exports.isBoolean = isBoolean, exports.isNull = isNull, 
            exports.isNullOrUndefined = isNullOrUndefined, exports.isNumber = isNumber, exports.isString = isString, 
            exports.isSymbol = isSymbol, exports.isUndefined = isUndefined, exports.isRegExp = isRegExp, 
            exports.isObject = isObject, exports.isDate = isDate, exports.isError = isError, 
            exports.isFunction = isFunction, exports.isPrimitive = isPrimitive, exports.isBuffer = Buffer.isBuffer;
        }).call(exports, __webpack_require__(2).Buffer);
    }, /* 7 */
    /***/
    function(module, exports) {
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.
        function EventEmitter() {
            this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0;
        }
        function isFunction(arg) {
            return "function" == typeof arg;
        }
        function isNumber(arg) {
            return "number" == typeof arg;
        }
        function isObject(arg) {
            return "object" == typeof arg && null !== arg;
        }
        function isUndefined(arg) {
            return void 0 === arg;
        }
        module.exports = EventEmitter, // Backwards-compat with node 0.10.x
        EventEmitter.EventEmitter = EventEmitter, EventEmitter.prototype._events = void 0, 
        EventEmitter.prototype._maxListeners = void 0, // By default EventEmitters will print a warning if more than 10 listeners are
        // added to it. This is a useful default which helps finding memory leaks.
        EventEmitter.defaultMaxListeners = 10, // Obviously not all Emitters should be limited to 10. This function allows
        // that to be increased. Set to zero for unlimited.
        EventEmitter.prototype.setMaxListeners = function(n) {
            if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError("n must be a positive number");
            return this._maxListeners = n, this;
        }, EventEmitter.prototype.emit = function(type) {
            var er, handler, len, args, i, listeners;
            // If there is no 'error' event listener then throw.
            if (this._events || (this._events = {}), "error" === type && (!this._events.error || isObject(this._events.error) && !this._events.error.length)) {
                if (er = arguments[1], er instanceof Error) throw er;
                // At least give some kind of context to the user
                var err = new Error('Uncaught, unspecified "error" event. (' + er + ")");
                throw err.context = er, err;
            }
            if (handler = this._events[type], isUndefined(handler)) return !1;
            if (isFunction(handler)) switch (arguments.length) {
              // fast cases
                case 1:
                handler.call(this);
                break;

              case 2:
                handler.call(this, arguments[1]);
                break;

              case 3:
                handler.call(this, arguments[1], arguments[2]);
                break;

              // slower
                default:
                args = Array.prototype.slice.call(arguments, 1), handler.apply(this, args);
            } else if (isObject(handler)) for (args = Array.prototype.slice.call(arguments, 1), 
            listeners = handler.slice(), len = listeners.length, i = 0; i < len; i++) listeners[i].apply(this, args);
            return !0;
        }, EventEmitter.prototype.addListener = function(type, listener) {
            var m;
            if (!isFunction(listener)) throw TypeError("listener must be a function");
            // To avoid recursion in the case that type === "newListener"! Before
            // adding it to the listeners, first emit "newListener".
            // If we've already got an array, just append.
            // Adding the second element, need to change to array.
            // Optimize the case of one listener. Don't need the extra array object.
            // Check for listener leak
            // not supported in IE 10
            return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", type, isFunction(listener.listener) ? listener.listener : listener), 
            this._events[type] ? isObject(this._events[type]) ? this._events[type].push(listener) : this._events[type] = [ this._events[type], listener ] : this._events[type] = listener, 
            isObject(this._events[type]) && !this._events[type].warned && (m = isUndefined(this._maxListeners) ? EventEmitter.defaultMaxListeners : this._maxListeners, 
            m && m > 0 && this._events[type].length > m && (this._events[type].warned = !0, 
            console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[type].length), 
            "function" == typeof console.trace && console.trace())), this;
        }, EventEmitter.prototype.on = EventEmitter.prototype.addListener, EventEmitter.prototype.once = function(type, listener) {
            function g() {
                this.removeListener(type, g), fired || (fired = !0, listener.apply(this, arguments));
            }
            if (!isFunction(listener)) throw TypeError("listener must be a function");
            var fired = !1;
            return g.listener = listener, this.on(type, g), this;
        }, // emits a 'removeListener' event iff the listener was removed
        EventEmitter.prototype.removeListener = function(type, listener) {
            var list, position, length, i;
            if (!isFunction(listener)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[type]) return this;
            if (list = this._events[type], length = list.length, position = -1, list === listener || isFunction(list.listener) && list.listener === listener) delete this._events[type], 
            this._events.removeListener && this.emit("removeListener", type, listener); else if (isObject(list)) {
                for (i = length; i-- > 0; ) if (list[i] === listener || list[i].listener && list[i].listener === listener) {
                    position = i;
                    break;
                }
                if (position < 0) return this;
                1 === list.length ? (list.length = 0, delete this._events[type]) : list.splice(position, 1), 
                this._events.removeListener && this.emit("removeListener", type, listener);
            }
            return this;
        }, EventEmitter.prototype.removeAllListeners = function(type) {
            var key, listeners;
            if (!this._events) return this;
            // not listening for removeListener, no need to emit
            if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[type] && delete this._events[type], 
            this;
            // emit removeListener for all listeners on all events
            if (0 === arguments.length) {
                for (key in this._events) "removeListener" !== key && this.removeAllListeners(key);
                return this.removeAllListeners("removeListener"), this._events = {}, this;
            }
            if (listeners = this._events[type], isFunction(listeners)) this.removeListener(type, listeners); else if (listeners) // LIFO order
            for (;listeners.length; ) this.removeListener(type, listeners[listeners.length - 1]);
            return delete this._events[type], this;
        }, EventEmitter.prototype.listeners = function(type) {
            var ret;
            return ret = this._events && this._events[type] ? isFunction(this._events[type]) ? [ this._events[type] ] : this._events[type].slice() : [];
        }, EventEmitter.prototype.listenerCount = function(type) {
            if (this._events) {
                var evlistener = this._events[type];
                if (isFunction(evlistener)) return 1;
                if (evlistener) return evlistener.length;
            }
            return 0;
        }, EventEmitter.listenerCount = function(emitter, type) {
            return emitter.listenerCount(type);
        };
    }, /* 8 */
    /***/
    function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var mimeType = {
            json: "application/json",
            markdown: "text/markdown"
        };
        exports.default = mimeType;
    }, /* 9 */
    /***/
    function(module, exports) {
        "use strict";
        // TODO store in old-school cookies for old browsers
        function getToken() {
            return localStorage[tokenKey];
        }
        function setToken(value) {
            localStorage[tokenKey] = value;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.getToken = getToken, exports.setToken = setToken;
        var tokenKey = "auth.token";
    }, /* 10 */
    /***/
    function(module, exports, __webpack_require__) {
        var __WEBPACK_AMD_DEFINE_RESULT__;
        /* WEBPACK VAR INJECTION */ (function(global, module) {
            (function() {
                /*--------------------------------------------------------------------------*/
                /**
	   * Adds the key-value `pair` to `map`.
	   *
	   * @private
	   * @param {Object} map The map to modify.
	   * @param {Array} pair The key-value pair to add.
	   * @returns {Object} Returns `map`.
	   */
                function addMapEntry(map, pair) {
                    // Don't return `map.set` because it's not chainable in IE 11.
                    return map.set(pair[0], pair[1]), map;
                }
                /**
	   * Adds `value` to `set`.
	   *
	   * @private
	   * @param {Object} set The set to modify.
	   * @param {*} value The value to add.
	   * @returns {Object} Returns `set`.
	   */
                function addSetEntry(set, value) {
                    // Don't return `set.add` because it's not chainable in IE 11.
                    return set.add(value), set;
                }
                /**
	   * A faster alternative to `Function#apply`, this function invokes `func`
	   * with the `this` binding of `thisArg` and the arguments of `args`.
	   *
	   * @private
	   * @param {Function} func The function to invoke.
	   * @param {*} thisArg The `this` binding of `func`.
	   * @param {Array} args The arguments to invoke `func` with.
	   * @returns {*} Returns the result of `func`.
	   */
                function apply(func, thisArg, args) {
                    switch (args.length) {
                      case 0:
                        return func.call(thisArg);

                      case 1:
                        return func.call(thisArg, args[0]);

                      case 2:
                        return func.call(thisArg, args[0], args[1]);

                      case 3:
                        return func.call(thisArg, args[0], args[1], args[2]);
                    }
                    return func.apply(thisArg, args);
                }
                /**
	   * A specialized version of `baseAggregator` for arrays.
	   *
	   * @private
	   * @param {Array} [array] The array to iterate over.
	   * @param {Function} setter The function to set `accumulator` values.
	   * @param {Function} iteratee The iteratee to transform keys.
	   * @param {Object} accumulator The initial aggregated object.
	   * @returns {Function} Returns `accumulator`.
	   */
                function arrayAggregator(array, setter, iteratee, accumulator) {
                    for (var index = -1, length = null == array ? 0 : array.length; ++index < length; ) {
                        var value = array[index];
                        setter(accumulator, value, iteratee(value), array);
                    }
                    return accumulator;
                }
                /**
	   * A specialized version of `_.forEach` for arrays without support for
	   * iteratee shorthands.
	   *
	   * @private
	   * @param {Array} [array] The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array} Returns `array`.
	   */
                function arrayEach(array, iteratee) {
                    for (var index = -1, length = null == array ? 0 : array.length; ++index < length && iteratee(array[index], index, array) !== !1; ) ;
                    return array;
                }
                /**
	   * A specialized version of `_.forEachRight` for arrays without support for
	   * iteratee shorthands.
	   *
	   * @private
	   * @param {Array} [array] The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array} Returns `array`.
	   */
                function arrayEachRight(array, iteratee) {
                    for (var length = null == array ? 0 : array.length; length-- && iteratee(array[length], length, array) !== !1; ) ;
                    return array;
                }
                /**
	   * A specialized version of `_.every` for arrays without support for
	   * iteratee shorthands.
	   *
	   * @private
	   * @param {Array} [array] The array to iterate over.
	   * @param {Function} predicate The function invoked per iteration.
	   * @returns {boolean} Returns `true` if all elements pass the predicate check,
	   *  else `false`.
	   */
                function arrayEvery(array, predicate) {
                    for (var index = -1, length = null == array ? 0 : array.length; ++index < length; ) if (!predicate(array[index], index, array)) return !1;
                    return !0;
                }
                /**
	   * A specialized version of `_.filter` for arrays without support for
	   * iteratee shorthands.
	   *
	   * @private
	   * @param {Array} [array] The array to iterate over.
	   * @param {Function} predicate The function invoked per iteration.
	   * @returns {Array} Returns the new filtered array.
	   */
                function arrayFilter(array, predicate) {
                    for (var index = -1, length = null == array ? 0 : array.length, resIndex = 0, result = []; ++index < length; ) {
                        var value = array[index];
                        predicate(value, index, array) && (result[resIndex++] = value);
                    }
                    return result;
                }
                /**
	   * A specialized version of `_.includes` for arrays without support for
	   * specifying an index to search from.
	   *
	   * @private
	   * @param {Array} [array] The array to inspect.
	   * @param {*} target The value to search for.
	   * @returns {boolean} Returns `true` if `target` is found, else `false`.
	   */
                function arrayIncludes(array, value) {
                    var length = null == array ? 0 : array.length;
                    return !!length && baseIndexOf(array, value, 0) > -1;
                }
                /**
	   * This function is like `arrayIncludes` except that it accepts a comparator.
	   *
	   * @private
	   * @param {Array} [array] The array to inspect.
	   * @param {*} target The value to search for.
	   * @param {Function} comparator The comparator invoked per element.
	   * @returns {boolean} Returns `true` if `target` is found, else `false`.
	   */
                function arrayIncludesWith(array, value, comparator) {
                    for (var index = -1, length = null == array ? 0 : array.length; ++index < length; ) if (comparator(value, array[index])) return !0;
                    return !1;
                }
                /**
	   * A specialized version of `_.map` for arrays without support for iteratee
	   * shorthands.
	   *
	   * @private
	   * @param {Array} [array] The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array} Returns the new mapped array.
	   */
                function arrayMap(array, iteratee) {
                    for (var index = -1, length = null == array ? 0 : array.length, result = Array(length); ++index < length; ) result[index] = iteratee(array[index], index, array);
                    return result;
                }
                /**
	   * Appends the elements of `values` to `array`.
	   *
	   * @private
	   * @param {Array} array The array to modify.
	   * @param {Array} values The values to append.
	   * @returns {Array} Returns `array`.
	   */
                function arrayPush(array, values) {
                    for (var index = -1, length = values.length, offset = array.length; ++index < length; ) array[offset + index] = values[index];
                    return array;
                }
                /**
	   * A specialized version of `_.reduce` for arrays without support for
	   * iteratee shorthands.
	   *
	   * @private
	   * @param {Array} [array] The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @param {*} [accumulator] The initial value.
	   * @param {boolean} [initAccum] Specify using the first element of `array` as
	   *  the initial value.
	   * @returns {*} Returns the accumulated value.
	   */
                function arrayReduce(array, iteratee, accumulator, initAccum) {
                    var index = -1, length = null == array ? 0 : array.length;
                    for (initAccum && length && (accumulator = array[++index]); ++index < length; ) accumulator = iteratee(accumulator, array[index], index, array);
                    return accumulator;
                }
                /**
	   * A specialized version of `_.reduceRight` for arrays without support for
	   * iteratee shorthands.
	   *
	   * @private
	   * @param {Array} [array] The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @param {*} [accumulator] The initial value.
	   * @param {boolean} [initAccum] Specify using the last element of `array` as
	   *  the initial value.
	   * @returns {*} Returns the accumulated value.
	   */
                function arrayReduceRight(array, iteratee, accumulator, initAccum) {
                    var length = null == array ? 0 : array.length;
                    for (initAccum && length && (accumulator = array[--length]); length--; ) accumulator = iteratee(accumulator, array[length], length, array);
                    return accumulator;
                }
                /**
	   * A specialized version of `_.some` for arrays without support for iteratee
	   * shorthands.
	   *
	   * @private
	   * @param {Array} [array] The array to iterate over.
	   * @param {Function} predicate The function invoked per iteration.
	   * @returns {boolean} Returns `true` if any element passes the predicate check,
	   *  else `false`.
	   */
                function arraySome(array, predicate) {
                    for (var index = -1, length = null == array ? 0 : array.length; ++index < length; ) if (predicate(array[index], index, array)) return !0;
                    return !1;
                }
                /**
	   * Converts an ASCII `string` to an array.
	   *
	   * @private
	   * @param {string} string The string to convert.
	   * @returns {Array} Returns the converted array.
	   */
                function asciiToArray(string) {
                    return string.split("");
                }
                /**
	   * Splits an ASCII `string` into an array of its words.
	   *
	   * @private
	   * @param {string} The string to inspect.
	   * @returns {Array} Returns the words of `string`.
	   */
                function asciiWords(string) {
                    return string.match(reAsciiWord) || [];
                }
                /**
	   * The base implementation of methods like `_.findKey` and `_.findLastKey`,
	   * without support for iteratee shorthands, which iterates over `collection`
	   * using `eachFunc`.
	   *
	   * @private
	   * @param {Array|Object} collection The collection to inspect.
	   * @param {Function} predicate The function invoked per iteration.
	   * @param {Function} eachFunc The function to iterate over `collection`.
	   * @returns {*} Returns the found element or its key, else `undefined`.
	   */
                function baseFindKey(collection, predicate, eachFunc) {
                    var result;
                    return eachFunc(collection, function(value, key, collection) {
                        if (predicate(value, key, collection)) return result = key, !1;
                    }), result;
                }
                /**
	   * The base implementation of `_.findIndex` and `_.findLastIndex` without
	   * support for iteratee shorthands.
	   *
	   * @private
	   * @param {Array} array The array to inspect.
	   * @param {Function} predicate The function invoked per iteration.
	   * @param {number} fromIndex The index to search from.
	   * @param {boolean} [fromRight] Specify iterating from right to left.
	   * @returns {number} Returns the index of the matched value, else `-1`.
	   */
                function baseFindIndex(array, predicate, fromIndex, fromRight) {
                    for (var length = array.length, index = fromIndex + (fromRight ? 1 : -1); fromRight ? index-- : ++index < length; ) if (predicate(array[index], index, array)) return index;
                    return -1;
                }
                /**
	   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	   *
	   * @private
	   * @param {Array} array The array to inspect.
	   * @param {*} value The value to search for.
	   * @param {number} fromIndex The index to search from.
	   * @returns {number} Returns the index of the matched value, else `-1`.
	   */
                function baseIndexOf(array, value, fromIndex) {
                    return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
                }
                /**
	   * This function is like `baseIndexOf` except that it accepts a comparator.
	   *
	   * @private
	   * @param {Array} array The array to inspect.
	   * @param {*} value The value to search for.
	   * @param {number} fromIndex The index to search from.
	   * @param {Function} comparator The comparator invoked per element.
	   * @returns {number} Returns the index of the matched value, else `-1`.
	   */
                function baseIndexOfWith(array, value, fromIndex, comparator) {
                    for (var index = fromIndex - 1, length = array.length; ++index < length; ) if (comparator(array[index], value)) return index;
                    return -1;
                }
                /**
	   * The base implementation of `_.isNaN` without support for number objects.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	   */
                function baseIsNaN(value) {
                    return value !== value;
                }
                /**
	   * The base implementation of `_.mean` and `_.meanBy` without support for
	   * iteratee shorthands.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {number} Returns the mean.
	   */
                function baseMean(array, iteratee) {
                    var length = null == array ? 0 : array.length;
                    return length ? baseSum(array, iteratee) / length : NAN;
                }
                /**
	   * The base implementation of `_.property` without support for deep paths.
	   *
	   * @private
	   * @param {string} key The key of the property to get.
	   * @returns {Function} Returns the new accessor function.
	   */
                function baseProperty(key) {
                    return function(object) {
                        return null == object ? undefined : object[key];
                    };
                }
                /**
	   * The base implementation of `_.propertyOf` without support for deep paths.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @returns {Function} Returns the new accessor function.
	   */
                function basePropertyOf(object) {
                    return function(key) {
                        return null == object ? undefined : object[key];
                    };
                }
                /**
	   * The base implementation of `_.reduce` and `_.reduceRight`, without support
	   * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
	   *
	   * @private
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @param {*} accumulator The initial value.
	   * @param {boolean} initAccum Specify using the first or last element of
	   *  `collection` as the initial value.
	   * @param {Function} eachFunc The function to iterate over `collection`.
	   * @returns {*} Returns the accumulated value.
	   */
                function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
                    return eachFunc(collection, function(value, index, collection) {
                        accumulator = initAccum ? (initAccum = !1, value) : iteratee(accumulator, value, index, collection);
                    }), accumulator;
                }
                /**
	   * The base implementation of `_.sortBy` which uses `comparer` to define the
	   * sort order of `array` and replaces criteria objects with their corresponding
	   * values.
	   *
	   * @private
	   * @param {Array} array The array to sort.
	   * @param {Function} comparer The function to define sort order.
	   * @returns {Array} Returns `array`.
	   */
                function baseSortBy(array, comparer) {
                    var length = array.length;
                    for (array.sort(comparer); length--; ) array[length] = array[length].value;
                    return array;
                }
                /**
	   * The base implementation of `_.sum` and `_.sumBy` without support for
	   * iteratee shorthands.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {number} Returns the sum.
	   */
                function baseSum(array, iteratee) {
                    for (var result, index = -1, length = array.length; ++index < length; ) {
                        var current = iteratee(array[index]);
                        current !== undefined && (result = result === undefined ? current : result + current);
                    }
                    return result;
                }
                /**
	   * The base implementation of `_.times` without support for iteratee shorthands
	   * or max array length checks.
	   *
	   * @private
	   * @param {number} n The number of times to invoke `iteratee`.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array} Returns the array of results.
	   */
                function baseTimes(n, iteratee) {
                    for (var index = -1, result = Array(n); ++index < n; ) result[index] = iteratee(index);
                    return result;
                }
                /**
	   * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
	   * of key-value pairs for `object` corresponding to the property names of `props`.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @param {Array} props The property names to get values for.
	   * @returns {Object} Returns the key-value pairs.
	   */
                function baseToPairs(object, props) {
                    return arrayMap(props, function(key) {
                        return [ key, object[key] ];
                    });
                }
                /**
	   * The base implementation of `_.unary` without support for storing metadata.
	   *
	   * @private
	   * @param {Function} func The function to cap arguments for.
	   * @returns {Function} Returns the new capped function.
	   */
                function baseUnary(func) {
                    return function(value) {
                        return func(value);
                    };
                }
                /**
	   * The base implementation of `_.values` and `_.valuesIn` which creates an
	   * array of `object` property values corresponding to the property names
	   * of `props`.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @param {Array} props The property names to get values for.
	   * @returns {Object} Returns the array of property values.
	   */
                function baseValues(object, props) {
                    return arrayMap(props, function(key) {
                        return object[key];
                    });
                }
                /**
	   * Checks if a `cache` value for `key` exists.
	   *
	   * @private
	   * @param {Object} cache The cache to query.
	   * @param {string} key The key of the entry to check.
	   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	   */
                function cacheHas(cache, key) {
                    return cache.has(key);
                }
                /**
	   * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
	   * that is not found in the character symbols.
	   *
	   * @private
	   * @param {Array} strSymbols The string symbols to inspect.
	   * @param {Array} chrSymbols The character symbols to find.
	   * @returns {number} Returns the index of the first unmatched string symbol.
	   */
                function charsStartIndex(strSymbols, chrSymbols) {
                    for (var index = -1, length = strSymbols.length; ++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1; ) ;
                    return index;
                }
                /**
	   * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
	   * that is not found in the character symbols.
	   *
	   * @private
	   * @param {Array} strSymbols The string symbols to inspect.
	   * @param {Array} chrSymbols The character symbols to find.
	   * @returns {number} Returns the index of the last unmatched string symbol.
	   */
                function charsEndIndex(strSymbols, chrSymbols) {
                    for (var index = strSymbols.length; index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1; ) ;
                    return index;
                }
                /**
	   * Gets the number of `placeholder` occurrences in `array`.
	   *
	   * @private
	   * @param {Array} array The array to inspect.
	   * @param {*} placeholder The placeholder to search for.
	   * @returns {number} Returns the placeholder count.
	   */
                function countHolders(array, placeholder) {
                    for (var length = array.length, result = 0; length--; ) array[length] === placeholder && ++result;
                    return result;
                }
                /**
	   * Used by `_.template` to escape characters for inclusion in compiled string literals.
	   *
	   * @private
	   * @param {string} chr The matched character to escape.
	   * @returns {string} Returns the escaped character.
	   */
                function escapeStringChar(chr) {
                    return "\\" + stringEscapes[chr];
                }
                /**
	   * Gets the value at `key` of `object`.
	   *
	   * @private
	   * @param {Object} [object] The object to query.
	   * @param {string} key The key of the property to get.
	   * @returns {*} Returns the property value.
	   */
                function getValue(object, key) {
                    return null == object ? undefined : object[key];
                }
                /**
	   * Checks if `string` contains Unicode symbols.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @returns {boolean} Returns `true` if a symbol is found, else `false`.
	   */
                function hasUnicode(string) {
                    return reHasUnicode.test(string);
                }
                /**
	   * Checks if `string` contains a word composed of Unicode symbols.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @returns {boolean} Returns `true` if a word is found, else `false`.
	   */
                function hasUnicodeWord(string) {
                    return reHasUnicodeWord.test(string);
                }
                /**
	   * Converts `iterator` to an array.
	   *
	   * @private
	   * @param {Object} iterator The iterator to convert.
	   * @returns {Array} Returns the converted array.
	   */
                function iteratorToArray(iterator) {
                    for (var data, result = []; !(data = iterator.next()).done; ) result.push(data.value);
                    return result;
                }
                /**
	   * Converts `map` to its key-value pairs.
	   *
	   * @private
	   * @param {Object} map The map to convert.
	   * @returns {Array} Returns the key-value pairs.
	   */
                function mapToArray(map) {
                    var index = -1, result = Array(map.size);
                    return map.forEach(function(value, key) {
                        result[++index] = [ key, value ];
                    }), result;
                }
                /**
	   * Creates a unary function that invokes `func` with its argument transformed.
	   *
	   * @private
	   * @param {Function} func The function to wrap.
	   * @param {Function} transform The argument transform.
	   * @returns {Function} Returns the new function.
	   */
                function overArg(func, transform) {
                    return function(arg) {
                        return func(transform(arg));
                    };
                }
                /**
	   * Replaces all `placeholder` elements in `array` with an internal placeholder
	   * and returns an array of their indexes.
	   *
	   * @private
	   * @param {Array} array The array to modify.
	   * @param {*} placeholder The placeholder to replace.
	   * @returns {Array} Returns the new array of placeholder indexes.
	   */
                function replaceHolders(array, placeholder) {
                    for (var index = -1, length = array.length, resIndex = 0, result = []; ++index < length; ) {
                        var value = array[index];
                        value !== placeholder && value !== PLACEHOLDER || (array[index] = PLACEHOLDER, result[resIndex++] = index);
                    }
                    return result;
                }
                /**
	   * Converts `set` to an array of its values.
	   *
	   * @private
	   * @param {Object} set The set to convert.
	   * @returns {Array} Returns the values.
	   */
                function setToArray(set) {
                    var index = -1, result = Array(set.size);
                    return set.forEach(function(value) {
                        result[++index] = value;
                    }), result;
                }
                /**
	   * Converts `set` to its value-value pairs.
	   *
	   * @private
	   * @param {Object} set The set to convert.
	   * @returns {Array} Returns the value-value pairs.
	   */
                function setToPairs(set) {
                    var index = -1, result = Array(set.size);
                    return set.forEach(function(value) {
                        result[++index] = [ value, value ];
                    }), result;
                }
                /**
	   * A specialized version of `_.indexOf` which performs strict equality
	   * comparisons of values, i.e. `===`.
	   *
	   * @private
	   * @param {Array} array The array to inspect.
	   * @param {*} value The value to search for.
	   * @param {number} fromIndex The index to search from.
	   * @returns {number} Returns the index of the matched value, else `-1`.
	   */
                function strictIndexOf(array, value, fromIndex) {
                    for (var index = fromIndex - 1, length = array.length; ++index < length; ) if (array[index] === value) return index;
                    return -1;
                }
                /**
	   * A specialized version of `_.lastIndexOf` which performs strict equality
	   * comparisons of values, i.e. `===`.
	   *
	   * @private
	   * @param {Array} array The array to inspect.
	   * @param {*} value The value to search for.
	   * @param {number} fromIndex The index to search from.
	   * @returns {number} Returns the index of the matched value, else `-1`.
	   */
                function strictLastIndexOf(array, value, fromIndex) {
                    for (var index = fromIndex + 1; index--; ) if (array[index] === value) return index;
                    return index;
                }
                /**
	   * Gets the number of symbols in `string`.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @returns {number} Returns the string size.
	   */
                function stringSize(string) {
                    return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
                }
                /**
	   * Converts `string` to an array.
	   *
	   * @private
	   * @param {string} string The string to convert.
	   * @returns {Array} Returns the converted array.
	   */
                function stringToArray(string) {
                    return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
                }
                /**
	   * Gets the size of a Unicode `string`.
	   *
	   * @private
	   * @param {string} string The string inspect.
	   * @returns {number} Returns the string size.
	   */
                function unicodeSize(string) {
                    for (var result = reUnicode.lastIndex = 0; reUnicode.test(string); ) ++result;
                    return result;
                }
                /**
	   * Converts a Unicode `string` to an array.
	   *
	   * @private
	   * @param {string} string The string to convert.
	   * @returns {Array} Returns the converted array.
	   */
                function unicodeToArray(string) {
                    return string.match(reUnicode) || [];
                }
                /**
	   * Splits a Unicode `string` into an array of its words.
	   *
	   * @private
	   * @param {string} The string to inspect.
	   * @returns {Array} Returns the words of `string`.
	   */
                function unicodeWords(string) {
                    return string.match(reUnicodeWord) || [];
                }
                /** Used as a safe reference for `undefined` in pre-ES5 environments. */
                var undefined, VERSION = "4.17.4", LARGE_ARRAY_SIZE = 200, CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", HASH_UNDEFINED = "__lodash_hash_undefined__", MAX_MEMOIZE_SIZE = 500, PLACEHOLDER = "__lodash_placeholder__", CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4, COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2, WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512, DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...", HOT_COUNT = 800, HOT_SPAN = 16, LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3, INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 1.7976931348623157e308, NAN = NaN, MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1, wrapFlags = [ [ "ary", WRAP_ARY_FLAG ], [ "bind", WRAP_BIND_FLAG ], [ "bindKey", WRAP_BIND_KEY_FLAG ], [ "curry", WRAP_CURRY_FLAG ], [ "curryRight", WRAP_CURRY_RIGHT_FLAG ], [ "flip", WRAP_FLIP_FLAG ], [ "partial", WRAP_PARTIAL_FLAG ], [ "partialRight", WRAP_PARTIAL_RIGHT_FLAG ], [ "rearg", WRAP_REARG_FLAG ] ], argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]", arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]", reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g, reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source), reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g, reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, reLeadingDot = /^\./, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source), reTrim = /^\s+|\s+$/g, reTrimStart = /^\s+/, reTrimEnd = /\s+$/, reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /, reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, reEscapeChar = /\\(\\)?/g, reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, reFlags = /\w*$/, reIsBadHex = /^[-+]0x[0-9a-f]+$/i, reIsBinary = /^0b[01]+$/i, reIsHostCtor = /^\[object .+?Constructor\]$/, reIsOctal = /^0o[0-7]+$/i, reIsUint = /^(?:0|[1-9]\d*)$/, reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, reNoMatch = /($^)/, reUnescapedString = /['\n\r\u2028\u2029\\]/g, rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange, rsApos = "['’]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d", rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [ rsNonAstral, rsRegional, rsSurrPair ].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:(?:1st|2nd|3rd|(?![123])\\dth)\\b)", rsOrdUpper = "\\d*(?:(?:1ST|2ND|3RD|(?![123])\\dTH)\\b)", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [ rsDingbat, rsRegional, rsSurrPair ].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [ rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral ].join("|") + ")", reApos = RegExp(rsApos, "g"), reComboMark = RegExp(rsCombo, "g"), reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g"), reUnicodeWord = RegExp([ rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [ rsBreak, rsUpper, "$" ].join("|") + ")", rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [ rsBreak, rsUpper + rsMiscLower, "$" ].join("|") + ")", rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower, rsUpper + "+" + rsOptContrUpper, rsOrdUpper, rsOrdLower, rsDigits, rsEmoji ].join("|"), "g"), reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]"), reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, contextProps = [ "Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout" ], templateCounter = -1, typedArrayTags = {};
                typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = !0, 
                typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = !1;
                /** Used to identify `toStringTag` values supported by `_.clone`. */
                var cloneableTags = {};
                cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = !0, 
                cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = !1;
                /** Used to map Latin Unicode letters to basic Latin letters. */
                var deburredLetters = {
                    // Latin-1 Supplement block.
                    "À": "A",
                    "Á": "A",
                    "Â": "A",
                    "Ã": "A",
                    "Ä": "A",
                    "Å": "A",
                    "à": "a",
                    "á": "a",
                    "â": "a",
                    "ã": "a",
                    "ä": "a",
                    "å": "a",
                    "Ç": "C",
                    "ç": "c",
                    "Ð": "D",
                    "ð": "d",
                    "È": "E",
                    "É": "E",
                    "Ê": "E",
                    "Ë": "E",
                    "è": "e",
                    "é": "e",
                    "ê": "e",
                    "ë": "e",
                    "Ì": "I",
                    "Í": "I",
                    "Î": "I",
                    "Ï": "I",
                    "ì": "i",
                    "í": "i",
                    "î": "i",
                    "ï": "i",
                    "Ñ": "N",
                    "ñ": "n",
                    "Ò": "O",
                    "Ó": "O",
                    "Ô": "O",
                    "Õ": "O",
                    "Ö": "O",
                    "Ø": "O",
                    "ò": "o",
                    "ó": "o",
                    "ô": "o",
                    "õ": "o",
                    "ö": "o",
                    "ø": "o",
                    "Ù": "U",
                    "Ú": "U",
                    "Û": "U",
                    "Ü": "U",
                    "ù": "u",
                    "ú": "u",
                    "û": "u",
                    "ü": "u",
                    "Ý": "Y",
                    "ý": "y",
                    "ÿ": "y",
                    "Æ": "Ae",
                    "æ": "ae",
                    "Þ": "Th",
                    "þ": "th",
                    "ß": "ss",
                    // Latin Extended-A block.
                    "Ā": "A",
                    "Ă": "A",
                    "Ą": "A",
                    "ā": "a",
                    "ă": "a",
                    "ą": "a",
                    "Ć": "C",
                    "Ĉ": "C",
                    "Ċ": "C",
                    "Č": "C",
                    "ć": "c",
                    "ĉ": "c",
                    "ċ": "c",
                    "č": "c",
                    "Ď": "D",
                    "Đ": "D",
                    "ď": "d",
                    "đ": "d",
                    "Ē": "E",
                    "Ĕ": "E",
                    "Ė": "E",
                    "Ę": "E",
                    "Ě": "E",
                    "ē": "e",
                    "ĕ": "e",
                    "ė": "e",
                    "ę": "e",
                    "ě": "e",
                    "Ĝ": "G",
                    "Ğ": "G",
                    "Ġ": "G",
                    "Ģ": "G",
                    "ĝ": "g",
                    "ğ": "g",
                    "ġ": "g",
                    "ģ": "g",
                    "Ĥ": "H",
                    "Ħ": "H",
                    "ĥ": "h",
                    "ħ": "h",
                    "Ĩ": "I",
                    "Ī": "I",
                    "Ĭ": "I",
                    "Į": "I",
                    "İ": "I",
                    "ĩ": "i",
                    "ī": "i",
                    "ĭ": "i",
                    "į": "i",
                    "ı": "i",
                    "Ĵ": "J",
                    "ĵ": "j",
                    "Ķ": "K",
                    "ķ": "k",
                    "ĸ": "k",
                    "Ĺ": "L",
                    "Ļ": "L",
                    "Ľ": "L",
                    "Ŀ": "L",
                    "Ł": "L",
                    "ĺ": "l",
                    "ļ": "l",
                    "ľ": "l",
                    "ŀ": "l",
                    "ł": "l",
                    "Ń": "N",
                    "Ņ": "N",
                    "Ň": "N",
                    "Ŋ": "N",
                    "ń": "n",
                    "ņ": "n",
                    "ň": "n",
                    "ŋ": "n",
                    "Ō": "O",
                    "Ŏ": "O",
                    "Ő": "O",
                    "ō": "o",
                    "ŏ": "o",
                    "ő": "o",
                    "Ŕ": "R",
                    "Ŗ": "R",
                    "Ř": "R",
                    "ŕ": "r",
                    "ŗ": "r",
                    "ř": "r",
                    "Ś": "S",
                    "Ŝ": "S",
                    "Ş": "S",
                    "Š": "S",
                    "ś": "s",
                    "ŝ": "s",
                    "ş": "s",
                    "š": "s",
                    "Ţ": "T",
                    "Ť": "T",
                    "Ŧ": "T",
                    "ţ": "t",
                    "ť": "t",
                    "ŧ": "t",
                    "Ũ": "U",
                    "Ū": "U",
                    "Ŭ": "U",
                    "Ů": "U",
                    "Ű": "U",
                    "Ų": "U",
                    "ũ": "u",
                    "ū": "u",
                    "ŭ": "u",
                    "ů": "u",
                    "ű": "u",
                    "ų": "u",
                    "Ŵ": "W",
                    "ŵ": "w",
                    "Ŷ": "Y",
                    "ŷ": "y",
                    "Ÿ": "Y",
                    "Ź": "Z",
                    "Ż": "Z",
                    "Ž": "Z",
                    "ź": "z",
                    "ż": "z",
                    "ž": "z",
                    "Ĳ": "IJ",
                    "ĳ": "ij",
                    "Œ": "Oe",
                    "œ": "oe",
                    "ŉ": "'n",
                    "ſ": "s"
                }, htmlEscapes = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;"
                }, htmlUnescapes = {
                    "&amp;": "&",
                    "&lt;": "<",
                    "&gt;": ">",
                    "&quot;": '"',
                    "&#39;": "'"
                }, stringEscapes = {
                    "\\": "\\",
                    "'": "'",
                    "\n": "n",
                    "\r": "r",
                    "\u2028": "u2028",
                    "\u2029": "u2029"
                }, freeParseFloat = parseFloat, freeParseInt = parseInt, freeGlobal = "object" == typeof global && global && global.Object === Object && global, freeSelf = "object" == typeof self && self && self.Object === Object && self, root = freeGlobal || freeSelf || Function("return this")(), freeExports = "object" == typeof exports && exports && !exports.nodeType && exports, freeModule = freeExports && "object" == typeof module && module && !module.nodeType && module, moduleExports = freeModule && freeModule.exports === freeExports, freeProcess = moduleExports && freeGlobal.process, nodeUtil = function() {
                    try {
                        return freeProcess && freeProcess.binding && freeProcess.binding("util");
                    } catch (e) {}
                }(), nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray, asciiSize = baseProperty("length"), deburrLetter = basePropertyOf(deburredLetters), escapeHtmlChar = basePropertyOf(htmlEscapes), unescapeHtmlChar = basePropertyOf(htmlUnescapes), runInContext = function runInContext(context) {
                    /*------------------------------------------------------------------------*/
                    /**
	     * Creates a `lodash` object which wraps `value` to enable implicit method
	     * chain sequences. Methods that operate on and return arrays, collections,
	     * and functions can be chained together. Methods that retrieve a single value
	     * or may return a primitive value will automatically end the chain sequence
	     * and return the unwrapped value. Otherwise, the value must be unwrapped
	     * with `_#value`.
	     *
	     * Explicit chain sequences, which must be unwrapped with `_#value`, may be
	     * enabled using `_.chain`.
	     *
	     * The execution of chained methods is lazy, that is, it's deferred until
	     * `_#value` is implicitly or explicitly called.
	     *
	     * Lazy evaluation allows several methods to support shortcut fusion.
	     * Shortcut fusion is an optimization to merge iteratee calls; this avoids
	     * the creation of intermediate arrays and can greatly reduce the number of
	     * iteratee executions. Sections of a chain sequence qualify for shortcut
	     * fusion if the section is applied to an array and iteratees accept only
	     * one argument. The heuristic for whether a section qualifies for shortcut
	     * fusion is subject to change.
	     *
	     * Chaining is supported in custom builds as long as the `_#value` method is
	     * directly or indirectly included in the build.
	     *
	     * In addition to lodash methods, wrappers have `Array` and `String` methods.
	     *
	     * The wrapper `Array` methods are:
	     * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
	     *
	     * The wrapper `String` methods are:
	     * `replace` and `split`
	     *
	     * The wrapper methods that support shortcut fusion are:
	     * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
	     * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
	     * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
	     *
	     * The chainable wrapper methods are:
	     * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
	     * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
	     * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
	     * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
	     * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
	     * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
	     * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
	     * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
	     * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
	     * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
	     * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
	     * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
	     * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
	     * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
	     * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
	     * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
	     * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
	     * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
	     * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
	     * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
	     * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
	     * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
	     * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
	     * `zipObject`, `zipObjectDeep`, and `zipWith`
	     *
	     * The wrapper methods that are **not** chainable by default are:
	     * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
	     * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
	     * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
	     * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
	     * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
	     * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
	     * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
	     * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
	     * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
	     * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
	     * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
	     * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
	     * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
	     * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
	     * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
	     * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
	     * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
	     * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
	     * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
	     * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
	     * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
	     * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
	     * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
	     * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
	     * `upperFirst`, `value`, and `words`
	     *
	     * @name _
	     * @constructor
	     * @category Seq
	     * @param {*} value The value to wrap in a `lodash` instance.
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * function square(n) {
	     *   return n * n;
	     * }
	     *
	     * var wrapped = _([1, 2, 3]);
	     *
	     * // Returns an unwrapped value.
	     * wrapped.reduce(_.add);
	     * // => 6
	     *
	     * // Returns a wrapped value.
	     * var squares = wrapped.map(square);
	     *
	     * _.isArray(squares);
	     * // => false
	     *
	     * _.isArray(squares.value());
	     * // => true
	     */
                    function lodash(value) {
                        if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
                            if (value instanceof LodashWrapper) return value;
                            if (hasOwnProperty.call(value, "__wrapped__")) return wrapperClone(value);
                        }
                        return new LodashWrapper(value);
                    }
                    /**
	     * The function whose prototype chain sequence wrappers inherit from.
	     *
	     * @private
	     */
                    function baseLodash() {}
                    /**
	     * The base constructor for creating `lodash` wrapper objects.
	     *
	     * @private
	     * @param {*} value The value to wrap.
	     * @param {boolean} [chainAll] Enable explicit method chain sequences.
	     */
                    function LodashWrapper(value, chainAll) {
                        this.__wrapped__ = value, this.__actions__ = [], this.__chain__ = !!chainAll, this.__index__ = 0, 
                        this.__values__ = undefined;
                    }
                    /*------------------------------------------------------------------------*/
                    /**
	     * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
	     *
	     * @private
	     * @constructor
	     * @param {*} value The value to wrap.
	     */
                    function LazyWrapper(value) {
                        this.__wrapped__ = value, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, 
                        this.__iteratees__ = [], this.__takeCount__ = MAX_ARRAY_LENGTH, this.__views__ = [];
                    }
                    /**
	     * Creates a clone of the lazy wrapper object.
	     *
	     * @private
	     * @name clone
	     * @memberOf LazyWrapper
	     * @returns {Object} Returns the cloned `LazyWrapper` object.
	     */
                    function lazyClone() {
                        var result = new LazyWrapper(this.__wrapped__);
                        return result.__actions__ = copyArray(this.__actions__), result.__dir__ = this.__dir__, 
                        result.__filtered__ = this.__filtered__, result.__iteratees__ = copyArray(this.__iteratees__), 
                        result.__takeCount__ = this.__takeCount__, result.__views__ = copyArray(this.__views__), 
                        result;
                    }
                    /**
	     * Reverses the direction of lazy iteration.
	     *
	     * @private
	     * @name reverse
	     * @memberOf LazyWrapper
	     * @returns {Object} Returns the new reversed `LazyWrapper` object.
	     */
                    function lazyReverse() {
                        if (this.__filtered__) {
                            var result = new LazyWrapper(this);
                            result.__dir__ = -1, result.__filtered__ = !0;
                        } else result = this.clone(), result.__dir__ *= -1;
                        return result;
                    }
                    /**
	     * Extracts the unwrapped value from its lazy wrapper.
	     *
	     * @private
	     * @name value
	     * @memberOf LazyWrapper
	     * @returns {*} Returns the unwrapped value.
	     */
                    function lazyValue() {
                        var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
                        if (!isArr || !isRight && arrLength == length && takeCount == length) return baseWrapperValue(array, this.__actions__);
                        var result = [];
                        outer: for (;length-- && resIndex < takeCount; ) {
                            index += dir;
                            for (var iterIndex = -1, value = array[index]; ++iterIndex < iterLength; ) {
                                var data = iteratees[iterIndex], iteratee = data.iteratee, type = data.type, computed = iteratee(value);
                                if (type == LAZY_MAP_FLAG) value = computed; else if (!computed) {
                                    if (type == LAZY_FILTER_FLAG) continue outer;
                                    break outer;
                                }
                            }
                            result[resIndex++] = value;
                        }
                        return result;
                    }
                    /*------------------------------------------------------------------------*/
                    /**
	     * Creates a hash object.
	     *
	     * @private
	     * @constructor
	     * @param {Array} [entries] The key-value pairs to cache.
	     */
                    function Hash(entries) {
                        var index = -1, length = null == entries ? 0 : entries.length;
                        for (this.clear(); ++index < length; ) {
                            var entry = entries[index];
                            this.set(entry[0], entry[1]);
                        }
                    }
                    /**
	     * Removes all key-value entries from the hash.
	     *
	     * @private
	     * @name clear
	     * @memberOf Hash
	     */
                    function hashClear() {
                        this.__data__ = nativeCreate ? nativeCreate(null) : {}, this.size = 0;
                    }
                    /**
	     * Removes `key` and its value from the hash.
	     *
	     * @private
	     * @name delete
	     * @memberOf Hash
	     * @param {Object} hash The hash to modify.
	     * @param {string} key The key of the value to remove.
	     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	     */
                    function hashDelete(key) {
                        var result = this.has(key) && delete this.__data__[key];
                        return this.size -= result ? 1 : 0, result;
                    }
                    /**
	     * Gets the hash value for `key`.
	     *
	     * @private
	     * @name get
	     * @memberOf Hash
	     * @param {string} key The key of the value to get.
	     * @returns {*} Returns the entry value.
	     */
                    function hashGet(key) {
                        var data = this.__data__;
                        if (nativeCreate) {
                            var result = data[key];
                            return result === HASH_UNDEFINED ? undefined : result;
                        }
                        return hasOwnProperty.call(data, key) ? data[key] : undefined;
                    }
                    /**
	     * Checks if a hash value for `key` exists.
	     *
	     * @private
	     * @name has
	     * @memberOf Hash
	     * @param {string} key The key of the entry to check.
	     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	     */
                    function hashHas(key) {
                        var data = this.__data__;
                        return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
                    }
                    /**
	     * Sets the hash `key` to `value`.
	     *
	     * @private
	     * @name set
	     * @memberOf Hash
	     * @param {string} key The key of the value to set.
	     * @param {*} value The value to set.
	     * @returns {Object} Returns the hash instance.
	     */
                    function hashSet(key, value) {
                        var data = this.__data__;
                        return this.size += this.has(key) ? 0 : 1, data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value, 
                        this;
                    }
                    /*------------------------------------------------------------------------*/
                    /**
	     * Creates an list cache object.
	     *
	     * @private
	     * @constructor
	     * @param {Array} [entries] The key-value pairs to cache.
	     */
                    function ListCache(entries) {
                        var index = -1, length = null == entries ? 0 : entries.length;
                        for (this.clear(); ++index < length; ) {
                            var entry = entries[index];
                            this.set(entry[0], entry[1]);
                        }
                    }
                    /**
	     * Removes all key-value entries from the list cache.
	     *
	     * @private
	     * @name clear
	     * @memberOf ListCache
	     */
                    function listCacheClear() {
                        this.__data__ = [], this.size = 0;
                    }
                    /**
	     * Removes `key` and its value from the list cache.
	     *
	     * @private
	     * @name delete
	     * @memberOf ListCache
	     * @param {string} key The key of the value to remove.
	     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	     */
                    function listCacheDelete(key) {
                        var data = this.__data__, index = assocIndexOf(data, key);
                        if (index < 0) return !1;
                        var lastIndex = data.length - 1;
                        return index == lastIndex ? data.pop() : splice.call(data, index, 1), --this.size, 
                        !0;
                    }
                    /**
	     * Gets the list cache value for `key`.
	     *
	     * @private
	     * @name get
	     * @memberOf ListCache
	     * @param {string} key The key of the value to get.
	     * @returns {*} Returns the entry value.
	     */
                    function listCacheGet(key) {
                        var data = this.__data__, index = assocIndexOf(data, key);
                        return index < 0 ? undefined : data[index][1];
                    }
                    /**
	     * Checks if a list cache value for `key` exists.
	     *
	     * @private
	     * @name has
	     * @memberOf ListCache
	     * @param {string} key The key of the entry to check.
	     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	     */
                    function listCacheHas(key) {
                        return assocIndexOf(this.__data__, key) > -1;
                    }
                    /**
	     * Sets the list cache `key` to `value`.
	     *
	     * @private
	     * @name set
	     * @memberOf ListCache
	     * @param {string} key The key of the value to set.
	     * @param {*} value The value to set.
	     * @returns {Object} Returns the list cache instance.
	     */
                    function listCacheSet(key, value) {
                        var data = this.__data__, index = assocIndexOf(data, key);
                        return index < 0 ? (++this.size, data.push([ key, value ])) : data[index][1] = value, 
                        this;
                    }
                    /*------------------------------------------------------------------------*/
                    /**
	     * Creates a map cache object to store key-value pairs.
	     *
	     * @private
	     * @constructor
	     * @param {Array} [entries] The key-value pairs to cache.
	     */
                    function MapCache(entries) {
                        var index = -1, length = null == entries ? 0 : entries.length;
                        for (this.clear(); ++index < length; ) {
                            var entry = entries[index];
                            this.set(entry[0], entry[1]);
                        }
                    }
                    /**
	     * Removes all key-value entries from the map.
	     *
	     * @private
	     * @name clear
	     * @memberOf MapCache
	     */
                    function mapCacheClear() {
                        this.size = 0, this.__data__ = {
                            hash: new Hash(),
                            map: new (Map || ListCache)(),
                            string: new Hash()
                        };
                    }
                    /**
	     * Removes `key` and its value from the map.
	     *
	     * @private
	     * @name delete
	     * @memberOf MapCache
	     * @param {string} key The key of the value to remove.
	     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	     */
                    function mapCacheDelete(key) {
                        var result = getMapData(this, key).delete(key);
                        return this.size -= result ? 1 : 0, result;
                    }
                    /**
	     * Gets the map value for `key`.
	     *
	     * @private
	     * @name get
	     * @memberOf MapCache
	     * @param {string} key The key of the value to get.
	     * @returns {*} Returns the entry value.
	     */
                    function mapCacheGet(key) {
                        return getMapData(this, key).get(key);
                    }
                    /**
	     * Checks if a map value for `key` exists.
	     *
	     * @private
	     * @name has
	     * @memberOf MapCache
	     * @param {string} key The key of the entry to check.
	     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	     */
                    function mapCacheHas(key) {
                        return getMapData(this, key).has(key);
                    }
                    /**
	     * Sets the map `key` to `value`.
	     *
	     * @private
	     * @name set
	     * @memberOf MapCache
	     * @param {string} key The key of the value to set.
	     * @param {*} value The value to set.
	     * @returns {Object} Returns the map cache instance.
	     */
                    function mapCacheSet(key, value) {
                        var data = getMapData(this, key), size = data.size;
                        return data.set(key, value), this.size += data.size == size ? 0 : 1, this;
                    }
                    /*------------------------------------------------------------------------*/
                    /**
	     *
	     * Creates an array cache object to store unique values.
	     *
	     * @private
	     * @constructor
	     * @param {Array} [values] The values to cache.
	     */
                    function SetCache(values) {
                        var index = -1, length = null == values ? 0 : values.length;
                        for (this.__data__ = new MapCache(); ++index < length; ) this.add(values[index]);
                    }
                    /**
	     * Adds `value` to the array cache.
	     *
	     * @private
	     * @name add
	     * @memberOf SetCache
	     * @alias push
	     * @param {*} value The value to cache.
	     * @returns {Object} Returns the cache instance.
	     */
                    function setCacheAdd(value) {
                        return this.__data__.set(value, HASH_UNDEFINED), this;
                    }
                    /**
	     * Checks if `value` is in the array cache.
	     *
	     * @private
	     * @name has
	     * @memberOf SetCache
	     * @param {*} value The value to search for.
	     * @returns {number} Returns `true` if `value` is found, else `false`.
	     */
                    function setCacheHas(value) {
                        return this.__data__.has(value);
                    }
                    /*------------------------------------------------------------------------*/
                    /**
	     * Creates a stack cache object to store key-value pairs.
	     *
	     * @private
	     * @constructor
	     * @param {Array} [entries] The key-value pairs to cache.
	     */
                    function Stack(entries) {
                        var data = this.__data__ = new ListCache(entries);
                        this.size = data.size;
                    }
                    /**
	     * Removes all key-value entries from the stack.
	     *
	     * @private
	     * @name clear
	     * @memberOf Stack
	     */
                    function stackClear() {
                        this.__data__ = new ListCache(), this.size = 0;
                    }
                    /**
	     * Removes `key` and its value from the stack.
	     *
	     * @private
	     * @name delete
	     * @memberOf Stack
	     * @param {string} key The key of the value to remove.
	     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	     */
                    function stackDelete(key) {
                        var data = this.__data__, result = data.delete(key);
                        return this.size = data.size, result;
                    }
                    /**
	     * Gets the stack value for `key`.
	     *
	     * @private
	     * @name get
	     * @memberOf Stack
	     * @param {string} key The key of the value to get.
	     * @returns {*} Returns the entry value.
	     */
                    function stackGet(key) {
                        return this.__data__.get(key);
                    }
                    /**
	     * Checks if a stack value for `key` exists.
	     *
	     * @private
	     * @name has
	     * @memberOf Stack
	     * @param {string} key The key of the entry to check.
	     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	     */
                    function stackHas(key) {
                        return this.__data__.has(key);
                    }
                    /**
	     * Sets the stack `key` to `value`.
	     *
	     * @private
	     * @name set
	     * @memberOf Stack
	     * @param {string} key The key of the value to set.
	     * @param {*} value The value to set.
	     * @returns {Object} Returns the stack cache instance.
	     */
                    function stackSet(key, value) {
                        var data = this.__data__;
                        if (data instanceof ListCache) {
                            var pairs = data.__data__;
                            if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) return pairs.push([ key, value ]), 
                            this.size = ++data.size, this;
                            data = this.__data__ = new MapCache(pairs);
                        }
                        return data.set(key, value), this.size = data.size, this;
                    }
                    /*------------------------------------------------------------------------*/
                    /**
	     * Creates an array of the enumerable property names of the array-like `value`.
	     *
	     * @private
	     * @param {*} value The value to query.
	     * @param {boolean} inherited Specify returning inherited property names.
	     * @returns {Array} Returns the array of property names.
	     */
                    function arrayLikeKeys(value, inherited) {
                        var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
                        for (var key in value) !inherited && !hasOwnProperty.call(value, key) || skipIndexes && (// Safari 9 has enumerable `arguments.length` in strict mode.
                        "length" == key || // Node.js 0.10 has enumerable non-index properties on buffers.
                        isBuff && ("offset" == key || "parent" == key) || // PhantomJS 2 has enumerable non-index properties on typed arrays.
                        isType && ("buffer" == key || "byteLength" == key || "byteOffset" == key) || // Skip index properties.
                        isIndex(key, length)) || result.push(key);
                        return result;
                    }
                    /**
	     * A specialized version of `_.sample` for arrays.
	     *
	     * @private
	     * @param {Array} array The array to sample.
	     * @returns {*} Returns the random element.
	     */
                    function arraySample(array) {
                        var length = array.length;
                        return length ? array[baseRandom(0, length - 1)] : undefined;
                    }
                    /**
	     * A specialized version of `_.sampleSize` for arrays.
	     *
	     * @private
	     * @param {Array} array The array to sample.
	     * @param {number} n The number of elements to sample.
	     * @returns {Array} Returns the random elements.
	     */
                    function arraySampleSize(array, n) {
                        return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
                    }
                    /**
	     * A specialized version of `_.shuffle` for arrays.
	     *
	     * @private
	     * @param {Array} array The array to shuffle.
	     * @returns {Array} Returns the new shuffled array.
	     */
                    function arrayShuffle(array) {
                        return shuffleSelf(copyArray(array));
                    }
                    /**
	     * This function is like `assignValue` except that it doesn't assign
	     * `undefined` values.
	     *
	     * @private
	     * @param {Object} object The object to modify.
	     * @param {string} key The key of the property to assign.
	     * @param {*} value The value to assign.
	     */
                    function assignMergeValue(object, key, value) {
                        (value === undefined || eq(object[key], value)) && (value !== undefined || key in object) || baseAssignValue(object, key, value);
                    }
                    /**
	     * Assigns `value` to `key` of `object` if the existing value is not equivalent
	     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	     * for equality comparisons.
	     *
	     * @private
	     * @param {Object} object The object to modify.
	     * @param {string} key The key of the property to assign.
	     * @param {*} value The value to assign.
	     */
                    function assignValue(object, key, value) {
                        var objValue = object[key];
                        hasOwnProperty.call(object, key) && eq(objValue, value) && (value !== undefined || key in object) || baseAssignValue(object, key, value);
                    }
                    /**
	     * Gets the index at which the `key` is found in `array` of key-value pairs.
	     *
	     * @private
	     * @param {Array} array The array to inspect.
	     * @param {*} key The key to search for.
	     * @returns {number} Returns the index of the matched value, else `-1`.
	     */
                    function assocIndexOf(array, key) {
                        for (var length = array.length; length--; ) if (eq(array[length][0], key)) return length;
                        return -1;
                    }
                    /**
	     * Aggregates elements of `collection` on `accumulator` with keys transformed
	     * by `iteratee` and values set by `setter`.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} setter The function to set `accumulator` values.
	     * @param {Function} iteratee The iteratee to transform keys.
	     * @param {Object} accumulator The initial aggregated object.
	     * @returns {Function} Returns `accumulator`.
	     */
                    function baseAggregator(collection, setter, iteratee, accumulator) {
                        return baseEach(collection, function(value, key, collection) {
                            setter(accumulator, value, iteratee(value), collection);
                        }), accumulator;
                    }
                    /**
	     * The base implementation of `_.assign` without support for multiple sources
	     * or `customizer` functions.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @returns {Object} Returns `object`.
	     */
                    function baseAssign(object, source) {
                        return object && copyObject(source, keys(source), object);
                    }
                    /**
	     * The base implementation of `_.assignIn` without support for multiple sources
	     * or `customizer` functions.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @returns {Object} Returns `object`.
	     */
                    function baseAssignIn(object, source) {
                        return object && copyObject(source, keysIn(source), object);
                    }
                    /**
	     * The base implementation of `assignValue` and `assignMergeValue` without
	     * value checks.
	     *
	     * @private
	     * @param {Object} object The object to modify.
	     * @param {string} key The key of the property to assign.
	     * @param {*} value The value to assign.
	     */
                    function baseAssignValue(object, key, value) {
                        "__proto__" == key && defineProperty ? defineProperty(object, key, {
                            configurable: !0,
                            enumerable: !0,
                            value: value,
                            writable: !0
                        }) : object[key] = value;
                    }
                    /**
	     * The base implementation of `_.at` without support for individual paths.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {string[]} paths The property paths to pick.
	     * @returns {Array} Returns the picked elements.
	     */
                    function baseAt(object, paths) {
                        for (var index = -1, length = paths.length, result = Array(length), skip = null == object; ++index < length; ) result[index] = skip ? undefined : get(object, paths[index]);
                        return result;
                    }
                    /**
	     * The base implementation of `_.clamp` which doesn't coerce arguments.
	     *
	     * @private
	     * @param {number} number The number to clamp.
	     * @param {number} [lower] The lower bound.
	     * @param {number} upper The upper bound.
	     * @returns {number} Returns the clamped number.
	     */
                    function baseClamp(number, lower, upper) {
                        return number === number && (upper !== undefined && (number = number <= upper ? number : upper), 
                        lower !== undefined && (number = number >= lower ? number : lower)), number;
                    }
                    /**
	     * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	     * traversed objects.
	     *
	     * @private
	     * @param {*} value The value to clone.
	     * @param {boolean} bitmask The bitmask flags.
	     *  1 - Deep clone
	     *  2 - Flatten inherited properties
	     *  4 - Clone symbols
	     * @param {Function} [customizer] The function to customize cloning.
	     * @param {string} [key] The key of `value`.
	     * @param {Object} [object] The parent object of `value`.
	     * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	     * @returns {*} Returns the cloned value.
	     */
                    function baseClone(value, bitmask, customizer, key, object, stack) {
                        var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
                        if (customizer && (result = object ? customizer(value, key, object, stack) : customizer(value)), 
                        result !== undefined) return result;
                        if (!isObject(value)) return value;
                        var isArr = isArray(value);
                        if (isArr) {
                            if (result = initCloneArray(value), !isDeep) return copyArray(value, result);
                        } else {
                            var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
                            if (isBuffer(value)) return cloneBuffer(value, isDeep);
                            if (tag == objectTag || tag == argsTag || isFunc && !object) {
                                if (result = isFlat || isFunc ? {} : initCloneObject(value), !isDeep) return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
                            } else {
                                if (!cloneableTags[tag]) return object ? value : {};
                                result = initCloneByTag(value, tag, baseClone, isDeep);
                            }
                        }
                        // Check for circular references and return its corresponding clone.
                        stack || (stack = new Stack());
                        var stacked = stack.get(value);
                        if (stacked) return stacked;
                        stack.set(value, result);
                        var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys, props = isArr ? undefined : keysFunc(value);
                        return arrayEach(props || value, function(subValue, key) {
                            props && (key = subValue, subValue = value[key]), // Recursively populate clone (susceptible to call stack limits).
                            assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
                        }), result;
                    }
                    /**
	     * The base implementation of `_.conforms` which doesn't clone `source`.
	     *
	     * @private
	     * @param {Object} source The object of property predicates to conform to.
	     * @returns {Function} Returns the new spec function.
	     */
                    function baseConforms(source) {
                        var props = keys(source);
                        return function(object) {
                            return baseConformsTo(object, source, props);
                        };
                    }
                    /**
	     * The base implementation of `_.conformsTo` which accepts `props` to check.
	     *
	     * @private
	     * @param {Object} object The object to inspect.
	     * @param {Object} source The object of property predicates to conform to.
	     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
	     */
                    function baseConformsTo(object, source, props) {
                        var length = props.length;
                        if (null == object) return !length;
                        for (object = Object(object); length--; ) {
                            var key = props[length], predicate = source[key], value = object[key];
                            if (value === undefined && !(key in object) || !predicate(value)) return !1;
                        }
                        return !0;
                    }
                    /**
	     * The base implementation of `_.delay` and `_.defer` which accepts `args`
	     * to provide to `func`.
	     *
	     * @private
	     * @param {Function} func The function to delay.
	     * @param {number} wait The number of milliseconds to delay invocation.
	     * @param {Array} args The arguments to provide to `func`.
	     * @returns {number|Object} Returns the timer id or timeout object.
	     */
                    function baseDelay(func, wait, args) {
                        if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
                        return setTimeout(function() {
                            func.apply(undefined, args);
                        }, wait);
                    }
                    /**
	     * The base implementation of methods like `_.difference` without support
	     * for excluding multiple arrays or iteratee shorthands.
	     *
	     * @private
	     * @param {Array} array The array to inspect.
	     * @param {Array} values The values to exclude.
	     * @param {Function} [iteratee] The iteratee invoked per element.
	     * @param {Function} [comparator] The comparator invoked per element.
	     * @returns {Array} Returns the new array of filtered values.
	     */
                    function baseDifference(array, values, iteratee, comparator) {
                        var index = -1, includes = arrayIncludes, isCommon = !0, length = array.length, result = [], valuesLength = values.length;
                        if (!length) return result;
                        iteratee && (values = arrayMap(values, baseUnary(iteratee))), comparator ? (includes = arrayIncludesWith, 
                        isCommon = !1) : values.length >= LARGE_ARRAY_SIZE && (includes = cacheHas, isCommon = !1, 
                        values = new SetCache(values));
                        outer: for (;++index < length; ) {
                            var value = array[index], computed = null == iteratee ? value : iteratee(value);
                            if (value = comparator || 0 !== value ? value : 0, isCommon && computed === computed) {
                                for (var valuesIndex = valuesLength; valuesIndex--; ) if (values[valuesIndex] === computed) continue outer;
                                result.push(value);
                            } else includes(values, computed, comparator) || result.push(value);
                        }
                        return result;
                    }
                    /**
	     * The base implementation of `_.every` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {boolean} Returns `true` if all elements pass the predicate check,
	     *  else `false`
	     */
                    function baseEvery(collection, predicate) {
                        var result = !0;
                        return baseEach(collection, function(value, index, collection) {
                            return result = !!predicate(value, index, collection);
                        }), result;
                    }
                    /**
	     * The base implementation of methods like `_.max` and `_.min` which accepts a
	     * `comparator` to determine the extremum value.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The iteratee invoked per iteration.
	     * @param {Function} comparator The comparator used to compare values.
	     * @returns {*} Returns the extremum value.
	     */
                    function baseExtremum(array, iteratee, comparator) {
                        for (var index = -1, length = array.length; ++index < length; ) {
                            var value = array[index], current = iteratee(value);
                            if (null != current && (computed === undefined ? current === current && !isSymbol(current) : comparator(current, computed))) var computed = current, result = value;
                        }
                        return result;
                    }
                    /**
	     * The base implementation of `_.fill` without an iteratee call guard.
	     *
	     * @private
	     * @param {Array} array The array to fill.
	     * @param {*} value The value to fill `array` with.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns `array`.
	     */
                    function baseFill(array, value, start, end) {
                        var length = array.length;
                        for (start = toInteger(start), start < 0 && (start = -start > length ? 0 : length + start), 
                        end = end === undefined || end > length ? length : toInteger(end), end < 0 && (end += length), 
                        end = start > end ? 0 : toLength(end); start < end; ) array[start++] = value;
                        return array;
                    }
                    /**
	     * The base implementation of `_.filter` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {Array} Returns the new filtered array.
	     */
                    function baseFilter(collection, predicate) {
                        var result = [];
                        return baseEach(collection, function(value, index, collection) {
                            predicate(value, index, collection) && result.push(value);
                        }), result;
                    }
                    /**
	     * The base implementation of `_.flatten` with support for restricting flattening.
	     *
	     * @private
	     * @param {Array} array The array to flatten.
	     * @param {number} depth The maximum recursion depth.
	     * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	     * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	     * @param {Array} [result=[]] The initial result value.
	     * @returns {Array} Returns the new flattened array.
	     */
                    function baseFlatten(array, depth, predicate, isStrict, result) {
                        var index = -1, length = array.length;
                        for (predicate || (predicate = isFlattenable), result || (result = []); ++index < length; ) {
                            var value = array[index];
                            depth > 0 && predicate(value) ? depth > 1 ? // Recursively flatten arrays (susceptible to call stack limits).
                            baseFlatten(value, depth - 1, predicate, isStrict, result) : arrayPush(result, value) : isStrict || (result[result.length] = value);
                        }
                        return result;
                    }
                    /**
	     * The base implementation of `_.forOwn` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     */
                    function baseForOwn(object, iteratee) {
                        return object && baseFor(object, iteratee, keys);
                    }
                    /**
	     * The base implementation of `_.forOwnRight` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     */
                    function baseForOwnRight(object, iteratee) {
                        return object && baseForRight(object, iteratee, keys);
                    }
                    /**
	     * The base implementation of `_.functions` which creates an array of
	     * `object` function property names filtered from `props`.
	     *
	     * @private
	     * @param {Object} object The object to inspect.
	     * @param {Array} props The property names to filter.
	     * @returns {Array} Returns the function names.
	     */
                    function baseFunctions(object, props) {
                        return arrayFilter(props, function(key) {
                            return isFunction(object[key]);
                        });
                    }
                    /**
	     * The base implementation of `_.get` without support for default values.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the property to get.
	     * @returns {*} Returns the resolved value.
	     */
                    function baseGet(object, path) {
                        path = castPath(path, object);
                        for (var index = 0, length = path.length; null != object && index < length; ) object = object[toKey(path[index++])];
                        return index && index == length ? object : undefined;
                    }
                    /**
	     * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	     * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	     * symbols of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Function} keysFunc The function to get the keys of `object`.
	     * @param {Function} symbolsFunc The function to get the symbols of `object`.
	     * @returns {Array} Returns the array of property names and symbols.
	     */
                    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
                        var result = keysFunc(object);
                        return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
                    }
                    /**
	     * The base implementation of `getTag` without fallbacks for buggy environments.
	     *
	     * @private
	     * @param {*} value The value to query.
	     * @returns {string} Returns the `toStringTag`.
	     */
                    function baseGetTag(value) {
                        return null == value ? value === undefined ? undefinedTag : nullTag : symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
                    }
                    /**
	     * The base implementation of `_.gt` which doesn't coerce arguments.
	     *
	     * @private
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is greater than `other`,
	     *  else `false`.
	     */
                    function baseGt(value, other) {
                        return value > other;
                    }
                    /**
	     * The base implementation of `_.has` without support for deep paths.
	     *
	     * @private
	     * @param {Object} [object] The object to query.
	     * @param {Array|string} key The key to check.
	     * @returns {boolean} Returns `true` if `key` exists, else `false`.
	     */
                    function baseHas(object, key) {
                        return null != object && hasOwnProperty.call(object, key);
                    }
                    /**
	     * The base implementation of `_.hasIn` without support for deep paths.
	     *
	     * @private
	     * @param {Object} [object] The object to query.
	     * @param {Array|string} key The key to check.
	     * @returns {boolean} Returns `true` if `key` exists, else `false`.
	     */
                    function baseHasIn(object, key) {
                        return null != object && key in Object(object);
                    }
                    /**
	     * The base implementation of `_.inRange` which doesn't coerce arguments.
	     *
	     * @private
	     * @param {number} number The number to check.
	     * @param {number} start The start of the range.
	     * @param {number} end The end of the range.
	     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
	     */
                    function baseInRange(number, start, end) {
                        return number >= nativeMin(start, end) && number < nativeMax(start, end);
                    }
                    /**
	     * The base implementation of methods like `_.intersection`, without support
	     * for iteratee shorthands, that accepts an array of arrays to inspect.
	     *
	     * @private
	     * @param {Array} arrays The arrays to inspect.
	     * @param {Function} [iteratee] The iteratee invoked per element.
	     * @param {Function} [comparator] The comparator invoked per element.
	     * @returns {Array} Returns the new array of shared values.
	     */
                    function baseIntersection(arrays, iteratee, comparator) {
                        for (var includes = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array(othLength), maxLength = 1 / 0, result = []; othIndex--; ) {
                            var array = arrays[othIndex];
                            othIndex && iteratee && (array = arrayMap(array, baseUnary(iteratee))), maxLength = nativeMin(array.length, maxLength), 
                            caches[othIndex] = !comparator && (iteratee || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined;
                        }
                        array = arrays[0];
                        var index = -1, seen = caches[0];
                        outer: for (;++index < length && result.length < maxLength; ) {
                            var value = array[index], computed = iteratee ? iteratee(value) : value;
                            if (value = comparator || 0 !== value ? value : 0, !(seen ? cacheHas(seen, computed) : includes(result, computed, comparator))) {
                                for (othIndex = othLength; --othIndex; ) {
                                    var cache = caches[othIndex];
                                    if (!(cache ? cacheHas(cache, computed) : includes(arrays[othIndex], computed, comparator))) continue outer;
                                }
                                seen && seen.push(computed), result.push(value);
                            }
                        }
                        return result;
                    }
                    /**
	     * The base implementation of `_.invert` and `_.invertBy` which inverts
	     * `object` with values transformed by `iteratee` and set by `setter`.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} setter The function to set `accumulator` values.
	     * @param {Function} iteratee The iteratee to transform values.
	     * @param {Object} accumulator The initial inverted object.
	     * @returns {Function} Returns `accumulator`.
	     */
                    function baseInverter(object, setter, iteratee, accumulator) {
                        return baseForOwn(object, function(value, key, object) {
                            setter(accumulator, iteratee(value), key, object);
                        }), accumulator;
                    }
                    /**
	     * The base implementation of `_.invoke` without support for individual
	     * method arguments.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the method to invoke.
	     * @param {Array} args The arguments to invoke the method with.
	     * @returns {*} Returns the result of the invoked method.
	     */
                    function baseInvoke(object, path, args) {
                        path = castPath(path, object), object = parent(object, path);
                        var func = null == object ? object : object[toKey(last(path))];
                        return null == func ? undefined : apply(func, object, args);
                    }
                    /**
	     * The base implementation of `_.isArguments`.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	     */
                    function baseIsArguments(value) {
                        return isObjectLike(value) && baseGetTag(value) == argsTag;
                    }
                    /**
	     * The base implementation of `_.isArrayBuffer` without Node.js optimizations.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
	     */
                    function baseIsArrayBuffer(value) {
                        return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
                    }
                    /**
	     * The base implementation of `_.isDate` without Node.js optimizations.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
	     */
                    function baseIsDate(value) {
                        return isObjectLike(value) && baseGetTag(value) == dateTag;
                    }
                    /**
	     * The base implementation of `_.isEqual` which supports partial comparisons
	     * and tracks traversed objects.
	     *
	     * @private
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @param {boolean} bitmask The bitmask flags.
	     *  1 - Unordered comparison
	     *  2 - Partial comparison
	     * @param {Function} [customizer] The function to customize comparisons.
	     * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     */
                    function baseIsEqual(value, other, bitmask, customizer, stack) {
                        return value === other || (null == value || null == other || !isObjectLike(value) && !isObjectLike(other) ? value !== value && other !== other : baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack));
                    }
                    /**
	     * A specialized version of `baseIsEqual` for arrays and objects which performs
	     * deep comparisons and tracks traversed objects enabling objects with circular
	     * references to be compared.
	     *
	     * @private
	     * @param {Object} object The object to compare.
	     * @param {Object} other The other object to compare.
	     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	     * @param {Function} customizer The function to customize comparisons.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */
                    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
                        var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
                        objTag = objTag == argsTag ? objectTag : objTag, othTag = othTag == argsTag ? objectTag : othTag;
                        var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
                        if (isSameTag && isBuffer(object)) {
                            if (!isBuffer(other)) return !1;
                            objIsArr = !0, objIsObj = !1;
                        }
                        if (isSameTag && !objIsObj) return stack || (stack = new Stack()), objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
                        if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
                            var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
                            if (objIsWrapped || othIsWrapped) {
                                var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
                                return stack || (stack = new Stack()), equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
                            }
                        }
                        return !!isSameTag && (stack || (stack = new Stack()), equalObjects(object, other, bitmask, customizer, equalFunc, stack));
                    }
                    /**
	     * The base implementation of `_.isMap` without Node.js optimizations.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
	     */
                    function baseIsMap(value) {
                        return isObjectLike(value) && getTag(value) == mapTag;
                    }
                    /**
	     * The base implementation of `_.isMatch` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Object} object The object to inspect.
	     * @param {Object} source The object of property values to match.
	     * @param {Array} matchData The property names, values, and compare flags to match.
	     * @param {Function} [customizer] The function to customize comparisons.
	     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	     */
                    function baseIsMatch(object, source, matchData, customizer) {
                        var index = matchData.length, length = index, noCustomizer = !customizer;
                        if (null == object) return !length;
                        for (object = Object(object); index--; ) {
                            var data = matchData[index];
                            if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) return !1;
                        }
                        for (;++index < length; ) {
                            data = matchData[index];
                            var key = data[0], objValue = object[key], srcValue = data[1];
                            if (noCustomizer && data[2]) {
                                if (objValue === undefined && !(key in object)) return !1;
                            } else {
                                var stack = new Stack();
                                if (customizer) var result = customizer(objValue, srcValue, key, object, source, stack);
                                if (!(result === undefined ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) return !1;
                            }
                        }
                        return !0;
                    }
                    /**
	     * The base implementation of `_.isNative` without bad shim checks.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a native function,
	     *  else `false`.
	     */
                    function baseIsNative(value) {
                        if (!isObject(value) || isMasked(value)) return !1;
                        var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
                        return pattern.test(toSource(value));
                    }
                    /**
	     * The base implementation of `_.isRegExp` without Node.js optimizations.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
	     */
                    function baseIsRegExp(value) {
                        return isObjectLike(value) && baseGetTag(value) == regexpTag;
                    }
                    /**
	     * The base implementation of `_.isSet` without Node.js optimizations.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
	     */
                    function baseIsSet(value) {
                        return isObjectLike(value) && getTag(value) == setTag;
                    }
                    /**
	     * The base implementation of `_.isTypedArray` without Node.js optimizations.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	     */
                    function baseIsTypedArray(value) {
                        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
                    }
                    /**
	     * The base implementation of `_.iteratee`.
	     *
	     * @private
	     * @param {*} [value=_.identity] The value to convert to an iteratee.
	     * @returns {Function} Returns the iteratee.
	     */
                    function baseIteratee(value) {
                        // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
                        // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
                        // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
                        // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
                        return "function" == typeof value ? value : null == value ? identity : "object" == typeof value ? isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value) : property(value);
                    }
                    /**
	     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     */
                    function baseKeys(object) {
                        if (!isPrototype(object)) return nativeKeys(object);
                        var result = [];
                        for (var key in Object(object)) hasOwnProperty.call(object, key) && "constructor" != key && result.push(key);
                        return result;
                    }
                    /**
	     * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     */
                    function baseKeysIn(object) {
                        if (!isObject(object)) return nativeKeysIn(object);
                        var isProto = isPrototype(object), result = [];
                        for (var key in object) ("constructor" != key || !isProto && hasOwnProperty.call(object, key)) && result.push(key);
                        return result;
                    }
                    /**
	     * The base implementation of `_.lt` which doesn't coerce arguments.
	     *
	     * @private
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is less than `other`,
	     *  else `false`.
	     */
                    function baseLt(value, other) {
                        return value < other;
                    }
                    /**
	     * The base implementation of `_.map` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array} Returns the new mapped array.
	     */
                    function baseMap(collection, iteratee) {
                        var index = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
                        return baseEach(collection, function(value, key, collection) {
                            result[++index] = iteratee(value, key, collection);
                        }), result;
                    }
                    /**
	     * The base implementation of `_.matches` which doesn't clone `source`.
	     *
	     * @private
	     * @param {Object} source The object of property values to match.
	     * @returns {Function} Returns the new spec function.
	     */
                    function baseMatches(source) {
                        var matchData = getMatchData(source);
                        return 1 == matchData.length && matchData[0][2] ? matchesStrictComparable(matchData[0][0], matchData[0][1]) : function(object) {
                            return object === source || baseIsMatch(object, source, matchData);
                        };
                    }
                    /**
	     * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	     *
	     * @private
	     * @param {string} path The path of the property to get.
	     * @param {*} srcValue The value to match.
	     * @returns {Function} Returns the new spec function.
	     */
                    function baseMatchesProperty(path, srcValue) {
                        return isKey(path) && isStrictComparable(srcValue) ? matchesStrictComparable(toKey(path), srcValue) : function(object) {
                            var objValue = get(object, path);
                            return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
                        };
                    }
                    /**
	     * The base implementation of `_.merge` without support for multiple sources.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @param {number} srcIndex The index of `source`.
	     * @param {Function} [customizer] The function to customize merged values.
	     * @param {Object} [stack] Tracks traversed source values and their merged
	     *  counterparts.
	     */
                    function baseMerge(object, source, srcIndex, customizer, stack) {
                        object !== source && baseFor(source, function(srcValue, key) {
                            if (isObject(srcValue)) stack || (stack = new Stack()), baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack); else {
                                var newValue = customizer ? customizer(object[key], srcValue, key + "", object, source, stack) : undefined;
                                newValue === undefined && (newValue = srcValue), assignMergeValue(object, key, newValue);
                            }
                        }, keysIn);
                    }
                    /**
	     * A specialized version of `baseMerge` for arrays and objects which performs
	     * deep merges and tracks traversed objects enabling objects with circular
	     * references to be merged.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @param {string} key The key of the value to merge.
	     * @param {number} srcIndex The index of `source`.
	     * @param {Function} mergeFunc The function to merge values.
	     * @param {Function} [customizer] The function to customize assigned values.
	     * @param {Object} [stack] Tracks traversed source values and their merged
	     *  counterparts.
	     */
                    function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
                        var objValue = object[key], srcValue = source[key], stacked = stack.get(srcValue);
                        if (stacked) return void assignMergeValue(object, key, stacked);
                        var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined, isCommon = newValue === undefined;
                        if (isCommon) {
                            var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
                            newValue = srcValue, isArr || isBuff || isTyped ? isArray(objValue) ? newValue = objValue : isArrayLikeObject(objValue) ? newValue = copyArray(objValue) : isBuff ? (isCommon = !1, 
                            newValue = cloneBuffer(srcValue, !0)) : isTyped ? (isCommon = !1, newValue = cloneTypedArray(srcValue, !0)) : newValue = [] : isPlainObject(srcValue) || isArguments(srcValue) ? (newValue = objValue, 
                            isArguments(objValue) ? newValue = toPlainObject(objValue) : (!isObject(objValue) || srcIndex && isFunction(objValue)) && (newValue = initCloneObject(srcValue))) : isCommon = !1;
                        }
                        isCommon && (// Recursively merge objects and arrays (susceptible to call stack limits).
                        stack.set(srcValue, newValue), mergeFunc(newValue, srcValue, srcIndex, customizer, stack), 
                        stack.delete(srcValue)), assignMergeValue(object, key, newValue);
                    }
                    /**
	     * The base implementation of `_.nth` which doesn't coerce arguments.
	     *
	     * @private
	     * @param {Array} array The array to query.
	     * @param {number} n The index of the element to return.
	     * @returns {*} Returns the nth element of `array`.
	     */
                    function baseNth(array, n) {
                        var length = array.length;
                        if (length) return n += n < 0 ? length : 0, isIndex(n, length) ? array[n] : undefined;
                    }
                    /**
	     * The base implementation of `_.orderBy` without param guards.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
	     * @param {string[]} orders The sort orders of `iteratees`.
	     * @returns {Array} Returns the new sorted array.
	     */
                    function baseOrderBy(collection, iteratees, orders) {
                        var index = -1;
                        iteratees = arrayMap(iteratees.length ? iteratees : [ identity ], baseUnary(getIteratee()));
                        var result = baseMap(collection, function(value, key, collection) {
                            var criteria = arrayMap(iteratees, function(iteratee) {
                                return iteratee(value);
                            });
                            return {
                                criteria: criteria,
                                index: ++index,
                                value: value
                            };
                        });
                        return baseSortBy(result, function(object, other) {
                            return compareMultiple(object, other, orders);
                        });
                    }
                    /**
	     * The base implementation of `_.pick` without support for individual
	     * property identifiers.
	     *
	     * @private
	     * @param {Object} object The source object.
	     * @param {string[]} paths The property paths to pick.
	     * @returns {Object} Returns the new object.
	     */
                    function basePick(object, paths) {
                        return basePickBy(object, paths, function(value, path) {
                            return hasIn(object, path);
                        });
                    }
                    /**
	     * The base implementation of  `_.pickBy` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Object} object The source object.
	     * @param {string[]} paths The property paths to pick.
	     * @param {Function} predicate The function invoked per property.
	     * @returns {Object} Returns the new object.
	     */
                    function basePickBy(object, paths, predicate) {
                        for (var index = -1, length = paths.length, result = {}; ++index < length; ) {
                            var path = paths[index], value = baseGet(object, path);
                            predicate(value, path) && baseSet(result, castPath(path, object), value);
                        }
                        return result;
                    }
                    /**
	     * A specialized version of `baseProperty` which supports deep paths.
	     *
	     * @private
	     * @param {Array|string} path The path of the property to get.
	     * @returns {Function} Returns the new accessor function.
	     */
                    function basePropertyDeep(path) {
                        return function(object) {
                            return baseGet(object, path);
                        };
                    }
                    /**
	     * The base implementation of `_.pullAllBy` without support for iteratee
	     * shorthands.
	     *
	     * @private
	     * @param {Array} array The array to modify.
	     * @param {Array} values The values to remove.
	     * @param {Function} [iteratee] The iteratee invoked per element.
	     * @param {Function} [comparator] The comparator invoked per element.
	     * @returns {Array} Returns `array`.
	     */
                    function basePullAll(array, values, iteratee, comparator) {
                        var indexOf = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values.length, seen = array;
                        for (array === values && (values = copyArray(values)), iteratee && (seen = arrayMap(array, baseUnary(iteratee))); ++index < length; ) for (var fromIndex = 0, value = values[index], computed = iteratee ? iteratee(value) : value; (fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1; ) seen !== array && splice.call(seen, fromIndex, 1), 
                        splice.call(array, fromIndex, 1);
                        return array;
                    }
                    /**
	     * The base implementation of `_.pullAt` without support for individual
	     * indexes or capturing the removed elements.
	     *
	     * @private
	     * @param {Array} array The array to modify.
	     * @param {number[]} indexes The indexes of elements to remove.
	     * @returns {Array} Returns `array`.
	     */
                    function basePullAt(array, indexes) {
                        for (var length = array ? indexes.length : 0, lastIndex = length - 1; length--; ) {
                            var index = indexes[length];
                            if (length == lastIndex || index !== previous) {
                                var previous = index;
                                isIndex(index) ? splice.call(array, index, 1) : baseUnset(array, index);
                            }
                        }
                        return array;
                    }
                    /**
	     * The base implementation of `_.random` without support for returning
	     * floating-point numbers.
	     *
	     * @private
	     * @param {number} lower The lower bound.
	     * @param {number} upper The upper bound.
	     * @returns {number} Returns the random number.
	     */
                    function baseRandom(lower, upper) {
                        return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
                    }
                    /**
	     * The base implementation of `_.range` and `_.rangeRight` which doesn't
	     * coerce arguments.
	     *
	     * @private
	     * @param {number} start The start of the range.
	     * @param {number} end The end of the range.
	     * @param {number} step The value to increment or decrement by.
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Array} Returns the range of numbers.
	     */
                    function baseRange(start, end, step, fromRight) {
                        for (var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result = Array(length); length--; ) result[fromRight ? length : ++index] = start, 
                        start += step;
                        return result;
                    }
                    /**
	     * The base implementation of `_.repeat` which doesn't coerce arguments.
	     *
	     * @private
	     * @param {string} string The string to repeat.
	     * @param {number} n The number of times to repeat the string.
	     * @returns {string} Returns the repeated string.
	     */
                    function baseRepeat(string, n) {
                        var result = "";
                        if (!string || n < 1 || n > MAX_SAFE_INTEGER) return result;
                        // Leverage the exponentiation by squaring algorithm for a faster repeat.
                        // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
                        do n % 2 && (result += string), n = nativeFloor(n / 2), n && (string += string); while (n);
                        return result;
                    }
                    /**
	     * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	     *
	     * @private
	     * @param {Function} func The function to apply a rest parameter to.
	     * @param {number} [start=func.length-1] The start position of the rest parameter.
	     * @returns {Function} Returns the new function.
	     */
                    function baseRest(func, start) {
                        return setToString(overRest(func, start, identity), func + "");
                    }
                    /**
	     * The base implementation of `_.sample`.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to sample.
	     * @returns {*} Returns the random element.
	     */
                    function baseSample(collection) {
                        return arraySample(values(collection));
                    }
                    /**
	     * The base implementation of `_.sampleSize` without param guards.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to sample.
	     * @param {number} n The number of elements to sample.
	     * @returns {Array} Returns the random elements.
	     */
                    function baseSampleSize(collection, n) {
                        var array = values(collection);
                        return shuffleSelf(array, baseClamp(n, 0, array.length));
                    }
                    /**
	     * The base implementation of `_.set`.
	     *
	     * @private
	     * @param {Object} object The object to modify.
	     * @param {Array|string} path The path of the property to set.
	     * @param {*} value The value to set.
	     * @param {Function} [customizer] The function to customize path creation.
	     * @returns {Object} Returns `object`.
	     */
                    function baseSet(object, path, value, customizer) {
                        if (!isObject(object)) return object;
                        path = castPath(path, object);
                        for (var index = -1, length = path.length, lastIndex = length - 1, nested = object; null != nested && ++index < length; ) {
                            var key = toKey(path[index]), newValue = value;
                            if (index != lastIndex) {
                                var objValue = nested[key];
                                newValue = customizer ? customizer(objValue, key, nested) : undefined, newValue === undefined && (newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {});
                            }
                            assignValue(nested, key, newValue), nested = nested[key];
                        }
                        return object;
                    }
                    /**
	     * The base implementation of `_.shuffle`.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to shuffle.
	     * @returns {Array} Returns the new shuffled array.
	     */
                    function baseShuffle(collection) {
                        return shuffleSelf(values(collection));
                    }
                    /**
	     * The base implementation of `_.slice` without an iteratee call guard.
	     *
	     * @private
	     * @param {Array} array The array to slice.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns the slice of `array`.
	     */
                    function baseSlice(array, start, end) {
                        var index = -1, length = array.length;
                        start < 0 && (start = -start > length ? 0 : length + start), end = end > length ? length : end, 
                        end < 0 && (end += length), length = start > end ? 0 : end - start >>> 0, start >>>= 0;
                        for (var result = Array(length); ++index < length; ) result[index] = array[index + start];
                        return result;
                    }
                    /**
	     * The base implementation of `_.some` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {boolean} Returns `true` if any element passes the predicate check,
	     *  else `false`.
	     */
                    function baseSome(collection, predicate) {
                        var result;
                        return baseEach(collection, function(value, index, collection) {
                            return result = predicate(value, index, collection), !result;
                        }), !!result;
                    }
                    /**
	     * The base implementation of `_.sortedIndex` and `_.sortedLastIndex` which
	     * performs a binary search of `array` to determine the index at which `value`
	     * should be inserted into `array` in order to maintain its sort order.
	     *
	     * @private
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {boolean} [retHighest] Specify returning the highest qualified index.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     */
                    function baseSortedIndex(array, value, retHighest) {
                        var low = 0, high = null == array ? low : array.length;
                        if ("number" == typeof value && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
                            for (;low < high; ) {
                                var mid = low + high >>> 1, computed = array[mid];
                                null !== computed && !isSymbol(computed) && (retHighest ? computed <= value : computed < value) ? low = mid + 1 : high = mid;
                            }
                            return high;
                        }
                        return baseSortedIndexBy(array, value, identity, retHighest);
                    }
                    /**
	     * The base implementation of `_.sortedIndexBy` and `_.sortedLastIndexBy`
	     * which invokes `iteratee` for `value` and each element of `array` to compute
	     * their sort ranking. The iteratee is invoked with one argument; (value).
	     *
	     * @private
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function} iteratee The iteratee invoked per element.
	     * @param {boolean} [retHighest] Specify returning the highest qualified index.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     */
                    function baseSortedIndexBy(array, value, iteratee, retHighest) {
                        value = iteratee(value);
                        for (var low = 0, high = null == array ? 0 : array.length, valIsNaN = value !== value, valIsNull = null === value, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined; low < high; ) {
                            var mid = nativeFloor((low + high) / 2), computed = iteratee(array[mid]), othIsDefined = computed !== undefined, othIsNull = null === computed, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
                            if (valIsNaN) var setLow = retHighest || othIsReflexive; else setLow = valIsUndefined ? othIsReflexive && (retHighest || othIsDefined) : valIsNull ? othIsReflexive && othIsDefined && (retHighest || !othIsNull) : valIsSymbol ? othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol) : !othIsNull && !othIsSymbol && (retHighest ? computed <= value : computed < value);
                            setLow ? low = mid + 1 : high = mid;
                        }
                        return nativeMin(high, MAX_ARRAY_INDEX);
                    }
                    /**
	     * The base implementation of `_.sortedUniq` and `_.sortedUniqBy` without
	     * support for iteratee shorthands.
	     *
	     * @private
	     * @param {Array} array The array to inspect.
	     * @param {Function} [iteratee] The iteratee invoked per element.
	     * @returns {Array} Returns the new duplicate free array.
	     */
                    function baseSortedUniq(array, iteratee) {
                        for (var index = -1, length = array.length, resIndex = 0, result = []; ++index < length; ) {
                            var value = array[index], computed = iteratee ? iteratee(value) : value;
                            if (!index || !eq(computed, seen)) {
                                var seen = computed;
                                result[resIndex++] = 0 === value ? 0 : value;
                            }
                        }
                        return result;
                    }
                    /**
	     * The base implementation of `_.toNumber` which doesn't ensure correct
	     * conversions of binary, hexadecimal, or octal string values.
	     *
	     * @private
	     * @param {*} value The value to process.
	     * @returns {number} Returns the number.
	     */
                    function baseToNumber(value) {
                        return "number" == typeof value ? value : isSymbol(value) ? NAN : +value;
                    }
                    /**
	     * The base implementation of `_.toString` which doesn't convert nullish
	     * values to empty strings.
	     *
	     * @private
	     * @param {*} value The value to process.
	     * @returns {string} Returns the string.
	     */
                    function baseToString(value) {
                        // Exit early for strings to avoid a performance hit in some environments.
                        if ("string" == typeof value) return value;
                        if (isArray(value)) // Recursively convert values (susceptible to call stack limits).
                        return arrayMap(value, baseToString) + "";
                        if (isSymbol(value)) return symbolToString ? symbolToString.call(value) : "";
                        var result = value + "";
                        return "0" == result && 1 / value == -INFINITY ? "-0" : result;
                    }
                    /**
	     * The base implementation of `_.uniqBy` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Array} array The array to inspect.
	     * @param {Function} [iteratee] The iteratee invoked per element.
	     * @param {Function} [comparator] The comparator invoked per element.
	     * @returns {Array} Returns the new duplicate free array.
	     */
                    function baseUniq(array, iteratee, comparator) {
                        var index = -1, includes = arrayIncludes, length = array.length, isCommon = !0, result = [], seen = result;
                        if (comparator) isCommon = !1, includes = arrayIncludesWith; else if (length >= LARGE_ARRAY_SIZE) {
                            var set = iteratee ? null : createSet(array);
                            if (set) return setToArray(set);
                            isCommon = !1, includes = cacheHas, seen = new SetCache();
                        } else seen = iteratee ? [] : result;
                        outer: for (;++index < length; ) {
                            var value = array[index], computed = iteratee ? iteratee(value) : value;
                            if (value = comparator || 0 !== value ? value : 0, isCommon && computed === computed) {
                                for (var seenIndex = seen.length; seenIndex--; ) if (seen[seenIndex] === computed) continue outer;
                                iteratee && seen.push(computed), result.push(value);
                            } else includes(seen, computed, comparator) || (seen !== result && seen.push(computed), 
                            result.push(value));
                        }
                        return result;
                    }
                    /**
	     * The base implementation of `_.unset`.
	     *
	     * @private
	     * @param {Object} object The object to modify.
	     * @param {Array|string} path The property path to unset.
	     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
	     */
                    function baseUnset(object, path) {
                        return path = castPath(path, object), object = parent(object, path), null == object || delete object[toKey(last(path))];
                    }
                    /**
	     * The base implementation of `_.update`.
	     *
	     * @private
	     * @param {Object} object The object to modify.
	     * @param {Array|string} path The path of the property to update.
	     * @param {Function} updater The function to produce the updated value.
	     * @param {Function} [customizer] The function to customize path creation.
	     * @returns {Object} Returns `object`.
	     */
                    function baseUpdate(object, path, updater, customizer) {
                        return baseSet(object, path, updater(baseGet(object, path)), customizer);
                    }
                    /**
	     * The base implementation of methods like `_.dropWhile` and `_.takeWhile`
	     * without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Array} array The array to query.
	     * @param {Function} predicate The function invoked per iteration.
	     * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Array} Returns the slice of `array`.
	     */
                    function baseWhile(array, predicate, isDrop, fromRight) {
                        for (var length = array.length, index = fromRight ? length : -1; (fromRight ? index-- : ++index < length) && predicate(array[index], index, array); ) ;
                        return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
                    }
                    /**
	     * The base implementation of `wrapperValue` which returns the result of
	     * performing a sequence of actions on the unwrapped `value`, where each
	     * successive action is supplied the return value of the previous.
	     *
	     * @private
	     * @param {*} value The unwrapped value.
	     * @param {Array} actions Actions to perform to resolve the unwrapped value.
	     * @returns {*} Returns the resolved value.
	     */
                    function baseWrapperValue(value, actions) {
                        var result = value;
                        return result instanceof LazyWrapper && (result = result.value()), arrayReduce(actions, function(result, action) {
                            return action.func.apply(action.thisArg, arrayPush([ result ], action.args));
                        }, result);
                    }
                    /**
	     * The base implementation of methods like `_.xor`, without support for
	     * iteratee shorthands, that accepts an array of arrays to inspect.
	     *
	     * @private
	     * @param {Array} arrays The arrays to inspect.
	     * @param {Function} [iteratee] The iteratee invoked per element.
	     * @param {Function} [comparator] The comparator invoked per element.
	     * @returns {Array} Returns the new array of values.
	     */
                    function baseXor(arrays, iteratee, comparator) {
                        var length = arrays.length;
                        if (length < 2) return length ? baseUniq(arrays[0]) : [];
                        for (var index = -1, result = Array(length); ++index < length; ) for (var array = arrays[index], othIndex = -1; ++othIndex < length; ) othIndex != index && (result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator));
                        return baseUniq(baseFlatten(result, 1), iteratee, comparator);
                    }
                    /**
	     * This base implementation of `_.zipObject` which assigns values using `assignFunc`.
	     *
	     * @private
	     * @param {Array} props The property identifiers.
	     * @param {Array} values The property values.
	     * @param {Function} assignFunc The function to assign values.
	     * @returns {Object} Returns the new object.
	     */
                    function baseZipObject(props, values, assignFunc) {
                        for (var index = -1, length = props.length, valsLength = values.length, result = {}; ++index < length; ) {
                            var value = index < valsLength ? values[index] : undefined;
                            assignFunc(result, props[index], value);
                        }
                        return result;
                    }
                    /**
	     * Casts `value` to an empty array if it's not an array like object.
	     *
	     * @private
	     * @param {*} value The value to inspect.
	     * @returns {Array|Object} Returns the cast array-like object.
	     */
                    function castArrayLikeObject(value) {
                        return isArrayLikeObject(value) ? value : [];
                    }
                    /**
	     * Casts `value` to `identity` if it's not a function.
	     *
	     * @private
	     * @param {*} value The value to inspect.
	     * @returns {Function} Returns cast function.
	     */
                    function castFunction(value) {
                        return "function" == typeof value ? value : identity;
                    }
                    /**
	     * Casts `value` to a path array if it's not one.
	     *
	     * @private
	     * @param {*} value The value to inspect.
	     * @param {Object} [object] The object to query keys on.
	     * @returns {Array} Returns the cast property path array.
	     */
                    function castPath(value, object) {
                        return isArray(value) ? value : isKey(value, object) ? [ value ] : stringToPath(toString(value));
                    }
                    /**
	     * Casts `array` to a slice if it's needed.
	     *
	     * @private
	     * @param {Array} array The array to inspect.
	     * @param {number} start The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns the cast slice.
	     */
                    function castSlice(array, start, end) {
                        var length = array.length;
                        return end = end === undefined ? length : end, !start && end >= length ? array : baseSlice(array, start, end);
                    }
                    /**
	     * Creates a clone of  `buffer`.
	     *
	     * @private
	     * @param {Buffer} buffer The buffer to clone.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @returns {Buffer} Returns the cloned buffer.
	     */
                    function cloneBuffer(buffer, isDeep) {
                        if (isDeep) return buffer.slice();
                        var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
                        return buffer.copy(result), result;
                    }
                    /**
	     * Creates a clone of `arrayBuffer`.
	     *
	     * @private
	     * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	     * @returns {ArrayBuffer} Returns the cloned array buffer.
	     */
                    function cloneArrayBuffer(arrayBuffer) {
                        var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
                        return new Uint8Array(result).set(new Uint8Array(arrayBuffer)), result;
                    }
                    /**
	     * Creates a clone of `dataView`.
	     *
	     * @private
	     * @param {Object} dataView The data view to clone.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @returns {Object} Returns the cloned data view.
	     */
                    function cloneDataView(dataView, isDeep) {
                        var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
                        return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
                    }
                    /**
	     * Creates a clone of `map`.
	     *
	     * @private
	     * @param {Object} map The map to clone.
	     * @param {Function} cloneFunc The function to clone values.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @returns {Object} Returns the cloned map.
	     */
                    function cloneMap(map, isDeep, cloneFunc) {
                        var array = isDeep ? cloneFunc(mapToArray(map), CLONE_DEEP_FLAG) : mapToArray(map);
                        return arrayReduce(array, addMapEntry, new map.constructor());
                    }
                    /**
	     * Creates a clone of `regexp`.
	     *
	     * @private
	     * @param {Object} regexp The regexp to clone.
	     * @returns {Object} Returns the cloned regexp.
	     */
                    function cloneRegExp(regexp) {
                        var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
                        return result.lastIndex = regexp.lastIndex, result;
                    }
                    /**
	     * Creates a clone of `set`.
	     *
	     * @private
	     * @param {Object} set The set to clone.
	     * @param {Function} cloneFunc The function to clone values.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @returns {Object} Returns the cloned set.
	     */
                    function cloneSet(set, isDeep, cloneFunc) {
                        var array = isDeep ? cloneFunc(setToArray(set), CLONE_DEEP_FLAG) : setToArray(set);
                        return arrayReduce(array, addSetEntry, new set.constructor());
                    }
                    /**
	     * Creates a clone of the `symbol` object.
	     *
	     * @private
	     * @param {Object} symbol The symbol object to clone.
	     * @returns {Object} Returns the cloned symbol object.
	     */
                    function cloneSymbol(symbol) {
                        return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
                    }
                    /**
	     * Creates a clone of `typedArray`.
	     *
	     * @private
	     * @param {Object} typedArray The typed array to clone.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @returns {Object} Returns the cloned typed array.
	     */
                    function cloneTypedArray(typedArray, isDeep) {
                        var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
                        return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
                    }
                    /**
	     * Compares values to sort them in ascending order.
	     *
	     * @private
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {number} Returns the sort order indicator for `value`.
	     */
                    function compareAscending(value, other) {
                        if (value !== other) {
                            var valIsDefined = value !== undefined, valIsNull = null === value, valIsReflexive = value === value, valIsSymbol = isSymbol(value), othIsDefined = other !== undefined, othIsNull = null === other, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
                            if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) return 1;
                            if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) return -1;
                        }
                        return 0;
                    }
                    /**
	     * Used by `_.orderBy` to compare multiple properties of a value to another
	     * and stable sort them.
	     *
	     * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
	     * specify an order of "desc" for descending or "asc" for ascending sort order
	     * of corresponding values.
	     *
	     * @private
	     * @param {Object} object The object to compare.
	     * @param {Object} other The other object to compare.
	     * @param {boolean[]|string[]} orders The order to sort by for each property.
	     * @returns {number} Returns the sort order indicator for `object`.
	     */
                    function compareMultiple(object, other, orders) {
                        for (var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length; ++index < length; ) {
                            var result = compareAscending(objCriteria[index], othCriteria[index]);
                            if (result) {
                                if (index >= ordersLength) return result;
                                var order = orders[index];
                                return result * ("desc" == order ? -1 : 1);
                            }
                        }
                        // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
                        // that causes it, under certain circumstances, to provide the same value for
                        // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
                        // for more details.
                        //
                        // This also ensures a stable sort in V8 and other engines.
                        // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
                        return object.index - other.index;
                    }
                    /**
	     * Creates an array that is the composition of partially applied arguments,
	     * placeholders, and provided arguments into a single array of arguments.
	     *
	     * @private
	     * @param {Array} args The provided arguments.
	     * @param {Array} partials The arguments to prepend to those provided.
	     * @param {Array} holders The `partials` placeholder indexes.
	     * @params {boolean} [isCurried] Specify composing for a curried function.
	     * @returns {Array} Returns the new array of composed arguments.
	     */
                    function composeArgs(args, partials, holders, isCurried) {
                        for (var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result = Array(leftLength + rangeLength), isUncurried = !isCurried; ++leftIndex < leftLength; ) result[leftIndex] = partials[leftIndex];
                        for (;++argsIndex < holdersLength; ) (isUncurried || argsIndex < argsLength) && (result[holders[argsIndex]] = args[argsIndex]);
                        for (;rangeLength--; ) result[leftIndex++] = args[argsIndex++];
                        return result;
                    }
                    /**
	     * This function is like `composeArgs` except that the arguments composition
	     * is tailored for `_.partialRight`.
	     *
	     * @private
	     * @param {Array} args The provided arguments.
	     * @param {Array} partials The arguments to append to those provided.
	     * @param {Array} holders The `partials` placeholder indexes.
	     * @params {boolean} [isCurried] Specify composing for a curried function.
	     * @returns {Array} Returns the new array of composed arguments.
	     */
                    function composeArgsRight(args, partials, holders, isCurried) {
                        for (var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result = Array(rangeLength + rightLength), isUncurried = !isCurried; ++argsIndex < rangeLength; ) result[argsIndex] = args[argsIndex];
                        for (var offset = argsIndex; ++rightIndex < rightLength; ) result[offset + rightIndex] = partials[rightIndex];
                        for (;++holdersIndex < holdersLength; ) (isUncurried || argsIndex < argsLength) && (result[offset + holders[holdersIndex]] = args[argsIndex++]);
                        return result;
                    }
                    /**
	     * Copies the values of `source` to `array`.
	     *
	     * @private
	     * @param {Array} source The array to copy values from.
	     * @param {Array} [array=[]] The array to copy values to.
	     * @returns {Array} Returns `array`.
	     */
                    function copyArray(source, array) {
                        var index = -1, length = source.length;
                        for (array || (array = Array(length)); ++index < length; ) array[index] = source[index];
                        return array;
                    }
                    /**
	     * Copies properties of `source` to `object`.
	     *
	     * @private
	     * @param {Object} source The object to copy properties from.
	     * @param {Array} props The property identifiers to copy.
	     * @param {Object} [object={}] The object to copy properties to.
	     * @param {Function} [customizer] The function to customize copied values.
	     * @returns {Object} Returns `object`.
	     */
                    function copyObject(source, props, object, customizer) {
                        var isNew = !object;
                        object || (object = {});
                        for (var index = -1, length = props.length; ++index < length; ) {
                            var key = props[index], newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;
                            newValue === undefined && (newValue = source[key]), isNew ? baseAssignValue(object, key, newValue) : assignValue(object, key, newValue);
                        }
                        return object;
                    }
                    /**
	     * Copies own symbols of `source` to `object`.
	     *
	     * @private
	     * @param {Object} source The object to copy symbols from.
	     * @param {Object} [object={}] The object to copy symbols to.
	     * @returns {Object} Returns `object`.
	     */
                    function copySymbols(source, object) {
                        return copyObject(source, getSymbols(source), object);
                    }
                    /**
	     * Copies own and inherited symbols of `source` to `object`.
	     *
	     * @private
	     * @param {Object} source The object to copy symbols from.
	     * @param {Object} [object={}] The object to copy symbols to.
	     * @returns {Object} Returns `object`.
	     */
                    function copySymbolsIn(source, object) {
                        return copyObject(source, getSymbolsIn(source), object);
                    }
                    /**
	     * Creates a function like `_.groupBy`.
	     *
	     * @private
	     * @param {Function} setter The function to set accumulator values.
	     * @param {Function} [initializer] The accumulator object initializer.
	     * @returns {Function} Returns the new aggregator function.
	     */
                    function createAggregator(setter, initializer) {
                        return function(collection, iteratee) {
                            var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
                            return func(collection, setter, getIteratee(iteratee, 2), accumulator);
                        };
                    }
                    /**
	     * Creates a function like `_.assign`.
	     *
	     * @private
	     * @param {Function} assigner The function to assign values.
	     * @returns {Function} Returns the new assigner function.
	     */
                    function createAssigner(assigner) {
                        return baseRest(function(object, sources) {
                            var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined, guard = length > 2 ? sources[2] : undefined;
                            for (customizer = assigner.length > 3 && "function" == typeof customizer ? (length--, 
                            customizer) : undefined, guard && isIterateeCall(sources[0], sources[1], guard) && (customizer = length < 3 ? undefined : customizer, 
                            length = 1), object = Object(object); ++index < length; ) {
                                var source = sources[index];
                                source && assigner(object, source, index, customizer);
                            }
                            return object;
                        });
                    }
                    /**
	     * Creates a `baseEach` or `baseEachRight` function.
	     *
	     * @private
	     * @param {Function} eachFunc The function to iterate over a collection.
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new base function.
	     */
                    function createBaseEach(eachFunc, fromRight) {
                        return function(collection, iteratee) {
                            if (null == collection) return collection;
                            if (!isArrayLike(collection)) return eachFunc(collection, iteratee);
                            for (var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection); (fromRight ? index-- : ++index < length) && iteratee(iterable[index], index, iterable) !== !1; ) ;
                            return collection;
                        };
                    }
                    /**
	     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	     *
	     * @private
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new base function.
	     */
                    function createBaseFor(fromRight) {
                        return function(object, iteratee, keysFunc) {
                            for (var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length; length--; ) {
                                var key = props[fromRight ? length : ++index];
                                if (iteratee(iterable[key], key, iterable) === !1) break;
                            }
                            return object;
                        };
                    }
                    /**
	     * Creates a function that wraps `func` to invoke it with the optional `this`
	     * binding of `thisArg`.
	     *
	     * @private
	     * @param {Function} func The function to wrap.
	     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @returns {Function} Returns the new wrapped function.
	     */
                    function createBind(func, bitmask, thisArg) {
                        function wrapper() {
                            var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
                            return fn.apply(isBind ? thisArg : this, arguments);
                        }
                        var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
                        return wrapper;
                    }
                    /**
	     * Creates a function like `_.lowerFirst`.
	     *
	     * @private
	     * @param {string} methodName The name of the `String` case method to use.
	     * @returns {Function} Returns the new case function.
	     */
                    function createCaseFirst(methodName) {
                        return function(string) {
                            string = toString(string);
                            var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined, chr = strSymbols ? strSymbols[0] : string.charAt(0), trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
                            return chr[methodName]() + trailing;
                        };
                    }
                    /**
	     * Creates a function like `_.camelCase`.
	     *
	     * @private
	     * @param {Function} callback The function to combine each word.
	     * @returns {Function} Returns the new compounder function.
	     */
                    function createCompounder(callback) {
                        return function(string) {
                            return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
                        };
                    }
                    /**
	     * Creates a function that produces an instance of `Ctor` regardless of
	     * whether it was invoked as part of a `new` expression or by `call` or `apply`.
	     *
	     * @private
	     * @param {Function} Ctor The constructor to wrap.
	     * @returns {Function} Returns the new wrapped function.
	     */
                    function createCtor(Ctor) {
                        return function() {
                            // Use a `switch` statement to work with class constructors. See
                            // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
                            // for more details.
                            var args = arguments;
                            switch (args.length) {
                              case 0:
                                return new Ctor();

                              case 1:
                                return new Ctor(args[0]);

                              case 2:
                                return new Ctor(args[0], args[1]);

                              case 3:
                                return new Ctor(args[0], args[1], args[2]);

                              case 4:
                                return new Ctor(args[0], args[1], args[2], args[3]);

                              case 5:
                                return new Ctor(args[0], args[1], args[2], args[3], args[4]);

                              case 6:
                                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);

                              case 7:
                                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
                            }
                            var thisBinding = baseCreate(Ctor.prototype), result = Ctor.apply(thisBinding, args);
                            // Mimic the constructor's `return` behavior.
                            // See https://es5.github.io/#x13.2.2 for more details.
                            return isObject(result) ? result : thisBinding;
                        };
                    }
                    /**
	     * Creates a function that wraps `func` to enable currying.
	     *
	     * @private
	     * @param {Function} func The function to wrap.
	     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	     * @param {number} arity The arity of `func`.
	     * @returns {Function} Returns the new wrapped function.
	     */
                    function createCurry(func, bitmask, arity) {
                        function wrapper() {
                            for (var length = arguments.length, args = Array(length), index = length, placeholder = getHolder(wrapper); index--; ) args[index] = arguments[index];
                            var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
                            if (length -= holders.length, length < arity) return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined, args, holders, undefined, undefined, arity - length);
                            var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
                            return apply(fn, this, args);
                        }
                        var Ctor = createCtor(func);
                        return wrapper;
                    }
                    /**
	     * Creates a `_.find` or `_.findLast` function.
	     *
	     * @private
	     * @param {Function} findIndexFunc The function to find the collection index.
	     * @returns {Function} Returns the new find function.
	     */
                    function createFind(findIndexFunc) {
                        return function(collection, predicate, fromIndex) {
                            var iterable = Object(collection);
                            if (!isArrayLike(collection)) {
                                var iteratee = getIteratee(predicate, 3);
                                collection = keys(collection), predicate = function(key) {
                                    return iteratee(iterable[key], key, iterable);
                                };
                            }
                            var index = findIndexFunc(collection, predicate, fromIndex);
                            return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
                        };
                    }
                    /**
	     * Creates a `_.flow` or `_.flowRight` function.
	     *
	     * @private
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new flow function.
	     */
                    function createFlow(fromRight) {
                        return flatRest(function(funcs) {
                            var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
                            for (fromRight && funcs.reverse(); index--; ) {
                                var func = funcs[index];
                                if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
                                if (prereq && !wrapper && "wrapper" == getFuncName(func)) var wrapper = new LodashWrapper([], !0);
                            }
                            for (index = wrapper ? index : length; ++index < length; ) {
                                func = funcs[index];
                                var funcName = getFuncName(func), data = "wrapper" == funcName ? getData(func) : undefined;
                                wrapper = data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && 1 == data[9] ? wrapper[getFuncName(data[0])].apply(wrapper, data[3]) : 1 == func.length && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
                            }
                            return function() {
                                var args = arguments, value = args[0];
                                if (wrapper && 1 == args.length && isArray(value)) return wrapper.plant(value).value();
                                for (var index = 0, result = length ? funcs[index].apply(this, args) : value; ++index < length; ) result = funcs[index].call(this, result);
                                return result;
                            };
                        });
                    }
                    /**
	     * Creates a function that wraps `func` to invoke it with optional `this`
	     * binding of `thisArg`, partial application, and currying.
	     *
	     * @private
	     * @param {Function|string} func The function or method name to wrap.
	     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {Array} [partials] The arguments to prepend to those provided to
	     *  the new function.
	     * @param {Array} [holders] The `partials` placeholder indexes.
	     * @param {Array} [partialsRight] The arguments to append to those provided
	     *  to the new function.
	     * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
	     * @param {Array} [argPos] The argument positions of the new function.
	     * @param {number} [ary] The arity cap of `func`.
	     * @param {number} [arity] The arity of `func`.
	     * @returns {Function} Returns the new wrapped function.
	     */
                    function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
                        function wrapper() {
                            for (var length = arguments.length, args = Array(length), index = length; index--; ) args[index] = arguments[index];
                            if (isCurried) var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
                            if (partials && (args = composeArgs(args, partials, holders, isCurried)), partialsRight && (args = composeArgsRight(args, partialsRight, holdersRight, isCurried)), 
                            length -= holdersCount, isCurried && length < arity) {
                                var newHolders = replaceHolders(args, placeholder);
                                return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary, arity - length);
                            }
                            var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
                            return length = args.length, argPos ? args = reorder(args, argPos) : isFlip && length > 1 && args.reverse(), 
                            isAry && ary < length && (args.length = ary), this && this !== root && this instanceof wrapper && (fn = Ctor || createCtor(fn)), 
                            fn.apply(thisBinding, args);
                        }
                        var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined : createCtor(func);
                        return wrapper;
                    }
                    /**
	     * Creates a function like `_.invertBy`.
	     *
	     * @private
	     * @param {Function} setter The function to set accumulator values.
	     * @param {Function} toIteratee The function to resolve iteratees.
	     * @returns {Function} Returns the new inverter function.
	     */
                    function createInverter(setter, toIteratee) {
                        return function(object, iteratee) {
                            return baseInverter(object, setter, toIteratee(iteratee), {});
                        };
                    }
                    /**
	     * Creates a function that performs a mathematical operation on two values.
	     *
	     * @private
	     * @param {Function} operator The function to perform the operation.
	     * @param {number} [defaultValue] The value used for `undefined` arguments.
	     * @returns {Function} Returns the new mathematical operation function.
	     */
                    function createMathOperation(operator, defaultValue) {
                        return function(value, other) {
                            var result;
                            if (value === undefined && other === undefined) return defaultValue;
                            if (value !== undefined && (result = value), other !== undefined) {
                                if (result === undefined) return other;
                                "string" == typeof value || "string" == typeof other ? (value = baseToString(value), 
                                other = baseToString(other)) : (value = baseToNumber(value), other = baseToNumber(other)), 
                                result = operator(value, other);
                            }
                            return result;
                        };
                    }
                    /**
	     * Creates a function like `_.over`.
	     *
	     * @private
	     * @param {Function} arrayFunc The function to iterate over iteratees.
	     * @returns {Function} Returns the new over function.
	     */
                    function createOver(arrayFunc) {
                        return flatRest(function(iteratees) {
                            return iteratees = arrayMap(iteratees, baseUnary(getIteratee())), baseRest(function(args) {
                                var thisArg = this;
                                return arrayFunc(iteratees, function(iteratee) {
                                    return apply(iteratee, thisArg, args);
                                });
                            });
                        });
                    }
                    /**
	     * Creates the padding for `string` based on `length`. The `chars` string
	     * is truncated if the number of characters exceeds `length`.
	     *
	     * @private
	     * @param {number} length The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the padding for `string`.
	     */
                    function createPadding(length, chars) {
                        chars = chars === undefined ? " " : baseToString(chars);
                        var charsLength = chars.length;
                        if (charsLength < 2) return charsLength ? baseRepeat(chars, length) : chars;
                        var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
                        return hasUnicode(chars) ? castSlice(stringToArray(result), 0, length).join("") : result.slice(0, length);
                    }
                    /**
	     * Creates a function that wraps `func` to invoke it with the `this` binding
	     * of `thisArg` and `partials` prepended to the arguments it receives.
	     *
	     * @private
	     * @param {Function} func The function to wrap.
	     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	     * @param {*} thisArg The `this` binding of `func`.
	     * @param {Array} partials The arguments to prepend to those provided to
	     *  the new function.
	     * @returns {Function} Returns the new wrapped function.
	     */
                    function createPartial(func, bitmask, thisArg, partials) {
                        function wrapper() {
                            for (var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func; ++leftIndex < leftLength; ) args[leftIndex] = partials[leftIndex];
                            for (;argsLength--; ) args[leftIndex++] = arguments[++argsIndex];
                            return apply(fn, isBind ? thisArg : this, args);
                        }
                        var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
                        return wrapper;
                    }
                    /**
	     * Creates a `_.range` or `_.rangeRight` function.
	     *
	     * @private
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new range function.
	     */
                    function createRange(fromRight) {
                        return function(start, end, step) {
                            // Ensure the sign of `-0` is preserved.
                            return step && "number" != typeof step && isIterateeCall(start, end, step) && (end = step = undefined), 
                            start = toFinite(start), end === undefined ? (end = start, start = 0) : end = toFinite(end), 
                            step = step === undefined ? start < end ? 1 : -1 : toFinite(step), baseRange(start, end, step, fromRight);
                        };
                    }
                    /**
	     * Creates a function that performs a relational operation on two values.
	     *
	     * @private
	     * @param {Function} operator The function to perform the operation.
	     * @returns {Function} Returns the new relational operation function.
	     */
                    function createRelationalOperation(operator) {
                        return function(value, other) {
                            return "string" == typeof value && "string" == typeof other || (value = toNumber(value), 
                            other = toNumber(other)), operator(value, other);
                        };
                    }
                    /**
	     * Creates a function that wraps `func` to continue currying.
	     *
	     * @private
	     * @param {Function} func The function to wrap.
	     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	     * @param {Function} wrapFunc The function to create the `func` wrapper.
	     * @param {*} placeholder The placeholder value.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {Array} [partials] The arguments to prepend to those provided to
	     *  the new function.
	     * @param {Array} [holders] The `partials` placeholder indexes.
	     * @param {Array} [argPos] The argument positions of the new function.
	     * @param {number} [ary] The arity cap of `func`.
	     * @param {number} [arity] The arity of `func`.
	     * @returns {Function} Returns the new wrapped function.
	     */
                    function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
                        var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined, newHoldersRight = isCurry ? undefined : holders, newPartials = isCurry ? partials : undefined, newPartialsRight = isCurry ? undefined : partials;
                        bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG, bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG), 
                        bitmask & WRAP_CURRY_BOUND_FLAG || (bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG));
                        var newData = [ func, bitmask, thisArg, newPartials, newHolders, newPartialsRight, newHoldersRight, argPos, ary, arity ], result = wrapFunc.apply(undefined, newData);
                        return isLaziable(func) && setData(result, newData), result.placeholder = placeholder, 
                        setWrapToString(result, func, bitmask);
                    }
                    /**
	     * Creates a function like `_.round`.
	     *
	     * @private
	     * @param {string} methodName The name of the `Math` method to use when rounding.
	     * @returns {Function} Returns the new round function.
	     */
                    function createRound(methodName) {
                        var func = Math[methodName];
                        return function(number, precision) {
                            if (number = toNumber(number), precision = null == precision ? 0 : nativeMin(toInteger(precision), 292)) {
                                // Shift with exponential notation to avoid floating-point issues.
                                // See [MDN](https://mdn.io/round#Examples) for more details.
                                var pair = (toString(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
                                return pair = (toString(value) + "e").split("e"), +(pair[0] + "e" + (+pair[1] - precision));
                            }
                            return func(number);
                        };
                    }
                    /**
	     * Creates a `_.toPairs` or `_.toPairsIn` function.
	     *
	     * @private
	     * @param {Function} keysFunc The function to get the keys of a given object.
	     * @returns {Function} Returns the new pairs function.
	     */
                    function createToPairs(keysFunc) {
                        return function(object) {
                            var tag = getTag(object);
                            return tag == mapTag ? mapToArray(object) : tag == setTag ? setToPairs(object) : baseToPairs(object, keysFunc(object));
                        };
                    }
                    /**
	     * Creates a function that either curries or invokes `func` with optional
	     * `this` binding and partially applied arguments.
	     *
	     * @private
	     * @param {Function|string} func The function or method name to wrap.
	     * @param {number} bitmask The bitmask flags.
	     *    1 - `_.bind`
	     *    2 - `_.bindKey`
	     *    4 - `_.curry` or `_.curryRight` of a bound function
	     *    8 - `_.curry`
	     *   16 - `_.curryRight`
	     *   32 - `_.partial`
	     *   64 - `_.partialRight`
	     *  128 - `_.rearg`
	     *  256 - `_.ary`
	     *  512 - `_.flip`
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {Array} [partials] The arguments to be partially applied.
	     * @param {Array} [holders] The `partials` placeholder indexes.
	     * @param {Array} [argPos] The argument positions of the new function.
	     * @param {number} [ary] The arity cap of `func`.
	     * @param {number} [arity] The arity of `func`.
	     * @returns {Function} Returns the new wrapped function.
	     */
                    function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
                        var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
                        if (!isBindKey && "function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
                        var length = partials ? partials.length : 0;
                        if (length || (bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG), partials = holders = undefined), 
                        ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0), arity = arity === undefined ? arity : toInteger(arity), 
                        length -= holders ? holders.length : 0, bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
                            var partialsRight = partials, holdersRight = holders;
                            partials = holders = undefined;
                        }
                        var data = isBindKey ? undefined : getData(func), newData = [ func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity ];
                        if (data && mergeData(newData, data), func = newData[0], bitmask = newData[1], thisArg = newData[2], 
                        partials = newData[3], holders = newData[4], arity = newData[9] = newData[9] === undefined ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0), 
                        !arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG) && (bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)), 
                        bitmask && bitmask != WRAP_BIND_FLAG) result = bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG ? createCurry(func, bitmask, arity) : bitmask != WRAP_PARTIAL_FLAG && bitmask != (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG) || holders.length ? createHybrid.apply(undefined, newData) : createPartial(func, bitmask, thisArg, partials); else var result = createBind(func, bitmask, thisArg);
                        var setter = data ? baseSetData : setData;
                        return setWrapToString(setter(result, newData), func, bitmask);
                    }
                    /**
	     * Used by `_.defaults` to customize its `_.assignIn` use to assign properties
	     * of source objects to the destination object for all destination properties
	     * that resolve to `undefined`.
	     *
	     * @private
	     * @param {*} objValue The destination value.
	     * @param {*} srcValue The source value.
	     * @param {string} key The key of the property to assign.
	     * @param {Object} object The parent object of `objValue`.
	     * @returns {*} Returns the value to assign.
	     */
                    function customDefaultsAssignIn(objValue, srcValue, key, object) {
                        return objValue === undefined || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key) ? srcValue : objValue;
                    }
                    /**
	     * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
	     * objects into destination objects that are passed thru.
	     *
	     * @private
	     * @param {*} objValue The destination value.
	     * @param {*} srcValue The source value.
	     * @param {string} key The key of the property to merge.
	     * @param {Object} object The parent object of `objValue`.
	     * @param {Object} source The parent object of `srcValue`.
	     * @param {Object} [stack] Tracks traversed source values and their merged
	     *  counterparts.
	     * @returns {*} Returns the value to assign.
	     */
                    function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
                        // Recursively merge objects and arrays (susceptible to call stack limits).
                        return isObject(objValue) && isObject(srcValue) && (stack.set(srcValue, objValue), 
                        baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack), stack.delete(srcValue)), 
                        objValue;
                    }
                    /**
	     * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
	     * objects.
	     *
	     * @private
	     * @param {*} value The value to inspect.
	     * @param {string} key The key of the property to inspect.
	     * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
	     */
                    function customOmitClone(value) {
                        return isPlainObject(value) ? undefined : value;
                    }
                    /**
	     * A specialized version of `baseIsEqualDeep` for arrays with support for
	     * partial deep comparisons.
	     *
	     * @private
	     * @param {Array} array The array to compare.
	     * @param {Array} other The other array to compare.
	     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	     * @param {Function} customizer The function to customize comparisons.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Object} stack Tracks traversed `array` and `other` objects.
	     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	     */
                    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
                        var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
                        if (arrLength != othLength && !(isPartial && othLength > arrLength)) return !1;
                        // Assume cyclic values are equal.
                        var stacked = stack.get(array);
                        if (stacked && stack.get(other)) return stacked == other;
                        var index = -1, result = !0, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined;
                        // Ignore non-index properties.
                        for (stack.set(array, other), stack.set(other, array); ++index < arrLength; ) {
                            var arrValue = array[index], othValue = other[index];
                            if (customizer) var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
                            if (compared !== undefined) {
                                if (compared) continue;
                                result = !1;
                                break;
                            }
                            // Recursively compare arrays (susceptible to call stack limits).
                            if (seen) {
                                if (!arraySome(other, function(othValue, othIndex) {
                                    if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) return seen.push(othIndex);
                                })) {
                                    result = !1;
                                    break;
                                }
                            } else if (arrValue !== othValue && !equalFunc(arrValue, othValue, bitmask, customizer, stack)) {
                                result = !1;
                                break;
                            }
                        }
                        return stack.delete(array), stack.delete(other), result;
                    }
                    /**
	     * A specialized version of `baseIsEqualDeep` for comparing objects of
	     * the same `toStringTag`.
	     *
	     * **Note:** This function only supports comparing values with tags of
	     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	     *
	     * @private
	     * @param {Object} object The object to compare.
	     * @param {Object} other The other object to compare.
	     * @param {string} tag The `toStringTag` of the objects to compare.
	     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	     * @param {Function} customizer The function to customize comparisons.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Object} stack Tracks traversed `object` and `other` objects.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */
                    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
                        switch (tag) {
                          case dataViewTag:
                            if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) return !1;
                            object = object.buffer, other = other.buffer;

                          case arrayBufferTag:
                            return !(object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other)));

                          case boolTag:
                          case dateTag:
                          case numberTag:
                            // Coerce booleans to `1` or `0` and dates to milliseconds.
                            // Invalid dates are coerced to `NaN`.
                            return eq(+object, +other);

                          case errorTag:
                            return object.name == other.name && object.message == other.message;

                          case regexpTag:
                          case stringTag:
                            // Coerce regexes to strings and treat strings, primitives and objects,
                            // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
                            // for more details.
                            return object == other + "";

                          case mapTag:
                            var convert = mapToArray;

                          case setTag:
                            var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
                            if (convert || (convert = setToArray), object.size != other.size && !isPartial) return !1;
                            // Assume cyclic values are equal.
                            var stacked = stack.get(object);
                            if (stacked) return stacked == other;
                            bitmask |= COMPARE_UNORDERED_FLAG, // Recursively compare objects (susceptible to call stack limits).
                            stack.set(object, other);
                            var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
                            return stack.delete(object), result;

                          case symbolTag:
                            if (symbolValueOf) return symbolValueOf.call(object) == symbolValueOf.call(other);
                        }
                        return !1;
                    }
                    /**
	     * A specialized version of `baseIsEqualDeep` for objects with support for
	     * partial deep comparisons.
	     *
	     * @private
	     * @param {Object} object The object to compare.
	     * @param {Object} other The other object to compare.
	     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	     * @param {Function} customizer The function to customize comparisons.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Object} stack Tracks traversed `object` and `other` objects.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */
                    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
                        var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
                        if (objLength != othLength && !isPartial) return !1;
                        for (var index = objLength; index--; ) {
                            var key = objProps[index];
                            if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) return !1;
                        }
                        // Assume cyclic values are equal.
                        var stacked = stack.get(object);
                        if (stacked && stack.get(other)) return stacked == other;
                        var result = !0;
                        stack.set(object, other), stack.set(other, object);
                        for (var skipCtor = isPartial; ++index < objLength; ) {
                            key = objProps[index];
                            var objValue = object[key], othValue = other[key];
                            if (customizer) var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
                            // Recursively compare objects (susceptible to call stack limits).
                            if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
                                result = !1;
                                break;
                            }
                            skipCtor || (skipCtor = "constructor" == key);
                        }
                        if (result && !skipCtor) {
                            var objCtor = object.constructor, othCtor = other.constructor;
                            // Non `Object` object instances with different constructors are not equal.
                            objCtor != othCtor && "constructor" in object && "constructor" in other && !("function" == typeof objCtor && objCtor instanceof objCtor && "function" == typeof othCtor && othCtor instanceof othCtor) && (result = !1);
                        }
                        return stack.delete(object), stack.delete(other), result;
                    }
                    /**
	     * A specialized version of `baseRest` which flattens the rest array.
	     *
	     * @private
	     * @param {Function} func The function to apply a rest parameter to.
	     * @returns {Function} Returns the new function.
	     */
                    function flatRest(func) {
                        return setToString(overRest(func, undefined, flatten), func + "");
                    }
                    /**
	     * Creates an array of own enumerable property names and symbols of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names and symbols.
	     */
                    function getAllKeys(object) {
                        return baseGetAllKeys(object, keys, getSymbols);
                    }
                    /**
	     * Creates an array of own and inherited enumerable property names and
	     * symbols of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names and symbols.
	     */
                    function getAllKeysIn(object) {
                        return baseGetAllKeys(object, keysIn, getSymbolsIn);
                    }
                    /**
	     * Gets the name of `func`.
	     *
	     * @private
	     * @param {Function} func The function to query.
	     * @returns {string} Returns the function name.
	     */
                    function getFuncName(func) {
                        for (var result = func.name + "", array = realNames[result], length = hasOwnProperty.call(realNames, result) ? array.length : 0; length--; ) {
                            var data = array[length], otherFunc = data.func;
                            if (null == otherFunc || otherFunc == func) return data.name;
                        }
                        return result;
                    }
                    /**
	     * Gets the argument placeholder value for `func`.
	     *
	     * @private
	     * @param {Function} func The function to inspect.
	     * @returns {*} Returns the placeholder value.
	     */
                    function getHolder(func) {
                        var object = hasOwnProperty.call(lodash, "placeholder") ? lodash : func;
                        return object.placeholder;
                    }
                    /**
	     * Gets the appropriate "iteratee" function. If `_.iteratee` is customized,
	     * this function returns the custom method, otherwise it returns `baseIteratee`.
	     * If arguments are provided, the chosen function is invoked with them and
	     * its result is returned.
	     *
	     * @private
	     * @param {*} [value] The value to convert to an iteratee.
	     * @param {number} [arity] The arity of the created iteratee.
	     * @returns {Function} Returns the chosen function or its result.
	     */
                    function getIteratee() {
                        var result = lodash.iteratee || iteratee;
                        return result = result === iteratee ? baseIteratee : result, arguments.length ? result(arguments[0], arguments[1]) : result;
                    }
                    /**
	     * Gets the data for `map`.
	     *
	     * @private
	     * @param {Object} map The map to query.
	     * @param {string} key The reference key.
	     * @returns {*} Returns the map data.
	     */
                    function getMapData(map, key) {
                        var data = map.__data__;
                        return isKeyable(key) ? data["string" == typeof key ? "string" : "hash"] : data.map;
                    }
                    /**
	     * Gets the property names, values, and compare flags of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the match data of `object`.
	     */
                    function getMatchData(object) {
                        for (var result = keys(object), length = result.length; length--; ) {
                            var key = result[length], value = object[key];
                            result[length] = [ key, value, isStrictComparable(value) ];
                        }
                        return result;
                    }
                    /**
	     * Gets the native function at `key` of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {string} key The key of the method to get.
	     * @returns {*} Returns the function if it's native, else `undefined`.
	     */
                    function getNative(object, key) {
                        var value = getValue(object, key);
                        return baseIsNative(value) ? value : undefined;
                    }
                    /**
	     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	     *
	     * @private
	     * @param {*} value The value to query.
	     * @returns {string} Returns the raw `toStringTag`.
	     */
                    function getRawTag(value) {
                        var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
                        try {
                            value[symToStringTag] = undefined;
                            var unmasked = !0;
                        } catch (e) {}
                        var result = nativeObjectToString.call(value);
                        return unmasked && (isOwn ? value[symToStringTag] = tag : delete value[symToStringTag]), 
                        result;
                    }
                    /**
	     * Gets the view, applying any `transforms` to the `start` and `end` positions.
	     *
	     * @private
	     * @param {number} start The start of the view.
	     * @param {number} end The end of the view.
	     * @param {Array} transforms The transformations to apply to the view.
	     * @returns {Object} Returns an object containing the `start` and `end`
	     *  positions of the view.
	     */
                    function getView(start, end, transforms) {
                        for (var index = -1, length = transforms.length; ++index < length; ) {
                            var data = transforms[index], size = data.size;
                            switch (data.type) {
                              case "drop":
                                start += size;
                                break;

                              case "dropRight":
                                end -= size;
                                break;

                              case "take":
                                end = nativeMin(end, start + size);
                                break;

                              case "takeRight":
                                start = nativeMax(start, end - size);
                            }
                        }
                        return {
                            start: start,
                            end: end
                        };
                    }
                    /**
	     * Extracts wrapper details from the `source` body comment.
	     *
	     * @private
	     * @param {string} source The source to inspect.
	     * @returns {Array} Returns the wrapper details.
	     */
                    function getWrapDetails(source) {
                        var match = source.match(reWrapDetails);
                        return match ? match[1].split(reSplitDetails) : [];
                    }
                    /**
	     * Checks if `path` exists on `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path to check.
	     * @param {Function} hasFunc The function to check properties.
	     * @returns {boolean} Returns `true` if `path` exists, else `false`.
	     */
                    function hasPath(object, path, hasFunc) {
                        path = castPath(path, object);
                        for (var index = -1, length = path.length, result = !1; ++index < length; ) {
                            var key = toKey(path[index]);
                            if (!(result = null != object && hasFunc(object, key))) break;
                            object = object[key];
                        }
                        return result || ++index != length ? result : (length = null == object ? 0 : object.length, 
                        !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object)));
                    }
                    /**
	     * Initializes an array clone.
	     *
	     * @private
	     * @param {Array} array The array to clone.
	     * @returns {Array} Returns the initialized clone.
	     */
                    function initCloneArray(array) {
                        var length = array.length, result = array.constructor(length);
                        // Add properties assigned by `RegExp#exec`.
                        return length && "string" == typeof array[0] && hasOwnProperty.call(array, "index") && (result.index = array.index, 
                        result.input = array.input), result;
                    }
                    /**
	     * Initializes an object clone.
	     *
	     * @private
	     * @param {Object} object The object to clone.
	     * @returns {Object} Returns the initialized clone.
	     */
                    function initCloneObject(object) {
                        return "function" != typeof object.constructor || isPrototype(object) ? {} : baseCreate(getPrototype(object));
                    }
                    /**
	     * Initializes an object clone based on its `toStringTag`.
	     *
	     * **Note:** This function only supports cloning values with tags of
	     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	     *
	     * @private
	     * @param {Object} object The object to clone.
	     * @param {string} tag The `toStringTag` of the object to clone.
	     * @param {Function} cloneFunc The function to clone values.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @returns {Object} Returns the initialized clone.
	     */
                    function initCloneByTag(object, tag, cloneFunc, isDeep) {
                        var Ctor = object.constructor;
                        switch (tag) {
                          case arrayBufferTag:
                            return cloneArrayBuffer(object);

                          case boolTag:
                          case dateTag:
                            return new Ctor(+object);

                          case dataViewTag:
                            return cloneDataView(object, isDeep);

                          case float32Tag:
                          case float64Tag:
                          case int8Tag:
                          case int16Tag:
                          case int32Tag:
                          case uint8Tag:
                          case uint8ClampedTag:
                          case uint16Tag:
                          case uint32Tag:
                            return cloneTypedArray(object, isDeep);

                          case mapTag:
                            return cloneMap(object, isDeep, cloneFunc);

                          case numberTag:
                          case stringTag:
                            return new Ctor(object);

                          case regexpTag:
                            return cloneRegExp(object);

                          case setTag:
                            return cloneSet(object, isDeep, cloneFunc);

                          case symbolTag:
                            return cloneSymbol(object);
                        }
                    }
                    /**
	     * Inserts wrapper `details` in a comment at the top of the `source` body.
	     *
	     * @private
	     * @param {string} source The source to modify.
	     * @returns {Array} details The details to insert.
	     * @returns {string} Returns the modified source.
	     */
                    function insertWrapDetails(source, details) {
                        var length = details.length;
                        if (!length) return source;
                        var lastIndex = length - 1;
                        return details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex], details = details.join(length > 2 ? ", " : " "), 
                        source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
                    }
                    /**
	     * Checks if `value` is a flattenable `arguments` object or array.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	     */
                    function isFlattenable(value) {
                        return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
                    }
                    /**
	     * Checks if `value` is a valid array-like index.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	     */
                    function isIndex(value, length) {
                        return length = null == length ? MAX_SAFE_INTEGER : length, !!length && ("number" == typeof value || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
                    }
                    /**
	     * Checks if the given arguments are from an iteratee call.
	     *
	     * @private
	     * @param {*} value The potential iteratee value argument.
	     * @param {*} index The potential iteratee index or key argument.
	     * @param {*} object The potential iteratee object argument.
	     * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	     *  else `false`.
	     */
                    function isIterateeCall(value, index, object) {
                        if (!isObject(object)) return !1;
                        var type = typeof index;
                        return !!("number" == type ? isArrayLike(object) && isIndex(index, object.length) : "string" == type && index in object) && eq(object[index], value);
                    }
                    /**
	     * Checks if `value` is a property name and not a property path.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @param {Object} [object] The object to query keys on.
	     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	     */
                    function isKey(value, object) {
                        if (isArray(value)) return !1;
                        var type = typeof value;
                        return !("number" != type && "symbol" != type && "boolean" != type && null != value && !isSymbol(value)) || (reIsPlainProp.test(value) || !reIsDeepProp.test(value) || null != object && value in Object(object));
                    }
                    /**
	     * Checks if `value` is suitable for use as unique object key.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	     */
                    function isKeyable(value) {
                        var type = typeof value;
                        return "string" == type || "number" == type || "symbol" == type || "boolean" == type ? "__proto__" !== value : null === value;
                    }
                    /**
	     * Checks if `func` has a lazy counterpart.
	     *
	     * @private
	     * @param {Function} func The function to check.
	     * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
	     *  else `false`.
	     */
                    function isLaziable(func) {
                        var funcName = getFuncName(func), other = lodash[funcName];
                        if ("function" != typeof other || !(funcName in LazyWrapper.prototype)) return !1;
                        if (func === other) return !0;
                        var data = getData(other);
                        return !!data && func === data[0];
                    }
                    /**
	     * Checks if `func` has its source masked.
	     *
	     * @private
	     * @param {Function} func The function to check.
	     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	     */
                    function isMasked(func) {
                        return !!maskSrcKey && maskSrcKey in func;
                    }
                    /**
	     * Checks if `value` is likely a prototype object.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	     */
                    function isPrototype(value) {
                        var Ctor = value && value.constructor, proto = "function" == typeof Ctor && Ctor.prototype || objectProto;
                        return value === proto;
                    }
                    /**
	     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` if suitable for strict
	     *  equality comparisons, else `false`.
	     */
                    function isStrictComparable(value) {
                        return value === value && !isObject(value);
                    }
                    /**
	     * A specialized version of `matchesProperty` for source values suitable
	     * for strict equality comparisons, i.e. `===`.
	     *
	     * @private
	     * @param {string} key The key of the property to get.
	     * @param {*} srcValue The value to match.
	     * @returns {Function} Returns the new spec function.
	     */
                    function matchesStrictComparable(key, srcValue) {
                        return function(object) {
                            return null != object && (object[key] === srcValue && (srcValue !== undefined || key in Object(object)));
                        };
                    }
                    /**
	     * A specialized version of `_.memoize` which clears the memoized function's
	     * cache when it exceeds `MAX_MEMOIZE_SIZE`.
	     *
	     * @private
	     * @param {Function} func The function to have its output memoized.
	     * @returns {Function} Returns the new memoized function.
	     */
                    function memoizeCapped(func) {
                        var result = memoize(func, function(key) {
                            return cache.size === MAX_MEMOIZE_SIZE && cache.clear(), key;
                        }), cache = result.cache;
                        return result;
                    }
                    /**
	     * Merges the function metadata of `source` into `data`.
	     *
	     * Merging metadata reduces the number of wrappers used to invoke a function.
	     * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
	     * may be applied regardless of execution order. Methods like `_.ary` and
	     * `_.rearg` modify function arguments, making the order in which they are
	     * executed important, preventing the merging of metadata. However, we make
	     * an exception for a safe combined case where curried functions have `_.ary`
	     * and or `_.rearg` applied.
	     *
	     * @private
	     * @param {Array} data The destination metadata.
	     * @param {Array} source The source metadata.
	     * @returns {Array} Returns `data`.
	     */
                    function mergeData(data, source) {
                        var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG), isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
                        // Exit early if metadata can't be merged.
                        if (!isCommon && !isCombo) return data;
                        // Use source `thisArg` if available.
                        srcBitmask & WRAP_BIND_FLAG && (data[2] = source[2], // Set when currying a bound function.
                        newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG);
                        // Compose partial arguments.
                        var value = source[3];
                        if (value) {
                            var partials = data[3];
                            data[3] = partials ? composeArgs(partials, value, source[4]) : value, data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
                        }
                        // Compose partial right arguments.
                        // Use source `argPos` if available.
                        // Use source `ary` if it's smaller.
                        // Use source `arity` if one is not provided.
                        // Use source `func` and merge bitmasks.
                        return value = source[5], value && (partials = data[5], data[5] = partials ? composeArgsRight(partials, value, source[6]) : value, 
                        data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6]), value = source[7], 
                        value && (data[7] = value), srcBitmask & WRAP_ARY_FLAG && (data[8] = null == data[8] ? source[8] : nativeMin(data[8], source[8])), 
                        null == data[9] && (data[9] = source[9]), data[0] = source[0], data[1] = newBitmask, 
                        data;
                    }
                    /**
	     * This function is like
	     * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	     * except that it includes inherited enumerable properties.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     */
                    function nativeKeysIn(object) {
                        var result = [];
                        if (null != object) for (var key in Object(object)) result.push(key);
                        return result;
                    }
                    /**
	     * Converts `value` to a string using `Object.prototype.toString`.
	     *
	     * @private
	     * @param {*} value The value to convert.
	     * @returns {string} Returns the converted string.
	     */
                    function objectToString(value) {
                        return nativeObjectToString.call(value);
                    }
                    /**
	     * A specialized version of `baseRest` which transforms the rest array.
	     *
	     * @private
	     * @param {Function} func The function to apply a rest parameter to.
	     * @param {number} [start=func.length-1] The start position of the rest parameter.
	     * @param {Function} transform The rest array transform.
	     * @returns {Function} Returns the new function.
	     */
                    function overRest(func, start, transform) {
                        return start = nativeMax(start === undefined ? func.length - 1 : start, 0), function() {
                            for (var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length); ++index < length; ) array[index] = args[start + index];
                            index = -1;
                            for (var otherArgs = Array(start + 1); ++index < start; ) otherArgs[index] = args[index];
                            return otherArgs[start] = transform(array), apply(func, this, otherArgs);
                        };
                    }
                    /**
	     * Gets the parent value at `path` of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array} path The path to get the parent value of.
	     * @returns {*} Returns the parent value.
	     */
                    function parent(object, path) {
                        return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
                    }
                    /**
	     * Reorder `array` according to the specified indexes where the element at
	     * the first index is assigned as the first element, the element at
	     * the second index is assigned as the second element, and so on.
	     *
	     * @private
	     * @param {Array} array The array to reorder.
	     * @param {Array} indexes The arranged array indexes.
	     * @returns {Array} Returns `array`.
	     */
                    function reorder(array, indexes) {
                        for (var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array); length--; ) {
                            var index = indexes[length];
                            array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
                        }
                        return array;
                    }
                    /**
	     * Sets the `toString` method of `wrapper` to mimic the source of `reference`
	     * with wrapper details in a comment at the top of the source body.
	     *
	     * @private
	     * @param {Function} wrapper The function to modify.
	     * @param {Function} reference The reference function.
	     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	     * @returns {Function} Returns `wrapper`.
	     */
                    function setWrapToString(wrapper, reference, bitmask) {
                        var source = reference + "";
                        return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
                    }
                    /**
	     * Creates a function that'll short out and invoke `identity` instead
	     * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
	     * milliseconds.
	     *
	     * @private
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new shortable function.
	     */
                    function shortOut(func) {
                        var count = 0, lastCalled = 0;
                        return function() {
                            var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
                            if (lastCalled = stamp, remaining > 0) {
                                if (++count >= HOT_COUNT) return arguments[0];
                            } else count = 0;
                            return func.apply(undefined, arguments);
                        };
                    }
                    /**
	     * A specialized version of `_.shuffle` which mutates and sets the size of `array`.
	     *
	     * @private
	     * @param {Array} array The array to shuffle.
	     * @param {number} [size=array.length] The size of `array`.
	     * @returns {Array} Returns `array`.
	     */
                    function shuffleSelf(array, size) {
                        var index = -1, length = array.length, lastIndex = length - 1;
                        for (size = size === undefined ? length : size; ++index < size; ) {
                            var rand = baseRandom(index, lastIndex), value = array[rand];
                            array[rand] = array[index], array[index] = value;
                        }
                        return array.length = size, array;
                    }
                    /**
	     * Converts `value` to a string key if it's not a string or symbol.
	     *
	     * @private
	     * @param {*} value The value to inspect.
	     * @returns {string|symbol} Returns the key.
	     */
                    function toKey(value) {
                        if ("string" == typeof value || isSymbol(value)) return value;
                        var result = value + "";
                        return "0" == result && 1 / value == -INFINITY ? "-0" : result;
                    }
                    /**
	     * Converts `func` to its source code.
	     *
	     * @private
	     * @param {Function} func The function to convert.
	     * @returns {string} Returns the source code.
	     */
                    function toSource(func) {
                        if (null != func) {
                            try {
                                return funcToString.call(func);
                            } catch (e) {}
                            try {
                                return func + "";
                            } catch (e) {}
                        }
                        return "";
                    }
                    /**
	     * Updates wrapper `details` based on `bitmask` flags.
	     *
	     * @private
	     * @returns {Array} details The details to modify.
	     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	     * @returns {Array} Returns `details`.
	     */
                    function updateWrapDetails(details, bitmask) {
                        return arrayEach(wrapFlags, function(pair) {
                            var value = "_." + pair[0];
                            bitmask & pair[1] && !arrayIncludes(details, value) && details.push(value);
                        }), details.sort();
                    }
                    /**
	     * Creates a clone of `wrapper`.
	     *
	     * @private
	     * @param {Object} wrapper The wrapper to clone.
	     * @returns {Object} Returns the cloned wrapper.
	     */
                    function wrapperClone(wrapper) {
                        if (wrapper instanceof LazyWrapper) return wrapper.clone();
                        var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
                        return result.__actions__ = copyArray(wrapper.__actions__), result.__index__ = wrapper.__index__, 
                        result.__values__ = wrapper.__values__, result;
                    }
                    /*------------------------------------------------------------------------*/
                    /**
	     * Creates an array of elements split into groups the length of `size`.
	     * If `array` can't be split evenly, the final chunk will be the remaining
	     * elements.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Array
	     * @param {Array} array The array to process.
	     * @param {number} [size=1] The length of each chunk
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {Array} Returns the new array of chunks.
	     * @example
	     *
	     * _.chunk(['a', 'b', 'c', 'd'], 2);
	     * // => [['a', 'b'], ['c', 'd']]
	     *
	     * _.chunk(['a', 'b', 'c', 'd'], 3);
	     * // => [['a', 'b', 'c'], ['d']]
	     */
                    function chunk(array, size, guard) {
                        size = (guard ? isIterateeCall(array, size, guard) : size === undefined) ? 1 : nativeMax(toInteger(size), 0);
                        var length = null == array ? 0 : array.length;
                        if (!length || size < 1) return [];
                        for (var index = 0, resIndex = 0, result = Array(nativeCeil(length / size)); index < length; ) result[resIndex++] = baseSlice(array, index, index += size);
                        return result;
                    }
                    /**
	     * Creates an array with all falsey values removed. The values `false`, `null`,
	     * `0`, `""`, `undefined`, and `NaN` are falsey.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Array
	     * @param {Array} array The array to compact.
	     * @returns {Array} Returns the new array of filtered values.
	     * @example
	     *
	     * _.compact([0, 1, false, 2, '', 3]);
	     * // => [1, 2, 3]
	     */
                    function compact(array) {
                        for (var index = -1, length = null == array ? 0 : array.length, resIndex = 0, result = []; ++index < length; ) {
                            var value = array[index];
                            value && (result[resIndex++] = value);
                        }
                        return result;
                    }
                    /**
	     * Creates a new array concatenating `array` with any additional arrays
	     * and/or values.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The array to concatenate.
	     * @param {...*} [values] The values to concatenate.
	     * @returns {Array} Returns the new concatenated array.
	     * @example
	     *
	     * var array = [1];
	     * var other = _.concat(array, 2, [3], [[4]]);
	     *
	     * console.log(other);
	     * // => [1, 2, 3, [4]]
	     *
	     * console.log(array);
	     * // => [1]
	     */
                    function concat() {
                        var length = arguments.length;
                        if (!length) return [];
                        for (var args = Array(length - 1), array = arguments[0], index = length; index--; ) args[index - 1] = arguments[index];
                        return arrayPush(isArray(array) ? copyArray(array) : [ array ], baseFlatten(args, 1));
                    }
                    /**
	     * Creates a slice of `array` with `n` elements dropped from the beginning.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.5.0
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to drop.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.drop([1, 2, 3]);
	     * // => [2, 3]
	     *
	     * _.drop([1, 2, 3], 2);
	     * // => [3]
	     *
	     * _.drop([1, 2, 3], 5);
	     * // => []
	     *
	     * _.drop([1, 2, 3], 0);
	     * // => [1, 2, 3]
	     */
                    function drop(array, n, guard) {
                        var length = null == array ? 0 : array.length;
                        return length ? (n = guard || n === undefined ? 1 : toInteger(n), baseSlice(array, n < 0 ? 0 : n, length)) : [];
                    }
                    /**
	     * Creates a slice of `array` with `n` elements dropped from the end.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to drop.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.dropRight([1, 2, 3]);
	     * // => [1, 2]
	     *
	     * _.dropRight([1, 2, 3], 2);
	     * // => [1]
	     *
	     * _.dropRight([1, 2, 3], 5);
	     * // => []
	     *
	     * _.dropRight([1, 2, 3], 0);
	     * // => [1, 2, 3]
	     */
                    function dropRight(array, n, guard) {
                        var length = null == array ? 0 : array.length;
                        return length ? (n = guard || n === undefined ? 1 : toInteger(n), n = length - n, 
                        baseSlice(array, 0, n < 0 ? 0 : n)) : [];
                    }
                    /**
	     * Creates a slice of `array` excluding elements dropped from the end.
	     * Elements are dropped until `predicate` returns falsey. The predicate is
	     * invoked with three arguments: (value, index, array).
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': true },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': false }
	     * ];
	     *
	     * _.dropRightWhile(users, function(o) { return !o.active; });
	     * // => objects for ['barney']
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
	     * // => objects for ['barney', 'fred']
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.dropRightWhile(users, ['active', false]);
	     * // => objects for ['barney']
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.dropRightWhile(users, 'active');
	     * // => objects for ['barney', 'fred', 'pebbles']
	     */
                    function dropRightWhile(array, predicate) {
                        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), !0, !0) : [];
                    }
                    /**
	     * Creates a slice of `array` excluding elements dropped from the beginning.
	     * Elements are dropped until `predicate` returns falsey. The predicate is
	     * invoked with three arguments: (value, index, array).
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': false },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': true }
	     * ];
	     *
	     * _.dropWhile(users, function(o) { return !o.active; });
	     * // => objects for ['pebbles']
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.dropWhile(users, { 'user': 'barney', 'active': false });
	     * // => objects for ['fred', 'pebbles']
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.dropWhile(users, ['active', false]);
	     * // => objects for ['pebbles']
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.dropWhile(users, 'active');
	     * // => objects for ['barney', 'fred', 'pebbles']
	     */
                    function dropWhile(array, predicate) {
                        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), !0) : [];
                    }
                    /**
	     * Fills elements of `array` with `value` from `start` up to, but not
	     * including, `end`.
	     *
	     * **Note:** This method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.2.0
	     * @category Array
	     * @param {Array} array The array to fill.
	     * @param {*} value The value to fill `array` with.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = [1, 2, 3];
	     *
	     * _.fill(array, 'a');
	     * console.log(array);
	     * // => ['a', 'a', 'a']
	     *
	     * _.fill(Array(3), 2);
	     * // => [2, 2, 2]
	     *
	     * _.fill([4, 6, 8, 10], '*', 1, 3);
	     * // => [4, '*', '*', 10]
	     */
                    function fill(array, value, start, end) {
                        var length = null == array ? 0 : array.length;
                        return length ? (start && "number" != typeof start && isIterateeCall(array, value, start) && (start = 0, 
                        end = length), baseFill(array, value, start, end)) : [];
                    }
                    /**
	     * This method is like `_.find` except that it returns the index of the first
	     * element `predicate` returns truthy for instead of the element itself.
	     *
	     * @static
	     * @memberOf _
	     * @since 1.1.0
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @param {number} [fromIndex=0] The index to search from.
	     * @returns {number} Returns the index of the found element, else `-1`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': false },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': true }
	     * ];
	     *
	     * _.findIndex(users, function(o) { return o.user == 'barney'; });
	     * // => 0
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.findIndex(users, { 'user': 'fred', 'active': false });
	     * // => 1
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.findIndex(users, ['active', false]);
	     * // => 0
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.findIndex(users, 'active');
	     * // => 2
	     */
                    function findIndex(array, predicate, fromIndex) {
                        var length = null == array ? 0 : array.length;
                        if (!length) return -1;
                        var index = null == fromIndex ? 0 : toInteger(fromIndex);
                        return index < 0 && (index = nativeMax(length + index, 0)), baseFindIndex(array, getIteratee(predicate, 3), index);
                    }
                    /**
	     * This method is like `_.findIndex` except that it iterates over elements
	     * of `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.0.0
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @param {number} [fromIndex=array.length-1] The index to search from.
	     * @returns {number} Returns the index of the found element, else `-1`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': true },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': false }
	     * ];
	     *
	     * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
	     * // => 2
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.findLastIndex(users, { 'user': 'barney', 'active': true });
	     * // => 0
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.findLastIndex(users, ['active', false]);
	     * // => 2
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.findLastIndex(users, 'active');
	     * // => 0
	     */
                    function findLastIndex(array, predicate, fromIndex) {
                        var length = null == array ? 0 : array.length;
                        if (!length) return -1;
                        var index = length - 1;
                        return fromIndex !== undefined && (index = toInteger(fromIndex), index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1)), 
                        baseFindIndex(array, getIteratee(predicate, 3), index, !0);
                    }
                    /**
	     * Flattens `array` a single level deep.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Array
	     * @param {Array} array The array to flatten.
	     * @returns {Array} Returns the new flattened array.
	     * @example
	     *
	     * _.flatten([1, [2, [3, [4]], 5]]);
	     * // => [1, 2, [3, [4]], 5]
	     */
                    function flatten(array) {
                        var length = null == array ? 0 : array.length;
                        return length ? baseFlatten(array, 1) : [];
                    }
                    /**
	     * Recursively flattens `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Array
	     * @param {Array} array The array to flatten.
	     * @returns {Array} Returns the new flattened array.
	     * @example
	     *
	     * _.flattenDeep([1, [2, [3, [4]], 5]]);
	     * // => [1, 2, 3, 4, 5]
	     */
                    function flattenDeep(array) {
                        var length = null == array ? 0 : array.length;
                        return length ? baseFlatten(array, INFINITY) : [];
                    }
                    /**
	     * Recursively flatten `array` up to `depth` times.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.4.0
	     * @category Array
	     * @param {Array} array The array to flatten.
	     * @param {number} [depth=1] The maximum recursion depth.
	     * @returns {Array} Returns the new flattened array.
	     * @example
	     *
	     * var array = [1, [2, [3, [4]], 5]];
	     *
	     * _.flattenDepth(array, 1);
	     * // => [1, 2, [3, [4]], 5]
	     *
	     * _.flattenDepth(array, 2);
	     * // => [1, 2, 3, [4], 5]
	     */
                    function flattenDepth(array, depth) {
                        var length = null == array ? 0 : array.length;
                        return length ? (depth = depth === undefined ? 1 : toInteger(depth), baseFlatten(array, depth)) : [];
                    }
                    /**
	     * The inverse of `_.toPairs`; this method returns an object composed
	     * from key-value `pairs`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} pairs The key-value pairs.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * _.fromPairs([['a', 1], ['b', 2]]);
	     * // => { 'a': 1, 'b': 2 }
	     */
                    function fromPairs(pairs) {
                        for (var index = -1, length = null == pairs ? 0 : pairs.length, result = {}; ++index < length; ) {
                            var pair = pairs[index];
                            result[pair[0]] = pair[1];
                        }
                        return result;
                    }
                    /**
	     * Gets the first element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @alias first
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {*} Returns the first element of `array`.
	     * @example
	     *
	     * _.head([1, 2, 3]);
	     * // => 1
	     *
	     * _.head([]);
	     * // => undefined
	     */
                    function head(array) {
                        return array && array.length ? array[0] : undefined;
                    }
                    /**
	     * Gets the index at which the first occurrence of `value` is found in `array`
	     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	     * for equality comparisons. If `fromIndex` is negative, it's used as the
	     * offset from the end of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {*} value The value to search for.
	     * @param {number} [fromIndex=0] The index to search from.
	     * @returns {number} Returns the index of the matched value, else `-1`.
	     * @example
	     *
	     * _.indexOf([1, 2, 1, 2], 2);
	     * // => 1
	     *
	     * // Search from the `fromIndex`.
	     * _.indexOf([1, 2, 1, 2], 2, 2);
	     * // => 3
	     */
                    function indexOf(array, value, fromIndex) {
                        var length = null == array ? 0 : array.length;
                        if (!length) return -1;
                        var index = null == fromIndex ? 0 : toInteger(fromIndex);
                        return index < 0 && (index = nativeMax(length + index, 0)), baseIndexOf(array, value, index);
                    }
                    /**
	     * Gets all but the last element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.initial([1, 2, 3]);
	     * // => [1, 2]
	     */
                    function initial(array) {
                        var length = null == array ? 0 : array.length;
                        return length ? baseSlice(array, 0, -1) : [];
                    }
                    /**
	     * Converts all elements in `array` into a string separated by `separator`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The array to convert.
	     * @param {string} [separator=','] The element separator.
	     * @returns {string} Returns the joined string.
	     * @example
	     *
	     * _.join(['a', 'b', 'c'], '~');
	     * // => 'a~b~c'
	     */
                    function join(array, separator) {
                        return null == array ? "" : nativeJoin.call(array, separator);
                    }
                    /**
	     * Gets the last element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {*} Returns the last element of `array`.
	     * @example
	     *
	     * _.last([1, 2, 3]);
	     * // => 3
	     */
                    function last(array) {
                        var length = null == array ? 0 : array.length;
                        return length ? array[length - 1] : undefined;
                    }
                    /**
	     * This method is like `_.indexOf` except that it iterates over elements of
	     * `array` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {*} value The value to search for.
	     * @param {number} [fromIndex=array.length-1] The index to search from.
	     * @returns {number} Returns the index of the matched value, else `-1`.
	     * @example
	     *
	     * _.lastIndexOf([1, 2, 1, 2], 2);
	     * // => 3
	     *
	     * // Search from the `fromIndex`.
	     * _.lastIndexOf([1, 2, 1, 2], 2, 2);
	     * // => 1
	     */
                    function lastIndexOf(array, value, fromIndex) {
                        var length = null == array ? 0 : array.length;
                        if (!length) return -1;
                        var index = length;
                        return fromIndex !== undefined && (index = toInteger(fromIndex), index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1)), 
                        value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, !0);
                    }
                    /**
	     * Gets the element at index `n` of `array`. If `n` is negative, the nth
	     * element from the end is returned.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.11.0
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=0] The index of the element to return.
	     * @returns {*} Returns the nth element of `array`.
	     * @example
	     *
	     * var array = ['a', 'b', 'c', 'd'];
	     *
	     * _.nth(array, 1);
	     * // => 'b'
	     *
	     * _.nth(array, -2);
	     * // => 'c';
	     */
                    function nth(array, n) {
                        return array && array.length ? baseNth(array, toInteger(n)) : undefined;
                    }
                    /**
	     * This method is like `_.pull` except that it accepts an array of values to remove.
	     *
	     * **Note:** Unlike `_.difference`, this method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {Array} values The values to remove.
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
	     *
	     * _.pullAll(array, ['a', 'c']);
	     * console.log(array);
	     * // => ['b', 'b']
	     */
                    function pullAll(array, values) {
                        return array && array.length && values && values.length ? basePullAll(array, values) : array;
                    }
                    /**
	     * This method is like `_.pullAll` except that it accepts `iteratee` which is
	     * invoked for each element of `array` and `values` to generate the criterion
	     * by which they're compared. The iteratee is invoked with one argument: (value).
	     *
	     * **Note:** Unlike `_.differenceBy`, this method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {Array} values The values to remove.
	     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
	     *
	     * _.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
	     * console.log(array);
	     * // => [{ 'x': 2 }]
	     */
                    function pullAllBy(array, values, iteratee) {
                        return array && array.length && values && values.length ? basePullAll(array, values, getIteratee(iteratee, 2)) : array;
                    }
                    /**
	     * This method is like `_.pullAll` except that it accepts `comparator` which
	     * is invoked to compare elements of `array` to `values`. The comparator is
	     * invoked with two arguments: (arrVal, othVal).
	     *
	     * **Note:** Unlike `_.differenceWith`, this method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.6.0
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {Array} values The values to remove.
	     * @param {Function} [comparator] The comparator invoked per element.
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
	     *
	     * _.pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
	     * console.log(array);
	     * // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
	     */
                    function pullAllWith(array, values, comparator) {
                        return array && array.length && values && values.length ? basePullAll(array, values, undefined, comparator) : array;
                    }
                    /**
	     * Removes all elements from `array` that `predicate` returns truthy for
	     * and returns an array of the removed elements. The predicate is invoked
	     * with three arguments: (value, index, array).
	     *
	     * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
	     * to pull elements from an array by value.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.0.0
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the new array of removed elements.
	     * @example
	     *
	     * var array = [1, 2, 3, 4];
	     * var evens = _.remove(array, function(n) {
	     *   return n % 2 == 0;
	     * });
	     *
	     * console.log(array);
	     * // => [1, 3]
	     *
	     * console.log(evens);
	     * // => [2, 4]
	     */
                    function remove(array, predicate) {
                        var result = [];
                        if (!array || !array.length) return result;
                        var index = -1, indexes = [], length = array.length;
                        for (predicate = getIteratee(predicate, 3); ++index < length; ) {
                            var value = array[index];
                            predicate(value, index, array) && (result.push(value), indexes.push(index));
                        }
                        return basePullAt(array, indexes), result;
                    }
                    /**
	     * Reverses `array` so that the first element becomes the last, the second
	     * element becomes the second to last, and so on.
	     *
	     * **Note:** This method mutates `array` and is based on
	     * [`Array#reverse`](https://mdn.io/Array/reverse).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = [1, 2, 3];
	     *
	     * _.reverse(array);
	     * // => [3, 2, 1]
	     *
	     * console.log(array);
	     * // => [3, 2, 1]
	     */
                    function reverse(array) {
                        return null == array ? array : nativeReverse.call(array);
                    }
                    /**
	     * Creates a slice of `array` from `start` up to, but not including, `end`.
	     *
	     * **Note:** This method is used instead of
	     * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
	     * returned.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Array
	     * @param {Array} array The array to slice.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns the slice of `array`.
	     */
                    function slice(array, start, end) {
                        var length = null == array ? 0 : array.length;
                        return length ? (end && "number" != typeof end && isIterateeCall(array, start, end) ? (start = 0, 
                        end = length) : (start = null == start ? 0 : toInteger(start), end = end === undefined ? length : toInteger(end)), 
                        baseSlice(array, start, end)) : [];
                    }
                    /**
	     * Uses a binary search to determine the lowest index at which `value`
	     * should be inserted into `array` in order to maintain its sort order.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Array
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     * @example
	     *
	     * _.sortedIndex([30, 50], 40);
	     * // => 1
	     */
                    function sortedIndex(array, value) {
                        return baseSortedIndex(array, value);
                    }
                    /**
	     * This method is like `_.sortedIndex` except that it accepts `iteratee`
	     * which is invoked for `value` and each element of `array` to compute their
	     * sort ranking. The iteratee is invoked with one argument: (value).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     * @example
	     *
	     * var objects = [{ 'x': 4 }, { 'x': 5 }];
	     *
	     * _.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
	     * // => 0
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.sortedIndexBy(objects, { 'x': 4 }, 'x');
	     * // => 0
	     */
                    function sortedIndexBy(array, value, iteratee) {
                        return baseSortedIndexBy(array, value, getIteratee(iteratee, 2));
                    }
                    /**
	     * This method is like `_.indexOf` except that it performs a binary
	     * search on a sorted `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {*} value The value to search for.
	     * @returns {number} Returns the index of the matched value, else `-1`.
	     * @example
	     *
	     * _.sortedIndexOf([4, 5, 5, 5, 6], 5);
	     * // => 1
	     */
                    function sortedIndexOf(array, value) {
                        var length = null == array ? 0 : array.length;
                        if (length) {
                            var index = baseSortedIndex(array, value);
                            if (index < length && eq(array[index], value)) return index;
                        }
                        return -1;
                    }
                    /**
	     * This method is like `_.sortedIndex` except that it returns the highest
	     * index at which `value` should be inserted into `array` in order to
	     * maintain its sort order.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Array
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     * @example
	     *
	     * _.sortedLastIndex([4, 5, 5, 5, 6], 5);
	     * // => 4
	     */
                    function sortedLastIndex(array, value) {
                        return baseSortedIndex(array, value, !0);
                    }
                    /**
	     * This method is like `_.sortedLastIndex` except that it accepts `iteratee`
	     * which is invoked for `value` and each element of `array` to compute their
	     * sort ranking. The iteratee is invoked with one argument: (value).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     * @example
	     *
	     * var objects = [{ 'x': 4 }, { 'x': 5 }];
	     *
	     * _.sortedLastIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
	     * // => 1
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.sortedLastIndexBy(objects, { 'x': 4 }, 'x');
	     * // => 1
	     */
                    function sortedLastIndexBy(array, value, iteratee) {
                        return baseSortedIndexBy(array, value, getIteratee(iteratee, 2), !0);
                    }
                    /**
	     * This method is like `_.lastIndexOf` except that it performs a binary
	     * search on a sorted `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {*} value The value to search for.
	     * @returns {number} Returns the index of the matched value, else `-1`.
	     * @example
	     *
	     * _.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
	     * // => 3
	     */
                    function sortedLastIndexOf(array, value) {
                        var length = null == array ? 0 : array.length;
                        if (length) {
                            var index = baseSortedIndex(array, value, !0) - 1;
                            if (eq(array[index], value)) return index;
                        }
                        return -1;
                    }
                    /**
	     * This method is like `_.uniq` except that it's designed and optimized
	     * for sorted arrays.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @returns {Array} Returns the new duplicate free array.
	     * @example
	     *
	     * _.sortedUniq([1, 1, 2]);
	     * // => [1, 2]
	     */
                    function sortedUniq(array) {
                        return array && array.length ? baseSortedUniq(array) : [];
                    }
                    /**
	     * This method is like `_.uniqBy` except that it's designed and optimized
	     * for sorted arrays.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {Function} [iteratee] The iteratee invoked per element.
	     * @returns {Array} Returns the new duplicate free array.
	     * @example
	     *
	     * _.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
	     * // => [1.1, 2.3]
	     */
                    function sortedUniqBy(array, iteratee) {
                        return array && array.length ? baseSortedUniq(array, getIteratee(iteratee, 2)) : [];
                    }
                    /**
	     * Gets all but the first element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.tail([1, 2, 3]);
	     * // => [2, 3]
	     */
                    function tail(array) {
                        var length = null == array ? 0 : array.length;
                        return length ? baseSlice(array, 1, length) : [];
                    }
                    /**
	     * Creates a slice of `array` with `n` elements taken from the beginning.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to take.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.take([1, 2, 3]);
	     * // => [1]
	     *
	     * _.take([1, 2, 3], 2);
	     * // => [1, 2]
	     *
	     * _.take([1, 2, 3], 5);
	     * // => [1, 2, 3]
	     *
	     * _.take([1, 2, 3], 0);
	     * // => []
	     */
                    function take(array, n, guard) {
                        return array && array.length ? (n = guard || n === undefined ? 1 : toInteger(n), 
                        baseSlice(array, 0, n < 0 ? 0 : n)) : [];
                    }
                    /**
	     * Creates a slice of `array` with `n` elements taken from the end.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to take.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.takeRight([1, 2, 3]);
	     * // => [3]
	     *
	     * _.takeRight([1, 2, 3], 2);
	     * // => [2, 3]
	     *
	     * _.takeRight([1, 2, 3], 5);
	     * // => [1, 2, 3]
	     *
	     * _.takeRight([1, 2, 3], 0);
	     * // => []
	     */
                    function takeRight(array, n, guard) {
                        var length = null == array ? 0 : array.length;
                        return length ? (n = guard || n === undefined ? 1 : toInteger(n), n = length - n, 
                        baseSlice(array, n < 0 ? 0 : n, length)) : [];
                    }
                    /**
	     * Creates a slice of `array` with elements taken from the end. Elements are
	     * taken until `predicate` returns falsey. The predicate is invoked with
	     * three arguments: (value, index, array).
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': true },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': false }
	     * ];
	     *
	     * _.takeRightWhile(users, function(o) { return !o.active; });
	     * // => objects for ['fred', 'pebbles']
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
	     * // => objects for ['pebbles']
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.takeRightWhile(users, ['active', false]);
	     * // => objects for ['fred', 'pebbles']
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.takeRightWhile(users, 'active');
	     * // => []
	     */
                    function takeRightWhile(array, predicate) {
                        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), !1, !0) : [];
                    }
                    /**
	     * Creates a slice of `array` with elements taken from the beginning. Elements
	     * are taken until `predicate` returns falsey. The predicate is invoked with
	     * three arguments: (value, index, array).
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': false },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': true }
	     * ];
	     *
	     * _.takeWhile(users, function(o) { return !o.active; });
	     * // => objects for ['barney', 'fred']
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.takeWhile(users, { 'user': 'barney', 'active': false });
	     * // => objects for ['barney']
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.takeWhile(users, ['active', false]);
	     * // => objects for ['barney', 'fred']
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.takeWhile(users, 'active');
	     * // => []
	     */
                    function takeWhile(array, predicate) {
                        return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
                    }
                    /**
	     * Creates a duplicate-free version of an array, using
	     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	     * for equality comparisons, in which only the first occurrence of each element
	     * is kept. The order of result values is determined by the order they occur
	     * in the array.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @returns {Array} Returns the new duplicate free array.
	     * @example
	     *
	     * _.uniq([2, 1, 2]);
	     * // => [2, 1]
	     */
                    function uniq(array) {
                        return array && array.length ? baseUniq(array) : [];
                    }
                    /**
	     * This method is like `_.uniq` except that it accepts `iteratee` which is
	     * invoked for each element in `array` to generate the criterion by which
	     * uniqueness is computed. The order of result values is determined by the
	     * order they occur in the array. The iteratee is invoked with one argument:
	     * (value).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {Array} Returns the new duplicate free array.
	     * @example
	     *
	     * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
	     * // => [2.1, 1.2]
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
	     * // => [{ 'x': 1 }, { 'x': 2 }]
	     */
                    function uniqBy(array, iteratee) {
                        return array && array.length ? baseUniq(array, getIteratee(iteratee, 2)) : [];
                    }
                    /**
	     * This method is like `_.uniq` except that it accepts `comparator` which
	     * is invoked to compare elements of `array`. The order of result values is
	     * determined by the order they occur in the array.The comparator is invoked
	     * with two arguments: (arrVal, othVal).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {Function} [comparator] The comparator invoked per element.
	     * @returns {Array} Returns the new duplicate free array.
	     * @example
	     *
	     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
	     *
	     * _.uniqWith(objects, _.isEqual);
	     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
	     */
                    function uniqWith(array, comparator) {
                        return comparator = "function" == typeof comparator ? comparator : undefined, array && array.length ? baseUniq(array, undefined, comparator) : [];
                    }
                    /**
	     * This method is like `_.zip` except that it accepts an array of grouped
	     * elements and creates an array regrouping the elements to their pre-zip
	     * configuration.
	     *
	     * @static
	     * @memberOf _
	     * @since 1.2.0
	     * @category Array
	     * @param {Array} array The array of grouped elements to process.
	     * @returns {Array} Returns the new array of regrouped elements.
	     * @example
	     *
	     * var zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
	     * // => [['a', 1, true], ['b', 2, false]]
	     *
	     * _.unzip(zipped);
	     * // => [['a', 'b'], [1, 2], [true, false]]
	     */
                    function unzip(array) {
                        if (!array || !array.length) return [];
                        var length = 0;
                        return array = arrayFilter(array, function(group) {
                            if (isArrayLikeObject(group)) return length = nativeMax(group.length, length), !0;
                        }), baseTimes(length, function(index) {
                            return arrayMap(array, baseProperty(index));
                        });
                    }
                    /**
	     * This method is like `_.unzip` except that it accepts `iteratee` to specify
	     * how regrouped values should be combined. The iteratee is invoked with the
	     * elements of each group: (...group).
	     *
	     * @static
	     * @memberOf _
	     * @since 3.8.0
	     * @category Array
	     * @param {Array} array The array of grouped elements to process.
	     * @param {Function} [iteratee=_.identity] The function to combine
	     *  regrouped values.
	     * @returns {Array} Returns the new array of regrouped elements.
	     * @example
	     *
	     * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
	     * // => [[1, 10, 100], [2, 20, 200]]
	     *
	     * _.unzipWith(zipped, _.add);
	     * // => [3, 30, 300]
	     */
                    function unzipWith(array, iteratee) {
                        if (!array || !array.length) return [];
                        var result = unzip(array);
                        return null == iteratee ? result : arrayMap(result, function(group) {
                            return apply(iteratee, undefined, group);
                        });
                    }
                    /**
	     * This method is like `_.fromPairs` except that it accepts two arrays,
	     * one of property identifiers and one of corresponding values.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.4.0
	     * @category Array
	     * @param {Array} [props=[]] The property identifiers.
	     * @param {Array} [values=[]] The property values.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * _.zipObject(['a', 'b'], [1, 2]);
	     * // => { 'a': 1, 'b': 2 }
	     */
                    function zipObject(props, values) {
                        return baseZipObject(props || [], values || [], assignValue);
                    }
                    /**
	     * This method is like `_.zipObject` except that it supports property paths.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.1.0
	     * @category Array
	     * @param {Array} [props=[]] The property identifiers.
	     * @param {Array} [values=[]] The property values.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * _.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
	     * // => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
	     */
                    function zipObjectDeep(props, values) {
                        return baseZipObject(props || [], values || [], baseSet);
                    }
                    /*------------------------------------------------------------------------*/
                    /**
	     * Creates a `lodash` wrapper instance that wraps `value` with explicit method
	     * chain sequences enabled. The result of such sequences must be unwrapped
	     * with `_#value`.
	     *
	     * @static
	     * @memberOf _
	     * @since 1.3.0
	     * @category Seq
	     * @param {*} value The value to wrap.
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'age': 36 },
	     *   { 'user': 'fred',    'age': 40 },
	     *   { 'user': 'pebbles', 'age': 1 }
	     * ];
	     *
	     * var youngest = _
	     *   .chain(users)
	     *   .sortBy('age')
	     *   .map(function(o) {
	     *     return o.user + ' is ' + o.age;
	     *   })
	     *   .head()
	     *   .value();
	     * // => 'pebbles is 1'
	     */
                    function chain(value) {
                        var result = lodash(value);
                        return result.__chain__ = !0, result;
                    }
                    /**
	     * This method invokes `interceptor` and returns `value`. The interceptor
	     * is invoked with one argument; (value). The purpose of this method is to
	     * "tap into" a method chain sequence in order to modify intermediate results.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Seq
	     * @param {*} value The value to provide to `interceptor`.
	     * @param {Function} interceptor The function to invoke.
	     * @returns {*} Returns `value`.
	     * @example
	     *
	     * _([1, 2, 3])
	     *  .tap(function(array) {
	     *    // Mutate input array.
	     *    array.pop();
	     *  })
	     *  .reverse()
	     *  .value();
	     * // => [2, 1]
	     */
                    function tap(value, interceptor) {
                        return interceptor(value), value;
                    }
                    /**
	     * This method is like `_.tap` except that it returns the result of `interceptor`.
	     * The purpose of this method is to "pass thru" values replacing intermediate
	     * results in a method chain sequence.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Seq
	     * @param {*} value The value to provide to `interceptor`.
	     * @param {Function} interceptor The function to invoke.
	     * @returns {*} Returns the result of `interceptor`.
	     * @example
	     *
	     * _('  abc  ')
	     *  .chain()
	     *  .trim()
	     *  .thru(function(value) {
	     *    return [value];
	     *  })
	     *  .value();
	     * // => ['abc']
	     */
                    function thru(value, interceptor) {
                        return interceptor(value);
                    }
                    /**
	     * Creates a `lodash` wrapper instance with explicit method chain sequences enabled.
	     *
	     * @name chain
	     * @memberOf _
	     * @since 0.1.0
	     * @category Seq
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * // A sequence without explicit chaining.
	     * _(users).head();
	     * // => { 'user': 'barney', 'age': 36 }
	     *
	     * // A sequence with explicit chaining.
	     * _(users)
	     *   .chain()
	     *   .head()
	     *   .pick('user')
	     *   .value();
	     * // => { 'user': 'barney' }
	     */
                    function wrapperChain() {
                        return chain(this);
                    }
                    /**
	     * Executes the chain sequence and returns the wrapped result.
	     *
	     * @name commit
	     * @memberOf _
	     * @since 3.2.0
	     * @category Seq
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var array = [1, 2];
	     * var wrapped = _(array).push(3);
	     *
	     * console.log(array);
	     * // => [1, 2]
	     *
	     * wrapped = wrapped.commit();
	     * console.log(array);
	     * // => [1, 2, 3]
	     *
	     * wrapped.last();
	     * // => 3
	     *
	     * console.log(array);
	     * // => [1, 2, 3]
	     */
                    function wrapperCommit() {
                        return new LodashWrapper(this.value(), this.__chain__);
                    }
                    /**
	     * Gets the next value on a wrapped object following the
	     * [iterator protocol](https://mdn.io/iteration_protocols#iterator).
	     *
	     * @name next
	     * @memberOf _
	     * @since 4.0.0
	     * @category Seq
	     * @returns {Object} Returns the next iterator value.
	     * @example
	     *
	     * var wrapped = _([1, 2]);
	     *
	     * wrapped.next();
	     * // => { 'done': false, 'value': 1 }
	     *
	     * wrapped.next();
	     * // => { 'done': false, 'value': 2 }
	     *
	     * wrapped.next();
	     * // => { 'done': true, 'value': undefined }
	     */
                    function wrapperNext() {
                        this.__values__ === undefined && (this.__values__ = toArray(this.value()));
                        var done = this.__index__ >= this.__values__.length, value = done ? undefined : this.__values__[this.__index__++];
                        return {
                            done: done,
                            value: value
                        };
                    }
                    /**
	     * Enables the wrapper to be iterable.
	     *
	     * @name Symbol.iterator
	     * @memberOf _
	     * @since 4.0.0
	     * @category Seq
	     * @returns {Object} Returns the wrapper object.
	     * @example
	     *
	     * var wrapped = _([1, 2]);
	     *
	     * wrapped[Symbol.iterator]() === wrapped;
	     * // => true
	     *
	     * Array.from(wrapped);
	     * // => [1, 2]
	     */
                    function wrapperToIterator() {
                        return this;
                    }
                    /**
	     * Creates a clone of the chain sequence planting `value` as the wrapped value.
	     *
	     * @name plant
	     * @memberOf _
	     * @since 3.2.0
	     * @category Seq
	     * @param {*} value The value to plant.
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * function square(n) {
	     *   return n * n;
	     * }
	     *
	     * var wrapped = _([1, 2]).map(square);
	     * var other = wrapped.plant([3, 4]);
	     *
	     * other.value();
	     * // => [9, 16]
	     *
	     * wrapped.value();
	     * // => [1, 4]
	     */
                    function wrapperPlant(value) {
                        for (var result, parent = this; parent instanceof baseLodash; ) {
                            var clone = wrapperClone(parent);
                            clone.__index__ = 0, clone.__values__ = undefined, result ? previous.__wrapped__ = clone : result = clone;
                            var previous = clone;
                            parent = parent.__wrapped__;
                        }
                        return previous.__wrapped__ = value, result;
                    }
                    /**
	     * This method is the wrapper version of `_.reverse`.
	     *
	     * **Note:** This method mutates the wrapped array.
	     *
	     * @name reverse
	     * @memberOf _
	     * @since 0.1.0
	     * @category Seq
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var array = [1, 2, 3];
	     *
	     * _(array).reverse().value()
	     * // => [3, 2, 1]
	     *
	     * console.log(array);
	     * // => [3, 2, 1]
	     */
                    function wrapperReverse() {
                        var value = this.__wrapped__;
                        if (value instanceof LazyWrapper) {
                            var wrapped = value;
                            return this.__actions__.length && (wrapped = new LazyWrapper(this)), wrapped = wrapped.reverse(), 
                            wrapped.__actions__.push({
                                func: thru,
                                args: [ reverse ],
                                thisArg: undefined
                            }), new LodashWrapper(wrapped, this.__chain__);
                        }
                        return this.thru(reverse);
                    }
                    /**
	     * Executes the chain sequence to resolve the unwrapped value.
	     *
	     * @name value
	     * @memberOf _
	     * @since 0.1.0
	     * @alias toJSON, valueOf
	     * @category Seq
	     * @returns {*} Returns the resolved unwrapped value.
	     * @example
	     *
	     * _([1, 2, 3]).value();
	     * // => [1, 2, 3]
	     */
                    function wrapperValue() {
                        return baseWrapperValue(this.__wrapped__, this.__actions__);
                    }
                    /**
	     * Checks if `predicate` returns truthy for **all** elements of `collection`.
	     * Iteration is stopped once `predicate` returns falsey. The predicate is
	     * invoked with three arguments: (value, index|key, collection).
	     *
	     * **Note:** This method returns `true` for
	     * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
	     * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
	     * elements of empty collections.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {boolean} Returns `true` if all elements pass the predicate check,
	     *  else `false`.
	     * @example
	     *
	     * _.every([true, 1, null, 'yes'], Boolean);
	     * // => false
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': false },
	     *   { 'user': 'fred',   'age': 40, 'active': false }
	     * ];
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.every(users, { 'user': 'barney', 'active': false });
	     * // => false
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.every(users, ['active', false]);
	     * // => true
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.every(users, 'active');
	     * // => false
	     */
                    function every(collection, predicate, guard) {
                        var func = isArray(collection) ? arrayEvery : baseEvery;
                        return guard && isIterateeCall(collection, predicate, guard) && (predicate = undefined), 
                        func(collection, getIteratee(predicate, 3));
                    }
                    /**
	     * Iterates over elements of `collection`, returning an array of all elements
	     * `predicate` returns truthy for. The predicate is invoked with three
	     * arguments: (value, index|key, collection).
	     *
	     * **Note:** Unlike `_.remove`, this method returns a new array.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the new filtered array.
	     * @see _.reject
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': true },
	     *   { 'user': 'fred',   'age': 40, 'active': false }
	     * ];
	     *
	     * _.filter(users, function(o) { return !o.active; });
	     * // => objects for ['fred']
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.filter(users, { 'age': 36, 'active': true });
	     * // => objects for ['barney']
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.filter(users, ['active', false]);
	     * // => objects for ['fred']
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.filter(users, 'active');
	     * // => objects for ['barney']
	     */
                    function filter(collection, predicate) {
                        var func = isArray(collection) ? arrayFilter : baseFilter;
                        return func(collection, getIteratee(predicate, 3));
                    }
                    /**
	     * Creates a flattened array of values by running each element in `collection`
	     * thru `iteratee` and flattening the mapped results. The iteratee is invoked
	     * with three arguments: (value, index|key, collection).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the new flattened array.
	     * @example
	     *
	     * function duplicate(n) {
	     *   return [n, n];
	     * }
	     *
	     * _.flatMap([1, 2], duplicate);
	     * // => [1, 1, 2, 2]
	     */
                    function flatMap(collection, iteratee) {
                        return baseFlatten(map(collection, iteratee), 1);
                    }
                    /**
	     * This method is like `_.flatMap` except that it recursively flattens the
	     * mapped results.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.7.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the new flattened array.
	     * @example
	     *
	     * function duplicate(n) {
	     *   return [[[n, n]]];
	     * }
	     *
	     * _.flatMapDeep([1, 2], duplicate);
	     * // => [1, 1, 2, 2]
	     */
                    function flatMapDeep(collection, iteratee) {
                        return baseFlatten(map(collection, iteratee), INFINITY);
                    }
                    /**
	     * This method is like `_.flatMap` except that it recursively flattens the
	     * mapped results up to `depth` times.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.7.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {number} [depth=1] The maximum recursion depth.
	     * @returns {Array} Returns the new flattened array.
	     * @example
	     *
	     * function duplicate(n) {
	     *   return [[[n, n]]];
	     * }
	     *
	     * _.flatMapDepth([1, 2], duplicate, 2);
	     * // => [[1, 1], [2, 2]]
	     */
                    function flatMapDepth(collection, iteratee, depth) {
                        return depth = depth === undefined ? 1 : toInteger(depth), baseFlatten(map(collection, iteratee), depth);
                    }
                    /**
	     * Iterates over elements of `collection` and invokes `iteratee` for each element.
	     * The iteratee is invoked with three arguments: (value, index|key, collection).
	     * Iteratee functions may exit iteration early by explicitly returning `false`.
	     *
	     * **Note:** As with other "Collections" methods, objects with a "length"
	     * property are iterated like arrays. To avoid this behavior use `_.forIn`
	     * or `_.forOwn` for object iteration.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @alias each
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Array|Object} Returns `collection`.
	     * @see _.forEachRight
	     * @example
	     *
	     * _.forEach([1, 2], function(value) {
	     *   console.log(value);
	     * });
	     * // => Logs `1` then `2`.
	     *
	     * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
	     */
                    function forEach(collection, iteratee) {
                        var func = isArray(collection) ? arrayEach : baseEach;
                        return func(collection, getIteratee(iteratee, 3));
                    }
                    /**
	     * This method is like `_.forEach` except that it iterates over elements of
	     * `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.0.0
	     * @alias eachRight
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Array|Object} Returns `collection`.
	     * @see _.forEach
	     * @example
	     *
	     * _.forEachRight([1, 2], function(value) {
	     *   console.log(value);
	     * });
	     * // => Logs `2` then `1`.
	     */
                    function forEachRight(collection, iteratee) {
                        var func = isArray(collection) ? arrayEachRight : baseEachRight;
                        return func(collection, getIteratee(iteratee, 3));
                    }
                    /**
	     * Checks if `value` is in `collection`. If `collection` is a string, it's
	     * checked for a substring of `value`, otherwise
	     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	     * is used for equality comparisons. If `fromIndex` is negative, it's used as
	     * the offset from the end of `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to inspect.
	     * @param {*} value The value to search for.
	     * @param {number} [fromIndex=0] The index to search from.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
	     * @returns {boolean} Returns `true` if `value` is found, else `false`.
	     * @example
	     *
	     * _.includes([1, 2, 3], 1);
	     * // => true
	     *
	     * _.includes([1, 2, 3], 1, 2);
	     * // => false
	     *
	     * _.includes({ 'a': 1, 'b': 2 }, 1);
	     * // => true
	     *
	     * _.includes('abcd', 'bc');
	     * // => true
	     */
                    function includes(collection, value, fromIndex, guard) {
                        collection = isArrayLike(collection) ? collection : values(collection), fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
                        var length = collection.length;
                        return fromIndex < 0 && (fromIndex = nativeMax(length + fromIndex, 0)), isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
                    }
                    /**
	     * Creates an array of values by running each element in `collection` thru
	     * `iteratee`. The iteratee is invoked with three arguments:
	     * (value, index|key, collection).
	     *
	     * Many lodash methods are guarded to work as iteratees for methods like
	     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
	     *
	     * The guarded methods are:
	     * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
	     * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
	     * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
	     * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the new mapped array.
	     * @example
	     *
	     * function square(n) {
	     *   return n * n;
	     * }
	     *
	     * _.map([4, 8], square);
	     * // => [16, 64]
	     *
	     * _.map({ 'a': 4, 'b': 8 }, square);
	     * // => [16, 64] (iteration order is not guaranteed)
	     *
	     * var users = [
	     *   { 'user': 'barney' },
	     *   { 'user': 'fred' }
	     * ];
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.map(users, 'user');
	     * // => ['barney', 'fred']
	     */
                    function map(collection, iteratee) {
                        var func = isArray(collection) ? arrayMap : baseMap;
                        return func(collection, getIteratee(iteratee, 3));
                    }
                    /**
	     * This method is like `_.sortBy` except that it allows specifying the sort
	     * orders of the iteratees to sort by. If `orders` is unspecified, all values
	     * are sorted in ascending order. Otherwise, specify an order of "desc" for
	     * descending or "asc" for ascending sort order of corresponding values.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
	     *  The iteratees to sort by.
	     * @param {string[]} [orders] The sort orders of `iteratees`.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
	     * @returns {Array} Returns the new sorted array.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'fred',   'age': 48 },
	     *   { 'user': 'barney', 'age': 34 },
	     *   { 'user': 'fred',   'age': 40 },
	     *   { 'user': 'barney', 'age': 36 }
	     * ];
	     *
	     * // Sort by `user` in ascending order and by `age` in descending order.
	     * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
	     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
	     */
                    function orderBy(collection, iteratees, orders, guard) {
                        return null == collection ? [] : (isArray(iteratees) || (iteratees = null == iteratees ? [] : [ iteratees ]), 
                        orders = guard ? undefined : orders, isArray(orders) || (orders = null == orders ? [] : [ orders ]), 
                        baseOrderBy(collection, iteratees, orders));
                    }
                    /**
	     * Reduces `collection` to a value which is the accumulated result of running
	     * each element in `collection` thru `iteratee`, where each successive
	     * invocation is supplied the return value of the previous. If `accumulator`
	     * is not given, the first element of `collection` is used as the initial
	     * value. The iteratee is invoked with four arguments:
	     * (accumulator, value, index|key, collection).
	     *
	     * Many lodash methods are guarded to work as iteratees for methods like
	     * `_.reduce`, `_.reduceRight`, and `_.transform`.
	     *
	     * The guarded methods are:
	     * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
	     * and `sortBy`
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [accumulator] The initial value.
	     * @returns {*} Returns the accumulated value.
	     * @see _.reduceRight
	     * @example
	     *
	     * _.reduce([1, 2], function(sum, n) {
	     *   return sum + n;
	     * }, 0);
	     * // => 3
	     *
	     * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
	     *   (result[value] || (result[value] = [])).push(key);
	     *   return result;
	     * }, {});
	     * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
	     */
                    function reduce(collection, iteratee, accumulator) {
                        var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
                        return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEach);
                    }
                    /**
	     * This method is like `_.reduce` except that it iterates over elements of
	     * `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [accumulator] The initial value.
	     * @returns {*} Returns the accumulated value.
	     * @see _.reduce
	     * @example
	     *
	     * var array = [[0, 1], [2, 3], [4, 5]];
	     *
	     * _.reduceRight(array, function(flattened, other) {
	     *   return flattened.concat(other);
	     * }, []);
	     * // => [4, 5, 2, 3, 0, 1]
	     */
                    function reduceRight(collection, iteratee, accumulator) {
                        var func = isArray(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
                        return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEachRight);
                    }
                    /**
	     * The opposite of `_.filter`; this method returns the elements of `collection`
	     * that `predicate` does **not** return truthy for.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the new filtered array.
	     * @see _.filter
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': false },
	     *   { 'user': 'fred',   'age': 40, 'active': true }
	     * ];
	     *
	     * _.reject(users, function(o) { return !o.active; });
	     * // => objects for ['fred']
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.reject(users, { 'age': 40, 'active': true });
	     * // => objects for ['barney']
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.reject(users, ['active', false]);
	     * // => objects for ['fred']
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.reject(users, 'active');
	     * // => objects for ['barney']
	     */
                    function reject(collection, predicate) {
                        var func = isArray(collection) ? arrayFilter : baseFilter;
                        return func(collection, negate(getIteratee(predicate, 3)));
                    }
                    /**
	     * Gets a random element from `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.0.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to sample.
	     * @returns {*} Returns the random element.
	     * @example
	     *
	     * _.sample([1, 2, 3, 4]);
	     * // => 2
	     */
                    function sample(collection) {
                        var func = isArray(collection) ? arraySample : baseSample;
                        return func(collection);
                    }
                    /**
	     * Gets `n` random elements at unique keys from `collection` up to the
	     * size of `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to sample.
	     * @param {number} [n=1] The number of elements to sample.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {Array} Returns the random elements.
	     * @example
	     *
	     * _.sampleSize([1, 2, 3], 2);
	     * // => [3, 1]
	     *
	     * _.sampleSize([1, 2, 3], 4);
	     * // => [2, 3, 1]
	     */
                    function sampleSize(collection, n, guard) {
                        n = (guard ? isIterateeCall(collection, n, guard) : n === undefined) ? 1 : toInteger(n);
                        var func = isArray(collection) ? arraySampleSize : baseSampleSize;
                        return func(collection, n);
                    }
                    /**
	     * Creates an array of shuffled values, using a version of the
	     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to shuffle.
	     * @returns {Array} Returns the new shuffled array.
	     * @example
	     *
	     * _.shuffle([1, 2, 3, 4]);
	     * // => [4, 1, 3, 2]
	     */
                    function shuffle(collection) {
                        var func = isArray(collection) ? arrayShuffle : baseShuffle;
                        return func(collection);
                    }
                    /**
	     * Gets the size of `collection` by returning its length for array-like
	     * values or the number of own enumerable string keyed properties for objects.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to inspect.
	     * @returns {number} Returns the collection size.
	     * @example
	     *
	     * _.size([1, 2, 3]);
	     * // => 3
	     *
	     * _.size({ 'a': 1, 'b': 2 });
	     * // => 2
	     *
	     * _.size('pebbles');
	     * // => 7
	     */
                    function size(collection) {
                        if (null == collection) return 0;
                        if (isArrayLike(collection)) return isString(collection) ? stringSize(collection) : collection.length;
                        var tag = getTag(collection);
                        return tag == mapTag || tag == setTag ? collection.size : baseKeys(collection).length;
                    }
                    /**
	     * Checks if `predicate` returns truthy for **any** element of `collection`.
	     * Iteration is stopped once `predicate` returns truthy. The predicate is
	     * invoked with three arguments: (value, index|key, collection).
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {boolean} Returns `true` if any element passes the predicate check,
	     *  else `false`.
	     * @example
	     *
	     * _.some([null, 0, 'yes', false], Boolean);
	     * // => true
	     *
	     * var users = [
	     *   { 'user': 'barney', 'active': true },
	     *   { 'user': 'fred',   'active': false }
	     * ];
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.some(users, { 'user': 'barney', 'active': false });
	     * // => false
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.some(users, ['active', false]);
	     * // => true
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.some(users, 'active');
	     * // => true
	     */
                    function some(collection, predicate, guard) {
                        var func = isArray(collection) ? arraySome : baseSome;
                        return guard && isIterateeCall(collection, predicate, guard) && (predicate = undefined), 
                        func(collection, getIteratee(predicate, 3));
                    }
                    /*------------------------------------------------------------------------*/
                    /**
	     * The opposite of `_.before`; this method creates a function that invokes
	     * `func` once it's called `n` or more times.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Function
	     * @param {number} n The number of calls before `func` is invoked.
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * var saves = ['profile', 'settings'];
	     *
	     * var done = _.after(saves.length, function() {
	     *   console.log('done saving!');
	     * });
	     *
	     * _.forEach(saves, function(type) {
	     *   asyncSave({ 'type': type, 'complete': done });
	     * });
	     * // => Logs 'done saving!' after the two async saves have completed.
	     */
                    function after(n, func) {
                        if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
                        return n = toInteger(n), function() {
                            if (--n < 1) return func.apply(this, arguments);
                        };
                    }
                    /**
	     * Creates a function that invokes `func`, with up to `n` arguments,
	     * ignoring any additional arguments.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Function
	     * @param {Function} func The function to cap arguments for.
	     * @param {number} [n=func.length] The arity cap.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {Function} Returns the new capped function.
	     * @example
	     *
	     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
	     * // => [6, 8, 10]
	     */
                    function ary(func, n, guard) {
                        return n = guard ? undefined : n, n = func && null == n ? func.length : n, createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n);
                    }
                    /**
	     * Creates a function that invokes `func`, with the `this` binding and arguments
	     * of the created function, while it's called less than `n` times. Subsequent
	     * calls to the created function return the result of the last `func` invocation.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Function
	     * @param {number} n The number of calls at which `func` is no longer invoked.
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * jQuery(element).on('click', _.before(5, addContactToList));
	     * // => Allows adding up to 4 contacts to the list.
	     */
                    function before(n, func) {
                        var result;
                        if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
                        return n = toInteger(n), function() {
                            return --n > 0 && (result = func.apply(this, arguments)), n <= 1 && (func = undefined), 
                            result;
                        };
                    }
                    /**
	     * Creates a function that accepts arguments of `func` and either invokes
	     * `func` returning its result, if at least `arity` number of arguments have
	     * been provided, or returns a function that accepts the remaining `func`
	     * arguments, and so on. The arity of `func` may be specified if `func.length`
	     * is not sufficient.
	     *
	     * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
	     * may be used as a placeholder for provided arguments.
	     *
	     * **Note:** This method doesn't set the "length" property of curried functions.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.0.0
	     * @category Function
	     * @param {Function} func The function to curry.
	     * @param {number} [arity=func.length] The arity of `func`.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {Function} Returns the new curried function.
	     * @example
	     *
	     * var abc = function(a, b, c) {
	     *   return [a, b, c];
	     * };
	     *
	     * var curried = _.curry(abc);
	     *
	     * curried(1)(2)(3);
	     * // => [1, 2, 3]
	     *
	     * curried(1, 2)(3);
	     * // => [1, 2, 3]
	     *
	     * curried(1, 2, 3);
	     * // => [1, 2, 3]
	     *
	     * // Curried with placeholders.
	     * curried(1)(_, 3)(2);
	     * // => [1, 2, 3]
	     */
                    function curry(func, arity, guard) {
                        arity = guard ? undefined : arity;
                        var result = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
                        return result.placeholder = curry.placeholder, result;
                    }
                    /**
	     * This method is like `_.curry` except that arguments are applied to `func`
	     * in the manner of `_.partialRight` instead of `_.partial`.
	     *
	     * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
	     * builds, may be used as a placeholder for provided arguments.
	     *
	     * **Note:** This method doesn't set the "length" property of curried functions.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Function
	     * @param {Function} func The function to curry.
	     * @param {number} [arity=func.length] The arity of `func`.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {Function} Returns the new curried function.
	     * @example
	     *
	     * var abc = function(a, b, c) {
	     *   return [a, b, c];
	     * };
	     *
	     * var curried = _.curryRight(abc);
	     *
	     * curried(3)(2)(1);
	     * // => [1, 2, 3]
	     *
	     * curried(2, 3)(1);
	     * // => [1, 2, 3]
	     *
	     * curried(1, 2, 3);
	     * // => [1, 2, 3]
	     *
	     * // Curried with placeholders.
	     * curried(3)(1, _)(2);
	     * // => [1, 2, 3]
	     */
                    function curryRight(func, arity, guard) {
                        arity = guard ? undefined : arity;
                        var result = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
                        return result.placeholder = curryRight.placeholder, result;
                    }
                    /**
	     * Creates a debounced function that delays invoking `func` until after `wait`
	     * milliseconds have elapsed since the last time the debounced function was
	     * invoked. The debounced function comes with a `cancel` method to cancel
	     * delayed `func` invocations and a `flush` method to immediately invoke them.
	     * Provide `options` to indicate whether `func` should be invoked on the
	     * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	     * with the last arguments provided to the debounced function. Subsequent
	     * calls to the debounced function return the result of the last `func`
	     * invocation.
	     *
	     * **Note:** If `leading` and `trailing` options are `true`, `func` is
	     * invoked on the trailing edge of the timeout only if the debounced function
	     * is invoked more than once during the `wait` timeout.
	     *
	     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	     *
	     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	     * for details over the differences between `_.debounce` and `_.throttle`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Function
	     * @param {Function} func The function to debounce.
	     * @param {number} [wait=0] The number of milliseconds to delay.
	     * @param {Object} [options={}] The options object.
	     * @param {boolean} [options.leading=false]
	     *  Specify invoking on the leading edge of the timeout.
	     * @param {number} [options.maxWait]
	     *  The maximum time `func` is allowed to be delayed before it's invoked.
	     * @param {boolean} [options.trailing=true]
	     *  Specify invoking on the trailing edge of the timeout.
	     * @returns {Function} Returns the new debounced function.
	     * @example
	     *
	     * // Avoid costly calculations while the window size is in flux.
	     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	     *
	     * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	     * jQuery(element).on('click', _.debounce(sendMail, 300, {
	     *   'leading': true,
	     *   'trailing': false
	     * }));
	     *
	     * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	     * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	     * var source = new EventSource('/stream');
	     * jQuery(source).on('message', debounced);
	     *
	     * // Cancel the trailing debounced invocation.
	     * jQuery(window).on('popstate', debounced.cancel);
	     */
                    function debounce(func, wait, options) {
                        function invokeFunc(time) {
                            var args = lastArgs, thisArg = lastThis;
                            return lastArgs = lastThis = undefined, lastInvokeTime = time, result = func.apply(thisArg, args);
                        }
                        function leadingEdge(time) {
                            // Invoke the leading edge.
                            // Reset any `maxWait` timer.
                            // Start the timer for the trailing edge.
                            return lastInvokeTime = time, timerId = setTimeout(timerExpired, wait), leading ? invokeFunc(time) : result;
                        }
                        function remainingWait(time) {
                            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result = wait - timeSinceLastCall;
                            return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
                        }
                        function shouldInvoke(time) {
                            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
                            // Either this is the first call, activity has stopped and we're at the
                            // trailing edge, the system time has gone backwards and we're treating
                            // it as the trailing edge, or we've hit the `maxWait` limit.
                            return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
                        }
                        function timerExpired() {
                            var time = now();
                            // Restart the timer.
                            return shouldInvoke(time) ? trailingEdge(time) : void (timerId = setTimeout(timerExpired, remainingWait(time)));
                        }
                        function trailingEdge(time) {
                            // Only invoke if we have `lastArgs` which means `func` has been
                            // debounced at least once.
                            // Only invoke if we have `lastArgs` which means `func` has been
                            // debounced at least once.
                            return timerId = undefined, trailing && lastArgs ? invokeFunc(time) : (lastArgs = lastThis = undefined, 
                            result);
                        }
                        function cancel() {
                            timerId !== undefined && clearTimeout(timerId), lastInvokeTime = 0, lastArgs = lastCallTime = lastThis = timerId = undefined;
                        }
                        function flush() {
                            return timerId === undefined ? result : trailingEdge(now());
                        }
                        function debounced() {
                            var time = now(), isInvoking = shouldInvoke(time);
                            if (lastArgs = arguments, lastThis = this, lastCallTime = time, isInvoking) {
                                if (timerId === undefined) return leadingEdge(lastCallTime);
                                if (maxing) // Handle invocations in a tight loop.
                                return timerId = setTimeout(timerExpired, wait), invokeFunc(lastCallTime);
                            }
                            return timerId === undefined && (timerId = setTimeout(timerExpired, wait)), result;
                        }
                        var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = !1, maxing = !1, trailing = !0;
                        if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
                        return wait = toNumber(wait) || 0, isObject(options) && (leading = !!options.leading, 
                        maxing = "maxWait" in options, maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait, 
                        trailing = "trailing" in options ? !!options.trailing : trailing), debounced.cancel = cancel, 
                        debounced.flush = flush, debounced;
                    }
                    /**
	     * Creates a function that invokes `func` with arguments reversed.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Function
	     * @param {Function} func The function to flip arguments for.
	     * @returns {Function} Returns the new flipped function.
	     * @example
	     *
	     * var flipped = _.flip(function() {
	     *   return _.toArray(arguments);
	     * });
	     *
	     * flipped('a', 'b', 'c', 'd');
	     * // => ['d', 'c', 'b', 'a']
	     */
                    function flip(func) {
                        return createWrap(func, WRAP_FLIP_FLAG);
                    }
                    /**
	     * Creates a function that memoizes the result of `func`. If `resolver` is
	     * provided, it determines the cache key for storing the result based on the
	     * arguments provided to the memoized function. By default, the first argument
	     * provided to the memoized function is used as the map cache key. The `func`
	     * is invoked with the `this` binding of the memoized function.
	     *
	     * **Note:** The cache is exposed as the `cache` property on the memoized
	     * function. Its creation may be customized by replacing the `_.memoize.Cache`
	     * constructor with one whose instances implement the
	     * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	     * method interface of `clear`, `delete`, `get`, `has`, and `set`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Function
	     * @param {Function} func The function to have its output memoized.
	     * @param {Function} [resolver] The function to resolve the cache key.
	     * @returns {Function} Returns the new memoized function.
	     * @example
	     *
	     * var object = { 'a': 1, 'b': 2 };
	     * var other = { 'c': 3, 'd': 4 };
	     *
	     * var values = _.memoize(_.values);
	     * values(object);
	     * // => [1, 2]
	     *
	     * values(other);
	     * // => [3, 4]
	     *
	     * object.a = 2;
	     * values(object);
	     * // => [1, 2]
	     *
	     * // Modify the result cache.
	     * values.cache.set(object, ['a', 'b']);
	     * values(object);
	     * // => ['a', 'b']
	     *
	     * // Replace `_.memoize.Cache`.
	     * _.memoize.Cache = WeakMap;
	     */
                    function memoize(func, resolver) {
                        if ("function" != typeof func || null != resolver && "function" != typeof resolver) throw new TypeError(FUNC_ERROR_TEXT);
                        var memoized = function() {
                            var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
                            if (cache.has(key)) return cache.get(key);
                            var result = func.apply(this, args);
                            return memoized.cache = cache.set(key, result) || cache, result;
                        };
                        return memoized.cache = new (memoize.Cache || MapCache)(), memoized;
                    }
                    /**
	     * Creates a function that negates the result of the predicate `func`. The
	     * `func` predicate is invoked with the `this` binding and arguments of the
	     * created function.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Function
	     * @param {Function} predicate The predicate to negate.
	     * @returns {Function} Returns the new negated function.
	     * @example
	     *
	     * function isEven(n) {
	     *   return n % 2 == 0;
	     * }
	     *
	     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
	     * // => [1, 3, 5]
	     */
                    function negate(predicate) {
                        if ("function" != typeof predicate) throw new TypeError(FUNC_ERROR_TEXT);
                        return function() {
                            var args = arguments;
                            switch (args.length) {
                              case 0:
                                return !predicate.call(this);

                              case 1:
                                return !predicate.call(this, args[0]);

                              case 2:
                                return !predicate.call(this, args[0], args[1]);

                              case 3:
                                return !predicate.call(this, args[0], args[1], args[2]);
                            }
                            return !predicate.apply(this, args);
                        };
                    }
                    /**
	     * Creates a function that is restricted to invoking `func` once. Repeat calls
	     * to the function return the value of the first invocation. The `func` is
	     * invoked with the `this` binding and arguments of the created function.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Function
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * var initialize = _.once(createApplication);
	     * initialize();
	     * initialize();
	     * // => `createApplication` is invoked once
	     */
                    function once(func) {
                        return before(2, func);
                    }
                    /**
	     * Creates a function that invokes `func` with the `this` binding of the
	     * created function and arguments from `start` and beyond provided as
	     * an array.
	     *
	     * **Note:** This method is based on the
	     * [rest parameter](https://mdn.io/rest_parameters).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Function
	     * @param {Function} func The function to apply a rest parameter to.
	     * @param {number} [start=func.length-1] The start position of the rest parameter.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var say = _.rest(function(what, names) {
	     *   return what + ' ' + _.initial(names).join(', ') +
	     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	     * });
	     *
	     * say('hello', 'fred', 'barney', 'pebbles');
	     * // => 'hello fred, barney, & pebbles'
	     */
                    function rest(func, start) {
                        if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
                        return start = start === undefined ? start : toInteger(start), baseRest(func, start);
                    }
                    /**
	     * Creates a function that invokes `func` with the `this` binding of the
	     * create function and an array of arguments much like
	     * [`Function#apply`](http://www.ecma-international.org/ecma-262/7.0/#sec-function.prototype.apply).
	     *
	     * **Note:** This method is based on the
	     * [spread operator](https://mdn.io/spread_operator).
	     *
	     * @static
	     * @memberOf _
	     * @since 3.2.0
	     * @category Function
	     * @param {Function} func The function to spread arguments over.
	     * @param {number} [start=0] The start position of the spread.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var say = _.spread(function(who, what) {
	     *   return who + ' says ' + what;
	     * });
	     *
	     * say(['fred', 'hello']);
	     * // => 'fred says hello'
	     *
	     * var numbers = Promise.all([
	     *   Promise.resolve(40),
	     *   Promise.resolve(36)
	     * ]);
	     *
	     * numbers.then(_.spread(function(x, y) {
	     *   return x + y;
	     * }));
	     * // => a Promise of 76
	     */
                    function spread(func, start) {
                        if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
                        return start = null == start ? 0 : nativeMax(toInteger(start), 0), baseRest(function(args) {
                            var array = args[start], otherArgs = castSlice(args, 0, start);
                            return array && arrayPush(otherArgs, array), apply(func, this, otherArgs);
                        });
                    }
                    /**
	     * Creates a throttled function that only invokes `func` at most once per
	     * every `wait` milliseconds. The throttled function comes with a `cancel`
	     * method to cancel delayed `func` invocations and a `flush` method to
	     * immediately invoke them. Provide `options` to indicate whether `func`
	     * should be invoked on the leading and/or trailing edge of the `wait`
	     * timeout. The `func` is invoked with the last arguments provided to the
	     * throttled function. Subsequent calls to the throttled function return the
	     * result of the last `func` invocation.
	     *
	     * **Note:** If `leading` and `trailing` options are `true`, `func` is
	     * invoked on the trailing edge of the timeout only if the throttled function
	     * is invoked more than once during the `wait` timeout.
	     *
	     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	     *
	     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	     * for details over the differences between `_.throttle` and `_.debounce`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Function
	     * @param {Function} func The function to throttle.
	     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	     * @param {Object} [options={}] The options object.
	     * @param {boolean} [options.leading=true]
	     *  Specify invoking on the leading edge of the timeout.
	     * @param {boolean} [options.trailing=true]
	     *  Specify invoking on the trailing edge of the timeout.
	     * @returns {Function} Returns the new throttled function.
	     * @example
	     *
	     * // Avoid excessively updating the position while scrolling.
	     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	     *
	     * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	     * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	     * jQuery(element).on('click', throttled);
	     *
	     * // Cancel the trailing throttled invocation.
	     * jQuery(window).on('popstate', throttled.cancel);
	     */
                    function throttle(func, wait, options) {
                        var leading = !0, trailing = !0;
                        if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
                        return isObject(options) && (leading = "leading" in options ? !!options.leading : leading, 
                        trailing = "trailing" in options ? !!options.trailing : trailing), debounce(func, wait, {
                            leading: leading,
                            maxWait: wait,
                            trailing: trailing
                        });
                    }
                    /**
	     * Creates a function that accepts up to one argument, ignoring any
	     * additional arguments.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Function
	     * @param {Function} func The function to cap arguments for.
	     * @returns {Function} Returns the new capped function.
	     * @example
	     *
	     * _.map(['6', '8', '10'], _.unary(parseInt));
	     * // => [6, 8, 10]
	     */
                    function unary(func) {
                        return ary(func, 1);
                    }
                    /**
	     * Creates a function that provides `value` to `wrapper` as its first
	     * argument. Any additional arguments provided to the function are appended
	     * to those provided to the `wrapper`. The wrapper is invoked with the `this`
	     * binding of the created function.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Function
	     * @param {*} value The value to wrap.
	     * @param {Function} [wrapper=identity] The wrapper function.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var p = _.wrap(_.escape, function(func, text) {
	     *   return '<p>' + func(text) + '</p>';
	     * });
	     *
	     * p('fred, barney, & pebbles');
	     * // => '<p>fred, barney, &amp; pebbles</p>'
	     */
                    function wrap(value, wrapper) {
                        return partial(castFunction(wrapper), value);
                    }
                    /*------------------------------------------------------------------------*/
                    /**
	     * Casts `value` as an array if it's not one.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.4.0
	     * @category Lang
	     * @param {*} value The value to inspect.
	     * @returns {Array} Returns the cast array.
	     * @example
	     *
	     * _.castArray(1);
	     * // => [1]
	     *
	     * _.castArray({ 'a': 1 });
	     * // => [{ 'a': 1 }]
	     *
	     * _.castArray('abc');
	     * // => ['abc']
	     *
	     * _.castArray(null);
	     * // => [null]
	     *
	     * _.castArray(undefined);
	     * // => [undefined]
	     *
	     * _.castArray();
	     * // => []
	     *
	     * var array = [1, 2, 3];
	     * console.log(_.castArray(array) === array);
	     * // => true
	     */
                    function castArray() {
                        if (!arguments.length) return [];
                        var value = arguments[0];
                        return isArray(value) ? value : [ value ];
                    }
                    /**
	     * Creates a shallow clone of `value`.
	     *
	     * **Note:** This method is loosely based on the
	     * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
	     * and supports cloning arrays, array buffers, booleans, date objects, maps,
	     * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
	     * arrays. The own enumerable properties of `arguments` objects are cloned
	     * as plain objects. An empty object is returned for uncloneable values such
	     * as error objects, functions, DOM nodes, and WeakMaps.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to clone.
	     * @returns {*} Returns the cloned value.
	     * @see _.cloneDeep
	     * @example
	     *
	     * var objects = [{ 'a': 1 }, { 'b': 2 }];
	     *
	     * var shallow = _.clone(objects);
	     * console.log(shallow[0] === objects[0]);
	     * // => true
	     */
                    function clone(value) {
                        return baseClone(value, CLONE_SYMBOLS_FLAG);
                    }
                    /**
	     * This method is like `_.clone` except that it accepts `customizer` which
	     * is invoked to produce the cloned value. If `customizer` returns `undefined`,
	     * cloning is handled by the method instead. The `customizer` is invoked with
	     * up to four arguments; (value [, index|key, object, stack]).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to clone.
	     * @param {Function} [customizer] The function to customize cloning.
	     * @returns {*} Returns the cloned value.
	     * @see _.cloneDeepWith
	     * @example
	     *
	     * function customizer(value) {
	     *   if (_.isElement(value)) {
	     *     return value.cloneNode(false);
	     *   }
	     * }
	     *
	     * var el = _.cloneWith(document.body, customizer);
	     *
	     * console.log(el === document.body);
	     * // => false
	     * console.log(el.nodeName);
	     * // => 'BODY'
	     * console.log(el.childNodes.length);
	     * // => 0
	     */
                    function cloneWith(value, customizer) {
                        return customizer = "function" == typeof customizer ? customizer : undefined, baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
                    }
                    /**
	     * This method is like `_.clone` except that it recursively clones `value`.
	     *
	     * @static
	     * @memberOf _
	     * @since 1.0.0
	     * @category Lang
	     * @param {*} value The value to recursively clone.
	     * @returns {*} Returns the deep cloned value.
	     * @see _.clone
	     * @example
	     *
	     * var objects = [{ 'a': 1 }, { 'b': 2 }];
	     *
	     * var deep = _.cloneDeep(objects);
	     * console.log(deep[0] === objects[0]);
	     * // => false
	     */
                    function cloneDeep(value) {
                        return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
                    }
                    /**
	     * This method is like `_.cloneWith` except that it recursively clones `value`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to recursively clone.
	     * @param {Function} [customizer] The function to customize cloning.
	     * @returns {*} Returns the deep cloned value.
	     * @see _.cloneWith
	     * @example
	     *
	     * function customizer(value) {
	     *   if (_.isElement(value)) {
	     *     return value.cloneNode(true);
	     *   }
	     * }
	     *
	     * var el = _.cloneDeepWith(document.body, customizer);
	     *
	     * console.log(el === document.body);
	     * // => false
	     * console.log(el.nodeName);
	     * // => 'BODY'
	     * console.log(el.childNodes.length);
	     * // => 20
	     */
                    function cloneDeepWith(value, customizer) {
                        return customizer = "function" == typeof customizer ? customizer : undefined, baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
                    }
                    /**
	     * Checks if `object` conforms to `source` by invoking the predicate
	     * properties of `source` with the corresponding property values of `object`.
	     *
	     * **Note:** This method is equivalent to `_.conforms` when `source` is
	     * partially applied.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.14.0
	     * @category Lang
	     * @param {Object} object The object to inspect.
	     * @param {Object} source The object of property predicates to conform to.
	     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
	     * @example
	     *
	     * var object = { 'a': 1, 'b': 2 };
	     *
	     * _.conformsTo(object, { 'b': function(n) { return n > 1; } });
	     * // => true
	     *
	     * _.conformsTo(object, { 'b': function(n) { return n > 2; } });
	     * // => false
	     */
                    function conformsTo(object, source) {
                        return null == source || baseConformsTo(object, source, keys(source));
                    }
                    /**
	     * Performs a
	     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	     * comparison between two values to determine if they are equivalent.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     * @example
	     *
	     * var object = { 'a': 1 };
	     * var other = { 'a': 1 };
	     *
	     * _.eq(object, object);
	     * // => true
	     *
	     * _.eq(object, other);
	     * // => false
	     *
	     * _.eq('a', 'a');
	     * // => true
	     *
	     * _.eq('a', Object('a'));
	     * // => false
	     *
	     * _.eq(NaN, NaN);
	     * // => true
	     */
                    function eq(value, other) {
                        return value === other || value !== value && other !== other;
                    }
                    /**
	     * Checks if `value` is array-like. A value is considered array-like if it's
	     * not a function and has a `value.length` that's an integer greater than or
	     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	     * @example
	     *
	     * _.isArrayLike([1, 2, 3]);
	     * // => true
	     *
	     * _.isArrayLike(document.body.children);
	     * // => true
	     *
	     * _.isArrayLike('abc');
	     * // => true
	     *
	     * _.isArrayLike(_.noop);
	     * // => false
	     */
                    function isArrayLike(value) {
                        return null != value && isLength(value.length) && !isFunction(value);
                    }
                    /**
	     * This method is like `_.isArrayLike` except that it also checks if `value`
	     * is an object.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an array-like object,
	     *  else `false`.
	     * @example
	     *
	     * _.isArrayLikeObject([1, 2, 3]);
	     * // => true
	     *
	     * _.isArrayLikeObject(document.body.children);
	     * // => true
	     *
	     * _.isArrayLikeObject('abc');
	     * // => false
	     *
	     * _.isArrayLikeObject(_.noop);
	     * // => false
	     */
                    function isArrayLikeObject(value) {
                        return isObjectLike(value) && isArrayLike(value);
                    }
                    /**
	     * Checks if `value` is classified as a boolean primitive or object.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
	     * @example
	     *
	     * _.isBoolean(false);
	     * // => true
	     *
	     * _.isBoolean(null);
	     * // => false
	     */
                    function isBoolean(value) {
                        return value === !0 || value === !1 || isObjectLike(value) && baseGetTag(value) == boolTag;
                    }
                    /**
	     * Checks if `value` is likely a DOM element.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
	     * @example
	     *
	     * _.isElement(document.body);
	     * // => true
	     *
	     * _.isElement('<body>');
	     * // => false
	     */
                    function isElement(value) {
                        return isObjectLike(value) && 1 === value.nodeType && !isPlainObject(value);
                    }
                    /**
	     * Checks if `value` is an empty object, collection, map, or set.
	     *
	     * Objects are considered empty if they have no own enumerable string keyed
	     * properties.
	     *
	     * Array-like values such as `arguments` objects, arrays, buffers, strings, or
	     * jQuery-like collections are considered empty if they have a `length` of `0`.
	     * Similarly, maps and sets are considered empty if they have a `size` of `0`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	     * @example
	     *
	     * _.isEmpty(null);
	     * // => true
	     *
	     * _.isEmpty(true);
	     * // => true
	     *
	     * _.isEmpty(1);
	     * // => true
	     *
	     * _.isEmpty([1, 2, 3]);
	     * // => false
	     *
	     * _.isEmpty({ 'a': 1 });
	     * // => false
	     */
                    function isEmpty(value) {
                        if (null == value) return !0;
                        if (isArrayLike(value) && (isArray(value) || "string" == typeof value || "function" == typeof value.splice || isBuffer(value) || isTypedArray(value) || isArguments(value))) return !value.length;
                        var tag = getTag(value);
                        if (tag == mapTag || tag == setTag) return !value.size;
                        if (isPrototype(value)) return !baseKeys(value).length;
                        for (var key in value) if (hasOwnProperty.call(value, key)) return !1;
                        return !0;
                    }
                    /**
	     * Performs a deep comparison between two values to determine if they are
	     * equivalent.
	     *
	     * **Note:** This method supports comparing arrays, array buffers, booleans,
	     * date objects, error objects, maps, numbers, `Object` objects, regexes,
	     * sets, strings, symbols, and typed arrays. `Object` objects are compared
	     * by their own, not inherited, enumerable properties. Functions and DOM
	     * nodes are compared by strict equality, i.e. `===`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     * @example
	     *
	     * var object = { 'a': 1 };
	     * var other = { 'a': 1 };
	     *
	     * _.isEqual(object, other);
	     * // => true
	     *
	     * object === other;
	     * // => false
	     */
                    function isEqual(value, other) {
                        return baseIsEqual(value, other);
                    }
                    /**
	     * This method is like `_.isEqual` except that it accepts `customizer` which
	     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
	     * are handled by the method instead. The `customizer` is invoked with up to
	     * six arguments: (objValue, othValue [, index|key, object, other, stack]).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @param {Function} [customizer] The function to customize comparisons.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     * @example
	     *
	     * function isGreeting(value) {
	     *   return /^h(?:i|ello)$/.test(value);
	     * }
	     *
	     * function customizer(objValue, othValue) {
	     *   if (isGreeting(objValue) && isGreeting(othValue)) {
	     *     return true;
	     *   }
	     * }
	     *
	     * var array = ['hello', 'goodbye'];
	     * var other = ['hi', 'goodbye'];
	     *
	     * _.isEqualWith(array, other, customizer);
	     * // => true
	     */
                    function isEqualWith(value, other, customizer) {
                        customizer = "function" == typeof customizer ? customizer : undefined;
                        var result = customizer ? customizer(value, other) : undefined;
                        return result === undefined ? baseIsEqual(value, other, undefined, customizer) : !!result;
                    }
                    /**
	     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
	     * `SyntaxError`, `TypeError`, or `URIError` object.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
	     * @example
	     *
	     * _.isError(new Error);
	     * // => true
	     *
	     * _.isError(Error);
	     * // => false
	     */
                    function isError(value) {
                        if (!isObjectLike(value)) return !1;
                        var tag = baseGetTag(value);
                        return tag == errorTag || tag == domExcTag || "string" == typeof value.message && "string" == typeof value.name && !isPlainObject(value);
                    }
                    /**
	     * Checks if `value` is a finite primitive number.
	     *
	     * **Note:** This method is based on
	     * [`Number.isFinite`](https://mdn.io/Number/isFinite).
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
	     * @example
	     *
	     * _.isFinite(3);
	     * // => true
	     *
	     * _.isFinite(Number.MIN_VALUE);
	     * // => true
	     *
	     * _.isFinite(Infinity);
	     * // => false
	     *
	     * _.isFinite('3');
	     * // => false
	     */
                    function isFinite(value) {
                        return "number" == typeof value && nativeIsFinite(value);
                    }
                    /**
	     * Checks if `value` is classified as a `Function` object.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	     * @example
	     *
	     * _.isFunction(_);
	     * // => true
	     *
	     * _.isFunction(/abc/);
	     * // => false
	     */
                    function isFunction(value) {
                        if (!isObject(value)) return !1;
                        // The use of `Object#toString` avoids issues with the `typeof` operator
                        // in Safari 9 which returns 'object' for typed arrays and other constructors.
                        var tag = baseGetTag(value);
                        return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
                    }
                    /**
	     * Checks if `value` is an integer.
	     *
	     * **Note:** This method is based on
	     * [`Number.isInteger`](https://mdn.io/Number/isInteger).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
	     * @example
	     *
	     * _.isInteger(3);
	     * // => true
	     *
	     * _.isInteger(Number.MIN_VALUE);
	     * // => false
	     *
	     * _.isInteger(Infinity);
	     * // => false
	     *
	     * _.isInteger('3');
	     * // => false
	     */
                    function isInteger(value) {
                        return "number" == typeof value && value == toInteger(value);
                    }
                    /**
	     * Checks if `value` is a valid array-like length.
	     *
	     * **Note:** This method is loosely based on
	     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	     * @example
	     *
	     * _.isLength(3);
	     * // => true
	     *
	     * _.isLength(Number.MIN_VALUE);
	     * // => false
	     *
	     * _.isLength(Infinity);
	     * // => false
	     *
	     * _.isLength('3');
	     * // => false
	     */
                    function isLength(value) {
                        return "number" == typeof value && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
                    }
                    /**
	     * Checks if `value` is the
	     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	     * @example
	     *
	     * _.isObject({});
	     * // => true
	     *
	     * _.isObject([1, 2, 3]);
	     * // => true
	     *
	     * _.isObject(_.noop);
	     * // => true
	     *
	     * _.isObject(null);
	     * // => false
	     */
                    function isObject(value) {
                        var type = typeof value;
                        return null != value && ("object" == type || "function" == type);
                    }
                    /**
	     * Checks if `value` is object-like. A value is object-like if it's not `null`
	     * and has a `typeof` result of "object".
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	     * @example
	     *
	     * _.isObjectLike({});
	     * // => true
	     *
	     * _.isObjectLike([1, 2, 3]);
	     * // => true
	     *
	     * _.isObjectLike(_.noop);
	     * // => false
	     *
	     * _.isObjectLike(null);
	     * // => false
	     */
                    function isObjectLike(value) {
                        return null != value && "object" == typeof value;
                    }
                    /**
	     * Performs a partial deep comparison between `object` and `source` to
	     * determine if `object` contains equivalent property values.
	     *
	     * **Note:** This method is equivalent to `_.matches` when `source` is
	     * partially applied.
	     *
	     * Partial comparisons will match empty array and empty object `source`
	     * values against any array or object value, respectively. See `_.isEqual`
	     * for a list of supported value comparisons.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Lang
	     * @param {Object} object The object to inspect.
	     * @param {Object} source The object of property values to match.
	     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	     * @example
	     *
	     * var object = { 'a': 1, 'b': 2 };
	     *
	     * _.isMatch(object, { 'b': 2 });
	     * // => true
	     *
	     * _.isMatch(object, { 'b': 1 });
	     * // => false
	     */
                    function isMatch(object, source) {
                        return object === source || baseIsMatch(object, source, getMatchData(source));
                    }
                    /**
	     * This method is like `_.isMatch` except that it accepts `customizer` which
	     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
	     * are handled by the method instead. The `customizer` is invoked with five
	     * arguments: (objValue, srcValue, index|key, object, source).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {Object} object The object to inspect.
	     * @param {Object} source The object of property values to match.
	     * @param {Function} [customizer] The function to customize comparisons.
	     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	     * @example
	     *
	     * function isGreeting(value) {
	     *   return /^h(?:i|ello)$/.test(value);
	     * }
	     *
	     * function customizer(objValue, srcValue) {
	     *   if (isGreeting(objValue) && isGreeting(srcValue)) {
	     *     return true;
	     *   }
	     * }
	     *
	     * var object = { 'greeting': 'hello' };
	     * var source = { 'greeting': 'hi' };
	     *
	     * _.isMatchWith(object, source, customizer);
	     * // => true
	     */
                    function isMatchWith(object, source, customizer) {
                        return customizer = "function" == typeof customizer ? customizer : undefined, baseIsMatch(object, source, getMatchData(source), customizer);
                    }
                    /**
	     * Checks if `value` is `NaN`.
	     *
	     * **Note:** This method is based on
	     * [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as
	     * global [`isNaN`](https://mdn.io/isNaN) which returns `true` for
	     * `undefined` and other non-number values.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	     * @example
	     *
	     * _.isNaN(NaN);
	     * // => true
	     *
	     * _.isNaN(new Number(NaN));
	     * // => true
	     *
	     * isNaN(undefined);
	     * // => true
	     *
	     * _.isNaN(undefined);
	     * // => false
	     */
                    function isNaN(value) {
                        // An `NaN` primitive is the only value that is not equal to itself.
                        // Perform the `toStringTag` check first to avoid errors with some
                        // ActiveX objects in IE.
                        return isNumber(value) && value != +value;
                    }
                    /**
	     * Checks if `value` is a pristine native function.
	     *
	     * **Note:** This method can't reliably detect native functions in the presence
	     * of the core-js package because core-js circumvents this kind of detection.
	     * Despite multiple requests, the core-js maintainer has made it clear: any
	     * attempt to fix the detection will be obstructed. As a result, we're left
	     * with little choice but to throw an error. Unfortunately, this also affects
	     * packages, like [babel-polyfill](https://www.npmjs.com/package/babel-polyfill),
	     * which rely on core-js.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a native function,
	     *  else `false`.
	     * @example
	     *
	     * _.isNative(Array.prototype.push);
	     * // => true
	     *
	     * _.isNative(_);
	     * // => false
	     */
                    function isNative(value) {
                        if (isMaskable(value)) throw new Error(CORE_ERROR_TEXT);
                        return baseIsNative(value);
                    }
                    /**
	     * Checks if `value` is `null`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
	     * @example
	     *
	     * _.isNull(null);
	     * // => true
	     *
	     * _.isNull(void 0);
	     * // => false
	     */
                    function isNull(value) {
                        return null === value;
                    }
                    /**
	     * Checks if `value` is `null` or `undefined`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
	     * @example
	     *
	     * _.isNil(null);
	     * // => true
	     *
	     * _.isNil(void 0);
	     * // => true
	     *
	     * _.isNil(NaN);
	     * // => false
	     */
                    function isNil(value) {
                        return null == value;
                    }
                    /**
	     * Checks if `value` is classified as a `Number` primitive or object.
	     *
	     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
	     * classified as numbers, use the `_.isFinite` method.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.1.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a number, else `false`.
	     * @example
	     *
	     * _.isNumber(3);
	     * // => true
	     *
	     * _.isNumber(Number.MIN_VALUE);
	     * // => true
	     *
	     * _.isNumber(Infinity);
	     * // => true
	     *
	     * _.isNumber('3');
	     * // => false
	     */
                    function isNumber(value) {
                        return "number" == typeof value || isObjectLike(value) && baseGetTag(value) == numberTag;
                    }
                    /**
	     * Checks if `value` is a plain object, that is, an object created by the
	     * `Object` constructor or one with a `[[Prototype]]` of `null`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.8.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     * }
	     *
	     * _.isPlainObject(new Foo);
	     * // => false
	     *
	     * _.isPlainObject([1, 2, 3]);
	     * // => false
	     *
	     * _.isPlainObject({ 'x': 0, 'y': 0 });
	     * // => true
	     *
	     * _.isPlainObject(Object.create(null));
	     * // => true
	     */
                    function isPlainObject(value) {
                        if (!isObjectLike(value) || baseGetTag(value) != objectTag) return !1;
                        var proto = getPrototype(value);
                        if (null === proto) return !0;
                        var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
                        return "function" == typeof Ctor && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
                    }
                    /**
	     * Checks if `value` is a safe integer. An integer is safe if it's an IEEE-754
	     * double precision number which isn't the result of a rounded unsafe integer.
	     *
	     * **Note:** This method is based on
	     * [`Number.isSafeInteger`](https://mdn.io/Number/isSafeInteger).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a safe integer, else `false`.
	     * @example
	     *
	     * _.isSafeInteger(3);
	     * // => true
	     *
	     * _.isSafeInteger(Number.MIN_VALUE);
	     * // => false
	     *
	     * _.isSafeInteger(Infinity);
	     * // => false
	     *
	     * _.isSafeInteger('3');
	     * // => false
	     */
                    function isSafeInteger(value) {
                        return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
                    }
                    /**
	     * Checks if `value` is classified as a `String` primitive or object.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a string, else `false`.
	     * @example
	     *
	     * _.isString('abc');
	     * // => true
	     *
	     * _.isString(1);
	     * // => false
	     */
                    function isString(value) {
                        return "string" == typeof value || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
                    }
                    /**
	     * Checks if `value` is classified as a `Symbol` primitive or object.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	     * @example
	     *
	     * _.isSymbol(Symbol.iterator);
	     * // => true
	     *
	     * _.isSymbol('abc');
	     * // => false
	     */
                    function isSymbol(value) {
                        return "symbol" == typeof value || isObjectLike(value) && baseGetTag(value) == symbolTag;
                    }
                    /**
	     * Checks if `value` is `undefined`.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	     * @example
	     *
	     * _.isUndefined(void 0);
	     * // => true
	     *
	     * _.isUndefined(null);
	     * // => false
	     */
                    function isUndefined(value) {
                        return value === undefined;
                    }
                    /**
	     * Checks if `value` is classified as a `WeakMap` object.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.3.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
	     * @example
	     *
	     * _.isWeakMap(new WeakMap);
	     * // => true
	     *
	     * _.isWeakMap(new Map);
	     * // => false
	     */
                    function isWeakMap(value) {
                        return isObjectLike(value) && getTag(value) == weakMapTag;
                    }
                    /**
	     * Checks if `value` is classified as a `WeakSet` object.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.3.0
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a weak set, else `false`.
	     * @example
	     *
	     * _.isWeakSet(new WeakSet);
	     * // => true
	     *
	     * _.isWeakSet(new Set);
	     * // => false
	     */
                    function isWeakSet(value) {
                        return isObjectLike(value) && baseGetTag(value) == weakSetTag;
                    }
                    /**
	     * Converts `value` to an array.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {Array} Returns the converted array.
	     * @example
	     *
	     * _.toArray({ 'a': 1, 'b': 2 });
	     * // => [1, 2]
	     *
	     * _.toArray('abc');
	     * // => ['a', 'b', 'c']
	     *
	     * _.toArray(1);
	     * // => []
	     *
	     * _.toArray(null);
	     * // => []
	     */
                    function toArray(value) {
                        if (!value) return [];
                        if (isArrayLike(value)) return isString(value) ? stringToArray(value) : copyArray(value);
                        if (symIterator && value[symIterator]) return iteratorToArray(value[symIterator]());
                        var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
                        return func(value);
                    }
                    /**
	     * Converts `value` to a finite number.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.12.0
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {number} Returns the converted number.
	     * @example
	     *
	     * _.toFinite(3.2);
	     * // => 3.2
	     *
	     * _.toFinite(Number.MIN_VALUE);
	     * // => 5e-324
	     *
	     * _.toFinite(Infinity);
	     * // => 1.7976931348623157e+308
	     *
	     * _.toFinite('3.2');
	     * // => 3.2
	     */
                    function toFinite(value) {
                        if (!value) return 0 === value ? value : 0;
                        if (value = toNumber(value), value === INFINITY || value === -INFINITY) {
                            var sign = value < 0 ? -1 : 1;
                            return sign * MAX_INTEGER;
                        }
                        return value === value ? value : 0;
                    }
                    /**
	     * Converts `value` to an integer.
	     *
	     * **Note:** This method is loosely based on
	     * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {number} Returns the converted integer.
	     * @example
	     *
	     * _.toInteger(3.2);
	     * // => 3
	     *
	     * _.toInteger(Number.MIN_VALUE);
	     * // => 0
	     *
	     * _.toInteger(Infinity);
	     * // => 1.7976931348623157e+308
	     *
	     * _.toInteger('3.2');
	     * // => 3
	     */
                    function toInteger(value) {
                        var result = toFinite(value), remainder = result % 1;
                        return result === result ? remainder ? result - remainder : result : 0;
                    }
                    /**
	     * Converts `value` to an integer suitable for use as the length of an
	     * array-like object.
	     *
	     * **Note:** This method is based on
	     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {number} Returns the converted integer.
	     * @example
	     *
	     * _.toLength(3.2);
	     * // => 3
	     *
	     * _.toLength(Number.MIN_VALUE);
	     * // => 0
	     *
	     * _.toLength(Infinity);
	     * // => 4294967295
	     *
	     * _.toLength('3.2');
	     * // => 3
	     */
                    function toLength(value) {
                        return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
                    }
                    /**
	     * Converts `value` to a number.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to process.
	     * @returns {number} Returns the number.
	     * @example
	     *
	     * _.toNumber(3.2);
	     * // => 3.2
	     *
	     * _.toNumber(Number.MIN_VALUE);
	     * // => 5e-324
	     *
	     * _.toNumber(Infinity);
	     * // => Infinity
	     *
	     * _.toNumber('3.2');
	     * // => 3.2
	     */
                    function toNumber(value) {
                        if ("number" == typeof value) return value;
                        if (isSymbol(value)) return NAN;
                        if (isObject(value)) {
                            var other = "function" == typeof value.valueOf ? value.valueOf() : value;
                            value = isObject(other) ? other + "" : other;
                        }
                        if ("string" != typeof value) return 0 === value ? value : +value;
                        value = value.replace(reTrim, "");
                        var isBinary = reIsBinary.test(value);
                        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
                    }
                    /**
	     * Converts `value` to a plain object flattening inherited enumerable string
	     * keyed properties of `value` to own properties of the plain object.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {Object} Returns the converted plain object.
	     * @example
	     *
	     * function Foo() {
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.assign({ 'a': 1 }, new Foo);
	     * // => { 'a': 1, 'b': 2 }
	     *
	     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	     * // => { 'a': 1, 'b': 2, 'c': 3 }
	     */
                    function toPlainObject(value) {
                        return copyObject(value, keysIn(value));
                    }
                    /**
	     * Converts `value` to a safe integer. A safe integer can be compared and
	     * represented correctly.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {number} Returns the converted integer.
	     * @example
	     *
	     * _.toSafeInteger(3.2);
	     * // => 3
	     *
	     * _.toSafeInteger(Number.MIN_VALUE);
	     * // => 0
	     *
	     * _.toSafeInteger(Infinity);
	     * // => 9007199254740991
	     *
	     * _.toSafeInteger('3.2');
	     * // => 3
	     */
                    function toSafeInteger(value) {
                        return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : 0 === value ? value : 0;
                    }
                    /**
	     * Converts `value` to a string. An empty string is returned for `null`
	     * and `undefined` values. The sign of `-0` is preserved.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {string} Returns the converted string.
	     * @example
	     *
	     * _.toString(null);
	     * // => ''
	     *
	     * _.toString(-0);
	     * // => '-0'
	     *
	     * _.toString([1, 2, 3]);
	     * // => '1,2,3'
	     */
                    function toString(value) {
                        return null == value ? "" : baseToString(value);
                    }
                    /**
	     * Creates an object that inherits from the `prototype` object. If a
	     * `properties` object is given, its own enumerable string keyed properties
	     * are assigned to the created object.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.3.0
	     * @category Object
	     * @param {Object} prototype The object to inherit from.
	     * @param {Object} [properties] The properties to assign to the object.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * function Circle() {
	     *   Shape.call(this);
	     * }
	     *
	     * Circle.prototype = _.create(Shape.prototype, {
	     *   'constructor': Circle
	     * });
	     *
	     * var circle = new Circle;
	     * circle instanceof Circle;
	     * // => true
	     *
	     * circle instanceof Shape;
	     * // => true
	     */
                    function create(prototype, properties) {
                        var result = baseCreate(prototype);
                        return null == properties ? result : baseAssign(result, properties);
                    }
                    /**
	     * This method is like `_.find` except that it returns the key of the first
	     * element `predicate` returns truthy for instead of the element itself.
	     *
	     * @static
	     * @memberOf _
	     * @since 1.1.0
	     * @category Object
	     * @param {Object} object The object to inspect.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @returns {string|undefined} Returns the key of the matched element,
	     *  else `undefined`.
	     * @example
	     *
	     * var users = {
	     *   'barney':  { 'age': 36, 'active': true },
	     *   'fred':    { 'age': 40, 'active': false },
	     *   'pebbles': { 'age': 1,  'active': true }
	     * };
	     *
	     * _.findKey(users, function(o) { return o.age < 40; });
	     * // => 'barney' (iteration order is not guaranteed)
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.findKey(users, { 'age': 1, 'active': true });
	     * // => 'pebbles'
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.findKey(users, ['active', false]);
	     * // => 'fred'
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.findKey(users, 'active');
	     * // => 'barney'
	     */
                    function findKey(object, predicate) {
                        return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
                    }
                    /**
	     * This method is like `_.findKey` except that it iterates over elements of
	     * a collection in the opposite order.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.0.0
	     * @category Object
	     * @param {Object} object The object to inspect.
	     * @param {Function} [predicate=_.identity] The function invoked per iteration.
	     * @returns {string|undefined} Returns the key of the matched element,
	     *  else `undefined`.
	     * @example
	     *
	     * var users = {
	     *   'barney':  { 'age': 36, 'active': true },
	     *   'fred':    { 'age': 40, 'active': false },
	     *   'pebbles': { 'age': 1,  'active': true }
	     * };
	     *
	     * _.findLastKey(users, function(o) { return o.age < 40; });
	     * // => returns 'pebbles' assuming `_.findKey` returns 'barney'
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.findLastKey(users, { 'age': 36, 'active': true });
	     * // => 'barney'
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.findLastKey(users, ['active', false]);
	     * // => 'fred'
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.findLastKey(users, 'active');
	     * // => 'pebbles'
	     */
                    function findLastKey(object, predicate) {
                        return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
                    }
                    /**
	     * Iterates over own and inherited enumerable string keyed properties of an
	     * object and invokes `iteratee` for each property. The iteratee is invoked
	     * with three arguments: (value, key, object). Iteratee functions may exit
	     * iteration early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.3.0
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     * @see _.forInRight
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forIn(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => Logs 'a', 'b', then 'c' (iteration order is not guaranteed).
	     */
                    function forIn(object, iteratee) {
                        return null == object ? object : baseFor(object, getIteratee(iteratee, 3), keysIn);
                    }
                    /**
	     * This method is like `_.forIn` except that it iterates over properties of
	     * `object` in the opposite order.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.0.0
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     * @see _.forIn
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forInRight(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => Logs 'c', 'b', then 'a' assuming `_.forIn` logs 'a', 'b', then 'c'.
	     */
                    function forInRight(object, iteratee) {
                        return null == object ? object : baseForRight(object, getIteratee(iteratee, 3), keysIn);
                    }
                    /**
	     * Iterates over own enumerable string keyed properties of an object and
	     * invokes `iteratee` for each property. The iteratee is invoked with three
	     * arguments: (value, key, object). Iteratee functions may exit iteration
	     * early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.3.0
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     * @see _.forOwnRight
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forOwn(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
	     */
                    function forOwn(object, iteratee) {
                        return object && baseForOwn(object, getIteratee(iteratee, 3));
                    }
                    /**
	     * This method is like `_.forOwn` except that it iterates over properties of
	     * `object` in the opposite order.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.0.0
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     * @see _.forOwn
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forOwnRight(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => Logs 'b' then 'a' assuming `_.forOwn` logs 'a' then 'b'.
	     */
                    function forOwnRight(object, iteratee) {
                        return object && baseForOwnRight(object, getIteratee(iteratee, 3));
                    }
                    /**
	     * Creates an array of function property names from own enumerable properties
	     * of `object`.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns the function names.
	     * @see _.functionsIn
	     * @example
	     *
	     * function Foo() {
	     *   this.a = _.constant('a');
	     *   this.b = _.constant('b');
	     * }
	     *
	     * Foo.prototype.c = _.constant('c');
	     *
	     * _.functions(new Foo);
	     * // => ['a', 'b']
	     */
                    function functions(object) {
                        return null == object ? [] : baseFunctions(object, keys(object));
                    }
                    /**
	     * Creates an array of function property names from own and inherited
	     * enumerable properties of `object`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Object
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns the function names.
	     * @see _.functions
	     * @example
	     *
	     * function Foo() {
	     *   this.a = _.constant('a');
	     *   this.b = _.constant('b');
	     * }
	     *
	     * Foo.prototype.c = _.constant('c');
	     *
	     * _.functionsIn(new Foo);
	     * // => ['a', 'b', 'c']
	     */
                    function functionsIn(object) {
                        return null == object ? [] : baseFunctions(object, keysIn(object));
                    }
                    /**
	     * Gets the value at `path` of `object`. If the resolved value is
	     * `undefined`, the `defaultValue` is returned in its place.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.7.0
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the property to get.
	     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	     * @returns {*} Returns the resolved value.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	     *
	     * _.get(object, 'a[0].b.c');
	     * // => 3
	     *
	     * _.get(object, ['a', '0', 'b', 'c']);
	     * // => 3
	     *
	     * _.get(object, 'a.b.c', 'default');
	     * // => 'default'
	     */
                    function get(object, path, defaultValue) {
                        var result = null == object ? undefined : baseGet(object, path);
                        return result === undefined ? defaultValue : result;
                    }
                    /**
	     * Checks if `path` is a direct property of `object`.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path to check.
	     * @returns {boolean} Returns `true` if `path` exists, else `false`.
	     * @example
	     *
	     * var object = { 'a': { 'b': 2 } };
	     * var other = _.create({ 'a': _.create({ 'b': 2 }) });
	     *
	     * _.has(object, 'a');
	     * // => true
	     *
	     * _.has(object, 'a.b');
	     * // => true
	     *
	     * _.has(object, ['a', 'b']);
	     * // => true
	     *
	     * _.has(other, 'a');
	     * // => false
	     */
                    function has(object, path) {
                        return null != object && hasPath(object, path, baseHas);
                    }
                    /**
	     * Checks if `path` is a direct or inherited property of `object`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path to check.
	     * @returns {boolean} Returns `true` if `path` exists, else `false`.
	     * @example
	     *
	     * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	     *
	     * _.hasIn(object, 'a');
	     * // => true
	     *
	     * _.hasIn(object, 'a.b');
	     * // => true
	     *
	     * _.hasIn(object, ['a', 'b']);
	     * // => true
	     *
	     * _.hasIn(object, 'b');
	     * // => false
	     */
                    function hasIn(object, path) {
                        return null != object && hasPath(object, path, baseHasIn);
                    }
                    /**
	     * Creates an array of the own enumerable property names of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects. See the
	     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	     * for more details.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.keys(new Foo);
	     * // => ['a', 'b'] (iteration order is not guaranteed)
	     *
	     * _.keys('hi');
	     * // => ['0', '1']
	     */
                    function keys(object) {
                        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
                    }
                    /**
	     * Creates an array of the own and inherited enumerable property names of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.keysIn(new Foo);
	     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	     */
                    function keysIn(object) {
                        return isArrayLike(object) ? arrayLikeKeys(object, !0) : baseKeysIn(object);
                    }
                    /**
	     * The opposite of `_.mapValues`; this method creates an object with the
	     * same values as `object` and keys generated by running each own enumerable
	     * string keyed property of `object` thru `iteratee`. The iteratee is invoked
	     * with three arguments: (value, key, object).
	     *
	     * @static
	     * @memberOf _
	     * @since 3.8.0
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Object} Returns the new mapped object.
	     * @see _.mapValues
	     * @example
	     *
	     * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
	     *   return key + value;
	     * });
	     * // => { 'a1': 1, 'b2': 2 }
	     */
                    function mapKeys(object, iteratee) {
                        var result = {};
                        return iteratee = getIteratee(iteratee, 3), baseForOwn(object, function(value, key, object) {
                            baseAssignValue(result, iteratee(value, key, object), value);
                        }), result;
                    }
                    /**
	     * Creates an object with the same keys as `object` and values generated
	     * by running each own enumerable string keyed property of `object` thru
	     * `iteratee`. The iteratee is invoked with three arguments:
	     * (value, key, object).
	     *
	     * @static
	     * @memberOf _
	     * @since 2.4.0
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Object} Returns the new mapped object.
	     * @see _.mapKeys
	     * @example
	     *
	     * var users = {
	     *   'fred':    { 'user': 'fred',    'age': 40 },
	     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
	     * };
	     *
	     * _.mapValues(users, function(o) { return o.age; });
	     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.mapValues(users, 'age');
	     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
	     */
                    function mapValues(object, iteratee) {
                        var result = {};
                        return iteratee = getIteratee(iteratee, 3), baseForOwn(object, function(value, key, object) {
                            baseAssignValue(result, key, iteratee(value, key, object));
                        }), result;
                    }
                    /**
	     * The opposite of `_.pickBy`; this method creates an object composed of
	     * the own and inherited enumerable string keyed properties of `object` that
	     * `predicate` doesn't return truthy for. The predicate is invoked with two
	     * arguments: (value, key).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Object
	     * @param {Object} object The source object.
	     * @param {Function} [predicate=_.identity] The function invoked per property.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * var object = { 'a': 1, 'b': '2', 'c': 3 };
	     *
	     * _.omitBy(object, _.isNumber);
	     * // => { 'b': '2' }
	     */
                    function omitBy(object, predicate) {
                        return pickBy(object, negate(getIteratee(predicate)));
                    }
                    /**
	     * Creates an object composed of the `object` properties `predicate` returns
	     * truthy for. The predicate is invoked with two arguments: (value, key).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Object
	     * @param {Object} object The source object.
	     * @param {Function} [predicate=_.identity] The function invoked per property.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * var object = { 'a': 1, 'b': '2', 'c': 3 };
	     *
	     * _.pickBy(object, _.isNumber);
	     * // => { 'a': 1, 'c': 3 }
	     */
                    function pickBy(object, predicate) {
                        if (null == object) return {};
                        var props = arrayMap(getAllKeysIn(object), function(prop) {
                            return [ prop ];
                        });
                        return predicate = getIteratee(predicate), basePickBy(object, props, function(value, path) {
                            return predicate(value, path[0]);
                        });
                    }
                    /**
	     * This method is like `_.get` except that if the resolved value is a
	     * function it's invoked with the `this` binding of its parent object and
	     * its result is returned.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the property to resolve.
	     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	     * @returns {*} Returns the resolved value.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
	     *
	     * _.result(object, 'a[0].b.c1');
	     * // => 3
	     *
	     * _.result(object, 'a[0].b.c2');
	     * // => 4
	     *
	     * _.result(object, 'a[0].b.c3', 'default');
	     * // => 'default'
	     *
	     * _.result(object, 'a[0].b.c3', _.constant('default'));
	     * // => 'default'
	     */
                    function result(object, path, defaultValue) {
                        path = castPath(path, object);
                        var index = -1, length = path.length;
                        for (// Ensure the loop is entered when path is empty.
                        length || (length = 1, object = undefined); ++index < length; ) {
                            var value = null == object ? undefined : object[toKey(path[index])];
                            value === undefined && (index = length, value = defaultValue), object = isFunction(value) ? value.call(object) : value;
                        }
                        return object;
                    }
                    /**
	     * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
	     * it's created. Arrays are created for missing index properties while objects
	     * are created for all other missing properties. Use `_.setWith` to customize
	     * `path` creation.
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.7.0
	     * @category Object
	     * @param {Object} object The object to modify.
	     * @param {Array|string} path The path of the property to set.
	     * @param {*} value The value to set.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	     *
	     * _.set(object, 'a[0].b.c', 4);
	     * console.log(object.a[0].b.c);
	     * // => 4
	     *
	     * _.set(object, ['x', '0', 'y', 'z'], 5);
	     * console.log(object.x[0].y.z);
	     * // => 5
	     */
                    function set(object, path, value) {
                        return null == object ? object : baseSet(object, path, value);
                    }
                    /**
	     * This method is like `_.set` except that it accepts `customizer` which is
	     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
	     * path creation is handled by the method instead. The `customizer` is invoked
	     * with three arguments: (nsValue, key, nsObject).
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Object
	     * @param {Object} object The object to modify.
	     * @param {Array|string} path The path of the property to set.
	     * @param {*} value The value to set.
	     * @param {Function} [customizer] The function to customize assigned values.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var object = {};
	     *
	     * _.setWith(object, '[0][1]', 'a', Object);
	     * // => { '0': { '1': 'a' } }
	     */
                    function setWith(object, path, value, customizer) {
                        return customizer = "function" == typeof customizer ? customizer : undefined, null == object ? object : baseSet(object, path, value, customizer);
                    }
                    /**
	     * An alternative to `_.reduce`; this method transforms `object` to a new
	     * `accumulator` object which is the result of running each of its own
	     * enumerable string keyed properties thru `iteratee`, with each invocation
	     * potentially mutating the `accumulator` object. If `accumulator` is not
	     * provided, a new object with the same `[[Prototype]]` will be used. The
	     * iteratee is invoked with four arguments: (accumulator, value, key, object).
	     * Iteratee functions may exit iteration early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @since 1.3.0
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [accumulator] The custom accumulator value.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * _.transform([2, 3, 4], function(result, n) {
	     *   result.push(n *= n);
	     *   return n % 2 == 0;
	     * }, []);
	     * // => [4, 9]
	     *
	     * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
	     *   (result[value] || (result[value] = [])).push(key);
	     * }, {});
	     * // => { '1': ['a', 'c'], '2': ['b'] }
	     */
                    function transform(object, iteratee, accumulator) {
                        var isArr = isArray(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
                        if (iteratee = getIteratee(iteratee, 4), null == accumulator) {
                            var Ctor = object && object.constructor;
                            accumulator = isArrLike ? isArr ? new Ctor() : [] : isObject(object) && isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
                        }
                        return (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object) {
                            return iteratee(accumulator, value, index, object);
                        }), accumulator;
                    }
                    /**
	     * Removes the property at `path` of `object`.
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Object
	     * @param {Object} object The object to modify.
	     * @param {Array|string} path The path of the property to unset.
	     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c': 7 } }] };
	     * _.unset(object, 'a[0].b.c');
	     * // => true
	     *
	     * console.log(object);
	     * // => { 'a': [{ 'b': {} }] };
	     *
	     * _.unset(object, ['a', '0', 'b', 'c']);
	     * // => true
	     *
	     * console.log(object);
	     * // => { 'a': [{ 'b': {} }] };
	     */
                    function unset(object, path) {
                        return null == object || baseUnset(object, path);
                    }
                    /**
	     * This method is like `_.set` except that accepts `updater` to produce the
	     * value to set. Use `_.updateWith` to customize `path` creation. The `updater`
	     * is invoked with one argument: (value).
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.6.0
	     * @category Object
	     * @param {Object} object The object to modify.
	     * @param {Array|string} path The path of the property to set.
	     * @param {Function} updater The function to produce the updated value.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	     *
	     * _.update(object, 'a[0].b.c', function(n) { return n * n; });
	     * console.log(object.a[0].b.c);
	     * // => 9
	     *
	     * _.update(object, 'x[0].y.z', function(n) { return n ? n + 1 : 0; });
	     * console.log(object.x[0].y.z);
	     * // => 0
	     */
                    function update(object, path, updater) {
                        return null == object ? object : baseUpdate(object, path, castFunction(updater));
                    }
                    /**
	     * This method is like `_.update` except that it accepts `customizer` which is
	     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
	     * path creation is handled by the method instead. The `customizer` is invoked
	     * with three arguments: (nsValue, key, nsObject).
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.6.0
	     * @category Object
	     * @param {Object} object The object to modify.
	     * @param {Array|string} path The path of the property to set.
	     * @param {Function} updater The function to produce the updated value.
	     * @param {Function} [customizer] The function to customize assigned values.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var object = {};
	     *
	     * _.updateWith(object, '[0][1]', _.constant('a'), Object);
	     * // => { '0': { '1': 'a' } }
	     */
                    function updateWith(object, path, updater, customizer) {
                        return customizer = "function" == typeof customizer ? customizer : undefined, null == object ? object : baseUpdate(object, path, castFunction(updater), customizer);
                    }
                    /**
	     * Creates an array of the own enumerable string keyed property values of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property values.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.values(new Foo);
	     * // => [1, 2] (iteration order is not guaranteed)
	     *
	     * _.values('hi');
	     * // => ['h', 'i']
	     */
                    function values(object) {
                        return null == object ? [] : baseValues(object, keys(object));
                    }
                    /**
	     * Creates an array of the own and inherited enumerable string keyed property
	     * values of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property values.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.valuesIn(new Foo);
	     * // => [1, 2, 3] (iteration order is not guaranteed)
	     */
                    function valuesIn(object) {
                        return null == object ? [] : baseValues(object, keysIn(object));
                    }
                    /*------------------------------------------------------------------------*/
                    /**
	     * Clamps `number` within the inclusive `lower` and `upper` bounds.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Number
	     * @param {number} number The number to clamp.
	     * @param {number} [lower] The lower bound.
	     * @param {number} upper The upper bound.
	     * @returns {number} Returns the clamped number.
	     * @example
	     *
	     * _.clamp(-10, -5, 5);
	     * // => -5
	     *
	     * _.clamp(10, -5, 5);
	     * // => 5
	     */
                    function clamp(number, lower, upper) {
                        return upper === undefined && (upper = lower, lower = undefined), upper !== undefined && (upper = toNumber(upper), 
                        upper = upper === upper ? upper : 0), lower !== undefined && (lower = toNumber(lower), 
                        lower = lower === lower ? lower : 0), baseClamp(toNumber(number), lower, upper);
                    }
                    /**
	     * Checks if `n` is between `start` and up to, but not including, `end`. If
	     * `end` is not specified, it's set to `start` with `start` then set to `0`.
	     * If `start` is greater than `end` the params are swapped to support
	     * negative ranges.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.3.0
	     * @category Number
	     * @param {number} number The number to check.
	     * @param {number} [start=0] The start of the range.
	     * @param {number} end The end of the range.
	     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
	     * @see _.range, _.rangeRight
	     * @example
	     *
	     * _.inRange(3, 2, 4);
	     * // => true
	     *
	     * _.inRange(4, 8);
	     * // => true
	     *
	     * _.inRange(4, 2);
	     * // => false
	     *
	     * _.inRange(2, 2);
	     * // => false
	     *
	     * _.inRange(1.2, 2);
	     * // => true
	     *
	     * _.inRange(5.2, 4);
	     * // => false
	     *
	     * _.inRange(-3, -2, -6);
	     * // => true
	     */
                    function inRange(number, start, end) {
                        return start = toFinite(start), end === undefined ? (end = start, start = 0) : end = toFinite(end), 
                        number = toNumber(number), baseInRange(number, start, end);
                    }
                    /**
	     * Produces a random number between the inclusive `lower` and `upper` bounds.
	     * If only one argument is provided a number between `0` and the given number
	     * is returned. If `floating` is `true`, or either `lower` or `upper` are
	     * floats, a floating-point number is returned instead of an integer.
	     *
	     * **Note:** JavaScript follows the IEEE-754 standard for resolving
	     * floating-point values which can produce unexpected results.
	     *
	     * @static
	     * @memberOf _
	     * @since 0.7.0
	     * @category Number
	     * @param {number} [lower=0] The lower bound.
	     * @param {number} [upper=1] The upper bound.
	     * @param {boolean} [floating] Specify returning a floating-point number.
	     * @returns {number} Returns the random number.
	     * @example
	     *
	     * _.random(0, 5);
	     * // => an integer between 0 and 5
	     *
	     * _.random(5);
	     * // => also an integer between 0 and 5
	     *
	     * _.random(5, true);
	     * // => a floating-point number between 0 and 5
	     *
	     * _.random(1.2, 5.2);
	     * // => a floating-point number between 1.2 and 5.2
	     */
                    function random(lower, upper, floating) {
                        if (floating && "boolean" != typeof floating && isIterateeCall(lower, upper, floating) && (upper = floating = undefined), 
                        floating === undefined && ("boolean" == typeof upper ? (floating = upper, upper = undefined) : "boolean" == typeof lower && (floating = lower, 
                        lower = undefined)), lower === undefined && upper === undefined ? (lower = 0, upper = 1) : (lower = toFinite(lower), 
                        upper === undefined ? (upper = lower, lower = 0) : upper = toFinite(upper)), lower > upper) {
                            var temp = lower;
                            lower = upper, upper = temp;
                        }
                        if (floating || lower % 1 || upper % 1) {
                            var rand = nativeRandom();
                            return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
                        }
                        return baseRandom(lower, upper);
                    }
                    /**
	     * Converts the first character of `string` to upper case and the remaining
	     * to lower case.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category String
	     * @param {string} [string=''] The string to capitalize.
	     * @returns {string} Returns the capitalized string.
	     * @example
	     *
	     * _.capitalize('FRED');
	     * // => 'Fred'
	     */
                    function capitalize(string) {
                        return upperFirst(toString(string).toLowerCase());
                    }
                    /**
	     * Deburrs `string` by converting
	     * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
	     * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
	     * letters to basic Latin letters and removing
	     * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category String
	     * @param {string} [string=''] The string to deburr.
	     * @returns {string} Returns the deburred string.
	     * @example
	     *
	     * _.deburr('déjà vu');
	     * // => 'deja vu'
	     */
                    function deburr(string) {
                        return string = toString(string), string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
                    }
                    /**
	     * Checks if `string` ends with the given target string.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category String
	     * @param {string} [string=''] The string to inspect.
	     * @param {string} [target] The string to search for.
	     * @param {number} [position=string.length] The position to search up to.
	     * @returns {boolean} Returns `true` if `string` ends with `target`,
	     *  else `false`.
	     * @example
	     *
	     * _.endsWith('abc', 'c');
	     * // => true
	     *
	     * _.endsWith('abc', 'b');
	     * // => false
	     *
	     * _.endsWith('abc', 'b', 2);
	     * // => true
	     */
                    function endsWith(string, target, position) {
                        string = toString(string), target = baseToString(target);
                        var length = string.length;
                        position = position === undefined ? length : baseClamp(toInteger(position), 0, length);
                        var end = position;
                        return position -= target.length, position >= 0 && string.slice(position, end) == target;
                    }
                    /**
	     * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
	     * corresponding HTML entities.
	     *
	     * **Note:** No other characters are escaped. To escape additional
	     * characters use a third-party library like [_he_](https://mths.be/he).
	     *
	     * Though the ">" character is escaped for symmetry, characters like
	     * ">" and "/" don't need escaping in HTML and have no special meaning
	     * unless they're part of a tag or unquoted attribute value. See
	     * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
	     * (under "semi-related fun fact") for more details.
	     *
	     * When working with HTML you should always
	     * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
	     * XSS vectors.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to escape.
	     * @returns {string} Returns the escaped string.
	     * @example
	     *
	     * _.escape('fred, barney, & pebbles');
	     * // => 'fred, barney, &amp; pebbles'
	     */
                    function escape(string) {
                        return string = toString(string), string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
                    }
                    /**
	     * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
	     * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category String
	     * @param {string} [string=''] The string to escape.
	     * @returns {string} Returns the escaped string.
	     * @example
	     *
	     * _.escapeRegExp('[lodash](https://lodash.com/)');
	     * // => '\[lodash\]\(https://lodash\.com/\)'
	     */
                    function escapeRegExp(string) {
                        return string = toString(string), string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
                    }
                    /**
	     * Pads `string` on the left and right sides if it's shorter than `length`.
	     * Padding characters are truncated if they can't be evenly divided by `length`.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category String
	     * @param {string} [string=''] The string to pad.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the padded string.
	     * @example
	     *
	     * _.pad('abc', 8);
	     * // => '  abc   '
	     *
	     * _.pad('abc', 8, '_-');
	     * // => '_-abc_-_'
	     *
	     * _.pad('abc', 3);
	     * // => 'abc'
	     */
                    function pad(string, length, chars) {
                        string = toString(string), length = toInteger(length);
                        var strLength = length ? stringSize(string) : 0;
                        if (!length || strLength >= length) return string;
                        var mid = (length - strLength) / 2;
                        return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
                    }
                    /**
	     * Pads `string` on the right side if it's shorter than `length`. Padding
	     * characters are truncated if they exceed `length`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category String
	     * @param {string} [string=''] The string to pad.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the padded string.
	     * @example
	     *
	     * _.padEnd('abc', 6);
	     * // => 'abc   '
	     *
	     * _.padEnd('abc', 6, '_-');
	     * // => 'abc_-_'
	     *
	     * _.padEnd('abc', 3);
	     * // => 'abc'
	     */
                    function padEnd(string, length, chars) {
                        string = toString(string), length = toInteger(length);
                        var strLength = length ? stringSize(string) : 0;
                        return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
                    }
                    /**
	     * Pads `string` on the left side if it's shorter than `length`. Padding
	     * characters are truncated if they exceed `length`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category String
	     * @param {string} [string=''] The string to pad.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the padded string.
	     * @example
	     *
	     * _.padStart('abc', 6);
	     * // => '   abc'
	     *
	     * _.padStart('abc', 6, '_-');
	     * // => '_-_abc'
	     *
	     * _.padStart('abc', 3);
	     * // => 'abc'
	     */
                    function padStart(string, length, chars) {
                        string = toString(string), length = toInteger(length);
                        var strLength = length ? stringSize(string) : 0;
                        return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
                    }
                    /**
	     * Converts `string` to an integer of the specified radix. If `radix` is
	     * `undefined` or `0`, a `radix` of `10` is used unless `value` is a
	     * hexadecimal, in which case a `radix` of `16` is used.
	     *
	     * **Note:** This method aligns with the
	     * [ES5 implementation](https://es5.github.io/#x15.1.2.2) of `parseInt`.
	     *
	     * @static
	     * @memberOf _
	     * @since 1.1.0
	     * @category String
	     * @param {string} string The string to convert.
	     * @param {number} [radix=10] The radix to interpret `value` by.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {number} Returns the converted integer.
	     * @example
	     *
	     * _.parseInt('08');
	     * // => 8
	     *
	     * _.map(['6', '08', '10'], _.parseInt);
	     * // => [6, 8, 10]
	     */
                    function parseInt(string, radix, guard) {
                        return guard || null == radix ? radix = 0 : radix && (radix = +radix), nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0);
                    }
                    /**
	     * Repeats the given string `n` times.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category String
	     * @param {string} [string=''] The string to repeat.
	     * @param {number} [n=1] The number of times to repeat the string.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {string} Returns the repeated string.
	     * @example
	     *
	     * _.repeat('*', 3);
	     * // => '***'
	     *
	     * _.repeat('abc', 2);
	     * // => 'abcabc'
	     *
	     * _.repeat('abc', 0);
	     * // => ''
	     */
                    function repeat(string, n, guard) {
                        return n = (guard ? isIterateeCall(string, n, guard) : n === undefined) ? 1 : toInteger(n), 
                        baseRepeat(toString(string), n);
                    }
                    /**
	     * Replaces matches for `pattern` in `string` with `replacement`.
	     *
	     * **Note:** This method is based on
	     * [`String#replace`](https://mdn.io/String/replace).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category String
	     * @param {string} [string=''] The string to modify.
	     * @param {RegExp|string} pattern The pattern to replace.
	     * @param {Function|string} replacement The match replacement.
	     * @returns {string} Returns the modified string.
	     * @example
	     *
	     * _.replace('Hi Fred', 'Fred', 'Barney');
	     * // => 'Hi Barney'
	     */
                    function replace() {
                        var args = arguments, string = toString(args[0]);
                        return args.length < 3 ? string : string.replace(args[1], args[2]);
                    }
                    /**
	     * Splits `string` by `separator`.
	     *
	     * **Note:** This method is based on
	     * [`String#split`](https://mdn.io/String/split).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category String
	     * @param {string} [string=''] The string to split.
	     * @param {RegExp|string} separator The separator pattern to split by.
	     * @param {number} [limit] The length to truncate results to.
	     * @returns {Array} Returns the string segments.
	     * @example
	     *
	     * _.split('a-b-c', '-', 2);
	     * // => ['a', 'b']
	     */
                    function split(string, separator, limit) {
                        return limit && "number" != typeof limit && isIterateeCall(string, separator, limit) && (separator = limit = undefined), 
                        (limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0) ? (string = toString(string), 
                        string && ("string" == typeof separator || null != separator && !isRegExp(separator)) && (separator = baseToString(separator), 
                        !separator && hasUnicode(string)) ? castSlice(stringToArray(string), 0, limit) : string.split(separator, limit)) : [];
                    }
                    /**
	     * Checks if `string` starts with the given target string.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category String
	     * @param {string} [string=''] The string to inspect.
	     * @param {string} [target] The string to search for.
	     * @param {number} [position=0] The position to search from.
	     * @returns {boolean} Returns `true` if `string` starts with `target`,
	     *  else `false`.
	     * @example
	     *
	     * _.startsWith('abc', 'a');
	     * // => true
	     *
	     * _.startsWith('abc', 'b');
	     * // => false
	     *
	     * _.startsWith('abc', 'b', 1);
	     * // => true
	     */
                    function startsWith(string, target, position) {
                        return string = toString(string), position = null == position ? 0 : baseClamp(toInteger(position), 0, string.length), 
                        target = baseToString(target), string.slice(position, position + target.length) == target;
                    }
                    /**
	     * Creates a compiled template function that can interpolate data properties
	     * in "interpolate" delimiters, HTML-escape interpolated data properties in
	     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
	     * properties may be accessed as free variables in the template. If a setting
	     * object is given, it takes precedence over `_.templateSettings` values.
	     *
	     * **Note:** In the development build `_.template` utilizes
	     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
	     * for easier debugging.
	     *
	     * For more information on precompiling templates see
	     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
	     *
	     * For more information on Chrome extension sandboxes see
	     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The template string.
	     * @param {Object} [options={}] The options object.
	     * @param {RegExp} [options.escape=_.templateSettings.escape]
	     *  The HTML "escape" delimiter.
	     * @param {RegExp} [options.evaluate=_.templateSettings.evaluate]
	     *  The "evaluate" delimiter.
	     * @param {Object} [options.imports=_.templateSettings.imports]
	     *  An object to import into the template as free variables.
	     * @param {RegExp} [options.interpolate=_.templateSettings.interpolate]
	     *  The "interpolate" delimiter.
	     * @param {string} [options.sourceURL='lodash.templateSources[n]']
	     *  The sourceURL of the compiled template.
	     * @param {string} [options.variable='obj']
	     *  The data object variable name.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {Function} Returns the compiled template function.
	     * @example
	     *
	     * // Use the "interpolate" delimiter to create a compiled template.
	     * var compiled = _.template('hello <%= user %>!');
	     * compiled({ 'user': 'fred' });
	     * // => 'hello fred!'
	     *
	     * // Use the HTML "escape" delimiter to escape data property values.
	     * var compiled = _.template('<b><%- value %></b>');
	     * compiled({ 'value': '<script>' });
	     * // => '<b>&lt;script&gt;</b>'
	     *
	     * // Use the "evaluate" delimiter to execute JavaScript and generate HTML.
	     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
	     * compiled({ 'users': ['fred', 'barney'] });
	     * // => '<li>fred</li><li>barney</li>'
	     *
	     * // Use the internal `print` function in "evaluate" delimiters.
	     * var compiled = _.template('<% print("hello " + user); %>!');
	     * compiled({ 'user': 'barney' });
	     * // => 'hello barney!'
	     *
	     * // Use the ES template literal delimiter as an "interpolate" delimiter.
	     * // Disable support by replacing the "interpolate" delimiter.
	     * var compiled = _.template('hello ${ user }!');
	     * compiled({ 'user': 'pebbles' });
	     * // => 'hello pebbles!'
	     *
	     * // Use backslashes to treat delimiters as plain text.
	     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
	     * compiled({ 'value': 'ignored' });
	     * // => '<%- value %>'
	     *
	     * // Use the `imports` option to import `jQuery` as `jq`.
	     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
	     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
	     * compiled({ 'users': ['fred', 'barney'] });
	     * // => '<li>fred</li><li>barney</li>'
	     *
	     * // Use the `sourceURL` option to specify a custom sourceURL for the template.
	     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
	     * compiled(data);
	     * // => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.
	     *
	     * // Use the `variable` option to ensure a with-statement isn't used in the compiled template.
	     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
	     * compiled.source;
	     * // => function(data) {
	     * //   var __t, __p = '';
	     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
	     * //   return __p;
	     * // }
	     *
	     * // Use custom template delimiters.
	     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
	     * var compiled = _.template('hello {{ user }}!');
	     * compiled({ 'user': 'mustache' });
	     * // => 'hello mustache!'
	     *
	     * // Use the `source` property to inline compiled templates for meaningful
	     * // line numbers in error messages and stack traces.
	     * fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
	     *   var JST = {\
	     *     "main": ' + _.template(mainText).source + '\
	     *   };\
	     * ');
	     */
                    function template(string, options, guard) {
                        // Based on John Resig's `tmpl` implementation
                        // (http://ejohn.org/blog/javascript-micro-templating/)
                        // and Laura Doktorova's doT.js (https://github.com/olado/doT).
                        var settings = lodash.templateSettings;
                        guard && isIterateeCall(string, options, guard) && (options = undefined), string = toString(string), 
                        options = assignInWith({}, options, settings, customDefaultsAssignIn);
                        var isEscaping, isEvaluating, imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys), index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '", reDelimiters = RegExp((options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$", "g"), sourceURL = "//# sourceURL=" + ("sourceURL" in options ? options.sourceURL : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
                        string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
                            // The JS engine embedded in Adobe products needs `match` returned in
                            // order to produce the correct `offset` value.
                            // Escape characters that can't be included in string literals.
                            // Replace delimiters with snippets.
                            return interpolateValue || (interpolateValue = esTemplateValue), source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar), 
                            escapeValue && (isEscaping = !0, source += "' +\n__e(" + escapeValue + ") +\n'"), 
                            evaluateValue && (isEvaluating = !0, source += "';\n" + evaluateValue + ";\n__p += '"), 
                            interpolateValue && (source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'"), 
                            index = offset + match.length, match;
                        }), source += "';\n";
                        // If `variable` is not specified wrap a with-statement around the generated
                        // code to add the data object to the top of the scope chain.
                        var variable = options.variable;
                        variable || (source = "with (obj) {\n" + source + "\n}\n"), // Cleanup code by stripping empty strings.
                        source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;"), 
                        // Frame code as the function body.
                        source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
                        var result = attempt(function() {
                            return Function(importsKeys, sourceURL + "return " + source).apply(undefined, importsValues);
                        });
                        if (// Provide the compiled function's source by its `toString` method or
                        // the `source` property as a convenience for inlining compiled templates.
                        result.source = source, isError(result)) throw result;
                        return result;
                    }
                    /**
	     * Converts `string`, as a whole, to lower case just like
	     * [String#toLowerCase](https://mdn.io/toLowerCase).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the lower cased string.
	     * @example
	     *
	     * _.toLower('--Foo-Bar--');
	     * // => '--foo-bar--'
	     *
	     * _.toLower('fooBar');
	     * // => 'foobar'
	     *
	     * _.toLower('__FOO_BAR__');
	     * // => '__foo_bar__'
	     */
                    function toLower(value) {
                        return toString(value).toLowerCase();
                    }
                    /**
	     * Converts `string`, as a whole, to upper case just like
	     * [String#toUpperCase](https://mdn.io/toUpperCase).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the upper cased string.
	     * @example
	     *
	     * _.toUpper('--foo-bar--');
	     * // => '--FOO-BAR--'
	     *
	     * _.toUpper('fooBar');
	     * // => 'FOOBAR'
	     *
	     * _.toUpper('__foo_bar__');
	     * // => '__FOO_BAR__'
	     */
                    function toUpper(value) {
                        return toString(value).toUpperCase();
                    }
                    /**
	     * Removes leading and trailing whitespace or specified characters from `string`.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category String
	     * @param {string} [string=''] The string to trim.
	     * @param {string} [chars=whitespace] The characters to trim.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {string} Returns the trimmed string.
	     * @example
	     *
	     * _.trim('  abc  ');
	     * // => 'abc'
	     *
	     * _.trim('-_-abc-_-', '_-');
	     * // => 'abc'
	     *
	     * _.map(['  foo  ', '  bar  '], _.trim);
	     * // => ['foo', 'bar']
	     */
                    function trim(string, chars, guard) {
                        if (string = toString(string), string && (guard || chars === undefined)) return string.replace(reTrim, "");
                        if (!string || !(chars = baseToString(chars))) return string;
                        var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
                        return castSlice(strSymbols, start, end).join("");
                    }
                    /**
	     * Removes trailing whitespace or specified characters from `string`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category String
	     * @param {string} [string=''] The string to trim.
	     * @param {string} [chars=whitespace] The characters to trim.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {string} Returns the trimmed string.
	     * @example
	     *
	     * _.trimEnd('  abc  ');
	     * // => '  abc'
	     *
	     * _.trimEnd('-_-abc-_-', '_-');
	     * // => '-_-abc'
	     */
                    function trimEnd(string, chars, guard) {
                        if (string = toString(string), string && (guard || chars === undefined)) return string.replace(reTrimEnd, "");
                        if (!string || !(chars = baseToString(chars))) return string;
                        var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
                        return castSlice(strSymbols, 0, end).join("");
                    }
                    /**
	     * Removes leading whitespace or specified characters from `string`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category String
	     * @param {string} [string=''] The string to trim.
	     * @param {string} [chars=whitespace] The characters to trim.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {string} Returns the trimmed string.
	     * @example
	     *
	     * _.trimStart('  abc  ');
	     * // => 'abc  '
	     *
	     * _.trimStart('-_-abc-_-', '_-');
	     * // => 'abc-_-'
	     */
                    function trimStart(string, chars, guard) {
                        if (string = toString(string), string && (guard || chars === undefined)) return string.replace(reTrimStart, "");
                        if (!string || !(chars = baseToString(chars))) return string;
                        var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
                        return castSlice(strSymbols, start).join("");
                    }
                    /**
	     * Truncates `string` if it's longer than the given maximum string length.
	     * The last characters of the truncated string are replaced with the omission
	     * string which defaults to "...".
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category String
	     * @param {string} [string=''] The string to truncate.
	     * @param {Object} [options={}] The options object.
	     * @param {number} [options.length=30] The maximum string length.
	     * @param {string} [options.omission='...'] The string to indicate text is omitted.
	     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
	     * @returns {string} Returns the truncated string.
	     * @example
	     *
	     * _.truncate('hi-diddly-ho there, neighborino');
	     * // => 'hi-diddly-ho there, neighbo...'
	     *
	     * _.truncate('hi-diddly-ho there, neighborino', {
	     *   'length': 24,
	     *   'separator': ' '
	     * });
	     * // => 'hi-diddly-ho there,...'
	     *
	     * _.truncate('hi-diddly-ho there, neighborino', {
	     *   'length': 24,
	     *   'separator': /,? +/
	     * });
	     * // => 'hi-diddly-ho there...'
	     *
	     * _.truncate('hi-diddly-ho there, neighborino', {
	     *   'omission': ' [...]'
	     * });
	     * // => 'hi-diddly-ho there, neig [...]'
	     */
                    function truncate(string, options) {
                        var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
                        if (isObject(options)) {
                            var separator = "separator" in options ? options.separator : separator;
                            length = "length" in options ? toInteger(options.length) : length, omission = "omission" in options ? baseToString(options.omission) : omission;
                        }
                        string = toString(string);
                        var strLength = string.length;
                        if (hasUnicode(string)) {
                            var strSymbols = stringToArray(string);
                            strLength = strSymbols.length;
                        }
                        if (length >= strLength) return string;
                        var end = length - stringSize(omission);
                        if (end < 1) return omission;
                        var result = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
                        if (separator === undefined) return result + omission;
                        if (strSymbols && (end += result.length - end), isRegExp(separator)) {
                            if (string.slice(end).search(separator)) {
                                var match, substring = result;
                                for (separator.global || (separator = RegExp(separator.source, toString(reFlags.exec(separator)) + "g")), 
                                separator.lastIndex = 0; match = separator.exec(substring); ) var newEnd = match.index;
                                result = result.slice(0, newEnd === undefined ? end : newEnd);
                            }
                        } else if (string.indexOf(baseToString(separator), end) != end) {
                            var index = result.lastIndexOf(separator);
                            index > -1 && (result = result.slice(0, index));
                        }
                        return result + omission;
                    }
                    /**
	     * The inverse of `_.escape`; this method converts the HTML entities
	     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to
	     * their corresponding characters.
	     *
	     * **Note:** No other HTML entities are unescaped. To unescape additional
	     * HTML entities use a third-party library like [_he_](https://mths.be/he).
	     *
	     * @static
	     * @memberOf _
	     * @since 0.6.0
	     * @category String
	     * @param {string} [string=''] The string to unescape.
	     * @returns {string} Returns the unescaped string.
	     * @example
	     *
	     * _.unescape('fred, barney, &amp; pebbles');
	     * // => 'fred, barney, & pebbles'
	     */
                    function unescape(string) {
                        return string = toString(string), string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
                    }
                    /**
	     * Splits `string` into an array of its words.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category String
	     * @param {string} [string=''] The string to inspect.
	     * @param {RegExp|string} [pattern] The pattern to match words.
	     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	     * @returns {Array} Returns the words of `string`.
	     * @example
	     *
	     * _.words('fred, barney, & pebbles');
	     * // => ['fred', 'barney', 'pebbles']
	     *
	     * _.words('fred, barney, & pebbles', /[^, ]+/g);
	     * // => ['fred', 'barney', '&', 'pebbles']
	     */
                    function words(string, pattern, guard) {
                        return string = toString(string), pattern = guard ? undefined : pattern, pattern === undefined ? hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string) : string.match(pattern) || [];
                    }
                    /**
	     * Creates a function that iterates over `pairs` and invokes the corresponding
	     * function of the first predicate to return truthy. The predicate-function
	     * pairs are invoked with the `this` binding and arguments of the created
	     * function.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Util
	     * @param {Array} pairs The predicate-function pairs.
	     * @returns {Function} Returns the new composite function.
	     * @example
	     *
	     * var func = _.cond([
	     *   [_.matches({ 'a': 1 }),           _.constant('matches A')],
	     *   [_.conforms({ 'b': _.isNumber }), _.constant('matches B')],
	     *   [_.stubTrue,                      _.constant('no match')]
	     * ]);
	     *
	     * func({ 'a': 1, 'b': 2 });
	     * // => 'matches A'
	     *
	     * func({ 'a': 0, 'b': 1 });
	     * // => 'matches B'
	     *
	     * func({ 'a': '1', 'b': '2' });
	     * // => 'no match'
	     */
                    function cond(pairs) {
                        var length = null == pairs ? 0 : pairs.length, toIteratee = getIteratee();
                        return pairs = length ? arrayMap(pairs, function(pair) {
                            if ("function" != typeof pair[1]) throw new TypeError(FUNC_ERROR_TEXT);
                            return [ toIteratee(pair[0]), pair[1] ];
                        }) : [], baseRest(function(args) {
                            for (var index = -1; ++index < length; ) {
                                var pair = pairs[index];
                                if (apply(pair[0], this, args)) return apply(pair[1], this, args);
                            }
                        });
                    }
                    /**
	     * Creates a function that invokes the predicate properties of `source` with
	     * the corresponding property values of a given object, returning `true` if
	     * all predicates return truthy, else `false`.
	     *
	     * **Note:** The created function is equivalent to `_.conformsTo` with
	     * `source` partially applied.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Util
	     * @param {Object} source The object of property predicates to conform to.
	     * @returns {Function} Returns the new spec function.
	     * @example
	     *
	     * var objects = [
	     *   { 'a': 2, 'b': 1 },
	     *   { 'a': 1, 'b': 2 }
	     * ];
	     *
	     * _.filter(objects, _.conforms({ 'b': function(n) { return n > 1; } }));
	     * // => [{ 'a': 1, 'b': 2 }]
	     */
                    function conforms(source) {
                        return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
                    }
                    /**
	     * Creates a function that returns `value`.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.4.0
	     * @category Util
	     * @param {*} value The value to return from the new function.
	     * @returns {Function} Returns the new constant function.
	     * @example
	     *
	     * var objects = _.times(2, _.constant({ 'a': 1 }));
	     *
	     * console.log(objects);
	     * // => [{ 'a': 1 }, { 'a': 1 }]
	     *
	     * console.log(objects[0] === objects[1]);
	     * // => true
	     */
                    function constant(value) {
                        return function() {
                            return value;
                        };
                    }
                    /**
	     * Checks `value` to determine whether a default value should be returned in
	     * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
	     * or `undefined`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.14.0
	     * @category Util
	     * @param {*} value The value to check.
	     * @param {*} defaultValue The default value.
	     * @returns {*} Returns the resolved value.
	     * @example
	     *
	     * _.defaultTo(1, 10);
	     * // => 1
	     *
	     * _.defaultTo(undefined, 10);
	     * // => 10
	     */
                    function defaultTo(value, defaultValue) {
                        return null == value || value !== value ? defaultValue : value;
                    }
                    /**
	     * This method returns the first argument it receives.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Util
	     * @param {*} value Any value.
	     * @returns {*} Returns `value`.
	     * @example
	     *
	     * var object = { 'a': 1 };
	     *
	     * console.log(_.identity(object) === object);
	     * // => true
	     */
                    function identity(value) {
                        return value;
                    }
                    /**
	     * Creates a function that invokes `func` with the arguments of the created
	     * function. If `func` is a property name, the created function returns the
	     * property value for a given element. If `func` is an array or object, the
	     * created function returns `true` for elements that contain the equivalent
	     * source properties, otherwise it returns `false`.
	     *
	     * @static
	     * @since 4.0.0
	     * @memberOf _
	     * @category Util
	     * @param {*} [func=_.identity] The value to convert to a callback.
	     * @returns {Function} Returns the callback.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': true },
	     *   { 'user': 'fred',   'age': 40, 'active': false }
	     * ];
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
	     * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.filter(users, _.iteratee(['user', 'fred']));
	     * // => [{ 'user': 'fred', 'age': 40 }]
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.map(users, _.iteratee('user'));
	     * // => ['barney', 'fred']
	     *
	     * // Create custom iteratee shorthands.
	     * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
	     *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
	     *     return func.test(string);
	     *   };
	     * });
	     *
	     * _.filter(['abc', 'def'], /ef/);
	     * // => ['def']
	     */
                    function iteratee(func) {
                        return baseIteratee("function" == typeof func ? func : baseClone(func, CLONE_DEEP_FLAG));
                    }
                    /**
	     * Creates a function that performs a partial deep comparison between a given
	     * object and `source`, returning `true` if the given object has equivalent
	     * property values, else `false`.
	     *
	     * **Note:** The created function is equivalent to `_.isMatch` with `source`
	     * partially applied.
	     *
	     * Partial comparisons will match empty array and empty object `source`
	     * values against any array or object value, respectively. See `_.isEqual`
	     * for a list of supported value comparisons.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Util
	     * @param {Object} source The object of property values to match.
	     * @returns {Function} Returns the new spec function.
	     * @example
	     *
	     * var objects = [
	     *   { 'a': 1, 'b': 2, 'c': 3 },
	     *   { 'a': 4, 'b': 5, 'c': 6 }
	     * ];
	     *
	     * _.filter(objects, _.matches({ 'a': 4, 'c': 6 }));
	     * // => [{ 'a': 4, 'b': 5, 'c': 6 }]
	     */
                    function matches(source) {
                        return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
                    }
                    /**
	     * Creates a function that performs a partial deep comparison between the
	     * value at `path` of a given object to `srcValue`, returning `true` if the
	     * object value is equivalent, else `false`.
	     *
	     * **Note:** Partial comparisons will match empty array and empty object
	     * `srcValue` values against any array or object value, respectively. See
	     * `_.isEqual` for a list of supported value comparisons.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.2.0
	     * @category Util
	     * @param {Array|string} path The path of the property to get.
	     * @param {*} srcValue The value to match.
	     * @returns {Function} Returns the new spec function.
	     * @example
	     *
	     * var objects = [
	     *   { 'a': 1, 'b': 2, 'c': 3 },
	     *   { 'a': 4, 'b': 5, 'c': 6 }
	     * ];
	     *
	     * _.find(objects, _.matchesProperty('a', 4));
	     * // => { 'a': 4, 'b': 5, 'c': 6 }
	     */
                    function matchesProperty(path, srcValue) {
                        return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
                    }
                    /**
	     * Adds all own enumerable string keyed function properties of a source
	     * object to the destination object. If `object` is a function, then methods
	     * are added to its prototype as well.
	     *
	     * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
	     * avoid conflicts caused by modifying the original.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Util
	     * @param {Function|Object} [object=lodash] The destination object.
	     * @param {Object} source The object of functions to add.
	     * @param {Object} [options={}] The options object.
	     * @param {boolean} [options.chain=true] Specify whether mixins are chainable.
	     * @returns {Function|Object} Returns `object`.
	     * @example
	     *
	     * function vowels(string) {
	     *   return _.filter(string, function(v) {
	     *     return /[aeiou]/i.test(v);
	     *   });
	     * }
	     *
	     * _.mixin({ 'vowels': vowels });
	     * _.vowels('fred');
	     * // => ['e']
	     *
	     * _('fred').vowels().value();
	     * // => ['e']
	     *
	     * _.mixin({ 'vowels': vowels }, { 'chain': false });
	     * _('fred').vowels();
	     * // => ['e']
	     */
                    function mixin(object, source, options) {
                        var props = keys(source), methodNames = baseFunctions(source, props);
                        null != options || isObject(source) && (methodNames.length || !props.length) || (options = source, 
                        source = object, object = this, methodNames = baseFunctions(source, keys(source)));
                        var chain = !(isObject(options) && "chain" in options && !options.chain), isFunc = isFunction(object);
                        return arrayEach(methodNames, function(methodName) {
                            var func = source[methodName];
                            object[methodName] = func, isFunc && (object.prototype[methodName] = function() {
                                var chainAll = this.__chain__;
                                if (chain || chainAll) {
                                    var result = object(this.__wrapped__), actions = result.__actions__ = copyArray(this.__actions__);
                                    return actions.push({
                                        func: func,
                                        args: arguments,
                                        thisArg: object
                                    }), result.__chain__ = chainAll, result;
                                }
                                return func.apply(object, arrayPush([ this.value() ], arguments));
                            });
                        }), object;
                    }
                    /**
	     * Reverts the `_` variable to its previous value and returns a reference to
	     * the `lodash` function.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Util
	     * @returns {Function} Returns the `lodash` function.
	     * @example
	     *
	     * var lodash = _.noConflict();
	     */
                    function noConflict() {
                        return root._ === this && (root._ = oldDash), this;
                    }
                    /**
	     * This method returns `undefined`.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.3.0
	     * @category Util
	     * @example
	     *
	     * _.times(2, _.noop);
	     * // => [undefined, undefined]
	     */
                    function noop() {}
                    /**
	     * Creates a function that gets the argument at index `n`. If `n` is negative,
	     * the nth argument from the end is returned.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Util
	     * @param {number} [n=0] The index of the argument to return.
	     * @returns {Function} Returns the new pass-thru function.
	     * @example
	     *
	     * var func = _.nthArg(1);
	     * func('a', 'b', 'c', 'd');
	     * // => 'b'
	     *
	     * var func = _.nthArg(-2);
	     * func('a', 'b', 'c', 'd');
	     * // => 'c'
	     */
                    function nthArg(n) {
                        return n = toInteger(n), baseRest(function(args) {
                            return baseNth(args, n);
                        });
                    }
                    /**
	     * Creates a function that returns the value at `path` of a given object.
	     *
	     * @static
	     * @memberOf _
	     * @since 2.4.0
	     * @category Util
	     * @param {Array|string} path The path of the property to get.
	     * @returns {Function} Returns the new accessor function.
	     * @example
	     *
	     * var objects = [
	     *   { 'a': { 'b': 2 } },
	     *   { 'a': { 'b': 1 } }
	     * ];
	     *
	     * _.map(objects, _.property('a.b'));
	     * // => [2, 1]
	     *
	     * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	     * // => [1, 2]
	     */
                    function property(path) {
                        return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
                    }
                    /**
	     * The opposite of `_.property`; this method creates a function that returns
	     * the value at a given path of `object`.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.0.0
	     * @category Util
	     * @param {Object} object The object to query.
	     * @returns {Function} Returns the new accessor function.
	     * @example
	     *
	     * var array = [0, 1, 2],
	     *     object = { 'a': array, 'b': array, 'c': array };
	     *
	     * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
	     * // => [2, 0]
	     *
	     * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
	     * // => [2, 0]
	     */
                    function propertyOf(object) {
                        return function(path) {
                            return null == object ? undefined : baseGet(object, path);
                        };
                    }
                    /**
	     * This method returns a new empty array.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.13.0
	     * @category Util
	     * @returns {Array} Returns the new empty array.
	     * @example
	     *
	     * var arrays = _.times(2, _.stubArray);
	     *
	     * console.log(arrays);
	     * // => [[], []]
	     *
	     * console.log(arrays[0] === arrays[1]);
	     * // => false
	     */
                    function stubArray() {
                        return [];
                    }
                    /**
	     * This method returns `false`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.13.0
	     * @category Util
	     * @returns {boolean} Returns `false`.
	     * @example
	     *
	     * _.times(2, _.stubFalse);
	     * // => [false, false]
	     */
                    function stubFalse() {
                        return !1;
                    }
                    /**
	     * This method returns a new empty object.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.13.0
	     * @category Util
	     * @returns {Object} Returns the new empty object.
	     * @example
	     *
	     * var objects = _.times(2, _.stubObject);
	     *
	     * console.log(objects);
	     * // => [{}, {}]
	     *
	     * console.log(objects[0] === objects[1]);
	     * // => false
	     */
                    function stubObject() {
                        return {};
                    }
                    /**
	     * This method returns an empty string.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.13.0
	     * @category Util
	     * @returns {string} Returns the empty string.
	     * @example
	     *
	     * _.times(2, _.stubString);
	     * // => ['', '']
	     */
                    function stubString() {
                        return "";
                    }
                    /**
	     * This method returns `true`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.13.0
	     * @category Util
	     * @returns {boolean} Returns `true`.
	     * @example
	     *
	     * _.times(2, _.stubTrue);
	     * // => [true, true]
	     */
                    function stubTrue() {
                        return !0;
                    }
                    /**
	     * Invokes the iteratee `n` times, returning an array of the results of
	     * each invocation. The iteratee is invoked with one argument; (index).
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Util
	     * @param {number} n The number of times to invoke `iteratee`.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the array of results.
	     * @example
	     *
	     * _.times(3, String);
	     * // => ['0', '1', '2']
	     *
	     *  _.times(4, _.constant(0));
	     * // => [0, 0, 0, 0]
	     */
                    function times(n, iteratee) {
                        if (n = toInteger(n), n < 1 || n > MAX_SAFE_INTEGER) return [];
                        var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
                        iteratee = getIteratee(iteratee), n -= MAX_ARRAY_LENGTH;
                        for (var result = baseTimes(length, iteratee); ++index < n; ) iteratee(index);
                        return result;
                    }
                    /**
	     * Converts `value` to a property path array.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Util
	     * @param {*} value The value to convert.
	     * @returns {Array} Returns the new property path array.
	     * @example
	     *
	     * _.toPath('a.b.c');
	     * // => ['a', 'b', 'c']
	     *
	     * _.toPath('a[0].b.c');
	     * // => ['a', '0', 'b', 'c']
	     */
                    function toPath(value) {
                        return isArray(value) ? arrayMap(value, toKey) : isSymbol(value) ? [ value ] : copyArray(stringToPath(toString(value)));
                    }
                    /**
	     * Generates a unique ID. If `prefix` is given, the ID is appended to it.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Util
	     * @param {string} [prefix=''] The value to prefix the ID with.
	     * @returns {string} Returns the unique ID.
	     * @example
	     *
	     * _.uniqueId('contact_');
	     * // => 'contact_104'
	     *
	     * _.uniqueId();
	     * // => '105'
	     */
                    function uniqueId(prefix) {
                        var id = ++idCounter;
                        return toString(prefix) + id;
                    }
                    /**
	     * Computes the maximum value of `array`. If `array` is empty or falsey,
	     * `undefined` is returned.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Math
	     * @param {Array} array The array to iterate over.
	     * @returns {*} Returns the maximum value.
	     * @example
	     *
	     * _.max([4, 2, 8, 6]);
	     * // => 8
	     *
	     * _.max([]);
	     * // => undefined
	     */
                    function max(array) {
                        return array && array.length ? baseExtremum(array, identity, baseGt) : undefined;
                    }
                    /**
	     * This method is like `_.max` except that it accepts `iteratee` which is
	     * invoked for each element in `array` to generate the criterion by which
	     * the value is ranked. The iteratee is invoked with one argument: (value).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Math
	     * @param {Array} array The array to iterate over.
	     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {*} Returns the maximum value.
	     * @example
	     *
	     * var objects = [{ 'n': 1 }, { 'n': 2 }];
	     *
	     * _.maxBy(objects, function(o) { return o.n; });
	     * // => { 'n': 2 }
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.maxBy(objects, 'n');
	     * // => { 'n': 2 }
	     */
                    function maxBy(array, iteratee) {
                        return array && array.length ? baseExtremum(array, getIteratee(iteratee, 2), baseGt) : undefined;
                    }
                    /**
	     * Computes the mean of the values in `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Math
	     * @param {Array} array The array to iterate over.
	     * @returns {number} Returns the mean.
	     * @example
	     *
	     * _.mean([4, 2, 8, 6]);
	     * // => 5
	     */
                    function mean(array) {
                        return baseMean(array, identity);
                    }
                    /**
	     * This method is like `_.mean` except that it accepts `iteratee` which is
	     * invoked for each element in `array` to generate the value to be averaged.
	     * The iteratee is invoked with one argument: (value).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.7.0
	     * @category Math
	     * @param {Array} array The array to iterate over.
	     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {number} Returns the mean.
	     * @example
	     *
	     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
	     *
	     * _.meanBy(objects, function(o) { return o.n; });
	     * // => 5
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.meanBy(objects, 'n');
	     * // => 5
	     */
                    function meanBy(array, iteratee) {
                        return baseMean(array, getIteratee(iteratee, 2));
                    }
                    /**
	     * Computes the minimum value of `array`. If `array` is empty or falsey,
	     * `undefined` is returned.
	     *
	     * @static
	     * @since 0.1.0
	     * @memberOf _
	     * @category Math
	     * @param {Array} array The array to iterate over.
	     * @returns {*} Returns the minimum value.
	     * @example
	     *
	     * _.min([4, 2, 8, 6]);
	     * // => 2
	     *
	     * _.min([]);
	     * // => undefined
	     */
                    function min(array) {
                        return array && array.length ? baseExtremum(array, identity, baseLt) : undefined;
                    }
                    /**
	     * This method is like `_.min` except that it accepts `iteratee` which is
	     * invoked for each element in `array` to generate the criterion by which
	     * the value is ranked. The iteratee is invoked with one argument: (value).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Math
	     * @param {Array} array The array to iterate over.
	     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {*} Returns the minimum value.
	     * @example
	     *
	     * var objects = [{ 'n': 1 }, { 'n': 2 }];
	     *
	     * _.minBy(objects, function(o) { return o.n; });
	     * // => { 'n': 1 }
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.minBy(objects, 'n');
	     * // => { 'n': 1 }
	     */
                    function minBy(array, iteratee) {
                        return array && array.length ? baseExtremum(array, getIteratee(iteratee, 2), baseLt) : undefined;
                    }
                    /**
	     * Computes the sum of the values in `array`.
	     *
	     * @static
	     * @memberOf _
	     * @since 3.4.0
	     * @category Math
	     * @param {Array} array The array to iterate over.
	     * @returns {number} Returns the sum.
	     * @example
	     *
	     * _.sum([4, 2, 8, 6]);
	     * // => 20
	     */
                    function sum(array) {
                        return array && array.length ? baseSum(array, identity) : 0;
                    }
                    /**
	     * This method is like `_.sum` except that it accepts `iteratee` which is
	     * invoked for each element in `array` to generate the value to be summed.
	     * The iteratee is invoked with one argument: (value).
	     *
	     * @static
	     * @memberOf _
	     * @since 4.0.0
	     * @category Math
	     * @param {Array} array The array to iterate over.
	     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {number} Returns the sum.
	     * @example
	     *
	     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
	     *
	     * _.sumBy(objects, function(o) { return o.n; });
	     * // => 20
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.sumBy(objects, 'n');
	     * // => 20
	     */
                    function sumBy(array, iteratee) {
                        return array && array.length ? baseSum(array, getIteratee(iteratee, 2)) : 0;
                    }
                    context = null == context ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));
                    /** Built-in constructor references. */
                    var Array = context.Array, Date = context.Date, Error = context.Error, Function = context.Function, Math = context.Math, Object = context.Object, RegExp = context.RegExp, String = context.String, TypeError = context.TypeError, arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype, coreJsData = context["__core-js_shared__"], funcToString = funcProto.toString, hasOwnProperty = objectProto.hasOwnProperty, idCounter = 0, maskSrcKey = function() {
                        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
                        return uid ? "Symbol(src)_1." + uid : "";
                    }(), nativeObjectToString = objectProto.toString, objectCtorString = funcToString.call(Object), oldDash = root._, reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), Buffer = moduleExports ? context.Buffer : undefined, Symbol = context.Symbol, Uint8Array = context.Uint8Array, allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined, getPrototype = overArg(Object.getPrototypeOf, Object), objectCreate = Object.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined, symIterator = Symbol ? Symbol.iterator : undefined, symToStringTag = Symbol ? Symbol.toStringTag : undefined, defineProperty = function() {
                        try {
                            var func = getNative(Object, "defineProperty");
                            return func({}, "", {}), func;
                        } catch (e) {}
                    }(), ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date && Date.now !== root.Date.now && Date.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout, nativeCeil = Math.ceil, nativeFloor = Math.floor, nativeGetSymbols = Object.getOwnPropertySymbols, nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object.keys, Object), nativeMax = Math.max, nativeMin = Math.min, nativeNow = Date.now, nativeParseInt = context.parseInt, nativeRandom = Math.random, nativeReverse = arrayProto.reverse, DataView = getNative(context, "DataView"), Map = getNative(context, "Map"), Promise = getNative(context, "Promise"), Set = getNative(context, "Set"), WeakMap = getNative(context, "WeakMap"), nativeCreate = getNative(Object, "create"), metaMap = WeakMap && new WeakMap(), realNames = {}, dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map), promiseCtorString = toSource(Promise), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap), symbolProto = Symbol ? Symbol.prototype : undefined, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined, symbolToString = symbolProto ? symbolProto.toString : undefined, baseCreate = function() {
                        function object() {}
                        return function(proto) {
                            if (!isObject(proto)) return {};
                            if (objectCreate) return objectCreate(proto);
                            object.prototype = proto;
                            var result = new object();
                            return object.prototype = undefined, result;
                        };
                    }();
                    /**
	     * By default, the template delimiters used by lodash are like those in
	     * embedded Ruby (ERB) as well as ES2015 template strings. Change the
	     * following template settings to use alternative delimiters.
	     *
	     * @static
	     * @memberOf _
	     * @type {Object}
	     */
                    lodash.templateSettings = {
                        /**
	       * Used to detect `data` property values to be HTML-escaped.
	       *
	       * @memberOf _.templateSettings
	       * @type {RegExp}
	       */
                        escape: reEscape,
                        /**
	       * Used to detect code to be evaluated.
	       *
	       * @memberOf _.templateSettings
	       * @type {RegExp}
	       */
                        evaluate: reEvaluate,
                        /**
	       * Used to detect `data` property values to inject.
	       *
	       * @memberOf _.templateSettings
	       * @type {RegExp}
	       */
                        interpolate: reInterpolate,
                        /**
	       * Used to reference the data object in the template text.
	       *
	       * @memberOf _.templateSettings
	       * @type {string}
	       */
                        variable: "",
                        /**
	       * Used to import variables into the compiled template.
	       *
	       * @memberOf _.templateSettings
	       * @type {Object}
	       */
                        imports: {
                            /**
	         * A reference to the `lodash` function.
	         *
	         * @memberOf _.templateSettings.imports
	         * @type {Function}
	         */
                            _: lodash
                        }
                    }, // Ensure wrappers are instances of `baseLodash`.
                    lodash.prototype = baseLodash.prototype, lodash.prototype.constructor = lodash, 
                    LodashWrapper.prototype = baseCreate(baseLodash.prototype), LodashWrapper.prototype.constructor = LodashWrapper, 
                    // Ensure `LazyWrapper` is an instance of `baseLodash`.
                    LazyWrapper.prototype = baseCreate(baseLodash.prototype), LazyWrapper.prototype.constructor = LazyWrapper, 
                    // Add methods to `Hash`.
                    Hash.prototype.clear = hashClear, Hash.prototype.delete = hashDelete, Hash.prototype.get = hashGet, 
                    Hash.prototype.has = hashHas, Hash.prototype.set = hashSet, // Add methods to `ListCache`.
                    ListCache.prototype.clear = listCacheClear, ListCache.prototype.delete = listCacheDelete, 
                    ListCache.prototype.get = listCacheGet, ListCache.prototype.has = listCacheHas, 
                    ListCache.prototype.set = listCacheSet, // Add methods to `MapCache`.
                    MapCache.prototype.clear = mapCacheClear, MapCache.prototype.delete = mapCacheDelete, 
                    MapCache.prototype.get = mapCacheGet, MapCache.prototype.has = mapCacheHas, MapCache.prototype.set = mapCacheSet, 
                    // Add methods to `SetCache`.
                    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd, SetCache.prototype.has = setCacheHas, 
                    // Add methods to `Stack`.
                    Stack.prototype.clear = stackClear, Stack.prototype.delete = stackDelete, Stack.prototype.get = stackGet, 
                    Stack.prototype.has = stackHas, Stack.prototype.set = stackSet;
                    /**
	     * The base implementation of `_.forEach` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array|Object} Returns `collection`.
	     */
                    var baseEach = createBaseEach(baseForOwn), baseEachRight = createBaseEach(baseForOwnRight, !0), baseFor = createBaseFor(), baseForRight = createBaseFor(!0), baseSetData = metaMap ? function(func, data) {
                        return metaMap.set(func, data), func;
                    } : identity, baseSetToString = defineProperty ? function(func, string) {
                        return defineProperty(func, "toString", {
                            configurable: !0,
                            enumerable: !1,
                            value: constant(string),
                            writable: !0
                        });
                    } : identity, castRest = baseRest, clearTimeout = ctxClearTimeout || function(id) {
                        return root.clearTimeout(id);
                    }, createSet = Set && 1 / setToArray(new Set([ , -0 ]))[1] == INFINITY ? function(values) {
                        return new Set(values);
                    } : noop, getData = metaMap ? function(func) {
                        return metaMap.get(func);
                    } : noop, getSymbols = nativeGetSymbols ? function(object) {
                        return null == object ? [] : (object = Object(object), arrayFilter(nativeGetSymbols(object), function(symbol) {
                            return propertyIsEnumerable.call(object, symbol);
                        }));
                    } : stubArray, getSymbolsIn = nativeGetSymbols ? function(object) {
                        for (var result = []; object; ) arrayPush(result, getSymbols(object)), object = getPrototype(object);
                        return result;
                    } : stubArray, getTag = baseGetTag;
                    // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
                    (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) && (getTag = function(value) {
                        var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : undefined, ctorString = Ctor ? toSource(Ctor) : "";
                        if (ctorString) switch (ctorString) {
                          case dataViewCtorString:
                            return dataViewTag;

                          case mapCtorString:
                            return mapTag;

                          case promiseCtorString:
                            return promiseTag;

                          case setCtorString:
                            return setTag;

                          case weakMapCtorString:
                            return weakMapTag;
                        }
                        return result;
                    });
                    /**
	     * Checks if `func` is capable of being masked.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `func` is maskable, else `false`.
	     */
                    var isMaskable = coreJsData ? isFunction : stubFalse, setData = shortOut(baseSetData), setTimeout = ctxSetTimeout || function(func, wait) {
                        return root.setTimeout(func, wait);
                    }, setToString = shortOut(baseSetToString), stringToPath = memoizeCapped(function(string) {
                        var result = [];
                        return reLeadingDot.test(string) && result.push(""), string.replace(rePropName, function(match, number, quote, string) {
                            result.push(quote ? string.replace(reEscapeChar, "$1") : number || match);
                        }), result;
                    }), difference = baseRest(function(array, values) {
                        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, !0)) : [];
                    }), differenceBy = baseRest(function(array, values) {
                        var iteratee = last(values);
                        return isArrayLikeObject(iteratee) && (iteratee = undefined), isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, !0), getIteratee(iteratee, 2)) : [];
                    }), differenceWith = baseRest(function(array, values) {
                        var comparator = last(values);
                        return isArrayLikeObject(comparator) && (comparator = undefined), isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, !0), undefined, comparator) : [];
                    }), intersection = baseRest(function(arrays) {
                        var mapped = arrayMap(arrays, castArrayLikeObject);
                        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
                    }), intersectionBy = baseRest(function(arrays) {
                        var iteratee = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
                        return iteratee === last(mapped) ? iteratee = undefined : mapped.pop(), mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee, 2)) : [];
                    }), intersectionWith = baseRest(function(arrays) {
                        var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
                        return comparator = "function" == typeof comparator ? comparator : undefined, comparator && mapped.pop(), 
                        mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined, comparator) : [];
                    }), pull = baseRest(pullAll), pullAt = flatRest(function(array, indexes) {
                        var length = null == array ? 0 : array.length, result = baseAt(array, indexes);
                        return basePullAt(array, arrayMap(indexes, function(index) {
                            return isIndex(index, length) ? +index : index;
                        }).sort(compareAscending)), result;
                    }), union = baseRest(function(arrays) {
                        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, !0));
                    }), unionBy = baseRest(function(arrays) {
                        var iteratee = last(arrays);
                        return isArrayLikeObject(iteratee) && (iteratee = undefined), baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, !0), getIteratee(iteratee, 2));
                    }), unionWith = baseRest(function(arrays) {
                        var comparator = last(arrays);
                        return comparator = "function" == typeof comparator ? comparator : undefined, baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, !0), undefined, comparator);
                    }), without = baseRest(function(array, values) {
                        return isArrayLikeObject(array) ? baseDifference(array, values) : [];
                    }), xor = baseRest(function(arrays) {
                        return baseXor(arrayFilter(arrays, isArrayLikeObject));
                    }), xorBy = baseRest(function(arrays) {
                        var iteratee = last(arrays);
                        return isArrayLikeObject(iteratee) && (iteratee = undefined), baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee, 2));
                    }), xorWith = baseRest(function(arrays) {
                        var comparator = last(arrays);
                        return comparator = "function" == typeof comparator ? comparator : undefined, baseXor(arrayFilter(arrays, isArrayLikeObject), undefined, comparator);
                    }), zip = baseRest(unzip), zipWith = baseRest(function(arrays) {
                        var length = arrays.length, iteratee = length > 1 ? arrays[length - 1] : undefined;
                        return iteratee = "function" == typeof iteratee ? (arrays.pop(), iteratee) : undefined, 
                        unzipWith(arrays, iteratee);
                    }), wrapperAt = flatRest(function(paths) {
                        var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
                            return baseAt(object, paths);
                        };
                        return !(length > 1 || this.__actions__.length) && value instanceof LazyWrapper && isIndex(start) ? (value = value.slice(start, +start + (length ? 1 : 0)), 
                        value.__actions__.push({
                            func: thru,
                            args: [ interceptor ],
                            thisArg: undefined
                        }), new LodashWrapper(value, this.__chain__).thru(function(array) {
                            return length && !array.length && array.push(undefined), array;
                        })) : this.thru(interceptor);
                    }), countBy = createAggregator(function(result, value, key) {
                        hasOwnProperty.call(result, key) ? ++result[key] : baseAssignValue(result, key, 1);
                    }), find = createFind(findIndex), findLast = createFind(findLastIndex), groupBy = createAggregator(function(result, value, key) {
                        hasOwnProperty.call(result, key) ? result[key].push(value) : baseAssignValue(result, key, [ value ]);
                    }), invokeMap = baseRest(function(collection, path, args) {
                        var index = -1, isFunc = "function" == typeof path, result = isArrayLike(collection) ? Array(collection.length) : [];
                        return baseEach(collection, function(value) {
                            result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
                        }), result;
                    }), keyBy = createAggregator(function(result, value, key) {
                        baseAssignValue(result, key, value);
                    }), partition = createAggregator(function(result, value, key) {
                        result[key ? 0 : 1].push(value);
                    }, function() {
                        return [ [], [] ];
                    }), sortBy = baseRest(function(collection, iteratees) {
                        if (null == collection) return [];
                        var length = iteratees.length;
                        return length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1]) ? iteratees = [] : length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2]) && (iteratees = [ iteratees[0] ]), 
                        baseOrderBy(collection, baseFlatten(iteratees, 1), []);
                    }), now = ctxNow || function() {
                        return root.Date.now();
                    }, bind = baseRest(function(func, thisArg, partials) {
                        var bitmask = WRAP_BIND_FLAG;
                        if (partials.length) {
                            var holders = replaceHolders(partials, getHolder(bind));
                            bitmask |= WRAP_PARTIAL_FLAG;
                        }
                        return createWrap(func, bitmask, thisArg, partials, holders);
                    }), bindKey = baseRest(function(object, key, partials) {
                        var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
                        if (partials.length) {
                            var holders = replaceHolders(partials, getHolder(bindKey));
                            bitmask |= WRAP_PARTIAL_FLAG;
                        }
                        return createWrap(key, bitmask, object, partials, holders);
                    }), defer = baseRest(function(func, args) {
                        return baseDelay(func, 1, args);
                    }), delay = baseRest(function(func, wait, args) {
                        return baseDelay(func, toNumber(wait) || 0, args);
                    });
                    // Expose `MapCache`.
                    memoize.Cache = MapCache;
                    /**
	     * Creates a function that invokes `func` with its arguments transformed.
	     *
	     * @static
	     * @since 4.0.0
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to wrap.
	     * @param {...(Function|Function[])} [transforms=[_.identity]]
	     *  The argument transforms.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * function doubled(n) {
	     *   return n * 2;
	     * }
	     *
	     * function square(n) {
	     *   return n * n;
	     * }
	     *
	     * var func = _.overArgs(function(x, y) {
	     *   return [x, y];
	     * }, [square, doubled]);
	     *
	     * func(9, 3);
	     * // => [81, 6]
	     *
	     * func(10, 5);
	     * // => [100, 10]
	     */
                    var overArgs = castRest(function(func, transforms) {
                        transforms = 1 == transforms.length && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
                        var funcsLength = transforms.length;
                        return baseRest(function(args) {
                            for (var index = -1, length = nativeMin(args.length, funcsLength); ++index < length; ) args[index] = transforms[index].call(this, args[index]);
                            return apply(func, this, args);
                        });
                    }), partial = baseRest(function(func, partials) {
                        var holders = replaceHolders(partials, getHolder(partial));
                        return createWrap(func, WRAP_PARTIAL_FLAG, undefined, partials, holders);
                    }), partialRight = baseRest(function(func, partials) {
                        var holders = replaceHolders(partials, getHolder(partialRight));
                        return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined, partials, holders);
                    }), rearg = flatRest(function(func, indexes) {
                        return createWrap(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes);
                    }), gt = createRelationalOperation(baseGt), gte = createRelationalOperation(function(value, other) {
                        return value >= other;
                    }), isArguments = baseIsArguments(function() {
                        return arguments;
                    }()) ? baseIsArguments : function(value) {
                        return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
                    }, isArray = Array.isArray, isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer, isBuffer = nativeIsBuffer || stubFalse, isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate, isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap, isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp, isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet, isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray, lt = createRelationalOperation(baseLt), lte = createRelationalOperation(function(value, other) {
                        return value <= other;
                    }), assign = createAssigner(function(object, source) {
                        if (isPrototype(source) || isArrayLike(source)) return void copyObject(source, keys(source), object);
                        for (var key in source) hasOwnProperty.call(source, key) && assignValue(object, key, source[key]);
                    }), assignIn = createAssigner(function(object, source) {
                        copyObject(source, keysIn(source), object);
                    }), assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
                        copyObject(source, keysIn(source), object, customizer);
                    }), assignWith = createAssigner(function(object, source, srcIndex, customizer) {
                        copyObject(source, keys(source), object, customizer);
                    }), at = flatRest(baseAt), defaults = baseRest(function(args) {
                        return args.push(undefined, customDefaultsAssignIn), apply(assignInWith, undefined, args);
                    }), defaultsDeep = baseRest(function(args) {
                        return args.push(undefined, customDefaultsMerge), apply(mergeWith, undefined, args);
                    }), invert = createInverter(function(result, value, key) {
                        result[value] = key;
                    }, constant(identity)), invertBy = createInverter(function(result, value, key) {
                        hasOwnProperty.call(result, value) ? result[value].push(key) : result[value] = [ key ];
                    }, getIteratee), invoke = baseRest(baseInvoke), merge = createAssigner(function(object, source, srcIndex) {
                        baseMerge(object, source, srcIndex);
                    }), mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
                        baseMerge(object, source, srcIndex, customizer);
                    }), omit = flatRest(function(object, paths) {
                        var result = {};
                        if (null == object) return result;
                        var isDeep = !1;
                        paths = arrayMap(paths, function(path) {
                            return path = castPath(path, object), isDeep || (isDeep = path.length > 1), path;
                        }), copyObject(object, getAllKeysIn(object), result), isDeep && (result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone));
                        for (var length = paths.length; length--; ) baseUnset(result, paths[length]);
                        return result;
                    }), pick = flatRest(function(object, paths) {
                        return null == object ? {} : basePick(object, paths);
                    }), toPairs = createToPairs(keys), toPairsIn = createToPairs(keysIn), camelCase = createCompounder(function(result, word, index) {
                        return word = word.toLowerCase(), result + (index ? capitalize(word) : word);
                    }), kebabCase = createCompounder(function(result, word, index) {
                        return result + (index ? "-" : "") + word.toLowerCase();
                    }), lowerCase = createCompounder(function(result, word, index) {
                        return result + (index ? " " : "") + word.toLowerCase();
                    }), lowerFirst = createCaseFirst("toLowerCase"), snakeCase = createCompounder(function(result, word, index) {
                        return result + (index ? "_" : "") + word.toLowerCase();
                    }), startCase = createCompounder(function(result, word, index) {
                        return result + (index ? " " : "") + upperFirst(word);
                    }), upperCase = createCompounder(function(result, word, index) {
                        return result + (index ? " " : "") + word.toUpperCase();
                    }), upperFirst = createCaseFirst("toUpperCase"), attempt = baseRest(function(func, args) {
                        try {
                            return apply(func, undefined, args);
                        } catch (e) {
                            return isError(e) ? e : new Error(e);
                        }
                    }), bindAll = flatRest(function(object, methodNames) {
                        return arrayEach(methodNames, function(key) {
                            key = toKey(key), baseAssignValue(object, key, bind(object[key], object));
                        }), object;
                    }), flow = createFlow(), flowRight = createFlow(!0), method = baseRest(function(path, args) {
                        return function(object) {
                            return baseInvoke(object, path, args);
                        };
                    }), methodOf = baseRest(function(object, args) {
                        return function(path) {
                            return baseInvoke(object, path, args);
                        };
                    }), over = createOver(arrayMap), overEvery = createOver(arrayEvery), overSome = createOver(arraySome), range = createRange(), rangeRight = createRange(!0), add = createMathOperation(function(augend, addend) {
                        return augend + addend;
                    }, 0), ceil = createRound("ceil"), divide = createMathOperation(function(dividend, divisor) {
                        return dividend / divisor;
                    }, 1), floor = createRound("floor"), multiply = createMathOperation(function(multiplier, multiplicand) {
                        return multiplier * multiplicand;
                    }, 1), round = createRound("round"), subtract = createMathOperation(function(minuend, subtrahend) {
                        return minuend - subtrahend;
                    }, 0);
                    /*------------------------------------------------------------------------*/
                    // Add methods that return wrapped values in chain sequences.
                    // Add aliases.
                    // Add methods to `lodash.prototype`.
                    /*------------------------------------------------------------------------*/
                    // Add methods that return unwrapped values in chain sequences.
                    // Add aliases.
                    /*------------------------------------------------------------------------*/
                    /**
	     * The semantic version number.
	     *
	     * @static
	     * @memberOf _
	     * @type {string}
	     */
                    // Assign default placeholders.
                    // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
                    // Add `LazyWrapper` methods that accept an `iteratee` value.
                    // Add `LazyWrapper` methods for `_.head` and `_.last`.
                    // Add `LazyWrapper` methods for `_.initial` and `_.tail`.
                    // Add `LazyWrapper` methods to `lodash.prototype`.
                    // Add `Array` methods to `lodash.prototype`.
                    // Map minified method names to their real names.
                    // Add methods to `LazyWrapper`.
                    // Add chain sequence methods to the `lodash` wrapper.
                    // Add lazy aliases.
                    return lodash.after = after, lodash.ary = ary, lodash.assign = assign, lodash.assignIn = assignIn, 
                    lodash.assignInWith = assignInWith, lodash.assignWith = assignWith, lodash.at = at, 
                    lodash.before = before, lodash.bind = bind, lodash.bindAll = bindAll, lodash.bindKey = bindKey, 
                    lodash.castArray = castArray, lodash.chain = chain, lodash.chunk = chunk, lodash.compact = compact, 
                    lodash.concat = concat, lodash.cond = cond, lodash.conforms = conforms, lodash.constant = constant, 
                    lodash.countBy = countBy, lodash.create = create, lodash.curry = curry, lodash.curryRight = curryRight, 
                    lodash.debounce = debounce, lodash.defaults = defaults, lodash.defaultsDeep = defaultsDeep, 
                    lodash.defer = defer, lodash.delay = delay, lodash.difference = difference, lodash.differenceBy = differenceBy, 
                    lodash.differenceWith = differenceWith, lodash.drop = drop, lodash.dropRight = dropRight, 
                    lodash.dropRightWhile = dropRightWhile, lodash.dropWhile = dropWhile, lodash.fill = fill, 
                    lodash.filter = filter, lodash.flatMap = flatMap, lodash.flatMapDeep = flatMapDeep, 
                    lodash.flatMapDepth = flatMapDepth, lodash.flatten = flatten, lodash.flattenDeep = flattenDeep, 
                    lodash.flattenDepth = flattenDepth, lodash.flip = flip, lodash.flow = flow, lodash.flowRight = flowRight, 
                    lodash.fromPairs = fromPairs, lodash.functions = functions, lodash.functionsIn = functionsIn, 
                    lodash.groupBy = groupBy, lodash.initial = initial, lodash.intersection = intersection, 
                    lodash.intersectionBy = intersectionBy, lodash.intersectionWith = intersectionWith, 
                    lodash.invert = invert, lodash.invertBy = invertBy, lodash.invokeMap = invokeMap, 
                    lodash.iteratee = iteratee, lodash.keyBy = keyBy, lodash.keys = keys, lodash.keysIn = keysIn, 
                    lodash.map = map, lodash.mapKeys = mapKeys, lodash.mapValues = mapValues, lodash.matches = matches, 
                    lodash.matchesProperty = matchesProperty, lodash.memoize = memoize, lodash.merge = merge, 
                    lodash.mergeWith = mergeWith, lodash.method = method, lodash.methodOf = methodOf, 
                    lodash.mixin = mixin, lodash.negate = negate, lodash.nthArg = nthArg, lodash.omit = omit, 
                    lodash.omitBy = omitBy, lodash.once = once, lodash.orderBy = orderBy, lodash.over = over, 
                    lodash.overArgs = overArgs, lodash.overEvery = overEvery, lodash.overSome = overSome, 
                    lodash.partial = partial, lodash.partialRight = partialRight, lodash.partition = partition, 
                    lodash.pick = pick, lodash.pickBy = pickBy, lodash.property = property, lodash.propertyOf = propertyOf, 
                    lodash.pull = pull, lodash.pullAll = pullAll, lodash.pullAllBy = pullAllBy, lodash.pullAllWith = pullAllWith, 
                    lodash.pullAt = pullAt, lodash.range = range, lodash.rangeRight = rangeRight, lodash.rearg = rearg, 
                    lodash.reject = reject, lodash.remove = remove, lodash.rest = rest, lodash.reverse = reverse, 
                    lodash.sampleSize = sampleSize, lodash.set = set, lodash.setWith = setWith, lodash.shuffle = shuffle, 
                    lodash.slice = slice, lodash.sortBy = sortBy, lodash.sortedUniq = sortedUniq, lodash.sortedUniqBy = sortedUniqBy, 
                    lodash.split = split, lodash.spread = spread, lodash.tail = tail, lodash.take = take, 
                    lodash.takeRight = takeRight, lodash.takeRightWhile = takeRightWhile, lodash.takeWhile = takeWhile, 
                    lodash.tap = tap, lodash.throttle = throttle, lodash.thru = thru, lodash.toArray = toArray, 
                    lodash.toPairs = toPairs, lodash.toPairsIn = toPairsIn, lodash.toPath = toPath, 
                    lodash.toPlainObject = toPlainObject, lodash.transform = transform, lodash.unary = unary, 
                    lodash.union = union, lodash.unionBy = unionBy, lodash.unionWith = unionWith, lodash.uniq = uniq, 
                    lodash.uniqBy = uniqBy, lodash.uniqWith = uniqWith, lodash.unset = unset, lodash.unzip = unzip, 
                    lodash.unzipWith = unzipWith, lodash.update = update, lodash.updateWith = updateWith, 
                    lodash.values = values, lodash.valuesIn = valuesIn, lodash.without = without, lodash.words = words, 
                    lodash.wrap = wrap, lodash.xor = xor, lodash.xorBy = xorBy, lodash.xorWith = xorWith, 
                    lodash.zip = zip, lodash.zipObject = zipObject, lodash.zipObjectDeep = zipObjectDeep, 
                    lodash.zipWith = zipWith, lodash.entries = toPairs, lodash.entriesIn = toPairsIn, 
                    lodash.extend = assignIn, lodash.extendWith = assignInWith, mixin(lodash, lodash), 
                    lodash.add = add, lodash.attempt = attempt, lodash.camelCase = camelCase, lodash.capitalize = capitalize, 
                    lodash.ceil = ceil, lodash.clamp = clamp, lodash.clone = clone, lodash.cloneDeep = cloneDeep, 
                    lodash.cloneDeepWith = cloneDeepWith, lodash.cloneWith = cloneWith, lodash.conformsTo = conformsTo, 
                    lodash.deburr = deburr, lodash.defaultTo = defaultTo, lodash.divide = divide, lodash.endsWith = endsWith, 
                    lodash.eq = eq, lodash.escape = escape, lodash.escapeRegExp = escapeRegExp, lodash.every = every, 
                    lodash.find = find, lodash.findIndex = findIndex, lodash.findKey = findKey, lodash.findLast = findLast, 
                    lodash.findLastIndex = findLastIndex, lodash.findLastKey = findLastKey, lodash.floor = floor, 
                    lodash.forEach = forEach, lodash.forEachRight = forEachRight, lodash.forIn = forIn, 
                    lodash.forInRight = forInRight, lodash.forOwn = forOwn, lodash.forOwnRight = forOwnRight, 
                    lodash.get = get, lodash.gt = gt, lodash.gte = gte, lodash.has = has, lodash.hasIn = hasIn, 
                    lodash.head = head, lodash.identity = identity, lodash.includes = includes, lodash.indexOf = indexOf, 
                    lodash.inRange = inRange, lodash.invoke = invoke, lodash.isArguments = isArguments, 
                    lodash.isArray = isArray, lodash.isArrayBuffer = isArrayBuffer, lodash.isArrayLike = isArrayLike, 
                    lodash.isArrayLikeObject = isArrayLikeObject, lodash.isBoolean = isBoolean, lodash.isBuffer = isBuffer, 
                    lodash.isDate = isDate, lodash.isElement = isElement, lodash.isEmpty = isEmpty, 
                    lodash.isEqual = isEqual, lodash.isEqualWith = isEqualWith, lodash.isError = isError, 
                    lodash.isFinite = isFinite, lodash.isFunction = isFunction, lodash.isInteger = isInteger, 
                    lodash.isLength = isLength, lodash.isMap = isMap, lodash.isMatch = isMatch, lodash.isMatchWith = isMatchWith, 
                    lodash.isNaN = isNaN, lodash.isNative = isNative, lodash.isNil = isNil, lodash.isNull = isNull, 
                    lodash.isNumber = isNumber, lodash.isObject = isObject, lodash.isObjectLike = isObjectLike, 
                    lodash.isPlainObject = isPlainObject, lodash.isRegExp = isRegExp, lodash.isSafeInteger = isSafeInteger, 
                    lodash.isSet = isSet, lodash.isString = isString, lodash.isSymbol = isSymbol, lodash.isTypedArray = isTypedArray, 
                    lodash.isUndefined = isUndefined, lodash.isWeakMap = isWeakMap, lodash.isWeakSet = isWeakSet, 
                    lodash.join = join, lodash.kebabCase = kebabCase, lodash.last = last, lodash.lastIndexOf = lastIndexOf, 
                    lodash.lowerCase = lowerCase, lodash.lowerFirst = lowerFirst, lodash.lt = lt, lodash.lte = lte, 
                    lodash.max = max, lodash.maxBy = maxBy, lodash.mean = mean, lodash.meanBy = meanBy, 
                    lodash.min = min, lodash.minBy = minBy, lodash.stubArray = stubArray, lodash.stubFalse = stubFalse, 
                    lodash.stubObject = stubObject, lodash.stubString = stubString, lodash.stubTrue = stubTrue, 
                    lodash.multiply = multiply, lodash.nth = nth, lodash.noConflict = noConflict, lodash.noop = noop, 
                    lodash.now = now, lodash.pad = pad, lodash.padEnd = padEnd, lodash.padStart = padStart, 
                    lodash.parseInt = parseInt, lodash.random = random, lodash.reduce = reduce, lodash.reduceRight = reduceRight, 
                    lodash.repeat = repeat, lodash.replace = replace, lodash.result = result, lodash.round = round, 
                    lodash.runInContext = runInContext, lodash.sample = sample, lodash.size = size, 
                    lodash.snakeCase = snakeCase, lodash.some = some, lodash.sortedIndex = sortedIndex, 
                    lodash.sortedIndexBy = sortedIndexBy, lodash.sortedIndexOf = sortedIndexOf, lodash.sortedLastIndex = sortedLastIndex, 
                    lodash.sortedLastIndexBy = sortedLastIndexBy, lodash.sortedLastIndexOf = sortedLastIndexOf, 
                    lodash.startCase = startCase, lodash.startsWith = startsWith, lodash.subtract = subtract, 
                    lodash.sum = sum, lodash.sumBy = sumBy, lodash.template = template, lodash.times = times, 
                    lodash.toFinite = toFinite, lodash.toInteger = toInteger, lodash.toLength = toLength, 
                    lodash.toLower = toLower, lodash.toNumber = toNumber, lodash.toSafeInteger = toSafeInteger, 
                    lodash.toString = toString, lodash.toUpper = toUpper, lodash.trim = trim, lodash.trimEnd = trimEnd, 
                    lodash.trimStart = trimStart, lodash.truncate = truncate, lodash.unescape = unescape, 
                    lodash.uniqueId = uniqueId, lodash.upperCase = upperCase, lodash.upperFirst = upperFirst, 
                    lodash.each = forEach, lodash.eachRight = forEachRight, lodash.first = head, mixin(lodash, function() {
                        var source = {};
                        return baseForOwn(lodash, function(func, methodName) {
                            hasOwnProperty.call(lodash.prototype, methodName) || (source[methodName] = func);
                        }), source;
                    }(), {
                        chain: !1
                    }), lodash.VERSION = VERSION, arrayEach([ "bind", "bindKey", "curry", "curryRight", "partial", "partialRight" ], function(methodName) {
                        lodash[methodName].placeholder = lodash;
                    }), arrayEach([ "drop", "take" ], function(methodName, index) {
                        LazyWrapper.prototype[methodName] = function(n) {
                            n = n === undefined ? 1 : nativeMax(toInteger(n), 0);
                            var result = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
                            return result.__filtered__ ? result.__takeCount__ = nativeMin(n, result.__takeCount__) : result.__views__.push({
                                size: nativeMin(n, MAX_ARRAY_LENGTH),
                                type: methodName + (result.__dir__ < 0 ? "Right" : "")
                            }), result;
                        }, LazyWrapper.prototype[methodName + "Right"] = function(n) {
                            return this.reverse()[methodName](n).reverse();
                        };
                    }), arrayEach([ "filter", "map", "takeWhile" ], function(methodName, index) {
                        var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
                        LazyWrapper.prototype[methodName] = function(iteratee) {
                            var result = this.clone();
                            return result.__iteratees__.push({
                                iteratee: getIteratee(iteratee, 3),
                                type: type
                            }), result.__filtered__ = result.__filtered__ || isFilter, result;
                        };
                    }), arrayEach([ "head", "last" ], function(methodName, index) {
                        var takeName = "take" + (index ? "Right" : "");
                        LazyWrapper.prototype[methodName] = function() {
                            return this[takeName](1).value()[0];
                        };
                    }), arrayEach([ "initial", "tail" ], function(methodName, index) {
                        var dropName = "drop" + (index ? "" : "Right");
                        LazyWrapper.prototype[methodName] = function() {
                            return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
                        };
                    }), LazyWrapper.prototype.compact = function() {
                        return this.filter(identity);
                    }, LazyWrapper.prototype.find = function(predicate) {
                        return this.filter(predicate).head();
                    }, LazyWrapper.prototype.findLast = function(predicate) {
                        return this.reverse().find(predicate);
                    }, LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
                        return "function" == typeof path ? new LazyWrapper(this) : this.map(function(value) {
                            return baseInvoke(value, path, args);
                        });
                    }), LazyWrapper.prototype.reject = function(predicate) {
                        return this.filter(negate(getIteratee(predicate)));
                    }, LazyWrapper.prototype.slice = function(start, end) {
                        start = toInteger(start);
                        var result = this;
                        return result.__filtered__ && (start > 0 || end < 0) ? new LazyWrapper(result) : (start < 0 ? result = result.takeRight(-start) : start && (result = result.drop(start)), 
                        end !== undefined && (end = toInteger(end), result = end < 0 ? result.dropRight(-end) : result.take(end - start)), 
                        result);
                    }, LazyWrapper.prototype.takeRightWhile = function(predicate) {
                        return this.reverse().takeWhile(predicate).reverse();
                    }, LazyWrapper.prototype.toArray = function() {
                        return this.take(MAX_ARRAY_LENGTH);
                    }, baseForOwn(LazyWrapper.prototype, function(func, methodName) {
                        var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash[isTaker ? "take" + ("last" == methodName ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
                        lodashFunc && (lodash.prototype[methodName] = function() {
                            var value = this.__wrapped__, args = isTaker ? [ 1 ] : arguments, isLazy = value instanceof LazyWrapper, iteratee = args[0], useLazy = isLazy || isArray(value), interceptor = function(value) {
                                var result = lodashFunc.apply(lodash, arrayPush([ value ], args));
                                return isTaker && chainAll ? result[0] : result;
                            };
                            useLazy && checkIteratee && "function" == typeof iteratee && 1 != iteratee.length && (// Avoid lazy use if the iteratee has a "length" value other than `1`.
                            isLazy = useLazy = !1);
                            var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
                            if (!retUnwrapped && useLazy) {
                                value = onlyLazy ? value : new LazyWrapper(this);
                                var result = func.apply(value, args);
                                return result.__actions__.push({
                                    func: thru,
                                    args: [ interceptor ],
                                    thisArg: undefined
                                }), new LodashWrapper(result, chainAll);
                            }
                            return isUnwrapped && onlyLazy ? func.apply(this, args) : (result = this.thru(interceptor), 
                            isUnwrapped ? isTaker ? result.value()[0] : result.value() : result);
                        });
                    }), arrayEach([ "pop", "push", "shift", "sort", "splice", "unshift" ], function(methodName) {
                        var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
                        lodash.prototype[methodName] = function() {
                            var args = arguments;
                            if (retUnwrapped && !this.__chain__) {
                                var value = this.value();
                                return func.apply(isArray(value) ? value : [], args);
                            }
                            return this[chainName](function(value) {
                                return func.apply(isArray(value) ? value : [], args);
                            });
                        };
                    }), baseForOwn(LazyWrapper.prototype, function(func, methodName) {
                        var lodashFunc = lodash[methodName];
                        if (lodashFunc) {
                            var key = lodashFunc.name + "", names = realNames[key] || (realNames[key] = []);
                            names.push({
                                name: methodName,
                                func: lodashFunc
                            });
                        }
                    }), realNames[createHybrid(undefined, WRAP_BIND_KEY_FLAG).name] = [ {
                        name: "wrapper",
                        func: undefined
                    } ], LazyWrapper.prototype.clone = lazyClone, LazyWrapper.prototype.reverse = lazyReverse, 
                    LazyWrapper.prototype.value = lazyValue, lodash.prototype.at = wrapperAt, lodash.prototype.chain = wrapperChain, 
                    lodash.prototype.commit = wrapperCommit, lodash.prototype.next = wrapperNext, lodash.prototype.plant = wrapperPlant, 
                    lodash.prototype.reverse = wrapperReverse, lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue, 
                    lodash.prototype.first = lodash.prototype.head, symIterator && (lodash.prototype[symIterator] = wrapperToIterator), 
                    lodash;
                }, _ = runInContext();
                // Expose Lodash on the global object to prevent errors when Lodash is
                // loaded by a script tag in the presence of an AMD loader.
                // See http://requirejs.org/docs/errors.html#mismatch for more details.
                // Use `_.noConflict` to remove Lodash from the global object.
                root._ = _, __WEBPACK_AMD_DEFINE_RESULT__ = function() {
                    return _;
                }.call(exports, __webpack_require__, exports, module), // Define as an anonymous module so, through path mapping, it can be
                // referenced as the "underscore" module.
                !(__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            }).call(this);
        }).call(exports, function() {
            return this;
        }(), __webpack_require__(33)(module));
    }, /* 11 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */
        (function(global) {
            "use strict";
            var buffer = __webpack_require__(2), Buffer = buffer.Buffer, SlowBuffer = buffer.SlowBuffer, MAX_LEN = buffer.kMaxLength || 2147483647;
            exports.alloc = function(size, fill, encoding) {
                if ("function" == typeof Buffer.alloc) return Buffer.alloc(size, fill, encoding);
                if ("number" == typeof encoding) throw new TypeError("encoding must not be number");
                if ("number" != typeof size) throw new TypeError("size must be a number");
                if (size > MAX_LEN) throw new RangeError("size is too large");
                var enc = encoding, _fill = fill;
                void 0 === _fill && (enc = void 0, _fill = 0);
                var buf = new Buffer(size);
                if ("string" == typeof _fill) for (var fillBuf = new Buffer(_fill, enc), flen = fillBuf.length, i = -1; ++i < size; ) buf[i] = fillBuf[i % flen]; else buf.fill(_fill);
                return buf;
            }, exports.allocUnsafe = function(size) {
                if ("function" == typeof Buffer.allocUnsafe) return Buffer.allocUnsafe(size);
                if ("number" != typeof size) throw new TypeError("size must be a number");
                if (size > MAX_LEN) throw new RangeError("size is too large");
                return new Buffer(size);
            }, exports.from = function(value, encodingOrOffset, length) {
                if ("function" == typeof Buffer.from && (!global.Uint8Array || Uint8Array.from !== Buffer.from)) return Buffer.from(value, encodingOrOffset, length);
                if ("number" == typeof value) throw new TypeError('"value" argument must not be a number');
                if ("string" == typeof value) return new Buffer(value, encodingOrOffset);
                if ("undefined" != typeof ArrayBuffer && value instanceof ArrayBuffer) {
                    var offset = encodingOrOffset;
                    if (1 === arguments.length) return new Buffer(value);
                    "undefined" == typeof offset && (offset = 0);
                    var len = length;
                    if ("undefined" == typeof len && (len = value.byteLength - offset), offset >= value.byteLength) throw new RangeError("'offset' is out of bounds");
                    if (len > value.byteLength - offset) throw new RangeError("'length' is out of bounds");
                    return new Buffer(value.slice(offset, offset + len));
                }
                if (Buffer.isBuffer(value)) {
                    var out = new Buffer(value.length);
                    return value.copy(out, 0, 0, value.length), out;
                }
                if (value) {
                    if (Array.isArray(value) || "undefined" != typeof ArrayBuffer && value.buffer instanceof ArrayBuffer || "length" in value) return new Buffer(value);
                    if ("Buffer" === value.type && Array.isArray(value.data)) return new Buffer(value.data);
                }
                throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
            }, exports.allocUnsafeSlow = function(size) {
                if ("function" == typeof Buffer.allocUnsafeSlow) return Buffer.allocUnsafeSlow(size);
                if ("number" != typeof size) throw new TypeError("size must be a number");
                if (size >= MAX_LEN) throw new RangeError("size is too large");
                return new SlowBuffer(size);
            };
        }).call(exports, function() {
            return this;
        }());
    }, /* 12 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */
        (function(process) {
            "use strict";
            function nextTick(fn, arg1, arg2, arg3) {
                if ("function" != typeof fn) throw new TypeError('"callback" argument must be a function');
                var args, i, len = arguments.length;
                switch (len) {
                  case 0:
                  case 1:
                    return process.nextTick(fn);

                  case 2:
                    return process.nextTick(function() {
                        fn.call(null, arg1);
                    });

                  case 3:
                    return process.nextTick(function() {
                        fn.call(null, arg1, arg2);
                    });

                  case 4:
                    return process.nextTick(function() {
                        fn.call(null, arg1, arg2, arg3);
                    });

                  default:
                    for (args = new Array(len - 1), i = 0; i < args.length; ) args[i++] = arguments[i];
                    return process.nextTick(function() {
                        fn.apply(null, args);
                    });
                }
            }
            !process.version || 0 === process.version.indexOf("v0.") || 0 === process.version.indexOf("v1.") && 0 !== process.version.indexOf("v1.8.") ? module.exports = nextTick : module.exports = process.nextTick;
        }).call(exports, __webpack_require__(1));
    }, /* 13 */
    /***/
    function(module, exports, __webpack_require__) {
        // a transform stream is a readable/writable stream where you do
        // something with the data.  Sometimes it's called a "filter",
        // but that's not a great name for it, since that implies a thing where
        // some bits pass through, and others are simply ignored.  (That would
        // be a valid example of a transform, of course.)
        //
        // While the output is causally related to the input, it's not a
        // necessarily symmetric or synchronous transformation.  For example,
        // a zlib stream might take multiple plain-text writes(), and then
        // emit a single compressed chunk some time in the future.
        //
        // Here's how this works:
        //
        // The Transform stream has all the aspects of the readable and writable
        // stream classes.  When you write(chunk), that calls _write(chunk,cb)
        // internally, and returns false if there's a lot of pending writes
        // buffered up.  When you call read(), that calls _read(n) until
        // there's enough pending readable data buffered up.
        //
        // In a transform stream, the written data is placed in a buffer.  When
        // _read(n) is called, it transforms the queued up data, calling the
        // buffered _write cb's as it consumes chunks.  If consuming a single
        // written chunk would result in multiple output chunks, then the first
        // outputted bit calls the readcb, and subsequent chunks just go into
        // the read buffer, and will cause it to emit 'readable' if necessary.
        //
        // This way, back-pressure is actually determined by the reading side,
        // since _read has to be called to start processing a new chunk.  However,
        // a pathological inflate type of transform can cause excessive buffering
        // here.  For example, imagine a stream where every byte of input is
        // interpreted as an integer from 0-255, and then results in that many
        // bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
        // 1kb of data being output.  In this case, you could write a very small
        // amount of input, and end up with a very large amount of output.  In
        // such a pathological inflating mechanism, there'd be no way to tell
        // the system to stop doing the transform.  A single 4MB write could
        // cause the system to run out of memory.
        //
        // However, even in such a pathological case, only a single written chunk
        // would be consumed, and then the rest would wait (un-transformed) until
        // the results of the previous transformed chunk were consumed.
        "use strict";
        function TransformState(stream) {
            this.afterTransform = function(er, data) {
                return afterTransform(stream, er, data);
            }, this.needTransform = !1, this.transforming = !1, this.writecb = null, this.writechunk = null, 
            this.writeencoding = null;
        }
        function afterTransform(stream, er, data) {
            var ts = stream._transformState;
            ts.transforming = !1;
            var cb = ts.writecb;
            if (!cb) return stream.emit("error", new Error("no writecb in Transform class"));
            ts.writechunk = null, ts.writecb = null, null !== data && void 0 !== data && stream.push(data), 
            cb(er);
            var rs = stream._readableState;
            rs.reading = !1, (rs.needReadable || rs.length < rs.highWaterMark) && stream._read(rs.highWaterMark);
        }
        function Transform(options) {
            if (!(this instanceof Transform)) return new Transform(options);
            Duplex.call(this, options), this._transformState = new TransformState(this);
            var stream = this;
            // start out asking for a readable event once data is transformed.
            this._readableState.needReadable = !0, // we have implemented the _read method, and done the other things
            // that Readable wants before the first _read call, so unset the
            // sync guard flag.
            this._readableState.sync = !1, options && ("function" == typeof options.transform && (this._transform = options.transform), 
            "function" == typeof options.flush && (this._flush = options.flush)), // When the writable side finishes, then flush out anything remaining.
            this.once("prefinish", function() {
                "function" == typeof this._flush ? this._flush(function(er, data) {
                    done(stream, er, data);
                }) : done(stream);
            });
        }
        function done(stream, er, data) {
            if (er) return stream.emit("error", er);
            null !== data && void 0 !== data && stream.push(data);
            // if there's nothing in the write buffer, then that means
            // that nothing more will ever be provided
            var ws = stream._writableState, ts = stream._transformState;
            if (ws.length) throw new Error("Calling transform done when ws.length != 0");
            if (ts.transforming) throw new Error("Calling transform done when still transforming");
            return stream.push(null);
        }
        module.exports = Transform;
        var Duplex = __webpack_require__(4), util = __webpack_require__(6);
        util.inherits = __webpack_require__(3), /*</replacement>*/
        util.inherits(Transform, Duplex), Transform.prototype.push = function(chunk, encoding) {
            return this._transformState.needTransform = !1, Duplex.prototype.push.call(this, chunk, encoding);
        }, // This is the part where you do stuff!
        // override this function in implementation classes.
        // 'chunk' is an input chunk.
        //
        // Call `push(newChunk)` to pass along transformed output
        // to the readable side.  You may call 'push' zero or more times.
        //
        // Call `cb(err)` when you are done with this chunk.  If you pass
        // an error, then that'll put the hurt on the whole operation.  If you
        // never call cb(), then you'll never get another chunk.
        Transform.prototype._transform = function(chunk, encoding, cb) {
            throw new Error("_transform() is not implemented");
        }, Transform.prototype._write = function(chunk, encoding, cb) {
            var ts = this._transformState;
            if (ts.writecb = cb, ts.writechunk = chunk, ts.writeencoding = encoding, !ts.transforming) {
                var rs = this._readableState;
                (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) && this._read(rs.highWaterMark);
            }
        }, // Doesn't matter what the args are here.
        // _transform does all the work.
        // That we got here means that the readable side wants more data.
        Transform.prototype._read = function(n) {
            var ts = this._transformState;
            null !== ts.writechunk && ts.writecb && !ts.transforming ? (ts.transforming = !0, 
            this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform)) : // mark that we need a transform, so that any data that comes in
            // will get processed, now that we've asked for it.
            ts.needTransform = !0;
        };
    }, /* 14 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */
        (function(process, setImmediate) {
            // A bit simpler than readable streams.
            // Implement an async ._write(chunk, encoding, cb), and it'll handle all
            // the drain event emission and buffering.
            "use strict";
            function nop() {}
            function WriteReq(chunk, encoding, cb) {
                this.chunk = chunk, this.encoding = encoding, this.callback = cb, this.next = null;
            }
            function WritableState(options, stream) {
                Duplex = Duplex || __webpack_require__(4), options = options || {}, // object stream flag to indicate whether or not this stream
                // contains buffers or objects.
                this.objectMode = !!options.objectMode, stream instanceof Duplex && (this.objectMode = this.objectMode || !!options.writableObjectMode);
                // the point at which write() starts returning false
                // Note: 0 is a valid value, means that we always return false if
                // the entire buffer is not flushed immediately on write()
                var hwm = options.highWaterMark, defaultHwm = this.objectMode ? 16 : 16384;
                this.highWaterMark = hwm || 0 === hwm ? hwm : defaultHwm, // cast to ints.
                this.highWaterMark = ~~this.highWaterMark, // drain event flag.
                this.needDrain = !1, // at the start of calling end()
                this.ending = !1, // when end() has been called, and returned
                this.ended = !1, // when 'finish' is emitted
                this.finished = !1;
                // should we decode strings into buffers before passing to _write?
                // this is here so that some node-core streams can optimize string
                // handling at a lower level.
                var noDecode = options.decodeStrings === !1;
                this.decodeStrings = !noDecode, // Crypto is kind of old and crusty.  Historically, its default string
                // encoding is 'binary' so we have to make this configurable.
                // Everything else in the universe uses 'utf8', though.
                this.defaultEncoding = options.defaultEncoding || "utf8", // not an actual buffer we keep track of, but a measurement
                // of how much we're waiting to get pushed to some underlying
                // socket or file.
                this.length = 0, // a flag to see when we're in the middle of a write.
                this.writing = !1, // when true all writes will be buffered until .uncork() call
                this.corked = 0, // a flag to be able to tell if the onwrite cb is called immediately,
                // or on a later tick.  We set this to true at first, because any
                // actions that shouldn't happen until "later" should generally also
                // not happen before the first write call.
                this.sync = !0, // a flag to know if we're processing previously buffered items, which
                // may call the _write() callback in the same tick, so that we don't
                // end up in an overlapped onwrite situation.
                this.bufferProcessing = !1, // the callback that's passed to _write(chunk,cb)
                this.onwrite = function(er) {
                    onwrite(stream, er);
                }, // the callback that the user supplies to write(chunk,encoding,cb)
                this.writecb = null, // the amount that is being written when _write is called.
                this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, 
                // number of pending user-supplied write callbacks
                // this must be 0 before 'finish' can be emitted
                this.pendingcb = 0, // emit prefinish if the only thing we're waiting for is _write cbs
                // This is relevant for synchronous Transform streams
                this.prefinished = !1, // True if the error was already emitted and should not be thrown again
                this.errorEmitted = !1, // count buffered requests
                this.bufferedRequestCount = 0, // allocate the first CorkedRequest, there is always
                // one allocated and free to use, and we maintain at most two
                this.corkedRequestsFree = new CorkedRequest(this);
            }
            function Writable(options) {
                // Writable ctor is applied to Duplexes, too.
                // `realHasInstance` is necessary because using plain `instanceof`
                // would return false, as no `_writableState` property is attached.
                // Trying to use the custom `instanceof` for Writable here will also break the
                // Node.js LazyTransform implementation, which has a non-trivial getter for
                // `_writableState` that would lead to infinite recursion.
                // Writable ctor is applied to Duplexes, too.
                // `realHasInstance` is necessary because using plain `instanceof`
                // would return false, as no `_writableState` property is attached.
                // Trying to use the custom `instanceof` for Writable here will also break the
                // Node.js LazyTransform implementation, which has a non-trivial getter for
                // `_writableState` that would lead to infinite recursion.
                // legacy.
                return Duplex = Duplex || __webpack_require__(4), realHasInstance.call(Writable, this) || this instanceof Duplex ? (this._writableState = new WritableState(options, this), 
                this.writable = !0, options && ("function" == typeof options.write && (this._write = options.write), 
                "function" == typeof options.writev && (this._writev = options.writev)), void Stream.call(this)) : new Writable(options);
            }
            function writeAfterEnd(stream, cb) {
                var er = new Error("write after end");
                // TODO: defer error events consistently everywhere, not just the cb
                stream.emit("error", er), processNextTick(cb, er);
            }
            // If we get something that is not a buffer, string, null, or undefined,
            // and we're not in objectMode, then that's an error.
            // Otherwise stream chunks are all considered to be of length=1, and the
            // watermarks determine how many objects to keep in the buffer, rather than
            // how many bytes or characters.
            function validChunk(stream, state, chunk, cb) {
                var valid = !0, er = !1;
                // Always throw error if a null is written
                // if we are not in object mode then throw
                // if it is not a buffer, string, or undefined.
                return null === chunk ? er = new TypeError("May not write null values to stream") : Buffer.isBuffer(chunk) || "string" == typeof chunk || void 0 === chunk || state.objectMode || (er = new TypeError("Invalid non-string/buffer chunk")), 
                er && (stream.emit("error", er), processNextTick(cb, er), valid = !1), valid;
            }
            function decodeChunk(state, chunk, encoding) {
                return state.objectMode || state.decodeStrings === !1 || "string" != typeof chunk || (chunk = bufferShim.from(chunk, encoding)), 
                chunk;
            }
            // if we're already writing something, then just put this
            // in the queue, and wait our turn.  Otherwise, call _write
            // If we return false, then we need a drain event, so set that flag.
            function writeOrBuffer(stream, state, chunk, encoding, cb) {
                chunk = decodeChunk(state, chunk, encoding), Buffer.isBuffer(chunk) && (encoding = "buffer");
                var len = state.objectMode ? 1 : chunk.length;
                state.length += len;
                var ret = state.length < state.highWaterMark;
                if (// we must ensure that previous needDrain will not be reset to false.
                ret || (state.needDrain = !0), state.writing || state.corked) {
                    var last = state.lastBufferedRequest;
                    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb), last ? last.next = state.lastBufferedRequest : state.bufferedRequest = state.lastBufferedRequest, 
                    state.bufferedRequestCount += 1;
                } else doWrite(stream, state, !1, len, chunk, encoding, cb);
                return ret;
            }
            function doWrite(stream, state, writev, len, chunk, encoding, cb) {
                state.writelen = len, state.writecb = cb, state.writing = !0, state.sync = !0, writev ? stream._writev(chunk, state.onwrite) : stream._write(chunk, encoding, state.onwrite), 
                state.sync = !1;
            }
            function onwriteError(stream, state, sync, er, cb) {
                --state.pendingcb, sync ? processNextTick(cb, er) : cb(er), stream._writableState.errorEmitted = !0, 
                stream.emit("error", er);
            }
            function onwriteStateUpdate(state) {
                state.writing = !1, state.writecb = null, state.length -= state.writelen, state.writelen = 0;
            }
            function onwrite(stream, er) {
                var state = stream._writableState, sync = state.sync, cb = state.writecb;
                if (onwriteStateUpdate(state), er) onwriteError(stream, state, sync, er, cb); else {
                    // Check if we're actually ready to finish, but don't emit yet
                    var finished = needFinish(state);
                    finished || state.corked || state.bufferProcessing || !state.bufferedRequest || clearBuffer(stream, state), 
                    sync ? /*<replacement>*/
                    asyncWrite(afterWrite, stream, state, finished, cb) : afterWrite(stream, state, finished, cb);
                }
            }
            function afterWrite(stream, state, finished, cb) {
                finished || onwriteDrain(stream, state), state.pendingcb--, cb(), finishMaybe(stream, state);
            }
            // Must force callback to be called on nextTick, so that we don't
            // emit 'drain' before the write() consumer gets the 'false' return
            // value, and has a chance to attach a 'drain' listener.
            function onwriteDrain(stream, state) {
                0 === state.length && state.needDrain && (state.needDrain = !1, stream.emit("drain"));
            }
            // if there's something in the buffer waiting, then process it
            function clearBuffer(stream, state) {
                state.bufferProcessing = !0;
                var entry = state.bufferedRequest;
                if (stream._writev && entry && entry.next) {
                    // Fast case, write everything using _writev()
                    var l = state.bufferedRequestCount, buffer = new Array(l), holder = state.corkedRequestsFree;
                    holder.entry = entry;
                    for (var count = 0; entry; ) buffer[count] = entry, entry = entry.next, count += 1;
                    doWrite(stream, state, !0, state.length, buffer, "", holder.finish), // doWrite is almost always async, defer these to save a bit of time
                    // as the hot path ends with doWrite
                    state.pendingcb++, state.lastBufferedRequest = null, holder.next ? (state.corkedRequestsFree = holder.next, 
                    holder.next = null) : state.corkedRequestsFree = new CorkedRequest(state);
                } else {
                    // Slow case, write chunks one-by-one
                    for (;entry; ) {
                        var chunk = entry.chunk, encoding = entry.encoding, cb = entry.callback, len = state.objectMode ? 1 : chunk.length;
                        // if we didn't call the onwrite immediately, then
                        // it means that we need to wait until it does.
                        // also, that means that the chunk and cb are currently
                        // being processed, so move the buffer counter past them.
                        if (doWrite(stream, state, !1, len, chunk, encoding, cb), entry = entry.next, state.writing) break;
                    }
                    null === entry && (state.lastBufferedRequest = null);
                }
                state.bufferedRequestCount = 0, state.bufferedRequest = entry, state.bufferProcessing = !1;
            }
            function needFinish(state) {
                return state.ending && 0 === state.length && null === state.bufferedRequest && !state.finished && !state.writing;
            }
            function prefinish(stream, state) {
                state.prefinished || (state.prefinished = !0, stream.emit("prefinish"));
            }
            function finishMaybe(stream, state) {
                var need = needFinish(state);
                return need && (0 === state.pendingcb ? (prefinish(stream, state), state.finished = !0, 
                stream.emit("finish")) : prefinish(stream, state)), need;
            }
            function endWritable(stream, state, cb) {
                state.ending = !0, finishMaybe(stream, state), cb && (state.finished ? processNextTick(cb) : stream.once("finish", cb)), 
                state.ended = !0, stream.writable = !1;
            }
            // It seems a linked list but it is not
            // there will be only 2 of these for each stream
            function CorkedRequest(state) {
                var _this = this;
                this.next = null, this.entry = null, this.finish = function(err) {
                    var entry = _this.entry;
                    for (_this.entry = null; entry; ) {
                        var cb = entry.callback;
                        state.pendingcb--, cb(err), entry = entry.next;
                    }
                    state.corkedRequestsFree ? state.corkedRequestsFree.next = _this : state.corkedRequestsFree = _this;
                };
            }
            module.exports = Writable;
            /*<replacement>*/
            var Duplex, processNextTick = __webpack_require__(12), asyncWrite = !process.browser && [ "v0.10", "v0.9." ].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
            /*</replacement>*/
            Writable.WritableState = WritableState;
            /*<replacement>*/
            var util = __webpack_require__(6);
            util.inherits = __webpack_require__(3);
            /*</replacement>*/
            /*<replacement>*/
            var Stream, internalUtil = {
                deprecate: __webpack_require__(69)
            };
            !function() {
                try {
                    Stream = __webpack_require__(16);
                } catch (_) {} finally {
                    Stream || (Stream = __webpack_require__(7).EventEmitter);
                }
            }();
            /*</replacement>*/
            var Buffer = __webpack_require__(2).Buffer, bufferShim = __webpack_require__(11);
            /*</replacement>*/
            util.inherits(Writable, Stream), WritableState.prototype.getBuffer = function() {
                for (var current = this.bufferedRequest, out = []; current; ) out.push(current), 
                current = current.next;
                return out;
            }, function() {
                try {
                    Object.defineProperty(WritableState.prototype, "buffer", {
                        get: internalUtil.deprecate(function() {
                            return this.getBuffer();
                        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.")
                    });
                } catch (_) {}
            }();
            // Test _writableState for inheritance to account for Duplex streams,
            // whose prototype chain only points to Readable.
            var realHasInstance;
            "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (realHasInstance = Function.prototype[Symbol.hasInstance], 
            Object.defineProperty(Writable, Symbol.hasInstance, {
                value: function(object) {
                    return !!realHasInstance.call(this, object) || object && object._writableState instanceof WritableState;
                }
            })) : realHasInstance = function(object) {
                return object instanceof this;
            }, // Otherwise people can pipe Writable streams, which is just wrong.
            Writable.prototype.pipe = function() {
                this.emit("error", new Error("Cannot pipe, not readable"));
            }, Writable.prototype.write = function(chunk, encoding, cb) {
                var state = this._writableState, ret = !1;
                return "function" == typeof encoding && (cb = encoding, encoding = null), Buffer.isBuffer(chunk) ? encoding = "buffer" : encoding || (encoding = state.defaultEncoding), 
                "function" != typeof cb && (cb = nop), state.ended ? writeAfterEnd(this, cb) : validChunk(this, state, chunk, cb) && (state.pendingcb++, 
                ret = writeOrBuffer(this, state, chunk, encoding, cb)), ret;
            }, Writable.prototype.cork = function() {
                var state = this._writableState;
                state.corked++;
            }, Writable.prototype.uncork = function() {
                var state = this._writableState;
                state.corked && (state.corked--, state.writing || state.corked || state.finished || state.bufferProcessing || !state.bufferedRequest || clearBuffer(this, state));
            }, Writable.prototype.setDefaultEncoding = function(encoding) {
                if (// node::ParseEncoding() requires lower case.
                "string" == typeof encoding && (encoding = encoding.toLowerCase()), !([ "hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw" ].indexOf((encoding + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + encoding);
                return this._writableState.defaultEncoding = encoding, this;
            }, Writable.prototype._write = function(chunk, encoding, cb) {
                cb(new Error("_write() is not implemented"));
            }, Writable.prototype._writev = null, Writable.prototype.end = function(chunk, encoding, cb) {
                var state = this._writableState;
                "function" == typeof chunk ? (cb = chunk, chunk = null, encoding = null) : "function" == typeof encoding && (cb = encoding, 
                encoding = null), null !== chunk && void 0 !== chunk && this.write(chunk, encoding), 
                // .end() fully uncorks
                state.corked && (state.corked = 1, this.uncork()), // ignore unnecessary end() calls.
                state.ending || state.finished || endWritable(this, state, cb);
            };
        }).call(exports, __webpack_require__(1), __webpack_require__(29).setImmediate);
    }, /* 15 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */
        (function(process) {
            var Stream = function() {
                try {
                    return __webpack_require__(16);
                } catch (_) {}
            }();
            exports = module.exports = __webpack_require__(25), exports.Stream = Stream || exports, 
            exports.Readable = exports, exports.Writable = __webpack_require__(14), exports.Duplex = __webpack_require__(4), 
            exports.Transform = __webpack_require__(13), exports.PassThrough = __webpack_require__(24), 
            !process.browser && "disable" === {
                NODE_ENV: "production"
            }.READABLE_STREAM && Stream && (module.exports = Stream);
        }).call(exports, __webpack_require__(1));
    }, /* 16 */
    /***/
    function(module, exports, __webpack_require__) {
        // old-style streams.  Note that the pipe method (the only relevant
        // part of this class) is overridden in the Readable class.
        function Stream() {
            EE.call(this);
        }
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.
        module.exports = Stream;
        var EE = __webpack_require__(7).EventEmitter, inherits = __webpack_require__(3);
        inherits(Stream, EE), Stream.Readable = __webpack_require__(15), Stream.Writable = __webpack_require__(59), 
        Stream.Duplex = __webpack_require__(55), Stream.Transform = __webpack_require__(58), 
        Stream.PassThrough = __webpack_require__(57), // Backwards-compat with node 0.4.x
        Stream.Stream = Stream, Stream.prototype.pipe = function(dest, options) {
            function ondata(chunk) {
                dest.writable && !1 === dest.write(chunk) && source.pause && source.pause();
            }
            function ondrain() {
                source.readable && source.resume && source.resume();
            }
            function onend() {
                didOnEnd || (didOnEnd = !0, dest.end());
            }
            function onclose() {
                didOnEnd || (didOnEnd = !0, "function" == typeof dest.destroy && dest.destroy());
            }
            // don't leave dangling pipes when there are errors.
            function onerror(er) {
                if (cleanup(), 0 === EE.listenerCount(this, "error")) throw er;
            }
            // remove all the event listeners that were added.
            function cleanup() {
                source.removeListener("data", ondata), dest.removeListener("drain", ondrain), source.removeListener("end", onend), 
                source.removeListener("close", onclose), source.removeListener("error", onerror), 
                dest.removeListener("error", onerror), source.removeListener("end", cleanup), source.removeListener("close", cleanup), 
                dest.removeListener("close", cleanup);
            }
            var source = this;
            source.on("data", ondata), dest.on("drain", ondrain), // If the 'end' option is not supplied, dest.end() will be called when
            // source gets the 'end' or 'close' events.  Only dest.end() once.
            dest._isStdio || options && options.end === !1 || (source.on("end", onend), source.on("close", onclose));
            var didOnEnd = !1;
            // Allow for unix-like usage: A.pipe(B).pipe(C)
            return source.on("error", onerror), dest.on("error", onerror), source.on("end", cleanup), 
            source.on("close", cleanup), dest.on("close", cleanup), dest.emit("pipe", source), 
            dest;
        };
    }, /* 17 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" != typeof call && "function" != typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _clientbase = __webpack_require__(36), _clientbase2 = _interopRequireDefault(_clientbase), _user = __webpack_require__(41), _channel = __webpack_require__(35), _channel2 = _interopRequireDefault(_channel), _thread = __webpack_require__(40), _thread2 = _interopRequireDefault(_thread), _message = __webpack_require__(38), _message2 = _interopRequireDefault(_message), _document = __webpack_require__(37), _document2 = _interopRequireDefault(_document), _collection = __webpack_require__(18), _collection2 = _interopRequireDefault(_collection), _store = __webpack_require__(9), defaultOptions = {
            endpoint: "",
            token: ""
        }, Client = function(_ClientBase) {
            function Client() {
                var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : defaultOptions;
                _classCallCheck(this, Client);
                var _this = _possibleConstructorReturn(this, (Client.__proto__ || Object.getPrototypeOf(Client)).call(this, options));
                return _this.users = new _user.UserCollection(_this), _this.channels = new _collection2.default(_this, "channels"), 
                _this.threads = new _collection2.default(_this, "threads"), _this.messages = new _collection2.default(_this, "messages"), 
                _this.documents = new _collection2.default(_this, "documents"), _this;
            }
            return _inherits(Client, _ClientBase), _createClass(Client, [ {
                key: "token",
                value: function() {
                    return this.fetchJSON("/api/token");
                }
            }, {
                key: "login",
                value: function(payload) {
                    return this.postJSON("/api/login", payload, {
                        noauth: !0
                    }).then(function(token) {
                        return (0, _store.setToken)(token), token;
                    });
                }
            }, {
                key: "logout",
                value: function() {
                    return this.postJSON("/api/logout", {});
                }
            }, {
                key: "me",
                value: function() {
                    return this.fetchJSON("/api/user");
                }
            }, {
                key: "currentUser",
                value: function() {
                    return this.me();
                }
            }, {
                key: "user",
                value: function(id) {
                    return new _user.User(this, id);
                }
            }, {
                key: "channel",
                value: function(id) {
                    return new _channel2.default(this, id);
                }
            }, {
                key: "thread",
                value: function(id) {
                    return new _thread2.default(this, id);
                }
            }, {
                key: "message",
                value: function(id) {
                    return new _message2.default(this, id);
                }
            }, {
                key: "document",
                value: function(id) {
                    return new _document2.default(this, id);
                }
            }, {
                key: "search",
                value: function(query) {
                    return this.fetchJSON("/api/search", {
                        query: {
                            q: query
                        }
                    });
                }
            } ]), Client;
        }(_clientbase2.default);
        exports.default = Client;
    }, /* 18 */
    /***/
    function(module, exports) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), Collection = function() {
            function Collection(client, name) {
                _classCallCheck(this, Collection), this.client = client, this.name = name, this.path = "/api/" + this.name;
            }
            return _createClass(Collection, [ {
                key: "fetch",
                value: function() {
                    return this.client.fetchJSON(this.path).then(function(a) {
                        return a || [];
                    });
                }
            }, {
                key: "load",
                value: function() {
                    return this.fetch();
                }
            }, {
                key: "scan",
                value: function() {
                    return this.fetch();
                }
            }, {
                key: "create",
                value: function(body) {
                    return this.client.postJSON(this.path, body);
                }
            } ]), Collection;
        }();
        exports.default = Collection;
    }, /* 19 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */
        (function(process, setImmediate) {
            "use strict";
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" != typeof call && "function" != typeof call ? self : call;
            }
            function _inherits(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol ? "symbol" : typeof obj;
            }, _eventemitter = __webpack_require__(21), _eventemitter2 = _interopRequireDefault(_eventemitter), _eventsource = __webpack_require__(45), _eventsource2 = _interopRequireDefault(_eventsource), _urlJoin = __webpack_require__(30), _urlJoin2 = _interopRequireDefault(_urlJoin), _queryString = __webpack_require__(23), _queryString2 = _interopRequireDefault(_queryString), _lodash = __webpack_require__(10), _lodash2 = _interopRequireDefault(_lodash), _store = __webpack_require__(9), nextTick = function() {
                return "object" === ("undefined" == typeof process ? "undefined" : _typeof(process)) && "function" == typeof process.nextTick ? process.nextTick : "function" == typeof setImmediate ? setImmediate : function(cb) {
                    return setTimeout(cb, 0);
                };
            }(), defaultOptions = {
                url: "/api/event/stream",
                token: ""
            }, EventStream = function(_EventEmitter) {
                function EventStream() {
                    var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : defaultOptions;
                    _classCallCheck(this, EventStream);
                    var _this = _possibleConstructorReturn(this, (EventStream.__proto__ || Object.getPrototypeOf(EventStream)).call(this));
                    return _this._queue = [], _this._processing = !1, options && options.url && _this.open(options), 
                    _this;
                }
                return _inherits(EventStream, _EventEmitter), _createClass(EventStream, [ {
                    key: "open",
                    value: function(options) {
                        var _this2 = this;
                        this.close();
                        var token = options.token || (0, _store.getToken)(), params = _queryString2.default.stringify({
                            auth_token: token
                        }), url = (0, _urlJoin2.default)(options.url, "?" + params), source = new _eventsource2.default(url);
                        this.source = source, source.onerror = function(err) {
                            console.log("SSE error:", err), _this2.emit("error", err);
                        }, source.onmessage = function(event) {
                            var msg = _lodash2.default.isString(event.data) ? JSON.parse(event.data) : event.data;
                            console.log("SSE message:", msg), _this2.handleEvent(msg);
                        };
                    }
                }, {
                    key: "close",
                    value: function() {
                        this.source && (this.source.close(), this.source = null);
                    }
                }, {
                    key: "handleEvent",
                    value: function(e) {
                        var action = (e.action || "").toLowerCase(), id = e.resource_id, data = e.body, type = (e.type || "").toLowerCase(), eventType = type + "." + action;
                        "delete" === action && (data = id), this._push(eventType, data);
                    }
                }, {
                    key: "_push",
                    value: function(eventType, data) {
                        var _this3 = this;
                        this._queue.push(function() {
                            return _this3.emit(eventType, data);
                        }), this._processing || (this._processing = !0, this._loop());
                    }
                }, {
                    key: "_loop",
                    value: function() {
                        var _this4 = this, fn = this._queue.shift();
                        nextTick(function() {
                            try {
                                fn();
                            } catch (err) {
                                console.log(err);
                            }
                            _this4._queue.length > 0 ? _this4._loop() : _this4._processing = !1;
                        });
                    }
                } ]), EventStream;
            }(_eventemitter2.default);
            exports.default = EventStream;
        }).call(exports, __webpack_require__(1), __webpack_require__(29).setImmediate);
    }, /* 20 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.ServerEvents = exports.SSE = exports.API = void 0;
        var _client = __webpack_require__(17), _client2 = _interopRequireDefault(_client), _eventstream = __webpack_require__(19), _eventstream2 = _interopRequireDefault(_eventstream), SSE = (exports.API = new _client2.default(), 
        exports.SSE = new _eventstream2.default());
        exports.ServerEvents = SSE;
    }, /* 21 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        /**
	 * Constructor to create a storage for our `EE` objects.
	 * An `Events` instance is a plain object whose properties are event names.
	 *
	 * @constructor
	 * @api private
	 */
        function Events() {}
        /**
	 * Representation of a single event listener.
	 *
	 * @param {Function} fn The listener function.
	 * @param {Mixed} context The context to invoke the listener with.
	 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
	 * @constructor
	 * @api private
	 */
        function EE(fn, context, once) {
            this.fn = fn, this.context = context, this.once = once || !1;
        }
        /**
	 * Minimal `EventEmitter` interface that is molded against the Node.js
	 * `EventEmitter` interface.
	 *
	 * @constructor
	 * @api public
	 */
        function EventEmitter() {
            this._events = new Events(), this._eventsCount = 0;
        }
        var has = Object.prototype.hasOwnProperty, prefix = "~";
        //
        // We try to not inherit from `Object.prototype`. In some engines creating an
        // instance in this way is faster than calling `Object.create(null)` directly.
        // If `Object.create(null)` is not supported we prefix the event names with a
        // character to make sure that the built-in object properties are not
        // overridden or used as an attack vector.
        //
        Object.create && (Events.prototype = Object.create(null), //
        // This hack is needed because the `__proto__` property is still inherited in
        // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
        //
        new Events().__proto__ || (prefix = !1)), /**
	 * Return an array listing the events for which the emitter has registered
	 * listeners.
	 *
	 * @returns {Array}
	 * @api public
	 */
        EventEmitter.prototype.eventNames = function() {
            var events, name, names = [];
            if (0 === this._eventsCount) return names;
            for (name in events = this._events) has.call(events, name) && names.push(prefix ? name.slice(1) : name);
            return Object.getOwnPropertySymbols ? names.concat(Object.getOwnPropertySymbols(events)) : names;
        }, /**
	 * Return the listeners registered for a given event.
	 *
	 * @param {String|Symbol} event The event name.
	 * @param {Boolean} exists Only check if there are listeners.
	 * @returns {Array|Boolean}
	 * @api public
	 */
        EventEmitter.prototype.listeners = function(event, exists) {
            var evt = prefix ? prefix + event : event, available = this._events[evt];
            if (exists) return !!available;
            if (!available) return [];
            if (available.fn) return [ available.fn ];
            for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) ee[i] = available[i].fn;
            return ee;
        }, /**
	 * Calls each of the listeners registered for a given event.
	 *
	 * @param {String|Symbol} event The event name.
	 * @returns {Boolean} `true` if the event had listeners, else `false`.
	 * @api public
	 */
        EventEmitter.prototype.emit = function(event, a1, a2, a3, a4, a5) {
            var evt = prefix ? prefix + event : event;
            if (!this._events[evt]) return !1;
            var args, i, listeners = this._events[evt], len = arguments.length;
            if (listeners.fn) {
                switch (listeners.once && this.removeListener(event, listeners.fn, void 0, !0), 
                len) {
                  case 1:
                    return listeners.fn.call(listeners.context), !0;

                  case 2:
                    return listeners.fn.call(listeners.context, a1), !0;

                  case 3:
                    return listeners.fn.call(listeners.context, a1, a2), !0;

                  case 4:
                    return listeners.fn.call(listeners.context, a1, a2, a3), !0;

                  case 5:
                    return listeners.fn.call(listeners.context, a1, a2, a3, a4), !0;

                  case 6:
                    return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), !0;
                }
                for (i = 1, args = new Array(len - 1); i < len; i++) args[i - 1] = arguments[i];
                listeners.fn.apply(listeners.context, args);
            } else {
                var j, length = listeners.length;
                for (i = 0; i < length; i++) switch (listeners[i].once && this.removeListener(event, listeners[i].fn, void 0, !0), 
                len) {
                  case 1:
                    listeners[i].fn.call(listeners[i].context);
                    break;

                  case 2:
                    listeners[i].fn.call(listeners[i].context, a1);
                    break;

                  case 3:
                    listeners[i].fn.call(listeners[i].context, a1, a2);
                    break;

                  case 4:
                    listeners[i].fn.call(listeners[i].context, a1, a2, a3);
                    break;

                  default:
                    if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) args[j - 1] = arguments[j];
                    listeners[i].fn.apply(listeners[i].context, args);
                }
            }
            return !0;
        }, /**
	 * Add a listener for a given event.
	 *
	 * @param {String|Symbol} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {Mixed} [context=this] The context to invoke the listener with.
	 * @returns {EventEmitter} `this`.
	 * @api public
	 */
        EventEmitter.prototype.on = function(event, fn, context) {
            var listener = new EE(fn, context || this), evt = prefix ? prefix + event : event;
            return this._events[evt] ? this._events[evt].fn ? this._events[evt] = [ this._events[evt], listener ] : this._events[evt].push(listener) : (this._events[evt] = listener, 
            this._eventsCount++), this;
        }, /**
	 * Add a one-time listener for a given event.
	 *
	 * @param {String|Symbol} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {Mixed} [context=this] The context to invoke the listener with.
	 * @returns {EventEmitter} `this`.
	 * @api public
	 */
        EventEmitter.prototype.once = function(event, fn, context) {
            var listener = new EE(fn, context || this, !0), evt = prefix ? prefix + event : event;
            return this._events[evt] ? this._events[evt].fn ? this._events[evt] = [ this._events[evt], listener ] : this._events[evt].push(listener) : (this._events[evt] = listener, 
            this._eventsCount++), this;
        }, /**
	 * Remove the listeners of a given event.
	 *
	 * @param {String|Symbol} event The event name.
	 * @param {Function} fn Only remove the listeners that match this function.
	 * @param {Mixed} context Only remove the listeners that have this context.
	 * @param {Boolean} once Only remove one-time listeners.
	 * @returns {EventEmitter} `this`.
	 * @api public
	 */
        EventEmitter.prototype.removeListener = function(event, fn, context, once) {
            var evt = prefix ? prefix + event : event;
            if (!this._events[evt]) return this;
            if (!fn) return 0 === --this._eventsCount ? this._events = new Events() : delete this._events[evt], 
            this;
            var listeners = this._events[evt];
            if (listeners.fn) listeners.fn !== fn || once && !listeners.once || context && listeners.context !== context || (0 === --this._eventsCount ? this._events = new Events() : delete this._events[evt]); else {
                for (var i = 0, events = [], length = listeners.length; i < length; i++) (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) && events.push(listeners[i]);
                //
                // Reset the array, or remove it completely if we have no more listeners.
                //
                events.length ? this._events[evt] = 1 === events.length ? events[0] : events : 0 === --this._eventsCount ? this._events = new Events() : delete this._events[evt];
            }
            return this;
        }, /**
	 * Remove all listeners, or those of the specified event.
	 *
	 * @param {String|Symbol} [event] The event name.
	 * @returns {EventEmitter} `this`.
	 * @api public
	 */
        EventEmitter.prototype.removeAllListeners = function(event) {
            var evt;
            return event ? (evt = prefix ? prefix + event : event, this._events[evt] && (0 === --this._eventsCount ? this._events = new Events() : delete this._events[evt])) : (this._events = new Events(), 
            this._eventsCount = 0), this;
        }, //
        // Alias methods names because people roll like that.
        //
        EventEmitter.prototype.off = EventEmitter.prototype.removeListener, EventEmitter.prototype.addListener = EventEmitter.prototype.on, 
        //
        // This function doesn't apply anymore.
        //
        EventEmitter.prototype.setMaxListeners = function() {
            return this;
        }, //
        // Expose the prefix.
        //
        EventEmitter.prefixed = prefix, //
        // Allow `EventEmitter` to be imported as module namespace.
        //
        EventEmitter.EventEmitter = EventEmitter, module.exports = EventEmitter;
    }, /* 22 */
    /***/
    function(module, exports) {
        var toString = {}.toString;
        module.exports = Array.isArray || function(arr) {
            return "[object Array]" == toString.call(arr);
        };
    }, /* 23 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function encode(value, opts) {
            return opts.encode ? opts.strict ? strictUriEncode(value) : encodeURIComponent(value) : value;
        }
        var strictUriEncode = __webpack_require__(64), objectAssign = __webpack_require__(49);
        exports.extract = function(str) {
            return str.split("?")[1] || "";
        }, exports.parse = function(str) {
            // Create an object with no prototype
            // https://github.com/sindresorhus/query-string/issues/47
            var ret = Object.create(null);
            return "string" != typeof str ? ret : (str = str.trim().replace(/^(\?|#|&)/, "")) ? (str.split("&").forEach(function(param) {
                var parts = param.replace(/\+/g, " ").split("="), key = parts.shift(), val = parts.length > 0 ? parts.join("=") : void 0;
                key = decodeURIComponent(key), // missing `=` should be `null`:
                // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
                val = void 0 === val ? null : decodeURIComponent(val), void 0 === ret[key] ? ret[key] = val : Array.isArray(ret[key]) ? ret[key].push(val) : ret[key] = [ ret[key], val ];
            }), ret) : ret;
        }, exports.stringify = function(obj, opts) {
            var defaults = {
                encode: !0,
                strict: !0
            };
            return opts = objectAssign(defaults, opts), obj ? Object.keys(obj).sort().map(function(key) {
                var val = obj[key];
                if (void 0 === val) return "";
                if (null === val) return encode(key, opts);
                if (Array.isArray(val)) {
                    var result = [];
                    return val.slice().forEach(function(val2) {
                        void 0 !== val2 && (null === val2 ? result.push(encode(key, opts)) : result.push(encode(key, opts) + "=" + encode(val2, opts)));
                    }), result.join("&");
                }
                return encode(key, opts) + "=" + encode(val, opts);
            }).filter(function(x) {
                return x.length > 0;
            }).join("&") : "";
        };
    }, /* 24 */
    /***/
    function(module, exports, __webpack_require__) {
        // a passthrough stream.
        // basically just the most minimal sort of Transform stream.
        // Every written chunk gets output as-is.
        "use strict";
        function PassThrough(options) {
            return this instanceof PassThrough ? void Transform.call(this, options) : new PassThrough(options);
        }
        module.exports = PassThrough;
        var Transform = __webpack_require__(13), util = __webpack_require__(6);
        util.inherits = __webpack_require__(3), /*</replacement>*/
        util.inherits(PassThrough, Transform), PassThrough.prototype._transform = function(chunk, encoding, cb) {
            cb(null, chunk);
        };
    }, /* 25 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */
        (function(process) {
            "use strict";
            function prependListener(emitter, event, fn) {
                // Sadly this is not cacheable as some libraries bundle their own
                // event emitter implementation with them.
                // Sadly this is not cacheable as some libraries bundle their own
                // event emitter implementation with them.
                // This is a hack to make sure that our error handler is attached before any
                // userland ones.  NEVER DO THIS. This is here only because this code needs
                // to continue to work with older versions of Node.js that do not include
                // the prependListener() method. The goal is to eventually remove this hack.
                return "function" == typeof emitter.prependListener ? emitter.prependListener(event, fn) : void (emitter._events && emitter._events[event] ? isArray(emitter._events[event]) ? emitter._events[event].unshift(fn) : emitter._events[event] = [ fn, emitter._events[event] ] : emitter.on(event, fn));
            }
            function ReadableState(options, stream) {
                Duplex = Duplex || __webpack_require__(4), options = options || {}, // object stream flag. Used to make read(n) ignore n and to
                // make all the buffer merging and length checks go away
                this.objectMode = !!options.objectMode, stream instanceof Duplex && (this.objectMode = this.objectMode || !!options.readableObjectMode);
                // the point at which it stops calling _read() to fill the buffer
                // Note: 0 is a valid value, means "don't call _read preemptively ever"
                var hwm = options.highWaterMark, defaultHwm = this.objectMode ? 16 : 16384;
                this.highWaterMark = hwm || 0 === hwm ? hwm : defaultHwm, // cast to ints.
                this.highWaterMark = ~~this.highWaterMark, // A linked list is used to store data chunks instead of an array because the
                // linked list can remove elements from the beginning faster than
                // array.shift()
                this.buffer = new BufferList(), this.length = 0, this.pipes = null, this.pipesCount = 0, 
                this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, // a flag to be able to tell if the onwrite cb is called immediately,
                // or on a later tick.  We set this to true at first, because any
                // actions that shouldn't happen until "later" should generally also
                // not happen before the first write call.
                this.sync = !0, // whenever we return null, then we set a flag to say
                // that we're awaiting a 'readable' event emission.
                this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, 
                this.resumeScheduled = !1, // Crypto is kind of old and crusty.  Historically, its default string
                // encoding is 'binary' so we have to make this configurable.
                // Everything else in the universe uses 'utf8', though.
                this.defaultEncoding = options.defaultEncoding || "utf8", // when piping, we only care about 'readable' events that happen
                // after read()ing all the bytes and not getting any pushback.
                this.ranOut = !1, // the number of writers that are awaiting a drain event in .pipe()s
                this.awaitDrain = 0, // if true, a maybeReadMore has been scheduled
                this.readingMore = !1, this.decoder = null, this.encoding = null, options.encoding && (StringDecoder || (StringDecoder = __webpack_require__(28).StringDecoder), 
                this.decoder = new StringDecoder(options.encoding), this.encoding = options.encoding);
            }
            function Readable(options) {
                // legacy
                return Duplex = Duplex || __webpack_require__(4), this instanceof Readable ? (this._readableState = new ReadableState(options, this), 
                this.readable = !0, options && "function" == typeof options.read && (this._read = options.read), 
                void Stream.call(this)) : new Readable(options);
            }
            function readableAddChunk(stream, state, chunk, encoding, addToFront) {
                var er = chunkInvalid(state, chunk);
                if (er) stream.emit("error", er); else if (null === chunk) state.reading = !1, onEofChunk(stream, state); else if (state.objectMode || chunk && chunk.length > 0) if (state.ended && !addToFront) {
                    var e = new Error("stream.push() after EOF");
                    stream.emit("error", e);
                } else if (state.endEmitted && addToFront) {
                    var _e = new Error("stream.unshift() after end event");
                    stream.emit("error", _e);
                } else {
                    var skipAdd;
                    !state.decoder || addToFront || encoding || (chunk = state.decoder.write(chunk), 
                    skipAdd = !state.objectMode && 0 === chunk.length), addToFront || (state.reading = !1), 
                    // Don't add to the buffer if we've decoded to an empty string chunk and
                    // we're not in object mode
                    skipAdd || (// if we want the data now, just emit it.
                    state.flowing && 0 === state.length && !state.sync ? (stream.emit("data", chunk), 
                    stream.read(0)) : (// update the buffer info.
                    state.length += state.objectMode ? 1 : chunk.length, addToFront ? state.buffer.unshift(chunk) : state.buffer.push(chunk), 
                    state.needReadable && emitReadable(stream))), maybeReadMore(stream, state);
                } else addToFront || (state.reading = !1);
                return needMoreData(state);
            }
            // if it's past the high water mark, we can push in some more.
            // Also, if we have no data yet, we can stand some
            // more bytes.  This is to work around cases where hwm=0,
            // such as the repl.  Also, if the push() triggered a
            // readable event, and the user called read(largeNumber) such that
            // needReadable was set, then we ought to push more, so that another
            // 'readable' event will be triggered.
            function needMoreData(state) {
                return !state.ended && (state.needReadable || state.length < state.highWaterMark || 0 === state.length);
            }
            function computeNewHighWaterMark(n) {
                // Get the next highest power of 2 to prevent increasing hwm excessively in
                // tiny amounts
                return n >= MAX_HWM ? n = MAX_HWM : (n--, n |= n >>> 1, n |= n >>> 2, n |= n >>> 4, 
                n |= n >>> 8, n |= n >>> 16, n++), n;
            }
            // This function is designed to be inlinable, so please take care when making
            // changes to the function body.
            function howMuchToRead(n, state) {
                // Only flow one buffer at a time
                // If we're asking for more than the current hwm, then raise the hwm.
                // Don't have enough
                return n <= 0 || 0 === state.length && state.ended ? 0 : state.objectMode ? 1 : n !== n ? state.flowing && state.length ? state.buffer.head.data.length : state.length : (n > state.highWaterMark && (state.highWaterMark = computeNewHighWaterMark(n)), 
                n <= state.length ? n : state.ended ? state.length : (state.needReadable = !0, 0));
            }
            function chunkInvalid(state, chunk) {
                var er = null;
                return Buffer.isBuffer(chunk) || "string" == typeof chunk || null === chunk || void 0 === chunk || state.objectMode || (er = new TypeError("Invalid non-string/buffer chunk")), 
                er;
            }
            function onEofChunk(stream, state) {
                if (!state.ended) {
                    if (state.decoder) {
                        var chunk = state.decoder.end();
                        chunk && chunk.length && (state.buffer.push(chunk), state.length += state.objectMode ? 1 : chunk.length);
                    }
                    state.ended = !0, // emit 'readable' now to make sure it gets picked up.
                    emitReadable(stream);
                }
            }
            // Don't emit readable right away in sync mode, because this can trigger
            // another read() call => stack overflow.  This way, it might trigger
            // a nextTick recursion warning, but that's not so bad.
            function emitReadable(stream) {
                var state = stream._readableState;
                state.needReadable = !1, state.emittedReadable || (debug("emitReadable", state.flowing), 
                state.emittedReadable = !0, state.sync ? processNextTick(emitReadable_, stream) : emitReadable_(stream));
            }
            function emitReadable_(stream) {
                debug("emit readable"), stream.emit("readable"), flow(stream);
            }
            // at this point, the user has presumably seen the 'readable' event,
            // and called read() to consume some data.  that may have triggered
            // in turn another _read(n) call, in which case reading = true if
            // it's in progress.
            // However, if we're not ended, or reading, and the length < hwm,
            // then go ahead and try to read some more preemptively.
            function maybeReadMore(stream, state) {
                state.readingMore || (state.readingMore = !0, processNextTick(maybeReadMore_, stream, state));
            }
            function maybeReadMore_(stream, state) {
                for (var len = state.length; !state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark && (debug("maybeReadMore read 0"), 
                stream.read(0), len !== state.length); ) len = state.length;
                state.readingMore = !1;
            }
            function pipeOnDrain(src) {
                return function() {
                    var state = src._readableState;
                    debug("pipeOnDrain", state.awaitDrain), state.awaitDrain && state.awaitDrain--, 
                    0 === state.awaitDrain && EElistenerCount(src, "data") && (state.flowing = !0, flow(src));
                };
            }
            function nReadingNextTick(self) {
                debug("readable nexttick read 0"), self.read(0);
            }
            function resume(stream, state) {
                state.resumeScheduled || (state.resumeScheduled = !0, processNextTick(resume_, stream, state));
            }
            function resume_(stream, state) {
                state.reading || (debug("resume read 0"), stream.read(0)), state.resumeScheduled = !1, 
                state.awaitDrain = 0, stream.emit("resume"), flow(stream), state.flowing && !state.reading && stream.read(0);
            }
            function flow(stream) {
                var state = stream._readableState;
                for (debug("flow", state.flowing); state.flowing && null !== stream.read(); ) ;
            }
            // Pluck off n bytes from an array of buffers.
            // Length is the combined lengths of all the buffers in the list.
            // This function is designed to be inlinable, so please take care when making
            // changes to the function body.
            function fromList(n, state) {
                // nothing buffered
                if (0 === state.length) return null;
                var ret;
                // read it all, truncate the list
                // read part of list
                return state.objectMode ? ret = state.buffer.shift() : !n || n >= state.length ? (ret = state.decoder ? state.buffer.join("") : 1 === state.buffer.length ? state.buffer.head.data : state.buffer.concat(state.length), 
                state.buffer.clear()) : ret = fromListPartial(n, state.buffer, state.decoder), ret;
            }
            // Extracts only enough buffered data to satisfy the amount requested.
            // This function is designed to be inlinable, so please take care when making
            // changes to the function body.
            function fromListPartial(n, list, hasStrings) {
                var ret;
                // slice is the same for buffers and strings
                // first chunk is a perfect match
                return n < list.head.data.length ? (ret = list.head.data.slice(0, n), list.head.data = list.head.data.slice(n)) : ret = n === list.head.data.length ? list.shift() : hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list), 
                ret;
            }
            // Copies a specified amount of characters from the list of buffered data
            // chunks.
            // This function is designed to be inlinable, so please take care when making
            // changes to the function body.
            function copyFromBufferString(n, list) {
                var p = list.head, c = 1, ret = p.data;
                for (n -= ret.length; p = p.next; ) {
                    var str = p.data, nb = n > str.length ? str.length : n;
                    if (ret += nb === str.length ? str : str.slice(0, n), n -= nb, 0 === n) {
                        nb === str.length ? (++c, p.next ? list.head = p.next : list.head = list.tail = null) : (list.head = p, 
                        p.data = str.slice(nb));
                        break;
                    }
                    ++c;
                }
                return list.length -= c, ret;
            }
            // Copies a specified amount of bytes from the list of buffered data chunks.
            // This function is designed to be inlinable, so please take care when making
            // changes to the function body.
            function copyFromBuffer(n, list) {
                var ret = bufferShim.allocUnsafe(n), p = list.head, c = 1;
                for (p.data.copy(ret), n -= p.data.length; p = p.next; ) {
                    var buf = p.data, nb = n > buf.length ? buf.length : n;
                    if (buf.copy(ret, ret.length - n, 0, nb), n -= nb, 0 === n) {
                        nb === buf.length ? (++c, p.next ? list.head = p.next : list.head = list.tail = null) : (list.head = p, 
                        p.data = buf.slice(nb));
                        break;
                    }
                    ++c;
                }
                return list.length -= c, ret;
            }
            function endReadable(stream) {
                var state = stream._readableState;
                // If we get here before consuming all the bytes, then that is a
                // bug in node.  Should never happen.
                if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');
                state.endEmitted || (state.ended = !0, processNextTick(endReadableNT, state, stream));
            }
            function endReadableNT(state, stream) {
                // Check that we didn't get one last unshift.
                state.endEmitted || 0 !== state.length || (state.endEmitted = !0, stream.readable = !1, 
                stream.emit("end"));
            }
            function forEach(xs, f) {
                for (var i = 0, l = xs.length; i < l; i++) f(xs[i], i);
            }
            function indexOf(xs, x) {
                for (var i = 0, l = xs.length; i < l; i++) if (xs[i] === x) return i;
                return -1;
            }
            module.exports = Readable;
            /*<replacement>*/
            var Duplex, processNextTick = __webpack_require__(12), isArray = __webpack_require__(22);
            /*</replacement>*/
            Readable.ReadableState = ReadableState;
            /*<replacement>*/
            var Stream, EElistenerCount = (__webpack_require__(7).EventEmitter, function(emitter, type) {
                return emitter.listeners(type).length;
            });
            !function() {
                try {
                    Stream = __webpack_require__(16);
                } catch (_) {} finally {
                    Stream || (Stream = __webpack_require__(7).EventEmitter);
                }
            }();
            /*</replacement>*/
            var Buffer = __webpack_require__(2).Buffer, bufferShim = __webpack_require__(11), util = __webpack_require__(6);
            util.inherits = __webpack_require__(3);
            /*</replacement>*/
            /*<replacement>*/
            var debugUtil = __webpack_require__(76), debug = void 0;
            debug = debugUtil && debugUtil.debuglog ? debugUtil.debuglog("stream") : function() {};
            /*</replacement>*/
            var StringDecoder, BufferList = __webpack_require__(56);
            util.inherits(Readable, Stream), // Manually shove something into the read() buffer.
            // This returns true if the highWaterMark has not been hit yet,
            // similar to how Writable.write() returns true if you should
            // write() some more.
            Readable.prototype.push = function(chunk, encoding) {
                var state = this._readableState;
                return state.objectMode || "string" != typeof chunk || (encoding = encoding || state.defaultEncoding, 
                encoding !== state.encoding && (chunk = bufferShim.from(chunk, encoding), encoding = "")), 
                readableAddChunk(this, state, chunk, encoding, !1);
            }, // Unshift should *always* be something directly out of read()
            Readable.prototype.unshift = function(chunk) {
                var state = this._readableState;
                return readableAddChunk(this, state, chunk, "", !0);
            }, Readable.prototype.isPaused = function() {
                return this._readableState.flowing === !1;
            }, // backwards compatibility.
            Readable.prototype.setEncoding = function(enc) {
                return StringDecoder || (StringDecoder = __webpack_require__(28).StringDecoder), 
                this._readableState.decoder = new StringDecoder(enc), this._readableState.encoding = enc, 
                this;
            };
            // Don't raise the hwm > 8MB
            var MAX_HWM = 8388608;
            // you can override either this method, or the async _read(n) below.
            Readable.prototype.read = function(n) {
                debug("read", n), n = parseInt(n, 10);
                var state = this._readableState, nOrig = n;
                // if we're doing read(0) to trigger a readable event, but we
                // already have a bunch of data in the buffer, then just trigger
                // the 'readable' event and move on.
                if (0 !== n && (state.emittedReadable = !1), 0 === n && state.needReadable && (state.length >= state.highWaterMark || state.ended)) return debug("read: emitReadable", state.length, state.ended), 
                0 === state.length && state.ended ? endReadable(this) : emitReadable(this), null;
                // if we've ended, and we're now clear, then finish it up.
                if (n = howMuchToRead(n, state), 0 === n && state.ended) return 0 === state.length && endReadable(this), 
                null;
                // All the actual chunk generation logic needs to be
                // *below* the call to _read.  The reason is that in certain
                // synthetic stream cases, such as passthrough streams, _read
                // may be a completely synchronous operation which may change
                // the state of the read buffer, providing enough data when
                // before there was *not* enough.
                //
                // So, the steps are:
                // 1. Figure out what the state of things will be after we do
                // a read from the buffer.
                //
                // 2. If that resulting state will trigger a _read, then call _read.
                // Note that this may be asynchronous, or synchronous.  Yes, it is
                // deeply ugly to write APIs this way, but that still doesn't mean
                // that the Readable class should behave improperly, as streams are
                // designed to be sync/async agnostic.
                // Take note if the _read call is sync or async (ie, if the read call
                // has returned yet), so that we know whether or not it's safe to emit
                // 'readable' etc.
                //
                // 3. Actually pull the requested chunks out of the buffer and return.
                // if we need a readable event, then we need to do some reading.
                var doRead = state.needReadable;
                debug("need readable", doRead), // if we currently have less than the highWaterMark, then also read some
                (0 === state.length || state.length - n < state.highWaterMark) && (doRead = !0, 
                debug("length less than watermark", doRead)), // however, if we've ended, then there's no point, and if we're already
                // reading, then it's unnecessary.
                state.ended || state.reading ? (doRead = !1, debug("reading or ended", doRead)) : doRead && (debug("do read"), 
                state.reading = !0, state.sync = !0, // if the length is currently zero, then we *need* a readable event.
                0 === state.length && (state.needReadable = !0), // call internal read method
                this._read(state.highWaterMark), state.sync = !1, // If _read pushed data synchronously, then `reading` will be false,
                // and we need to re-evaluate how much data we can return to the user.
                state.reading || (n = howMuchToRead(nOrig, state)));
                var ret;
                // If we have nothing in the buffer, then we want to know
                // as soon as we *do* get something into the buffer.
                // If we tried to read() past the EOF, then emit end on the next tick.
                return ret = n > 0 ? fromList(n, state) : null, null === ret ? (state.needReadable = !0, 
                n = 0) : state.length -= n, 0 === state.length && (state.ended || (state.needReadable = !0), 
                nOrig !== n && state.ended && endReadable(this)), null !== ret && this.emit("data", ret), 
                ret;
            }, // abstract method.  to be overridden in specific implementation classes.
            // call cb(er, data) where data is <= n in length.
            // for virtual (non-string, non-buffer) streams, "length" is somewhat
            // arbitrary, and perhaps not very meaningful.
            Readable.prototype._read = function(n) {
                this.emit("error", new Error("_read() is not implemented"));
            }, Readable.prototype.pipe = function(dest, pipeOpts) {
                function onunpipe(readable) {
                    debug("onunpipe"), readable === src && cleanup();
                }
                function onend() {
                    debug("onend"), dest.end();
                }
                function cleanup() {
                    debug("cleanup"), // cleanup event handlers once the pipe is broken
                    dest.removeListener("close", onclose), dest.removeListener("finish", onfinish), 
                    dest.removeListener("drain", ondrain), dest.removeListener("error", onerror), dest.removeListener("unpipe", onunpipe), 
                    src.removeListener("end", onend), src.removeListener("end", cleanup), src.removeListener("data", ondata), 
                    cleanedUp = !0, // if the reader is waiting for a drain event from this
                    // specific writer, then it would cause it to never start
                    // flowing again.
                    // So, if this is awaiting a drain, then we just call it now.
                    // If we don't know, then assume that we are waiting for one.
                    !state.awaitDrain || dest._writableState && !dest._writableState.needDrain || ondrain();
                }
                function ondata(chunk) {
                    debug("ondata"), increasedAwaitDrain = !1;
                    var ret = dest.write(chunk);
                    !1 !== ret || increasedAwaitDrain || (// If the user unpiped during `dest.write()`, it is possible
                    // to get stuck in a permanently paused state if that write
                    // also returned false.
                    // => Check whether `dest` is still a piping destination.
                    (1 === state.pipesCount && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp && (debug("false write response, pause", src._readableState.awaitDrain), 
                    src._readableState.awaitDrain++, increasedAwaitDrain = !0), src.pause());
                }
                // if the dest has an error, then stop piping into it.
                // however, don't suppress the throwing behavior for this.
                function onerror(er) {
                    debug("onerror", er), unpipe(), dest.removeListener("error", onerror), 0 === EElistenerCount(dest, "error") && dest.emit("error", er);
                }
                // Both close and finish should trigger unpipe, but only once.
                function onclose() {
                    dest.removeListener("finish", onfinish), unpipe();
                }
                function onfinish() {
                    debug("onfinish"), dest.removeListener("close", onclose), unpipe();
                }
                function unpipe() {
                    debug("unpipe"), src.unpipe(dest);
                }
                var src = this, state = this._readableState;
                switch (state.pipesCount) {
                  case 0:
                    state.pipes = dest;
                    break;

                  case 1:
                    state.pipes = [ state.pipes, dest ];
                    break;

                  default:
                    state.pipes.push(dest);
                }
                state.pipesCount += 1, debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
                var doEnd = (!pipeOpts || pipeOpts.end !== !1) && dest !== process.stdout && dest !== process.stderr, endFn = doEnd ? onend : cleanup;
                state.endEmitted ? processNextTick(endFn) : src.once("end", endFn), dest.on("unpipe", onunpipe);
                // when the dest drains, it reduces the awaitDrain counter
                // on the source.  This would be more elegant with a .once()
                // handler in flow(), but adding and removing repeatedly is
                // too slow.
                var ondrain = pipeOnDrain(src);
                dest.on("drain", ondrain);
                var cleanedUp = !1, increasedAwaitDrain = !1;
                // Make sure our error handler is attached before userland ones.
                // tell the dest that it's being piped to
                // start the flow if it hasn't been started already.
                return src.on("data", ondata), prependListener(dest, "error", onerror), dest.once("close", onclose), 
                dest.once("finish", onfinish), dest.emit("pipe", src), state.flowing || (debug("pipe resume"), 
                src.resume()), dest;
            }, Readable.prototype.unpipe = function(dest) {
                var state = this._readableState;
                // if we're not piping anywhere, then do nothing.
                if (0 === state.pipesCount) return this;
                // just one destination.  most common case.
                if (1 === state.pipesCount) // passed in one, but it's not the right one.
                // passed in one, but it's not the right one.
                // got a match.
                return dest && dest !== state.pipes ? this : (dest || (dest = state.pipes), state.pipes = null, 
                state.pipesCount = 0, state.flowing = !1, dest && dest.emit("unpipe", this), this);
                // slow case. multiple pipe destinations.
                if (!dest) {
                    // remove all.
                    var dests = state.pipes, len = state.pipesCount;
                    state.pipes = null, state.pipesCount = 0, state.flowing = !1;
                    for (var i = 0; i < len; i++) dests[i].emit("unpipe", this);
                    return this;
                }
                // try to find the right one.
                var index = indexOf(state.pipes, dest);
                return index === -1 ? this : (state.pipes.splice(index, 1), state.pipesCount -= 1, 
                1 === state.pipesCount && (state.pipes = state.pipes[0]), dest.emit("unpipe", this), 
                this);
            }, // set up data events if they are asked for
            // Ensure readable listeners eventually get something
            Readable.prototype.on = function(ev, fn) {
                var res = Stream.prototype.on.call(this, ev, fn);
                if ("data" === ev) // Start flowing on next tick if stream isn't explicitly paused
                this._readableState.flowing !== !1 && this.resume(); else if ("readable" === ev) {
                    var state = this._readableState;
                    state.endEmitted || state.readableListening || (state.readableListening = state.needReadable = !0, 
                    state.emittedReadable = !1, state.reading ? state.length && emitReadable(this, state) : processNextTick(nReadingNextTick, this));
                }
                return res;
            }, Readable.prototype.addListener = Readable.prototype.on, // pause() and resume() are remnants of the legacy readable stream API
            // If the user uses them, then switch into old mode.
            Readable.prototype.resume = function() {
                var state = this._readableState;
                return state.flowing || (debug("resume"), state.flowing = !0, resume(this, state)), 
                this;
            }, Readable.prototype.pause = function() {
                return debug("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (debug("pause"), 
                this._readableState.flowing = !1, this.emit("pause")), this;
            }, // wrap an old-style stream as the async data source.
            // This is *not* part of the readable stream interface.
            // It is an ugly unfortunate mess of history.
            Readable.prototype.wrap = function(stream) {
                var state = this._readableState, paused = !1, self = this;
                stream.on("end", function() {
                    if (debug("wrapped end"), state.decoder && !state.ended) {
                        var chunk = state.decoder.end();
                        chunk && chunk.length && self.push(chunk);
                    }
                    self.push(null);
                }), stream.on("data", function(chunk) {
                    // don't skip over falsy values in objectMode
                    if (debug("wrapped data"), state.decoder && (chunk = state.decoder.write(chunk)), 
                    (!state.objectMode || null !== chunk && void 0 !== chunk) && (state.objectMode || chunk && chunk.length)) {
                        var ret = self.push(chunk);
                        ret || (paused = !0, stream.pause());
                    }
                });
                // proxy all the other methods.
                // important when wrapping filters and duplexes.
                for (var i in stream) void 0 === this[i] && "function" == typeof stream[i] && (this[i] = function(method) {
                    return function() {
                        return stream[method].apply(stream, arguments);
                    };
                }(i));
                // proxy certain important events.
                var events = [ "error", "close", "destroy", "pause", "resume" ];
                // when we try to consume some more bytes, simply unpause the
                // underlying stream.
                return forEach(events, function(ev) {
                    stream.on(ev, self.emit.bind(self, ev));
                }), self._read = function(n) {
                    debug("wrapped _read", n), paused && (paused = !1, stream.resume());
                }, self;
            }, // exposed for testing purposes only.
            Readable._fromList = fromList;
        }).call(exports, __webpack_require__(1));
    }, /* 26 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */
        (function(global) {
            var ClientRequest = __webpack_require__(62), extend = __webpack_require__(74), statusCodes = __webpack_require__(43), url = __webpack_require__(32), http = exports;
            http.request = function(opts, cb) {
                opts = "string" == typeof opts ? url.parse(opts) : extend(opts);
                // Normally, the page is loaded from http or https, so not specifying a protocol
                // will result in a (valid) protocol-relative url. However, this won't work if
                // the protocol is something else, like 'file:'
                var defaultProtocol = global.location.protocol.search(/^https?:$/) === -1 ? "http:" : "", protocol = opts.protocol || defaultProtocol, host = opts.hostname || opts.host, port = opts.port, path = opts.path || "/";
                // Necessary for IPv6 addresses
                host && host.indexOf(":") !== -1 && (host = "[" + host + "]"), // This may be a relative url. The browser should always be able to interpret it correctly.
                opts.url = (host ? protocol + "//" + host : "") + (port ? ":" + port : "") + path, 
                opts.method = (opts.method || "GET").toUpperCase(), opts.headers = opts.headers || {};
                // Also valid opts.auth, opts.mode
                var req = new ClientRequest(opts);
                return cb && req.on("response", cb), req;
            }, http.get = function(opts, cb) {
                var req = http.request(opts, cb);
                return req.end(), req;
            }, http.Agent = function() {}, http.Agent.defaultMaxSockets = 4, http.STATUS_CODES = statusCodes, 
            http.METHODS = [ "CHECKOUT", "CONNECT", "COPY", "DELETE", "GET", "HEAD", "LOCK", "M-SEARCH", "MERGE", "MKACTIVITY", "MKCOL", "MOVE", "NOTIFY", "OPTIONS", "PATCH", "POST", "PROPFIND", "PROPPATCH", "PURGE", "PUT", "REPORT", "SEARCH", "SUBSCRIBE", "TRACE", "UNLOCK", "UNSUBSCRIBE" ];
        }).call(exports, function() {
            return this;
        }());
    }, /* 27 */
    /***/
    function(module, exports) {
        /* WEBPACK VAR INJECTION */
        (function(global) {
            function checkTypeSupport(type) {
                if (!xhr) return !1;
                try {
                    return xhr.responseType = type, xhr.responseType === type;
                } catch (e) {}
                return !1;
            }
            function isFunction(value) {
                return "function" == typeof value;
            }
            exports.fetch = isFunction(global.fetch) && isFunction(global.ReadableStream), exports.blobConstructor = !1;
            try {
                new Blob([ new ArrayBuffer(1) ]), exports.blobConstructor = !0;
            } catch (e) {}
            // Service workers don't have XHR
            var xhr = null;
            if (global.XMLHttpRequest) {
                xhr = new global.XMLHttpRequest();
                // If XDomainRequest is available (ie only, where xhr might not work
                // cross domain), use the page location. Otherwise use example.com
                // Note: this doesn't actually make an http request.
                try {
                    xhr.open("GET", global.XDomainRequest ? "/" : "https://example.com");
                } catch (e) {
                    xhr = null;
                }
            }
            // For some strange reason, Safari 7.0 reports typeof global.ArrayBuffer === 'object'.
            // Safari 7.1 appears to have fixed this bug.
            var haveArrayBuffer = "undefined" != typeof global.ArrayBuffer, haveSlice = haveArrayBuffer && isFunction(global.ArrayBuffer.prototype.slice);
            exports.arraybuffer = haveArrayBuffer && checkTypeSupport("arraybuffer"), // These next two tests unavoidably show warnings in Chrome. Since fetch will always
            // be used if it's available, just return false for these to avoid the warnings.
            exports.msstream = !exports.fetch && haveSlice && checkTypeSupport("ms-stream"), 
            exports.mozchunkedarraybuffer = !exports.fetch && haveArrayBuffer && checkTypeSupport("moz-chunked-arraybuffer"), 
            exports.overrideMimeType = !!xhr && isFunction(xhr.overrideMimeType), exports.vbArray = isFunction(global.VBArray), 
            xhr = null;
        }).call(exports, function() {
            return this;
        }());
    }, /* 28 */
    /***/
    function(module, exports, __webpack_require__) {
        function assertEncoding(encoding) {
            if (encoding && !isBufferEncoding(encoding)) throw new Error("Unknown encoding: " + encoding);
        }
        function passThroughWrite(buffer) {
            return buffer.toString(this.encoding);
        }
        function utf16DetectIncompleteChar(buffer) {
            this.charReceived = buffer.length % 2, this.charLength = this.charReceived ? 2 : 0;
        }
        function base64DetectIncompleteChar(buffer) {
            this.charReceived = buffer.length % 3, this.charLength = this.charReceived ? 3 : 0;
        }
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.
        var Buffer = __webpack_require__(2).Buffer, isBufferEncoding = Buffer.isEncoding || function(encoding) {
            switch (encoding && encoding.toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
              case "raw":
                return !0;

              default:
                return !1;
            }
        }, StringDecoder = exports.StringDecoder = function(encoding) {
            switch (this.encoding = (encoding || "utf8").toLowerCase().replace(/[-_]/, ""), 
            assertEncoding(encoding), this.encoding) {
              case "utf8":
                // CESU-8 represents each of Surrogate Pair by 3-bytes
                this.surrogateSize = 3;
                break;

              case "ucs2":
              case "utf16le":
                // UTF-16 represents each of Surrogate Pair by 2-bytes
                this.surrogateSize = 2, this.detectIncompleteChar = utf16DetectIncompleteChar;
                break;

              case "base64":
                // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
                this.surrogateSize = 3, this.detectIncompleteChar = base64DetectIncompleteChar;
                break;

              default:
                return void (this.write = passThroughWrite);
            }
            // Enough space to store all bytes of a single character. UTF-8 needs 4
            // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
            this.charBuffer = new Buffer(6), // Number of bytes received for the current incomplete multi-byte character.
            this.charReceived = 0, // Number of bytes expected for the current incomplete multi-byte character.
            this.charLength = 0;
        };
        // write decodes the given buffer and returns it as JS string that is
        // guaranteed to not contain any partial multi-byte characters. Any partial
        // character found at the end of the buffer is buffered up, and will be
        // returned when calling write again with the remaining bytes.
        //
        // Note: Converting a Buffer containing an orphan surrogate to a String
        // currently works, but converting a String to a Buffer (via `new Buffer`, or
        // Buffer#write) will replace incomplete surrogates with the unicode
        // replacement character. See https://codereview.chromium.org/121173009/ .
        StringDecoder.prototype.write = function(buffer) {
            // if our last write ended with an incomplete multibyte character
            for (var charStr = ""; this.charLength; ) {
                // determine how many remaining bytes this buffer has to offer for this char
                var available = buffer.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : buffer.length;
                if (// add the new bytes to the char buffer
                buffer.copy(this.charBuffer, this.charReceived, 0, available), this.charReceived += available, 
                this.charReceived < this.charLength) // still not enough chars in this buffer? wait for more ...
                return "";
                // remove bytes belonging to the current character from the buffer
                buffer = buffer.slice(available, buffer.length), // get the character that was split
                charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
                // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
                var charCode = charStr.charCodeAt(charStr.length - 1);
                if (!(charCode >= 55296 && charCode <= 56319)) {
                    // if there are no more bytes in this buffer, just emit our char
                    if (this.charReceived = this.charLength = 0, 0 === buffer.length) return charStr;
                    break;
                }
                this.charLength += this.surrogateSize, charStr = "";
            }
            // determine and set charLength / charReceived
            this.detectIncompleteChar(buffer);
            var end = buffer.length;
            this.charLength && (// buffer the incomplete character bytes we got
            buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end), end -= this.charReceived), 
            charStr += buffer.toString(this.encoding, 0, end);
            var end = charStr.length - 1, charCode = charStr.charCodeAt(end);
            // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
            if (charCode >= 55296 && charCode <= 56319) {
                var size = this.surrogateSize;
                return this.charLength += size, this.charReceived += size, this.charBuffer.copy(this.charBuffer, size, 0, size), 
                buffer.copy(this.charBuffer, 0, 0, size), charStr.substring(0, end);
            }
            // or just emit the charStr
            return charStr;
        }, // detectIncompleteChar determines if there is an incomplete UTF-8 character at
        // the end of the given buffer. If so, it sets this.charLength to the byte
        // length that character, and sets this.charReceived to the number of bytes
        // that are available for this character.
        StringDecoder.prototype.detectIncompleteChar = function(buffer) {
            // Figure out if one of the last i bytes of our buffer announces an
            // incomplete char.
            for (// determine how many bytes we have to check at the end of this buffer
            var i = buffer.length >= 3 ? 3 : buffer.length; i > 0; i--) {
                var c = buffer[buffer.length - i];
                // See http://en.wikipedia.org/wiki/UTF-8#Description
                // 110XXXXX
                if (1 == i && c >> 5 == 6) {
                    this.charLength = 2;
                    break;
                }
                // 1110XXXX
                if (i <= 2 && c >> 4 == 14) {
                    this.charLength = 3;
                    break;
                }
                // 11110XXX
                if (i <= 3 && c >> 3 == 30) {
                    this.charLength = 4;
                    break;
                }
            }
            this.charReceived = i;
        }, StringDecoder.prototype.end = function(buffer) {
            var res = "";
            if (buffer && buffer.length && (res = this.write(buffer)), this.charReceived) {
                var cr = this.charReceived, buf = this.charBuffer, enc = this.encoding;
                res += buf.slice(0, cr).toString(enc);
            }
            return res;
        };
    }, /* 29 */
    /***/
    function(module, exports, __webpack_require__) {
        function Timeout(id, clearFn) {
            this._id = id, this._clearFn = clearFn;
        }
        var apply = Function.prototype.apply;
        // DOM APIs, for completeness
        exports.setTimeout = function() {
            return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
        }, exports.setInterval = function() {
            return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
        }, exports.clearTimeout = exports.clearInterval = function(timeout) {
            timeout && timeout.close();
        }, Timeout.prototype.unref = Timeout.prototype.ref = function() {}, Timeout.prototype.close = function() {
            this._clearFn.call(window, this._id);
        }, // Does not start the time, just sets up the members needed.
        exports.enroll = function(item, msecs) {
            clearTimeout(item._idleTimeoutId), item._idleTimeout = msecs;
        }, exports.unenroll = function(item) {
            clearTimeout(item._idleTimeoutId), item._idleTimeout = -1;
        }, exports._unrefActive = exports.active = function(item) {
            clearTimeout(item._idleTimeoutId);
            var msecs = item._idleTimeout;
            msecs >= 0 && (item._idleTimeoutId = setTimeout(function() {
                item._onTimeout && item._onTimeout();
            }, msecs));
        }, // setimmediate attaches itself to the global object
        __webpack_require__(61), exports.setImmediate = setImmediate, exports.clearImmediate = clearImmediate;
    }, /* 30 */
    /***/
    function(module, exports, __webpack_require__) {
        var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;
        !function(name, context, definition) {
            "undefined" != typeof module && module.exports ? module.exports = definition() : (__WEBPACK_AMD_DEFINE_FACTORY__ = definition, 
            __WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof __WEBPACK_AMD_DEFINE_FACTORY__ ? __WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module) : __WEBPACK_AMD_DEFINE_FACTORY__, 
            !(void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)));
        }("urljoin", this, function() {
            function normalize(str, options) {
                // make sure protocol is followed by two slashes
                // remove consecutive slashes
                // remove trailing slash before parameters or hash
                // replace ? in parameters with &
                return str = str.replace(/:\//g, "://"), str = str.replace(/([^:\s])\/+/g, "$1/"), 
                str = str.replace(/\/(\?|&|#[^!])/g, "$1"), str = str.replace(/(\?.+)\?/g, "$1&");
            }
            return function() {
                var input = arguments, options = {};
                "object" == typeof arguments[0] && (// new syntax with array and options
                input = arguments[0], options = arguments[1] || {});
                var joined = [].slice.call(input, 0).join("/");
                return normalize(joined, options);
            };
        });
    }, /* 31 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        /**
	 * The actual URL instance. Instead of returning an object we've opted-in to
	 * create an actual constructor as it's much more memory efficient and
	 * faster and it pleases my CDO.
	 *
	 * @constructor
	 * @param {String} address URL we want to parse.
	 * @param {Boolean|function} parser Parser for the query string.
	 * @param {Object} location Location defaults for relative paths.
	 * @api public
	 */
        function URL(address, location, parser) {
            if (!(this instanceof URL)) return new URL(address, location, parser);
            var parse, instruction, index, key, relative = relativere.test(address), type = typeof location, url = this, i = 0;
            for (//
            // The following if statements allows this module two have compatibility with
            // 2 different API:
            //
            // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
            //    where the boolean indicates that the query string should also be parsed.
            //
            // 2. The `URL` interface of the browser which accepts a URL, object as
            //    arguments. The supplied object will be used as default values / fall-back
            //    for relative paths.
            //
            "object" !== type && "string" !== type && (parser = location, location = null), 
            parser && "function" != typeof parser && (parser = qs.parse), location = lolcation(location); i < instructions.length; i++) instruction = instructions[i], 
            parse = instruction[0], key = instruction[1], parse !== parse ? url[key] = address : "string" == typeof parse ? ~(index = address.indexOf(parse)) && ("number" == typeof instruction[2] ? (url[key] = address.slice(0, index), 
            address = address.slice(index + instruction[2])) : (url[key] = address.slice(index), 
            address = address.slice(0, index))) : (index = parse.exec(address)) && (url[key] = index[1], 
            address = address.slice(0, address.length - index[0].length)), url[key] = url[key] || (instruction[3] || "port" === key && relative ? location[key] || "" : ""), 
            //
            // Hostname, host and protocol should be lowercased so they can be used to
            // create a proper `origin`.
            //
            instruction[4] && (url[key] = url[key].toLowerCase());
            //
            // Also parse the supplied query string in to an object. If we're supplied
            // with a custom parser as function use that instead of the default build-in
            // parser.
            //
            parser && (url.query = parser(url.query)), //
            // We should not add port numbers if they are already the default port number
            // for a given protocol. As the host also contains the port number we're going
            // override it with the hostname which contains no port number.
            //
            required(url.port, url.protocol) || (url.host = url.hostname, url.port = ""), //
            // Parse down the `auth` for the username and password.
            //
            url.username = url.password = "", url.auth && (instruction = url.auth.split(":"), 
            url.username = instruction[0] || "", url.password = instruction[1] || ""), //
            // The href is just the compiled result.
            //
            url.href = url.toString();
        }
        var required = __webpack_require__(60), lolcation = __webpack_require__(66), qs = __webpack_require__(54), relativere = /^\/(?!\/)/, instructions = [ [ "#", "hash" ], // Extract from the back.
        [ "?", "query" ], // Extract from the back.
        [ "//", "protocol", 2, 1, 1 ], // Extract from the front.
        [ "/", "pathname" ], // Extract from the back.
        [ "@", "auth", 1 ], // Extract from the front.
        [ NaN, "host", void 0, 1, 1 ], // Set left over value.
        [ /\:(\d+)$/, "port" ], // RegExp the back.
        [ NaN, "hostname", void 0, 1, 1 ] ];
        /**
	 * This is convenience method for changing properties in the URL instance to
	 * insure that they all propagate correctly.
	 *
	 * @param {String} prop Property we need to adjust.
	 * @param {Mixed} value The newly assigned value.
	 * @returns {URL}
	 * @api public
	 */
        URL.prototype.set = function(part, value, fn) {
            var url = this;
            return "query" === part ? ("string" == typeof value && value.length && (value = (fn || qs.parse)(value)), 
            url[part] = value) : "port" === part ? (url[part] = value, required(value, url.protocol) ? value && (url.host = url.hostname + ":" + value) : (url.host = url.hostname, 
            url[part] = "")) : "hostname" === part ? (url[part] = value, url.port && (value += ":" + url.port), 
            url.host = value) : "host" === part ? (url[part] = value, /\:\d+/.test(value) && (value = value.split(":"), 
            url.hostname = value[0], url.port = value[1])) : url[part] = value, url.href = url.toString(), 
            url;
        }, /**
	 * Transform the properties back in to a valid and full URL string.
	 *
	 * @param {Function} stringify Optional query stringify function.
	 * @returns {String}
	 * @api public
	 */
        URL.prototype.toString = function(stringify) {
            stringify && "function" == typeof stringify || (stringify = qs.stringify);
            var query, url = this, result = url.protocol + "//";
            return url.username && (result += url.username, url.password && (result += ":" + url.password), 
            result += "@"), result += url.hostname, url.port && (result += ":" + url.port), 
            result += url.pathname, query = "object" == typeof url.query ? stringify(url.query) : url.query, 
            query && (result += "?" !== query.charAt(0) ? "?" + query : query), url.hash && (result += url.hash), 
            result;
        }, //
        // Expose the URL parser and some additional properties that might be useful for
        // others.
        //
        URL.qs = qs, URL.location = lolcation, module.exports = URL;
    }, /* 32 */
    /***/
    function(module, exports, __webpack_require__) {
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.
        "use strict";
        function Url() {
            this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, 
            this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, 
            this.path = null, this.href = null;
        }
        function urlParse(url, parseQueryString, slashesDenoteHost) {
            if (url && util.isObject(url) && url instanceof Url) return url;
            var u = new Url();
            return u.parse(url, parseQueryString, slashesDenoteHost), u;
        }
        // format a parsed object into a url string
        function urlFormat(obj) {
            // ensure it's an object, and not a string url.
            // If it's an obj, this is a no-op.
            // this way, you can call url_format() on strings
            // to clean up potentially wonky urls.
            return util.isString(obj) && (obj = urlParse(obj)), obj instanceof Url ? obj.format() : Url.prototype.format.call(obj);
        }
        function urlResolve(source, relative) {
            return urlParse(source, !1, !0).resolve(relative);
        }
        function urlResolveObject(source, relative) {
            return source ? urlParse(source, !1, !0).resolveObject(relative) : relative;
        }
        var punycode = __webpack_require__(67), util = __webpack_require__(68);
        exports.parse = urlParse, exports.resolve = urlResolve, exports.resolveObject = urlResolveObject, 
        exports.format = urlFormat, exports.Url = Url;
        // Reference: RFC 3986, RFC 1808, RFC 2396
        // define these here so at least they only have to be
        // compiled once on the first module load.
        var protocolPattern = /^([a-z0-9.+-]+:)/i, portPattern = /:[0-9]*$/, // Special case for a simple path URL
        simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, // RFC 2396: characters reserved for delimiting URLs.
        // We actually just auto-escape these.
        delims = [ "<", ">", '"', "`", " ", "\r", "\n", "\t" ], // RFC 2396: characters not allowed for various reasons.
        unwise = [ "{", "}", "|", "\\", "^", "`" ].concat(delims), // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
        autoEscape = [ "'" ].concat(unwise), // Characters that are never ever allowed in a hostname.
        // Note that any invalid chars are also handled, but these
        // are the ones that are *expected* to be seen, so we fast-path
        // them.
        nonHostChars = [ "%", "/", "?", ";", "#" ].concat(autoEscape), hostEndingChars = [ "/", "?", "#" ], hostnameMaxLen = 255, hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/, hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, // protocols that can allow "unsafe" and "unwise" chars.
        unsafeProtocol = {
            javascript: !0,
            "javascript:": !0
        }, // protocols that never have a hostname.
        hostlessProtocol = {
            javascript: !0,
            "javascript:": !0
        }, // protocols that always contain a // bit.
        slashedProtocol = {
            http: !0,
            https: !0,
            ftp: !0,
            gopher: !0,
            file: !0,
            "http:": !0,
            "https:": !0,
            "ftp:": !0,
            "gopher:": !0,
            "file:": !0
        }, querystring = __webpack_require__(53);
        Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
            if (!util.isString(url)) throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
            // Copy chrome, IE, opera backslash-handling behavior.
            // Back slashes before the query string get converted to forward slashes
            // See: https://code.google.com/p/chromium/issues/detail?id=25916
            var queryIndex = url.indexOf("?"), splitter = queryIndex !== -1 && queryIndex < url.indexOf("#") ? "?" : "#", uSplit = url.split(splitter), slashRegex = /\\/g;
            uSplit[0] = uSplit[0].replace(slashRegex, "/"), url = uSplit.join(splitter);
            var rest = url;
            if (// trim before proceeding.
            // This is to support parse stuff like "  http://foo.com  \n"
            rest = rest.trim(), !slashesDenoteHost && 1 === url.split("#").length) {
                // Try fast path regexp
                var simplePath = simplePathPattern.exec(rest);
                if (simplePath) return this.path = rest, this.href = rest, this.pathname = simplePath[1], 
                simplePath[2] ? (this.search = simplePath[2], parseQueryString ? this.query = querystring.parse(this.search.substr(1)) : this.query = this.search.substr(1)) : parseQueryString && (this.search = "", 
                this.query = {}), this;
            }
            var proto = protocolPattern.exec(rest);
            if (proto) {
                proto = proto[0];
                var lowerProto = proto.toLowerCase();
                this.protocol = lowerProto, rest = rest.substr(proto.length);
            }
            // figure out if it's got a host
            // user@server is *always* interpreted as a hostname, and url
            // resolution will treat //foo/bar as host=foo,path=bar because that's
            // how the browser resolves relative URLs.
            if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                var slashes = "//" === rest.substr(0, 2);
                !slashes || proto && hostlessProtocol[proto] || (rest = rest.substr(2), this.slashes = !0);
            }
            if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
                for (var hostEnd = -1, i = 0; i < hostEndingChars.length; i++) {
                    var hec = rest.indexOf(hostEndingChars[i]);
                    hec !== -1 && (hostEnd === -1 || hec < hostEnd) && (hostEnd = hec);
                }
                // at this point, either we have an explicit point where the
                // auth portion cannot go past, or the last @ char is the decider.
                var auth, atSign;
                // atSign can be anywhere.
                atSign = hostEnd === -1 ? rest.lastIndexOf("@") : rest.lastIndexOf("@", hostEnd), 
                // Now we have a portion which is definitely the auth.
                // Pull that off.
                atSign !== -1 && (auth = rest.slice(0, atSign), rest = rest.slice(atSign + 1), this.auth = decodeURIComponent(auth)), 
                // the host is the remaining to the left of the first non-host char
                hostEnd = -1;
                for (var i = 0; i < nonHostChars.length; i++) {
                    var hec = rest.indexOf(nonHostChars[i]);
                    hec !== -1 && (hostEnd === -1 || hec < hostEnd) && (hostEnd = hec);
                }
                // if we still have not hit it, then the entire thing is a host.
                hostEnd === -1 && (hostEnd = rest.length), this.host = rest.slice(0, hostEnd), rest = rest.slice(hostEnd), 
                // pull out port.
                this.parseHost(), // we've indicated that there is a hostname,
                // so even if it's empty, it has to be present.
                this.hostname = this.hostname || "";
                // if hostname begins with [ and ends with ]
                // assume that it's an IPv6 address.
                var ipv6Hostname = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
                // validate a little.
                if (!ipv6Hostname) for (var hostparts = this.hostname.split(/\./), i = 0, l = hostparts.length; i < l; i++) {
                    var part = hostparts[i];
                    if (part && !part.match(hostnamePartPattern)) {
                        for (var newpart = "", j = 0, k = part.length; j < k; j++) // we replace non-ASCII char with a temporary placeholder
                        // we need this to make sure size of hostname is not
                        // broken by replacing non-ASCII by nothing
                        newpart += part.charCodeAt(j) > 127 ? "x" : part[j];
                        // we test again with ASCII char only
                        if (!newpart.match(hostnamePartPattern)) {
                            var validParts = hostparts.slice(0, i), notHost = hostparts.slice(i + 1), bit = part.match(hostnamePartStart);
                            bit && (validParts.push(bit[1]), notHost.unshift(bit[2])), notHost.length && (rest = "/" + notHost.join(".") + rest), 
                            this.hostname = validParts.join(".");
                            break;
                        }
                    }
                }
                this.hostname.length > hostnameMaxLen ? this.hostname = "" : // hostnames are always lower case.
                this.hostname = this.hostname.toLowerCase(), ipv6Hostname || (// IDNA Support: Returns a punycoded representation of "domain".
                // It only converts parts of the domain name that
                // have non-ASCII characters, i.e. it doesn't matter if
                // you call it with a domain that already is ASCII-only.
                this.hostname = punycode.toASCII(this.hostname));
                var p = this.port ? ":" + this.port : "", h = this.hostname || "";
                this.host = h + p, this.href += this.host, // strip [ and ] from the hostname
                // the host field still retains them, though
                ipv6Hostname && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), 
                "/" !== rest[0] && (rest = "/" + rest));
            }
            // now rest is set to the post-host stuff.
            // chop off any delim chars.
            if (!unsafeProtocol[lowerProto]) // First, make 100% sure that any "autoEscape" chars get
            // escaped, even if encodeURIComponent doesn't think they
            // need to be.
            for (var i = 0, l = autoEscape.length; i < l; i++) {
                var ae = autoEscape[i];
                if (rest.indexOf(ae) !== -1) {
                    var esc = encodeURIComponent(ae);
                    esc === ae && (esc = escape(ae)), rest = rest.split(ae).join(esc);
                }
            }
            // chop off from the tail first.
            var hash = rest.indexOf("#");
            hash !== -1 && (// got a fragment string.
            this.hash = rest.substr(hash), rest = rest.slice(0, hash));
            var qm = rest.indexOf("?");
            //to support http.request
            if (qm !== -1 ? (this.search = rest.substr(qm), this.query = rest.substr(qm + 1), 
            parseQueryString && (this.query = querystring.parse(this.query)), rest = rest.slice(0, qm)) : parseQueryString && (// no query string, but parseQueryString still requested
            this.search = "", this.query = {}), rest && (this.pathname = rest), slashedProtocol[lowerProto] && this.hostname && !this.pathname && (this.pathname = "/"), 
            this.pathname || this.search) {
                var p = this.pathname || "", s = this.search || "";
                this.path = p + s;
            }
            // finally, reconstruct the href based on what has been validated.
            return this.href = this.format(), this;
        }, Url.prototype.format = function() {
            var auth = this.auth || "";
            auth && (auth = encodeURIComponent(auth), auth = auth.replace(/%3A/i, ":"), auth += "@");
            var protocol = this.protocol || "", pathname = this.pathname || "", hash = this.hash || "", host = !1, query = "";
            this.host ? host = auth + this.host : this.hostname && (host = auth + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"), 
            this.port && (host += ":" + this.port)), this.query && util.isObject(this.query) && Object.keys(this.query).length && (query = querystring.stringify(this.query));
            var search = this.search || query && "?" + query || "";
            // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
            // unless they had them to begin with.
            return protocol && ":" !== protocol.substr(-1) && (protocol += ":"), this.slashes || (!protocol || slashedProtocol[protocol]) && host !== !1 ? (host = "//" + (host || ""), 
            pathname && "/" !== pathname.charAt(0) && (pathname = "/" + pathname)) : host || (host = ""), 
            hash && "#" !== hash.charAt(0) && (hash = "#" + hash), search && "?" !== search.charAt(0) && (search = "?" + search), 
            pathname = pathname.replace(/[?#]/g, function(match) {
                return encodeURIComponent(match);
            }), search = search.replace("#", "%23"), protocol + host + pathname + search + hash;
        }, Url.prototype.resolve = function(relative) {
            return this.resolveObject(urlParse(relative, !1, !0)).format();
        }, Url.prototype.resolveObject = function(relative) {
            if (util.isString(relative)) {
                var rel = new Url();
                rel.parse(relative, !1, !0), relative = rel;
            }
            for (var result = new Url(), tkeys = Object.keys(this), tk = 0; tk < tkeys.length; tk++) {
                var tkey = tkeys[tk];
                result[tkey] = this[tkey];
            }
            // if the relative url is empty, then there's nothing left to do here.
            if (// hash is always overridden, no matter what.
            // even href="" will remove it.
            result.hash = relative.hash, "" === relative.href) return result.href = result.format(), 
            result;
            // hrefs like //foo/bar always cut to the protocol.
            if (relative.slashes && !relative.protocol) {
                for (var rkeys = Object.keys(relative), rk = 0; rk < rkeys.length; rk++) {
                    var rkey = rkeys[rk];
                    "protocol" !== rkey && (result[rkey] = relative[rkey]);
                }
                //urlParse appends trailing / to urls like http://www.example.com
                return slashedProtocol[result.protocol] && result.hostname && !result.pathname && (result.path = result.pathname = "/"), 
                result.href = result.format(), result;
            }
            if (relative.protocol && relative.protocol !== result.protocol) {
                // if it's a known url protocol, then changing
                // the protocol does weird things
                // first, if it's not file:, then we MUST have a host,
                // and if there was a path
                // to begin with, then we MUST have a path.
                // if it is file:, then the host is dropped,
                // because that's known to be hostless.
                // anything else is assumed to be absolute.
                if (!slashedProtocol[relative.protocol]) {
                    for (var keys = Object.keys(relative), v = 0; v < keys.length; v++) {
                        var k = keys[v];
                        result[k] = relative[k];
                    }
                    return result.href = result.format(), result;
                }
                if (result.protocol = relative.protocol, relative.host || hostlessProtocol[relative.protocol]) result.pathname = relative.pathname; else {
                    for (var relPath = (relative.pathname || "").split("/"); relPath.length && !(relative.host = relPath.shift()); ) ;
                    relative.host || (relative.host = ""), relative.hostname || (relative.hostname = ""), 
                    "" !== relPath[0] && relPath.unshift(""), relPath.length < 2 && relPath.unshift(""), 
                    result.pathname = relPath.join("/");
                }
                // to support http.request
                if (result.search = relative.search, result.query = relative.query, result.host = relative.host || "", 
                result.auth = relative.auth, result.hostname = relative.hostname || relative.host, 
                result.port = relative.port, result.pathname || result.search) {
                    var p = result.pathname || "", s = result.search || "";
                    result.path = p + s;
                }
                return result.slashes = result.slashes || relative.slashes, result.href = result.format(), 
                result;
            }
            var isSourceAbs = result.pathname && "/" === result.pathname.charAt(0), isRelAbs = relative.host || relative.pathname && "/" === relative.pathname.charAt(0), mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname, removeAllDots = mustEndAbs, srcPath = result.pathname && result.pathname.split("/") || [], relPath = relative.pathname && relative.pathname.split("/") || [], psychotic = result.protocol && !slashedProtocol[result.protocol];
            if (// if the url is a non-slashed url, then relative
            // links like ../.. should be able
            // to crawl up to the hostname, as well.  This is strange.
            // result.protocol has already been set by now.
            // Later on, put the first path part into the host field.
            psychotic && (result.hostname = "", result.port = null, result.host && ("" === srcPath[0] ? srcPath[0] = result.host : srcPath.unshift(result.host)), 
            result.host = "", relative.protocol && (relative.hostname = null, relative.port = null, 
            relative.host && ("" === relPath[0] ? relPath[0] = relative.host : relPath.unshift(relative.host)), 
            relative.host = null), mustEndAbs = mustEndAbs && ("" === relPath[0] || "" === srcPath[0])), 
            isRelAbs) // it's absolute.
            result.host = relative.host || "" === relative.host ? relative.host : result.host, 
            result.hostname = relative.hostname || "" === relative.hostname ? relative.hostname : result.hostname, 
            result.search = relative.search, result.query = relative.query, srcPath = relPath; else if (relPath.length) // it's relative
            // throw away the existing file, and take the new path instead.
            srcPath || (srcPath = []), srcPath.pop(), srcPath = srcPath.concat(relPath), result.search = relative.search, 
            result.query = relative.query; else if (!util.isNullOrUndefined(relative.search)) {
                // just pull out the search.
                // like href='?foo'.
                // Put this after the other two cases because it simplifies the booleans
                if (psychotic) {
                    result.hostname = result.host = srcPath.shift();
                    //occationaly the auth can get stuck only in host
                    //this especially happens in cases like
                    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
                    var authInHost = !!(result.host && result.host.indexOf("@") > 0) && result.host.split("@");
                    authInHost && (result.auth = authInHost.shift(), result.host = result.hostname = authInHost.shift());
                }
                //to support http.request
                return result.search = relative.search, result.query = relative.query, util.isNull(result.pathname) && util.isNull(result.search) || (result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "")), 
                result.href = result.format(), result;
            }
            if (!srcPath.length) // no path at all.  easy.
            // we've already handled the other stuff above.
            //to support http.request
            return result.pathname = null, result.search ? result.path = "/" + result.search : result.path = null, 
            result.href = result.format(), result;
            for (var last = srcPath.slice(-1)[0], hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && ("." === last || ".." === last) || "" === last, up = 0, i = srcPath.length; i >= 0; i--) last = srcPath[i], 
            "." === last ? srcPath.splice(i, 1) : ".." === last ? (srcPath.splice(i, 1), up++) : up && (srcPath.splice(i, 1), 
            up--);
            // if the path is allowed to go above the root, restore leading ..s
            if (!mustEndAbs && !removeAllDots) for (;up--; up) srcPath.unshift("..");
            !mustEndAbs || "" === srcPath[0] || srcPath[0] && "/" === srcPath[0].charAt(0) || srcPath.unshift(""), 
            hasTrailingSlash && "/" !== srcPath.join("/").substr(-1) && srcPath.push("");
            var isAbsolute = "" === srcPath[0] || srcPath[0] && "/" === srcPath[0].charAt(0);
            // put the host back
            if (psychotic) {
                result.hostname = result.host = isAbsolute ? "" : srcPath.length ? srcPath.shift() : "";
                //occationaly the auth can get stuck only in host
                //this especially happens in cases like
                //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
                var authInHost = !!(result.host && result.host.indexOf("@") > 0) && result.host.split("@");
                authInHost && (result.auth = authInHost.shift(), result.host = result.hostname = authInHost.shift());
            }
            //to support request.http
            return mustEndAbs = mustEndAbs || result.host && srcPath.length, mustEndAbs && !isAbsolute && srcPath.unshift(""), 
            srcPath.length ? result.pathname = srcPath.join("/") : (result.pathname = null, 
            result.path = null), util.isNull(result.pathname) && util.isNull(result.search) || (result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "")), 
            result.auth = relative.auth || result.auth, result.slashes = result.slashes || relative.slashes, 
            result.href = result.format(), result;
        }, Url.prototype.parseHost = function() {
            var host = this.host, port = portPattern.exec(host);
            port && (port = port[0], ":" !== port && (this.port = port.substr(1)), host = host.substr(0, host.length - port.length)), 
            host && (this.hostname = host);
        };
    }, /* 33 */
    /***/
    function(module, exports) {
        module.exports = function(module) {
            // module.parent = undefined by default
            return module.webpackPolyfill || (module.deprecate = function() {}, module.paths = [], 
            module.children = [], module.webpackPolyfill = 1), module;
        };
    }, /* 34 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */
        (function(Buffer) {
            "use strict";
            function makeAuthorizationHeader(options) {
                return options.token ? "Bearer  " + options.token : basicAuth(options);
            }
            function basicAuth(_ref) {
                var username = _ref.username, password = _ref.password;
                if (!username || !password) return "";
                var t = btoa(username + ":" + password);
                return "Basic " + t;
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.makeAuthorizationHeader = makeAuthorizationHeader, exports.basicAuth = basicAuth;
            var btoa = window.btoa || function(s) {
                return new Buffer(s).toString("base64");
            };
        }).call(exports, __webpack_require__(2).Buffer);
    }, /* 35 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" != typeof call && "function" != typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _resource = __webpack_require__(5), _resource2 = _interopRequireDefault(_resource), Channel = function(_Resource) {
            function Channel(client, id) {
                return _classCallCheck(this, Channel), _possibleConstructorReturn(this, (Channel.__proto__ || Object.getPrototypeOf(Channel)).call(this, client, "channel", id));
            }
            return _inherits(Channel, _Resource), _createClass(Channel, [ {
                key: "threads",
                value: function() {
                    return this.fetchJSON(this.path + "/threads").then(function(a) {
                        return a || [];
                    });
                }
            } ]), Channel;
        }(_resource2.default);
        exports.default = Channel;
    }, /* 36 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" != typeof call && "function" != typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _lodash = __webpack_require__(10), _lodash2 = _interopRequireDefault(_lodash), _isomorphicFetch = __webpack_require__(48), _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch), _eventemitter = __webpack_require__(21), _eventemitter2 = _interopRequireDefault(_eventemitter), _queryString = __webpack_require__(23), _queryString2 = _interopRequireDefault(_queryString), _urlJoin = __webpack_require__(30), _urlJoin2 = _interopRequireDefault(_urlJoin), _mimeType = __webpack_require__(8), _mimeType2 = _interopRequireDefault(_mimeType), _auth = __webpack_require__(34), _store = __webpack_require__(9);
        /* eslint-disable */
        __webpack_require__(44).polyfill();
        /* eslint-enable */
        var ClientBase = function(_EventEmitter) {
            function ClientBase(options) {
                _classCallCheck(this, ClientBase);
                var _this = _possibleConstructorReturn(this, (ClientBase.__proto__ || Object.getPrototypeOf(ClientBase)).call(this));
                return _this.options = options, _this.endpoint = options.endpoint, _this;
            }
            return _inherits(ClientBase, _EventEmitter), _createClass(ClientBase, [ {
                key: "absurl",
                value: function(url) {
                    return this.endpoint ? (0, _urlJoin2.default)(this.endpoint, url) : url;
                }
            }, {
                key: "emitError",
                value: function(err) {
                    return _lodash2.default.isFunction(this.onError) ? void this.onError(err) : void this.emit("error", err);
                }
            }, {
                key: "makeAuth",
                value: function() {
                    if (this.options.token || this.options.username) return (0, _auth.makeAuthorizationHeader)(this.options);
                    // get token from local storage
                    var options = {
                        token: (0, _store.getToken)()
                    };
                    return (0, _auth.makeAuthorizationHeader)(options);
                }
            }, {
                key: "fetch",
                value: function(path) {
                    var _this2 = this, options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    _lodash2.default.isObject(options.body) && (options.body = JSON.stringify(options.body));
                    var method = (options.method || "get").toLowerCase(), auth = options.noauth ? "" : this.makeAuth(), headers = _extends({}, options.headers || {});
                    auth && (headers.Authorization = auth), options.body && !headers["Content-Type"] && (headers["Content-Type"] = _mimeType2.default.json);
                    var onSuccess = function(response) {
                        // TODO emit object error
                        return 401 === response.status ? (_this2.emitError({
                            type: "unauthorized"
                        }), Promise.reject("unauthorized")) : 200 === response.status && "delete" === method ? response : response.status >= 400 ? response.text().then(function(s) {
                            try {
                                var err = JSON.parse(s);
                                return _this2.emitError(err), Promise.reject(err);
                            } catch (err) {
                                return _this2.emitError(err), Promise.reject(err);
                            }
                        }) : response;
                    }, qs = "";
                    _lodash2.default.isObject(options.query) && (qs = "?" + _queryString2.default.stringify(options.query));
                    var url = this.absurl(path) + qs, params = _extends({}, options, {
                        headers: headers
                    });
                    return (0, _isomorphicFetch2.default)(url, params).then(onSuccess, function(err) {
                        return _this2.emitError(err);
                    });
                }
            }, {
                key: "fetchJSON",
                value: function(path) {
                    var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, opts = _extends({}, options, {
                        headers: _extends({}, options.headers || {}, {
                            Accept: _mimeType2.default.json
                        })
                    });
                    return this.fetch(path, opts).then(function(r) {
                        return r.json();
                    });
                }
            }, {
                key: "postJSON",
                value: function(path, body) {
                    var extra = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    return this.fetchJSON(path, _extends({
                        method: "post",
                        body: body
                    }, extra));
                }
            }, {
                key: "putJSON",
                value: function(path, body) {
                    var extra = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    return this.fetchJSON(path, _extends({
                        method: "put",
                        body: body
                    }, extra));
                }
            }, {
                key: "delete",
                value: function(url) {
                    return this.fetch(url, {
                        method: "delete"
                    });
                }
            } ]), ClientBase;
        }(_eventemitter2.default);
        exports.default = ClientBase;
    }, /* 37 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" != typeof call && "function" != typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _resource = __webpack_require__(5), _resource2 = _interopRequireDefault(_resource), _mimeType = __webpack_require__(8), _mimeType2 = _interopRequireDefault(_mimeType), Document = function(_Resource) {
            function Document(client, id) {
                return _classCallCheck(this, Document), _possibleConstructorReturn(this, (Document.__proto__ || Object.getPrototypeOf(Document)).call(this, client, "document", id));
            }
            return _inherits(Document, _Resource), _createClass(Document, [ {
                key: "revisions",
                value: function() {
                    return this.fetchJSON(this.path + "/revisions").then(function(a) {
                        return a || [];
                    });
                }
            }, {
                key: "content",
                value: function() {
                    var opts = {
                        headers: {
                            Accept: _mimeType2.default.markdown
                        }
                    };
                    return this.client.fetch(this.path + "/content", opts).then(function(r) {
                        return r.text();
                    });
                }
            }, {
                key: "updateContent",
                value: function(text) {
                    var contentType = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : _mimeType2.default.markdown, opts = {
                        method: "put",
                        headers: {
                            "Content-Type": contentType || _mimeType2.default.markdown
                        },
                        body: text
                    };
                    this.client.fetch(this.path + "/content", opts).then(function(r) {
                        return r.json();
                    });
                }
            } ]), Document;
        }(_resource2.default);
        exports.default = Document;
    }, /* 38 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" != typeof call && "function" != typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _resource = __webpack_require__(5), _resource2 = _interopRequireDefault(_resource), Message = function(_Resource) {
            function Message(client, id) {
                return _classCallCheck(this, Message), _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).call(this, client, "message", id));
            }
            return _inherits(Message, _Resource), Message;
        }(_resource2.default);
        exports.default = Message;
    }, /* 39 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
                return arr2;
            }
            return Array.from(arr);
        }
        function _defineProperty(obj, key, value) {
            return key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value, obj;
        }
        function reduxCollection(_ref) {
            function makeActionType(t) {
                return actionPrefix ? actionPrefix + "/" + t.toUpperCase() : t.toUpperCase();
            }
            function makeErrorHandler() {
                return function(err) {
                    // TODO set error state
                    console.log(err);
                };
            }
            function reducer(state, action) {
                if (action.type === actionTypes.init) {
                    if (!action.payload) return state;
                    var value = _lodash2.default.isArray(action.payload) ? action.payload : [ action.payload ];
                    return _extends({}, state, _defineProperty({}, collectionName, value));
                }
                if (action.type === actionTypes.add) {
                    // update item if it already exists
                    var items = _lodash2.default.isArray(action.payload) ? action.payload : [ action.payload ], _value = [].concat(_toConsumableArray(state[collectionName] || []), _toConsumableArray(items));
                    return _extends({}, state, _defineProperty({}, collectionName, _value));
                }
                if (action.type === actionTypes.remove) {
                    var _ret = function() {
                        var id = action.payload, value = (state[collectionName] || []).filter(function(t) {
                            return t.id !== id;
                        });
                        return {
                            v: _extends({}, state, _defineProperty({}, collectionName, value))
                        };
                    }();
                    if ("object" === ("undefined" == typeof _ret ? "undefined" : _typeof(_ret))) return _ret.v;
                }
                if (action.type === actionTypes.update) {
                    var item = action.payload, _value2 = updateItem(state[collectionName] || [], item);
                    return _extends({}, state, _defineProperty({}, collectionName, _value2));
                }
                if (action.type === actionTypes.select) {
                    var _extends6, key = selectedKey || "current" + _lodash2.default.capitalize(resourceType), _item = action.payload, _items = state[collectionName] || [], i = indexOf(_items, _item.id);
                    return i >= 0 && (_items = [].concat(_toConsumableArray(_items)), _items[i] = _item), 
                    _extends({}, state, (_extends6 = {}, _defineProperty(_extends6, collectionName, _items), 
                    _defineProperty(_extends6, key, _item), _extends6));
                }
                // general purpose action, it should be rarely used
                if (action.type === actionTypes.set) {
                    var _action$payload = action.payload, _key = _action$payload.key, _value3 = _action$payload.value;
                    return _extends({}, state, _defineProperty({}, _key, _value3));
                }
                return state;
            }
            function getState() {
                return getStore().getState();
            }
            function dispatchAction(action) {
                return getStore().dispatch(action);
            }
            function getItems() {
                var state = getState();
                return state[collectionName] || [];
            }
            //
            // Event handlers
            //
            function onCreate(item) {
                var items = getItems();
                dispatchAction(indexOf(items, item.id) ? actionCreators.local.update(item) : actionCreators.local.add(item));
            }
            function onDelete(id) {
                var items = getItems();
                indexOf(items, id) >= 0 && dispatchAction(actionCreators.local.remove(id));
            }
            function onUpdate(item) {
                var items = getItems();
                indexOf(items, item.id) >= 0 && dispatchAction(actionCreators.local.update(item));
            }
            var resourceType = _ref.resourceType, collectionName = _ref.collectionName, getStore = _ref.getStore, extend = _ref.extend, _ref$selectedKey = _ref.selectedKey, selectedKey = void 0 === _ref$selectedKey ? "" : _ref$selectedKey, _ref$actionPrefix = _ref.actionPrefix, actionPrefix = void 0 === _ref$actionPrefix ? "" : _ref$actionPrefix, actionTypes = {
                init: makeActionType("init"),
                add: makeActionType("add"),
                remove: makeActionType("remove"),
                select: makeActionType("select"),
                set: makeActionType("set")
            }, actionCreators = {
                // sync local actions, it should be rarely used
                local: {
                    init: function(items) {
                        return {
                            type: actionTypes.init,
                            payload: items
                        };
                    },
                    add: function(item) {
                        return {
                            type: actionTypes.add,
                            payload: item
                        };
                    },
                    remove: function(t) {
                        var id = _lodash2.default.isObject(t) ? t.id : t;
                        return {
                            type: actionTypes.remove,
                            payload: id
                        };
                    },
                    select: function(item) {
                        return {
                            type: actionTypes.select,
                            payload: item
                        };
                    },
                    // general purpose action, it should be rarely used
                    set: function(key, value) {
                        return {
                            type: actionTypes.set,
                            payload: {
                                key: key,
                                value: value
                            }
                        };
                    }
                },
                // async actions
                fetchAll: function() {
                    return function(dispatch) {
                        // TODO dispatch progress action
                        _global.API[collectionName].fetch().then(function(items) {
                            dispatch(actionCreators.local.init(items || []));
                        }, makeErrorHandler(dispatch));
                    };
                },
                fetchOne: function(id) {
                    return function(dispatch) {
                        // TODO dispatch progress action
                        _global.API[resourceType](id).fetch().then(function(item) {
                            dispatch(actionCreators.local.select(item));
                        }, makeErrorHandler(dispatch));
                    };
                },
                create: function(payload) {
                    return function(dispatch) {
                        // TODO dispatch progress action
                        _global.API[collectionName].create(payload).then(function(item) {
                            dispatch(actionCreators.local.add(item));
                        }, makeErrorHandler(dispatch));
                    };
                },
                remove: function(id) {
                    return function(dispatch) {
                        // TODO dispatch progress action
                        _global.API[resourceType](id).remove().then(function() {
                            dispatch(actionCreators.local.remove(id));
                        }, makeErrorHandler(dispatch));
                    };
                },
                update: function(item) {
                    return function(dispatch) {
                        // TODO dispatch progress action
                        _global.API[resourceType](item.id).update(item).then(function(updated) {
                            dispatch(actionCreators.local.update(updated));
                        }, makeErrorHandler(dispatch));
                    };
                }
            };
            return actionCreators.reducer = reducer, actionCreators.actionTypes = actionTypes, 
            _lodash2.default.isFunction(extend) && (actionCreators = extend(actionCreators)), 
            _global.Events.on(resourceType + ".create", onCreate), _global.Events.on(resourceType + ".delete", onDelete), 
            _global.Events.on(resourceType + ".remove", onDelete), _global.Events.on(resourceType + ".update", onUpdate), 
            actionCreators;
        }
        function indexOf(array, id) {
            return _lodash2.default.findIndex(array || [], function(t) {
                return t.id === id;
            });
        }
        function updateItem(array, item) {
            var i = indexOf(array, item.id);
            if (i >= 0) {
                var result = [].concat(_toConsumableArray(array));
                return result[i] = _extends({}, result[i], item), result;
            }
            return array;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol ? "symbol" : typeof obj;
        }, _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        };
        exports.default = reduxCollection;
        var _lodash = __webpack_require__(10), _lodash2 = _interopRequireDefault(_lodash), _global = __webpack_require__(20);
    }, /* 40 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" != typeof call && "function" != typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _resource = __webpack_require__(5), _resource2 = _interopRequireDefault(_resource), _mimeType = __webpack_require__(8), _mimeType2 = _interopRequireDefault(_mimeType), Thread = function(_Resource) {
            function Thread(client, id) {
                return _classCallCheck(this, Thread), _possibleConstructorReturn(this, (Thread.__proto__ || Object.getPrototypeOf(Thread)).call(this, client, "thread", id));
            }
            return _inherits(Thread, _Resource), _createClass(Thread, [ {
                key: "messages",
                value: function() {
                    return this.fetchJSON(this.path + "/messages").then(function(a) {
                        return a || [];
                    });
                }
            }, {
                key: "sendMessage",
                value: function(msg) {
                    var payload = msg;
                    return "string" == typeof msg && (payload = {
                        body: msg,
                        format: _mimeType2.default.markdown
                    }), this.client.postJSON(this.path, payload);
                }
            }, {
                key: "send",
                value: function(msg) {
                    return this.sendMessage(msg);
                }
            } ]), Thread;
        }(_resource2.default);
        exports.default = Thread;
    }, /* 41 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" != typeof call && "function" != typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.UserCollection = exports.User = void 0;
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _resource = __webpack_require__(5), _resource2 = _interopRequireDefault(_resource), _collection = __webpack_require__(18), _collection2 = _interopRequireDefault(_collection);
        exports.User = function(_Resource) {
            function User(client, id) {
                return _classCallCheck(this, User), _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).call(this, client, "user", id));
            }
            return _inherits(User, _Resource), User;
        }(_resource2.default), exports.UserCollection = function(_Collection) {
            function UserCollection(client) {
                return _classCallCheck(this, UserCollection), _possibleConstructorReturn(this, (UserCollection.__proto__ || Object.getPrototypeOf(UserCollection)).call(this, client, "users"));
            }
            return _inherits(UserCollection, _Collection), _createClass(UserCollection, [ {
                key: "me",
                value: function() {
                    return this.client.fetchJSON("/api/user");
                }
            }, {
                key: "current",
                value: function() {
                    return this.me();
                }
            } ]), UserCollection;
        }(_collection2.default);
    }, /* 42 */
    /***/
    function(module, exports) {
        "use strict";
        function placeHoldersCount(b64) {
            var len = b64.length;
            if (len % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
            // the number of equal signs (place holders)
            // if there are two placeholders, than the two characters before it
            // represent one byte
            // if there is only one, then the three characters before it represent 2 bytes
            // this is just a cheap hack to not do indexOf twice
            return "=" === b64[len - 2] ? 2 : "=" === b64[len - 1] ? 1 : 0;
        }
        function byteLength(b64) {
            // base64 is 4/3 + up to two characters of the original data
            return 3 * b64.length / 4 - placeHoldersCount(b64);
        }
        function toByteArray(b64) {
            var i, j, l, tmp, placeHolders, arr, len = b64.length;
            placeHolders = placeHoldersCount(b64), arr = new Arr(3 * len / 4 - placeHolders), 
            // if there are placeholders, only get up to the last complete 4 chars
            l = placeHolders > 0 ? len - 4 : len;
            var L = 0;
            for (i = 0, j = 0; i < l; i += 4, j += 3) tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)], 
            arr[L++] = tmp >> 16 & 255, arr[L++] = tmp >> 8 & 255, arr[L++] = 255 & tmp;
            return 2 === placeHolders ? (tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4, 
            arr[L++] = 255 & tmp) : 1 === placeHolders && (tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2, 
            arr[L++] = tmp >> 8 & 255, arr[L++] = 255 & tmp), arr;
        }
        function tripletToBase64(num) {
            return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[63 & num];
        }
        function encodeChunk(uint8, start, end) {
            for (var tmp, output = [], i = start; i < end; i += 3) tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2], 
            output.push(tripletToBase64(tmp));
            return output.join("");
        }
        function fromByteArray(uint8) {
            // must be multiple of 3
            // go through the array every three bytes, we'll deal with trailing stuff later
            for (var tmp, len = uint8.length, extraBytes = len % 3, output = "", parts = [], maxChunkLength = 16383, i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
            // pad the end with zeros, but make sure to not forget the extra bytes
            return 1 === extraBytes ? (tmp = uint8[len - 1], output += lookup[tmp >> 2], output += lookup[tmp << 4 & 63], 
            output += "==") : 2 === extraBytes && (tmp = (uint8[len - 2] << 8) + uint8[len - 1], 
            output += lookup[tmp >> 10], output += lookup[tmp >> 4 & 63], output += lookup[tmp << 2 & 63], 
            output += "="), parts.push(output), parts.join("");
        }
        exports.byteLength = byteLength, exports.toByteArray = toByteArray, exports.fromByteArray = fromByteArray;
        for (var lookup = [], revLookup = [], Arr = "undefined" != typeof Uint8Array ? Uint8Array : Array, code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, len = code.length; i < len; ++i) lookup[i] = code[i], 
        revLookup[code.charCodeAt(i)] = i;
        revLookup["-".charCodeAt(0)] = 62, revLookup["_".charCodeAt(0)] = 63;
    }, /* 43 */
    /***/
    function(module, exports) {
        module.exports = {
            "100": "Continue",
            "101": "Switching Protocols",
            "102": "Processing",
            "200": "OK",
            "201": "Created",
            "202": "Accepted",
            "203": "Non-Authoritative Information",
            "204": "No Content",
            "205": "Reset Content",
            "206": "Partial Content",
            "207": "Multi-Status",
            "208": "Already Reported",
            "226": "IM Used",
            "300": "Multiple Choices",
            "301": "Moved Permanently",
            "302": "Found",
            "303": "See Other",
            "304": "Not Modified",
            "305": "Use Proxy",
            "307": "Temporary Redirect",
            "308": "Permanent Redirect",
            "400": "Bad Request",
            "401": "Unauthorized",
            "402": "Payment Required",
            "403": "Forbidden",
            "404": "Not Found",
            "405": "Method Not Allowed",
            "406": "Not Acceptable",
            "407": "Proxy Authentication Required",
            "408": "Request Timeout",
            "409": "Conflict",
            "410": "Gone",
            "411": "Length Required",
            "412": "Precondition Failed",
            "413": "Payload Too Large",
            "414": "URI Too Long",
            "415": "Unsupported Media Type",
            "416": "Range Not Satisfiable",
            "417": "Expectation Failed",
            "418": "I'm a teapot",
            "421": "Misdirected Request",
            "422": "Unprocessable Entity",
            "423": "Locked",
            "424": "Failed Dependency",
            "425": "Unordered Collection",
            "426": "Upgrade Required",
            "428": "Precondition Required",
            "429": "Too Many Requests",
            "431": "Request Header Fields Too Large",
            "451": "Unavailable For Legal Reasons",
            "500": "Internal Server Error",
            "501": "Not Implemented",
            "502": "Bad Gateway",
            "503": "Service Unavailable",
            "504": "Gateway Timeout",
            "505": "HTTP Version Not Supported",
            "506": "Variant Also Negotiates",
            "507": "Insufficient Storage",
            "508": "Loop Detected",
            "509": "Bandwidth Limit Exceeded",
            "510": "Not Extended",
            "511": "Network Authentication Required"
        };
    }, /* 44 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */ (function(process, global) {
            /*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   4.0.5
	 */
            !function(global, factory) {
                module.exports = factory();
            }(this, function() {
                "use strict";
                function objectOrFunction(x) {
                    return "function" == typeof x || "object" == typeof x && null !== x;
                }
                function isFunction(x) {
                    return "function" == typeof x;
                }
                function setScheduler(scheduleFn) {
                    customSchedulerFn = scheduleFn;
                }
                function setAsap(asapFn) {
                    asap = asapFn;
                }
                // node
                function useNextTick() {
                    // node version 0.10.x displays a deprecation warning when nextTick is used recursively
                    // see https://github.com/cujojs/when/issues/410 for details
                    return function() {
                        return process.nextTick(flush);
                    };
                }
                // vertx
                function useVertxTimer() {
                    return "undefined" != typeof vertxNext ? function() {
                        vertxNext(flush);
                    } : useSetTimeout();
                }
                function useMutationObserver() {
                    var iterations = 0, observer = new BrowserMutationObserver(flush), node = document.createTextNode("");
                    return observer.observe(node, {
                        characterData: !0
                    }), function() {
                        node.data = iterations = ++iterations % 2;
                    };
                }
                // web worker
                function useMessageChannel() {
                    var channel = new MessageChannel();
                    return channel.port1.onmessage = flush, function() {
                        return channel.port2.postMessage(0);
                    };
                }
                function useSetTimeout() {
                    // Store setTimeout reference so es6-promise will be unaffected by
                    // other code modifying setTimeout (like sinon.useFakeTimers())
                    var globalSetTimeout = setTimeout;
                    return function() {
                        return globalSetTimeout(flush, 1);
                    };
                }
                function flush() {
                    for (var i = 0; i < len; i += 2) {
                        var callback = queue[i], arg = queue[i + 1];
                        callback(arg), queue[i] = void 0, queue[i + 1] = void 0;
                    }
                    len = 0;
                }
                function attemptVertx() {
                    try {
                        var vertx = __webpack_require__(75);
                        return vertxNext = vertx.runOnLoop || vertx.runOnContext, useVertxTimer();
                    } catch (e) {
                        return useSetTimeout();
                    }
                }
                function then(onFulfillment, onRejection) {
                    var _arguments = arguments, parent = this, child = new this.constructor(noop);
                    void 0 === child[PROMISE_ID] && makePromise(child);
                    var _state = parent._state;
                    return _state ? !function() {
                        var callback = _arguments[_state - 1];
                        asap(function() {
                            return invokeCallback(_state, child, callback, parent._result);
                        });
                    }() : subscribe(parent, child, onFulfillment, onRejection), child;
                }
                /**
	  `Promise.resolve` returns a promise that will become resolved with the
	  passed `value`. It is shorthand for the following:
	
	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    resolve(1);
	  });
	
	  promise.then(function(value){
	    // value === 1
	  });
	  ```
	
	  Instead of writing the above, your code now simply becomes the following:
	
	  ```javascript
	  let promise = Promise.resolve(1);
	
	  promise.then(function(value){
	    // value === 1
	  });
	  ```
	
	  @method resolve
	  @static
	  @param {Any} value value that the returned promise will be resolved with
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
                function resolve(object) {
                    /*jshint validthis:true */
                    var Constructor = this;
                    if (object && "object" == typeof object && object.constructor === Constructor) return object;
                    var promise = new Constructor(noop);
                    return _resolve(promise, object), promise;
                }
                function noop() {}
                function selfFulfillment() {
                    return new TypeError("You cannot resolve a promise with itself");
                }
                function cannotReturnOwn() {
                    return new TypeError("A promises callback cannot return that same promise.");
                }
                function getThen(promise) {
                    try {
                        return promise.then;
                    } catch (error) {
                        return GET_THEN_ERROR.error = error, GET_THEN_ERROR;
                    }
                }
                function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
                    try {
                        then.call(value, fulfillmentHandler, rejectionHandler);
                    } catch (e) {
                        return e;
                    }
                }
                function handleForeignThenable(promise, thenable, then) {
                    asap(function(promise) {
                        var sealed = !1, error = tryThen(then, thenable, function(value) {
                            sealed || (sealed = !0, thenable !== value ? _resolve(promise, value) : fulfill(promise, value));
                        }, function(reason) {
                            sealed || (sealed = !0, _reject(promise, reason));
                        }, "Settle: " + (promise._label || " unknown promise"));
                        !sealed && error && (sealed = !0, _reject(promise, error));
                    }, promise);
                }
                function handleOwnThenable(promise, thenable) {
                    thenable._state === FULFILLED ? fulfill(promise, thenable._result) : thenable._state === REJECTED ? _reject(promise, thenable._result) : subscribe(thenable, void 0, function(value) {
                        return _resolve(promise, value);
                    }, function(reason) {
                        return _reject(promise, reason);
                    });
                }
                function handleMaybeThenable(promise, maybeThenable, then$$) {
                    maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve ? handleOwnThenable(promise, maybeThenable) : then$$ === GET_THEN_ERROR ? _reject(promise, GET_THEN_ERROR.error) : void 0 === then$$ ? fulfill(promise, maybeThenable) : isFunction(then$$) ? handleForeignThenable(promise, maybeThenable, then$$) : fulfill(promise, maybeThenable);
                }
                function _resolve(promise, value) {
                    promise === value ? _reject(promise, selfFulfillment()) : objectOrFunction(value) ? handleMaybeThenable(promise, value, getThen(value)) : fulfill(promise, value);
                }
                function publishRejection(promise) {
                    promise._onerror && promise._onerror(promise._result), publish(promise);
                }
                function fulfill(promise, value) {
                    promise._state === PENDING && (promise._result = value, promise._state = FULFILLED, 
                    0 !== promise._subscribers.length && asap(publish, promise));
                }
                function _reject(promise, reason) {
                    promise._state === PENDING && (promise._state = REJECTED, promise._result = reason, 
                    asap(publishRejection, promise));
                }
                function subscribe(parent, child, onFulfillment, onRejection) {
                    var _subscribers = parent._subscribers, length = _subscribers.length;
                    parent._onerror = null, _subscribers[length] = child, _subscribers[length + FULFILLED] = onFulfillment, 
                    _subscribers[length + REJECTED] = onRejection, 0 === length && parent._state && asap(publish, parent);
                }
                function publish(promise) {
                    var subscribers = promise._subscribers, settled = promise._state;
                    if (0 !== subscribers.length) {
                        for (var child = void 0, callback = void 0, detail = promise._result, i = 0; i < subscribers.length; i += 3) child = subscribers[i], 
                        callback = subscribers[i + settled], child ? invokeCallback(settled, child, callback, detail) : callback(detail);
                        promise._subscribers.length = 0;
                    }
                }
                function ErrorObject() {
                    this.error = null;
                }
                function tryCatch(callback, detail) {
                    try {
                        return callback(detail);
                    } catch (e) {
                        return TRY_CATCH_ERROR.error = e, TRY_CATCH_ERROR;
                    }
                }
                function invokeCallback(settled, promise, callback, detail) {
                    var hasCallback = isFunction(callback), value = void 0, error = void 0, succeeded = void 0, failed = void 0;
                    if (hasCallback) {
                        if (value = tryCatch(callback, detail), value === TRY_CATCH_ERROR ? (failed = !0, 
                        error = value.error, value = null) : succeeded = !0, promise === value) return void _reject(promise, cannotReturnOwn());
                    } else value = detail, succeeded = !0;
                    promise._state !== PENDING || (hasCallback && succeeded ? _resolve(promise, value) : failed ? _reject(promise, error) : settled === FULFILLED ? fulfill(promise, value) : settled === REJECTED && _reject(promise, value));
                }
                function initializePromise(promise, resolver) {
                    try {
                        resolver(function(value) {
                            _resolve(promise, value);
                        }, function(reason) {
                            _reject(promise, reason);
                        });
                    } catch (e) {
                        _reject(promise, e);
                    }
                }
                function nextId() {
                    return id++;
                }
                function makePromise(promise) {
                    promise[PROMISE_ID] = id++, promise._state = void 0, promise._result = void 0, promise._subscribers = [];
                }
                function Enumerator(Constructor, input) {
                    this._instanceConstructor = Constructor, this.promise = new Constructor(noop), this.promise[PROMISE_ID] || makePromise(this.promise), 
                    isArray(input) ? (this._input = input, this.length = input.length, this._remaining = input.length, 
                    this._result = new Array(this.length), 0 === this.length ? fulfill(this.promise, this._result) : (this.length = this.length || 0, 
                    this._enumerate(), 0 === this._remaining && fulfill(this.promise, this._result))) : _reject(this.promise, validationError());
                }
                function validationError() {
                    return new Error("Array Methods must be provided an Array");
                }
                /**
	  `Promise.all` accepts an array of promises, and returns a new promise which
	  is fulfilled with an array of fulfillment values for the passed promises, or
	  rejected with the reason of the first passed promise to be rejected. It casts all
	  elements of the passed iterable to promises as it runs this algorithm.
	
	  Example:
	
	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = resolve(2);
	  let promise3 = resolve(3);
	  let promises = [ promise1, promise2, promise3 ];
	
	  Promise.all(promises).then(function(array){
	    // The array here would be [ 1, 2, 3 ];
	  });
	  ```
	
	  If any of the `promises` given to `all` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promises's
	  rejection handler. For example:
	
	  Example:
	
	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = reject(new Error("2"));
	  let promise3 = reject(new Error("3"));
	  let promises = [ promise1, promise2, promise3 ];
	
	  Promise.all(promises).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(error) {
	    // error.message === "2"
	  });
	  ```
	
	  @method all
	  @static
	  @param {Array} entries array of promises
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when all `promises` have been
	  fulfilled, or rejected if any of them become rejected.
	  @static
	*/
                function all(entries) {
                    return new Enumerator(this, entries).promise;
                }
                /**
	  `Promise.race` returns a new promise which is settled in the same way as the
	  first passed promise to settle.
	
	  Example:
	
	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });
	
	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 2');
	    }, 100);
	  });
	
	  Promise.race([promise1, promise2]).then(function(result){
	    // result === 'promise 2' because it was resolved before promise1
	    // was resolved.
	  });
	  ```
	
	  `Promise.race` is deterministic in that only the state of the first
	  settled promise matters. For example, even if other promises given to the
	  `promises` array argument are resolved, but the first settled promise has
	  become rejected before the other promises became fulfilled, the returned
	  promise will become rejected:
	
	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });
	
	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      reject(new Error('promise 2'));
	    }, 100);
	  });
	
	  Promise.race([promise1, promise2]).then(function(result){
	    // Code here never runs
	  }, function(reason){
	    // reason.message === 'promise 2' because promise 2 became rejected before
	    // promise 1 became fulfilled
	  });
	  ```
	
	  An example real-world use case is implementing timeouts:
	
	  ```javascript
	  Promise.race([ajax('foo.json'), timeout(5000)])
	  ```
	
	  @method race
	  @static
	  @param {Array} promises array of promises to observe
	  Useful for tooling.
	  @return {Promise} a promise which settles in the same way as the first passed
	  promise to settle.
	*/
                function race(entries) {
                    /*jshint validthis:true */
                    var Constructor = this;
                    return new Constructor(isArray(entries) ? function(resolve, reject) {
                        for (var length = entries.length, i = 0; i < length; i++) Constructor.resolve(entries[i]).then(resolve, reject);
                    } : function(_, reject) {
                        return reject(new TypeError("You must pass an array to race."));
                    });
                }
                /**
	  `Promise.reject` returns a promise rejected with the passed `reason`.
	  It is shorthand for the following:
	
	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    reject(new Error('WHOOPS'));
	  });
	
	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```
	
	  Instead of writing the above, your code now simply becomes the following:
	
	  ```javascript
	  let promise = Promise.reject(new Error('WHOOPS'));
	
	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```
	
	  @method reject
	  @static
	  @param {Any} reason value that the returned promise will be rejected with.
	  Useful for tooling.
	  @return {Promise} a promise rejected with the given `reason`.
	*/
                function reject(reason) {
                    /*jshint validthis:true */
                    var Constructor = this, promise = new Constructor(noop);
                    return _reject(promise, reason), promise;
                }
                function needsResolver() {
                    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
                }
                function needsNew() {
                    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
                }
                /**
	  Promise objects represent the eventual result of an asynchronous operation. The
	  primary way of interacting with a promise is through its `then` method, which
	  registers callbacks to receive either a promise's eventual value or the reason
	  why the promise cannot be fulfilled.
	
	  Terminology
	  -----------
	
	  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	  - `thenable` is an object or function that defines a `then` method.
	  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	  - `exception` is a value that is thrown using the throw statement.
	  - `reason` is a value that indicates why a promise was rejected.
	  - `settled` the final resting state of a promise, fulfilled or rejected.
	
	  A promise can be in one of three states: pending, fulfilled, or rejected.
	
	  Promises that are fulfilled have a fulfillment value and are in the fulfilled
	  state.  Promises that are rejected have a rejection reason and are in the
	  rejected state.  A fulfillment value is never a thenable.
	
	  Promises can also be said to *resolve* a value.  If this value is also a
	  promise, then the original promise's settled state will match the value's
	  settled state.  So a promise that *resolves* a promise that rejects will
	  itself reject, and a promise that *resolves* a promise that fulfills will
	  itself fulfill.
	
	
	  Basic Usage:
	  ------------
	
	  ```js
	  let promise = new Promise(function(resolve, reject) {
	    // on success
	    resolve(value);
	
	    // on failure
	    reject(reason);
	  });
	
	  promise.then(function(value) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```
	
	  Advanced Usage:
	  ---------------
	
	  Promises shine when abstracting away asynchronous interactions such as
	  `XMLHttpRequest`s.
	
	  ```js
	  function getJSON(url) {
	    return new Promise(function(resolve, reject){
	      let xhr = new XMLHttpRequest();
	
	      xhr.open('GET', url);
	      xhr.onreadystatechange = handler;
	      xhr.responseType = 'json';
	      xhr.setRequestHeader('Accept', 'application/json');
	      xhr.send();
	
	      function handler() {
	        if (this.readyState === this.DONE) {
	          if (this.status === 200) {
	            resolve(this.response);
	          } else {
	            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	          }
	        }
	      };
	    });
	  }
	
	  getJSON('/posts.json').then(function(json) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```
	
	  Unlike callbacks, promises are great composable primitives.
	
	  ```js
	  Promise.all([
	    getJSON('/posts'),
	    getJSON('/comments')
	  ]).then(function(values){
	    values[0] // => postsJSON
	    values[1] // => commentsJSON
	
	    return values;
	  });
	  ```
	
	  @class Promise
	  @param {function} resolver
	  Useful for tooling.
	  @constructor
	*/
                function Promise(resolver) {
                    this[PROMISE_ID] = nextId(), this._result = this._state = void 0, this._subscribers = [], 
                    noop !== resolver && ("function" != typeof resolver && needsResolver(), this instanceof Promise ? initializePromise(this, resolver) : needsNew());
                }
                function polyfill() {
                    var local = void 0;
                    if ("undefined" != typeof global) local = global; else if ("undefined" != typeof self) local = self; else try {
                        local = Function("return this")();
                    } catch (e) {
                        throw new Error("polyfill failed because global object is unavailable in this environment");
                    }
                    var P = local.Promise;
                    if (P) {
                        var promiseToString = null;
                        try {
                            promiseToString = Object.prototype.toString.call(P.resolve());
                        } catch (e) {}
                        if ("[object Promise]" === promiseToString && !P.cast) return;
                    }
                    local.Promise = Promise;
                }
                var _isArray = void 0;
                _isArray = Array.isArray ? Array.isArray : function(x) {
                    return "[object Array]" === Object.prototype.toString.call(x);
                };
                var isArray = _isArray, len = 0, vertxNext = void 0, customSchedulerFn = void 0, asap = function(callback, arg) {
                    queue[len] = callback, queue[len + 1] = arg, len += 2, 2 === len && (// If len is 2, that means that we need to schedule an async flush.
                    // If additional callbacks are queued before the queue is flushed, they
                    // will be processed by this flush that we are scheduling.
                    customSchedulerFn ? customSchedulerFn(flush) : scheduleFlush());
                }, browserWindow = "undefined" != typeof window ? window : void 0, browserGlobal = browserWindow || {}, BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver, isNode = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process), isWorker = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel, queue = new Array(1e3), scheduleFlush = void 0;
                // Decide what async method to use to triggering processing of queued callbacks:
                scheduleFlush = isNode ? useNextTick() : BrowserMutationObserver ? useMutationObserver() : isWorker ? useMessageChannel() : void 0 === browserWindow ? attemptVertx() : useSetTimeout();
                var PROMISE_ID = Math.random().toString(36).substring(16), PENDING = void 0, FULFILLED = 1, REJECTED = 2, GET_THEN_ERROR = new ErrorObject(), TRY_CATCH_ERROR = new ErrorObject(), id = 0;
                // Strange compat..
                return Enumerator.prototype._enumerate = function() {
                    for (var length = this.length, _input = this._input, i = 0; this._state === PENDING && i < length; i++) this._eachEntry(_input[i], i);
                }, Enumerator.prototype._eachEntry = function(entry, i) {
                    var c = this._instanceConstructor, resolve$$ = c.resolve;
                    if (resolve$$ === resolve) {
                        var _then = getThen(entry);
                        if (_then === then && entry._state !== PENDING) this._settledAt(entry._state, i, entry._result); else if ("function" != typeof _then) this._remaining--, 
                        this._result[i] = entry; else if (c === Promise) {
                            var promise = new c(noop);
                            handleMaybeThenable(promise, entry, _then), this._willSettleAt(promise, i);
                        } else this._willSettleAt(new c(function(resolve$$) {
                            return resolve$$(entry);
                        }), i);
                    } else this._willSettleAt(resolve$$(entry), i);
                }, Enumerator.prototype._settledAt = function(state, i, value) {
                    var promise = this.promise;
                    promise._state === PENDING && (this._remaining--, state === REJECTED ? _reject(promise, value) : this._result[i] = value), 
                    0 === this._remaining && fulfill(promise, this._result);
                }, Enumerator.prototype._willSettleAt = function(promise, i) {
                    var enumerator = this;
                    subscribe(promise, void 0, function(value) {
                        return enumerator._settledAt(FULFILLED, i, value);
                    }, function(reason) {
                        return enumerator._settledAt(REJECTED, i, reason);
                    });
                }, Promise.all = all, Promise.race = race, Promise.resolve = resolve, Promise.reject = reject, 
                Promise._setScheduler = setScheduler, Promise._setAsap = setAsap, Promise._asap = asap, 
                Promise.prototype = {
                    constructor: Promise,
                    /**
	    The primary way of interacting with a promise is through its `then` method,
	    which registers callbacks to receive either a promise's eventual value or the
	    reason why the promise cannot be fulfilled.
	  
	    ```js
	    findUser().then(function(user){
	      // user is available
	    }, function(reason){
	      // user is unavailable, and you are given the reason why
	    });
	    ```
	  
	    Chaining
	    --------
	  
	    The return value of `then` is itself a promise.  This second, 'downstream'
	    promise is resolved with the return value of the first promise's fulfillment
	    or rejection handler, or rejected if the handler throws an exception.
	  
	    ```js
	    findUser().then(function (user) {
	      return user.name;
	    }, function (reason) {
	      return 'default name';
	    }).then(function (userName) {
	      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	      // will be `'default name'`
	    });
	  
	    findUser().then(function (user) {
	      throw new Error('Found user, but still unhappy');
	    }, function (reason) {
	      throw new Error('`findUser` rejected and we're unhappy');
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	    });
	    ```
	    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	  
	    ```js
	    findUser().then(function (user) {
	      throw new PedagogicalException('Upstream error');
	    }).then(function (value) {
	      // never reached
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // The `PedgagocialException` is propagated all the way down to here
	    });
	    ```
	  
	    Assimilation
	    ------------
	  
	    Sometimes the value you want to propagate to a downstream promise can only be
	    retrieved asynchronously. This can be achieved by returning a promise in the
	    fulfillment or rejection handler. The downstream promise will then be pending
	    until the returned promise is settled. This is called *assimilation*.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // The user's comments are now available
	    });
	    ```
	  
	    If the assimliated promise rejects, then the downstream promise will also reject.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // If `findCommentsByAuthor` fulfills, we'll have the value here
	    }, function (reason) {
	      // If `findCommentsByAuthor` rejects, we'll have the reason here
	    });
	    ```
	  
	    Simple Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let result;
	  
	    try {
	      result = findResult();
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	    findResult(function(result, err){
	      if (err) {
	        // failure
	      } else {
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findResult().then(function(result){
	      // success
	    }, function(reason){
	      // failure
	    });
	    ```
	  
	    Advanced Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let author, books;
	  
	    try {
	      author = findAuthor();
	      books  = findBooksByAuthor(author);
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	  
	    function foundBooks(books) {
	  
	    }
	  
	    function failure(reason) {
	  
	    }
	  
	    findAuthor(function(author, err){
	      if (err) {
	        failure(err);
	        // failure
	      } else {
	        try {
	          findBoooksByAuthor(author, function(books, err) {
	            if (err) {
	              failure(err);
	            } else {
	              try {
	                foundBooks(books);
	              } catch(reason) {
	                failure(reason);
	              }
	            }
	          });
	        } catch(error) {
	          failure(err);
	        }
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findAuthor().
	      then(findBooksByAuthor).
	      then(function(books){
	        // found books
	    }).catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method then
	    @param {Function} onFulfilled
	    @param {Function} onRejected
	    Useful for tooling.
	    @return {Promise}
	  */
                    then: then,
                    /**
	    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	    as the catch block of a try/catch statement.
	  
	    ```js
	    function findAuthor(){
	      throw new Error('couldn't find that author');
	    }
	  
	    // synchronous
	    try {
	      findAuthor();
	    } catch(reason) {
	      // something went wrong
	    }
	  
	    // async with promises
	    findAuthor().catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method catch
	    @param {Function} onRejection
	    Useful for tooling.
	    @return {Promise}
	  */
                    catch: function(onRejection) {
                        return this.then(null, onRejection);
                    }
                }, Promise.polyfill = polyfill, Promise.Promise = Promise, Promise;
            });
        }).call(exports, __webpack_require__(1), function() {
            return this;
        }());
    }, /* 45 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */
        (function(process) {
            function isPlainObject(obj) {
                return Object.getPrototypeOf(obj) === Object.prototype;
            }
            /**
	 * Creates a new EventSource object
	 *
	 * @param {String} url the URL to which to connect
	 * @param {Object} [eventSourceInitDict] extra init params. See README for details.
	 * @api public
	 **/
            function EventSource(url, eventSourceInitDict) {
                function onConnectionClosed() {
                    readyState !== EventSource.CLOSED && (readyState = EventSource.CONNECTING, _emit("error", new Event("error")), 
                    // The url may have been changed by a temporary
                    // redirect. If that's the case, revert it now.
                    reconnectUrl && (url = reconnectUrl, reconnectUrl = null), setTimeout(function() {
                        readyState === EventSource.CONNECTING && connect();
                    }, self.reconnectInterval));
                }
                function connect() {
                    var options = parse(url), isSecure = "https:" == options.protocol;
                    if (options.headers = {
                        "Cache-Control": "no-cache",
                        Accept: "text/event-stream"
                    }, lastEventId && (options.headers["Last-Event-ID"] = lastEventId), eventSourceInitDict && eventSourceInitDict.headers && isPlainObject(eventSourceInitDict.headers)) for (var i in eventSourceInitDict.headers) {
                        var header = eventSourceInitDict.headers[i];
                        header && (options.headers[i] = header);
                    }
                    // If specify http proxy, make the request to sent to the proxy server,
                    // and include the original url in path and Host headers
                    if (options.rejectUnauthorized = !(eventSourceInitDict && 0 == eventSourceInitDict.rejectUnauthorized), 
                    eventSourceInitDict && eventSourceInitDict.proxy) {
                        var proxy = parse(eventSourceInitDict.proxy);
                        options.path = url, options.headers.Host = options.host, options.hostname = proxy.hostname, 
                        options.host = proxy.host, options.port = proxy.port;
                    }
                    req = (isSecure ? https : http).request(options, function(res) {
                        // Handle HTTP redirects
                        if (301 == res.statusCode || 307 == res.statusCode) // Server sent redirect response without Location header.
                        return res.headers.location ? (307 == res.statusCode && (reconnectUrl = url), url = res.headers.location, 
                        void process.nextTick(connect)) : void _emit("error", new Event("error", {
                            status: res.statusCode
                        }));
                        if (200 === res.statusCode) {
                            readyState = EventSource.OPEN, res.on("close", onConnectionClosed), res.on("end", onConnectionClosed), 
                            _emit("open", new Event("open"));
                            // text/event-stream parser adapted from webkit's
                            // Source/WebCore/page/EventSource.cpp
                            var buf = "";
                            res.on("data", function(chunk) {
                                buf += chunk;
                                for (var pos = 0, length = buf.length; pos < length; ) {
                                    discardTrailingNewline && ("\n" === buf[pos] && ++pos, discardTrailingNewline = !1);
                                    for (var c, lineLength = -1, fieldLength = -1, i = pos; lineLength < 0 && i < length; ++i) c = buf[i], 
                                    ":" === c ? fieldLength < 0 && (fieldLength = i - pos) : "\r" === c ? (discardTrailingNewline = !0, 
                                    lineLength = i - pos) : "\n" === c && (lineLength = i - pos);
                                    if (lineLength < 0) break;
                                    parseEventStreamLine(buf, pos, fieldLength, lineLength), pos += lineLength + 1;
                                }
                                pos === length ? buf = "" : pos > 0 && (buf = buf.slice(pos));
                            });
                        } else if (_emit("error", new Event("error", {
                            status: res.statusCode
                        })), 204 == res.statusCode) return self.close();
                    }), req.on("error", onConnectionClosed), req.setNoDelay && req.setNoDelay(!0), req.end();
                }
                function _emit() {
                    self.listeners(arguments[0]).length > 0 && self.emit.apply(self, arguments);
                }
                function parseEventStreamLine(buf, pos, fieldLength, lineLength) {
                    if (0 === lineLength) {
                        if (data.length > 0) {
                            var type = eventName || "message";
                            _emit(type, new MessageEvent(type, {
                                data: data.slice(0, -1),
                                // remove trailing newline
                                lastEventId: lastEventId,
                                origin: original(url)
                            })), data = "";
                        }
                        eventName = void 0;
                    } else if (fieldLength > 0) {
                        var noValue = fieldLength < 0, step = 0, field = buf.slice(pos, pos + (noValue ? lineLength : fieldLength));
                        step = noValue ? lineLength : " " !== buf[pos + fieldLength + 1] ? fieldLength + 1 : fieldLength + 2, 
                        pos += step;
                        var valueLength = lineLength - step, value = buf.slice(pos, pos + valueLength);
                        if ("data" === field) data += value + "\n"; else if ("event" === field) eventName = value; else if ("id" === field) lastEventId = value; else if ("retry" === field) {
                            var retry = parseInt(value, 10);
                            Number.isNaN(retry) || (self.reconnectInterval = retry);
                        }
                    }
                }
                var readyState = EventSource.CONNECTING;
                Object.defineProperty(this, "readyState", {
                    get: function() {
                        return readyState;
                    }
                }), Object.defineProperty(this, "url", {
                    get: function() {
                        return url;
                    }
                });
                var self = this;
                self.reconnectInterval = 1e3;
                var req, lastEventId = "";
                eventSourceInitDict && eventSourceInitDict.headers && isPlainObject(eventSourceInitDict.headers) && eventSourceInitDict.headers["Last-Event-ID"] && (lastEventId = eventSourceInitDict.headers["Last-Event-ID"], 
                delete eventSourceInitDict.headers["Last-Event-ID"]);
                var discardTrailingNewline = !1, data = "", eventName = "", reconnectUrl = null;
                connect(), this.close = function() {
                    readyState != EventSource.CLOSED && (readyState = EventSource.CLOSED, req.abort && req.abort(), 
                    req.xhr && req.xhr.abort && req.xhr.abort());
                };
            }
            /**
	 * W3C Event
	 *
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/#interface-Event
	 * @api private
	 */
            function Event(type, optionalProperties) {
                if (Object.defineProperty(this, "type", {
                    writable: !1,
                    value: type,
                    enumerable: !0
                }), optionalProperties) for (var f in optionalProperties) optionalProperties.hasOwnProperty(f) && Object.defineProperty(this, f, {
                    writable: !1,
                    value: optionalProperties[f],
                    enumerable: !0
                });
            }
            /**
	 * W3C MessageEvent
	 *
	 * @see http://www.w3.org/TR/webmessaging/#event-definitions
	 * @api private
	 */
            function MessageEvent(type, eventInitDict) {
                Object.defineProperty(this, "type", {
                    writable: !1,
                    value: type,
                    enumerable: !0
                });
                for (var f in eventInitDict) eventInitDict.hasOwnProperty(f) && Object.defineProperty(this, f, {
                    writable: !1,
                    value: eventInitDict[f],
                    enumerable: !0
                });
            }
            var original = __webpack_require__(50), parse = __webpack_require__(32).parse, events = __webpack_require__(7), https = __webpack_require__(46), http = __webpack_require__(26), util = __webpack_require__(72);
            module.exports = EventSource, util.inherits(EventSource, events.EventEmitter), EventSource.prototype.constructor = EventSource, 
            // make stacktraces readable
            [ "open", "error", "message" ].forEach(function(method) {
                Object.defineProperty(EventSource.prototype, "on" + method, {
                    /**
	     * Returns the current listener
	     *
	     * @return {Mixed} the set function or undefined
	     * @api private
	     */
                    get: function() {
                        var listener = this.listeners(method)[0];
                        return listener ? listener._listener ? listener._listener : listener : void 0;
                    },
                    /**
	     * Start listening for events
	     *
	     * @param {Function} listener the listener
	     * @return {Mixed} the set function or undefined
	     * @api private
	     */
                    set: function(listener) {
                        this.removeAllListeners(method), this.addEventListener(method, listener);
                    }
                });
            }), /**
	 * Ready states
	 */
            Object.defineProperty(EventSource, "CONNECTING", {
                enumerable: !0,
                value: 0
            }), Object.defineProperty(EventSource, "OPEN", {
                enumerable: !0,
                value: 1
            }), Object.defineProperty(EventSource, "CLOSED", {
                enumerable: !0,
                value: 2
            }), /**
	 * Emulates the W3C Browser based WebSocket interface using addEventListener.
	 *
	 * @param {String} method Listen for an event
	 * @param {Function} listener callback
	 * @see https://developer.mozilla.org/en/DOM/element.addEventListener
	 * @see http://dev.w3.org/html5/websockets/#the-websocket-interface
	 * @api public
	 */
            EventSource.prototype.addEventListener = function(method, listener) {
                "function" == typeof listener && (// store a reference so we can return the original function again
                listener._listener = listener, this.on(method, listener));
            };
        }).call(exports, __webpack_require__(1));
    }, /* 46 */
    /***/
    function(module, exports, __webpack_require__) {
        var http = __webpack_require__(26), https = module.exports;
        for (var key in http) http.hasOwnProperty(key) && (https[key] = http[key]);
        https.request = function(params, cb) {
            return params || (params = {}), params.scheme = "https", params.protocol = "https:", 
            http.request.call(this, params, cb);
        };
    }, /* 47 */
    /***/
    function(module, exports) {
        exports.read = function(buffer, offset, isLE, mLen, nBytes) {
            var e, m, eLen = 8 * nBytes - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, nBits = -7, i = isLE ? nBytes - 1 : 0, d = isLE ? -1 : 1, s = buffer[offset + i];
            for (i += d, e = s & (1 << -nBits) - 1, s >>= -nBits, nBits += eLen; nBits > 0; e = 256 * e + buffer[offset + i], 
            i += d, nBits -= 8) ;
            for (m = e & (1 << -nBits) - 1, e >>= -nBits, nBits += mLen; nBits > 0; m = 256 * m + buffer[offset + i], 
            i += d, nBits -= 8) ;
            if (0 === e) e = 1 - eBias; else {
                if (e === eMax) return m ? NaN : (s ? -1 : 1) * (1 / 0);
                m += Math.pow(2, mLen), e -= eBias;
            }
            return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
        }, exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
            var e, m, c, eLen = 8 * nBytes - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, rt = 23 === mLen ? Math.pow(2, -24) - Math.pow(2, -77) : 0, i = isLE ? 0 : nBytes - 1, d = isLE ? 1 : -1, s = value < 0 || 0 === value && 1 / value < 0 ? 1 : 0;
            for (value = Math.abs(value), isNaN(value) || value === 1 / 0 ? (m = isNaN(value) ? 1 : 0, 
            e = eMax) : (e = Math.floor(Math.log(value) / Math.LN2), value * (c = Math.pow(2, -e)) < 1 && (e--, 
            c *= 2), value += e + eBias >= 1 ? rt / c : rt * Math.pow(2, 1 - eBias), value * c >= 2 && (e++, 
            c /= 2), e + eBias >= eMax ? (m = 0, e = eMax) : e + eBias >= 1 ? (m = (value * c - 1) * Math.pow(2, mLen), 
            e += eBias) : (m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen), e = 0)); mLen >= 8; buffer[offset + i] = 255 & m, 
            i += d, m /= 256, mLen -= 8) ;
            for (e = e << mLen | m, eLen += mLen; eLen > 0; buffer[offset + i] = 255 & e, i += d, 
            e /= 256, eLen -= 8) ;
            buffer[offset + i - d] |= 128 * s;
        };
    }, /* 48 */
    /***/
    function(module, exports, __webpack_require__) {
        // the whatwg-fetch polyfill installs the fetch() function
        // on the global object (window or self)
        //
        // Return that as the export for use in Webpack, Browserify etc.
        __webpack_require__(73), module.exports = self.fetch.bind(self);
    }, /* 49 */
    /***/
    function(module, exports) {
        "use strict";
        function toObject(val) {
            if (null === val || void 0 === val) throw new TypeError("Object.assign cannot be called with null or undefined");
            return Object(val);
        }
        function shouldUseNative() {
            try {
                if (!Object.assign) return !1;
                // Detect buggy property enumeration order in older V8 versions.
                // https://bugs.chromium.org/p/v8/issues/detail?id=4118
                var test1 = new String("abc");
                if (// eslint-disable-line
                test1[5] = "de", "5" === Object.getOwnPropertyNames(test1)[0]) return !1;
                for (var test2 = {}, i = 0; i < 10; i++) test2["_" + String.fromCharCode(i)] = i;
                var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
                    return test2[n];
                });
                if ("0123456789" !== order2.join("")) return !1;
                // https://bugs.chromium.org/p/v8/issues/detail?id=3056
                var test3 = {};
                return "abcdefghijklmnopqrst".split("").forEach(function(letter) {
                    test3[letter] = letter;
                }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, test3)).join("");
            } catch (e) {
                // We don't expect any of the above to throw, but better to be safe.
                return !1;
            }
        }
        /* eslint-disable no-unused-vars */
        var hasOwnProperty = Object.prototype.hasOwnProperty, propIsEnumerable = Object.prototype.propertyIsEnumerable;
        module.exports = shouldUseNative() ? Object.assign : function(target, source) {
            for (var from, symbols, to = toObject(target), s = 1; s < arguments.length; s++) {
                from = Object(arguments[s]);
                for (var key in from) hasOwnProperty.call(from, key) && (to[key] = from[key]);
                if (Object.getOwnPropertySymbols) {
                    symbols = Object.getOwnPropertySymbols(from);
                    for (var i = 0; i < symbols.length; i++) propIsEnumerable.call(from, symbols[i]) && (to[symbols[i]] = from[symbols[i]]);
                }
            }
            return to;
        };
    }, /* 50 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        /**
	 * Transform an URL to a valid origin value.
	 *
	 * @param {String|Object} url URL to transform to it's origin.
	 * @returns {String} The origin.
	 * @api public
	 */
        function origin(url) {
            //
            // 6.2.  ASCII Serialization of an Origin
            // http://tools.ietf.org/html/rfc6454#section-6.2
            //
            //
            // 6.2.  ASCII Serialization of an Origin
            // http://tools.ietf.org/html/rfc6454#section-6.2
            //
            return "string" == typeof url && (url = parse(url)), url.protocol && url.hostname ? (url.protocol + "//" + url.host).toLowerCase() : "null";
        }
        var parse = __webpack_require__(31);
        /**
	 * Check if the origins are the same.
	 *
	 * @param {String} a URL or origin of a.
	 * @param {String} b URL or origin of b.
	 * @returns {Boolean}
	 * @api public
	 */
        origin.same = function(a, b) {
            return origin(a) === origin(b);
        }, //
        // Expose the origin
        //
        module.exports = origin;
    }, /* 51 */
    /***/
    function(module, exports) {
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.
        "use strict";
        // If obj.hasOwnProperty has been overridden, then calling
        // obj.hasOwnProperty(prop) will break.
        // See: https://github.com/joyent/node/issues/1707
        function hasOwnProperty(obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop);
        }
        module.exports = function(qs, sep, eq, options) {
            sep = sep || "&", eq = eq || "=";
            var obj = {};
            if ("string" != typeof qs || 0 === qs.length) return obj;
            var regexp = /\+/g;
            qs = qs.split(sep);
            var maxKeys = 1e3;
            options && "number" == typeof options.maxKeys && (maxKeys = options.maxKeys);
            var len = qs.length;
            // maxKeys <= 0 means that we should not limit keys count
            maxKeys > 0 && len > maxKeys && (len = maxKeys);
            for (var i = 0; i < len; ++i) {
                var kstr, vstr, k, v, x = qs[i].replace(regexp, "%20"), idx = x.indexOf(eq);
                idx >= 0 ? (kstr = x.substr(0, idx), vstr = x.substr(idx + 1)) : (kstr = x, vstr = ""), 
                k = decodeURIComponent(kstr), v = decodeURIComponent(vstr), hasOwnProperty(obj, k) ? Array.isArray(obj[k]) ? obj[k].push(v) : obj[k] = [ obj[k], v ] : obj[k] = v;
            }
            return obj;
        };
    }, /* 52 */
    /***/
    function(module, exports) {
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.
        "use strict";
        var stringifyPrimitive = function(v) {
            switch (typeof v) {
              case "string":
                return v;

              case "boolean":
                return v ? "true" : "false";

              case "number":
                return isFinite(v) ? v : "";

              default:
                return "";
            }
        };
        module.exports = function(obj, sep, eq, name) {
            return sep = sep || "&", eq = eq || "=", null === obj && (obj = void 0), "object" == typeof obj ? Object.keys(obj).map(function(k) {
                var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
                return Array.isArray(obj[k]) ? obj[k].map(function(v) {
                    return ks + encodeURIComponent(stringifyPrimitive(v));
                }).join(sep) : ks + encodeURIComponent(stringifyPrimitive(obj[k]));
            }).join(sep) : name ? encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj)) : "";
        };
    }, /* 53 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        exports.decode = exports.parse = __webpack_require__(51), exports.encode = exports.stringify = __webpack_require__(52);
    }, /* 54 */
    /***/
    function(module, exports) {
        "use strict";
        /**
	 * Simple query string parser.
	 *
	 * @param {String} query The query string that needs to be parsed.
	 * @returns {Object}
	 * @api public
	 */
        function querystring(query) {
            //
            // Little nifty parsing hack, leverage the fact that RegExp.exec increments
            // the lastIndex property so we can continue executing this loop until we've
            // parsed all results.
            //
            for (var part, parser = /([^=?&]+)=([^&]*)/g, result = {}; part = parser.exec(query); result[decodeURIComponent(part[1])] = decodeURIComponent(part[2])) ;
            return result;
        }
        /**
	 * Transform a query string to an object.
	 *
	 * @param {Object} obj Object that should be transformed.
	 * @param {String} prefix Optional prefix.
	 * @returns {String}
	 * @api public
	 */
        function querystringify(obj, prefix) {
            prefix = prefix || "";
            var pairs = [];
            //
            // Optionally prefix with a '?' if needed
            //
            "string" != typeof prefix && (prefix = "?");
            for (var key in obj) has.call(obj, key) && pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
            return pairs.length ? prefix + pairs.join("&") : "";
        }
        var has = Object.prototype.hasOwnProperty;
        //
        // Expose the module.
        //
        exports.stringify = querystringify, exports.parse = querystring;
    }, /* 55 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(4);
    }, /* 56 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function BufferList() {
            this.head = null, this.tail = null, this.length = 0;
        }
        var bufferShim = (__webpack_require__(2).Buffer, __webpack_require__(11));
        /*</replacement>*/
        module.exports = BufferList, BufferList.prototype.push = function(v) {
            var entry = {
                data: v,
                next: null
            };
            this.length > 0 ? this.tail.next = entry : this.head = entry, this.tail = entry, 
            ++this.length;
        }, BufferList.prototype.unshift = function(v) {
            var entry = {
                data: v,
                next: this.head
            };
            0 === this.length && (this.tail = entry), this.head = entry, ++this.length;
        }, BufferList.prototype.shift = function() {
            if (0 !== this.length) {
                var ret = this.head.data;
                return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, 
                --this.length, ret;
            }
        }, BufferList.prototype.clear = function() {
            this.head = this.tail = null, this.length = 0;
        }, BufferList.prototype.join = function(s) {
            if (0 === this.length) return "";
            for (var p = this.head, ret = "" + p.data; p = p.next; ) ret += s + p.data;
            return ret;
        }, BufferList.prototype.concat = function(n) {
            if (0 === this.length) return bufferShim.alloc(0);
            if (1 === this.length) return this.head.data;
            for (var ret = bufferShim.allocUnsafe(n >>> 0), p = this.head, i = 0; p; ) p.data.copy(ret, i), 
            i += p.data.length, p = p.next;
            return ret;
        };
    }, /* 57 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(24);
    }, /* 58 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(13);
    }, /* 59 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(14);
    }, /* 60 */
    /***/
    function(module, exports) {
        "use strict";
        /**
	 * Check if we're required to add a port number.
	 *
	 * @see https://url.spec.whatwg.org/#default-port
	 * @param {Number|String} port Port number we need to check
	 * @param {String} protocol Protocol we need to check against.
	 * @returns {Boolean} Is it a default port for the given protocol
	 * @api private
	 */
        module.exports = function(port, protocol) {
            if (protocol = protocol.split(":")[0], port = +port, !port) return !1;
            switch (protocol) {
              case "http":
              case "ws":
                return 80 !== port;

              case "https":
              case "wss":
                return 443 !== port;

              case "ftp":
                return 21 !== port;

              case "gopher":
                return 70 !== port;

              case "file":
                return !1;
            }
            return 0 !== port;
        };
    }, /* 61 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */
        (function(global, process) {
            !function(global, undefined) {
                "use strict";
                function setImmediate(callback) {
                    // Callback can either be a function or a string
                    "function" != typeof callback && (callback = new Function("" + callback));
                    for (var args = new Array(arguments.length - 1), i = 0; i < args.length; i++) args[i] = arguments[i + 1];
                    // Store and register the task
                    var task = {
                        callback: callback,
                        args: args
                    };
                    return tasksByHandle[nextHandle] = task, registerImmediate(nextHandle), nextHandle++;
                }
                function clearImmediate(handle) {
                    delete tasksByHandle[handle];
                }
                function run(task) {
                    var callback = task.callback, args = task.args;
                    switch (args.length) {
                      case 0:
                        callback();
                        break;

                      case 1:
                        callback(args[0]);
                        break;

                      case 2:
                        callback(args[0], args[1]);
                        break;

                      case 3:
                        callback(args[0], args[1], args[2]);
                        break;

                      default:
                        callback.apply(undefined, args);
                    }
                }
                function runIfPresent(handle) {
                    // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
                    // So if we're currently running a task, we'll need to delay this invocation.
                    if (currentlyRunningATask) // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
                    // "too much recursion" error.
                    setTimeout(runIfPresent, 0, handle); else {
                        var task = tasksByHandle[handle];
                        if (task) {
                            currentlyRunningATask = !0;
                            try {
                                run(task);
                            } finally {
                                clearImmediate(handle), currentlyRunningATask = !1;
                            }
                        }
                    }
                }
                function installNextTickImplementation() {
                    registerImmediate = function(handle) {
                        process.nextTick(function() {
                            runIfPresent(handle);
                        });
                    };
                }
                function canUsePostMessage() {
                    // The test against `importScripts` prevents this implementation from being installed inside a web worker,
                    // where `global.postMessage` means something completely different and can't be used for this purpose.
                    if (global.postMessage && !global.importScripts) {
                        var postMessageIsAsynchronous = !0, oldOnMessage = global.onmessage;
                        return global.onmessage = function() {
                            postMessageIsAsynchronous = !1;
                        }, global.postMessage("", "*"), global.onmessage = oldOnMessage, postMessageIsAsynchronous;
                    }
                }
                function installPostMessageImplementation() {
                    // Installs an event handler on `global` for the `message` event: see
                    // * https://developer.mozilla.org/en/DOM/window.postMessage
                    // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
                    var messagePrefix = "setImmediate$" + Math.random() + "$", onGlobalMessage = function(event) {
                        event.source === global && "string" == typeof event.data && 0 === event.data.indexOf(messagePrefix) && runIfPresent(+event.data.slice(messagePrefix.length));
                    };
                    global.addEventListener ? global.addEventListener("message", onGlobalMessage, !1) : global.attachEvent("onmessage", onGlobalMessage), 
                    registerImmediate = function(handle) {
                        global.postMessage(messagePrefix + handle, "*");
                    };
                }
                function installMessageChannelImplementation() {
                    var channel = new MessageChannel();
                    channel.port1.onmessage = function(event) {
                        var handle = event.data;
                        runIfPresent(handle);
                    }, registerImmediate = function(handle) {
                        channel.port2.postMessage(handle);
                    };
                }
                function installReadyStateChangeImplementation() {
                    var html = doc.documentElement;
                    registerImmediate = function(handle) {
                        // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
                        // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
                        var script = doc.createElement("script");
                        script.onreadystatechange = function() {
                            runIfPresent(handle), script.onreadystatechange = null, html.removeChild(script), 
                            script = null;
                        }, html.appendChild(script);
                    };
                }
                function installSetTimeoutImplementation() {
                    registerImmediate = function(handle) {
                        setTimeout(runIfPresent, 0, handle);
                    };
                }
                if (!global.setImmediate) {
                    var registerImmediate, nextHandle = 1, tasksByHandle = {}, currentlyRunningATask = !1, doc = global.document, attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
                    attachTo = attachTo && attachTo.setTimeout ? attachTo : global, // Don't get fooled by e.g. browserify environments.
                    "[object process]" === {}.toString.call(global.process) ? // For Node.js before 0.9
                    installNextTickImplementation() : canUsePostMessage() ? // For non-IE10 modern browsers
                    installPostMessageImplementation() : global.MessageChannel ? // For web workers, where supported
                    installMessageChannelImplementation() : doc && "onreadystatechange" in doc.createElement("script") ? // For IE 6–8
                    installReadyStateChangeImplementation() : // For older browsers
                    installSetTimeoutImplementation(), attachTo.setImmediate = setImmediate, attachTo.clearImmediate = clearImmediate;
                }
            }("undefined" == typeof self ? "undefined" == typeof global ? this : global : self);
        }).call(exports, function() {
            return this;
        }(), __webpack_require__(1));
    }, /* 62 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */
        (function(Buffer, global, process) {
            function decideMode(preferBinary, useFetch) {
                return capability.fetch && useFetch ? "fetch" : capability.mozchunkedarraybuffer ? "moz-chunked-arraybuffer" : capability.msstream ? "ms-stream" : capability.arraybuffer && preferBinary ? "arraybuffer" : capability.vbArray && preferBinary ? "text:vbarray" : "text";
            }
            /**
	 * Checks if xhr.status is readable and non-zero, indicating no error.
	 * Even though the spec says it should be available in readyState 3,
	 * accessing it throws an exception in IE8
	 */
            function statusValid(xhr) {
                try {
                    var status = xhr.status;
                    return null !== status && 0 !== status;
                } catch (e) {
                    return !1;
                }
            }
            var capability = __webpack_require__(27), inherits = __webpack_require__(3), response = __webpack_require__(63), stream = __webpack_require__(15), toArrayBuffer = __webpack_require__(65), IncomingMessage = response.IncomingMessage, rStates = response.readyStates, ClientRequest = module.exports = function(opts) {
                var self = this;
                stream.Writable.call(self), self._opts = opts, self._body = [], self._headers = {}, 
                opts.auth && self.setHeader("Authorization", "Basic " + new Buffer(opts.auth).toString("base64")), 
                Object.keys(opts.headers).forEach(function(name) {
                    self.setHeader(name, opts.headers[name]);
                });
                var preferBinary, useFetch = !0;
                if ("disable-fetch" === opts.mode || "timeout" in opts) // If the use of XHR should be preferred and includes preserving the 'content-type' header.
                // Force XHR to be used since the Fetch API does not yet support timeouts.
                useFetch = !1, preferBinary = !0; else if ("prefer-streaming" === opts.mode) // If streaming is a high priority but binary compatibility and
                // the accuracy of the 'content-type' header aren't
                preferBinary = !1; else if ("allow-wrong-content-type" === opts.mode) // If streaming is more important than preserving the 'content-type' header
                preferBinary = !capability.overrideMimeType; else {
                    if (opts.mode && "default" !== opts.mode && "prefer-fast" !== opts.mode) throw new Error("Invalid value for opts.mode");
                    // Use binary if text streaming may corrupt data or the content-type header, or for speed
                    preferBinary = !0;
                }
                self._mode = decideMode(preferBinary, useFetch), self.on("finish", function() {
                    self._onFinish();
                });
            };
            inherits(ClientRequest, stream.Writable), ClientRequest.prototype.setHeader = function(name, value) {
                var self = this, lowerName = name.toLowerCase();
                // This check is not necessary, but it prevents warnings from browsers about setting unsafe
                // headers. To be honest I'm not entirely sure hiding these warnings is a good thing, but
                // http-browserify did it, so I will too.
                unsafeHeaders.indexOf(lowerName) === -1 && (self._headers[lowerName] = {
                    name: name,
                    value: value
                });
            }, ClientRequest.prototype.getHeader = function(name) {
                var self = this;
                return self._headers[name.toLowerCase()].value;
            }, ClientRequest.prototype.removeHeader = function(name) {
                var self = this;
                delete self._headers[name.toLowerCase()];
            }, ClientRequest.prototype._onFinish = function() {
                var self = this;
                if (!self._destroyed) {
                    var body, opts = self._opts, headersObj = self._headers;
                    if ("POST" !== opts.method && "PUT" !== opts.method && "PATCH" !== opts.method && "MERGE" !== opts.method || (body = capability.blobConstructor ? new global.Blob(self._body.map(function(buffer) {
                        return toArrayBuffer(buffer);
                    }), {
                        type: (headersObj["content-type"] || {}).value || ""
                    }) : Buffer.concat(self._body).toString()), "fetch" === self._mode) {
                        var headers = Object.keys(headersObj).map(function(name) {
                            return [ headersObj[name].name, headersObj[name].value ];
                        });
                        global.fetch(self._opts.url, {
                            method: self._opts.method,
                            headers: headers,
                            body: body,
                            mode: "cors",
                            credentials: opts.withCredentials ? "include" : "same-origin"
                        }).then(function(response) {
                            self._fetchResponse = response, self._connect();
                        }, function(reason) {
                            self.emit("error", reason);
                        });
                    } else {
                        var xhr = self._xhr = new global.XMLHttpRequest();
                        try {
                            xhr.open(self._opts.method, self._opts.url, !0);
                        } catch (err) {
                            return void process.nextTick(function() {
                                self.emit("error", err);
                            });
                        }
                        // Can't set responseType on really old browsers
                        "responseType" in xhr && (xhr.responseType = self._mode.split(":")[0]), "withCredentials" in xhr && (xhr.withCredentials = !!opts.withCredentials), 
                        "text" === self._mode && "overrideMimeType" in xhr && xhr.overrideMimeType("text/plain; charset=x-user-defined"), 
                        "timeout" in opts && (xhr.timeout = opts.timeout, xhr.ontimeout = function() {
                            self.emit("timeout");
                        }), Object.keys(headersObj).forEach(function(name) {
                            xhr.setRequestHeader(headersObj[name].name, headersObj[name].value);
                        }), self._response = null, xhr.onreadystatechange = function() {
                            switch (xhr.readyState) {
                              case rStates.LOADING:
                              case rStates.DONE:
                                self._onXHRProgress();
                            }
                        }, // Necessary for streaming in Firefox, since xhr.response is ONLY defined
                        // in onprogress, not in onreadystatechange with xhr.readyState = 3
                        "moz-chunked-arraybuffer" === self._mode && (xhr.onprogress = function() {
                            self._onXHRProgress();
                        }), xhr.onerror = function() {
                            self._destroyed || self.emit("error", new Error("XHR error"));
                        };
                        try {
                            xhr.send(body);
                        } catch (err) {
                            return void process.nextTick(function() {
                                self.emit("error", err);
                            });
                        }
                    }
                }
            }, ClientRequest.prototype._onXHRProgress = function() {
                var self = this;
                statusValid(self._xhr) && !self._destroyed && (self._response || self._connect(), 
                self._response._onXHRProgress());
            }, ClientRequest.prototype._connect = function() {
                var self = this;
                self._destroyed || (self._response = new IncomingMessage(self._xhr, self._fetchResponse, self._mode), 
                self._response.on("error", function(err) {
                    self.emit("error", err);
                }), self.emit("response", self._response));
            }, ClientRequest.prototype._write = function(chunk, encoding, cb) {
                var self = this;
                self._body.push(chunk), cb();
            }, ClientRequest.prototype.abort = ClientRequest.prototype.destroy = function() {
                var self = this;
                self._destroyed = !0, self._response && (self._response._destroyed = !0), self._xhr && self._xhr.abort();
            }, ClientRequest.prototype.end = function(data, encoding, cb) {
                var self = this;
                "function" == typeof data && (cb = data, data = void 0), stream.Writable.prototype.end.call(self, data, encoding, cb);
            }, ClientRequest.prototype.flushHeaders = function() {}, ClientRequest.prototype.setTimeout = function() {}, 
            ClientRequest.prototype.setNoDelay = function() {}, ClientRequest.prototype.setSocketKeepAlive = function() {};
            // Taken from http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader%28%29-method
            var unsafeHeaders = [ "accept-charset", "accept-encoding", "access-control-request-headers", "access-control-request-method", "connection", "content-length", "cookie", "cookie2", "date", "dnt", "expect", "host", "keep-alive", "origin", "referer", "te", "trailer", "transfer-encoding", "upgrade", "user-agent", "via" ];
        }).call(exports, __webpack_require__(2).Buffer, function() {
            return this;
        }(), __webpack_require__(1));
    }, /* 63 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */
        (function(process, Buffer, global) {
            var capability = __webpack_require__(27), inherits = __webpack_require__(3), stream = __webpack_require__(15), rStates = exports.readyStates = {
                UNSENT: 0,
                OPENED: 1,
                HEADERS_RECEIVED: 2,
                LOADING: 3,
                DONE: 4
            }, IncomingMessage = exports.IncomingMessage = function(xhr, response, mode) {
                function read() {
                    reader.read().then(function(result) {
                        if (!self._destroyed) {
                            if (result.done) return void self.push(null);
                            self.push(new Buffer(result.value)), read();
                        }
                    }).catch(function(err) {
                        self.emit("error", err);
                    });
                }
                var self = this;
                if (stream.Readable.call(self), self._mode = mode, self.headers = {}, self.rawHeaders = [], 
                self.trailers = {}, self.rawTrailers = [], // Fake the 'close' event, but only once 'end' fires
                self.on("end", function() {
                    // The nextTick is necessary to prevent the 'request' module from causing an infinite loop
                    process.nextTick(function() {
                        self.emit("close");
                    });
                }), "fetch" === mode) {
                    self._fetchResponse = response, self.url = response.url, self.statusCode = response.status, 
                    self.statusMessage = response.statusText, response.headers.forEach(function(header, key) {
                        self.headers[key.toLowerCase()] = header, self.rawHeaders.push(key, header);
                    });
                    // TODO: this doesn't respect backpressure. Once WritableStream is available, this can be fixed
                    var reader = response.body.getReader();
                    read();
                } else {
                    self._xhr = xhr, self._pos = 0, self.url = xhr.responseURL, self.statusCode = xhr.status, 
                    self.statusMessage = xhr.statusText;
                    var headers = xhr.getAllResponseHeaders().split(/\r?\n/);
                    if (headers.forEach(function(header) {
                        var matches = header.match(/^([^:]+):\s*(.*)/);
                        if (matches) {
                            var key = matches[1].toLowerCase();
                            "set-cookie" === key ? (void 0 === self.headers[key] && (self.headers[key] = []), 
                            self.headers[key].push(matches[2])) : void 0 !== self.headers[key] ? self.headers[key] += ", " + matches[2] : self.headers[key] = matches[2], 
                            self.rawHeaders.push(matches[1], matches[2]);
                        }
                    }), self._charset = "x-user-defined", !capability.overrideMimeType) {
                        var mimeType = self.rawHeaders["mime-type"];
                        if (mimeType) {
                            var charsetMatch = mimeType.match(/;\s*charset=([^;])(;|$)/);
                            charsetMatch && (self._charset = charsetMatch[1].toLowerCase());
                        }
                        self._charset || (self._charset = "utf-8");
                    }
                }
            };
            inherits(IncomingMessage, stream.Readable), IncomingMessage.prototype._read = function() {}, 
            IncomingMessage.prototype._onXHRProgress = function() {
                var self = this, xhr = self._xhr, response = null;
                switch (self._mode) {
                  case "text:vbarray":
                    // For IE9
                    if (xhr.readyState !== rStates.DONE) break;
                    try {
                        // This fails in IE8
                        response = new global.VBArray(xhr.responseBody).toArray();
                    } catch (e) {}
                    if (null !== response) {
                        self.push(new Buffer(response));
                        break;
                    }

                  // Falls through in IE8	
                    case "text":
                    try {
                        // This will fail when readyState = 3 in IE9. Switch mode and wait for readyState = 4
                        response = xhr.responseText;
                    } catch (e) {
                        self._mode = "text:vbarray";
                        break;
                    }
                    if (response.length > self._pos) {
                        var newData = response.substr(self._pos);
                        if ("x-user-defined" === self._charset) {
                            for (var buffer = new Buffer(newData.length), i = 0; i < newData.length; i++) buffer[i] = 255 & newData.charCodeAt(i);
                            self.push(buffer);
                        } else self.push(newData, self._charset);
                        self._pos = response.length;
                    }
                    break;

                  case "arraybuffer":
                    if (xhr.readyState !== rStates.DONE || !xhr.response) break;
                    response = xhr.response, self.push(new Buffer(new Uint8Array(response)));
                    break;

                  case "moz-chunked-arraybuffer":
                    if (// take whole
                    response = xhr.response, xhr.readyState !== rStates.LOADING || !response) break;
                    self.push(new Buffer(new Uint8Array(response)));
                    break;

                  case "ms-stream":
                    if (response = xhr.response, xhr.readyState !== rStates.LOADING) break;
                    var reader = new global.MSStreamReader();
                    reader.onprogress = function() {
                        reader.result.byteLength > self._pos && (self.push(new Buffer(new Uint8Array(reader.result.slice(self._pos)))), 
                        self._pos = reader.result.byteLength);
                    }, reader.onload = function() {
                        self.push(null);
                    }, // reader.onerror = ??? // TODO: this
                    reader.readAsArrayBuffer(response);
                }
                // The ms-stream case handles end separately in reader.onload()
                self._xhr.readyState === rStates.DONE && "ms-stream" !== self._mode && self.push(null);
            };
        }).call(exports, __webpack_require__(1), __webpack_require__(2).Buffer, function() {
            return this;
        }());
    }, /* 64 */
    /***/
    function(module, exports) {
        "use strict";
        module.exports = function(str) {
            return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
                return "%" + c.charCodeAt(0).toString(16).toUpperCase();
            });
        };
    }, /* 65 */
    /***/
    function(module, exports, __webpack_require__) {
        var Buffer = __webpack_require__(2).Buffer;
        module.exports = function(buf) {
            // If the buffer is backed by a Uint8Array, a faster version will work
            if (buf instanceof Uint8Array) {
                // If the buffer isn't a subarray, return the underlying ArrayBuffer
                if (0 === buf.byteOffset && buf.byteLength === buf.buffer.byteLength) return buf.buffer;
                if ("function" == typeof buf.buffer.slice) // Otherwise we need to get a proper copy
                return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
            }
            if (Buffer.isBuffer(buf)) {
                for (var arrayCopy = new Uint8Array(buf.length), len = buf.length, i = 0; i < len; i++) arrayCopy[i] = buf[i];
                return arrayCopy.buffer;
            }
            throw new Error("Argument must be a Buffer");
        };
    }, /* 66 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */
        (function(global) {
            "use strict";
            /**
	 * These properties should not be copied or inherited from. This is only needed
	 * for all non blob URL's as the a blob URL does not include a hash, only the
	 * origin.
	 *
	 * @type {Object}
	 * @private
	 */
            var URL, ignore = {
                hash: 1,
                query: 1
            };
            /**
	 * The location object differs when your code is loaded through a normal page,
	 * Worker or through a worker using a blob. And with the blobble begins the
	 * trouble as the location object will contain the URL of the blob, not the
	 * location of the page where our code is loaded in. The actual origin is
	 * encoded in the `pathname` so we can thankfully generate a good "default"
	 * location from it so we can generate proper relative URL's again.
	 *
	 * @param {Object} loc Optional default location object.
	 * @returns {Object} lolcation object.
	 * @api public
	 */
            module.exports = function(loc) {
                loc = loc || global.location || {}, URL = URL || __webpack_require__(31);
                var key, finaldestination = {}, type = typeof loc;
                if ("blob:" === loc.protocol) finaldestination = new URL(unescape(loc.pathname), {}); else if ("string" === type) {
                    finaldestination = new URL(loc, {});
                    for (key in ignore) delete finaldestination[key];
                } else if ("object" === type) for (key in loc) key in ignore || (finaldestination[key] = loc[key]);
                return finaldestination;
            };
        }).call(exports, function() {
            return this;
        }());
    }, /* 67 */
    /***/
    function(module, exports, __webpack_require__) {
        var __WEBPACK_AMD_DEFINE_RESULT__;
        /* WEBPACK VAR INJECTION */ (function(module, global) {
            !function(root) {
                /*--------------------------------------------------------------------------*/
                /**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
                function error(type) {
                    throw RangeError(errors[type]);
                }
                /**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
                function map(array, fn) {
                    for (var length = array.length, result = []; length--; ) result[length] = fn(array[length]);
                    return result;
                }
                /**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
                function mapDomain(string, fn) {
                    var parts = string.split("@"), result = "";
                    parts.length > 1 && (// In email addresses, only the domain name should be punycoded. Leave
                    // the local part (i.e. everything up to `@`) intact.
                    result = parts[0] + "@", string = parts[1]), // Avoid `split(regex)` for IE8 compatibility. See #17.
                    string = string.replace(regexSeparators, ".");
                    var labels = string.split("."), encoded = map(labels, fn).join(".");
                    return result + encoded;
                }
                /**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
                function ucs2decode(string) {
                    for (var value, extra, output = [], counter = 0, length = string.length; counter < length; ) value = string.charCodeAt(counter++), 
                    value >= 55296 && value <= 56319 && counter < length ? (// high surrogate, and there is a next character
                    extra = string.charCodeAt(counter++), 56320 == (64512 & extra) ? // low surrogate
                    output.push(((1023 & value) << 10) + (1023 & extra) + 65536) : (// unmatched surrogate; only append this code unit, in case the next
                    // code unit is the high surrogate of a surrogate pair
                    output.push(value), counter--)) : output.push(value);
                    return output;
                }
                /**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
                function ucs2encode(array) {
                    return map(array, function(value) {
                        var output = "";
                        return value > 65535 && (value -= 65536, output += stringFromCharCode(value >>> 10 & 1023 | 55296), 
                        value = 56320 | 1023 & value), output += stringFromCharCode(value);
                    }).join("");
                }
                /**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
                function basicToDigit(codePoint) {
                    return codePoint - 48 < 10 ? codePoint - 22 : codePoint - 65 < 26 ? codePoint - 65 : codePoint - 97 < 26 ? codePoint - 97 : base;
                }
                /**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
                function digitToBasic(digit, flag) {
                    //  0..25 map to ASCII a..z or A..Z
                    // 26..35 map to ASCII 0..9
                    return digit + 22 + 75 * (digit < 26) - ((0 != flag) << 5);
                }
                /**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * http://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
                function adapt(delta, numPoints, firstTime) {
                    var k = 0;
                    for (delta = firstTime ? floor(delta / damp) : delta >> 1, delta += floor(delta / numPoints); delta > baseMinusTMin * tMax >> 1; k += base) delta = floor(delta / baseMinusTMin);
                    return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
                }
                /**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
                function decode(input) {
                    // Don't use UCS-2
                    var out, basic, j, index, oldi, w, k, digit, t, /** Cached calculation results */
                    baseMinusT, output = [], inputLength = input.length, i = 0, n = initialN, bias = initialBias;
                    for (// Handle the basic code points: let `basic` be the number of input code
                    // points before the last delimiter, or `0` if there is none, then copy
                    // the first basic code points to the output.
                    basic = input.lastIndexOf(delimiter), basic < 0 && (basic = 0), j = 0; j < basic; ++j) // if it's not a basic code point
                    input.charCodeAt(j) >= 128 && error("not-basic"), output.push(input.charCodeAt(j));
                    // Main decoding loop: start just after the last delimiter if any basic code
                    // points were copied; start at the beginning otherwise.
                    for (index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
                        // `index` is the index of the next character to be consumed.
                        // Decode a generalized variable-length integer into `delta`,
                        // which gets added to `i`. The overflow checking is easier
                        // if we increase `i` as we go, then subtract off its starting
                        // value at the end to obtain `delta`.
                        for (oldi = i, w = 1, k = base; index >= inputLength && error("invalid-input"), 
                        digit = basicToDigit(input.charCodeAt(index++)), (digit >= base || digit > floor((maxInt - i) / w)) && error("overflow"), 
                        i += digit * w, t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias, !(digit < t); k += base) baseMinusT = base - t, 
                        w > floor(maxInt / baseMinusT) && error("overflow"), w *= baseMinusT;
                        out = output.length + 1, bias = adapt(i - oldi, out, 0 == oldi), // `i` was supposed to wrap around from `out` to `0`,
                        // incrementing `n` each time, so we'll fix that now:
                        floor(i / out) > maxInt - n && error("overflow"), n += floor(i / out), i %= out, 
                        // Insert `n` at position `i` of the output
                        output.splice(i++, 0, n);
                    }
                    return ucs2encode(output);
                }
                /**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
                function encode(input) {
                    var n, delta, handledCPCount, basicLength, bias, j, m, q, k, t, currentValue, /** `inputLength` will hold the number of code points in `input`. */
                    inputLength, /** Cached calculation results */
                    handledCPCountPlusOne, baseMinusT, qMinusT, output = [];
                    // Handle the basic code points
                    for (// Convert the input in UCS-2 to Unicode
                    input = ucs2decode(input), // Cache the length
                    inputLength = input.length, // Initialize the state
                    n = initialN, delta = 0, bias = initialBias, j = 0; j < inputLength; ++j) currentValue = input[j], 
                    currentValue < 128 && output.push(stringFromCharCode(currentValue));
                    // Main encoding loop:
                    for (handledCPCount = basicLength = output.length, // `handledCPCount` is the number of code points that have been handled;
                    // `basicLength` is the number of basic code points.
                    // Finish the basic string - if it is not empty - with a delimiter
                    basicLength && output.push(delimiter); handledCPCount < inputLength; ) {
                        // All non-basic code points < n have been handled already. Find the next
                        // larger one:
                        for (m = maxInt, j = 0; j < inputLength; ++j) currentValue = input[j], currentValue >= n && currentValue < m && (m = currentValue);
                        for (// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
                        // but guard against overflow
                        handledCPCountPlusOne = handledCPCount + 1, m - n > floor((maxInt - delta) / handledCPCountPlusOne) && error("overflow"), 
                        delta += (m - n) * handledCPCountPlusOne, n = m, j = 0; j < inputLength; ++j) if (currentValue = input[j], 
                        currentValue < n && ++delta > maxInt && error("overflow"), currentValue == n) {
                            // Represent delta as a generalized variable-length integer
                            for (q = delta, k = base; t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias, 
                            !(q < t); k += base) qMinusT = q - t, baseMinusT = base - t, output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))), 
                            q = floor(qMinusT / baseMinusT);
                            output.push(stringFromCharCode(digitToBasic(q, 0))), bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength), 
                            delta = 0, ++handledCPCount;
                        }
                        ++delta, ++n;
                    }
                    return output.join("");
                }
                /**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
                function toUnicode(input) {
                    return mapDomain(input, function(string) {
                        return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
                    });
                }
                /**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
                function toASCII(input) {
                    return mapDomain(input, function(string) {
                        return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
                    });
                }
                /** Detect free variables */
                var freeGlobal = ("object" == typeof exports && exports && !exports.nodeType && exports, 
                "object" == typeof module && module && !module.nodeType && module, "object" == typeof global && global);
                freeGlobal.global !== freeGlobal && freeGlobal.window !== freeGlobal && freeGlobal.self !== freeGlobal || (root = freeGlobal);
                /**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
                var punycode, /** Highest positive signed 32-bit float value */
                maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1
                /** Bootstring parameters */
                base = 36, tMin = 1, tMax = 26, skew = 38, damp = 700, initialBias = 72, initialN = 128, // 0x80
                delimiter = "-", // '\x2D'
                /** Regular expressions */
                regexPunycode = /^xn--/, regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
                regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators
                /** Error messages */
                errors = {
                    overflow: "Overflow: input needs wider integers to process",
                    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                    "invalid-input": "Invalid input"
                }, /** Convenience shortcuts */
                baseMinusTMin = base - tMin, floor = Math.floor, stringFromCharCode = String.fromCharCode;
                /*--------------------------------------------------------------------------*/
                /** Define the public API */
                punycode = {
                    /**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
                    version: "1.3.2",
                    /**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
                    ucs2: {
                        decode: ucs2decode,
                        encode: ucs2encode
                    },
                    decode: decode,
                    encode: encode,
                    toASCII: toASCII,
                    toUnicode: toUnicode
                }, __WEBPACK_AMD_DEFINE_RESULT__ = function() {
                    return punycode;
                }.call(exports, __webpack_require__, exports, module), !(void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            }(this);
        }).call(exports, __webpack_require__(33)(module), function() {
            return this;
        }());
    }, /* 68 */
    /***/
    function(module, exports) {
        "use strict";
        module.exports = {
            isString: function(arg) {
                return "string" == typeof arg;
            },
            isObject: function(arg) {
                return "object" == typeof arg && null !== arg;
            },
            isNull: function(arg) {
                return null === arg;
            },
            isNullOrUndefined: function(arg) {
                return null == arg;
            }
        };
    }, /* 69 */
    /***/
    function(module, exports) {
        /* WEBPACK VAR INJECTION */
        (function(global) {
            /**
	 * Mark that a method should not be used.
	 * Returns a modified function which warns once by default.
	 *
	 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
	 *
	 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
	 * will throw an Error when invoked.
	 *
	 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
	 * will invoke `console.trace()` instead of `console.error()`.
	 *
	 * @param {Function} fn - the function to deprecate
	 * @param {String} msg - the string to print to the console when `fn` is invoked
	 * @returns {Function} a new "deprecated" version of `fn`
	 * @api public
	 */
            function deprecate(fn, msg) {
                function deprecated() {
                    if (!warned) {
                        if (config("throwDeprecation")) throw new Error(msg);
                        config("traceDeprecation") ? console.trace(msg) : console.warn(msg), warned = !0;
                    }
                    return fn.apply(this, arguments);
                }
                if (config("noDeprecation")) return fn;
                var warned = !1;
                return deprecated;
            }
            /**
	 * Checks `localStorage` for boolean values for the given `name`.
	 *
	 * @param {String} name
	 * @returns {Boolean}
	 * @api private
	 */
            function config(name) {
                // accessing global.localStorage can trigger a DOMException in sandboxed iframes
                try {
                    if (!global.localStorage) return !1;
                } catch (_) {
                    return !1;
                }
                var val = global.localStorage[name];
                return null != val && "true" === String(val).toLowerCase();
            }
            /**
	 * Module exports.
	 */
            module.exports = deprecate;
        }).call(exports, function() {
            return this;
        }());
    }, /* 70 */
    /***/
    function(module, exports) {
        "function" == typeof Object.create ? // implementation from standard node.js 'util' module
        module.exports = function(ctor, superCtor) {
            ctor.super_ = superCtor, ctor.prototype = Object.create(superCtor.prototype, {
                constructor: {
                    value: ctor,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            });
        } : // old school shim for old browsers
        module.exports = function(ctor, superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {};
            TempCtor.prototype = superCtor.prototype, ctor.prototype = new TempCtor(), ctor.prototype.constructor = ctor;
        };
    }, /* 71 */
    /***/
    function(module, exports) {
        module.exports = function(arg) {
            return arg && "object" == typeof arg && "function" == typeof arg.copy && "function" == typeof arg.fill && "function" == typeof arg.readUInt8;
        };
    }, /* 72 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */
        (function(global, process) {
            /**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
            /* legacy: obj, showHidden, depth, colors*/
            function inspect(obj, opts) {
                // default options
                var ctx = {
                    seen: [],
                    stylize: stylizeNoColor
                };
                // legacy...
                // legacy...
                // got an "options" object
                // set default options
                return arguments.length >= 3 && (ctx.depth = arguments[2]), arguments.length >= 4 && (ctx.colors = arguments[3]), 
                isBoolean(opts) ? ctx.showHidden = opts : opts && exports._extend(ctx, opts), isUndefined(ctx.showHidden) && (ctx.showHidden = !1), 
                isUndefined(ctx.depth) && (ctx.depth = 2), isUndefined(ctx.colors) && (ctx.colors = !1), 
                isUndefined(ctx.customInspect) && (ctx.customInspect = !0), ctx.colors && (ctx.stylize = stylizeWithColor), 
                formatValue(ctx, obj, ctx.depth);
            }
            function stylizeWithColor(str, styleType) {
                var style = inspect.styles[styleType];
                return style ? "[" + inspect.colors[style][0] + "m" + str + "[" + inspect.colors[style][1] + "m" : str;
            }
            function stylizeNoColor(str, styleType) {
                return str;
            }
            function arrayToHash(array) {
                var hash = {};
                return array.forEach(function(val, idx) {
                    hash[val] = !0;
                }), hash;
            }
            function formatValue(ctx, value, recurseTimes) {
                // Provide a hook for user-specified inspect functions.
                // Check that value is an object with an inspect function on it
                if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
                value.inspect !== exports.inspect && (!value.constructor || value.constructor.prototype !== value)) {
                    var ret = value.inspect(recurseTimes, ctx);
                    return isString(ret) || (ret = formatValue(ctx, ret, recurseTimes)), ret;
                }
                // Primitive types cannot have properties
                var primitive = formatPrimitive(ctx, value);
                if (primitive) return primitive;
                // Look up the keys of the object.
                var keys = Object.keys(value), visibleKeys = arrayToHash(keys);
                // IE doesn't make error fields non-enumerable
                // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
                if (ctx.showHidden && (keys = Object.getOwnPropertyNames(value)), isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) return formatError(value);
                // Some type of object without properties can be shortcutted.
                if (0 === keys.length) {
                    if (isFunction(value)) {
                        var name = value.name ? ": " + value.name : "";
                        return ctx.stylize("[Function" + name + "]", "special");
                    }
                    if (isRegExp(value)) return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
                    if (isDate(value)) return ctx.stylize(Date.prototype.toString.call(value), "date");
                    if (isError(value)) return formatError(value);
                }
                var base = "", array = !1, braces = [ "{", "}" ];
                // Make functions say that they are functions
                if (// Make Array say that they are Array
                isArray(value) && (array = !0, braces = [ "[", "]" ]), isFunction(value)) {
                    var n = value.name ? ": " + value.name : "";
                    base = " [Function" + n + "]";
                }
                if (// Make RegExps say that they are RegExps
                isRegExp(value) && (base = " " + RegExp.prototype.toString.call(value)), // Make dates with properties first say the date
                isDate(value) && (base = " " + Date.prototype.toUTCString.call(value)), // Make error with message first say the error
                isError(value) && (base = " " + formatError(value)), 0 === keys.length && (!array || 0 == value.length)) return braces[0] + base + braces[1];
                if (recurseTimes < 0) return isRegExp(value) ? ctx.stylize(RegExp.prototype.toString.call(value), "regexp") : ctx.stylize("[Object]", "special");
                ctx.seen.push(value);
                var output;
                return output = array ? formatArray(ctx, value, recurseTimes, visibleKeys, keys) : keys.map(function(key) {
                    return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
                }), ctx.seen.pop(), reduceToSingleString(output, base, braces);
            }
            function formatPrimitive(ctx, value) {
                if (isUndefined(value)) return ctx.stylize("undefined", "undefined");
                if (isString(value)) {
                    var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                    return ctx.stylize(simple, "string");
                }
                // For some reason typeof null is "object", so special case here.
                return isNumber(value) ? ctx.stylize("" + value, "number") : isBoolean(value) ? ctx.stylize("" + value, "boolean") : isNull(value) ? ctx.stylize("null", "null") : void 0;
            }
            function formatError(value) {
                return "[" + Error.prototype.toString.call(value) + "]";
            }
            function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
                for (var output = [], i = 0, l = value.length; i < l; ++i) hasOwnProperty(value, String(i)) ? output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), !0)) : output.push("");
                return keys.forEach(function(key) {
                    key.match(/^\d+$/) || output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, !0));
                }), output;
            }
            function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
                var name, str, desc;
                if (desc = Object.getOwnPropertyDescriptor(value, key) || {
                    value: value[key]
                }, desc.get ? str = desc.set ? ctx.stylize("[Getter/Setter]", "special") : ctx.stylize("[Getter]", "special") : desc.set && (str = ctx.stylize("[Setter]", "special")), 
                hasOwnProperty(visibleKeys, key) || (name = "[" + key + "]"), str || (ctx.seen.indexOf(desc.value) < 0 ? (str = isNull(recurseTimes) ? formatValue(ctx, desc.value, null) : formatValue(ctx, desc.value, recurseTimes - 1), 
                str.indexOf("\n") > -1 && (str = array ? str.split("\n").map(function(line) {
                    return "  " + line;
                }).join("\n").substr(2) : "\n" + str.split("\n").map(function(line) {
                    return "   " + line;
                }).join("\n"))) : str = ctx.stylize("[Circular]", "special")), isUndefined(name)) {
                    if (array && key.match(/^\d+$/)) return str;
                    name = JSON.stringify("" + key), name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (name = name.substr(1, name.length - 2), 
                    name = ctx.stylize(name, "name")) : (name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), 
                    name = ctx.stylize(name, "string"));
                }
                return name + ": " + str;
            }
            function reduceToSingleString(output, base, braces) {
                var numLinesEst = 0, length = output.reduce(function(prev, cur) {
                    return numLinesEst++, cur.indexOf("\n") >= 0 && numLinesEst++, prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
                }, 0);
                return length > 60 ? braces[0] + ("" === base ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1] : braces[0] + base + " " + output.join(", ") + " " + braces[1];
            }
            // NOTE: These type checking functions intentionally don't use `instanceof`
            // because it is fragile and can be easily faked with `Object.create()`.
            function isArray(ar) {
                return Array.isArray(ar);
            }
            function isBoolean(arg) {
                return "boolean" == typeof arg;
            }
            function isNull(arg) {
                return null === arg;
            }
            function isNullOrUndefined(arg) {
                return null == arg;
            }
            function isNumber(arg) {
                return "number" == typeof arg;
            }
            function isString(arg) {
                return "string" == typeof arg;
            }
            function isSymbol(arg) {
                return "symbol" == typeof arg;
            }
            function isUndefined(arg) {
                return void 0 === arg;
            }
            function isRegExp(re) {
                return isObject(re) && "[object RegExp]" === objectToString(re);
            }
            function isObject(arg) {
                return "object" == typeof arg && null !== arg;
            }
            function isDate(d) {
                return isObject(d) && "[object Date]" === objectToString(d);
            }
            function isError(e) {
                return isObject(e) && ("[object Error]" === objectToString(e) || e instanceof Error);
            }
            function isFunction(arg) {
                return "function" == typeof arg;
            }
            function isPrimitive(arg) {
                // ES6 symbol
                return null === arg || "boolean" == typeof arg || "number" == typeof arg || "string" == typeof arg || "symbol" == typeof arg || "undefined" == typeof arg;
            }
            function objectToString(o) {
                return Object.prototype.toString.call(o);
            }
            function pad(n) {
                return n < 10 ? "0" + n.toString(10) : n.toString(10);
            }
            // 26 Feb 16:19:34
            function timestamp() {
                var d = new Date(), time = [ pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds()) ].join(":");
                return [ d.getDate(), months[d.getMonth()], time ].join(" ");
            }
            function hasOwnProperty(obj, prop) {
                return Object.prototype.hasOwnProperty.call(obj, prop);
            }
            // Copyright Joyent, Inc. and other Node contributors.
            //
            // Permission is hereby granted, free of charge, to any person obtaining a
            // copy of this software and associated documentation files (the
            // "Software"), to deal in the Software without restriction, including
            // without limitation the rights to use, copy, modify, merge, publish,
            // distribute, sublicense, and/or sell copies of the Software, and to permit
            // persons to whom the Software is furnished to do so, subject to the
            // following conditions:
            //
            // The above copyright notice and this permission notice shall be included
            // in all copies or substantial portions of the Software.
            //
            // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
            // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
            // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
            // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
            // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
            // USE OR OTHER DEALINGS IN THE SOFTWARE.
            var formatRegExp = /%[sdj%]/g;
            exports.format = function(f) {
                if (!isString(f)) {
                    for (var objects = [], i = 0; i < arguments.length; i++) objects.push(inspect(arguments[i]));
                    return objects.join(" ");
                }
                for (var i = 1, args = arguments, len = args.length, str = String(f).replace(formatRegExp, function(x) {
                    if ("%%" === x) return "%";
                    if (i >= len) return x;
                    switch (x) {
                      case "%s":
                        return String(args[i++]);

                      case "%d":
                        return Number(args[i++]);

                      case "%j":
                        try {
                            return JSON.stringify(args[i++]);
                        } catch (_) {
                            return "[Circular]";
                        }

                      default:
                        return x;
                    }
                }), x = args[i]; i < len; x = args[++i]) str += isNull(x) || !isObject(x) ? " " + x : " " + inspect(x);
                return str;
            }, // Mark that a method should not be used.
            // Returns a modified function which warns once by default.
            // If --no-deprecation is set, then it is a no-op.
            exports.deprecate = function(fn, msg) {
                function deprecated() {
                    if (!warned) {
                        if (process.throwDeprecation) throw new Error(msg);
                        process.traceDeprecation ? console.trace(msg) : console.error(msg), warned = !0;
                    }
                    return fn.apply(this, arguments);
                }
                // Allow for deprecating things in the process of starting up.
                if (isUndefined(global.process)) return function() {
                    return exports.deprecate(fn, msg).apply(this, arguments);
                };
                if (process.noDeprecation === !0) return fn;
                var warned = !1;
                return deprecated;
            };
            var debugEnviron, debugs = {};
            exports.debuglog = function(set) {
                if (isUndefined(debugEnviron) && (debugEnviron = {
                    NODE_ENV: "production"
                }.NODE_DEBUG || ""), set = set.toUpperCase(), !debugs[set]) if (new RegExp("\\b" + set + "\\b", "i").test(debugEnviron)) {
                    var pid = process.pid;
                    debugs[set] = function() {
                        var msg = exports.format.apply(exports, arguments);
                        console.error("%s %d: %s", set, pid, msg);
                    };
                } else debugs[set] = function() {};
                return debugs[set];
            }, exports.inspect = inspect, // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
            inspect.colors = {
                bold: [ 1, 22 ],
                italic: [ 3, 23 ],
                underline: [ 4, 24 ],
                inverse: [ 7, 27 ],
                white: [ 37, 39 ],
                grey: [ 90, 39 ],
                black: [ 30, 39 ],
                blue: [ 34, 39 ],
                cyan: [ 36, 39 ],
                green: [ 32, 39 ],
                magenta: [ 35, 39 ],
                red: [ 31, 39 ],
                yellow: [ 33, 39 ]
            }, // Don't use 'blue' not visible on cmd.exe
            inspect.styles = {
                special: "cyan",
                number: "yellow",
                boolean: "yellow",
                undefined: "grey",
                null: "bold",
                string: "green",
                date: "magenta",
                // "name": intentionally not styling
                regexp: "red"
            }, exports.isArray = isArray, exports.isBoolean = isBoolean, exports.isNull = isNull, 
            exports.isNullOrUndefined = isNullOrUndefined, exports.isNumber = isNumber, exports.isString = isString, 
            exports.isSymbol = isSymbol, exports.isUndefined = isUndefined, exports.isRegExp = isRegExp, 
            exports.isObject = isObject, exports.isDate = isDate, exports.isError = isError, 
            exports.isFunction = isFunction, exports.isPrimitive = isPrimitive, exports.isBuffer = __webpack_require__(71);
            var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
            // log is just a thin wrapper to console.log that prepends a timestamp
            exports.log = function() {
                console.log("%s - %s", timestamp(), exports.format.apply(exports, arguments));
            }, /**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
            exports.inherits = __webpack_require__(70), exports._extend = function(origin, add) {
                // Don't do anything if add isn't an object
                if (!add || !isObject(add)) return origin;
                for (var keys = Object.keys(add), i = keys.length; i--; ) origin[keys[i]] = add[keys[i]];
                return origin;
            };
        }).call(exports, function() {
            return this;
        }(), __webpack_require__(1));
    }, /* 73 */
    /***/
    function(module, exports) {
        !function(self) {
            "use strict";
            function normalizeName(name) {
                if ("string" != typeof name && (name = String(name)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) throw new TypeError("Invalid character in header field name");
                return name.toLowerCase();
            }
            function normalizeValue(value) {
                return "string" != typeof value && (value = String(value)), value;
            }
            // Build a destructive iterator for the value list
            function iteratorFor(items) {
                var iterator = {
                    next: function() {
                        var value = items.shift();
                        return {
                            done: void 0 === value,
                            value: value
                        };
                    }
                };
                return support.iterable && (iterator[Symbol.iterator] = function() {
                    return iterator;
                }), iterator;
            }
            function Headers(headers) {
                this.map = {}, headers instanceof Headers ? headers.forEach(function(value, name) {
                    this.append(name, value);
                }, this) : headers && Object.getOwnPropertyNames(headers).forEach(function(name) {
                    this.append(name, headers[name]);
                }, this);
            }
            function consumed(body) {
                return body.bodyUsed ? Promise.reject(new TypeError("Already read")) : void (body.bodyUsed = !0);
            }
            function fileReaderReady(reader) {
                return new Promise(function(resolve, reject) {
                    reader.onload = function() {
                        resolve(reader.result);
                    }, reader.onerror = function() {
                        reject(reader.error);
                    };
                });
            }
            function readBlobAsArrayBuffer(blob) {
                var reader = new FileReader();
                return reader.readAsArrayBuffer(blob), fileReaderReady(reader);
            }
            function readBlobAsText(blob) {
                var reader = new FileReader();
                return reader.readAsText(blob), fileReaderReady(reader);
            }
            function Body() {
                return this.bodyUsed = !1, this._initBody = function(body) {
                    if (this._bodyInit = body, "string" == typeof body) this._bodyText = body; else if (support.blob && Blob.prototype.isPrototypeOf(body)) this._bodyBlob = body; else if (support.formData && FormData.prototype.isPrototypeOf(body)) this._bodyFormData = body; else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) this._bodyText = body.toString(); else if (body) {
                        if (!support.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(body)) throw new Error("unsupported BodyInit type");
                    } else this._bodyText = "";
                    this.headers.get("content-type") || ("string" == typeof body ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : support.searchParams && URLSearchParams.prototype.isPrototypeOf(body) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
                }, support.blob ? (this.blob = function() {
                    var rejected = consumed(this);
                    if (rejected) return rejected;
                    if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                    if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                    return Promise.resolve(new Blob([ this._bodyText ]));
                }, this.arrayBuffer = function() {
                    return this.blob().then(readBlobAsArrayBuffer);
                }, this.text = function() {
                    var rejected = consumed(this);
                    if (rejected) return rejected;
                    if (this._bodyBlob) return readBlobAsText(this._bodyBlob);
                    if (this._bodyFormData) throw new Error("could not read FormData body as text");
                    return Promise.resolve(this._bodyText);
                }) : this.text = function() {
                    var rejected = consumed(this);
                    return rejected ? rejected : Promise.resolve(this._bodyText);
                }, support.formData && (this.formData = function() {
                    return this.text().then(decode);
                }), this.json = function() {
                    return this.text().then(JSON.parse);
                }, this;
            }
            function normalizeMethod(method) {
                var upcased = method.toUpperCase();
                return methods.indexOf(upcased) > -1 ? upcased : method;
            }
            function Request(input, options) {
                options = options || {};
                var body = options.body;
                if (Request.prototype.isPrototypeOf(input)) {
                    if (input.bodyUsed) throw new TypeError("Already read");
                    this.url = input.url, this.credentials = input.credentials, options.headers || (this.headers = new Headers(input.headers)), 
                    this.method = input.method, this.mode = input.mode, body || (body = input._bodyInit, 
                    input.bodyUsed = !0);
                } else this.url = input;
                if (this.credentials = options.credentials || this.credentials || "omit", !options.headers && this.headers || (this.headers = new Headers(options.headers)), 
                this.method = normalizeMethod(options.method || this.method || "GET"), this.mode = options.mode || this.mode || null, 
                this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && body) throw new TypeError("Body not allowed for GET or HEAD requests");
                this._initBody(body);
            }
            function decode(body) {
                var form = new FormData();
                return body.trim().split("&").forEach(function(bytes) {
                    if (bytes) {
                        var split = bytes.split("="), name = split.shift().replace(/\+/g, " "), value = split.join("=").replace(/\+/g, " ");
                        form.append(decodeURIComponent(name), decodeURIComponent(value));
                    }
                }), form;
            }
            function headers(xhr) {
                var head = new Headers(), pairs = (xhr.getAllResponseHeaders() || "").trim().split("\n");
                return pairs.forEach(function(header) {
                    var split = header.trim().split(":"), key = split.shift().trim(), value = split.join(":").trim();
                    head.append(key, value);
                }), head;
            }
            function Response(bodyInit, options) {
                options || (options = {}), this.type = "default", this.status = options.status, 
                this.ok = this.status >= 200 && this.status < 300, this.statusText = options.statusText, 
                this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers), 
                this.url = options.url || "", this._initBody(bodyInit);
            }
            if (!self.fetch) {
                var support = {
                    searchParams: "URLSearchParams" in self,
                    iterable: "Symbol" in self && "iterator" in Symbol,
                    blob: "FileReader" in self && "Blob" in self && function() {
                        try {
                            return new Blob(), !0;
                        } catch (e) {
                            return !1;
                        }
                    }(),
                    formData: "FormData" in self,
                    arrayBuffer: "ArrayBuffer" in self
                };
                Headers.prototype.append = function(name, value) {
                    name = normalizeName(name), value = normalizeValue(value);
                    var list = this.map[name];
                    list || (list = [], this.map[name] = list), list.push(value);
                }, Headers.prototype.delete = function(name) {
                    delete this.map[normalizeName(name)];
                }, Headers.prototype.get = function(name) {
                    var values = this.map[normalizeName(name)];
                    return values ? values[0] : null;
                }, Headers.prototype.getAll = function(name) {
                    return this.map[normalizeName(name)] || [];
                }, Headers.prototype.has = function(name) {
                    return this.map.hasOwnProperty(normalizeName(name));
                }, Headers.prototype.set = function(name, value) {
                    this.map[normalizeName(name)] = [ normalizeValue(value) ];
                }, Headers.prototype.forEach = function(callback, thisArg) {
                    Object.getOwnPropertyNames(this.map).forEach(function(name) {
                        this.map[name].forEach(function(value) {
                            callback.call(thisArg, value, name, this);
                        }, this);
                    }, this);
                }, Headers.prototype.keys = function() {
                    var items = [];
                    return this.forEach(function(value, name) {
                        items.push(name);
                    }), iteratorFor(items);
                }, Headers.prototype.values = function() {
                    var items = [];
                    return this.forEach(function(value) {
                        items.push(value);
                    }), iteratorFor(items);
                }, Headers.prototype.entries = function() {
                    var items = [];
                    return this.forEach(function(value, name) {
                        items.push([ name, value ]);
                    }), iteratorFor(items);
                }, support.iterable && (Headers.prototype[Symbol.iterator] = Headers.prototype.entries);
                // HTTP methods whose capitalization should be normalized
                var methods = [ "DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT" ];
                Request.prototype.clone = function() {
                    return new Request(this);
                }, Body.call(Request.prototype), Body.call(Response.prototype), Response.prototype.clone = function() {
                    return new Response(this._bodyInit, {
                        status: this.status,
                        statusText: this.statusText,
                        headers: new Headers(this.headers),
                        url: this.url
                    });
                }, Response.error = function() {
                    var response = new Response(null, {
                        status: 0,
                        statusText: ""
                    });
                    return response.type = "error", response;
                };
                var redirectStatuses = [ 301, 302, 303, 307, 308 ];
                Response.redirect = function(url, status) {
                    if (redirectStatuses.indexOf(status) === -1) throw new RangeError("Invalid status code");
                    return new Response(null, {
                        status: status,
                        headers: {
                            location: url
                        }
                    });
                }, self.Headers = Headers, self.Request = Request, self.Response = Response, self.fetch = function(input, init) {
                    return new Promise(function(resolve, reject) {
                        function responseURL() {
                            // Avoid security warnings on getResponseHeader when not allowed by CORS
                            return "responseURL" in xhr ? xhr.responseURL : /^X-Request-URL:/m.test(xhr.getAllResponseHeaders()) ? xhr.getResponseHeader("X-Request-URL") : void 0;
                        }
                        var request;
                        request = Request.prototype.isPrototypeOf(input) && !init ? input : new Request(input, init);
                        var xhr = new XMLHttpRequest();
                        xhr.onload = function() {
                            var options = {
                                status: xhr.status,
                                statusText: xhr.statusText,
                                headers: headers(xhr),
                                url: responseURL()
                            }, body = "response" in xhr ? xhr.response : xhr.responseText;
                            resolve(new Response(body, options));
                        }, xhr.onerror = function() {
                            reject(new TypeError("Network request failed"));
                        }, xhr.ontimeout = function() {
                            reject(new TypeError("Network request failed"));
                        }, xhr.open(request.method, request.url, !0), "include" === request.credentials && (xhr.withCredentials = !0), 
                        "responseType" in xhr && support.blob && (xhr.responseType = "blob"), request.headers.forEach(function(value, name) {
                            xhr.setRequestHeader(name, value);
                        }), xhr.send("undefined" == typeof request._bodyInit ? null : request._bodyInit);
                    });
                }, self.fetch.polyfill = !0;
            }
        }("undefined" != typeof self ? self : this);
    }, /* 74 */
    /***/
    function(module, exports) {
        function extend() {
            for (var target = {}, i = 0; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }
        module.exports = extend;
        var hasOwnProperty = Object.prototype.hasOwnProperty;
    }, /* 75 */
    /***/
    function(module, exports) {}, /* 76 */
    /***/
    function(module, exports) {} ]);
});
//# sourceMappingURL=fuhub-client.js.map