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

;// CONCATENATED MODULE: ./src/Helpers/generateUUID.ts
function generateUUID() {
    let d = new Date().getTime();
    let d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        }
        else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
}
;

;// CONCATENATED MODULE: ./src/Worker/PersistentWrapper.ts

/** Class used to create a persistent wrapper function for a Worker. */
class PersistentWrapper {
    constructor(worker) {
        this.requests = [];
        this.worker = worker;
        this.setup();
    }
    setup() {
        this.worker.onmessage = e => this.resolveRequest(e);
        this.worker.onmessageerror = e => this.rejectRequest(e);
        this.worker.onerror = e => this.rejectRequest(e);
    }
    getRequest(event) {
        const request = this.requests.find(r => event.data.requestId === r.requestId);
        if (request) {
            return request;
        }
        console.error('Could not find request:', event.data.requestId, event);
    }
    resolveRequest(event) {
        const request = this.getRequest(event);
        request.resolve(event.data.output);
    }
    rejectRequest(event) {
        const request = this.getRequest(event);
        request.reject(event);
    }
    run(input) {
        const requestId = generateUUID();
        return new Promise((resolve, reject) => {
            this.requests.push({
                requestId,
                resolve,
                reject
            });
            this.worker.postMessage({ requestId, input });
        });
    }
    teardown() {
        this.worker.terminate();
    }
}

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
                const requestId = generateUUID();
                worker.onmessage = (event) => {
                    if (event.data.requestId === requestId) {
                        resolve(event.data.output);
                        worker.terminate();
                    }
                };
                worker.onmessageerror = (event) => {
                    reject(event);
                    worker.terminate();
                };
                worker.onerror = (event) => {
                    reject(event);
                    worker.terminate();
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
        console.log('worker', worker);
        const wrapper = Wrapper.wrap(worker);
        const result = wrapper(args);
        return result;
    }
    static generatePersistentFunction(fnc) {
        const worker = Builder.build(window, fnc);
        console.log('worker', worker);
        const wrapper = new PersistentWrapper(worker);
        return wrapper;
    }
}

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map