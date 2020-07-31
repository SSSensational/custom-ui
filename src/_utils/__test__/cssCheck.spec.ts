import { isLegalCSSLengthUnit, isLegalCSSColor } from '../cssCheck';

describe('utils/isLegalCSSLengthUnit', () => {
    it('should return true with number', () => {
        expect(isLegalCSSLengthUnit(3)).toBe(true);
    });

    it('should return true with legal string', () => {
        expect(isLegalCSSLengthUnit('3px')).toBe(true);
        expect(isLegalCSSLengthUnit('3em')).toBe(true);
        expect(isLegalCSSLengthUnit('3rem')).toBe(true);
        expect(isLegalCSSLengthUnit('3vw')).toBe(true);
        expect(isLegalCSSLengthUnit('3vh')).toBe(true);
        expect(isLegalCSSLengthUnit('3%')).toBe(true);
        expect(isLegalCSSLengthUnit('3%')).toBe(true);
        expect(isLegalCSSLengthUnit('inherit')).toBe(true);
        expect(isLegalCSSLengthUnit('initial')).toBe(true);
    });

    it('should return false with only legal unit', () => {
        expect(isLegalCSSLengthUnit('px')).toBe(false);
        expect(isLegalCSSLengthUnit('em')).toBe(false);
        expect(isLegalCSSLengthUnit('rem')).toBe(false);
        expect(isLegalCSSLengthUnit('vw')).toBe(false);
        expect(isLegalCSSLengthUnit('vh')).toBe(false);
        expect(isLegalCSSLengthUnit('%')).toBe(false);
    });

    it('should return false with illegal string', () => {
        expect(isLegalCSSLengthUnit('3')).toBe(false);
        expect(isLegalCSSLengthUnit('a3px')).toBe(false);
        expect(isLegalCSSLengthUnit('3pxa')).toBe(false);
        expect(isLegalCSSLengthUnit('3-3px')).toBe(false);
        expect(isLegalCSSLengthUnit('')).toBe(false);
    });

    it('should return false with other typeof input', () => {
        expect(isLegalCSSLengthUnit(true)).toBe(false);
        expect(isLegalCSSLengthUnit(null)).toBe(false);
        expect(isLegalCSSLengthUnit(undefined)).toBe(false);
        expect(isLegalCSSLengthUnit(BigInt(234))).toBe(false);
        expect(isLegalCSSLengthUnit({})).toBe(false);
        expect(isLegalCSSLengthUnit(Symbol())).toBe(false);
    });
});

describe('Test isLegalCSSLengthUnit', () => {
    it('should return true with legal string', () => {
        expect(isLegalCSSColor('#333')).toBe(true);
        expect(isLegalCSSColor('#333333')).toBe(true);
        expect(isLegalCSSColor('red')).toBe(true);
        expect(isLegalCSSColor('rgb(0, 0, 0)')).toBe(true);
        expect(isLegalCSSColor('rgba(0, 0, 0, 0)')).toBe(true);
        expect(isLegalCSSColor('hsl(0, 0%, 0%)')).toBe(true);
        expect(isLegalCSSColor('hsla(0, 0%, 0%, 0)')).toBe(true);
        expect(isLegalCSSColor('inherit')).toBe(true);
        expect(isLegalCSSColor('initial')).toBe(true);
    });
  
    it('should return false only legal unit', () => {
        expect(isLegalCSSColor('#3')).toBe(false);
        expect(isLegalCSSColor('#3333')).toBe(false);
        expect(isLegalCSSColor('333333')).toBe(false);
        expect(isLegalCSSColor('asfd')).toBe(false);
        expect(isLegalCSSColor('rg(0, 0, 0)')).toBe(false);
        expect(isLegalCSSColor('rgb(a, 0, 0)')).toBe(false);
        expect(isLegalCSSColor('hsl(0, 0, 0)')).toBe(false);
        expect(isLegalCSSColor('hsl(361, 0%, 0%)')).toBe(false);
        expect(isLegalCSSColor('hsl(0, 101%, 0%)')).toBe(false);
        expect(isLegalCSSColor('')).toBe(false);
    });
  
    it('should return false with other typeof input', () => {
        expect(isLegalCSSColor(true)).toBe(false);
        expect(isLegalCSSColor(null)).toBe(false);
        expect(isLegalCSSColor(undefined)).toBe(false);
        expect(isLegalCSSColor(BigInt(234))).toBe(false);
        expect(isLegalCSSColor({})).toBe(false);
        expect(isLegalCSSColor(Symbol())).toBe(false);
    });
});
  