import Builder from "./Worker/Builder";
import Wrapper from "./Worker/Wrapper";
/** Class allowing asynchronous functionality via a Worker. */
export default class Bifur {
    /**
     * Run the supplied function with the supplied arguments asynchronously.
     * @param fnc {Function} The function to be run asynchronously.
     * @param args {Array} The arguments to pass to the function.
     * @returns {Promise} The promise that resolves once the function has completed.
     */
    static run(fnc, args) {
        const worker = Builder.build(window, fnc);
        const wrapper = Wrapper.wrap(worker);
        const result = wrapper(args);
        return result;
    }
}
//# sourceMappingURL=Bifur.js.map