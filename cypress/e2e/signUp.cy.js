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

  it('should provide an ability to sign up with required credentials', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.isRegistrationSuccessfull();
    signUpPage.isSignUpCredentialsValid();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to sign up with empty username', () => {
    signUpPage.visit();

    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.isRegistrationFailed();
    signUpPage.isUsernameRequired();
  });

  it('should not provide an ability to sign up with empty email', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.isRegistrationFailed();
    signUpPage.isEmailRequired();
  });

  it('should not provide an ability to sign up with empty password', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();
    signUpPage.isRegistrationFailed();
    signUpPage.isPasswordRequired();
  });
});
