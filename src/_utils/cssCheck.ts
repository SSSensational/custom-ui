
const CSSLengthUnit = ['px', 'em', 'rem', 'vw', 'vh', '%'];
/**
 * Check whether the value is a legal css length unit.
 */
export function isLegalCSSLengthUnit(value: any) {
    if (typeof value === 'number') return true;
    if (typeof value !== 'string') return false;
    if (value === 'inherit' || value === 'initial') return true;
    if (isNaN(parseFloat(value))) return false;
    for (let i = 0, len = CSSLengthUnit.length; i < len; i++)
        if (value.endsWith(CSSLengthUnit[i]) && !isNaN(+value.slice(0, value.length - CSSLengthUnit[i].length))) return true;
    return false;
}

const CSSColorReg1 = /^#([a-f0-9]{6}|[a-f0-9]{3})\b$/;
const CSSColorReg2 = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
const CSSColorReg3 = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)$/;
const CSSColorReg4 = /^hsl\((36[0-0]|2[0-9][0-9]|[0-1]?[0-9]?[0-9]),\s*([1-9]?\d|100)%,\s*([1-9]?\d|100)%\)$/;
const CSSColorReg5 = /^hsla\((36[0-0]|2[0-9][0-9]|[0-1]?[0-9]?[0-9]),\s*([1-9]?\d|100)%,\s*([1-9]?\d|100)%,\s*(\d*(?:\.\d+)?)\)$/;
const CSSColorReg6 = /^linear-gradient\([^(]*(\([^)]*\)[^(]*)*[^)]*\)$/;
const CSSColorReg7 = /^radial-gradient\([^(]*(\([^)]*\)[^(]*)*[^)]*\)$/;
const CSSColorReg8 = {
    'aliceblue': 1, 'antiquewhite': 1, 'aqua': 1, 'aquamarine': 1, 'azure': 1,
    'beige': 1, 'bisque': 1, 'black': 1, 'blanchedalmond': 1, 'blue': 1, 'blueviolet': 1, 'brown': 1, 'burlywood': 1,
    'cadetblue': 1, 'chartreuse': 1, 'chocolate': 1, 'coral': 1, 'cornflowerblue': 1, 'cornsilk': 1, 'crimson': 1, 'cyan': 1,
    'darkblue': 1, 'darkcyan': 1, 'darkgoldenrod': 1, 'darkgray': 1, 'darkgreen': 1, 'darkgrey': 1, 'darkkhaki': 1, 'darkmagenta': 1, 'darkolivegreen': 1,
    'darkorange': 1, 'darkorchid': 1, 'darkred': 1, 'darksalmon': 1, 'darkseagreen': 1, 'darkslateblue': 1, 'darkslategray': 1, 'darkslategrey': 1,
    'darkturquoise': 1, 'darkviolet': 1, 'deeppink': 1, 'deepskyblue': 1, 'dimgray': 1, 'dimgrey': 1, 'dodgerblue': 1,
    'firebrick': 1, 'floralwhite': 1, 'forestgreen': 1, 'fuchsia': 1,
    'gainsboro': 1, 'ghostwhite': 1, 'gold': 1, 'goldenrod': 1, 'gray': 1, 'green': 1, 'greenyellow': 1, 'grey': 1,
    'honeydew': 1, 'hotpink': 1,
    'indianred': 1, 'indigo': 1, 'ivory': 1, 'khaki': 1, 'lavender': 1, 'lavenderblush': 1, 'lawngreen': 1, 'lemonchiffon': 1, 'lightblue': 1,
    'lightcoral': 1, 'lightcyan': 1, 'lightgoldenrodyellow': 1, 'lightgray': 1, 'lightgreen': 1, 'lightgrey': 1,
    'lightpink': 1, 'lightsalmon': 1, 'lightseagreen': 1, 'lightskyblue': 1, 'lightslategray': 1, 'lightslategrey': 1, 'lightsteelblue': 1, 'lightyellow': 1,
    'lime': 1, 'limegreen': 1, 'linen': 1,
    'magenta': 1, 'maroon': 1, 'mediumaquamarine': 1, 'mediumblue': 1, 'mediumorchid': 1, 'mediumpurple': 1, 'mediumseagreen': 1, 'mediumslateblue': 1, 'mediumspringgreen': 1,
    'mediumturquoise': 1, 'mediumvioletred': 1, 'midnightblue': 1, 'mintcream': 1, 'mistyrose': 1, 'moccasin': 1,
    'navajowhite': 1, 'navy': 1,
    'oldlace': 1, 'olive': 1, 'olivedrab': 1, 'orange': 1, 'orangered': 1, 'orchid': 1,
    'palegoldenrod': 1, 'palegreen': 1, 'paleturquoise': 1, 'palevioletred': 1, 'papayawhip': 1, 'peachpuff': 1, 'peru': 1, 'pink': 1, 'plum': 1, 'powderblue': 1, 'purple': 1,
    'red': 1, 'rosybrown': 1, 'royalblue': 1,
    'saddlebrown': 1, 'salmon': 1, 'sandybrown': 1, 'seagreen': 1, 'seashell': 1, 'sienna': 1, 'silver': 1, 'skyblue': 1, 'slateblue': 1, 'slategray': 1, 'slategrey': 1,
    'snow': 1, 'springgreen': 1, 'steelblue': 1,
    'tan': 1, 'teal': 1, 'thistle': 1, 'tomato': 1, 'turquoise': 1,
    'violet': 1, 'wheat': 1, 'white': 1, 'whitesmoke': 1, 'yellow': 1, 'yellowgreen': 1,
    'currentcolor': 1, 'currentColor': 1,
}
/**
 * Check whether the value is a legal css color unit.
 */
export function isLegalCSSColor(value: any) {
    if (typeof value !== 'string') return false;
    if (value === 'inherit' || value === 'initial') return true;
    return CSSColorReg1.test(value) || CSSColorReg2.test(value) || CSSColorReg3.test(value) || CSSColorReg4.test(value) || CSSColorReg5.test(value) || CSSColorReg8[value.trim() as 'white'] === 1 || CSSColorReg6.test(value) || CSSColorReg7.test(value);
}