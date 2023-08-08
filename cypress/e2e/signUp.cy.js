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
    homePage.visit();
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should allow to sign up user with valid credentials', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000);
    signUpPage.successMessage();
  });

  it('should not allow to sign up user with empty username', () => {
    signUpPage.visit();
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.errorEmptyUsername();
  });

  it('should not allow to sign up user with empty email', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.errorEmptyEmail();
  });

  it('should not allow to sign up user with empty password', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();
    signUpPage.errorEmptyPassword();
  });
});
