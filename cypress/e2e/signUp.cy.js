/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

let user;

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.task('db:clear').then(() => {
      cy.task('generateUser').then((generateUser) => {
        user = generateUser;
      });
    });
  });

  const registerUser = (username, email, password) => {
    signUpPage.visit();
    signUpPage.typeUsername(username);
    signUpPage.typeEmail(email);
    signUpPage.typePassword(password);
    signUpPage.clickSignUpBtn();
  };

  it('should register a new user', () => {
    registerUser(user.username, user.email, user.password);
    signUpPage.assertSuccesfulRegistration();
    signUpPage.clickOkBtn();
    homePage.assertMainPageLogo();
    homePage.assertMainPageLogoText();
    homePage.assertMainPageUrl();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not able to register user with empty "Username" field', () => {
    registerUser('', user.email, user.password);
    signUpPage.clickOkBtn();
    signUpPage.assertFailedRegistration();
    signUpPage.assertUsernameFieldRequired();
  });

  it('should not be able to register user with empty "Email" field', () => {
    registerUser(user.username, '', user.password);
    signUpPage.assertFailedRegistration();
    signUpPage.assertEmailFieldRequired();
    signUpPage.clickOkBtn();
  });

  it('should not be able to register user with already used email', () => {
    cy.register(user.email, user.username, user.password);
    registerUser(user.username, user.email, user.password);
    signUpPage.assertFailedRegistration();
    signUpPage.assertEmailAlreadyTaken();
    signUpPage.clickOkBtn();
  });

  it('should not able to register user with empty "Password" field', () => {
    registerUser(user.username, user.email, '');
    signUpPage.assertFailedRegistration();
    signUpPage.assertPasswordFieldRequired();
    signUpPage.clickOkBtn();
  });
});
