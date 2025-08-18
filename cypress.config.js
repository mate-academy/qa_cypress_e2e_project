// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    supportFile: 'cypress/support/e2e.js',
    baseUrl: 'https://demo.realworld.io',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',

    // головне: стабільний API
    env: {
      api: 'https://conduit.productionready.io/api',
    },

    // трішки запасу по таймаутах
    defaultCommandTimeout: 10000,
    requestTimeout: 30000,

    chromeWebSecurity: false,

    // НІ В ЯКОМУ РАЗІ не блокуємо conduit.productionready.io!
    // Сюди можна додати тільки аналітику, якщо хочеш:
    // blockHosts: ['*google-analytics.com*','*googletagmanager.com*'],

    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const n = Date.now(); // унікальність
          return {
            username: `qa_${n}`,
            email:    `qa_${n}@email.com`,
            password: 'Qwerty1!',
          };
        },
      });
      return config;
    },
  },
});
