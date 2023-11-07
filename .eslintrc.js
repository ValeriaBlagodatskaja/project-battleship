module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: ["airbnb-base", "prettier", "plugin:jest/recommended", 'plugin:prettier/recommended'],
  overrides: [
    {
      env: {
        node: true,

      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
   "prettier/prettier": 'error',
  },
  plugins: ["jest",'prettier'],
};
