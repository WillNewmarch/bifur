import generateUUID from '../Helpers/generateUUID.js';

/** Class used to create a wrapper function for a Worker. */
export default class Wrapper {
    /**
     * Wrap a Worker into a function returning a Promise, resolving when the Worker has responded.
     * @param worker {Worker} The worker to be wrapped.
     * @returns {Function} A function that returns a Promise, resolving when the Worker responds.
     */
    static wrap(worker: Worker): Function {
        return (input : Array<any>) => {
            return new Promise((resolve,reject) => {
                const requestId: string = generateUUID();
                worker.onmessage = (event) => {
                    if(event.data.requestId === requestId) {
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
        }
    }
}