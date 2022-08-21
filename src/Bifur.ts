import Builder from "./Worker/Builder.js";
import PersistentWrapper from "./Worker/PersistentWrapper.js";
import Wrapper from "./Worker/Wrapper.js";

/** Class allowing asynchronous functionality via a Worker. */
export default class Bifur {
    /**
     * Run the supplied function with the supplied arguments asynchronously.
     * @param fnc {Function} The function to be run asynchronously.
     * @param args {Array} The arguments to pass to the function.
     * @returns {Promise} The promise that resolves once the function has completed.
     */
    static run(fnc: Function, args: Array<any>): Function {
        const worker = Builder.build(window, fnc);
        const wrapper: Function = Wrapper.wrap(worker);
        const result = wrapper(args);
        return result;
    }

    /**
     * Create a persistent worker wrapped in a class allowing the user to run 
     * a function asynchronously, and even store a state within the function.
     * @param fnc {Function} The function to be run asynchronously.
     * @returns {PersistentWrapper} An instance of the class PersistentWrapper.
     */
    static persist(fnc: Function): PersistentWrapper {
        const worker = Builder.build(window, fnc);
        const wrapper: PersistentWrapper = new PersistentWrapper(worker);
        return wrapper;
    }
}