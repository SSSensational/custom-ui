module.exports = {
    verbose: true,
    roots: ['<rootDir>/src'],
    moduleNameMapper: {
      '^src$': '<rootDir>/src/index.tsx',
      '^src(.*)$': '<rootDir>/src/$1',
    },
    testRegex: '(/test/.*|\\.(test|spec))\\.(ts|tsx|js)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    testPathIgnorePatterns: ['/node_modules/', '/lib/', '/esm/', '/dist/'],
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
};
