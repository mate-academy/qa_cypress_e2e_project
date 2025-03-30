/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settingsPageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();
const settingsPage = new SettingsPageObject();

let user;

describe('Sign Up page', () => {
  beforeEach(() => {
    signUpPage.visit();
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to sign up with valid credential', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    homePage.assertPopUp();
    homePage.clickPopUpOkButton();
    homePage.assertHeaderContainUsername(user.username);
  });

  it(`shouldn't provide an ability to register without username`, () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertPopUpWithoutUsername();
  });

  it(`shouldn't register with non-unique username`, () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    homePage.clickPopUpOkButton();
    homePage.assertHeaderContainUsername(user.username);

    homePage.settingsLinkClick();
    settingsPage.logoutButtonClick();

    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('user2email@gmail.com');
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertPopUpUsenameIsTaken();
  });

  it(`shouldn't provide an ability to register without email`, () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertPopUpWithoutEmail();
    homePage.clickPopUpOkButton();
  });

  it(`shouldn't provide an ability to register with email without "@" `, () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(`${user.username}test.com`);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertPopUpInvalidEmail();
    homePage.clickPopUpOkButton();
    signUpPage.assertSignUpUrl();
  });

  it(`shouldn't provide an ability to register with email without "." `, () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(`${user.username}@testcom`);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertPopUpInvalidEmail();
    homePage.clickPopUpOkButton();
    signUpPage.assertSignUpUrl();
  });
  it(`shouldn't provide an ability to register without password`, () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();

    signUpPage.assertPopUpWthoutPassword();
    homePage.clickPopUpOkButton();
    signUpPage.assertSignUpUrl();
  });

  it(`shouldn't provide an ability to register with password 7 characters long`, () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.passwordSevenChar);
    signUpPage.clickSignUpBtn();

    signUpPage.assertPopUpInvalidPassword();
    homePage.clickPopUpOkButton();
    signUpPage.assertSignUpUrl();
  });

  it(`shouldn't provide an ability to register with password 8 characters long without number`, () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.passwordWithoutNumber);
    signUpPage.clickSignUpBtn();

    signUpPage.assertPopUpInvalidPassword();
    homePage.clickPopUpOkButton();
    signUpPage.assertSignUpUrl();
  });

  it(`shouldn't provide an ability to register with password 8 characters long without 1 uppercase letter`, () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.passwordWithoutUpperLetter);
    signUpPage.clickSignUpBtn();

    signUpPage.assertPopUpInvalidPassword();
    homePage.clickPopUpOkButton();
    signUpPage.assertSignUpUrl();
  });
  it(` "Have an account link" should redirect user on sign in page`, () => {
    signUpPage.clickHaveAnAccountLink();
    signInPage.assertSignInUrl();
  });
});
