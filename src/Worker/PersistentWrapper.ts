import generateUUID from '../Helpers/generateUUID.js';

// A request has a unique ID, a resolve function, and a reject function.
interface Request {
    requestId: string;
    resolve: Function;
    reject: Function;
}

/** Class used to create a persistent wrapper function for a Worker. */
export default class PersistentWrapper {
    // The worker within the persistent wrapper.
    worker: Worker;

    // Array of requests currently being processed by the worker.
    requests: Request[];

    constructor(worker: Worker) {
        this.requests = [];
        this.worker = worker;
        this.worker.onmessage = e => this.resolveRequest(e);
        this.worker.onmessageerror = e => this.rejectRequest(e);
        this.worker.onerror = e => this.rejectRequest(e);
    }

    /**
     * Get the request respective of the response from the worker.
     * @param event the MessageEvent from the worker.
     * @returns {Request}
     */
    getRequest(event: MessageEvent): Request {
        const request = this.requests.find(r => event.data.requestId === r.requestId);
        if(request) {
            const requestIndex = this.requests.indexOf(request);
            this.requests.splice(requestIndex,1);
            return request;
        }
        console.error('Could not find request:', event.data.requestId, event);
    }

    /**
     * Run the respective request's resolve function
     * and pass it the data returned from the worker.
     * @param event the MessageEvent from the worker.
     */
    resolveRequest(event: MessageEvent) {
        const request = this.getRequest(event);
        request.resolve(event.data.output);
    }

    /**
     * Run the respective request's reject function
     * and pass it the event from the worker.
     * @param event the MessageEvent from the worker.
     */
    rejectRequest(event) {
        const request = this.getRequest(event);
        request.reject(event);
    }

    /**
     * Runs the worker function and returns a promise to await for results.
     * @param input an array of arguments intended for the worker function.
     * @returns {Promise} that resolves (or rejects) when the function completes.
     */
    run(input: Array<any>) {
        const requestId: string = generateUUID();
        return new Promise((resolve, reject) => {
            this.requests.push({
                requestId,
                resolve,
                reject
            });
            this.worker.postMessage({ requestId, input });
        });
    }

    /**
     * Teardown the PersistentWorker, terminating the worker and 
     * removing any references to the previous requests.
     */
    teardown() {
        this.worker.terminate();
        this.requests = [];
    }
}