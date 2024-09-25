// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('findByPlaceholder', (placeholder) => {
  return cy.get(`[placeholder="${placeholder}"]`);
});

Cypress.Commands.add('findByTestID', (testId) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('register', (email = 'riot@qa.team',
  username = 'riot', password = '12345Qwert!') => {
  cy.request('POST', 'http://localhost:1667/users', {
    email,
    username,
    password
  });
});

// Cypress.Commands.add('login', (email, password) => {
//   const signInPage = new SignInPageObject();
//   const homePage = new HomePageObject();
//   signInPage.visit();
//   signInPage.typeEmail(email);
//   signInPage.typePassword(password);
//   signInPage.clickSignInBtn();
//   homePage.assertHeaderContainUsername(email.split('@')[0]);
// });
