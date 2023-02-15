/// <reference types="cypress" />
/// <reference types="../support" />

const { generateUser } = require("../support/generate");

describe('User', () => {
  before(() => {
    cy.task('db:clear');
  });

  it.skip('should be able to follow the another user', () => {
    const { username, email, password } = generateUser();

    cy.register(username, email, password);
    cy.login(`${username}1`, `1${email}`, password);

    cy.visit(`/#/@${username}/`)

    cy.contains('button', `Follow ${username}`)
      .click();
    
    cy.contains('button', 'Unfollow')
      .should('exist');
  });
});
