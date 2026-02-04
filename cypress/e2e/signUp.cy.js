/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';

const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((u) => {
      user = u;
    });
  });

  it('should sign up successfully via UI', () => {
    homePage.visit();
    homePage.signUpLink.click();

    cy.getByDataQa('signup-username').type(user.username);
    cy.getByDataQa('signup-email').type(user.email);
    cy.getByDataQa('signup-password').type(user.password);
    cy.getByDataQa('signup-submit').click();

    cy.getByDataQa('header-user-link')
      .should('contain', user.username);
  });

  it('should not sign up with invalid email', () => {
    homePage.visit();
    homePage.signUpLink.click();

    cy.getByDataQa('signup-username').type('Name123');
    cy.getByDataQa('signup-email').type('invalid email');
    cy.getByDataQa('signup-password').type('123123');
    cy.getByDataQa('signup-submit').click();

    cy.get('.swal-title')
      .should('contain', 'Registration failed!');
  });
});
