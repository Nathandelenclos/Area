module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/Components',
          '@contexts': './src/Contexts',
          '@interfaces': './src/Interfaces',
          '@navigators': './src/Navigators',
          '@services': './src/Services',
          '@types': './src/Types',
          '@views': './src/Views',
          '@assets': './src/Assets',
          '@src': './src',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
