// module.exports = {
//   preset: 'react-native',
// };

module.exports = {
  preset: 'react-native',
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation)',
  ],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
};

// module.exports = {
//   preset: 'jest-expo',
//   setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
//   transformIgnorePatterns: [
//     '/node_modules/(?!((jest-)?react-native|react-native|react-navigation|@react-navigation|expo(.*)))/',
//   ],
//   transform: {
//     '^.+\\.(js|ts|tsx)$': 'babel-jest',
//   },
// };