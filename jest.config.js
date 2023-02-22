module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testRegex: '(/__test__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    verbose: true,
    collectCoverage: true,  // Here we turn on coverage
    collectCoverageFrom: ['<rootDir>/src/app/**/*.ts'] // Here we tell jest to look for all files that that end with '.ts' inside the 'src/app' folder and all it's sub-folders
};
