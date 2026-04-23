/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((res) => {
      user = res;
    });
    signUpPage.visit();
  });

  it('should register a new user with valid data', () => {
    signUpPage.register(user.username, user.email, user.password);

    cy.get('[data-cy="username-link"]', { timeout: 10000 })
      .should('be.visible')
      .and('contain', user.username);
  });

  it('should not register with an already taken email', () => {
    cy.register(user.email, user.username, user.password);

    signUpPage.register('AnyName', user.email, user.password);
    cy.get('.error-messages')
      .should('be.visible')
      .and('contain', 'email has already been taken');
  });
});
