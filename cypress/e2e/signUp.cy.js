/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should allow to sign up', () => {
    signUpPage.visit();
    signUpPage.enterUsername(user.username);
    signUpPage.enterEmail(user.email);
    signUpPage.enterPassword(user.password);
    signUpPage.clickSignUpBtn();
    signInPage.assertModalWindow();
    signUpPage.assertSuccessfulRegistr();
    signInPage.closeModalWindow();

    homePage.assertHeaderContainUsername(user.username);
    homePage.assertHomePageUrl();
  });

  it('should not allow to sign up without username', () => {
    signUpPage.visit();
    signUpPage.enterEmail(user.email);
    signUpPage.enterPassword(user.password);
    signUpPage.clickSignUpBtn();
    signInPage.assertModalWindow();
    signUpPage.assertEmptyUsernameMessage();
    signInPage.closeModalWindow();
  });

  it('should not allow to sign up without email', () => {
    signUpPage.visit();
    signUpPage.enterUsername(user.username);
    signUpPage.enterPassword(user.password);
    signUpPage.clickSignUpBtn();
    signInPage.assertModalWindow();
    signInPage.assertEmptyEmailMessage();
    signInPage.closeModalWindow();
  });

  it('should not allow to sign up without password', () => {
    signUpPage.visit();
    signUpPage.enterUsername(user.username);
    signUpPage.enterEmail(user.email);
    signUpPage.clickSignUpBtn();
    signInPage.assertModalWindow();
    signInPage.assertEmptyPasswordMessage();
    signInPage.closeModalWindow();
  });

  it('should not allow to sign up without number in the password field', () => {
    signUpPage.visit();
    signUpPage.enterUsername(user.username);
    signUpPage.enterEmail(user.email);
    signUpPage.enterPassword(user.invalidPassword1);
    signUpPage.clickSignUpBtn();
    signInPage.assertModalWindow();
    signUpPage.assertInvalidPasswordMessage();
    signInPage.closeModalWindow();
  });

  // eslint-disable-next-line max-len
  it('should not allow to sign up without a capital char in the password field', () => {
    signUpPage.visit();
    signUpPage.enterUsername(user.username);
    signUpPage.enterEmail(user.email);
    signUpPage.enterPassword(user.invalidPassword2);
    signUpPage.clickSignUpBtn();
    signInPage.assertModalWindow();
    signUpPage.assertInvalidPasswordMessage();
    signInPage.closeModalWindow();
  });

  // eslint-disable-next-line max-len
  it('should not allow to sign up without the lowercase char in the password field', () => {
    signUpPage.visit();
    signUpPage.enterUsername(user.username);
    signUpPage.enterEmail(user.email);
    signUpPage.enterPassword(user.invalidPassword3);
    signUpPage.clickSignUpBtn();
    signInPage.assertModalWindow();
    signUpPage.assertInvalidPasswordMessage();
    signInPage.closeModalWindow();
  });

  // eslint-disable-next-line max-len
  it('should not allow to sign up without the "at" symbol in the email field', () => {
    signUpPage.visit();
    signUpPage.enterUsername(user.username);
    signUpPage.enterEmail(user.invalidEmail1);
    signUpPage.enterPassword(user.password);
    signUpPage.clickSignUpBtn();
    signInPage.assertModalWindow();
    signInPage.assertInvalidEmailMessage();
    signInPage.closeModalWindow();
  });

  // eslint-disable-next-line max-len
  it('should not allow to sign up without top level domain in the email field', () => {
    signUpPage.visit();
    signUpPage.enterUsername(user.username);
    signUpPage.enterEmail(user.invalidEmail2);
    signUpPage.enterPassword(user.password);
    signUpPage.clickSignUpBtn();
    signInPage.assertModalWindow();
    signInPage.assertInvalidEmailMessage();
    signInPage.closeModalWindow();
  });
});
