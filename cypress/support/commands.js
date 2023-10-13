// Import the necessary custom commands
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
import SignInPageObject from '../support/pages/signIn.pageObject';
const signInPage = new SignInPageObject();

// Add command for image snapshot testing
addMatchImageSnapshotCommand();

// Custom command to get elements by data-cy attribute
Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-cy="${selector}"]`);
});

// Custom command to register a user with optional parameters
Cypress.Commands.add('register', (email = 'testqa@test.com',
  username = 'forTesting', password = '12345Qwert!') => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  });
});

// Custom command to set up a user session
Cypress.Commands.add('setupUserSession', () => {
  cy.task('db:clear');
  cy.visit('http://localhost:1667/#/login');
  cy.task('generateUser').then((generateUser) => {
    const user = generateUser;
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
  });
});

// Custom command to generate and register a user with a promise
Cypress.Commands.add('generateAndRegisterUser', () => {
  return cy.task('db:clear').then(() => {
    return cy.task('generateUser').then((generateUser) => {
      const user = generateUser;
      return cy.register(user.email, user.username, user.password).then(() => {
        return user;
      });
    });
  });
});
