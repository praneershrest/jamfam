# How lint-staged was set up

Reference: https://github.com/lint-staged/lint-staged

lint-staged runs linters against staged git files to ensure committed code is linted and styled correctly.

1. Pre-req: Complete [setup-husky](./setup-husky.md)

2. Install lint-staged

   ```
   npm install --save-dev lint-staged
   ```

3. Add configuration to lint specified files in package.json

   ```
   "lint-staged": {
     "*.{js,jsx,ts,tsx}": [
       "prettier --write",
       "eslint --fix"
    ]
   }
   ```
