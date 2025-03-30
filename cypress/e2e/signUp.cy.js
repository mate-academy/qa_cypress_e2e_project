/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import { generateFakeUser } from '../support/fakeUser';

const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    user = generateFakeUser();
  });

  it('should allow user to sign up with valid credentials', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.contains('Your registration was successful').should('be.visible');
  });

  it('should not allow user to sign up with existing email', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.contains('Email already taken.').should('be.visible');
  });
});