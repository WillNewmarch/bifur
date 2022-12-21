import Builder from './../../dist/Worker/Builder';

describe('Worker/Builder', () => {

    test('generates blob content as expected', () => {
        const fn = function(a,b) {
            return a+b;
        }
        const expectedBlobContent = `
            self.onmessage = function(m) {
                const requestId = m.data.requestId;
                const output = (${fn.toString()})(...m.data.input); 
                self.postMessage({ requestId, output });
            };
        `;
        const result = Builder.generateBlobContent(fn);
        expect(result).toEqual(expectedBlobContent);
    });

});