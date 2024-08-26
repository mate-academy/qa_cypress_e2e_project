/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import { generateFakeUser } from '../support/fakeUser';

const signUpPage = new SignUpPageObject();
const signInPage = new SignInPageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear'); 
    user = generateFakeUser(); 

    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.contains('Your registration was successful').should('be.visible');
    cy.contains('OK').click({ force: true });

    cy.contains('Settings').click();
    cy.contains('Or click here to logout').click();
  });

  it('should allow user to sign in with valid credentials', () => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    cy.contains('Logging you in... Please wait...').should('be.visible');
    cy.get('[data-cy="username-link"]').should('contain', user.username);
  });

  it('should not allow user to sign in with invalid credentials', () => {
    signInPage.visit();
    signInPage.typeEmail('invalid@example.com');
    signInPage.typePassword('invalidpassword');
    signInPage.clickSignInBtn();

    cy.contains('Invalid user credentials.').should('be.visible');
  });
});
