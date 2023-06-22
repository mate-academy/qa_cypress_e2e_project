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

afterEach(() => {
  cy.window().then(win => {
      // window.gc is enabled with --js-flags=--expose-gc chrome flag
      // window.gc is enabled for electron with ELECTRON_EXTRA_LAUNCH_ARGS=--js-flags=--expose_gc
      if (typeof win.gc === 'function') {
          // run gc multiple times in an attempt to force a major GC between tests
          win.gc();
          win.gc();
          win.gc();
          win.gc();
          win.gc();
      }
  });
});
// Alternatively you can use CommonJS syntax:
// require('./commands')
