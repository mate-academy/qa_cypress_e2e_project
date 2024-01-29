/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide ability to log in with wrong email', () => {
    cy.visit('/');
    cy.get('[data-cy="headerSignIn-link"]').click();
    cy.get('[data-cy="email-sign-in"]').type('newemail@neon.com');
    cy.get('[data-cy="password-sign-in"]').type(user.password);
    cy.get('[data-cy="sign-in-btn"]').click();
    cy.get('.swal-modal').should('exist');
    cy.get('.swal-modal')
      .should('contain', 'Login failed!')
      .should('contain', 'Invalid user credentials.')
      .should('contain', 'OK')
      .click();
  });

  it('should not provide ability to log in with wrong password', () => {
    cy.visit('/');
    cy.get('[data-cy="headerSignIn-link"]').click();
    cy.get('[data-cy="email-sign-in"]').type(user.email);
    cy.get('[data-cy="password-sign-in"]').type('#newneon1NEON');
    cy.get('[data-cy="sign-in-btn"]').click();
    cy.get('.swal-modal').should('exist');
    cy.get('.swal-modal')
      .should('contain', 'Login failed!')
      .should('contain', 'Invalid user credentials.')
      .should('contain', 'OK')
      .click();
  });
});
