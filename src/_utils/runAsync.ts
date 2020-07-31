export const runAsync = (func: VoidFunction) => (globalThis?.queueMicrotask || process?.nextTick || globalThis?.setTimeout)(func);
