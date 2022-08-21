import Wrapper from './../../dist/Worker/Wrapper';
import Worker from './../__mocks__/Worker';

describe('Worker/Wrapper', () => {

    test('generates wrapper function', () => {
        const mockedWorker = new Worker();
        const wrapper = Wrapper.wrap(mockedWorker);
        expect(typeof wrapper).toEqual('function');
    });

    test('generates wrapper function that returns promise', () => {
        const mockedWorker = new Worker();
        const wrapper = Wrapper.wrap(mockedWorker);
        const result = wrapper();
        expect(result.constructor.name).toEqual('Promise');
    });

});