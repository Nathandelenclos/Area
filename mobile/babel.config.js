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
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
