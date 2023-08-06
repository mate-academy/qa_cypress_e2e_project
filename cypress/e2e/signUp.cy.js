/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

let user;

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should register a new user', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertSuccesfulRegistration();
    signUpPage.clickOkBtn();

    homePage.assertMainPageLogo();
    homePage.assertMainPageLogoText();
    homePage.assertMainPageUrl();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not able to register user with empty "Username" field', () => {
    signUpPage.visit();

    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertFailedRegistration();
    signUpPage.assertUsernameFieldRequired();
    signUpPage.clickOkBtn();
  });

  it('should not be able to register user with empty "Email" field', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertFailedRegistration();
    signUpPage.assertEmailFieldRequired();
    signUpPage.clickOkBtn();
  });

  it('should not able to register user with empty "Password" field', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();

    signUpPage.assertFailedRegistration();
    signUpPage.assertPasswordFieldRequired();
    signUpPage.clickOkBtn();
  });
});
