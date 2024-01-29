/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';
import '../support/commands.js';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should allow to register a user', () => {
    signUpPage.visit();

    signUpPage.addUsername(user.username);

    signUpPage.addEmail(user.email);

    signUpPage.addPassword(user.password);

    signUpPage.clickSignUpBtn();

    signUpPage.assertRegisterSuccess();

    signUpPage.closePopUpWindow();

    homePage.assertHeaderContainUsername(user.username);

    homePage.assertMainPageLogo();

    homePage.assertMainPageLogoText();

    homePage.assertMainPageUrl();
  });
  it('should not allow to register a user without the username', () => {
    signUpPage.visit();

    signUpPage.addEmail(user.email);

    signUpPage.addPassword(user.password);

    signUpPage.clickSignUpBtn();

    signUpPage.assertEmptyUsernameError();

    signUpPage.closePopUpWindow();
  });

  it('should not allow to register a user without the email', () => {
    signUpPage.visit();

    signUpPage.addUsername(user.username);

    signUpPage.addPassword(user.password);

    signUpPage.clickSignUpBtn();

    signInPage.assertEmptyEmailError();

    signUpPage.closePopUpWindow();
  });

  it('should not allow to register a user without the password', () => {
    signUpPage.visit();

    signUpPage.addUsername(user.username);

    signUpPage.addEmail(user.email);

    signUpPage.clickSignUpBtn();

    signInPage.assertEmptyPassError();

    signUpPage.closePopUpWindow();
  });

  it('should not allow to register a user with the existing email', () => {
    cy.registerUser(user.email, user.username, user.password);

    signUpPage.visit();

    signUpPage.addUsername(user.username);

    signUpPage.addEmail(user.email);

    signUpPage.addPassword(user.password);

    signUpPage.clickSignUpBtn();

    signUpPage.assertTakenEmailError();

    signUpPage.closePopUpWindow();
  });

  it('should not allow to register a user with the 1 character in the password field', () => {
    signUpPage.visit();

    signUpPage.addUsername(user.username);

    signUpPage.addEmail(user.email);

    signUpPage.addPassword(user.passwordWith1char);

    signUpPage.clickSignUpBtn();

    signUpPage.assertInvalidPasswordError();

    signUpPage.closePopUpWindow();
  });

  it('should not allow to register a user with the 7 character in the password field', () => {
    signUpPage.visit();

    signUpPage.addUsername(user.username);

    signUpPage.addEmail(user.email);

    signUpPage.addPassword(user.passwordWith7char);

    signUpPage.clickSignUpBtn();

    signUpPage.assertInvalidPasswordError();

    signUpPage.closePopUpWindow();
  });

  it('should not allow to register a user without the capital char in the password field', () => {
    signUpPage.visit();

    signUpPage.addUsername(user.username);

    signUpPage.addEmail(user.email);

    signUpPage.addPassword(user.passwordWithoutCapital);

    signUpPage.clickSignUpBtn();

    signUpPage.assertInvalidPasswordError();

    signUpPage.closePopUpWindow();
  });

  it('should not allow to register a user without the lowercase char in the password field', () => {
    signUpPage.visit();

    signUpPage.addUsername(user.username);

    signUpPage.addEmail(user.email);

    signUpPage.addPassword(user.passwordWithoutLower);

    signUpPage.clickSignUpBtn();

    signUpPage.assertInvalidPasswordError();

    signUpPage.closePopUpWindow();
  });

  it('should not allow to register a user without a number in the password field', () => {
    signUpPage.visit();

    signUpPage.addUsername(user.username);

    signUpPage.addEmail(user.email);

    signUpPage.addPassword(user.passwordWithoutNum);

    signUpPage.clickSignUpBtn();

    signUpPage.assertInvalidPasswordError();

    signUpPage.closePopUpWindow();
  });

  it('should not allow to register a user without the At symbol in the email field', () => {
    signUpPage.visit();

    signUpPage.addUsername(user.username);

    signUpPage.addEmail(user.invalidRegEmail);

    signUpPage.addPassword(user.password);

    signUpPage.clickSignUpBtn();

    signUpPage.assertInvalidEmailError();

    signUpPage.closePopUpWindow();
  });

  it('should not allow to register a user without top lvl domain in the email field', () => {
    signUpPage.visit();

    signUpPage.addUsername(user.username);

    signUpPage.addEmail(user.emailWithoutDomain);

    signUpPage.addPassword(user.password);

    signUpPage.clickSignUpBtn();

    signUpPage.assertInvalidEmailError();

    signUpPage.closePopUpWindow();
  });

  it('should not allow to register a user without domain in email field', () => {
    signUpPage.visit();

    signUpPage.addUsername(user.username);

    signUpPage.addEmail(user.emailWithoutDomain);

    signUpPage.addPassword(user.password);

    signUpPage.clickSignUpBtn();

    signUpPage.assertInvalidEmailError();

    signUpPage.closePopUpWindow();
  });
});