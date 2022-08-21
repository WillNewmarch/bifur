import Bifur from './../dist/Bifur';

describe('Bifur', () => {

    test('constructs', () => {
        const bifur = new Bifur();
        expect(bifur.constructor.name).toEqual('Bifur');
    });

    test('offers static function \'run\'', () => {
        const bifur = new Bifur();
        expect(typeof Bifur.run).toEqual('function');
    });

});