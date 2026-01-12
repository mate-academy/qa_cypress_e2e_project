// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Ignore vue-router "Navigation cancelled" errors which are expected
// when a new navigation interrupts a previous one during tests.
Cypress.on('uncaught:exception', (err) => {
  if (err && err.message && err.message.includes('Navigation cancelled')) {
    return false;
  }
  // Let other errors fail the test
  return true;
});
