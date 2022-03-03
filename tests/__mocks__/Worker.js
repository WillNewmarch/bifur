export default class Worker {
    constructor(onmessage = () => {}) {
        // Note that `onmessage` should be overwritten by the code using the worker.
        this.onmessage = onmessage;
    }
  
    postMessage(data) {
        this.onmessage({ data: data });
    }
}