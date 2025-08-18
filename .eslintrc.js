module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true, 'cypress/globals': true },
  plugins: ['cypress'],
  extends: ['eslint:recommended', 'plugin:cypress/recommended'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  rules: {
    // для e2e-тестов правило часто даёт ложные срабатывания
    'cypress/unsafe-to-chain-command': 'off',
    // помягче к временно неиспользуемым переменным
    'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }]
  },
  overrides: [
    // на всякий случай явно отмечаем node-окружение там, где оно точно нужно
    { files: ['*.config.js', '.eslintrc.js', 'server/**/*.js'], env: { node: true } }
  ],
  ignorePatterns: ['src/**', 'server/**']
};
