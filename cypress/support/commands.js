import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand();

Cypress.Commands.add('getByDataQa', (selector) => {
  return cy.get(`[data-qa="${selector}"]`);
});

Cypress.Commands.add(
  'register',
  (email, username, password) => {
    return cy.request('POST', '/users', {
      email,
      username,
      password,
    });
  }
);
