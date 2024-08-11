# How Prettier was set up

Reference: https://docs.expo.dev/guides/using-eslint/

Prettier is a code formatter that ensures all code files follow a consistent style.

1. Install Prettier and its dependencies

   ```
   npx expo install -- --save-dev prettier eslint-config-prettier eslint-plugin-prettier
   ```

2. Update .eslintrc.js to integrate Prettier with ESLint

   ```
   module.exports = {
     extends: ['expo', 'prettier'],
     plugins: ['prettier'],
     rules: {
         'prettier/prettier': 'error',
     },
   };
   ```

3. Update .prettierrc to customize Prettier configurations

   E.g.

   ```
   {
     "printWidth": 100,
     "tabWidth": 2,
     "useTabs": false,
     "singleQuote": true,
     "semi": false,
     "bracketSpacing": true,
     "bracketSameLine": true
   }
   ```
