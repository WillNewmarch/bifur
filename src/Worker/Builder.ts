/** Class used for building Worker instances. */
export default class Builder {
    /**
     * Build an instance of Worker containing function supplied.
     * @param window {Window} The relative Window object.
     * @param fnc {Function} Function to run inside the Worker.
     * @returns {Worker} The Worker instance.
     */
    static build(window, fnc: Function): Worker {
        const blob = Builder.generateBlob(fnc);
        const blobUrl = window.URL.createObjectURL(blob);
        return new Worker(blobUrl);
    }
    
    /**
     * Compose the content intended for the Worker's Blob.
     * @param fnc {Function} The function to be run inside the Worker.
     * @returns {string} The intended content for a Blob.
     */    
    static generateBlobContent(fnc: Function): string {
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
    static generateBlob(fnc: Function): Blob {
        const blobContent: string = Builder.generateBlobContent(fnc);
        return new Blob([ blobContent ], { type: 'application/javascript' }); 
    }
}