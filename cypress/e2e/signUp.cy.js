/* eslint-disable */
/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should be able to register a new user', () => {
    signUpPage.visit();
    cy.register(user.email, user.username, user.password);

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('qweq' + user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    cy.wait(1000)
    cy.get('.swal-title').should('contain', 'Welcome!');
    cy.get('.swal-text').should('contain', 'Your registration was successful!');
  });

  it('should not be able to register a new user with invalid email', () => {
    signUpPage.visit();
    cy.register(user.email, user.username, user.password);

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('qweq');
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Email must be a valid email.');
  });

  it('should not be able to register a new user with 7 characters password', () => {
    signUpPage.visit();
    cy.register(user.email, user.username, user.password);

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('qweq' + user.email);
    signUpPage.typePassword('qW1231!');
    signUpPage.clickSignUpBtn();
    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  });

  it('should not be able to register a new user without number password', () => {
    signUpPage.visit();
    cy.register(user.email, user.username, user.password);

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('qweq' + user.email);
    signUpPage.typePassword('qWqWqWqW!');
    signUpPage.clickSignUpBtn();
    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  });

  it('should not be able to register a new user without uppercase letter password', () => {
    signUpPage.visit();
    cy.register(user.email, user.username, user.password);

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('qweq' + user.email);
    signUpPage.typePassword('qw123123!');
    signUpPage.clickSignUpBtn();
    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  });

  it('should not be able to register a new user without special character password', () => {
    signUpPage.visit();
    cy.register(user.email, user.username, user.password);

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('qweq' + user.email);
    signUpPage.typePassword('qw123123');
    signUpPage.clickSignUpBtn();
    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  });
});
