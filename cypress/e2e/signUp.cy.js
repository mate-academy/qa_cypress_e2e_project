/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import homePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new homePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser')
      .then(generateUser => {
        user = generateUser;
      });
    signUpPage.visit();
  });

  it('should provide an ability to register with existing credentials', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    homePage.successfulRegistration();
  });

  it('should not provide an ability to register with empty username field', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    homePage.alertUserNameEmpty();
  });

  it('should not provide an ability to register with empty email field', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    homePage.alertEmailEmpty();
  });

  it('should not provide an ability to register with empty password field', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();
    homePage.alertPasswordEmpty();
  });

  it('should not provide an ability to register with password less than 8 characters', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword('user.shortPassword');
    signUpPage.clickSignUpBtn();
    homePage.alertShortCred();
  });

  it('should not provide an ability to register with invalid email', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.invalidEmail)
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    homePage.alertInvalidEmail();
  });
});
