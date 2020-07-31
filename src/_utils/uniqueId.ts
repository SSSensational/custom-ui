const idCount: { [key: string]: number } = { uuid: 0 };
/**
 * generate unique Id with prefix
 */
export const uniqueId = (prefix: string = 'uuid' ) => {
    if (!prefix || prefix === 'uuid') return `uuid-${++idCount.uuid}`;
    if (!idCount[prefix]) idCount[prefix] = 0;
    return `${prefix}-${++idCount[prefix]}`;
};
