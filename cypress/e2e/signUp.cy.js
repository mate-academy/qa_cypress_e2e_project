/// <reference types='cypress' />
/// <reference types='../support' />

import ProfilePageObject from '../support/pages/profile.PageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();
const profilePage = new ProfilePageObject();
const { variables } = require('../support/variables');

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      signUpPage.visit();
    });
  });

  it('should provide an ability to Sign up', () => {
    cy.register(user.username, user.email, user.password);

    cy.intercept('GET', 'profiles/*').as('getProfilePage');
    cy.visit(`/#/@${user.username}`);
    cy.wait('@getProfilePage').then(() => {
      profilePage.assertHeaderContainUsername(user.username);
    });
  });

  it('should not provide an ability to Sign up with an empty email', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.intercept('POST', '/users').as('getError');
    cy.wait('@getError').then(() => {
      signUpPage.assertErrorDialogMessage('Email field required.');
    });
  });

  it('should not provide an ability to Sign up with an empty password', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();

    cy.intercept('POST', '/users').as('getError');
    cy.wait('@getError').then(() => {
      signUpPage.assertErrorDialogMessage('Password field required.');
    });
  });

  it('should not provide an ability to Sign up with invalid password', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(variables.invalidPassword);
    signUpPage.clickSignUpBtn();

    cy.intercept('POST', '/users').as('getError');
    cy.wait('@getError').then(() => {
      signUpPage.assertErrorDialogMessage(variables.passwordValidationMessage);
    });
  });

  it('should not provide an ability to Sign up with invalid email', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(variables.invalidEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.intercept('POST', '/users').as('getError');
    cy.wait('@getError').then(() => {
      signUpPage.assertErrorDialogMessage(variables.emailValidationMessage);
    });
  });
});
