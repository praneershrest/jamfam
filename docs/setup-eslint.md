# How ESLint was set up

Reference: https://docs.expo.dev/guides/using-eslint/

ESLint is a JavaScript linter that will find and fix errors in the code.

1. Install and configure ESLint

   ```
   npx expo lint
   ```

2. Add metro.config.js to repo root so ESLint runs in Node environment

   ```
   /* eslint-env node */
   const { getDefaultConfig } = require('expo/metro-config');

   /** @type {import('expo/metro-config').MetroConfig} */
   const config = getDefaultConfig(
   __dirname
   );

   module.exports = config;
   ```

3. Add a .eslintignore file to your project root to ignore certain files and directories to enhance performance
   ```
   /.expo
   node_modules
   ```
