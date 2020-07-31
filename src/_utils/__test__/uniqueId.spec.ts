import { uniqueId } from '../uniqueId';

describe('utils/uniquedId', () => {
    it('should return uuid as prefix with none param input.', () => {
        expect(uniqueId()).toBe('uuid-1');
    });

    it('should auto increase', () => {
        expect(uniqueId()).toBe('uuid-2');
    });

    it('should increase correctly with uuid prefix', () => {
        expect(uniqueId('uuid')).toBe('uuid-3');
    });

    it('start index for each prefix should be 1', () => {
        expect(uniqueId('some')).toBe('some-1');
    });

    it('custom prefix should auto increase', () => {
        expect(uniqueId('some')).toBe('some-2');
    });
});
