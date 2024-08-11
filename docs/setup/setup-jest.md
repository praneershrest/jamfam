# How jest was set up

Reference:
 - https://docs.expo.dev/develop/unit-testing/
 - https://docs.expo.dev/router/reference/testing/

Jest is a unit and snapshot JavaScript testing framework

1. Install jest

   ```
   npx expo install -- --save-dev jest-expo jest @types/jest
   ```

2. Transpile node modules your project uses by configuring transformIgnorePatterns in your package.json

   ```
   // package.json
   "jest": {
    "preset": "jest-expo",
    "transformIgnorePatterns": [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)"
    ]
    }
   ```

3. Install react-native testing library

   ```
   npx expo install -- --save-dev @testing-library/react-native
   ```

4. Uninstall react-test-renderer and @types/react-test-renderer

   ```
   npm uninstall -D react-test-renderer @types/react-test-renderer
   ```

5. Enable code coverage with Jest. Code coverage reports can help you understand how much of your code is tested. To see the code coverage report in your project using the HTML format, in package.json, under jest, set the collectCoverage to true and use collectCoverageFrom to specify a list of files to ignore when collecting the coverage. Make sure to add `coverage/` to .gitignore

   ```
   "jest": {
    ...
    "collectCoverage": true,
    "collectCoverageFrom": [
        "**/*.{ts,tsx,js,jsx}",
        "!**/coverage/**",
        "!**/node_modules/**",
        "!**/babel.config.js",
        "!**/expo-env.d.ts",
        "!**/.expo/**",
        "!**/.eslintrc.js",
        "!**/app-example/**",
        "!**/scripts/**"
    ]
    }
   ```

6. Use different flows to test by updating package.json

   ```
   "scripts": {
        "test": "jest --watch --coverage=false --changedSince=origin/main",
        "testDebug": "jest -o --watch --coverage=false",
        "testFinal": "jest",
        "updateSnapshots": "jest -u --coverage=false"
        ... 
    }
   ```