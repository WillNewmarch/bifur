(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Bifur"] = factory();
	else
		root["Bifur"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Bifur)
});

;// CONCATENATED MODULE: ./src/Worker/Builder.ts
/** Class used for building Worker instances. */
class Builder {
    /**
     * Build an instance of Worker containing function supplied.
     * @param window {Window} The relative Window object.
     * @param fnc {Function} Function to run inside the Worker.
     * @returns {Worker} The Worker instance.
     */
    static build(window, fnc) {
        const blob = Builder.generateBlob(fnc);
        const blobUrl = window.URL.createObjectURL(blob);
        return new Worker(blobUrl);
    }
    /**
     * Compose the content intended for the Worker's Blob.
     * @param fnc {Function} The function to be run inside the Worker.
     * @returns {string} The intended content for a Blob.
     */
    static generateBlobContent(fnc) {
        return `
            self.onmessage = function(m) {
                const requestId = m.data.requestId;
                const output = (${fnc.toString()})(...m.data.input); 
                self.postMessage({ requestId, output });
            };
        `;
    }
    /**
     * Generate a Blob in order to construct the Worker.
     * @param fnc {Function} The function to be run inside the Worker.
     * @returns {Blob} The Blob used to construct the Worker.
     */
    static generateBlob(fnc) {
        const blobContent = Builder.generateBlobContent(fnc);
        return new Blob([blobContent], { type: 'application/javascript' });
    }
}

;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/rng.js
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/regex.js
/* harmony default export */ const regex = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/validate.js


function validate(uuid) {
  return typeof uuid === 'string' && regex.test(uuid);
}

/* harmony default export */ const esm_browser_validate = (validate);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/stringify.js

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!esm_browser_validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const esm_browser_stringify = (stringify);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v4.js



function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return esm_browser_stringify(rnds);
}

/* harmony default export */ const esm_browser_v4 = (v4);
;// CONCATENATED MODULE: ./src/Worker/Wrapper.ts

/** Class used to create a wrapper function for a Worker. */
class Wrapper {
    /**
     * Wrap a Worker into a function returning a Promise, resolving when the Worker has responded.
     * @param worker {Worker} The worker to be wrapped.
     * @returns {Function} A function that returns a Promise, resolving when the Worker responds.
     */
    static wrap(worker) {
        return (input) => {
            return new Promise((resolve, reject) => {
                const requestId = esm_browser_v4();
                worker.onmessage = (event) => {
                    if (event.data.requestId === requestId) {
                        resolve(event.data.output);
                    }
                };
                worker.onmessageerror = (event) => {
                    reject(event);
                };
                worker.onerror = (event) => {
                    reject(event);
                };
                worker.postMessage({ requestId, input });
            });
        };
    }
}

;// CONCATENATED MODULE: ./src/Bifur.ts


/** Class allowing asynchronous functionality via a Worker. */
class Bifur {
    /**
     * Run the supplied function with the supplied arguments asynchronously.
     * @param fnc {Function} The function to be run asynchronously.
     * @param args {Array} The arguments to pass to the function.
     * @returns {Promise} The promise that resolves once the function has completed.
     */
    static run(fnc, args) {
        const worker = Builder.build(window, fnc);
        const wrapper = Wrapper.wrap(worker);
        return wrapper(args);
    }
}

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map