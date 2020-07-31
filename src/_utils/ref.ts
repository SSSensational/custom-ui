import React from 'react';

/**
 * Compose Multiple ref objects.
 *
 * Example:
 * <div ref={composeRef(refA, refB, ...)}>
 * <div ref={composeRef([refA, refB, ...])}>
 */
export function composeRef<T>(refs: React.Ref<T>[]): (ref: T) => void;
export function composeRef<T>(...refs: React.Ref<T>[]): (ref: T) => void;
export function composeRef<T>() {
    let refs: React.Ref<T>[];
    if (arguments.length === 1 && arguments[0] instanceof Array) refs = arguments[0];
    else refs = Array.from(arguments);
    return (ref: T) => {
        refs.forEach(r => {
            if (r !== null && typeof r === 'object' && 'current' in r) (r as any).current = ref;
            if (typeof r === 'function') r(ref);
        })
    }
}
